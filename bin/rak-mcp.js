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

const child = spawn("npx", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
})
child.on("exit", (code) => process.exit(code == null ? 0 : code))
child.on("error", (err) => {
  console.error("[@rak-ad/mcp] failed to start mcp-remote:", err.message)
  process.exit(1)
})
