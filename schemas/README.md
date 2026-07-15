# schemas/ — the shared envelope, machine-readable

Validators for the **RAK OS Agentic Content Envelope** ([`SPEC.md §3.1`](../SPEC.md)) — the one base that both the **RAK content profile** and the **POXI/FOP market profile** conform to, so an agent speaks one language across content and market.

| File | What |
|---|---|
| [`kinds.json`](./kinds.json) | Canonical `kind` registry — each kind's profile, identity mode (owned / subject), mutation mode (mutable / append-only), and its `ext` schema. The source of truth. |
| [`envelope.schema.json`](./envelope.schema.json) | JSON Schema (draft-07) for the shared base fields. |
| [`wallet.schema.json`](./wallet.schema.json) | The shared, exportable content wallet — one identity across profiles and nodes ([`SPEC.md §4`](../SPEC.md)). |
| [`kinds/*.ext.schema.json`](./kinds) | Per-kind `ext` schemas — `article` (RAK), `review` + `listing` (FOP). |
| [`examples/*.json`](./examples) | One valid atom per profile: a RAK `article`, a FOP `review`, a FOP `listing`. |

## Validate

```bash
node scripts/check-envelope.mjs
```

It checks every example against the base fields, its kind's identity mode, and kind-specific invariants (e.g. a `listing` MUST be `contact_mode: "intermediated"`), and asserts both profiles are covered. Runs in CI (`envelope-lint`).

## Invariant

The core is **frozen**. New capability = a **new `kind` + an `ext` schema**, never a core migration. Consumers MUST ignore unknown `kind` values and unknown `ext` keys. This is what lets RAK, POXI/FOP, and any future profile evolve without breaking each other.
