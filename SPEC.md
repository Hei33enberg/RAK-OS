# RAK — A Content Language for the Agentic Web

**Version 0.2 (Draft) · Open · MIT for this spec**
First reference node: [rak.ad](https://rak.ad) (Poland — the test) · Transport: [Model Context Protocol](https://modelcontextprotocol.io) · Repo: github.com/Hei33enberg/rak-mcp

> **RAK is a content language**: a small, open standard for content that is **written once, owned by its creator, and consumed natively by any AI agent** — cited, fresh, and (optionally) paid. It does not replace existing standards; it **composes** them (RSL for licensing, C2PA for provenance, MCP for transport, x402 for payment) into one creator-first, agent-native object.

This document is the contract. Products (`rak.ad`, RAK IDE) and agents (Stanowski and others) are implementations of this language, not the language itself.

---

## 1. Why

AI agents today burn tokens searching and scraping the web for content. The result is expensive, stale, uncited, and pays the authors nothing. There is no universal way to: **author once → prove ownership → let any agent consume + cite → get paid.** RAK defines that object and the conventions around it. Whoever authors content in RAK is readable by every RAK-speaking agent, instantly, with attribution.

## 2. Design principles

1. **Neutral, global naming.** Every tool is `rak_<module>_<op>`. No personas, no language-specific terms in the protocol surface. (An agent named *Stanowski* may *speak* RAK; it is not *in* RAK.)
2. **Compose, don't reinvent.** Licensing maps to **RSL**, provenance to **C2PA**, transport is **MCP**, payment is **x402 / ACP**. RAK is the thin creator-first layer that binds them.
3. **Creator-first.** The unit of ownership is the *creator*, not the publisher. Long-tail creators are first-class.
4. **Free to read, owned to publish.** Discovery and reading are free (the growth engine). Ownership, provenance and monetization are opt-in.
5. **A language, a platform.** Many agents (and local/vertical versions) are built *on* RAK; they share one base, one object, one market.

## 3. The RAK Content Object

The atomic unit — the "UPC of content for AI". A logical object that may live as a draft or a published item; the shape is the same.

```jsonc
{
  "rak_version": "0.1",
  "id": "uuid",
  "type": "article | post | note | thread | podcast | image | video | dataset",
  "lang": "pl",
  "title": "string",
  "body": "markdown",
  "summary": "string",
  "canonical_url": "https://rak.ad/<slug>",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "freshness": "ISO-8601",            // last time content was verified/refreshed
  "owner": {
    "creator_id": "rak user id or DID",
    "agent": "agent id that authored it (e.g. stanowski)",
    "created_via": "chat | mcp:claude | mcp:cursor | cron | api"
  },
  "provenance": {                      // §4 — the content wallet
    "content_hash": "sha256(canonical(body))",
    "signature": "hex",
    "alg": "hmac-sha256 | ed25519",
    "wallet_id": "stable per-creator key id",
    "signed_at": "ISO-8601",
    "c2pa": "optional C2PA manifest ref (for media-bearing items)"
  },
  "license": {                         // §5 — RSL-compatible
    "type": "owned_public | owned_licensed | rak_editorial | restricted",
    "require_citation": true,
    "commercial": "allow | contact | deny",
    "price_per_cite_cc": 0             // centicredits; 0 = free
  },
  "media": [                           // §4.1 — re-hosted + signed assets
    { "kind": "image|video|audio", "url": "https://media.rak.ad/...", "hash": "sha256", "c2pa": "manifest ref" }
  ]
}
```

A reader (agent) receives at minimum: `title`, `summary`/`body`, `canonical_url`, `owner.creator_id`, `provenance` (so it can **cite + verify**), and `license`.

### 3.1 Base envelope & profiles (added in v0.2)

RAK is one member of a small family of agent-native objects that share a **base envelope**, so an agent speaks **one language across content and market**. A sibling protocol — **[POXI / FOP](./docs/profiles/fop.md)** (opinions → listings → gigs) — is the first independent implementation of this envelope. The RAK Content Object above is the **content profile**; FOP is the **opinion/market profile**.

**Shared base fields (every profile):**

| Field | Meaning |
|---|---|
| `kind` | the discriminator — `article`/`post`/… (RAK), `review`/`listing`/`gig` (FOP). **`kind` is canonical.** RAK's `type` (§3) is a documented alias during the v0.1→v0.2 window and maps 1:1 onto `kind`. |
| `id`, `lang`, `body`, `tags[]`, `created_at` | as in §3. |
| `ext{}` | an **open, per-kind bag**; consumers MUST ignore unknown `kind` values and unknown `ext` keys. |
| provenance / identity | one portable content-wallet (§4): HMAC (MVP) → Ed25519 `wallet.json`. A creator's identity travels across profiles and nodes. |
| interop | RSL (license), C2PA (media provenance), MCP (transport), x402/ACP (payment) — §10. |

**Two identity modes, one base.** A `kind` declares how it is identified:
- *owned / authored* — `owner{creator_id,…}` + `canonical_url` (e.g. RAK `article`, a publisher's FOP `listing`).
- *about-a-subject* — `subject_key` (normalized dedup key) + `subject_label` (e.g. a FOP `review`).

**Two mutation modes, one base.** A `kind` declares `mutable` (RAK draft → published) or `append-only` (FOP opinion/listing snapshots — an update is a new atom).

**Extensibility invariant (shared).** The core is **frozen**; capability grows via a **new `kind` + `ext` validator**, never a core migration. The object version stays stable.

The field-by-field mapping between profiles is [`docs/profiles/fop.md`](./docs/profiles/fop.md).

## 4. Provenance — the content wallet

Every object is signed over its canonical content, binding it to a creator.

- **MVP:** `signature = HMAC-SHA256(canonical(body+title), key)`, `alg: "hmac-sha256"`. The node attests on the creator's behalf (like a publisher's system byline). Disclosed as such — **not** self-sovereign yet.
- **v1:** per-creator **Ed25519** keypair; `wallet_id` is the public key id; the creator can **export `wallet.json`** and carry their identity + history across nodes (portability is a hard requirement — trust is never held hostage).
- **C2PA:** for media, the manifest is C2PA-compatible so it interoperates with the broader provenance ecosystem (Adobe/Microsoft/CAI).

Verification: a consumer recomputes `content_hash` and checks `signature`. Tampering → `verified: false`.

### 4.1 Media
Generated or attached media (image/video/audio) MUST be **re-hosted to a node-controlled store** (never a third-party ephemeral URL) and referenced by a permanent `url` + `hash`, optionally C2PA-signed. Media is part of the owned object — it cannot depend on a provider link that may expire.

## 5. Licensing (RSL-compatible)

`license.type`:
- `owned_public` — free to read **and cite**; returned in full with the citation block. Drives discovery/AEO.
- `owned_licensed` — excerpt + terms returned for free; full body gated behind payment (§7).
- `rak_editorial` — node's own editorial content (free reader tier).
- `restricted` — never surfaced to external agents.

Fields map onto **RSL** (Really Simple Licensing) so RAK content interoperates with RSL clearinghouses. `require_citation`, `commercial`, and `price_per_cite_cc` are the minimal positive signals.

## 6. Access & transport — MCP

RAK is spoken over **MCP**. The reference endpoint:

```
POST https://rak.ad/api/mcp/rak/mcp        # Streamable HTTP
# or:  npx -y @rak-ad/mcp                      # stdio proxy
Authorization: Bearer rk_...                # omit for the anonymous reader tier
```

An agent: **discovers** (`rak_meta_*`), **reads** (`rak_content_*`, `rak_rag_*`), **writes** (`rak_write_*` into the creator's owned lane), and **cites** (every read result carries `provenance` + `canonical_url`).

## 7. Tool namespace — `rak_<module>_<op>`

| Module | Ops | Tier |
|---|---|---|
| `content` | search · get · list_section · wire_feed · region_feed¹ | free (reader) |
| `rag` | find_related · semantic_search | free (reader) |
| `meta` | list_sources · list_skills · health | anon / discovery |
| `research` | web · extract · fact_pack · summarize | anon-capped → paid |
| `write` | draft · edit · export · plan · pipeline · publish | paid → internal |
| `media` | generate_image · generate_video · tts | paid |
| `qa` | fact_check · moderate · uniqueness | paid |
| `crawl` · `distribution` | search · add_source · subscribe · publish | internal |
| `owned`² | publish · list · get | creator |

¹ `region_feed` is the canonical tool (param `region`); the PL reference node maps it onto its 16 voivodeships and accepts `voivodeship` as a deprecated input alias.
² `owned_*` (creator publishes into their owned lane + reads it back) — roadmap, the loop that makes content *owned + cited + monetizable*.

## 8. Agents on RAK (the platform)

RAK is a base **language**; agents are built **on** it:
- **Stanowski** — the reference Polish agent (flagship implementation).
- Anyone can build an agent or a **local/vertical version** (region, topic, language, white-label). All speak `rak_*`, share one base and one citation market.
- Network effect: more agents → more content → more value for consuming agents → more citations → more earnings → more creators.

This is the WordPress / Shopify / Stripe pattern: an open substrate + many builders + a flagship reference.

## 9. Economic loop (how creators earn)

Reads are free (discovery). When a **paid agent platform** consumes a creator's `owned_*` content via MCP — a substantive **cite/fetch**, not a search — the node:
1. **attributes** the use to the owning creator (consumption ledger),
2. **charges** the platform a small fee (cheaper than its own search, and it gets a citation),
3. **pays** the creator a share (the node takes ~15%), settled via **x402 / Stripe**.

"Write once → paid many times." Like Spotify pays per stream — RAK pays per AI citation. Metering is the unit; partner licensing is just a different settlement over the same ledger.

## 10. Interoperability

| Concern | RAK uses | Standard |
|---|---|---|
| Licensing terms | `license.*` | **RSL** (rslstandard.org) |
| Provenance | `provenance.*`, media manifests | **C2PA** (c2pa.org) |
| Transport / tools | `rak_<module>_<op>` over MCP | **MCP** (modelcontextprotocol.io) |
| Payment | per-cite settlement | **x402** (Linux Foundation), **ACP** (OpenAI/Stripe) |
| Discovery | `/llms.txt`, sitemap, MCP registries | llms.txt, sitemaps |

RAK does not compete with these; it is the **creator-first object** that ties them together.

## 11. Versioning & governance

- `rak_version` is semver (the wire object version). This spec **document** is **v0.2 (draft)**; the wire `rak_version` stays at its draft level and, per the extensibility invariant (§3.1), grows via new `kind` + `ext` rather than breaking. Breaking changes bump the major; tools are deprecated with a support window, never silently broken.
- Company-led-open today (the MCP playbook). A standards-body donation (W3C CG / Linux Foundation) is on the table once adoption warrants it (cf. AP2→FIDO, x402→Linux Foundation).
- The spec is open (MIT). The reference node and `@rak-ad/mcp` client are MIT. Access to content/tools follows each node's ToS.

---

*RAK v0.2 — write once, own it, let every agent cite it. One envelope for content and market. Reference implementation: rak.ad.*
