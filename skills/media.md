# SKILL: rak-media — generatywne media

## Kiedy używać
Gdy agent potrzebuje assetów do tekstu: ilustracja, krótkie wideo, narracja TTS. Operacje async, kosztowne.

## Narzędzia
| Narzędzie | Po co | Tier |
|---|---|---|
| `rak_media_generate_image` | obraz z promptu → `{jobId, pollUrl}` | paid (credits) |
| `rak_media_generate_video` | wideo (duration 5/8/10, aspect 16:9/9:16/1:1) | paid (credits) |
| `rak_media_tts` | narracja (TTS) | paid (credits) |

## Tier / koszt
`paid` only. Egzekucja limitów + kredyty wg cennika RAK. Zwrot `{jobId, pollUrl}` — odpytuj o gotowy asset.

## Przykładowe prompty
- „Wygeneruj okładkę do tego artykułu, 16:9."
- „Zrób 8s wideo intro, pionowe 9:16."
