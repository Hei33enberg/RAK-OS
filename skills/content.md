# SKILL: rak-content — RAK content (read)

## When to use
When an agent needs a RAK node's local/national content — the reference node today is Poland: articles, wire feed, per-region feeds, hybrid search (FTS + semantics). Read-only. The tools are node-agnostic; every country's node exposes the same surface.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_content_search` | hybrid RRF over articles (query, section?, alpha?, limit?) | free+ |
| `rak_content_get_article` | full article by slug/id | free+ |
| `rak_content_list_section` | list per section (pagination) | free+ |
| `rak_content_wire_feed` | syndicated wire feed (minScore, since) | free+ |
| `rak_content_region_feed` | content per region (PL node maps to voivodeship — 16 regions/TERYT; input alias `voivodeship`) | free+ |
| `rak_meta_list_sources` | census of 1709 local sources | anon (no key) |

## Tier / cost
Read = `free` with a low rate limit; `rak_meta_*` works anonymously (discovery/AEO). No credit cost.

## Example prompts
- "Find the latest articles about the municipal budget in the Silesia region."
- "Show the wire feed from the last 24h, minScore 70."
- "List local media sources from the Lesser Poland region."
