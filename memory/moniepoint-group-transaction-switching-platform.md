---
title: Moniepoint Group Transaction Switching Platform
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T15:52:39Z"
updated: "2026-04-19T15:52:39Z"
summary: "The Transaction Switching Platform (TSP) is Moniepoint Inc.'s foundational payment processing kernel — a market-agnostic Layer 1 switch handling all fund movement (19 transaction types) via a Spine + Module architecture, being built under Project Phoenix as the organization's core system."
---

## What It Is

The Moniepoint Group Transaction Switching Platform (TSP) is [[Moniepoint|Moniepoint Inc.]]'s foundational Layer 1 payment processing kernel. It is the single conduit for all fund movement across the platform — holds, reversals, clearing, settlement, dispute credits. Every product that touches money routes through TSP.

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

## Orchestrator vs Switch: The Architectural Distinction

The [[source — Phoenix Gap Analysis Complete|gap analysis]] identifies a critical architectural distinction:

**TSP as currently designed is a payment orchestrator** — it manages payment lifecycle (state machine, fee calculation, posting construction, routing) within a controlled ecosystem. This is correct and needed.

**But TSP also needs a transaction switching layer** — real-time inter-institutional message routing between independent financial institutions, with:
- ISO 8583 message handling (parsing, construction, format translation)
- Sub-500ms authorization (scheme-mandated latency)
- HSM integration (PIN translation, MAC generation, PAN tokenization)
- Direct scheme connectivity (persistent TCP, network management messages, scheme certification)
- Stand-in processing (local approval when issuer/scheme unavailable)
- Hot lists (sub-millisecond lookup in authorization path)
- BIN table routing (tenant → country → global hierarchy)

**Phoenix has the orchestrator but is missing the switch.** The TeamApt Transaction Switch specification describes this missing layer. Both capabilities are needed — the orchestrator for payment lifecycle management AND the switch for real-time inter-institutional routing.

Key capabilities already built for the switching layer: ISO 8583 switching (jPOS 3.0 + Netty 4.2), direct Visa & Mastercard scheme connections, HSM integration, 21-step workflow engine, config-driven Fee Engine (replacing 5 legacy libraries), 493 passing tests across 14 modules.

## Unified Platform Strategy

TSP is a unified switch for all token types (card, account, wallet) and all transaction directions (push/pull), with country-specific adapters. This is a deliberate "one platform" strategy — not separate switches per product. AptPay's five products are being migrated into TSP under [[Project Phoenix]].

### Products Becoming Platform Capabilities

| Current Product | TSP Capability | Status |
|---|---|---|
| Juliana (Account) | Account Switching & Processing | Strategy paper complete; C4 current |
| Juliana (Card) | Card Switching & Processing | ~42-50% POS market share — highest risk asset |
| AptPay ATS | Integrations (Country-Agnostic) | Adapter model defined, not built |
| VAS (bill pay, airtime) | VAS Switching & Processing | 44 provider integrations moving to TSP |
| AptPay Direct Debit | **Decision Required** | Placement unresolved — blocks team formation |
| [[TACHA]] / Juliana Backoffice | Settlement & Clearing | In production — needs formal governance |
| Dispute logic (fragmented) | Centralized Dispute Resolution (Proposed) | Being workshopped |

### Platform Modernisation Sequence (Proposed)

1. **Account Switching & Processing** — PoC transition; lessons de-risk all others. Blind spot: dual switch (Juliana vs [[Atlas]])
2. **Centralized Clearing & Settlement (TACHA)** — cross-cutting foundation; must have formal ownership, API contracts, SLOs first
3. **Centralized Dispute Resolution** — consolidate fragmented logic across Juliana, TPP, AptPay Suite
4. **Card Switching & Processing** — highest commercial risk (~42-50% POS share), sequenced after playbook proven
5. **Direct Debit** — last among core, allows tokenisation conflict resolution
6. **Remaining** (Integrations/ATS, VAS Switching) — based on dependency mapping

## Critical Open Risks

