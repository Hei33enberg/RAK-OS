# SKILL: rak-stanowski — tworzenie i publikacja treści

## Kiedy używać
Gdy agent ma stworzyć tekst end-to-end: szkic → plan redakcyjny → pełny pipeline (research/write/fact-check) → publikacja. Operacje zapisujące.

## Narzędzia
| Narzędzie | Po co | Tier |
|---|---|---|
| `rak_stanowski_draft_article` | szkic → artefakt | paid (credits) |
| `rak_stanowski_propose_plan` | plan redakcyjny (blueprint) | paid |
| `rak_stanowski_execute_pipeline` | pełny pipeline async `{jobId, pollUrl}` | paid (credits) |
| `rak_stanowski_edit_draft` | edycja, nowa wersja | paid (credits) |
| `rak_stanowski_export_article` | export / publish | paid / internal |
| `rak_stanowski_schedule_publish` | publikacja do portalu (now/cron) | internal |

## Tier / koszt
`paid` na kredytach (wg cennika RAK); `execute_pipeline` to najdroższe narzędzie. Pisanie do portalu (`schedule_publish`) = tylko internal. Pipeline async — odpytuj `pollUrl`.

## Przykładowe prompty
- „Napisz szkic newsa o podwyżkach w komunikacji miejskiej."
- „Odpal pełny pipeline na temat X i podaj pollUrl."
