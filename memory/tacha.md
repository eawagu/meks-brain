---
type:
  - "entity"
title: TACHA
created: 2026-04-11
summary: "TeamApt's centralized clearing and settlement platform — 6 microservices on Kubernetes/AWS, 5 platform consumers (Juliana, DD, Account Switch, PTSP, Monnify), 4 daily settlement windows, 14-bank readiness matrix, NSS Smart Det generation, and 10 Phoenix alignment gaps identified."
updated: "2026-04-13T23:21:07Z"
cssclasses:
  - "entity"
aliases:
  - "TACCS"
  - "Clearing House"
---

## Overview

TACHA is [[TeamApt]]'s centralized clearing and settlement platform. It serves as the backbone for all domestic switching settlement — ingesting transactions from multiple platform consumers, computing fees, netting positions, and executing disbursements via bank-specific settlement agents. Owned by the Domestic Switching department (lead: [[Babatunde Okufi]]).

## Architecture

Deployed on Kubernetes (AWS, migrated from GCP) with Harness CI/CD and Blue/Green deployment strategy. Six microservices:

- **Control Plane** — validation and transaction classification (7-step pipeline: platform ID, schema, merchant, issuer, idempotency, dispute, classification)
- **Fee Service** — priority-based fee rule evaluation on a 3-second cron cycle; supports Flat and Percentage (with cap/min); fee lookup v2.0.0 prioritizes thirdPartyID over merchantIdentifier
- **Clearing Service** — Spring Batch netting and ledger posting
- **Settlement Workflow** — disbursement orchestration (10-second execution cycle, 30-second workflow cycle)
- **Liquidity Manager** — fund sweeps between settlement accounts
- **Backoffice** — Angular + Spring Boot admin UI at `clearing-house.teamapt.com`

Idempotency enforced at DB level via composite key: `platformIdentifier + transactionReference + transactionType`.

## Kafka Infrastructure

7 topics including `taccs_transactions_approved` (inbound from platforms), `taccs_transactions_declined` (feedback), `clearing.adjustments.v1` (reversals/disputes), `taccs.settlement.audit` (immutable audit trail). Config: `acks=all`, SASL_SSL, manual offset commit after ledger write, dead-letter topic monitoring. Consumer groups per platform: Juliana, Direct Debit, Account Switch, PTSP, Monnify.

## Platform Consumers

5 platforms feed into TACHA: JULIANA_SWITCH, DIRECT_DEBIT, ACCOUNT_SWITCH, APTPAY_PTSP, MONNIFY. Each platform owns its own dispute lifecycle (Juliana POS for card-present, Juliana Web for card-not-present, CDD for DD disputes, Monnify for gateway disputes).

## Settlement

4 daily windows: 05:00, 09:00, 12:00, 15:00 WAT. Batch lifecycle: OPEN → CLEARING → NETTING → SETTLEMENT_READY → EXECUTING → COMPLETED. Settlement categorized by acquirer/issuer NSS readiness (Primary = NSS, Secondary = API mix).

**NSS Smart Det:** Unified file aggregating all TeamApt platform clearing data for [[NIBSS]] interbank settlement. NSS centralization planned — [[Juliana Account Switch]] to submit DR/CR entries to TACHA, decommissioning separate Smart Det generation.

### Settlement Agents (as of Feb 2026)

| Agent | Status |
|---|---|
| NIBSS NSS (Polaris, Wema) | Live |
| [[Polaris Bank]] Disbursement API | Live |
| [[Keystone Bank]] API | Live |
| [[Union Bank]] API | Live |
| [[HabariPay]] for GTB (AS-4757) | In Progress |
| [[Access Bank]] API | Planned |
| [[Fidelity Bank]] API | Planned |
| Atlas / [[Moniepoint MFB]] | Planned |

Aggregated Settlement Agent Phase 1 (Sep 2025 target): Fidelity, Access, FCMB, Polaris, Keystone, Moniepoint MFB. Phase 2: Wema, GTB, Union, UBA, Zenith, Ecobank, Parallax, PalmPay.

