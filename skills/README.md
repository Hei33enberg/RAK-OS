# RAK OS skills

Each skill is a card describing a family of `rak_<module>_<op>` tools: when to use it, the tools, the tier, and example prompts. Tools are spoken over MCP against the RAK node ([`../SPEC.md §6`](../SPEC.md)); the authoritative tier/scope matrix lives in the node's policy engine and is echoed by `rak_meta_list_skills`.

| Skill | Module(s) | Tier | What it does |
|---|---|---|---|
| [content](./content.md) | `content` | anon (reader) | Articles, wire feed, per-region feeds, hybrid search, polls. |
| [rag](./rag.md) | `rag` | anon (reader) | Semantic retrieval over the RAK archive; citable URLs; chunk search. |
| [voice](./voice.md) | `voice` | anon (reader) | Persona-knowledge RAG — cite a public figure's own words/sources. |
| [legal](./legal.md) | `legal` | anon (reader) | Polish-law corpus RAG (ELI/ISAP); citable statute fragments. |
| [discovery](./discovery.md) | `meta` | anon (no key) | Source census, skills/agents catalog, health. The free index. |
| [irc](./irc.md) | `irc` | anon read / free post | Live chat channels anchored to content (list, read, presence, post, create). |
| [murl](./murl.md) | `murl` | anon read / free post | Multi-user rooms anchored to any URL/domain (RFC-0001). |
| [research](./research.md) | `research` | anon → paid | Web search, deep research, fact packs, summaries, URL → markdown. |
| [write](./write.md) | `write` | paid → internal | Draft → plan → pipeline → publish; debates, documents. |
| [media](./media.md) | `media` | paid | Image / video / song / storyboard / TTS generation. |
| [qa](./qa.md) | `qa` | paid | Fact-check, moderation, uniqueness. |
| [owned](./owned.md) | `owned` | paid (creator) | Publish + read + verify your own content objects (the content wallet). |
| [distribution](./distribution.md) | `crawl`, `distribution` | internal | Source harvesting + external publishing. |

## Tiers

`anon` (no key) → `free` (key, higher limits) → `paid` (subscriber; creation/media/qa/owned) → `partner` (read-only) → `internal` (publishing/distribution). Reader tools (content, rag, voice, legal, discovery, and reading chat) work anonymously — the growth engine.

## Live count

The authoritative surface is the node itself: `rak_meta_list_skills` and [`../schemas/tools.manifest.json`](../schemas/tools.manifest.json) — **54 tools** across the modules above. The chat surface (`irc`, `murl`) is live in the MCP; [RFC 0001](../docs/rfcs/0001-irc-skill.md) tracks the fuller native-chat vision.
