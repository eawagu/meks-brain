---
title: Project Phoenix — TSP Executive Overview
type:
  - "source"
cssclasses:
  - "source"
source_path: Project Phoenix\002-transaction-switching-and-processing-executive-overview.pdf
created: "2026-04-14T15:42:37Z"
updated: "2026-04-14T15:42:37Z"
summary: "Project Phoenix Document 002: Transaction Switching & Processing (TSP) Platform Executive Overview (Draft 2026-02-27, 17 pages) — Layer 1 payment processing kernel handling all fund movement; Spine + Market Modules; 16 transaction types; SYNC (<500ms card auth) vs ASYNC (saga with compensation); 6 phases (Build → Shadow → Beta → GA Cutover → Kenya Launch → Legacy Decommission); NG and UK migrate in parallel; Kenya launches platform-native."
---

## Summary
Executive-level overview of the TSP platform — the Layer 1 payment processing kernel for Project Phoenix. Every time money moves in Moniepoint it flows through TSP. Built by a dedicated team; existing products continue to run undisrupted. Six-phase migration: Build → Shadow → Beta → GA Cutover → Kenya Launch → Legacy Decommission. NG and UK migrate simultaneously with NG as proving ground; Kenya launches platform-native in Phase 5.

## Key Points
- **TSP role:** Foundational Layer 1 payment processing kernel. Shared infrastructure, not domain-specific. Every fund movement flows through TSP. Domain platforms (Account Payments, Cross-Border, Card Issuance, Credit, Payment Gateway, Card Acceptance, VAS) call TSP API; they don't build their own fund movement logic.
- **Reuses:** [[CBA]] (ledger), [[Cosmos]] (auth), [[Loom]] (compliance), Treasury/FX (rates), Notifications, Kafka.
- **16 Transaction types:** PAY_IN_CARD, PAY_IN_BANK_TRANSFER, PAY_OUT, INTERNAL_TRANSFER, CROSS_CURRENCY_INTERNAL, CROSS_CURRENCY_EXTERNAL, LOAN_DISBURSEMENT, LOAN_REPAYMENT, MERCHANT_SETTLEMENT, CARD_AUTHORIZATION (SYNC <500ms), CARD_CLEARING, AUTH_REVERSAL (SYNC), VAS_AIRTIME, VAS_DATA, VAS_BILL_PAYMENT, DIRECT_DEBIT.
- **Two processing modes:**
  - **SYNC** (CARD_AUTHORIZATION, AUTH_REVERSAL): Sub-500ms, no state persistence before response. TSP validates, places/releases lien on CBA, responds immediately.
  - **ASYNC** (all others): Full state machine with persistence + saga orchestration + compensation on failure. **On timeout (status unknown): TSP does NOT auto-compensate — escalated for investigation** (payment may have succeeded at external rail).
- **Architecture layers:** (L3) Market Modules — payment rail adapters, account adapters, market config. One module per market. (L2) TSP Spine — Payment Orchestrator, Fee Engine, Posting Builder, Routing Engine, Account Service, Beneficiary Service + Institution Registry, Reconciliation Engine, TSP API. (Shared) CBA, Cosmos, Loom, Treasury/FX, Notifications, Kafka.
- **Build vs reuse:** Build = Orchestrator/Fee/Posting/Routing/Account/Beneficiary/Recon Engines + Market Modules. Reuse = CBA, Cosmos, Loom, Treasury/FX, Notifications, Kafka.
- **Dependency coupling:** CBA tight (every transaction). Cosmos loose (JWKS cached). Loom medium (<100ms sub). Treasury/FX medium (cross-currency only). Notifications loose (async Kafka). Kafka infrastructure.
- **PII separation:**
  - Transaction Store: payment_id, amount, currency, status, adapter, timestamps, opaque sender/recipient refs (no PII).
  - Sender PII: stored in CBA (our customer); regional residency.
  - **Recipient PII (external): stored in Regional PII Vaults — one per jurisdiction** (NG/UK/KE, Spanner or regional DB). TSP stores opaque ref and resolves on read. Encrypted at rest; access controlled per jurisdiction.
