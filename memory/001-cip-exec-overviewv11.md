---
title: 001-CI_P-exec-overview_v1.1
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: 001-CI_P-exec-overview_v1.1.docx.md
summary: Executive overview of the Card Issuance & Processing Platform within Project Phoenix — a Layer 2 business capability managing the complete card lifecycle using a market-agnostic Spine and market-specific Modules.
---

## Summary

This document presents the [[Card Issuance & Processing Platform]], a foundational platform within [[Project Phoenix]] for [[Moniepoint]]'s digital banking ecosystem. The platform manages card lifecycle (issuance, activation, authorization, dispute resolution) and delegates fund movement to [[TSP]], account management to [[CBA]], implementing a [[Spine and Module Architecture]] where the Spine is shared across markets and Modules are independently deployable per market. The platform targets sub-500ms authorization latency, 99.99% availability, and enables new market launches within weeks of scheme partner readiness.

## Key Points

- The platform owns five core capabilities: [[Card Management System]] (issuance, activation, controls, program configuration), [[Authorization Engine]] (approve/decline decisions), [[3DS/SCA Service]] (CNP challenges), [[Card Dispute Service]] (dispute lifecycle), and [[EMV Data Preparation Platform]] (cryptographic keys, vendor data flows).
- "Card Issuance & Processing follows the Phoenix Spine and Module model. The Spine is market-agnostic. Market-specific differences — card scheme connectors, EMV data preparation, card personalisation vendor adapters, 3DS/SCA protocol implementations, BIN configuration — live in Modules. Adding a new market means adding a Module; the Spine requires no changes."
- All fund movement goes through [[TSP]] via POST /v1/transactions; Card Issuance never posts directly to [[CBA]]. CARD_AUTHORIZATION and AUTH_REVERSAL must complete within 500ms synchronously.
- Customer-configurable card controls (spending limits per-transaction/daily/weekly, MCC restrictions, geographic/channel restrictions) are evaluated in real time by the [[Authorization Engine]] on every transaction.
- The Authorization Engine evaluates in sequence: card status (active/blocked/expired), account status, available balance, and active card controls; produces either APPROVE (triggers TSP lien) or DECLINE (no lien, decline reason returned).
- Card-not-present transactions require mandatory [[3DS/SCA]] authentication gate before authorization proceeds; OTP generation and challenge delivery are owned entirely by the 3DS/SCA Service.
- Market-specific SCA implementations (e.g., PSD2 for UK) are delivered as market module adapters, not Spine changes.
- Platform depends on six shared services: [[TSP]] (tight coupling), [[CBA]] (medium, read-only), [[Loom]] (medium via TSP), Identity/Onboarding/Shell (medium, onboarding only), [[Kafka]] (infrastructure), [[Notifications]] (loose, async).
- Delivery phases: Phase 1 (Nigeria Platform Build — Spine + Nigeria Module), Phase 2 (Nigeria Incremental Cutover via feature flags), Phase 3 (UK Launch — UK Module), Phase 4 (Kenya Launch — Kenya Module), Phase 5 (Additional Markets — Spine unchanged).
- Success targets: card authorization latency <500ms, auth reversal <500ms, 99.99% platform API availability, new market capability delivery >80% via config vs code, change failure rate <5%, zero money-loss incidents.
- Card Issuance does NOT own: fund movement logic/fee calculation (TSP), ledger/accounts/balances (CBA), AML/compliance (Loom), customer identity/onboarding (Identity/Shell), merchant acquiring (Card Acceptance), CNP collections (Payment Gateway/Monnify+), scheme connectivity acquirer-side, FX rate determination (Treasury/FX), lending decisions (Credit Platform).
- Document is First Draft (v0.1), authored by Card Issuance Platform Team on 2026-02-27, targeted at Executive Leadership.

## Entities Mentioned

- [[Moniepoint]] — parent organization
- [[Project Phoenix]] — program/initiative
- [[Digital Banking Platforms]] — organizational unit hosting Card Issuance & Processing
- [[Card Issuance & Processing Platform]] — primary subject of this document
- [[Authorization Engine]] — real-time approve/decline decision engine (owned by platform)
- [[Card Management System]] — card lifecycle engine (owned by platform)
- [[3DS/SCA Service]] — cardholder authentication for CNP transactions (owned by platform)
- [[Card Dispute Service]] — end-to-end dispute lifecycle engine (owned by platform)
- [[EMV Data Preparation Platform]] — EMV profile/vendor data management (owned by platform)
- [[TSP]] — Transaction Switching & Processing; fund movement kernel (dependency, tight coupling)
- [[CBA]] — Core Banking Application; ledger and accounts (dependency, medium coupling, read-only)
- [[Loom]] — compliance and AML screening (dependency, medium coupling)
- [[Cosmos]] — JWT auth service (stateless, cached JWKS)
- [[Kafka]] — event bus infrastructure
- [[Notifications]] — push/SMS/email alerts (loose coupling, async)
- [[Card Acceptance & Processing]] — merchant acquiring (out of scope)
- [[Payment Gateway]] (Monnify+) — card-not-present collections (out of scope)
- [[Verve]] — card scheme, Nigeria
- [[Visa]] — card scheme, Nigeria/UK/Kenya
- [[Mastercard]] — card scheme

## Concepts

- [[Spine and Module Architecture]] — market-agnostic shared platform (Spine) + independently deployable market-specific adapters and configuration (Modules); adding a new market = adding a Module, Spine unchanged.
- [[Authorization Flow]] — synchronous issuer-side decision pathway: evaluate card status → balance/controls → TSP lien → APPROVE/DECLINE within 500ms.
- [[Card Lifecycle]] — complete progression from issuance through activation, PIN management, blocking, replacement, status transitions, to deactivation.
- [[Card Controls]] — customer-configurable restrictions (spending limits, MCC restrictions, geographic/channel restrictions) evaluated in real time on every transaction.
- [[Lien]] — hold placed on account balance during authorization; released on reversal or expiry.
- [[Fund Movement Delegation]] — principle that Card Issuance never posts directly to CBA; all monetary operations go through TSP.
- [[3D Secure / Strong Customer Authentication]] — cardholder authentication protocol for CNP transactions; challenge via biometric or OTP before authorization proceeds.
- [[Market Expansion Pattern]] — add a Module per new market; no Spine changes required; new markets inherit battle-tested Spine.
- [[Feature Flagged Cutover]] — incremental traffic migration using feature flags with rollback capability (Nigeria Phase 2).
- [[Tight vs Loose Coupling]] — coupling model: tight (TSP, <500ms), medium (CBA, Identity), loose (Notifications, async Kafka).
