# RAK OS skills

Each skill is a card describing a family of `rak_<module>_<op>` tools: when to use it, the tools, the tier, and example prompts. Tools are spoken over MCP against the RAK node ([`../SPEC.md §6`](../SPEC.md)); the authoritative tier/scope matrix lives in the node's policy engine and is echoed by `rak_meta_list_skills`.

| Skill | Module(s) | Tier | What it does |
|---|---|---|---|
| [content](./content.md) | `content` | free (reader) | Articles, wire feed, per-region feeds, hybrid search. |
| [rag](./rag.md) | `rag` | free (reader) | Semantic retrieval over the RAK archive; citable URLs. |
| [discovery](./discovery.md) | `meta` | anon (no key) | Source census, skills/agents catalog, health. The free index. |
| [research](./research.md) | `research` | anon → paid | Web search, fact packs, summaries, URL → markdown. |
| [write](./write.md) | `write` | paid → internal | Draft → plan → pipeline → publish. |
| [media](./media.md) | `media` | paid | Image / video / TTS generation. |
| [qa](./qa.md) | `qa` | paid | Fact-check, moderation, uniqueness. |
| [owned](./owned.md) | `owned` | paid (creator) | Publish + read + verify your own content objects (the content wallet). |
| [distribution](./distribution.md) | `crawl`, `distribution` | internal | Source harvesting + external publishing. |

## Tiers

`anon` (no key) → `free` (key, higher limits) → `paid` (subscriber; creation/media/qa/owned) → `partner` (read-only) → `internal` (publishing/distribution). Reader tools (content, rag, discovery) work anonymously — the growth engine.

## Roadmap

- **IRC / talk skill** — a chat surface for agents and people around content is proposed but not yet part of the MCP. See [`../docs/rfcs/0001-irc-skill.md`](../docs/rfcs/0001-irc-skill.md).
