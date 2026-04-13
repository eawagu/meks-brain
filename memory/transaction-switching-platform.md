---
title: Transaction Switching Platform
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-13T12:07:01Z"
updated: "2026-04-13T12:07:01Z"
summary: "The Transaction Switching Platform (TSP) is Moniepoint's foundational payment processing kernel — a market-agnostic Layer 1 switch handling all fund movement (19 transaction types) via a Spine + Module architecture, being built under Project Phoenix as the organization's core system."
---

## What It Is

The Transaction Switching Platform (TSP) is [[Moniepoint]]'s foundational Layer 1 payment processing kernel. It is the single conduit for all fund movement across the platform — holds, reversals, clearing, settlement, dispute credits. Every product that touches money routes through TSP.

It is distinct from the [[TSP]] entity page (which documents TSP's role in card authorization specifically). This concept page covers TSP as a platform: its architecture, scope, delivery, and strategic position.

## Architecture

### Spine + Module

TSP uses the same market-agnostic Spine + Module architecture as the [[Card Issuance & Processing Platform]]:
- **Spine** — shared core: orchestrator, 12–15 executors, reconciliation, 3DS (ACS/DS/MPI), settlement & clearing, dispute resolution
- **Modules** — country-specific adapters deployed independently per market
  - Nigeria adapter: 9 integrations
  - UK adapter: 6 integrations
  - Direct scheme connections: Visa, Mastercard

### Transaction Types

19 transaction types (expanded from 16 in the February 2026 v1 briefing), covering ASYNC and SYNC flows — CARD_AUTHORIZATION, AUTH_REVERSAL, PAY_OUT, and others across card/account/wallet token types and push/pull transaction directions.

### Deployment Tiers

Three deployment tiers, designed from day one but shipped in sequence:
1. **Cloud Platform** — Moniepoint's own ops (Tier 1, shipping first)
2. **Central Switch** — regional, geographically compliant (Tier 2)
3. **Front-End Processor** — on-premises at bank (Tier 3)

### Codebase

14-module Maven monorepo. One codebase with country-specific instances. PostBridge used internally; Juliana stays fronting banks.

### Shared Dependencies

Six shared platform dependencies: CBA, Cosmos, Loom, Treasury/FX, Notifi, and one additional (per v1 briefing).

## Unified Platform Strategy

TSP is a unified switch for all token types (card, account, wallet) and all transaction directions (push/pull), with country-specific adapters. This is a deliberate "one platform" strategy — not separate switches per product. AptPay's five products are being migrated into TSP under [[Project Phoenix]].

Mapping: Account/Card Switching, VAS Processing, Settlement & Clearing, Dispute Resolution, Tokenisation (ownership TBD).

## Delivery

### Phase 1 Scope (PAY_OUT)

Send money to bank account: 16 feature areas, 44 user stories, 40+ market config parameters. 8-week timeline: weeks 1–2 ramping, 3–6 parallel execution, 7–8 first corridor live. Foundations complete: Adapter Health Aggregator, Check Limits Executor.

TSP Phase 1 (Stage 1) target: end of May 2026. Full six-month deadline: end of September 2026 (declared sacrosanct by Tosin).

### Migration Strategy

Strangler fig / shadow mode. Shadow mode gate: 14-day window with 0% discrepancy required before traffic cut-over. Legacy teams stay operational during migration — no code freeze.

## Strike Team

Small SEAL team model. 65 total headcount (2 leadership + 3 PMs + 5 APMs + 4 EMs + 48 engineers/SRE). Tier 1 engineers: Yusuf (#1), Christopher Ogbosuka, Abeeb Ahmad, Daniel O. Geographic spread: Nigeria (55), India (2), Kenya (2), UK (1), others.

Selection method: data-driven via GitLab/Jira analytics.

## Strategic Position

TSP is the "circulatory system" of Moniepoint's platform (Frank Atashili's framing from the April 7, 2026 kick-off). It is the highest-priority engineering initiative in the organization as of Q2 2026, consuming the best engineers and receiving direct executive mandate from Tosin (Group CEO).

The [[Card Issuance & Processing Platform]] (Layer 2) delegates all fund movement to TSP — never posts directly to [[CBA]]. This is a hard architectural boundary.

## Key People

- [[Frank Atashili]] — platform lead, architecture owner
- Alex — architecture lead (assumed [[Alex Adeyemo]])
- Bunmi — PM
- [[Ravi Veluguleti]] — gave Frank/Alex Monday deadline on 4 issues (people transition, tools/access, architecture, overlapping systems)

## Sources

- [[TSP Executive Briefing v1]] — Feb 27, 2026; Layer 1 kernel, 16 tx types, 6-phase migration
- [[TSP Executive Briefing v2]] — March 2026; 19 tx types, 14-module monorepo, dual-country adapters
- [[TSP Executive Roadmap Idris]] — AptPay migration roadmap, 5 products → 6 capabilities
- [[TSP Strategy Session 2026-04-01]] — unified platform confirmed, strike team
- [[TSP Strategy Meeting Frank Alex 2026-04-01]] — architecture, team selection, 3-month minimum
- [[TSP Strike Team Staffing Meeting 2026-04-01]] — SEAL team model, no code freeze
- [[TSP Phase 1 Scope Prep Romulo 2026-04-07]] — PAY_OUT scope, 44 user stories, 8-week timeline
- [[TSP Deployment Architecture Position]] — three-tier deployment strategy
- [[TSP vs TeamApt Switch Analysis]] — Layer 1 vs Layer 2 positioning
- [[Project Phoenix Phase 1 Kick-off 2026-04-07]] — TSP as org core, AI-driven workflows
- [[Project Phoenix Actions]] — 21 open actions, Sept 2026 deadline