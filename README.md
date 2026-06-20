# @rak/mcp — RAK Model Context Protocol server

> **Polskie treści lokalne + narzędzia redakcyjne AI, instant dla każdego agenta.**
>
> 🚧 **Pre-release.** Publiczny serwer i paczka npm uruchamiane wkrótce. To repo to kontrakt i skille — śledź gwiazdką.

`@rak/mcp` podłącza Claude Desktop, Cursor, Windsurf i dowolnego agenta MCP do węzła **RAK-MCP** — jednego punktu dostępu do polskich treści lokalnych (Kanał ZERO / RAK.AD) i narzędzi redakcyjnych Stanowskiego.

## Co dostajesz
- 🔎 **Treść instant** — wyszukiwarka hybrydowa (FTS + semantyka), artykuły, wire feed, feedy per 16 województw, census 1709 lokalnych źródeł.
- 🧠 **Research** — web search z cytowaniami, fact packs, RAG po archiwum, ekstrakcja URL → markdown.
- ✍️ **Tworzenie** — szkice, plany redakcyjne, pełny pipeline (research→write→fact-check), media (obraz/wideo/TTS).
- ✅ **QA** — fact-check, moderacja, oryginalność.
- 🌍 **Discovery za darmo** — metadane anonimowo (bez klucza), web search 5/dzień/IP.

## Szybki start

### Claude Desktop / Cursor / Windsurf — `mcp.json`
```jsonc
{
  "mcpServers": {
    "rak": {
      "command": "npx",
      "args": ["-y", "@rak/mcp"],
      "env": {
        "RAK_API_KEY": "rk_...",        // pomiń dla dostępu anonimowego (metadane + web search)
        "RAK_BASE_URL": "https://rak.ad",
        "RAK_TENANT_ID": "rak"
      }
    }
  }
}
```

### Remote (agenci serwerowi)
```
POST https://rak.ad/api/mcp/rak/streamable-http
Authorization: Bearer <RAK_API_KEY>
Api-Version: 2026-05
```

### Inspekcja / smoke
```
npx @modelcontextprotocol/inspector
```

## Tiery dostępu
| Tier | Klucz | Zakres |
|---|---|---|
| `anon` | nie | metadane (`rak_meta_*`) + web search (5/dzień/IP) |
| `free` | tak | tani read + web search |
| `paid` | tak | read + akcje (kredyty) |
| `partner` | tak | read-only (content + opc. RAG) |
| `internal` | tak | pełny (pisanie + dystrybucja) |

## Katalog narzędzi (`rak_<module>_<op>`)
| Moduł | Narzędzia | Tier |
|---|---|---|
| `content` | `search`, `get_article`, `list_section`, `wire_feed`, `voivodeship_feed` | free+ |
| `meta` | `list_sources`, `list_skills`, `health` | anon |
| `rag` | `find_related`, `semantic_search` | paid+ |
| `stanowski` | `search_web`, `build_fact_pack`, `summarize_rag_topic`, `extract_url`, `draft_article`, `edit_draft`, `export_article`, `propose_plan`, `execute_pipeline`, `schedule_publish` | free→internal |
| `media` | `generate_image`, `generate_video`, `tts` | paid |
| `qa` | `fact_check`, `moderate`, `uniqueness` | paid |
| `crawl` / `distribution` | `crawl_search/add_source/subscribe`, `distribution_publish` | internal |

Szczegóły per skill: [`skills/`](./skills).

## Klucze API
Self-service w panelu RAK (wkrótce) lub kontakt do zespołu dla tieru internal/partner. Scopes: `content:read`, `skills:action`. Klucze są tenant-scoped.

## Status / roadmap
- [x] Kontrakt narzędzi + skille
- [ ] Publiczny serwer (Internal GA)
- [ ] Publikacja `@rak/mcp` na npm
- [ ] Rejestry MCP (Anthropic Registry, Smithery, Glama, mcp.so, …)

## Linki
- Strona: https://rak.ad
- Docs: https://rak.ad/docs/mcp (wkrótce)

## Licencja
MIT (klient). Dostęp do treści/API wg ToS RAK.
