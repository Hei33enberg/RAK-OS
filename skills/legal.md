# SKILL: rak-legal — Polish-law corpus RAG (ELI/ISAP)

## When to use
When an agent needs **citable fragments of Polish law** — statutes and legal documents from the official ELI/ISAP corpus — for drafting, analysis, or grounding an answer. Returns source-backed fragments with a similarity score. Read-only and source-backed.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_legal_search` | semantic search over the Polish-law corpus; `court?` filter, `matchCount?`, `minSimilarity?` | anon (no key) |

## Tier / cost
Anonymous reader tool — no key, no credit cost. **Not legal advice:** it returns statute fragments with sources; an agent must not present the output as counsel. Cite the fragment, not an invented rule.

## Example prompts
- "Find the Polish-law fragments on consumer warranty (rękojmia) with sources."
- "Ground this claim about tenancy law in the actual statute text."

## Status
Live in the MCP — anonymous reader RAG. Corpus grows as ELI/ISAP is ingested.
