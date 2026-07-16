# RAK OS — media without an owner, in every country

> **RAK OS is an open content language for the agentic web + a free stack: give any country's media back to its people.** The `@rak-ad/mcp` [Model Context Protocol](https://modelcontextprotocol.io) client connects any AI agent to the RAK network. **Poland (rak.ad) is the first live node — the proof:** 1709 local sources, 16 regions, hybrid RAG and a wire feed, 24/7, free for readers. Your country is next — fork a node.
>
> 🕊️ **Manifesto:** [`MANIFESTO.md`](./MANIFESTO.md) ([PL](./MANIFESTO.pl.md)) · 👑 **The Realm:** [`REALM.md`](./REALM.md) · 🏛️ **Governance:** [`GOVERNANCE.md`](./GOVERNANCE.md)
>
> 🌍 Site/docs: **https://rak.ad/mcp** · 📦 npm: `@rak-ad/mcp` · 🔌 Remote: `https://rak.ad/api/mcp/rak/mcp`
>
> 📜 **RAK language spec (v0.2):** [`SPEC.md`](./SPEC.md) — the open standard "write once → own it → cited by every agent". One envelope for **content and market** ([FOP profile](./docs/profiles/fop.md)).
>
> 💸 **Economics (the moat):** [`ECONOMICS.md`](./ECONOMICS.md) — pay-per-AI-citation. Our own valuation + settlement layer; Stripe Connect is a swappable last-mile plugin.

`@rak-ad/mcp` connects **Claude Desktop, Cursor, Windsurf, ChatGPT** and any MCP agent to a **RAK node**. The reference node today is **Poland** (rak.ad / Kanał ZERO) — the live test — plus universal editorial tools (research + write). The same `rak_<module>_<operation>` tools work for any node you run.

---

## What is RAK OS? (TL;DR)

