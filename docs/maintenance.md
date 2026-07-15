# Maintenance runbook

How RAK OS keeps itself healthy, and how to cut a release. For contributors and the Crown.

## The automatic orchestra (`.github/workflows`)

| Workflow | Trigger | What it does | Blocks merge? |
|---|---|---|---|
| `skill-lint` | push / PR | skill-card format, version consistency, JSON parse, internal links (`scripts/check-skills.mjs`) | **yes** |
| `honesty-lint` | push / PR | no absolute claims / internal leaks in public docs (`scripts/check-honesty.mjs`) | **yes** |
| `envelope-lint` | push / PR | example atoms conform to the shared envelope + kind rules (`scripts/check-envelope.mjs`) | **yes** |
| `link-check` | PR / weekly | external link health (lychee) | no (advisory; weekly opens a rolling issue) |
| `smoke` | nightly / manual | live MCP anon surface (`scripts/smoke.mjs`); opens/updates a `smoke-failing` issue, auto-closes on green | no (self-reports) |
| `welcome` | issue / PR opened | greets first-time contributors (message only) | no |
| `stale` | daily | stale `awaiting-response` threads after 30d/+14d, with exemptions | no |
| `realm-ledger` | weekly / manual | rebuilds the `HALL_OF_FAME.md` ledger from merged `substantive` PRs | no (self-commits `[skip ci]`) |
| `release-drafter` | push to main | drafts the next GitHub Release from merged PR labels | no |
| `release` | tag `v*` / manual | `npm publish --provenance` of `@rak-ad/mcp` | — |

## Local checks (run before a PR)

```bash
node scripts/check-skills.mjs     # format, versions, JSON, internal links
node scripts/check-honesty.mjs    # absolute-claim / internal-leak guard
node scripts/check-envelope.mjs   # shared RAK↔FOP envelope: examples conform to kinds + ext
node scripts/smoke.mjs            # live MCP anon surface (needs network)
```

## Cutting a release

The npm tarball ships only `bin/`, `skills/`, `README.md`, `LICENSE` (see `package.json` `files`).

1. Bump the version in **all three** manifests so `skill-lint` stays green: `package.json`, `server.json` (top-level **and** `packages[0].version`), `claude-plugin.json`.
2. Update `CHANGELOG.md`.
3. Merge to `main`.
4. Tag and push: `git tag v0.2.0 && git push origin v0.2.0` — this triggers `release.yml`, which publishes to npm with provenance using the `NPM_TOKEN` secret.
5. Verify: `npm view @rak-ad/mcp version`, then run `smoke` (it warns if the advertised package is unresolvable).

Never republish an existing version — bump instead (npm rejects duplicate versions).

## Drift prevention

The MCP surface mirrors the product at rak.ad. The canonical tool definitions live in the product runtime; this repo's `skills/*.md` document them. Keep them in sync when tools change (the internal sync strategy is tracked privately). `smoke.mjs` is the backstop: it calls the live tools nightly and self-reports regressions.

## Security

Vulnerabilities: private report per [`SECURITY.md`](../SECURITY.md). CI tokens are least-privilege (`GITHUB_TOKEN` scoped per workflow); `NPM_TOKEN` is only used by `release.yml`.