| Risk | Status |
|---|---|
| Direct Debit placement unresolved | CRITICAL — blocks team formation and Git hierarchy |
| TACS unrecognised as cross-cutting auth service | CRITICAL — auth logic will fragment |
| Three-way tokenisation conflict (ATS, DD Issuer Module, Card Switch) | CRITICAL |
| External tenant model absent — all callers internal | CRITICAL — B2B switching business architecturally homeless |
| Card fee ownership (TSP Fee Engine or FEP?) | PENDING — blocks Card Phase 4 |
| Juliana "~60% of ATS" claim unspecified | HIGH — account switch routing capability may be uncovered |
| Sub-platform senior roles all TBH | HIGH — Layer 1 program unstaffed |
| PTSP running parallel transition without TSP coordination | CRITICAL |

## Team Impact Assessment

**HIGH Impact teams** (fundamental scope change — from owning full flow to being "callers"):
- **Account Payments** — 5 of 19 types; PAY_OUT is Phase 1 critical path
- **Card Issuance** — 6 of 19 types; TSP takes card switching layer
- **VAS Platform** — 44 provider integrations moving to TSP

**MEDIUM Impact** (complementary scope, well-defined boundaries):
- Cross-Border Payments, Card Acceptance, Payment Gateway ([[Monnify]])

## Delivery

### Phase 1 Scope (PAY_OUT)

Send money to bank account: 16 feature areas, 44 user stories, 40+ market config parameters. 8-week timeline: weeks 1–2 ramping, 3–6 parallel execution, 7–8 first corridor live. Foundations complete: Adapter Health Aggregator, Check Limits Executor.

TSP Phase 1 (Stage 1) target: end of May 2026. Full six-month deadline: end of September 2026 (declared sacrosanct by Tosin).

### Migration Strategy

Strangler fig / shadow mode. Shadow mode gate: 14-day window with 0% discrepancy required before traffic cut-over. Legacy teams stay operational during migration — no code freeze.

## Strike Team

Small SEAL team model. 65 total headcount (2 leadership + 3 PMs + 5 APMs + 4 EMs + 48 engineers/SRE). Tier 1 engineers: Yusuf (#1), Christopher Ogbosuka, Abeeb Ahmad, Daniel O. Geographic spread: Nigeria (55), India (2), Kenya (2), UK (1), others.

Selection method: data-driven via GitLab/Jira analytics.

### Team Realignment Into TSP

| Current Team | PM | Target TSP Capability |
|---|---|---|
| Switching Solutions | [[Kevin Ng'Eno]] | Card/Account Switching & Processing |
| AptPay Suite | [[Abdulgafar Obeitor]] | Integrations / Settlement & Clearing |
| Switch Engineering | [[Oluwabunmi Oyefisayo]] | Core switch platform engineering |
| CDD | [[Abiodun Famoye]] | Direct Debit (within TSP) |
| PMO | [[Idris Aliyu]] | TSP-wide product operations |

## Strategic Position

TSP is the "circulatory system" of [[Moniepoint|Moniepoint Inc.]]'s platform (Frank Atashili's framing from the April 7, 2026 kick-off). It is the highest-priority engineering initiative in the organization as of Q2 2026, consuming the best engineers and receiving direct executive mandate from Tosin (Group CEO).

The [[Card Issuance & Processing Platform]] (Layer 2) delegates all fund movement to TSP — never posts directly to [[CBA]]. This is a hard architectural boundary.

### Non-Negotiable Constraint

[[Juliana]] Card Switch holds ~42–50% of Nigeria's POS (agent/merchant) market. Zero disruption during transition — parallel-run validation, SRE sign-off, maintained scheme certifications, same-day settlement commitments.

## Key People

- [[Frank Atashili]] — platform lead, architecture owner
- Alex — architecture lead (assumed [[Alex Adeyemo]])
- Bunmi — PM
- [[Ravi Veluguleti]] — gave Frank/Alex Monday deadline on 4 issues (people transition, tools/access, architecture, overlapping systems)

## Sources

- [[source — Phoenix Gap Analysis Complete]] — switching vs orchestration distinction, capability gaps, business line impact
- [[source — Project Phoenix PM Briefing Deck]] — team impact, modernisation sequence, critical risks, team realignment
- [[source — Project Phoenix Initiative]] — comprehensive Phoenix planning document
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

## Notes

- Renamed 2026-04-19 from [[Transaction Switching Platform]] per Rule 1/Rule 2.