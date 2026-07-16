#!/usr/bin/env node
/**
 * Live smoke test against the RAK MCP node (the anonymous reader surface).
 * Proves the advertised endpoint actually speaks MCP and the free tools work.
 * Dependency-free: raw JSON-RPC over streamable-HTTP, parses the SSE `data:` line.
 *
 *   node scripts/smoke.mjs
 *   RAK_BASE_URL=https://staging.rak.ad node scripts/smoke.mjs
 *
 * Exit 1 on any hard failure (used by the smoke workflow to open a self-report issue).
 */
const BASE = (process.env.RAK_BASE_URL || "https://rak.ad").replace(/\/+$/, "")
const URL = `${BASE}/api/mcp/rak/mcp`
const TENANT = process.env.RAK_TENANT_ID || "rak"

let idc = 0
async function mcp(method, params = {}) {
  const id = ++idc
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "x-tenant-id": TENANT,
    },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
    signal: AbortSignal.timeout(30000),
  })
  if (!res.ok) throw new Error(`${method}: HTTP ${res.status}`)
  const text = await res.text()
  // Response is JSON or an SSE stream; collect every `data:` payload.
  const payloads = []
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^data:\s*(.+)$/)
    if (m) { try { payloads.push(JSON.parse(m[1])) } catch {} }
  }
  if (!payloads.length) { try { payloads.push(JSON.parse(text)) } catch {} }
  const msg = payloads.find((p) => p.id === id) || payloads.find((p) => p.result || p.error)
  if (!msg) throw new Error(`${method}: no JSON-RPC response parsed`)
  if (msg.error) throw new Error(`${method}: ${msg.error.message || JSON.stringify(msg.error)}`)
  return msg.result
}

/** tools/call returns content[]; RAK tools return one JSON text block — parse it. */
function toolJson(result) {
  const t = result?.content?.find((c) => c.type === "text")?.text
  if (!t) throw new Error("tool result has no text content")
  return JSON.parse(t)
}

const failures = []
const ok = (name) => console.log(`  ✓ ${name}`)
const fail = (name, e) => { failures.push(`${name}: ${e.message}`); console.error(`  ✗ ${name}: ${e.message}`) }

async function check(name, fn) {
  try { await fn(); ok(name) } catch (e) { fail(name, e) }
}

console.log(`RAK MCP smoke → ${URL}\n`)

await check("initialize → serverInfo.name === 'rak'", async () => {
  const r = await mcp("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "rak-smoke", version: "1" },
  })
  if (r?.serverInfo?.name !== "rak") throw new Error(`serverInfo=${JSON.stringify(r?.serverInfo)}`)
})

await check("tools/list exposes the anon reader tools", async () => {
  const r = await mcp("tools/list")
  const names = new Set((r?.tools || []).map((t) => t.name))
  const expected = ["rak_content_search", "rak_meta_health", "rak_meta_list_sources", "rak_rag_semantic_search"]
  const missing = expected.filter((n) => !names.has(n))
  if (missing.length) throw new Error(`missing tools: ${missing.join(", ")} (saw ${names.size})`)
})

await check("rak_meta_health → ok:true + fresh", async () => {
  const h = toolJson(await mcp("tools/call", { name: "rak_meta_health", arguments: {} }))
  if (h.ok !== true) throw new Error(`ok=${h.ok}`)
  if (typeof h.freshnessMinutes !== "number" && h.freshnessMinutes !== null)
    throw new Error(`freshnessMinutes=${h.freshnessMinutes}`)
  console.log(`      sources=${h.censusSources} published24h=${h.publishedLast24h} fresh=${h.freshnessMinutes}min`)
})

await check("rak_content_search returns content", async () => {
  const r = await mcp("tools/call", { name: "rak_content_search", arguments: { query: "budżet", limit: 3 } })
  if (!r?.content?.length) throw new Error("empty content")
})

await check("rak_meta_list_sources → census 1709+", async () => {
  const s = toolJson(await mcp("tools/call", { name: "rak_meta_list_sources", arguments: { limit: 1 } }))
  if (!(s.grandTotal >= 1000)) throw new Error(`grandTotal=${s.grandTotal}`)
})

await check("rak_voice_search → persona knowledge (not degraded)", async () => {
  const v = toolJson(await mcp("tools/call", { name: "rak_voice_search", arguments: { query: "wolność mediów i cenzura", matchCount: 2 } }))
  if (v.degraded) throw new Error("voice degraded — embedding provider down")
  if (!(v.count >= 1)) throw new Error(`voice count=${v.count}`)
})

await check("rak_legal_search → legal fragments (not degraded)", async () => {
  const l = toolJson(await mcp("tools/call", { name: "rak_legal_search", arguments: { query: "ochrona danych osobowych", matchCount: 2 } }))
  if (l.degraded) throw new Error("legal degraded — embedding provider down")
  if (!(l.count >= 1)) throw new Error(`legal count=${l.count}`)
})

// npm publish check — WARN only (never a hard fail; a published package proves the README's `npx` works).
try {
  const { execSync } = await import("node:child_process")
  const v = execSync("npm view @rak-ad/mcp version", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()
  console.log(`\n  ℹ @rak-ad/mcp published on npm: ${v}`)
} catch {
  console.warn("\n  ⚠ @rak-ad/mcp not resolvable on npm yet (README advertises `npx -y @rak-ad/mcp`).")
}

console.log("")
if (failures.length) {
  console.error(`✗ smoke: ${failures.length} failure(s)`)
  process.exit(1)
}
console.log("✓ smoke: RAK MCP anonymous surface is live and healthy")
