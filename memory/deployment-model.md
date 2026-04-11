---
title: Deployment Model
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: In the Card Management System context, Deployment Model describes two supported operating configurations — Processor Model (multi-tenant, single instance serving multiple FIs) and Bank/Issuer Model (single-tenant, the deploying institution is itself the issuer) — both supported from a single codebase.
---

## Definition

In the context of the [[Card Management System]] and [[Project Phoenix]], Deployment Model refers to the two configurations in which the CMS can operate:

## Processor Model

A payment processor deploys a single CMS instance and provides card management services to multiple Financial Institutions. Each FI is a distinct issuer with full data isolation. Characteristics:
- Multi-tenant: multiple FIs coexist on one instance
- Each FI has strictly isolated data — Issuer Admin users of one FI cannot access another FI's data
- Platform Admin manages all FIs from a single console

## Bank/Issuer Model

A bank or fintech deploys CMS as its own card management system and is itself the issuer. Characteristics:
- Single-tenant: one deploying institution is the primary issuer
- FI/issuer separation is **still maintained** — even though the deploying institution is the issuer, the FI entity remains separate from the issuer record
- Rationale: "to support future multi-issuer expansion without migration"

## Design Tension

The Bank/Issuer Model requires maintaining the FI/issuer separation even when it creates operational overhead with no immediate multi-issuer need. The document acknowledges this trade-off: the separation exists for future flexibility, not current operational necessity. This is a "build it once, don't migrate later" decision — appropriate only if multi-issuer expansion is genuinely likely.

## Sources

- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD; primary definition
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS features overview
