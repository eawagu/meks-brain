---
title: Issuer Processing
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-13T15:32:15Z"
updated: "2026-04-13T15:32:15Z"
summary: Card-issuer-side transaction processing capability — authorization decisions, cardholder account management, and clearing/settlement; the target state under Project Phoenix moving beyond collections-only acquiring.
---

## Definition

Issuer Processing is the capability of acting as the card-issuing institution's processor — receiving authorization requests from card networks, making approve/decline decisions, managing cardholder accounts, and handling clearing and settlement from the issuer side.

## Distinction from Acquiring

- **Acquiring** (current Moniepoint state) — processing transactions on behalf of merchants who accept cards
- **Issuer Processing** (target state under [[Project Phoenix]]) — processing transactions on behalf of the bank/institution that issued the card to the cardholder

## Components in Project Phoenix

- [[Authorization Engine]] — real-time approve/decline decisions using issuer-defined rules
- [[Card Management System]] — cardholder account management, card lifecycle, BIN registry
- [[Stand-in Processing]] — fallback authorization when issuer host (CBA) is unavailable
- [[3DS/SCA Service]] — cardholder authentication for card-not-present transactions
- [[EMV Data Preparation Platform]] — chip data profile generation for card personalization

## Deployment Models

Per [[003A_Issuer_Management_PRD_v1_5]], two models:
- **Processor Model** — multi-tenant; Moniepoint processes for multiple issuing banks
- **Bank/Issuer Model** — single-tenant; dedicated instance for a single issuing institution

## Current State

Moniepoint is in [[Collections-Only Processing]] for MasterCard. Full issuer processing is the target under Project Phoenix, requiring scheme certification for both Visa and MasterCard.