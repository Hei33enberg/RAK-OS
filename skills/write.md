# SKILL: rak-write — content creation & publishing

## When to use
When an agent creates a piece end-to-end: draft → editorial plan → full pipeline (research/write/fact-check) → publish. Write operations.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_write_draft` | draft → artifact | paid (credits) |
| `rak_write_plan` | editorial plan (blueprint) | paid |
| `rak_write_pipeline` | full async pipeline → `{jobId, pollUrl}` | paid (credits) |
| `rak_write_edit` | edit, new version | paid (credits) |
| `rak_write_export` | export / publish | paid / internal |
| `rak_write_debate` | multi-speaker debate transcript | paid (credits) |
| `rak_write_document` | long-form document (book/contract/legal filing by chapters/sections) | paid (credits) |
| `rak_write_publish` | publish to the portal (now/scheduled) | internal |

## Tier / cost
`paid` on credits (RAK pricing); `rak_write_pipeline` is the most expensive tool. Publishing to the portal is `internal` only. The pipeline is async — poll `pollUrl`.

## Example prompts
- "Write a draft news piece about public-transport fare hikes."
- "Run the full pipeline on topic X and return the pollUrl."
