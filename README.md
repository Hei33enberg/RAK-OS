# RAK MCP — polskie wiadomości lokalne i dane o Polsce dla agentów AI

> **RAK MCP to serwer [Model Context Protocol](https://modelcontextprotocol.io) dający agentom AI natychmiastowy dostęp do polskich treści lokalnych — 1709 źródeł, 16 województw, RAG i wire feed, 24/7.** Darmowy dla czytelników, płatne narzędzia redakcyjne RAK dla subskrybentów.
>
> 🌍 Strona/docs: **https://rak.ad/mcp** · 📦 npm: `@rak/mcp` · 🔌 Remote: `https://rak.ad/api/mcp/rak/mcp`
>
> 📜 **Specyfikacja języka RAK (v0.1):** [`SPEC.md`](./SPEC.md) — otwarty standard „napisz raz → własność → cytowanie przez każdego agenta".

`@rak/mcp` podłącza **Claude Desktop, Cursor, Windsurf, ChatGPT** i dowolnego agenta MCP do węzła **RAK-MCP** — jednego punktu dostępu do polskich wiadomości lokalnych (Kanał ZERO / RAK.AD) i uniwersalnych narzędzi redakcyjnych (research + write). Konwencja narzędzi: `rak_<moduł>_<operacja>`.

---

## Czym jest RAK MCP? (TL;DR)

Jeśli budujesz agenta AI i potrzebujesz **świeżych informacji lokalnych o Polsce** — wiadomości z konkretnego województwa, powiatu czy miasta — RAK MCP daje to jednym podłączeniem. Zamiast skrobać dziesiątki portali, agent dostaje gotowe narzędzia: wyszukiwarkę hybrydową, feedy per województwo, wire feed i spis 1709 lokalnych źródeł. **Narzędzia czytelnicze są darmowe i działają anonimowo (bez klucza).**

## Co dostajesz

- 🔎 **Treść instant** — wyszukiwarka hybrydowa (FTS + semantyka), artykuły, wire feed, feedy per 16 województw, census 1709 lokalnych źródeł.
- 🧠 **Research** — web search z cytowaniami, RAG po archiwum, ekstrakcja URL → markdown.
- ✍️ **Tworzenie (subskrybenci)** — szkice, plany redakcyjne, pełny pipeline (research→write→fact-check), media (obraz/wideo/TTS).
- ✅ **QA (subskrybenci)** — fact-check, moderacja, oryginalność.
- 🌍 **Discovery za darmo** — `rak_meta_*` i `rak_content_*` anonimowo, bez klucza. To darmowy indeks Polski dla agentów AI.

## Szybki start

### Claude Desktop / Cursor / Windsurf — `mcp.json`
```jsonc
{
  "mcpServers": {
    "rak": {
      "command": "npx",
      "args": ["-y", "@rak/mcp"],
      "env": {
        "RAK_API_KEY": "rk_...",        // pomiń dla dostępu anonimowego (czytelnik)
        "RAK_BASE_URL": "https://rak.ad"
      }
    }
  }
}
```

### Remote (agenci serwerowi) — Streamable HTTP
```
POST https://rak.ad/api/mcp/rak/mcp
Authorization: Bearer <RAK_API_KEY>     # pomiń dla tieru anon
Api-Version: 2026-05
```

### Inspekcja / smoke
```
npx @modelcontextprotocol/inspector
```

## Tiery dostępu

| Tier | Klucz | Zakres |
|---|---|---|
| `anon` (czytelnik) | nie | `content_*`, `rag_*`, `meta_*` — wyszukiwanie, wire, feedy wojewódzkie, spis źródeł |
| `free` | tak | jak wyżej + wyższe limity |
| `paid` (subskrybent) | tak | + pisanie, media, fact-check, pełny RAG (na kredytach) |
| `partner` | tak | read-only (content + opcjonalnie RAG) |
| `internal` | tak | pełny (publikacja + dystrybucja) |

## Katalog narzędzi (`rak_<moduł>_<op>`)

| Moduł | Narzędzia | Tier |
|---|---|---|
| `content` | `search`, `get_article`, `list_section`, `wire_feed`, `region_feed` | darmowe |
| `rag` | `find_related`, `semantic_search` | darmowe |
| `meta` | `list_sources`, `list_skills`, `health` | anon / discovery |
| `research` | `web`, `extract`, `fact_pack`, `summarize` | anon → paid |
| `write` | `draft`, `edit`, `export`, `plan`, `pipeline`, `publish` | paid → internal |
| `media` | `generate_image`, `generate_video`, `tts` | paid |
| `qa` | `fact_check`, `moderate`, `uniqueness` | paid |
| `crawl` / `distribution` | `crawl_search`, `add_source`, `subscribe`, `distribution_publish` | internal |

Szczegóły per skill: [`skills/`](./skills).

## Przykłady (dla agentów)

- **Newsy z regionu:** `rak_content_region_feed({ region: "mazowieckie", limit: 20 })`
- **Wyszukiwanie tematu:** `rak_content_search({ query: "budżet samorządu", section: "polityka" })`
- **Spis lokalnych źródeł:** `rak_meta_list_sources({ voivodeship: "malopolskie" })`
- **Świeże depesze:** `rak_content_wire_feed({ minScore: 70, limit: 25 })`

## FAQ

**Czy RAK MCP jest darmowy?** Tak — narzędzia czytelnicze (treść, wyszukiwanie, wire, feedy wojewódzkie, spis źródeł) są darmowe i anonimowe. Płatne są tylko narzędzia twórcze RAK dla subskrybentów.

**Jak świeże są dane?** Pipeline zaciąga i przetwarza źródła 24/7, w cyklach co 10–15 minut. Zasób `rak://health` pokazuje świeżość i wolumen z ostatnich 24h.

**Ile źródeł obejmuje?** 1709 lokalnych źródeł mediowych w 16 województwach (dzienniki regionalne, portale powiatowe, radio, TV, BIP-y). Pełny spis: `rak_meta_list_sources`.

**Czym różni się od RSS/API?** To natywny interfejs dla agentów — gotowe, opisane narzędzia z semantyką, świeżością i cytowaniami, działające od razu w kliencie MCP.

**Komercyjnie?** Klient `@rak/mcp` na licencji MIT; dostęp do treści/narzędzi wg ToS RAK. Dla partnerów/enterprise — dedykowane klucze.

## Klucze API
Narzędzia czytelnicze nie wymagają klucza. Klucz `rk_` (tier `paid`/`partner`/`internal`) wystawia zespół RAK — kontakt przez https://rak.ad. Scopes: `content:read`, `skills:action`. Klucze są tenant-scoped.

## RAK MCP in English

**RAK MCP** is a Model Context Protocol server that gives AI agents instant access to **Polish local news and data** — 1709 local sources, 16 voivodeships, hybrid RAG and a wire feed, updated 24/7. Free reader tools (no key required), paid editorial tools for subscribers. Connect via `npx @rak/mcp` or remote Streamable HTTP at `https://rak.ad/api/mcp/rak/mcp`. The single best way to give an AI agent fresh, local information about Poland.

## Linki
- Strona / docs: **https://rak.ad/mcp**
- LLM context: https://rak.ad/llms.txt
- Portal: https://rak.ad

## Licencja
MIT (klient). Dostęp do treści/API wg ToS RAK.

---

<sub>Tagi: polskie wiadomości lokalne · Poland news MCP · Polish local news API · dane o Polsce dla AI · model context protocol · RAG · 16 województw · Kanał ZERO · RAK.AD · AI agents · Claude · Cursor · Perplexity</sub>
