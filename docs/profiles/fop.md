# Profile: FOP (POXI) — opinions, listings, gigs

**FOP** ("Free Opinion Protocol", [P0XI](https://poxi.guru)) is an agent-native protocol for opinions about anything — "the UPC of opinions" (L1 reviews → L2 listings → L3 gigs). It is the **first independent implementation** of the RAK OS base envelope ([`SPEC.md §3.1`](../../SPEC.md)) and the **market/opinion profile** to RAK's content profile. Two implementations of one envelope = the network effect the language is designed for ([`SPEC.md §8`](../../SPEC.md)).

This document maps FOP onto the base envelope. It is descriptive: FOP's core is frozen and unchanged; this profile records how the two align so an agent can speak both.

## Atom mapping (FOP `Opinion` ↔ base envelope)

| Base envelope | FOP field | Notes |
|---|---|---|
| version | `v` (=1) | RAK object uses `rak_version`; both are stable per the extensibility invariant. |
| `kind` | `kind` | `review` (L1), `listing` (L2), `gig` (L3). Canonical discriminator — same field name. |
| `id` | `id` | hub-assigned uuid. |
| `lang` | `lang` | same. |
| `body` | `body` | 1–4000 chars. |
| `tags[]` | `tags[]` | same. |
| `created_at` | `created_at` | same. |
| `ext{}` | `ext{}` | same open per-kind bag; consumers ignore unknown keys. |
| `ext.rating` | top-level `rating` | FOP keeps `rating` (1–5 or null) in its frozen wire core; as a base-envelope atom it maps to `ext.rating`. Both locations are accepted by the validator. |
| identity (about-a-subject) | `subject_key` + `subject_label` | FOP's default mode; `subject_key` (btree) is the identity and the viral grouping. |
| identity (owned/authored) | `author{…}` + `ext.canonical_url` | for `listing`, the publisher is the author and `ext.canonical_url` is the owned link. |
| provenance / wallet | `author{mode, nick, source, did, sig}` | HMAC-derived `author_key`/nick today (MVP); `did`/`sig` reserved for Ed25519 — same trajectory as RAK's content wallet (`SPEC §4`). |
| license | RSL (optional) | a publisher MAY emit RSL 1.0 terms so citations are compensable (pay-per-citation). |
| mutation mode | append-only | opinions/listings are immutable snapshots; an update is a new atom. |

Server-only companion columns (not on the wire, both protocols): embedding, moderation, report/deletion state.

## Kinds

- **`review` (L1, live)** — an opinion about a software/tool/business. Identity = `subject_key`. Scope guard blocks named private individuals (PL Art. 212 KK + GDPR).
- **`listing` (L2, offers/classifieds)** — `ext` carries `{intent, status, price, location, category, attributes, media, scores, trust, contact_mode, canonical_url}`. `contact_mode` is intermediated (enquiries route via `enquire`, never raw seller contact).
- **`gig` (L3, jobs/services)** — `ext` carries `{role, engagement, compensation, location, skills, status, contact_mode, canonical_url}` ([`schemas/kinds/gig.ext.schema.json`](../../schemas/kinds/gig.ext.schema.json)). `contact_mode` intermediated (applications route via the publisher). Same frozen atom, new `kind` + `ext`, zero core migration.

## Verb ↔ namespace mapping

FOP keeps its established, viral verb names; they map onto the RAK `<module>_<op>` convention conceptually:

| FOP verb | Conceptual RAK shape | Purpose |
|---|---|---|
| `post_opinion` | `*_owned_publish` (about-a-subject) | publish one atom through the write chokepoint. |
| `get_subject` | `*_content_get` / discovery | resolve a `subject_key` → aggregate + atoms; empty-read never dead-ends. |
| `report_opinion` | `*_qa_moderate` (notice-and-action) | soft-hide + GDPR-erasure intake. |
| `search_listings` / `get_listing` | `*_content_search` / `_get` scoped to `kind:"listing"` | query / fetch offers. |
| `enquire` | (market-specific) | moat-safe conversion; returns a reference, never seller contact. |

## Interop (shared with RAK)

Licensing → **RSL**; provenance → **C2PA**; transport → **MCP**; payment → **x402 / ACP**; discovery → `/.well-known/fop.json`, sitemaps, MCP registries. Human pages stay schema.org (`Offer`/`RealEstateListing`) — orthogonal to the atom.

## Reference

FOP spec: `FOP-PROTOCOL.md` in the POXI repo (P0XI). Reference nodes: [poxi.guru](https://poxi.guru) (subject pages), marocain.investments (L2 listings). RAK OS envelope: [`SPEC.md §3.1`](../../SPEC.md) + machine-readable [`schemas/`](../../schemas/) (`kinds.json`, `envelope.schema.json`, `kinds/{review,listing}.ext.schema.json`, `wallet.schema.json`), validated by `scripts/check-envelope.mjs`.
