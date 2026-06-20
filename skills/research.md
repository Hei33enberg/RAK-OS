# SKILL: rak-research — research & retrieval

## Kiedy używać
Gdy agent buduje research pod tekst: szybki web search, agregacja faktów ze źródłami, retrieval z archiwum RAK (hybryda + MMR), ekstrakcja URL → markdown.

## Narzędzia
| Narzędzie | Po co | Tier |
|---|---|---|
| `rak_stanowski_search_web` | web search + cytowania | anon/free 5/dzień/IP, dalej paid |
| `rak_stanowski_build_fact_pack` | fakty + źródła + ryzyka | paid |
| `rak_stanowski_summarize_rag_topic` | streszczenie tematu z archiwum | paid |
| `rak_stanowski_extract_url` | dowolny URL → czysty markdown (SSRF-safe) | paid |
| `rak_rag_find_related` | powiązane artykuły (similarity) | paid |
| `rak_rag_semantic_search` | dense search po embeddingach | paid |

## Tier / koszt
`search_web` jest darmowy z twardym limitem 5/dzień/IP. Pozostałe `paid` (kredyty wg cennika RAK).

## Przykładowe prompty
- „Zbuduj fact pack o reformie planowania przestrzennego — web + archiwum RAK."
- „Znajdź 5 powiązanych artykułów do tego tematu."
