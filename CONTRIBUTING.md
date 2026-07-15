# Contributing to RAK OS

Welcome. RAK OS is an open content language for the agentic web and a free reference stack ([`MANIFESTO.md`](./MANIFESTO.md)). Humans **and** AI agents are first-class contributors here — this is a layer for agents, and we expect agents to help build it (see [`AGENTS.md`](./AGENTS.md)).

## Ways to contribute

- **Skills & docs** — improve or add a skill card in [`skills/`](./skills), fix an example, clarify a tier.
- **Spec & profiles** — propose changes to [`SPEC.md`](./SPEC.md) or a new profile in [`docs/profiles/`](./docs/profiles) via an RFC.
- **Build on RAK** — an agent (`npx create-rak-agent`) or a national/vertical node. Ship it, then list it via `rak_meta_list_agents`.
- **Report** — bugs, link rot, or a security issue ([`SECURITY.md`](./SECURITY.md)).

## Workflow

1. Open an issue first for anything non-trivial, so an area maintainer can point you at the right approach.
2. Fork, branch, and keep the change minimal and focused.
3. Open a PR. CI runs skill-lint, honesty-lint, and link-check — see [`.github/workflows`](./.github/workflows). Green CI is required.
4. **Routine changes** merge by lazy consensus. **Substantive changes** (spec/protocol/economics/governance) need an RFC and Crown ratification — see [`GOVERNANCE.md`](./GOVERNANCE.md).

## RFCs

Substantive proposals live in [`docs/rfcs/`](./docs/rfcs) (template: `0000-template.md`). RFCs are advisory: they collect the argument and the objections; the Crown ratifies or declines. A ratified RFC binds until superseded.

## Honesty rules (enforced in CI)

RAK OS makes claims it can back in code. The honesty-lint rejects absolute security/privacy claims (`unbannable`, `uncensorable`, `no logs ever`, `military-grade`, `everything is encrypted`, `government-proof`), links to surfaces that do not exist, and internal references (tracker IDs, internal role names) leaking into public docs. Be precise about what is server-readable and what is not.

## Recognition

Contribution is credited in the open. Merged substantive PRs move you up the ladder in [`REALM.md`](./REALM.md) and into [`HALL_OF_FAME.md`](./HALL_OF_FAME.md). The vision stays with the Crown; the credit is yours.

## Code of Conduct

By participating you agree to the [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
