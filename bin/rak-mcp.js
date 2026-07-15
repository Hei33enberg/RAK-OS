#!/usr/bin/env node
/**
 * @rak-ad/mcp — zero-config bridge to the hosted RAK MCP (remote streamable-HTTP).
 *
 * stdio-only clients (that can't speak remote MCP) run `npx -y @rak-ad/mcp`; this wrapper
 * proxies stdio <-> https://rak.ad/api/mcp/rak/mcp via `mcp-remote`. Clients with native remote
 * MCP (Claude Code, Cursor) can skip the package and wire the URL directly.
 *
 * ENV:
 *   RAK_API_KEY   — an `rk_…` key (without it = free/anonymous tier: read + capped research tools).
 *   RAK_BASE_URL  — optionally override the host (default https://rak.ad).
 */
import { spawn } from "node:child_process"

const base = (process.env.RAK_BASE_URL || "https://rak.ad").replace(/\/+$/, "")
const url = `${base}/api/mcp/rak/mcp`
const key = (process.env.RAK_API_KEY || "").trim()

const args = ["-y", "mcp-remote", url, "--header", "x-tenant-id: rak"]
if (key) args.push("--header", `Authorization: Bearer ${key}`)

// Autohealing: transient network/DNS blips at launch can make mcp-remote exit
// immediately. Retry only *fast* startup failures (ran < 5s, non-zero exit), with
// backoff, up to a small cap. A clean exit (code 0) or a long-running session that
// ends is passed through untouched — we never hot-loop and never retry a real close.
const MAX_FAST_RETRIES = 3
let fastFailures = 0

function start() {
  const startedAt = Date.now()
  const child = spawn("npx", args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  })
  child.on("exit", (code) => {
    if (code === 0 || code == null) process.exit(0)
    const ranMs = Date.now() - startedAt
    if (ranMs < 5000 && fastFailures < MAX_FAST_RETRIES) {
      fastFailures += 1
      const backoff = 1000 * 2 ** (fastFailures - 1)
      console.error(`[@rak-ad/mcp] startup failed (exit ${code}); retry ${fastFailures}/${MAX_FAST_RETRIES} in ${backoff}ms…`)
      setTimeout(start, backoff)
      return
    }
    process.exit(code)
  })
  child.on("error", (err) => {
    console.error("[@rak-ad/mcp] failed to start mcp-remote:", err.message)
    process.exit(1)
  })
}

start()
