# AGENTS.md — contributing as (or with) an AI agent

RAK OS is a layer for agents. We expect agents to help build it. This file tells a coding agent (Claude Code, Cursor, etc.) how to contribute here without breaking things. Humans: this is also a concise map of the repo.

## What this repo is

The public surface of RAK OS: the content-language spec, the economics, the skill cards, and the `@rak-ad/mcp` client that bridges any MCP agent to the RAK node. The tools themselves run remotely at rak.ad; this repo is docs + the thin client + community/governance. Start with [`README.md`](./README.md), [`MANIFESTO.md`](./MANIFESTO.md), [`SPEC.md`](./SPEC.md).

## Layout

| Path | What |
|---|---|
| `SPEC.md` / `ECONOMICS.md` | the content language + the pay-per-citation model |
| `skills/*.md` | one card per tool family (`rak_<module>_<op>`) |
| `docs/profiles/` | conformance profiles (e.g. FOP/POXI) |
| `docs/rfcs/` | RFCs (advisory → Crown-ratified) |
| `bin/rak-mcp.js` | the stdio↔remote bridge client |
| `*.json` / `smithery.yaml` | MCP registry + plugin manifests |
| `.github/workflows/` | the automatic orchestra (lint, honesty, ledger, welcome, stale) |
| `community/` | the Realm ledger + surfaces registry |

## Rules for changes

1. **Keep it minimal and focused.** One concern per PR.
2. **The spec is a contract.** Additive where possible. Breaking changes need an RFC ([`docs/rfcs/0000-template.md`](./docs/rfcs/0000-template.md)) and Crown ratification ([`GOVERNANCE.md`](./GOVERNANCE.md)).
3. **Match the skill-card format.** New/edited `skills/*.md` must keep the sections `# SKILL:`, `## When to use`, `## Tools`, `## Tier`, `## Example prompts`. Only document tools that actually exist on the node.
4. **Honesty.** No absolute security/privacy claims (`unbannable`, `no logs ever`, …) and no internal references (tracker IDs, internal role names) in public docs. Be precise about what is server-readable.
5. **Versions stay in sync** across `package.json`, `server.json`, `claude-plugin.json`.

## Verify before you open a PR

```bash
node scripts/check-skills.mjs     # skill format, version consistency, JSON, internal links
node scripts/check-honesty.mjs    # no absolute claims / internal leaks
```

Both run in CI ([`.github/workflows`](./.github/workflows)) and must be green.

## Spec-issue format (for agent-scoped work)

Good-first-issues are written to be executable by an agent: a clear title, the file(s) to touch, the acceptance check (usually "the two scripts above pass"), and a link to the relevant spec section. If you are an agent picking one up, restate the acceptance check in your PR description and show the scripts passing.

## Build on RAK

To build an agent that speaks RAK (not just edit this repo): `npx create-rak-agent <name>`, then list it via `rak_meta_list_agents`. To run a national/vertical node, see **Node Sovereign** in [`REALM.md`](./REALM.md). The layer for agents, built by agents.
