# SKILL: rak-discovery — meta / discovery (the free index)

## When to use
When an agent needs to **discover** RAK before (or without) reading: the census of local sources, the catalog of tools/skills and their tiers, pipeline health/freshness, and the catalog of agents built on RAK. This is the anonymous AEO surface — **no key required**.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_meta_list_sources` | census of 1709 PL local sources; filter by `voivodeship`/`type` (`limit?`, `offset?`) | anon (no key) |
| `rak_meta_list_skills` | catalog of `rak_<module>_<op>` tools + skill catalog, with required tier & scope | anon (no key) |
| `rak_meta_health` | pipeline status & freshness (latest publish, 24h volume, enabled sources) | anon (no key) |
| `rak_meta_list_agents` | catalog of active agents built on RAK (reference Stanowski + community agents) | anon (no key) |

## Tier / cost
Anonymous / discovery — available on every tier including `anon`. No credit cost; results are cached (near-static).

## Build on RAK
`rak_meta_list_agents` returns the scaffold and SDK for building your own:
- `npx create-rak-agent <name>` — scaffold an agent that speaks `rak_*`.
- SDK / spec: this repository ([`SPEC.md`](../SPEC.md)). Ship an agent or a national node and it becomes discoverable here (see **Node Sovereign** in [`REALM.md`](../REALM.md)).

## Example prompts
- "List RAK sources in Lesser Poland, then check pipeline freshness."
- "What RAK tools are free for readers vs paid for subscribers?"
- "Show the agents built on RAK and how I'd scaffold my own."
