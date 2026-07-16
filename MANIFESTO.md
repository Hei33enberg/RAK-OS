# RAK — Media without an owner

> **They own the feed. We own the format.**
> Give the media back to the people — and to the agents that now read for them.

*(Polski: [`MANIFESTO.pl.md`](./MANIFESTO.pl.md).)*

---

## What RAK OS is

RAK OS is an **open content language for the agentic web** and a free reference stack built on top of it. You write once; the content is **owned by its creator**, **cited by any AI agent**, and **fresh** — because the machine that reads the world for you should not have to scrape it, and the author who wrote it should not be paid nothing.

The contract is [`SPEC.md`](./SPEC.md). The economics are [`ECONOMICS.md`](./ECONOMICS.md). The **first** reference node is [rak.ad](https://rak.ad) — a live index of Poland's local media (1709 sources, 16 regions): the proof, not the point. Everything here is MIT. The node is one implementation; the language — and the movement — are for every country.

## Why we exist

A handful of owners decide what most of the world reads: a few platforms, a few holding companies, a few feeds. Now AI agents read on top of that layer — scraping content, paying the authors nothing, laundering provenance on the way. The next decade adds pressure, not relief: automated moderation, scanning mandates, consolidation, and blocs that each want the feed to point their way.

We think the antidote is boring and durable: **an open format, a free index, and no single owner of either.** Not a better walled garden. A commons that any country, community, or creator can run themselves.

## What we believe

- **Information is infrastructure, not merchandise.** What you read — and what an agent reads for you — is not a product to be surveilled and sold. The reader tier of RAK works with **no key and no account**.

- **One open format.** Write once, own it, let every agent cite it. A small, versioned object ([`SPEC.md`](./SPEC.md)) that composes existing standards (RSL for licensing, C2PA for provenance, MCP for transport, x402/ACP for payment) instead of reinventing them.

- **Aggregate the local.** The stories that get captured first are local ones, because local newsrooms are cheapest to buy or starve. RAK indexes them — every region, every county — into one place that is expensive to capture because it is not one place.

- **Owned, and paid.** A creator's content carries a portable content-wallet (`wallet.json` — [SPEC §4](./SPEC.md)). Provenance is verifiable; tampering is detectable; identity travels between nodes. When a paying agent cites owned content, value flows back to the creator ([`ECONOMICS.md`](./ECONOMICS.md)).

- **No scanning backdoors.** On client-side scanning mandates like "Chat Control", our answer is simple: we would leave a market before we would wire a back door into a reader. We do not make absolute promises we cannot keep — we tell you plainly what is server-readable and what is not, in the code, in this repo.

- **Grassroots, self-funded, sovereign.** No billions from the US or China behind this. No venture capital, no private equity, no public listing deciding the roadmap. The project funds itself from its own commercial node and stays small enough to say no.

- **A kingdom, honestly.** One maintainer holds the vision and the last word — a single-owner (BDFL) model, the same one that carried Linux, Python and SQLite for years. We say this openly because pretending a project is a democracy when one person decides is the dishonest version. The community **builds** and is **credited** in an open ledger ([`REALM.md`](./REALM.md)).

- **Fork your nation's RAK.** Poland's node stays with its maintainer. The **OS is MIT** — stand up your own country's RAK, for free, forever. The format and the origin brand stay sovereign, so the commons cannot be captured by capturing one person. Build on it by speaking `rak_*` today (a one-command scaffold is on the roadmap); run a node to become one.

- **Built on a reliable engine.** RAK runs on [Open Mercato](https://github.com/open-mercato/open-mercato), an open runtime we did not have to reinvent. We are honest about the stack: durability comes from boring, inspectable foundations, not magic.

- **Toward the edge.** The direction is decentralization and portability — identity you can export, content that outlives any one host. Parts of that are shipped (`wallet.json`); parts are experimental and labelled as such. We promise no token and sell no coin.

## What we will never do

- Wire a scanning backdoor into a reader, on any government's demand.
- Sell the commons to a media holding company, or let one own the format.
- Take money that comes with control of the roadmap.
- Break the spec silently. Tools are deprecated with a window, never yanked.
- Make claims we cannot back in the code — no "uncensorable", no "no logs ever", no "unbannable".

## What we ask of you

Check our claims in the code — this repo is the posture document. Build an agent on RAK. Stand up a node for your country. Cite the creators you read. Credit accrues in the open ([`REALM.md`](./REALM.md)); the vision stays with the Crown.

---

*Trust the format, not the owner.*
**— Hei33enberg, 2026.**
