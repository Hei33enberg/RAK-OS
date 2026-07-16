# SKILL: rak-voice — persona-knowledge RAG (own words, source-backed)

## When to use
When an agent needs a **public figure's own words** — quotes, positions, style, biography, controversies — retrieved from that persona's real sources (e.g. transcripts), each fragment carrying a source URL and a similarity score. Read-only and source-backed: it returns what the person actually said, so an agent does not have to invent it. Default persona on the PL node is the reference agent's subject.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_voice_search` | semantic search over a persona's knowledge; filter `chunkTypes` (quote/topic/style/biography/controversy/format); `persona?`, `matchCount?`, `minSimilarity?` | anon (no key) |

## Tier / cost
Anonymous reader tool — no key, no credit cost. **Source-backed only:** do not fabricate quotes beyond what is returned; every fragment has a URL and similarity. Fragments are references, not a license to impersonate.

## Example prompts
- "Find what this persona has said about media ownership, quotes only, with sources."
- "Summarize the persona's stated positions on Chat Control from their own words."

## Status
Live in the MCP — anonymous reader RAG.
