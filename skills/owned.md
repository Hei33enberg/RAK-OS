# SKILL: rak-owned — owned content lane (the content wallet)

## When to use
When a creator publishes their own work as an **owned content object** and reads it back — the loop that makes content *owned → citable → monetizable* ([`SPEC.md §4`](../SPEC.md), [`ECONOMICS.md`](../ECONOMICS.md)). Content lands in the creator's **own band** (`creator:<id>`), never in the wire or the portal. The band is derived server-side from the API key's `subscriber_user_id` — you cannot publish into someone else's band.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_owned_publish` | publish an artifact (e.g. from `rak_write_draft`) as an owned object with a license → `{slug, license, namespace, provenance}` | paid (creator) |
| `rak_owned_list` | list your owned objects (`limit?`, `status?` = published/draft/scheduled/all) | paid (creator) |
| `rak_owned_get` | one owned object by `slug`, with provenance verification attached | paid (creator) |
| `rak_owned_verify` | verify provenance on-demand by `slug` or `id`: signature valid + content unmodified (tamper-evidence) | paid (creator) |

## Tier / cost
`paid`+ tier with the `skills:action` scope (publish) or `content:read` (list/get/verify). No credit cost — provenance signing is free compute. Requires a key bound to a creator account.

## Provenance (the content wallet)
Each published object is signed over `hash(title + content)`. `rak_owned_get`/`verify` recompute the hash and check the signature: a tampered object returns `unmodified: false`. Signing is best-effort and never blocks publishing. License defaults to `owned_public` (free to read **and cite** — this is what drives AEO and, later, pay-per-citation).

## Don't
- Don't confuse `rak_owned_publish` (your own band, creator-owned) with `rak_write_publish` (the RAK portal, internal tier).
- Don't treat `owned_public` as private — it is public and citable by design; use `owned_licensed`/`restricted` otherwise.

## Example prompts
- "Publish my draft as an owned public article and show its slug + provenance."
- "List my owned articles, then verify the newest one hasn't been modified."
