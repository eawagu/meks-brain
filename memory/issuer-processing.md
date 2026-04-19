---
type:
  - "concept"
title: Issuer Processing
created: "2026-04-13T15:32:15Z"
summary: "Industry capability — card-issuer-side transaction processing: authorization decisions, cardholder account management, and clearing/settlement on behalf of card-issuing institutions."
updated: "2026-04-19T15:53:59Z"
cssclasses:
  - "concept"
---

## Definition

Issuer Processing is the industry capability of acting as the card-issuing institution's processor — receiving authorization requests from card networks, making approve/decline decisions, managing cardholder accounts, and handling clearing and settlement from the issuer side.

## Distinction from Acquiring

- **Acquiring** — processing transactions on behalf of merchants who accept cards
- **Issuer Processing** — processing transactions on behalf of the bank/institution that issued the card to the cardholder

## Core Components (Industry Standard)

- **Authorization** — real-time approve/decline decisions using issuer-defined rules
- **Card Management** — cardholder account management, card lifecycle, BIN registry
- **Stand-in Processing** — fallback authorization when issuer host is unavailable
- **3DS/SCA Service** — cardholder authentication for card-not-present transactions
- **EMV Data Preparation** — chip data profile generation for card personalization

## Deployment Models

- **Processor Model** — multi-tenant; single processor serves multiple issuing banks
- **Bank/Issuer Model** — single-tenant; dedicated instance for a single issuing institution

## Known Entity Adoptions

- [[Moniepoint Group Issuer Processing]] — Moniepoint Inc.'s target state under Project Phoenix moving beyond collections-only acquiring.

## Related

- [[Collections-Only Processing]]
- [[Card Scheme Integration]]

## Notes

- 2026-04-19: Entity-scoped Moniepoint/Phoenix content moved to [[Moniepoint Group Issuer Processing]] per Rule 12. This page retained as the generic industry capability.