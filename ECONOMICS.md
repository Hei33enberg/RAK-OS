# RAK Economics — Pay-Per-AI-Citation

> **The goal:** content is **written once, owned by its creator, and paid every time an AI agent cites it.** Spotify pays artists per stream. **RAK pays creators per AI citation.** This document states the economic model and the architecture that makes it a moat.

This is a roadmap document (v0.1). The **metering layer is live**; the **settlement layer is being built**; the **payout rail is last**.

---

## 1. The thesis

AI agents consume content constantly — and pay the authors nothing. RAK closes the loop:

```
write once  →  owned (provenance)  →  any agent cites it  →  creator earns
```

Reads/discovery are **free** (the growth engine). When a **paying** agent platform makes a substantive **cite/fetch** of a creator's owned content (not a search), value flows back to the creator.

## 2. Why this is a moat (and why it isn't "just Stripe")

The defensible asset is **not** the payment rail. Anyone can bolt on Stripe. The moat is the **settlement layer we grow ourselves**:

1. **Valuation algorithm** — *what is one AI citation of this content worth?* Tuned per license, freshness, agent tier, demand, content quality. This is proprietary IP; it improves with our data.
2. **Accrual ledger** — every citation accrues to the creator's balance **in our own books**, independent of any rail. We hold the relationship, the history, the trust graph.
3. **Payout adapter** — the cash-out rail (Stripe Connect today, x402 / others tomorrow) is a **swappable last-mile plugin** behind a stable interface. Plugged in **only at scale**. Never a dependency, never lock-in.

> We build the **accounting brain** first and own it forever. The **payout rail** is a commodity we slot in last and can swap at will.

## 3. The three layers

| Layer | What it does | Who owns it | When |
|---|---|---|---|
| **Metering** | record every consumption (who cited what, whose content) — daily-unique "agent reach" | RAK (live) | ✅ shipped |
| **Valuation** | price each billable citation (our algorithm) | RAK (the moat) | 🔨 building |
| **Accrual** | accumulate earnings to each creator's balance, take the node share (~15%) | RAK (our ledger) | 🔨 building |
| **Payout** | move money out — `PayoutAdapter` interface; Stripe Connect = one impl | swappable plugin | ⏳ at scale |

Crucially: **layers 1–3 run with zero payment provider attached.** A creator can watch their balance grow long before a single payout fires. Cash-out is a switch we flip when we have scale and a live Stripe account — not a blocker to building the value engine.

## 4. Settlement is swappable over one ledger

The same accrual ledger settles in different ways without rebuild:
- **Metered micro-payments** — per-cite, the default (x402 / Stripe).
- **Partner licensing** — a flat or tiered deal is just a different settlement over the same cite counts.
- **Creator payout** — Stripe Connect transfer, the last mile.

One meter, one valuation, one balance — many ways to settle. That flexibility is deliberate.

## 5. Interoperability

| Concern | RAK | Standard |
|---|---|---|
| Licensing terms | `license.*` | RSL |
| Provenance | `provenance.*` | C2PA |
| Transport | `rak_<module>_<op>` | MCP |
| Payment rail | pluggable adapter | x402 (Linux Foundation), ACP (OpenAI/Stripe), Stripe Connect |

RAK does not compete with payment standards — it **accrues value in its own ledger and settles through whichever rail fits**, at the moment of its choosing.

## 6. Status & sequencing

1. ✅ **Metering** — consumption ledger live (every read attributed to creator/bot, daily-deduped).
2. 🔨 **Valuation + Accrual** — our own pricing algorithm + creator balances, **built now, behind a flag, zero money moving**.
3. ⏳ **Payout** — Stripe Connect adapter wired only at scale, once the rail is ready. Until then, balances accrue and are visible; nothing is blocked.

> Build the moat (valuation + accrual) first. Plug the commodity (payout rail) last. Own the brain, rent the pipe.

---

*RAK Economics v0.1 — write once, own it, get paid every time an agent cites it. Reference node: rak.ad.*
