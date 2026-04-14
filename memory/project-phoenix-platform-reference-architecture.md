---
title: Project Phoenix — Platform Reference Architecture
type:
  - "source"
cssclasses:
  - "source"
source_path: Project Phoenix\001-phoenix-platform-reference-architecture.pdf
created: "2026-04-14T15:41:32Z"
updated: "2026-04-14T15:41:32Z"
summary: Project Phoenix Platform Reference Architecture (Draft, 2026-02-27, 43 pages) — 3-layer model (Core/Capability Spine+Modules/Experience) with 29 platforms organised into 4 categories; one global app per form factor with capabilities enabled per market; TSP as foundational payment processing kernel; CBA for ledger with PII separation; Cosmos for stateless auth; Loom for fraud/AML; market differences as config+adapters, not forks.
---

## Summary
The engineering blueprint for [[Project Phoenix]] — restructures Moniepoint from single-market products into a multi-market platform. Draft dated 2026-02-27 from Platform Architecture Team. Predecessor: "Global Platform — Discovery, Documentation & Migration Approach" (the "Path to Global Platform" doc). Defines 29 platforms organised into 4 categories (Experience / Capability / Core / Infrastructure+Operations) with Spine+Modules pattern for market adaptation.

## Key Points
- **Structural premise:** One global app per form factor (Mobile, Web, POS). Capabilities and features enabled by customer's jurisdiction/market. No separate apps per country or segment.
- **3-Layer model:**
  - **Layer 1 — Core Platforms** (shared infrastructure, country-agnostic): Banking & Ledger (CBA), Financial Crime Prevention ([[Loom]]), Transaction Switching & Processing ([[TSP]]), [[Cosmos]] (Auth & Access), Notification System, Event Bus (Kafka).
  - **Layer 2 — Spine** (capability platforms, market-agnostic orchestration).
  - **Layer 3 — Modules / Market Packs** (per-market adapters, configs, integrations).
- **Design principles:**
  - Market differences are configuration, not forks. Adding a country = adding Module config + adapters, no changes to Spine or Core.
  - Each capability platform owns its own Spine + Modules. No global monolithic orchestrator.
  - Capability platforms communicate through defined APIs + events. No direct database access across boundaries.
  - One adapter per external provider.
  - **PII separation:** Transaction/business data stored centrally PII-free. Customer PII stored regionally in CBA. External recipient PII stored in Regional PII Vaults per jurisdiction.
  - Stateless auth: Cosmos issues JWTs; platforms validate tokens locally via cached JWKS. No per-request calls to Cosmos in payment path.
- **Business Capability Platforms (Layer 2):**
  - **Account Payments** — domestic pay-in/out, internal transfers, direct debit. Calls TSP for all fund movement.
  - **Cross-Border Payments** — remittance, FX, cross-market payments.
  - **Payment Gateway (Monnify+)** — merchant acceptance (online collections, bank transfer, card-not-present).
  - **Card Issuance & Processing** — card lifecycle, 3DS/SCA, issuer auth.
  - **Card Acceptance & Processing** — POS merchant acquiring, chargebacks.
  - **Credit Platform** — unified lending (business + consumer), origination/underwriting/repayment/collections.
  - **Identity, Onboarding & Shell** — KYC/KYB, customer shell lifecycle, tier management.
  - **Money Management Platform** — savings, budgeting, insights.
  - **Business Management Platform (Moniebook)** — invoicing, bookkeeping, inventory.
  - **Rewards Platform** — loyalty, cashback, referrals.
  - **Value Added Services (VAS)** — airtime, data, bill payments.
  - **POS Hardware & Device Platforms** — terminal fleet management, device provisioning, firmware, key injection.