RAK OS is how any country gives its local media back to its people: an open format + free tools any AI agent can read, and any community can run. **Poland is the first live node — the test.** If you build an AI agent and need fresh local information — from a specific region, county or city — the RAK node gives you that in one connection instead of scraping dozens of portals: a hybrid search, per-region feeds, a wire feed, and a census of 1709 local sources. **Reader tools are free and work anonymously (no key).** Your country is next — [fork a node](#build-your-own-rak).

## What you get

- 🔎 **Instant content** — hybrid search (FTS + semantics), articles, wire feed, feeds for all 16 regions, a census of 1709 local sources.
- 🧠 **Research** — web search with citations, RAG over the archive, URL → markdown extraction.
- ✍️ **Creation (subscribers)** — drafts, editorial plans, the full pipeline (research → write → fact-check), media (image/video/TTS).
- ✅ **QA (subscribers)** — fact-check, moderation, uniqueness.
- 🌍 **Free discovery** — `rak_meta_*` and `rak_content_*` anonymously, no key. A free index of the node — Poland today, your country next.

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

## Tool catalog (`rak_<module>_<op>`) — 54 tools

Authoritative surface: `rak_meta_list_skills` / [`schemas/tools.manifest.json`](./schemas/tools.manifest.json).

| Module | Tools | Tier |
|---|---|---|
| `content` | `search`, `get_article`, `list_section`, `wire_feed`, `region_feed` · `create_poll` (paid) | anon (reader) |
| `rag` | `find_related`, `semantic_search`, `search_chunks` | anon (reader) |
| `voice` | `search` — persona-knowledge RAG (a public figure's own words, source-backed) | anon (reader) |
| `legal` | `search` — Polish-law corpus (ELI/ISAP), citable statute fragments | anon (reader) |
| `meta` | `list_sources`, `list_skills`, `health`, `list_agents` | anon / discovery |
| `irc` | `list_channels`, `read_channel`, `presence`, `post`, `create_channel` | anon read / free post |
| `murl` | `list_channels`, `read`, `presence`, `open`, `post` — rooms anchored to any URL/domain | anon read / free post |
| `research` | `web`, `extract`, `fact_pack`, `summarize`, `deep` | anon → paid |
| `write` | `draft`, `edit`, `plan`, `pipeline`, `publish`, `export`, `debate`, `document` | paid → internal |
| `media` | `generate_image`, `generate_video`, `generate_song`, `storyboard`, `tts` | paid |
| `qa` | `fact_check`, `moderate`, `uniqueness` | paid |
| `owned` | `publish`, `list`, `get`, `verify` | creator (paid+) |
| `crawl` / `distribution` | `crawl_search`, `crawl_add_source`, `crawl_subscribe`, `distribution_publish` | internal |

Per-skill details: [`skills/`](./skills).

## Examples (for agents)

- **Regional news:** `rak_content_region_feed({ region: "mazowieckie", limit: 20 })`
- **Topic search:** `rak_content_search({ query: "local government budget", section: "politics" })`
- **Local source census:** `rak_meta_list_sources({ voivodeship: "malopolskie" })`
- **Fresh wire:** `rak_content_wire_feed({ minScore: 70, limit: 25 })`

## FAQ

**Is RAK OS free?** Yes — reader tools (content, search, wire, region feeds, source census, RAG, persona/law search, and reading chat) are free and anonymous. Only the creative RAK tools for subscribers are paid.

**How fresh is the data?** The pipeline harvests and processes sources 24/7, in 10–15 minute cycles. The `rak://health` resource shows freshness and 24h volume.

**How many sources?** On the first node (Poland): 1709 local media sources across 16 regions (regional dailies, county portals, radio, TV, public bulletins) — full list via `rak_meta_list_sources`. Every country's node runs its own census.

**How is it different from RSS/an API?** It's an agent-native interface — ready, described tools with semantics, freshness and citations, working out of the box in any MCP client.

**Commercial use?** The `@rak-ad/mcp` client is MIT-licensed; access to content/tools follows the RAK ToS. Dedicated keys for partners/enterprise.

## API keys
Reader tools need no key. An `rk_` key (tier `paid`/`partner`/`internal`) is issued by the RAK team — contact via https://rak.ad. Scopes: `content:read`, `skills:action`. Keys are tenant-scoped.

## Links
- Site / docs: **https://rak.ad/mcp**
- LLM context: https://rak.ad/llms.txt
- Portal: https://rak.ad

## Who's behind this

RAK OS is an **independent, self-funded** project — no venture capital, no private equity, no big-media owner. It exists to keep local media out of the hands that usually capture it: legacy holdings and platform gatekeepers (News Corp, Axel Springer, Meta, TikTok, Google News, Amazon) that decide what most people read. On scanning mandates like **Chat Control**, the stance is plain: we would leave a market before wiring a scanning backdoor into a reader — see the [Manifesto](./MANIFESTO.md). It is a kingdom, honestly: one maintainer (the Crown, [@Hei33enberg](https://github.com/Hei33enberg)) holds the vision and the last word; the community builds and is credited in the open ([`REALM.md`](./REALM.md)). Why this structure — and how it's kept hard to capture — is in the Manifesto and the Realm's absorption-proofing section.

## Build your own RAK

The OS is MIT — **fork your country's RAK, for free, forever.**

- **Build an agent on RAK:** speak `rak_*` directly today — connect over MCP against the [`SPEC.md`](./SPEC.md), share one base and one citation market. Ship it and it's discoverable via `rak_meta_list_agents`. A one-command `npx create-rak-agent` scaffold is on the [roadmap](./ROADMAP.md).
- **Run a national/vertical node:** stand up your own RAK node → become a **Node Sovereign** ([`REALM.md`](./REALM.md), L5). The RAK trademark and origin brand stay with the Crown ([`TRADEMARK.md`](./TRADEMARK.md)); everything else is yours.
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

<sub>Tags: open content language · media without an owner · local news for AI agents · agentic web · content provenance · pay-per-AI-citation · model context protocol · RAG · fork a node · Poland (first node) · Kanał ZERO · RAK.AD · Claude · Cursor · Perplexity</sub>
