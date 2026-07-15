#!/usr/bin/env node
/**
 * RAK OS honesty-lint: RAK OS makes claims it can back in code.
 * Rejects absolute security/privacy claims and internal-reference leaks in public docs.
 *
 * A banned phrase is allowed when it appears inside backticks or quotes (i.e. mentioned
 * as a string — "we never say 'unbannable'"), because we strip quoted/backticked spans
 * before testing. Only bare assertions are flagged.
 *
 * Exceptions live in .github/honesty-allowlist.json: [{ "file": "path", "phrase": "..." }].
 * No dependencies. Run: node scripts/check-honesty.mjs
 */
import { readFileSync, readdirSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join, resolve, relative } from "node:path"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")

const BANNED = [
  /\bunbannable\b/i,
  /\buncensorable\b/i,
  /\bno logs ever\b/i,
  /\bmilitary-grade\b/i,
  /\beverything is encrypted\b/i,
  /\bgovernment-proof\b/i,
  /\bcannot be taken down\b/i,
  /\bimpossible to censor\b/i,
]
// Internal references that must never appear in public docs (flagged even if quoted).
const LEAKS = [/\bLINEAR-\d+/i, /\bCTO#\d/i]

const allowPath = join(ROOT, ".github", "honesty-allowlist.json")
const allow = existsSync(allowPath) ? JSON.parse(readFileSync(allowPath, "utf8")) : []
const isAllowed = (file, text) =>
  allow.some((a) => file.endsWith(a.file) && text.toLowerCase().includes(String(a.phrase).toLowerCase()))

function walkMarkdown(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".git")) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walkMarkdown(full, acc)
    else if (entry.name.endsWith(".md")) acc.push(full)
  }
  return acc
}

const stripQuoted = (line) =>
  line
    .replace(/`[^`]*`/g, "")
    .replace(/"[^"]*"/g, "")
    .replace(/'[^']*'/g, "")
    .replace(/“[^”]*”/g, "") // “ ”
    .replace(/„[^”"]*[”"]/g, "") // „ ” / „ "

const errors = []
for (const file of walkMarkdown(ROOT)) {
  const rel = relative(ROOT, file)
  const lines = readFileSync(file, "utf8").split(/\r?\n/)
  lines.forEach((line, i) => {
    const stripped = stripQuoted(line)
    for (const re of BANNED) {
      if (re.test(stripped) && !isAllowed(rel, line)) {
        errors.push(`${rel}:${i + 1}: absolute claim "${line.match(re)?.[0]}" — be precise instead`)
      }
    }
    for (const re of LEAKS) {
      if (re.test(line) && !isAllowed(rel, line)) {
        errors.push(`${rel}:${i + 1}: internal reference "${line.match(re)?.[0]}" leaked into public doc`)
      }
    }
  })
}

if (errors.length) {
  console.error(`\n✗ check-honesty: ${errors.length} problem(s)\n`)
  for (const e of errors) console.error("  - " + e)
  process.exit(1)
}
console.log("✓ check-honesty: no absolute claims or internal leaks in public docs")
