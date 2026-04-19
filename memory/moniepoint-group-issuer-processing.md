---
title: Moniepoint Group Issuer Processing
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T15:53:59Z"
updated: "2026-04-19T15:53:59Z"
summary: "Moniepoint Inc.'s target state under Project Phoenix — moving from collections-only acquiring to full issuer processing; components include Authorization Engine, CMS, Stand-in, 3DS, EMV Data Prep."
---

## Overview

[[Moniepoint|Moniepoint Inc.]]'s target state under [[Project Phoenix]] moving beyond collections-only acquiring into full issuer processing.

See parent concept: [[Issuer Processing]] (generic industry capability).

## Components in Project Phoenix

- [[Authorization Engine]] — real-time approve/decline decisions using issuer-defined rules
- [[Card Management System]] — cardholder account management, card lifecycle, BIN registry
- [[Stand-in Processing]] — fallback authorization when issuer host (CBA) is unavailable
- [[3DS/SCA Service]] — cardholder authentication for card-not-present transactions
- [[EMV Data Preparation Platform]] — chip data profile generation for card personalization

## Deployment Models

Per [[003A_Issuer_Management_PRD_v1_5]], two models supported:
- **Processor Model** — multi-tenant; Moniepoint processes for multiple issuing banks
- **Bank/Issuer Model** — single-tenant; dedicated instance for a single issuing institution

## Current State

Moniepoint is in [[TeamApt Collections-Only Processing]] for MasterCard. Full issuer processing is the target under Project Phoenix, requiring scheme certification for both Visa and MasterCard.

## Notes

- Derived from [[Issuer Processing]], moved 2026-04-19 per Rule 12 split.