# SKILL: rak-rag — retrieval over the RAK archive (free reader)

## When to use
When an agent needs semantic retrieval over the RAK archive: articles related to a query or to a specific article, and dense vector search. **Free reader tier** — every result carries a canonical `rak.ad` URL so it is directly citable (AEO).

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_rag_find_related` | related articles to a `query` **or** to an article (`slug`); `count?` (default 6), `section?` | free (reader) |
| `rak_rag_semantic_search` | hybrid dense + FTS search over article embeddings; `query`, `matchCount?` (default 10), `section?` | free (reader) |

## Tier / cost
`free` reader tier (available from `anon`), `content:read` scope, no credit cost. The tiny embedding cost is absorbed; both tools are rate-limited and cached. `semantic_search` falls back to sparse FTS if the embedding provider is down, so it returns results instead of an empty set.

## Notes
- Results include an absolute canonical `rak.ad` URL, `similarity`, section and excerpt — ready to cite.
- For fresh listings/feeds use [`content`](./content.md); for web + external research use [`research`](./research.md).

## Example prompts
- "Find 6 RAK articles related to the spatial-planning reform."
- "Semantic-search the RAK archive for coverage of the local budget in Silesia."
