---
type:
  - "entity"
title: Project Phoenix
created: 2026-04-11
summary: "Moniepoint's group-wide transformation initiative — platformization of all infrastructure into 6 clusters with AI-native mandate (Eywa); One Platform migration via Strangler Fig pattern targeting Nigeria/UK/Kenya in 6 months; Card Issuance & Processing Platform (Spine-and-Module) formally kicked off Apr 7, 2026."
updated: "2026-04-14T18:24:27Z"
cssclasses:
  - "entity"
---

## Overview

Project Phoenix is [[Moniepoint]]'s group-wide transformation initiative with two goals: (1) **Platformization** — consolidate duplicate builds across group companies into shared platforms consumed as tenants, and (2) **AI-nativeness** — embed AI into every platform and process via [[Eywa]]. Strategic goal: multi-country expansion without code duplication — a new country = a new configuration profile, not a new build.

**This is a group initiative, not a TeamApt initiative** — though [[TeamApt]] had already been building in a platformized, multi-tenant, country-agnostic way before Phoenix was conceived, as a natural consequence of operating switching and processing across multiple entities and international card scheme ecosystems.

## CEO Communications Timeline

- **Feb 13, 2026**: [[Tosin Eniolorunda]] announced Phoenix to all DreamMakers — structural redesign of how Moniepoint builds, operates, and scales
- **Feb 16–20, 2026**: AI-native mandate — all functional managers rebuild workflows using AI (Eywa). Claude access via [[Michael Afolabi]]
- **Mar 24, 2026**: Tosin authored Project_Phoenix_v3 — comprehensive strategic document defining 6 platform clusters, execution governance, extreme reliability (99.99% uptime), talent density standards
- **Mar 27, 2026**: Phase 1 start confirmed — build for Nigeria, UK, Kenya. Full production in **6 months ("sacrosanct")**. [[Ravi Jakhodia]] leads program
- **Apr 14, 2026 (Retreat Day 1, London):** Tosin publicly confirmed Phase 1 TSP launch in progress (account transfers, cards, other services consolidated), core platform + Phoenix design system starting across POS and web. **Phase 2 begins June** — company-wide adoption of new design system + AI-native processes. Phase 3 — beta new app + parallel backend to "strangle" legacy, progressive traffic cutover. Team leads own June scope definitions and transition planning. Kenya launch 2026 confirmed via [[Sumac Microfinance Bank]] acquisition. Moneywalls shifts to business-led platform model (business team operates, central team runs platform). Org split target: one configurable global product + global platform team vs country business entities. See [[source — Retreat Day 1 Profitability Phoenix Kenya Competitive Strategy Summary (Apr 14 2026)]].

## Platform Cluster Architecture (Official — Tosin's Project_Phoenix_v3)

Six clusters, each with distinct domain accountability:

1. **Business Banking Platforms** — Card Acceptance & Processing, Payment Gateway (Monnify+), POS Hardware, Spend Management
2. **Digital Banking Platforms** — Account Payments, Money Management, VAS, Identity/Onboarding/Shell, [[Card Issuance & Processing Platform]], Cross-Border, Rewards
3. **Transaction Switching & Processing ([[TSP]])** — Foundational layer. All card, account, and VAS processing routes through this. Card/Account/VAS Switching & Processing, Integrations
4. **Credit Platforms** — Credit Platform
5. **Customer Platforms** — Mobile/Web/POS Applications, CRM, Design System
6. **Banking Operations Platforms** — CBA, MonieCRM, MonieDesk, Finance Systems, Field Verification, MOOS, [[Loom]], Moniebook

Plus cross-cutting **Design System & UI Frameworks**.

## Ownership Framework

**Principle**: TeamApt owns any platform requiring CBN switching/processing license or serving multiple group companies as shared infrastructure. Individual group companies own product experience layers as tenants.

**TeamApt proposed ownership**: Card/Account/VAS Switching & Processing, Card Issuance & Processing, Card Acceptance & Processing, CBA, Loom, Clearing & Settlement, Tokenisation, Mandate Management, EMV Authentication stack, TSP.

**Core belief statement**: "TeamApt builds switching and processing systems that connect banks, fintechs, and regulators. TeamApt is not limited to building systems for a single bank." Distinguishes TeamApt from being seen as "Moniepoint MFB's technology arm."

## One Platform Migration Strategy (Mar 27, 2026)

Strangler Fig pattern. Led by [[Ravi Jakhodia]]. Total timeline: 6 months.

