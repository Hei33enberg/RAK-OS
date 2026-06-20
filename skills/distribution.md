# SKILL: rak-distribution — pozyskiwanie i dystrybucja

> Tylko tier `internal` — chronimy provenance treści.

## Kiedy używać
Operacje wewnętrzne redakcji: zaciąg źródeł, subskrypcje tematów, publikacja na zewnętrzne kanały (WordPress/X/RSS).

## Narzędzia
| Narzędzie | Po co | Tier |
|---|---|---|
| `rak_crawl_search` | wyszukiwanie w zaciągniętych źródłach | internal |
| `rak_crawl_add_source` | dodanie źródła (SSRF-safe) | internal |
| `rak_crawl_subscribe` | subskrypcja tematu/bota | internal |
| `rak_distribution_publish` | publikacja na WordPress/X/RSS (scheduleAt) | internal |

## Tier / koszt
Wyłącznie `internal` (scope `skills:action` + tier internal).

## Przykładowe prompty (internal)
- „Dodaj to źródło RSS do zaciągu dla woj. lubelskiego."
- „Opublikuj ten artykuł na WordPress + wątek X jutro o 9:00."
