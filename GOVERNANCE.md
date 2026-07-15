# Governance

RAK OS is governed as a **sovereign-maintainer (BDFL) project** — a kingdom, not a democracy. We state this openly because the dishonest version is a project that pretends to run on votes while one person actually decides. Here, one person actually decides, and says so. This formalizes what [`SPEC.md §11`](./SPEC.md) already calls "company-led-open".

The same model carried Linux (Linus Torvalds), Python for two decades (Guido van Rossum), and SQLite (D. Richard Hipp). It trades committee legitimacy for clarity of direction and the ability to say no — which is the whole point of a project whose mission is to stay uncaptured.

## Who decides

- **The Crown** (the sovereign maintainer, currently [@Hei33enberg](https://github.com/Hei33enberg)) holds the vision, the RAK mark, and the final word on any change.
- **Bureau Chiefs** (area maintainers) have merge rights in their area and a technical veto on changes that would harm it. A Bureau Chief's veto can be overridden only by the Crown, in writing.
- Roles and how they are earned: [`REALM.md`](./REALM.md). Who currently holds them: [`MAINTAINERS.md`](./MAINTAINERS.md).

## How changes are made

- **Routine changes** (fixes, docs, additive tools) use **lazy consensus**: propose via PR; if no area maintainer objects within a reasonable window, it merges. The Crown may override in either direction.
- **Substantive changes** (spec, protocol surface, governance, economics) go through an **RFC** in [`docs/rfcs/`](./docs/rfcs). RFCs are **advisory**: they gather the argument and the objections, then the Crown **ratifies** or declines. A ratified RFC is binding until a superseding RFC is ratified.
- **The spec is a contract.** Breaking changes bump the major version; tools are deprecated with a support window, never silently broken ([`SPEC.md §11`](./SPEC.md)).

## Funding

RAK OS funds itself from its own commercial reference node (rak.ad) and node-network economics ([`ECONOMICS.md`](./ECONOMICS.md)). It does **not** take venture capital, private equity, or public-market money that would come with control of the roadmap. This is a governance rule, not a preference.

## Forks and national nodes

The OS is MIT. Anyone may fork it and run a national or vertical node — this is encouraged (see **Node Sovereign** in [`REALM.md`](./REALM.md)). What does not transfer with a fork is the **RAK trademark** and the origin brand, which stay with the Crown ([`TRADEMARK.md`](./TRADEMARK.md)). Open protocol, protected reference node.

## Changing this document

Changes to governance go through an RFC and require Crown ratification. Succession is described in [`REALM.md`](./REALM.md) (absorption-proofing) and held in a private plan by the Crown.
