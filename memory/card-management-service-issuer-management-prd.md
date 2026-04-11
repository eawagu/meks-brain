---
title: Card Management Service Issuer Management PRD
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Card Issuance Platform\003A_Issuer_Management_PRD_v1_5.docx.md
summary: Product requirements document for Issuer Management — the foundational configuration layer of the CMS defining issuer record creation, FI definition, authorization type configuration, and issuer lifecycle management.
---

## Summary

PRD for Issuer Management, the top-level entity in the CMS hierarchy. Every card program, BIN range, card, account, velocity profile, risk profile, and key set scoped to an issuer. Covers five authorization types (Full Authorization, Full Auth with Advices, Balance Stand-in, Velocity Stand-in, No Stand-in) and the issuer onboarding flow.

## Key Points

- Issuer = top-level entity; all card programs, BIN ranges, cards, accounts scoped to issuer
- Five auth types: Full Auth, Full Auth w/ Advices, Balance Stand-in, Velocity Stand-in, No Stand-in
- Stand-in logic: pre-calculated velocity limits or static balances when primary auth path unavailable
- Onboarding: create issuer → create FI → configure auth types → define card programs → generate keys → issue cards
- Portal access scoped to FI level; single issuer may manage multiple FIs
- Integration with TSP for testing (test issuers submit test transactions without fund impact)
- Regulatory: issuer verified through Identity service before card programs can be created

## Concepts

- [[Card Issuance Platform]]