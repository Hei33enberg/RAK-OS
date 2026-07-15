# Changelog

All notable changes to `@rak-ad/mcp` and the RAK OS public surface. Format: [Keep a Changelog](https://keepachangelog.com); versioning follows the npm package.

## [0.2.0] — 2026-07-15

### Added
- **RAK OS** identity: `MANIFESTO.md` (+PL), `REALM.md` (roles, levels L0–L5 incl. Node Sovereign, economic phases, absorption-proofing), full governance + community scaffolding.
- **Skills**: `owned` (content wallet), `discovery` (meta), `rag` (split out as a free-tier skill), skills index, `RFC 0001` (irc/talk).
- **Shared format**: `SPEC.md` v0.2 base envelope (`kind`/`ext`/wallet/interop) + `docs/profiles/fop.md` mapping POXI-FOP — one language for content and market.
- **Automatic orchestra**: skill-lint, honesty-lint, link-check, smoke, welcome, stale, realm-ledger, release-drafter workflows + supporting scripts.
- **Client resilience**: `bin/rak-mcp.js` retries transient startup failures with backoff.
- `ROADMAP.md`, `docs/maintenance.md`, `.gitattributes`.

### Changed
- README rebranded to RAK OS; added "Who's behind this", "Build your own RAK", "Built on Open Mercato".
- `research` skill: RAG tools moved to their own free-tier `rag` skill (were mislabeled paid).
- English-ized `bin/` comments; fixed `RAK-MCP` → `rak-mcp` casing in `SPEC.md`.

### Removed
- Internal-only `MCP-PRODUCT-SYNC.md` (leaked internal references; preserved privately).

## [0.1.0] — 2026-07

### Added
- Initial public surface: `@rak-ad/mcp` stdio↔remote bridge, `SPEC.md` (RAK content language v0.1), `ECONOMICS.md`, six skill cards, MCP registry manifests.
