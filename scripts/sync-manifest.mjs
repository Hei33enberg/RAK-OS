#!/usr/bin/env node
/**
 * SSOT drift-gate (Fala 3): the runtime tool registry at rak.ad is the source of truth.
 * This fetches the live tool catalog (`rak_meta_list_skills`) and writes a committed
 * `schemas/tools.manifest.json` snapshot. `--check` compares the committed snapshot to
 * live and exits 1 on drift — so the public surface can never silently fall out of sync
 * with what the runtime actually exposes ("3 na krzyż" can't come back unnoticed).
 *
 *   node scripts/sync-manifest.mjs           # regenerate the committed manifest from live
 *   node scripts/sync-manifest.mjs --check   # fail if committed != live (CI drift-gate)
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const BASE = (process.env.RAK_BASE_URL || "https://rak.ad").replace(/\/+$/, "")
const URL = `${BASE}/api/mcp/rak/mcp`
const TENANT = process.env.RAK_TENANT_ID || "rak"
const MANIFEST = join(dirname(fileURLToPath(import.meta.url)), "..", "schemas", "tools.manifest.json")
const CHECK = process.argv.includes("--check")

async function mcp(method, params = {}) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", "x-tenant-id": TENANT },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal: AbortSignal.timeout(30000),
  })
  if (!res.ok) throw new Error(`${method}: HTTP ${res.status}`)
  const text = await res.text()
  const payloads = []
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^data:\s*(.+)$/)
    if (m) { try { payloads.push(JSON.parse(m[1])) } catch {} }
  }
  if (!payloads.length) { try { payloads.push(JSON.parse(text)) } catch {} }
  const msg = payloads.find((p) => p.result || p.error)
  if (!msg) throw new Error(`${method}: no JSON-RPC response`)
  if (msg.error) throw new Error(`${method}: ${msg.error.message}`)
  return msg.result
}

async function liveManifest() {
  const r = await mcp("tools/call", { name: "rak_meta_list_skills", arguments: {} })
  const text = r?.content?.find((c) => c.type === "text")?.text
  if (!text) throw new Error("rak_meta_list_skills returned no text")
  const cat = JSON.parse(text)
  const tools = (cat.tools || [])
    .map((t) => ({ name: t.name, tiers: t.tiers, scope: t.scope, billing: t.billing }))
    .sort((a, b) => a.name.localeCompare(b.name))
  return { source: "rak.ad live rak_meta_list_skills", toolCount: tools.length, tools }
}

const live = await liveManifest()
const json = JSON.stringify(live, null, 2) + "\n"

if (CHECK) {
  if (!existsSync(MANIFEST)) { console.error("✗ manifest missing — run `node scripts/sync-manifest.mjs`"); process.exit(1) }
  const committed = readFileSync(MANIFEST, "utf8")
  const norm = (s) => JSON.stringify(JSON.parse(s))
  // Compare the tool SET (names/tiers/scope/billing), ignoring the source note.
  const pick = (o) => ({ toolCount: o.toolCount, tools: o.tools })
  if (norm(JSON.stringify(pick(JSON.parse(committed)))) === norm(JSON.stringify(pick(live)))) {
    console.log(`✓ manifest-drift: committed == live (${live.toolCount} tools)`)
    process.exit(0)
  }
  const committedNames = new Set(JSON.parse(committed).tools.map((t) => t.name))
  const liveNames = new Set(live.tools.map((t) => t.name))
  const added = [...liveNames].filter((n) => !committedNames.has(n))
  const removed = [...committedNames].filter((n) => !liveNames.has(n))
  console.error(`✗ manifest-drift: committed (${committedNames.size}) != live (${liveNames.size})`)
  if (added.length) console.error(`  live has (commit these): ${added.join(", ")}`)
  if (removed.length) console.error(`  live dropped: ${removed.join(", ")}`)
  console.error("  Run `node scripts/sync-manifest.mjs` and commit schemas/tools.manifest.json.")
  process.exit(1)
}

writeFileSync(MANIFEST, json)
console.log(`✓ wrote ${MANIFEST} (${live.toolCount} tools)`)
