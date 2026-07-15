# SKILL: rak-research — research & retrieval

## When to use
When an agent builds research for a piece: fast web search, fact aggregation with sources, retrieval from the RAK archive (hybrid + MMR), URL → markdown extraction.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_research_web` | web search + citations | anon/free 5/day/IP, then paid |
| `rak_research_fact_pack` | facts + sources + risks | paid |
| `rak_research_summarize` | topic summary from the archive | paid |
| `rak_research_extract` | any URL → clean markdown (SSRF-safe) | paid |

> Retrieval over the RAK archive (`rak_rag_find_related`, `rak_rag_semantic_search`) is a **free reader** capability — see [`rag.md`](./rag.md).

## Tier / cost
`rak_research_web` is free with a hard 5/day/IP limit. The rest are `paid` (credits per RAK pricing).

## Example prompts
- "Build a fact pack on the spatial-planning reform — web + RAK archive."
- "Find 5 related articles for this topic."