| Stage | Focus | Duration | Target |
|---|---|---|---|
| Stage 1 | Core Capabilities + Kenya Discovery | Months 1–2 | End of May 2026 |
| Stage 2 | All Platforms + Alpha Launch | Months 3–5 | End of August 2026 |
| Stage 3 | Beta + Commercial Roll-Out | Month 6 | September 2026 |

**Stage 2 imposes ~4-month change freeze** — only must-have exceptions approved by PM Governance Body (Tosin). Day 1 retreat reconfirmation: Phase 2 starts June; pre-June teams must clear regulatory, reliability, innovation priorities; BAU maintained during freeze; OKRs rely on product shipped by June; sales/local GTM drive 2025 680 goal.

Key risks: Design components slip (HIGH), informal freeze workarounds (HIGH), PM artefact format not finalized (MEDIUM).

Stage 1 workstreams (per [[Phoenix Stage 1 Consolidated Project Plan]]): 5 core (CBA, Cosmos, App Shell, Notifications, TSP) + 3 head-starts (Kenya Onboarding Discovery under [[Ope Adeyemi]]+[[Emir Emanetoglu]], Kenya Core Discovery under [[Kaushal Shukla]], Unified UX Framework under [[Astrid Decrop]]).

## Card Issuance & Processing Platform (Phase 1 — Kicked Off)

**Phase 1 kick-off: April 7, 2026** — formally initiated per [[Emeka Awagu]]'s CTO notes. Architecture in active design. Kick-off occurred during a high-operational-stress week (3 concurrent P1s, GoSubscribe war room, Easter weekend incidents).

The platform is designed around a [[Spine and Module Architecture]] — a market-agnostic shared Spine plus independently deployable market-specific Modules.

### Scope
- [[Card Management System]] — card lifecycle engine and program configuration
- [[Authorization Engine]] — real-time approve/decline decisions
- [[3DS/SCA Service]] — cardholder authentication for card-not-present transactions
- [[Card Dispute Service]] — end-to-end dispute lifecycle management
- [[EMV Data Preparation Platform]] — EMV profile management and personalisation vendor data flows

### Delivery Phases
1. **Phase 1** — Nigeria Platform Build: Spine + Nigeria Module (Verve and Visa adapters, personalisation vendor, BIN/config) ← **KICKED OFF APR 7, 2026**
2. **Phase 2** — Nigeria Incremental Cutover: feature-flagged traffic migration with rollback capability
3. **Phase 3** — UK Launch: add UK Module (Visa/Mastercard adapters, PSD2-compliant SCA adapter)
4. **Phase 4** — Kenya Launch: add Kenya Module (Visa adapter, config)
5. **Phase 5** — Additional Markets: same pattern, Spine unchanged

### Team Structure
Two teams under [[Digital Banking Platforms]]:
- [[Team 1 Card Processing]] — owns Authorization Engine, 3DS/SCA, Card Dispute Service
- [[Team 2 Card Issuance]] — owns Card Management System, Card Controls Service, EMV Data Prep

### Success Targets
- Card authorization latency: <500ms
- Auth reversal: <500ms
- Platform API availability: 99.99%
- New market capability delivered via config vs. code: >80%
- Change failure rate: <5%
- Zero money-loss incidents

## TSP Phase 1 Status (as of April 10, 2026)

