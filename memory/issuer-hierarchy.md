---
title: Issuer Hierarchy
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: "The Issuer Hierarchy is the Card Management System's data model — Issuer → Card Program → Card → Account — where every card, program, velocity profile, risk profile, and key set is scoped to an issuer, and no card can be issued without a fully provisioned issuer."
---

## Definition

The Issuer Hierarchy is the governing data model of the [[Card Management System]]. All configuration, cards, programs, and accounts are organized under this hierarchy:

```
Issuer
  └── Card Program
        └── Card
              └── Account
```

Every card program, BIN range, card, account, velocity profile, risk profile, and cryptographic key set is scoped to an issuer. **No card can be issued without a fully provisioned issuer.**

## Hierarchy Components

- **[[Issuer]]** — top-level entity. Links to a [[Financial Institution]] (1:1). Holds auth type config, currency, status, DES key pool, BIN registry.
- **Card Program** — collection of card products under an issuer, associated with one BIN range. Holds stand-in parameters, velocity profiles, risk profiles, default card controls.
- **Card** — individual card record. Linked to cardholder (personalized) or created without cardholder link (anonymous/batch). Holds card status, overriding card controls.
- **Account** — account linkage and balance context for authorization decisions.

## Implications

- Configuration inheritance flows down: issuer-level settings (e.g., auth type, currency) are inherited by all programs and cards under the issuer.
- Data isolation is enforced at the issuer level — Issuer Admin users can only access data under issuers linked to their mapped [[Financial Institution]].
- A single [[Financial Institution]] can have multiple issuers (e.g., separate issuers per market), but each issuer maps to exactly one FI.

## Sources

- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD; primary definition
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS features overview
