#!/usr/bin/env node
/**
 * RAK OS repo integrity check:
 *  1. Every skills/*.md (except README) follows the skill-card format.
 *  2. Version is consistent across package.json / server.json / claude-plugin.json.
 *  3. All JSON manifests parse.
 *  4. Every relative markdown link resolves to a real file or directory.
 *
 * No dependencies. Run: node scripts/check-skills.mjs
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join, resolve, relative } from "node:path"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const errors = []
const err = (m) => errors.push(m)

function walkMarkdown(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".git")) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walkMarkdown(full, acc)
    else if (entry.name.endsWith(".md")) acc.push(full)
  }
  return acc
}

// 1. Skill-card format
const SKILL_SECTIONS = ["## When to use", "## Tools", "## Tier", "## Example prompts"]
const skillsDir = join(ROOT, "skills")
for (const f of readdirSync(skillsDir)) {
  if (!f.endsWith(".md") || f === "README.md") continue
  const body = readFileSync(join(skillsDir, f), "utf8")
  if (!/^# SKILL: rak-/.test(body)) err(`skills/${f}: must start with "# SKILL: rak-<name>"`)
  for (const s of SKILL_SECTIONS) {
    if (!body.includes(s)) err(`skills/${f}: missing section "${s}"`)
  }
}

// 2. Version consistency
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"))
let pkgVersion = null
try {
  const pkg = readJson("package.json")
  const server = readJson("server.json")
  const plugin = readJson("claude-plugin.json")
  pkgVersion = pkg.version
  const versions = {
    "package.json": pkg.version,
    "server.json": server.version,
    "server.json/packages[0]": server.packages?.[0]?.version,
    "claude-plugin.json": plugin.version,
  }
  for (const [where, v] of Object.entries(versions)) {
    if (v !== pkgVersion) err(`version drift: ${where} = ${v}, expected ${pkgVersion}`)
  }
} catch (e) {
  err(`version check failed to parse a manifest: ${e.message}`)
}

// 3. JSON manifests parse
for (const p of ["package.json", "server.json", "claude-plugin.json", "mcp.json"]) {
  try { readJson(p) } catch (e) { err(`${p}: invalid JSON — ${e.message}`) }
}
const communityDir = join(ROOT, "community")
if (existsSync(communityDir)) {
  for (const f of readdirSync(communityDir)) {
    if (f.endsWith(".json")) {
      try { JSON.parse(readFileSync(join(communityDir, f), "utf8")) }
      catch (e) { err(`community/${f}: invalid JSON — ${e.message}`) }
    }
  }
}

// 4. Relative markdown links resolve
const LINK = /\[[^\]]*\]\(([^)]+)\)/g
for (const file of walkMarkdown(ROOT)) {
  const body = readFileSync(file, "utf8")
  let m
  while ((m = LINK.exec(body))) {
    let target = m[1].trim()
    if (/^(https?:|mailto:|#)/.test(target)) continue
    target = target.split("#")[0]
    if (!target) continue
    const resolved = resolve(dirname(file), target)
    if (!existsSync(resolved)) {
      err(`${relative(ROOT, file)}: broken relative link -> ${m[1]}`)
    } else if (target.endsWith("/") && !statSync(resolved).isDirectory()) {
      err(`${relative(ROOT, file)}: link expects a dir -> ${m[1]}`)
    }
  }
}

if (errors.length) {
  console.error(`\n✗ check-skills: ${errors.length} problem(s)\n`)
  for (const e of errors) console.error("  - " + e)
  process.exit(1)
}
console.log(`✓ check-skills: skills, versions (${pkgVersion}), JSON, and internal links OK`)