- **Experience Platforms (Client Layer):** Mobile App Platform, Web App Platform, POS App Platform, Design System & Experience Enablement.
- **Internal & Operational Platforms:** MonieDesk (Customer Support), MonieCRM (Sales), Product Instrumentation, Finance Systems, Field Verification, MOOS, Infrastructure & Platforms.
- **CBA (Banking & Ledger):** Double-entry ledger, multi-currency books (NGN/GBP/KES/USD), cross-book postings for FX, Shell Service (customer→accounts container), account lifecycle, holds/balances. All fund movement goes through TSP; platforms may call CBA directly only for read operations.
- **Loom (Financial Crime):** AML screening (60+ rules, market-specific: GB 41, NG/Monnify 3, onboarding security 5), sanctions (OFAC/UN/EU/HMT/CBN), PEP screening, MFA (biometric face factor + TOTP), ML-enhanced fraud detection, Lua-based configurable rule engine via Redis functions. Implementation: Rust + gRPC (Tonic). Sub-100ms pre-transaction screening. Follows Spine+Modules pattern.
- **TSP (Transaction Switching & Processing):** Foundational payment processing kernel — **ALL fund movement flows through TSP**. 16 transaction types across 2 modes (SYNC for card auth/reversal, ASYNC for everything else). Owns Payment Orchestration (saga state machine), Fee Engine, Posting Builder (CBA journal entries), Routing Engine (config-driven adapter selection), Account Service (external→CBA mapping), Beneficiary Service (with Institution Registry), Reconciliation Engine. Four routing modes: outbound, source-side, inbound, none. Adding a new market = new TSP Module (rail adapters + config); Spine unchanged.
- **Transaction types mapped to calling platforms:** PAY_IN_CARD/PAY_IN_BANK_TRANSFER/PAY_OUT/DIRECT_DEBIT/INTERNAL_TRANSFER (Account Payments), CROSS_CURRENCY_INTERNAL/CROSS_CURRENCY_EXTERNAL (Cross-Border), LOAN_DISBURSEMENT/LOAN_REPAYMENT (Credit), MERCHANT_SETTLEMENT (Card Acceptance, Payment Gateway), CARD_AUTHORIZATION/CARD_CLEARING/AUTH_REVERSAL (Card Issuance), VAS_AIRTIME/VAS_DATA/VAS_BILL_PAYMENT (VAS).
- **TSP dependencies:** CBA (tight, all postings), Cosmos (loose, JWT JWKS), Loom (medium, pre-payment screening), Treasury/FX (medium), Kafka (outbox pattern), Notifications (loose).
- **Cosmos:** OAuth2 provider, stateless JWTs, MFA, JWKS, service-to-service machine credentials, RBAC. Per-transaction MFA: client ↔ Cosmos before request reaches capability platform. Zero Cosmos network calls in payment path.
- **Event Bus standard envelope:** event_id, event_type (e.g., account-payments.payout.completed), source, country, timestamp, correlation_id, payload.
- **Account Payments detail:** Spine services — Payment Request Manager, PayIn/PayOut/Transfer/Direct Debit Handlers, Payments API. Lifecycle: RECEIVED → VALIDATING → SUBMITTED_TO_TSP → TRACKING → COMPLETED/FAILED. Modules are thin (market-specific domain config only); rail adapters live in TSP Modules. Direct Debit requires mandate management infrastructure in Account Payments (mandate validation is caller's responsibility; TSP processes the debit).

## Entities Mentioned
[[Moniepoint]], [[CBA]], [[Loom]], [[TSP]], [[Cosmos]], Monnify+, Moniebook, MonieDesk, MonieCRM, MOOS, [[Project Phoenix]], Platform Architecture Team

## Concepts
[[Project Phoenix]], [[Platform Reference Architecture]], [[3-Layer Platform Model]], [[Spine + Modules Pattern]], [[Country-Agnostic Platform]], [[PII Separation]], [[Stateless Auth]], [[Single Global App per Form Factor]], [[Transaction Switching Kernel]], [[Market Packs]], [[Path to Global Platform]]