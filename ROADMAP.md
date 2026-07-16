# Roadmap

An honest, phased plan. Direction is set by the Crown ([`GOVERNANCE.md`](./GOVERNANCE.md)); items here are intentions, not promises, and shift as we learn. No token, no coin — see [`REALM.md`](./REALM.md).

## Now (shipped or in this repo)

- **The content language** — `SPEC.md` v0.2: the RAK content object + the shared base envelope for content **and** market ([FOP profile](./docs/profiles/fop.md)).
- **The first node (Poland)** — anonymous reader/discovery tools over MCP, live and free: 1709 sources, 16 regions, hybrid RAG, wire feed, health — the proof other countries fork.
- **Owned lane** — `rak_owned_*`: publish · list · get · verify your own content objects with a portable content wallet (HMAC today).
- **Chat surface** — `rak_irc_*` (channels anchored to content) and `rak_murl_*` (rooms anchored to any URL/domain): list, read, presence, post, create — live in the MCP (anon read, free post). [RFC 0001](./docs/rfcs/0001-irc-skill.md) is ratified; the fuller native-chat vision continues.
- **Persona & law RAG** — `rak_voice_search` (a public figure's own words, source-backed) and `rak_legal_search` (Polish-law corpus, ELI/ISAP), both anonymous reader tools.
- **Community & governance** — manifesto, Realm ladder, sovereign governance, contribution scaffolding.
- **The orchestra** — CI that keeps the repo honest and the ledger current (skill-lint, honesty-lint, link-check, smoke, welcome, stale, realm-ledger, release-drafter).

## Next

- **Registry listings** — `@rak-ad/mcp` is published on npm with provenance (0.2.2); extend listings to Smithery / mcp.so / the MCP registry.
- **Native chat, deeper** — the `irc`/`murl` surface is live (see *Now*); next is the fuller RFC-0001 vision (richer moderation, federation, community chat running on RAK itself). Host persona is the Crown's choice (none hardcoded).
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
