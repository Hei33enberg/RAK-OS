# The RAK Realm — roles, levels, and the economics of the kingdom

> How the community builds RAK OS, how contribution is credited in the open, and how the commons is made hard to capture. Governance is [`GOVERNANCE.md`](./GOVERNANCE.md); this document is the **ledger and the ladder**.

RAK OS is a kingdom, honestly (see [`MANIFESTO.md`](./MANIFESTO.md)): one maintainer holds the vision and the last word (BDFL). Everyone else **builds** and is **credited**. The Realm is how that credit is structured — a standard OSS recognition ladder with royal names, plus an explicit plan so no single point of failure (a person, a login, a domain) can hand the project to a larger player.

## Roles

Each role carries a royal name and its plain open-source equivalent. Roles describe standing in the project; they are not employment and carry no financial promise unless one is explicitly stated below.

| Realm role | OSS equivalent | What it means |
|---|---|---|
| **Citizen** / Obywatel | member / reader | Anyone using RAK OS. No barrier. |
| **Correspondent** / Korespondent | first-time contributor | Landed your first substantive merged PR. |
| **Editor** / Redaktor | recognized contributor | 3+ substantive merged PRs → a row in the Hall of Fame. |
| **Bureau Chief** / Szef Redakcji | area maintainer | Sustained ownership of an area; triage + merge rights there. |
| **Herald** / Herold | ambassador / DevRel | Sustained propagation — writing, talks, integrations. Crown-nominated. |
| **Warden** / Strażnik | security researcher | Responsible disclosure and hardening (see [`SECURITY.md`](./SECURITY.md)). |
| **Node Sovereign** / Suweren Węzła | certified partner | Runs a forked national/vertical RAK node in production. |
| **The Crown** | founder / BDFL | Holds the vision, the mark, and the final word. Currently [@Hei33enberg](https://github.com/Hei33enberg). |

## Levels (L0–L5)

Levels are earned by contribution, tracked in the open, and reflected in [`HALL_OF_FAME.md`](./HALL_OF_FAME.md). "Substantive" means a merged PR labelled `substantive` by a Bureau Chief or higher (docs typo fixes are welcome but do not level you up — this is the anti-farming rule).

| Level | Realm role | Gate |
|---|---|---|
| **L0** | Citizen | Show up. Open an issue, connect the MCP, run a node locally. |
| **L1** | Correspondent | **1** substantive merged PR. |
| **L2** | Editor | **3+** substantive merged PRs → listed in the Hall of Fame. |
| **L3** | Bureau Chief | **5+** PRs and ~3 months sustained in an area → merge rights there. |
| **L4** | Herald | Sustained propagation (content / talks / integrations). Crown-nominated. |
| **L5** | Node Sovereign | A live forked RAK node in production, discoverable via `rak_meta_list_agents`. |

L5 is the load-bearing tier of the whole project: **"fork your country's RAK"** made concrete. The `rak_agents` registry already exists — an agent or node you stand up is discoverable (via `rak_meta_list_agents`) by every RAK-speaking agent the day it goes live. Today you build against `rak_*` directly (the [`SPEC.md`](./SPEC.md) + MCP); the one-command `create-rak-agent` scaffold is on the [roadmap](./ROADMAP.md).

## Rewards per level

Split into what we can honestly offer **now** and what is explicitly gated.

**Promisable today** (non-financial):
- Recognition: a row in the open ledger, a level badge, your node/agent listed at rak.ad and in `rak_meta_list_agents`.
- Repository rights: triage → merge, growing with level.
- Early access to specs and RFCs, and a direct line to the Crown for L4+.

**When the payout rail ships** ([`ECONOMICS.md`](./ECONOMICS.md)):
- **Creators** of owned content earn a share of pay-per-AI-citation. This is the metered creator economy already being built (metering live; valuation + accrual behind a flag; payout last). It is a content-monetization mechanism, not equity.

**Phase 3 — OWNER-GATED (nothing offered or implied today):**
- Any revenue-share, equity, or token tied to *code/infrastructure* contribution. Not on the table until the Crown puts it there, in writing, with legal structure. See the phases below.

## The three economic phases

1. **Phase 1 — Ledger (now).** A non-financial points/levels ledger. Contribution is counted and credited in the open. No money moves. This is all that is live for contributors.
2. **Phase 2 — Infrastructure share (in-kind).** As the network of national nodes, mirrors, and relays grows, contributors who **run infrastructure** (mirror hosts, domain pool, national nodes) are recognized and resourced in-kind. Still not securities.
3. **Phase 3 — Tokenization / equity (future option only).** Any financial stake is a **future option, gated by the Crown**, and would ship only with an explicit legal structure and a written risk section (securities / MiCA and equivalents). **Nothing is issued, promised, or implied by this document.** If you are here for a token, there isn't one.

## Succession & absorption-proofing

The lesson of projects absorbed by larger players (a founder hired, and with them the brand, the accounts, and the decisions) is simple: **growth without structure is an acquisition waiting to happen.** You cannot absorb what isn't concentrated in one buyable person.

So: **the Crown holds the DNA — the vision, the RAK mark, the veto, the spec. The kingdom holds the infrastructure — org, domains, treasury, succession.** These are deliberately separated.

Owner checklist (tracked as owner actions, not done automatically):

- [ ] GitHub org with **2+ owners** (no single-login single point of failure).
- [ ] A **second npm owner** on the `@rak-ad` scope.
- [ ] **Registrar redundancy** for `rak.ad` and the national-node domain pool.
- [ ] **Multi-sig** on any treasury.
- [ ] Evaluate a legal entity (foundation / Verein) to **hold the trademark and domains**, matching the sovereign-but-not-personally-captured posture.
- [ ] A **written succession plan**, held privately by the Crown.

---

*Build in the open. Get credited in the open. The vision stays with the Crown, the commons stays with everyone.*
