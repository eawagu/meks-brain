---
title: Card Issuance & Processing Platform
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: "The Card Issuance & Processing Platform is Moniepoint's Layer 2 platform within Project Phoenix that manages the complete card lifecycle (issuance, authorization, dispute management) using a Spine-and-Module architecture for multi-market deployment."
---

## Overview

The Card Issuance & Processing Platform (CI&P) is a Layer 2 business capability within [[Project Phoenix]] for [[Moniepoint]]'s digital banking ecosystem. It manages the complete card lifecycle — from card issuance and activation through real-time authorization, customer-configurable controls, and dispute resolution — across multiple markets.

## Architecture

The platform follows the [[Spine and Module Architecture]]:
- **Spine** (Layer 2): market-agnostic shared platform services — Authorization Engine, Card Management System, 3DS/SCA, Dispute, EMV Data Prep
- **Module** (Layer 3): market-specific adapters, configuration, integrations — one per market, independently deployable

## Core Services

| Service | Owner | Responsibility |
|---|---|---|
| [[Authorization Engine]] | [[Team 1 Card Processing]] | Real-time approve/decline on every transaction |
| [[3DS/SCA Service]] | [[Team 1 Card Processing]] | Cardholder authentication for CNP transactions |
| [[Card Dispute Service]] | [[Team 1 Card Processing]] | End-to-end dispute lifecycle |
| [[Card Management System]] | [[Team 2 Card Issuance]] | Card lifecycle, program config, controls |
| [[EMV Data Preparation Platform]] | [[Team 2 Card Issuance]] | EMV profiles, personalisation vendor data flows |

## Key Dependencies

- [[TSP]] — tight coupling; all fund movement; <500ms authorization window
- [[CBA]] — medium coupling; read-only balance queries
- [[Loom]] — medium coupling; AML/compliance via TSP
- [[Kafka]] — infrastructure; async event delivery
- [[Notifications]] — loose coupling; async push/SMS/email

## What CI&P Does NOT Own

- Fund movement logic, fee calculation, posting construction → [[TSP]]
- Ledger, accounts, balances → [[CBA]]
- AML/compliance screening → [[Loom]]
- Customer identity/onboarding → Identity/Shell
- Merchant acquiring, POS processing → Card Acceptance
- CNP collections → Payment Gateway (Monnify+)
- FX rate determination → Treasury/FX
- Lending decisions → Credit Platform

## Markets

- Nigeria (Phase 1 — Verve + Visa)
- UK (Phase 3 — Visa + Mastercard, PSD2/SCA)
- Kenya (Phase 4 — Visa)

## Sources

- [[001-CI_P-exec-overview_v1.1]] — executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] — team structure
- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS core features
