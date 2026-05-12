---
title: Retry mechanism design
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-12T10:57:09Z"
updated: "2026-05-12T10:57:09Z"
summary: "Disbursement service retry mechanism with mapped CBA response codes + exponential retry on 'unable to find report' — sequence-diagram review discipline required; configurable framework rather than hard-coded."
---

## Overview

Retry mechanism design is the disbursement service retry approach replacing the previous trial-and-error pattern.

## Design (per Apr 22, 2026 reviews)

- Maps all [[CBA]] states — [[Muhammad Toqeer]] implementing
- Exponential retry on 'unable to find report' response
- Configurable retry for consumer lag
- Built as configurable framework, NOT hard-coded business logic
- Reference reuse on retries (no regeneration) — use existing team references
- Sequence diagram MUST be reviewed by engineering before implementation — [[Damilare Ogunnaike]] mandate
- 2 design flavors prepared by [[Prateek Gupta]] + [[Muhammad Toqeer]]
- Rigorous multi-day staging testing (feature + load + response-mapping confirmation) required before deployment

Source: [[Disbursement Issues & Next steps - 2026_04_22 11_25 WAT]]; [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]