- **Example flows:** Domestic pay-out (NG→NG): Cosmos MFA → Account Payments → TSP API → Loom approve → Fee → Posting → CBA posting → Routing → NIP Adapter → complete. Cross-border (UK→NG): Cross-Border Payments locks FX rate → TSP → crossbook posting (debit GBP book, bridge via GENERAL_LEDGER USD, credit NGN float) → NG Module NIP Adapter for last-mile. Card auth (SYNC): lien is the state, no persistence before response.
- **Multi-market expansion (e.g., Kenya):** Build KE Module (M-Pesa/PesaLink/KE RTGS adapters), add KE market config, add KE account adapters, add KES to CBA, set up KE PII Vault, configure Loom for KE, register KE institutions. **Zero Spine changes.**
- **What TSP does NOT own:** Domain business logic (calling platforms), FX rate determination (Treasury/X-Border), ledger (CBA), auth (Cosmos), compliance (Loom), notifications (Notifications team), card auth decisions (Card Issuance), card scheme connectivity (Card Issuance/Acceptance), merchant onboarding (Payment Gateway/Card Acceptance), lending decisions (Credit), VAS product catalog (VAS).
- **4 deployable units:** `tsp-core` (Spine + orchestration), `tsp-data-services` (Account + Beneficiary Service), `tsp-recon` (Reconciliation Engine), `tsp-adapter-{country}` (one per market, independently deployable).
- **6-phase migration:**
  - **Phase 1 — Build:** TSP Spine + both country modules (`tsp-adapter-ng` + `tsp-adapter-gb`) in parallel.
  - **Phase 2 — Shadow Mode:** Read-only comparison against both markets; independent pacing per market. **Gate: 0% discrepancy for 14 consecutive days before cutover permitted.** Existing services remain source of truth.
  - **Phase 3 — Beta:** Internal (employees) → expanded (opt-in customers). Both markets can beta simultaneously. Same CBA ledger. Per-user feature flags, instant rollback.
  - **Phase 4 — GA Cutover (NG + UK):** Simultaneous feature-flag switch. **Migration order: MERCHANT_SETTLEMENT → LOAN_DISBURSEMENT/REPAYMENT → VAS → PAY_IN/PAY_OUT → INTERNAL_TRANSFER/DIRECT_DEBIT → CROSS_CURRENCY → CARD_AUTHORIZATION/CLEARING/AUTH_REVERSAL** (lowest risk first). Existing services run in parallel throughout. UK card services (Spring Data JDBC + Spanner) absorbed directly.
  - **Phase 5 — Kenya Launch:** KE module, KE PII Vault. Platform-native from day one.
  - **Phase 6 — Legacy Decommission:** Per-transaction-type, gated by no-rollback-for-30-days. Cleanup at each team's pace.
- **Success metrics:** New market to first payment in weeks (not months). 100% config (no custom code). TSP API availability 99.99%. Card auth < 500ms p99. Pay-out < rail SLA + 2s. **Zero money-loss incidents** (0 unresolved discrepancies >24h). Recon match rate >99.5% auto-matched. **Zero 2026 Nigeria business disruption from platform build.**
- **Resourcing:** Dedicated TSP team. Roles: TSP Architect, Backend Engineers (Spine / Data Services / Recon / Modules), Infrastructure Engineer, QA/Test, Product Manager.

## Entities Mentioned
[[Moniepoint]], [[CBA]], [[Cosmos]], [[Loom]], [[TSP]], NIP, FPS, M-Pesa, SWIFT, PesaLink, Spanner, [[Project Phoenix]]

## Concepts
[[Project Phoenix]], [[Transaction Switching Kernel]], [[TSP Spine + Modules]], [[Sync vs Async Payment Modes]], [[Saga Compensation]], [[PII Separation]], [[Regional PII Vaults]], [[Shadow Mode Migration]], [[Feature Flag Cutover]], [[Zero Spine Changes Market Expansion]], [[Parallel NG-UK Migration]], [[Kenya Platform-Native Launch]]