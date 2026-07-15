#!/usr/bin/env node
/**
 * Validate the shared RAK OS Agentic Content Envelope (SPEC.md §3.1): every example atom
 * conforms to the base fields + its `kind`'s identity mode + kind-specific invariants.
 * Dependency-free. Proves RAK (content) and POXI/FOP (market) speak ONE envelope.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "schemas")
const registry = JSON.parse(readFileSync(join(root, "kinds.json"), "utf8"))
const KINDS = registry.kinds

const failures = []
const fail = (ctx, msg) => { failures.push(`${ctx}: ${msg}`); console.error(`  ✗ ${ctx}: ${msg}`) }
const isStr = (v) => typeof v === "string" && v.length > 0
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v)

function validateAtom(name, atom) {
  const kind = atom.kind || atom.type
  if (!isStr(kind)) return fail(name, "missing `kind`")
  const def = KINDS[kind]
  if (!def) return fail(name, `unknown kind "${kind}" (not in kinds.json)`)
  for (const f of ["id", "lang", "body", "created_at"]) {
    if (!isStr(atom[f])) fail(name, `missing/invalid base field \`${f}\``)
  }
  if ("tags" in atom && !Array.isArray(atom.tags)) fail(name, "`tags` must be an array")
  if ("ext" in atom && !isObj(atom.ext)) fail(name, "`ext` must be an object")

  if (def.identity === "owned") {
    if (!(isObj(atom.owner) || isStr(atom.canonical_url) || isStr(atom.ext?.canonical_url)))
      fail(name, "owned identity needs `owner` or `canonical_url`")
  } else if (def.identity === "subject") {
    if (!isStr(atom.subject_key) || !isStr(atom.subject_label))
      fail(name, "subject identity needs `subject_key` + `subject_label`")
  }

  // Kind-specific invariants (the semantics a plain schema can't fully express).
  if (kind === "listing") {
    const e = atom.ext || {}
    if (!["sell", "rent", "buy", "wanted"].includes(e.intent)) fail(name, "listing ext.intent invalid")
    if (!["active", "reserved", "sold", "expired"].includes(e.status)) fail(name, "listing ext.status invalid")
    if (e.contact_mode !== "intermediated") fail(name, "listing ext.contact_mode MUST be 'intermediated' (the moat invariant)")
    if (!isStr(e.canonical_url)) fail(name, "listing ext.canonical_url required")
    if (e.price && !(typeof e.price.amount === "number" && isStr(e.price.currency)))
      fail(name, "listing ext.price needs {amount:number, currency:string}")
  }
  if (kind === "review") {
    const rating = atom.ext?.rating ?? atom.rating
    if (rating != null && !(Number.isInteger(rating) && rating >= 1 && rating <= 5))
      fail(name, "review rating must be 1..5 or null")
  }
  if (kind === "gig") {
    const e = atom.ext || {}
    if (!["contract", "full_time", "part_time", "freelance", "internship"].includes(e.engagement)) fail(name, "gig ext.engagement invalid")
    if (!["open", "filled", "closed"].includes(e.status)) fail(name, "gig ext.status invalid")
    if (e.contact_mode !== "intermediated") fail(name, "gig ext.contact_mode MUST be 'intermediated' (the moat invariant)")
    if (!isStr(e.canonical_url)) fail(name, "gig ext.canonical_url required")
  }
}

// 1) every kind that declares an ext schema must have that file on disk
for (const [k, d] of Object.entries(KINDS)) {
  if (d.ext && !existsSync(join(root, d.ext))) fail(`kinds.json:${k}`, `ext schema not found: ${d.ext}`)
}

// 2) validate every example atom
const exDir = join(root, "examples")
const examples = readdirSync(exDir).filter((f) => f.endsWith(".json"))
console.log(`Validating ${examples.length} example atom(s) against the shared envelope (v${registry.envelopeVersion})\n`)
const kindsSeen = new Set()
for (const f of examples) {
  const name = `examples/${f}`
  let atom
  try { atom = JSON.parse(readFileSync(join(exDir, f), "utf8")) } catch (e) { fail(name, `invalid JSON: ${e.message}`); continue }
  kindsSeen.add(atom.kind)
  validateAtom(name, atom)
  if (!failures.some((x) => x.startsWith(name))) console.log(`  ✓ ${name} (kind=${atom.kind}, profile=${KINDS[atom.kind]?.profile})`)
}

// 3) coverage: at least one atom from each profile proves the shared envelope
if (![...kindsSeen].some((k) => KINDS[k]?.profile === "rak")) fail("coverage", "no RAK-profile example atom")
if (![...kindsSeen].some((k) => KINDS[k]?.profile === "fop")) fail("coverage", "no FOP-profile example atom")

console.log("")
if (failures.length) { console.error(`✗ check-envelope: ${failures.length} failure(s)`); process.exit(1) }
console.log("✓ check-envelope: RAK (content) and POXI/FOP (market) atoms conform to one shared envelope")