Per [[TSP Phase 1 Project Plan DRAFT (Apr 10)]] (Frank's business-layer plan) and Alex's April 9 technical delivery plan ratified at TSP Dev Kickoff. Full details in [[TSP]] and [[Transaction Switching Platform]].

- Scope formally agreed: clean transaction switching (auth, clearing, settlement, dispute routing), all 19 transaction types, both NG+GB markets, continuous delivery 12 weeks.
- Team: 2 strike teams (15 people). Team Spine ([[Sulaiman Adeeyo]] EM) + Team Adapters ([[Sunday Ayodele]] EM). [[Alex Adeyemo]] Tech Lead, [[Frank Atashili]] Product Lead, [[Ravi Jakhodia]] Program Lead, [[Ravi Veluguleti]] Card Switching Domain Owner. PM: [[Bunmi Oyefisayo]]. No dedicated MoniePoint engineers (best-effort only — [[Felix Ike]] committed to context-sharing).
- Milestones: M1 First Live Transaction wk 3 (Apr 24) PAY_OUT NG via NIP; M2 Two Markets Six Products wk 6 (May 15); M3 Full Catalogue & Ops-Ready wk 9 (Jun 5) all 19 types; M4 Cutover Begun wk 12 (Jun 26).
- Foundation already built: 15-module Maven monorepo, 9-part LLD (21k+ lines), workflow engine, state machine, ISO 8583 stack (PostBridge/TwoBridge/IPM/Netty/HSM), 6 step executors, 493 passing tests (85% line/80% branch).
- Integration landscape: 23+ external integrations across 6 protocols — NG (9 rails), GB (7 rails), global+core (7: CBA, Treasury/FX, Loom gRPC, Visa, Mastercard, HSM, scheme clearing files).
- Integration Problems (from Mar 30 Frank–Ravi sync): #1 People (blocked on architecture), #2 Tools (Ravi, deferred), #3+4 Architecture+Overlapping Systems RESOLVED Apr 7. See [[Ravi J Expectations and Prep (Apr 7)]] for Frank's explicit/implicit deliverables and 7-day prep.
- Leadership presentation: Monday April 14 afternoon (Tosin + Felix).

## MFB Systems Blindspot

[[Moniepoint MFB]] operates parallel card infrastructure NOT in any Phoenix platform spec: Postilion/PostCard (ACI/Interswitch), Smart Card Process, Safe Token, [[CMS Manager]] (~12-person team), Aptent (authorization routing). Beyond cards: [[Iris]] (group reconciliation, 15–27B+ txn/month — recommended: Absorb), [[Atlas]] (transfer orchestration, ~500M txn/month, 12+ downstream providers — recommended: Evaluate). Critical dependency: TeamApt's Monnify uses Iris and Atlas rather than TACHA and Juliana — cross-entity entanglement Phoenix was created to eliminate. Both sit in [[Damilare Ogunnaike]]'s Monnify org.

## Eywa (AI Layer)

Organizational nervous system — connects every function's context and AI skills. Currently powered by Claude, model-agnostic. Artifact hierarchy: Platform → Team → Capability → Feature → User Story → Acceptance Criteria. Country/entity agnostic by design.

## Talent Density

Phoenix described as "calibration moment." Primary dimensions tested: Customer Obsession, Craft. Threshold dimensions (non-negotiable): No Ego, Candor, Integrity. "We will watch carefully, and we will act on what we see." — Tosin

## Accountability Standards

99.99% minimum uptime for all core platforms, defined P99 latency targets, zero tolerance for unowned incidents, expanded automated test coverage, transparent reliability metrics.

## Active Tensions

- **Extend vs. rebuild**: [[Frank Atashili]]'s original framing ("extend and formalize, not rebuild") vs. [[Alex Adeyemo]]'s endorsed position (TSP as new build from scratch — composable FinOps platform)
- **MFB migration risk**: Phoenix platforms could launch alongside rather than replacing existing MFB systems, creating more duplication
- **Timeline ambition**: 6-month "sacrosanct" deadline vs. scope of transformation. [[source — One Platform Migration Plan Analysis]] flags risks in Ravi's plan
- **Resources vs. mandate**: No dedicated MoniePoint engineers on TSP despite initial commitments from Tosin and Felix. Ravi J advocates through structure (OKRs, formal sign-offs) rather than direct resource confrontation — "safer route" per Frank/Alex private read

## Sources

- [[Project Phoenix Initiative (compiled March 2026)]] — Frank's comprehensive planning document (Apr 10 version)
- [[Phoenix Stage 1 Consolidated Project Plan]] — Ravi J's mastersheet companion (Apr 10)
- [[TSP Phase 1 Project Plan DRAFT (Apr 10)]] — Frank's business-layer plan aligned to Alex's 4-phase technical delivery
- [[Ravi J Expectations and Prep (Apr 7)]] — Frank's deliverable consolidation after Apr 7 meetings
- [[source — Project Phoenix Initiative]] — earlier comprehensive planning document
- [[source — Platform Strategy and Vision]] — "One Platform Many Markets" vision, technical architecture rules, governance
- [[source — Org Structure Changes — Project Phoenix]] — platform-centric transition
- [[source — TSP Executive Briefing Analysis]] — TSP gaps and blindspots
- [[source — MFB Systems Blindspot Analysis]] — parallel infrastructure risk
- [[source — One Platform Migration Plan Analysis]] — Ravi's Strangler Fig plan risks
- [[001-CI_P-exec-overview_v1.1]] — CI&P executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] — CI&P team structure
- [[Source: notes-2026-04-07]] — Phase 1 kick-off signal
- [[Source: notes-2026-04-08]] — architecture in progress
- [[source — Retreat Day 1 Profitability Phoenix Kenya Competitive Strategy Summary (Apr 14 2026)]] — Tosin's public Day 1 confirmation of Phase 2 June start, Kenya launch via Sumac, Moneywalls business-led platform model, org split post-platformization
- [[source — Retreat Day 1 Management Framework Loan Portfolio Risk Summary (Apr 14 2026)]] — Tosin's 7-principle management framework (cascade goals → structure → people → incentives → context → systems → governance)