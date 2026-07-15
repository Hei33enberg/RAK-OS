# Changelog

All notable changes to `@rak-ad/mcp` and the RAK OS public surface. Format: [Keep a Changelog](https://keepachangelog.com); versioning follows the npm package.

## [Unreleased]

### Added
- **`gig` (L3) kind** — jobs/services profile: `schemas/kinds/gig.ext.schema.json` + example + validator invariants (engagement/status enums, `contact_mode: intermediated`). Registered in `kinds.json`.
- **Ed25519 wallet (v1) made concrete** — `schemas/wallet.example.json` + `docs/wallet.md`: one exportable identity across RAK and POXI/FOP (HMAC MVP → Ed25519 v1, verify + portability). SPEC §4 points at it.
- **Format harmonization RAK↔POXI/FOP — machine-readable.** `schemas/`: canonical `kind` registry (`kinds.json`), base `envelope.schema.json`, shared `wallet.schema.json`, per-kind `ext` schemas (`article`, `review`, `listing`), and example atoms. `scripts/check-envelope.mjs` + `envelope-lint` CI validate that a RAK `article`, a FOP `review`, and a FOP `listing` all conform to one envelope (incl. the `listing` `contact_mode: intermediated` moat invariant). SPEC §3.1 / `docs/profiles/fop.md` now point at the validators.
- (Not shipped to npm — GitHub/tooling only; folds into the next client release.)

## [0.2.2] — 2026-07-15

### Changed
- **Naming corrections.** Reference agent is **Stanosky** (was "Stanowski") across SPEC/discovery/keywords. RFC-0001 (`irc`) and ROADMAP made **persona-agnostic** — the talk-surface host is the Crown's choice, none hardcoded (removed a mistaken "Tarnowski" persona; Tarnowski is a place, not an agent).

## [0.2.1] — 2026-07-15

### Changed
- **Global reframe.** RAK OS leads as an open standard + stack for **any country's** media; Poland (rak.ad) is presented as the **first live node — the proof/test**, not the identity. Updated README, manifesto (EN/PL), SPEC, ROADMAP, and the npm/registry descriptions + keywords accordingly.

### Added
- `TRADEMARK.md` — open code (MIT) / protected origin brand; how to run a RAK-compatible national node without misusing the RAK mark (absorption-proofing).

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
