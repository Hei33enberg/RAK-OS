#!/usr/bin/env node
/**
 * Regenerate the REALM ledger table in HALL_OF_FAME.md from merged `substantive` PRs.
 * Runs in CI (scheduled + manual), where `gh` is authenticated via GITHUB_TOKEN.
 * Safe: on any failure it exits 0 and changes nothing. Never triggered by merges (no loop).
 *
 *   node scripts/update-realm-ledger.mjs
 */
import { execSync } from "node:child_process"
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join, resolve } from "node:path"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const HOF = join(ROOT, "HALL_OF_FAME.md")
const BEGIN = "<!-- REALM:BEGIN -->"
const END = "<!-- REALM:END -->"

function seedRows() {
  try {
    const realm = JSON.parse(readFileSync(join(ROOT, "community", "realm.json"), "utf8"))
    return (realm.contributors || []).map(
      (c) => `| ${c.name} | [@${c.github}](https://github.com/${c.github}) | ${c.level === "Crown" ? "—" : c.level} | ${c.role} | ${c.contributions} | ${c.since} |`,
    )
  } catch { return [] }
}

function levelFor(count) {
  if (count >= 5) return { level: "L3", role: "Bureau Chief" }
  if (count >= 3) return { level: "L2", role: "Editor" }
  return null
}

function build() {
  const repo = process.env.GITHUB_REPOSITORY || "Hei33enberg/rak-mcp"
  let prs = []
  try {
    const out = execSync(
      `gh pr list --repo ${repo} --state merged --label substantive --limit 1000 --json author,number,mergedAt`,
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    )
    prs = JSON.parse(out)
  } catch {
    console.log("gh unavailable or no PRs — ledger unchanged.")
    return null
  }

  const tally = new Map()
  for (const pr of prs) {
    const login = pr.author?.login
    if (!login || pr.author?.is_bot || login.endsWith("[bot]")) continue
    const t = tally.get(login) || { count: 0, since: pr.mergedAt }
    t.count += 1
    if (pr.mergedAt && pr.mergedAt < t.since) t.since = pr.mergedAt
    tally.set(login, t)
  }

  const rows = [...seedRows()]
  ;[...tally.entries()]
    .map(([login, t]) => ({ login, ...t, lv: levelFor(t.count) }))
    .filter((x) => x.lv)
    .sort((a, b) => b.count - a.count)
    .forEach((x) => {
      const year = (x.since || "").slice(0, 4) || "2026"
      rows.push(
        `| ${x.login} | [@${x.login}](https://github.com/${x.login}) | ${x.lv.level} | ${x.lv.role} | ${x.count} substantive PRs | ${year} |`,
      )
    })

  return (
    "| Name | GitHub | Level | Realm role | Contributions | Since |\n" +
    "|---|---|---|---|---|---|\n" +
    rows.join("\n")
  )
}

if (!existsSync(HOF)) { console.log("HALL_OF_FAME.md missing — skip."); process.exit(0) }
const table = build()
if (!table) process.exit(0)

const body = readFileSync(HOF, "utf8")
const start = body.indexOf(BEGIN)
const end = body.indexOf(END)
if (start === -1 || end === -1) { console.log("REALM markers missing — skip."); process.exit(0) }

const next = body.slice(0, start + BEGIN.length) + "\n" + table + "\n" + body.slice(end)
if (next !== body) {
  writeFileSync(HOF, next)
  console.log("Ledger updated.")
} else {
  console.log("Ledger already current.")
}
