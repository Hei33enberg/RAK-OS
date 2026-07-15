# Security Policy

RAK OS is infrastructure for media without an owner. Its integrity — provenance, the reader tier, node isolation — is part of the mission, so we take security reports seriously and credit the researchers who help (the **Warden** role in [`REALM.md`](./REALM.md)).

## Reporting a vulnerability

**Do not open a public issue for a security vulnerability.**

Report privately via GitHub's [private vulnerability reporting](https://github.com/Hei33enberg/RAK-OS/security/advisories/new) (Security → Report a vulnerability), or by direct message to the Crown ([@Hei33enberg](https://github.com/Hei33enberg)).

Please include: what you found, how to reproduce it, and the potential impact. We aim to acknowledge within a few days.

## Scope

In scope:

- The `@rak-ad/mcp` client and this repository.
- The RAK content object / provenance model as specified in [`SPEC.md`](./SPEC.md) (e.g. signature or tamper-evidence weaknesses).
- Tier/scope enforcement described in the skill docs (e.g. a reader-tier caller reaching a paid or internal tool).

Out of scope (report to rak.ad directly, not here): the hosted rak.ad product surface, third-party dependencies with their own advisories, and volumetric/DoS testing against the live node.

## Our commitments

- We will not pursue legal action against good-faith research that respects this policy and user privacy.
- We disclose fixed vulnerabilities and credit the reporter (unless anonymity is requested).
- We make no absolute security claims. The honest posture of what is and isn't protected lives in the code and the spec — verify it there.