## Connected Banks (Readiness Matrix — Feb 2026)

14 banks tracked. [[Polaris Bank]] and [[Wema Bank]] are NSS-ready. [[Keystone Bank]] and [[Union Bank]] are API-ready. [[Fidelity Bank]] is both a settlement bank and ACT client.

## Reversals, Refunds & Disputes

Based on RFC by [[Wycliffe Ochieng']] (January 2026, under review). Design principles: immutability (original never mutated), event-driven (adjustments through standard clearing pipeline via `clearing.adjustments.v1`), idempotency, traceability, scheme-agnostic core with adapters.

- **Reversals:** Pre-settlement only; full reversal only in v1; creates contra ledger entry
- **Refunds:** Post-settlement; supports partial and full; cumulative cap at original amount
- **Disputes:** Post-settlement chargebacks; requires `isDispute=true`, `disputeLogCode`, `disputeApproverUser`; netted into next settlement window
- **Negative net settlement:** Prefunded acquirers settled from collateral; non-prefunded capped at zero with shortfall to suspense account + treasury notification

Future: MasterCom/VROL scheme-specific APIs, multi-currency FX, partial reversals, automated escalation.

## Scheduled Jobs

8 jobs: Net Position Computation (every minute), Ledger Entry (every minute), Settlement API Execution (every 10 seconds), Settlement Workflow (every 30 seconds), 4 report generation jobs (4× daily at 05:15/09:15/12:15/15:15 WAT).

**HIGH RISK:** Distributed locks COMMENTED OUT on 4 reporting jobs — potential race conditions in multi-instance deployment. Acknowledged in Phoenix alignment review.

## Database

PostgreSQL with 13 key tables including `clearing_transactions`, `ledger_entries`, `settlement_batches`, `fee_rules`, `dispute_cases`. Archival pipeline planned Q2 2026: DB → S3 → ClickHouse (RFC by [[Wycliffe Ochieng']]).

## Observability

Grafana (Helios), New Relic distributed tracing, MDC correlation IDs. Metabase for operational reporting. NFR targets: 99.99% availability, <200ms adjustment creation latency, <500ms authorization latency.

## Phoenix Alignment

Gap analysis against [[Project Phoenix]] Engineering Alignment Checklist identified 10 gaps:

- **HIGH:** Automated test coverage not stated (Phoenix standard ≥80%) — owner: [[Wycliffe Ochieng']]
- **HIGH:** Real production performance metrics missing (targets stated, no actuals) — owner: [[Wycliffe Ochieng']] + SRE
- **Medium:** API versioning strategy not documented, OpenAPI/Swagger spec not confirmed, manual NSS Smart Det upload + treasury sweeps, HSM/secrets management not documented, .docx output not generated
- **Low:** Infrastructure-as-code not confirmed, data residency statement missing, code review requirement not referenced

Passes on: platform thinking, API-first design, config-over-customization, Blue/Green deployment, RBAC, audit trail, architecture decisions (RFCs exist).

## Onboarding

7-step process: FI Setup → Acquirer → Issuer → Third Party Category → Third Party → Merchant → Participant Management → Ledger (Maker-Checker) → Fee Management → Validation Test → Go-Live.

## Escalation Paths

- **Ops:** Ops → Oluwadamilola Odugbesan → [[Tolulope Obianwu]] → [[Kevin Ng'Eno]]
- **Tech:** [[Saheed Yusuf]] → [[Oladapo Onayemi]] → [[Wycliffe Ochieng']] → Ravi Veluguleti

## Security

mTLS for REST, TLS+SASL for Kafka, field-level encryption for bank accounts, PAN masking, RBAC.

## Sources

[[TACHA_Architecture_and_Scheduled_Jobs]], [[TACHA_Clearing_Engine_and_Settlement_Logic]], [[TACHA_Operations_Runbook_and_Connected_Banks]], [[TACHA_Phoenix_Alignment_Checklist]], [[TACHA_Reversal_Refund_Dispute_Management]]