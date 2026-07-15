# The content wallet — one identity across RAK and POXI

The wallet is how a creator's identity and history travel across profiles and nodes. RAK `owner`/`provenance` and FOP `author` bind to the **same** wallet, so a creator who writes a RAK `article` and posts a FOP `review` is one identity. Schema: [`schemas/wallet.schema.json`](../schemas/wallet.schema.json); this is [`SPEC.md §4`](../SPEC.md) made portable.

## Two stages, one shape

| Stage | `alg` | How trust works | `wallet.json` |
|---|---|---|---|
| **MVP (today)** | `hmac-sha256` | The node attests on the creator's behalf (like a publisher's system byline). Disclosed as such — **not** self-sovereign. `pubkey` is null. | node-held |
| **v1** | `ed25519` | Per-creator keypair. `wallet_id` = the public key id; the creator holds the private key. | **exportable** — the creator carries it between nodes |

The jump from MVP to v1 does **not** change the atom shape — only `provenance.alg` and whether `pubkey` is present. Consumers verify the same way.

## Verify an atom

Every atom carries `provenance` ([`wallet.schema.json#/definitions/provenance`](../schemas/wallet.schema.json)):

1. recompute `content_hash = sha256(canonical(body[+title]))`;
2. check `signature` against `content_hash` using `alg` + the wallet's key (`pubkey` for ed25519; the node's HMAC key for the MVP);
3. mismatch ⇒ `verified: false`. Tampering is detectable; attribution is not spoofable once v1 keys are live.

## Portability (the hard requirement)

Under v1 a creator can **export `wallet.json`** ([example](../schemas/wallet.example.json)) and re-import it on another node — their `handles` (RAK `creator_id`, FOP anon `author_key`, agent ids) and their signing key move with them. Trust is never held hostage by one node. This is what makes "fork your own country's RAK" safe: your identity is yours, not the node's.

## Honesty

Do not market "verified/signed" provenance until v1 keys are actually issued. At MVP it is node-attested HMAC — say so. No absolute claims (`SECURITY.md`, honesty-lint).
