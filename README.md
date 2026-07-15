# RAK OS — media without an owner · Polish local news & data for AI agents

> **RAK OS is an open content language for the agentic web + a free reference stack.** RAK MCP — the `@rak-ad/mcp` [Model Context Protocol](https://modelcontextprotocol.io) server — gives AI agents instant access to Polish local content: 1709 sources, 16 regions, hybrid RAG and a wire feed, 24/7. Free for readers, paid editorial tools for subscribers.
>
> 🕊️ **Manifesto:** [`MANIFESTO.md`](./MANIFESTO.md) ([PL](./MANIFESTO.pl.md)) · 👑 **The Realm:** [`REALM.md`](./REALM.md) · 🏛️ **Governance:** [`GOVERNANCE.md`](./GOVERNANCE.md)
>
> 🌍 Site/docs: **https://rak.ad/mcp** · 📦 npm: `@rak-ad/mcp` · 🔌 Remote: `https://rak.ad/api/mcp/rak/mcp`
>
> 📜 **RAK language spec (v0.2):** [`SPEC.md`](./SPEC.md) — the open standard "write once → own it → cited by every agent". One envelope for **content and market** ([FOP profile](./docs/profiles/fop.md)).
>
> 💸 **Economics (the moat):** [`ECONOMICS.md`](./ECONOMICS.md) — pay-per-AI-citation. Our own valuation + settlement layer; Stripe Connect is a swappable last-mile plugin.

`@rak-ad/mcp` connects **Claude Desktop, Cursor, Windsurf, ChatGPT** and any MCP agent to the **RAK** node — a single access point to Polish local news (Kanał ZERO / RAK.AD) and universal editorial tools (research + write). Tool convention: `rak_<module>_<operation>`.

---

## What is RAK MCP? (TL;DR)

If you build an AI agent and need **fresh local information about Poland** — news from a specific region, county or city — RAK MCP gives you that in one connection. Instead of scraping dozens of portals, the agent gets ready tools: a hybrid search, per-region feeds, a wire feed, and a census of 1709 local sources. **Reader tools are free and work anonymously (no key).**

## What you get

- 🔎 **Instant content** — hybrid search (FTS + semantics), articles, wire feed, feeds for all 16 regions, a census of 1709 local sources.
- 🧠 **Research** — web search with citations, RAG over the archive, URL → markdown extraction.
- ✍️ **Creation (subscribers)** — drafts, editorial plans, the full pipeline (research → write → fact-check), media (image/video/TTS).
- ✅ **QA (subscribers)** — fact-check, moderation, uniqueness.
- 🌍 **Free discovery** — `rak_meta_*` and `rak_content_*` anonymously, no key. A free index of Poland for AI agents.

## Quickstart

### Claude Desktop / Cursor / Windsurf — `mcp.json`
```jsonc
{
  "mcpServers": {
    "rak": {
      "command": "npx",
      "args": ["-y", "@rak-ad/mcp"],
      "env": {
        "RAK_API_KEY": "rk_...",        // omit for anonymous (reader) access
        "RAK_BASE_URL": "https://rak.ad"
      }
    }
  }
}
```

### Remote (server agents) — Streamable HTTP
```
POST https://rak.ad/api/mcp/rak/mcp
Authorization: Bearer <RAK_API_KEY>     # omit for the anon tier
Api-Version: 2026-05
```

### Inspect / smoke
```
npx @modelcontextprotocol/inspector
```

## Access tiers

| Tier | Key | Scope |
|---|---|---|
| `anon` (reader) | no | `content_*`, `rag_*`, `meta_*` — search, wire, region feeds, source census |
| `free` | yes | as above + higher limits |
| `paid` (subscriber) | yes | + writing, media, fact-check, full RAG (on credits) |
| `partner` | yes | read-only (content + optionally RAG) |
| `internal` | yes | full (publishing + distribution) |

## Tool catalog (`rak_<module>_<op>`)

| Module | Tools | Tier |
|---|---|---|
| `content` | `search`, `get_article`, `list_section`, `wire_feed`, `region_feed` | free |
| `rag` | `find_related`, `semantic_search` | free |
| `meta` | `list_sources`, `list_skills`, `health` | anon / discovery |
| `research` | `web`, `extract`, `fact_pack`, `summarize` | anon → paid |
| `write` | `draft`, `edit`, `export`, `plan`, `pipeline`, `publish` | paid → internal |
| `media` | `generate_image`, `generate_video`, `tts` | paid |
| `qa` | `fact_check`, `moderate`, `uniqueness` | paid |
| `crawl` / `distribution` | `crawl_search`, `add_source`, `subscribe`, `distribution_publish` | internal |
| `owned` | `publish`, `list`, `get`, `verify` | creator (paid+) |

Per-skill details: [`skills/`](./skills).

## Examples (for agents)

- **Regional news:** `rak_content_region_feed({ region: "mazowieckie", limit: 20 })`
- **Topic search:** `rak_content_search({ query: "local government budget", section: "politics" })`
- **Local source census:** `rak_meta_list_sources({ voivodeship: "malopolskie" })`
- **Fresh wire:** `rak_content_wire_feed({ minScore: 70, limit: 25 })`

## FAQ

**Is RAK MCP free?** Yes — reader tools (content, search, wire, region feeds, source census) are free and anonymous. Only the creative RAK tools for subscribers are paid.

**How fresh is the data?** The pipeline harvests and processes sources 24/7, in 10–15 minute cycles. The `rak://health` resource shows freshness and 24h volume.

**How many sources?** 1709 local media sources across 16 regions (regional dailies, county portals, radio, TV, public bulletins). Full list: `rak_meta_list_sources`.

**How is it different from RSS/an API?** It's an agent-native interface — ready, described tools with semantics, freshness and citations, working out of the box in any MCP client.

**Commercial use?** The `@rak-ad/mcp` client is MIT-licensed; access to content/tools follows the RAK ToS. Dedicated keys for partners/enterprise.

## API keys
Reader tools need no key. An `rk_` key (tier `paid`/`partner`/`internal`) is issued by the RAK team — contact via https://rak.ad. Scopes: `content:read`, `skills:action`. Keys are tenant-scoped.

## Links
- Site / docs: **https://rak.ad/mcp**
- LLM context: https://rak.ad/llms.txt
- Portal: https://rak.ad

## Who's behind this

RAK OS is an **independent, self-funded** project — no venture capital, no private equity, no big-media owner. It is a kingdom, honestly: one maintainer (the Crown, [@Hei33enberg](https://github.com/Hei33enberg)) holds the vision and the last word; the community builds and is credited in the open ([`REALM.md`](./REALM.md)). Why this structure — and how it's kept hard to capture — is in the [Manifesto](./MANIFESTO.md) and the Realm's absorption-proofing section.

## Build your own RAK

The OS is MIT — **fork your country's RAK, for free, forever.**

- **Build an agent on RAK:** `npx create-rak-agent <name>` — it speaks `rak_*`, shares one base and one citation market. Ship it and it's discoverable via `rak_meta_list_agents`.
- **Run a national/vertical node:** stand up your own RAK node → become a **Node Sovereign** ([`REALM.md`](./REALM.md), L5). The RAK trademark and origin brand stay with the Crown; everything else is yours.
- Start from [`SPEC.md`](./SPEC.md) (the contract) and the [skills](./skills).

## One language — content + market

RAK's content object shares a **base envelope** ([`SPEC.md §3.1`](./SPEC.md)) with a sibling protocol, **POXI / FOP** (opinions → listings → gigs). One `kind`/`ext`/wallet/interop base means an agent speaks **both content and market** in one language. Mapping: [`docs/profiles/fop.md`](./docs/profiles/fop.md). Two independent implementations of one envelope is the network effect the language is built for.

## Built on Open Mercato

RAK (and POXI) run on **[Open Mercato](https://github.com/open-mercato/open-mercato)** — an open, inspectable runtime engine. We didn't reinvent the foundation; durability comes from boring, auditable infrastructure. If you want the same operational certainty under your own node, that's the engine.

## Community

- **Discussions:** GitHub Discussions (once enabled) — questions, RFCs, show-and-tell.
- **Contribute:** [`CONTRIBUTING.md`](./CONTRIBUTING.md) — humans and AI agents both ([`AGENTS.md`](./AGENTS.md)).
- **Chat:** a native RAK chat/IRC surface is proposed ([RFC 0001](./docs/rfcs/0001-irc-skill.md)) — the goal is that community chat eventually runs on RAK itself.

## Companion / Powiązane — Strajk Polski
RAK = bieżące, lokalne newsy i wiedza o Polsce. **Strajk Polski** = twarde, zweryfikowane dane fiskalno-polityczne (dług, budżet, 460 posłów, głosowania Sejmu, mapa rządu) + RAG. Razem: **cała Polska dla agentów AI w jednym miejscu.**

RAK = fresh local news & knowledge about Poland. **Strajk Polski** = hard, verified fiscal/political open data + RAG. Together: **all of Poland for AI agents, in one place.**
- MCP: `npx -y @strajkpolski/mcp` · https://github.com/Hei33enberg/strajkpolski-mcp · https://strajkpolski.org

## License
MIT (client). Access to content/API follows the RAK ToS.

---

<sub>Tags: Polish local news · Poland news MCP · Polish local news API · Poland data for AI · model context protocol · RAG · 16 regions · Kanał ZERO · RAK.AD · AI agents · Claude · Cursor · Perplexity</sub>
