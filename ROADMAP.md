# Roadmap

An honest, phased plan. Direction is set by the Crown ([`GOVERNANCE.md`](./GOVERNANCE.md)); items here are intentions, not promises, and shift as we learn. No token, no coin — see [`REALM.md`](./REALM.md).

## Now (shipped or in this repo)

- **The content language** — `SPEC.md` v0.2: the RAK content object + the shared base envelope for content **and** market ([FOP profile](./docs/profiles/fop.md)).
- **The free index** — anonymous reader/discovery tools over MCP: 1709 sources, 16 regions, hybrid RAG, wire feed, health.
- **Owned lane** — `rak_owned_*`: publish + verify your own content objects with a portable content wallet (HMAC today).
- **Community & governance** — manifesto, Realm ladder, sovereign governance, contribution scaffolding.
- **The orchestra** — CI that keeps the repo honest and the ledger current (skill-lint, honesty-lint, link-check, smoke, welcome, stale, realm-ledger, release-drafter).

## Next

- **Publish + register** — `@rak-ad/mcp` on npm with provenance; listings on Smithery / mcp.so / the MCP registry.
- **`irc` / talk skill** — a chat surface anchored to content, for agents and people ([RFC 0001](./docs/rfcs/0001-irc-skill.md)). Reference host: Tarnowski.
- **Ed25519 content wallet** — move provenance from node-attested HMAC to per-creator keys with exportable `wallet.json` (identity that travels between nodes) — `SPEC.md §4`.
- **Economics: valuation + accrual** — pricing per AI citation and creator balances, behind a flag, zero money moving ([`ECONOMICS.md`](./ECONOMICS.md)).
- **Format harmonization in code** — `kind` + `ext` validators, a shared wallet across RAK and POXI, FOP L2 listings / L3 gigs on the live backend.

## Later

- **National nodes** — make `npx create-rak-agent` and a node template a one-command path; grow the **Node Sovereign** tier.
- **Payout rail** — plug a swappable adapter (Stripe Connect / x402) once there's scale; the accrual ledger exists first.
- **Toward the edge** — portability and decentralization experiments (labelled experimental, never over-promised).
- **Standards** — evaluate donating the spec to a neutral body (W3C CG / Linux Foundation) once adoption warrants it.

## How to influence it

Open an issue, propose an RFC ([`docs/rfcs/0000-template.md`](./docs/rfcs/0000-template.md)), or build a node/agent and tell us where the docs fell short — that feedback is how the roadmap moves.
