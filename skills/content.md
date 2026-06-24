# SKILL: rak-content — treść RAK (read)

## Kiedy używać
Gdy agent potrzebuje polskich treści lokalnych/krajowych: artykuły, wire feed, feedy per województwo, wyszukiwanie hybrydowe (FTS + semantyka). Dostęp read-only.

## Narzędzia
| Narzędzie | Po co | Tier |
|---|---|---|
| `rak_content_search` | hybryda RRF po artykułach (query, section?, alpha?, limit?) | free+ |
| `rak_content_get_article` | pełny artykuł po slug/id | free+ |
| `rak_content_list_section` | lista per sekcja (paginacja) | free+ |
| `rak_content_wire_feed` | syndykowany wire (minScore, since) | free+ |
| `rak_content_region_feed` | treść per region (PL: województwo, 16 woj./TERYT; alias `voivodeship`) | free+ |
| `rak_meta_list_sources` | census 1709 źródeł lokalnych | anon (bez klucza) |

## Tier / koszt
Read = `free` z niskim limitem; `rak_meta_*` anonimowo (discovery). Brak kosztu kredytowego.

## Przykładowe prompty
- „Znajdź najnowsze artykuły o budżecie gminy w woj. śląskim."
- „Pokaż wire feed z ostatnich 24h, minScore 70."
- „Wylistuj lokalne źródła medialne z Małopolski."
