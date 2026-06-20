# SKILL: rak-qa — kontrola jakości

## Kiedy używać
Gdy agent waliduje treść przed publikacją: weryfikacja faktów ze źródłami, moderacja (hate/adult/profanity), sprawdzenie unikalności/plagiatu.

## Narzędzia
| Narzędzie | Po co | Tier |
|---|---|---|
| `rak_qa_fact_check` | verdict + cytowania | paid |
| `rak_qa_moderate` | flagowanie ryzykownych treści | paid |
| `rak_qa_uniqueness` | % oryginalności + źródła | paid |

## Tier / koszt
`paid` (kredyty wg cennika RAK).

## Przykładowe prompty
- „Zweryfikuj te 3 twierdzenia względem podanych źródeł."
- „Sprawdź unikalność tego tekstu i pokaż potencjalne źródła."
