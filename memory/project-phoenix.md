---
type:
  - "entity"
title: Project Phoenix
created: 2026-04-11
summary: "Moniepoint's group-wide transformation initiative \u2014 platformization + AI-nativeness; central Platform Organization (Moniepoint Technologies UK / IPCo) serves all OpCos as tenants; TSP is Phase 1 because other platforms depend on it (peer product line, not umbrella); One Platform migration via Strangler Fig targeting Nigeria/UK/Kenya in 6 months; CI&P Phase 1 kicked off Apr 7, 2026; MFB Cards takeover under Strike Team + Continuity model (Apr 14)."
updated: "2026-04-23T05:42:49Z"
cssclasses:
  - "entity"
---

## Overview

Project Phoenix is [[Moniepoint]]'s group-wide transformation initiative with two goals: (1) **Platformization** \u2014 consolidate duplicate builds across group companies into shared platforms consumed as tenants, and (2) **AI-nativeness** \u2014 embed AI into every platform and process via [[Eywa]]. Strategic goal: multi-country expansion without code duplication \u2014 a new country = a new configuration profile, not a new build.

**This is a group initiative, not a TeamApt initiative.** The [[Platform Organization]] sits centrally at the group level (legal home: [[Moniepoint Technologies UK]] / IPCo) and serves all business entities (OpCos \u2014 [[Moniepoint MFB]], [[TeamApt]], [[MonieWorld]], [[Sumac MFB]], future countries) as tenants.

TeamApt had already been building in a platformized, multi-tenant, country-agnostic way before Phoenix was conceived, as a natural consequence of operating switching and processing across multiple entities and international card scheme ecosystems \u2014 so TeamApt's pre-Phoenix architecture is a **head-start contributing to the central platform**, not a precondition that Phoenix simply formalises TeamApt ownership of.

## CEO Communications Timeline

- **Feb 13, 2026**: [[Tosin Eniolorunda]] announced Phoenix to all DreamMakers \u2014 structural redesign of how Moniepoint builds, operates, and scales
- **Feb 16\u201320, 2026**: AI-native mandate \u2014 all functional managers rebuild workflows using AI (Eywa). Claude access via [[Michael Afolabi]]
- **Mar 24, 2026**: Tosin authored Project_Phoenix_v3 \u2014 comprehensive strategic document defining 6 platform clusters, execution governance, extreme reliability (99.99% uptime), talent density standards
- **Mar 27, 2026**: Phase 1 start confirmed \u2014 build for Nigeria, UK, Kenya. Full production in **6 months (\"sacrosanct\")**. [[Ravi Jakhodia]] leads program
- **Apr 14, 2026 (Retreat Day 1, London):** Tosin publicly confirmed Phase 1 TSP launch in progress (account transfers, cards, other services consolidated), core platform + Phoenix design system starting across POS and web. **Phase 2 begins June** \u2014 company-wide adoption of new design system + AI-native processes. Phase 3 \u2014 beta new app + parallel backend to \"strangle\" legacy, progressive traffic cutover. Team leads own June scope definitions and transition planning. Kenya launch 2026 confirmed via [[Sumac Microfinance Bank]] acquisition. Moneywalls shifts to business-led platform model (business team operates, central team runs platform). Org split target: one configurable global product + global platform team vs country business entities. See [[source \u2014 Retreat Day 1 Profitability Phoenix Kenya Competitive Strategy Summary (Apr 14 2026)]].

## Platform Cluster Architecture (Official \u2014 Tosin's Project_Phoenix_v3)

The Platform Organization is structured into three operating divisions plus cross-cutting CoEs/departments, per the March 2026 Platforms Conference deck ([[source \u2014 Project Phoenix Org Structure Changes (March 2026)]]):

### Business Banking Platforms
- [[TSP|Transaction Switching & Processing]] \u2014 foundational payment kernel; sub-platforms: Card Switching, Account Switching, VAS Switching, Integrations. **TSP is in Phase 1 because most other platforms depend on it, not because it's an umbrella that absorbs them.** Other platforms are peers, not children of TSP.
- Card Acceptance & Processing
- Payment Gateway (Monnify+)
- POS Hardware & Devices
- [[Card Issuance & Processing Platform]] (within Digital Banking Platforms triad, positioned at this layer of the stack)
- Cross-Border Payments

### Digital Banking Platforms
- Customer Platforms (Mobile App, Web App, POS App, CRM/Product Instrumentation, Design System)
- Banking Operations Platforms (Spend Mgmt, VAS, Savings, Identity/Onboarding/Shell, Rewards)

### Credit Platforms
- Credit Platform (nodes TBD)

### Cross-cutting CoEs / Departments
- Banking & Ledger Platform (CBA)
- Sales Mgmt Tools (MonieCRM)
- Customer Support Platform (MonieDesk)
- Finance Systems
- Field Verification Platform
- Financial Crime Prevention ([[Loom]])
- MOOS
- Business Management Platform (Moniebook)

Plus cross-cutting **Design System & UI Frameworks**.

## Tenant Model

All platforms sit centrally and serve OpCos as tenants:
- [[Moniepoint MFB]] (Nigeria)
- [[TeamApt]] (Nigeria)
- [[MonieWorld]] (UK, fka Moniepoint GB)
- [[Sumac MFB]] (Kenya)
- Future markets

Each platform node is led by a triad: Product Leader + Engineering Leader + Design Leader. Example for CI&P: [[Tracy Ojaigho]] (Head of Digital Banking Platforms / Product), [[Emeka Awagu]] (Head of CI&P Engineering), Design Lead TBD.

## One Platform Migration Strategy (Mar 27, 2026)

Strangler Fig pattern. Led by [[Ravi Jakhodia]]. Total timeline: 6 months.

| Stage | Focus | Duration | Target |
|---|---|---|---|
| Stage 1 | Core Capabilities + Kenya Discovery | Months 1\u20132 | End of May 2026 |
| Stage 2 | All Platforms + Alpha Launch | Months 3\u20135 | End of August 2026 |
| Stage 3 | Beta + Commercial Roll-Out | Month 6 | September 2026 |

**Stage 2 imposes ~4-month change freeze** \u2014 only must-have exceptions approved by PM Governance Body (Tosin). Day 1 retreat reconfirmation: Phase 2 starts June; pre-June teams must clear regulatory, reliability, innovation priorities; BAU maintained during freeze; OKRs rely on product shipped by June; sales/local GTM drive 2025 680 goal.

Key risks: Design components slip (HIGH), informal freeze workarounds (HIGH), PM artefact format not finalized (MEDIUM).

Stage 1 workstreams (per [[Phoenix Stage 1 Consolidated Project Plan]]): 5 core (CBA, Cosmos, App Shell, Notifications, TSP) + 3 head-starts (Kenya Onboarding Discovery under [[Ope Adeyemi]]+[[Emir Emanetoglu]], Kenya Core Discovery under [[Kaushal Shukla]], Unified UX Framework under [[Astrid Decrop]]).

## Card Issuance & Processing Platform (Phase 1 \u2014 Kicked Off)

**Phase 1 kick-off: April 7, 2026** \u2014 formally initiated per [[Emeka Awagu]]'s CTO notes. Architecture in active design. Kick-off occurred during a high-operational-stress week (3 concurrent P1s, GoSubscribe war room, Easter weekend incidents).

The platform is designed around a [[Spine and Module Architecture]] \u2014 a market-agnostic shared Spine plus independently deployable market-specific Modules. It is the **first fully-specified Phoenix platform and the proof point for the whole Spine-and-Module pattern**.

### Scope
- [[Card Management System]] \u2014 card lifecycle engine and program configuration (replaces [[Moniepoint MFB]]'s legacy [[Card Manager Service]])
- [[Authorization Engine]] \u2014 real-time approve/decline decisions
- [[3DS/SCA Service]] \u2014 cardholder authentication for card-not-present transactions
- [[Card Dispute Service]] \u2014 end-to-end dispute lifecycle management
- [[EMV Data Preparation Platform]] \u2014 EMV profile management and personalisation vendor data flows

### Delivery Phases
1. **Phase 1** \u2014 Nigeria Platform Build: Spine + Nigeria Module (Verve and Visa adapters, personalisation vendor, BIN/config) \u2190 **KICKED OFF APR 7, 2026**
2. **Phase 2** \u2014 Nigeria Incremental Cutover: feature-flagged traffic migration with rollback capability
3. **Phase 3** \u2014 UK Launch: add UK Module (Visa/Mastercard adapters, PSD2-compliant SCA adapter)
4. **Phase 4** \u2014 Kenya Launch: add Kenya Module (Visa adapter, config)
5. **Phase 5** \u2014 Additional Markets: same pattern, Spine unchanged

### Team Structure

Two platform engineering teams under [[Digital Banking Platforms]]:
- [[Team 1 Card Processing]] \u2014 owns Authorization Engine, 3DS/SCA, Card Dispute Service
- [[Team 2 Card Issuance]] \u2014 owns Card Management System, Card Controls Service, EMV Data Prep

Under the [[Strike Team + Continuity Operating Model]] (2026-04-14), platform leadership ([[Tracy Ojaigho]] + [[Emeka Awagu]]) formally took operational ownership of the existing [[MFB Cards Team]]. Existing engineers continue maintaining the legacy stack (continuity); a strike team builds the new CMS.

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
- Team: 2 strike teams (15 people). Team Spine ([[Sulaiman Adeeyo]] EM) + Team Adapters ([[Sunday Ayodele]] EM). [[Alex Adeyemo]] Tech Lead, [[Frank Atashili]] Product Lead, [[Ravi Jakhodia]] Program Lead, [[Ravi Veluguleti]] Card Switching Domain Owner. PM: [[Bunmi Oyefisayo]]. No dedicated MoniePoint engineers (best-effort only \u2014 [[Felix Ike]] committed to context-sharing).
- Milestones: M1 First Live Transaction wk 3 (Apr 24) PAY_OUT NG via NIP; M2 Two Markets Six Products wk 6 (May 15); M3 Full Catalogue & Ops-Ready wk 9 (Jun 5) all 19 types; M4 Cutover Begun wk 12 (Jun 26).
- Foundation already built: 15-module Maven monorepo, 9-part LLD (21k+ lines), workflow engine, state machine, ISO 8583 stack (PostBridge/TwoBridge/IPM/Netty/HSM), 6 step executors, 493 passing tests (85% line/80% branch).
- Integration landscape: 23+ external integrations across 6 protocols \u2014 NG (9 rails), GB (7 rails), global+core (7: CBA, Treasury/FX, Loom gRPC, Visa, Mastercard, HSM, scheme clearing files).
- Integration Problems (from Mar 30 Frank\u2013Ravi sync): #1 People (blocked on architecture), #2 Tools (Ravi, deferred), #3+4 Architecture+Overlapping Systems RESOLVED Apr 7. See [[Ravi J Expectations and Prep (Apr 7)]] for Frank's explicit/implicit deliverables and 7-day prep.
- Leadership presentation: Monday April 14 afternoon (Tosin + Felix).

## MFB Systems Blindspot

[[Moniepoint MFB]] operates parallel card infrastructure that needs to be mapped onto the central platform: [[Postillion]]/PostCard (ACI/Interswitch), Smart Card Process, Safe Token, [[Card Manager Service|CMS Manager]] (~12-person team under Femi Davies), Aptent (authorization routing). Beyond cards: [[Iris]] (group reconciliation, 15\u201327B+ txn/month \u2014 recommended: Absorb), [[Atlas]] (transfer orchestration, ~500M txn/month, 12+ downstream providers \u2014 recommended: Evaluate). Critical cross-entity dependency: TeamApt's Monnify uses Iris and Atlas rather than TACHA and Juliana \u2014 the very cross-entity entanglement Phoenix was created to eliminate. Both sit in [[Damilare Ogunnaike]]'s Monnify org.

The CI&P takeover of MFB Cards (Apr 14 2026) is the first operational resolution of this blindspot for the card stack. See [[Source \u2014 Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] for the full MFB cards inventory feeding the platform build.

## Eywa (AI Layer)

Organizational nervous system \u2014 connects every function's context and AI skills. Currently powered by Claude, model-agnostic. Artifact hierarchy: Platform \u2192 Team \u2192 Capability \u2192 Feature \u2192 User Story \u2192 Acceptance Criteria. Country/entity agnostic by design.

Operational application of AI-nativeness inside CI&P: see [[AI-Native Operations]]. Priorities agreed 2026-04-21: Chargeback & Issue Resolution (highest), Logistics & Production, then general workflow automation (Jira \u2192 AI ticketing, tool evaluation led by [[Rumulo]]).

## Talent Density

Phoenix described as \"calibration moment.\" Primary dimensions tested: Customer Obsession, Craft. Threshold dimensions (non-negotiable): No Ego, Candor, Integrity. \"We will watch carefully, and we will act on what we see.\" \u2014 Tosin

## Accountability Standards

99.99% minimum uptime for all core platforms, defined P99 latency targets, zero tolerance for unowned incidents, expanded automated test coverage, transparent reliability metrics.

## Active Tensions

- **Extend vs. rebuild**: [[Frank Atashili]]'s original framing (\"extend and formalize, not rebuild\") vs. [[Alex Adeyemo]]'s endorsed position (TSP as new build from scratch \u2014 composable FinOps platform)
- **MFB migration risk**: Phoenix platforms could launch alongside rather than replacing existing MFB systems, creating more duplication. The CI&P takeover of MFB Cards directly addresses this risk for the card stack; Monnify \u2192 Iris/Atlas dependency remains unresolved.
- **Timeline ambition**: 6-month \"sacrosanct\" deadline vs. scope of transformation. [[source \u2014 One Platform Migration Plan Analysis]] flags risks in Ravi's plan
- **Resources vs. mandate**: No dedicated MoniePoint engineers on TSP despite initial commitments from Tosin and Felix. Ravi J advocates through structure (OKRs, formal sign-offs) rather than direct resource confrontation \u2014 \"safer route\" per Frank/Alex private read

## Sources

- [[Project Phoenix Initiative (compiled March 2026)]] \u2014 Frank's comprehensive planning document (Apr 10 version)
- [[Phoenix Stage 1 Consolidated Project Plan]] \u2014 Ravi J's mastersheet companion (Apr 10)
- [[TSP Phase 1 Project Plan DRAFT (Apr 10)]] \u2014 Frank's business-layer plan aligned to Alex's 4-phase technical delivery
- [[Ravi J Expectations and Prep (Apr 7)]] \u2014 Frank's deliverable consolidation after Apr 7 meetings
- [[source \u2014 Project Phoenix Initiative]] \u2014 earlier comprehensive planning document
- [[source \u2014 Platform Strategy and Vision]] \u2014 \"One Platform Many Markets\" vision, technical architecture rules, governance
- [[source \u2014 Project Phoenix Org Structure Changes (March 2026)]] \u2014 authoritative group org structure (OpCo / IPCo / DevCo, org trees)
- [[source \u2014 Org Structure Changes \u2014 Project Phoenix]] \u2014 platform-centric transition
- [[source \u2014 TSP Executive Briefing Analysis]] \u2014 TSP gaps and blindspots
- [[source \u2014 MFB Systems Blindspot Analysis]] \u2014 parallel infrastructure risk
- [[source \u2014 One Platform Migration Plan Analysis]] \u2014 Ravi's Strangler Fig plan risks
- [[001-CI_P-exec-overview_v1.1]] \u2014 CI&P executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] \u2014 CI&P team structure
- [[Source: notes-2026-04-07]] \u2014 Phase 1 kick-off signal
- [[Source: notes-2026-04-08]] \u2014 architecture in progress
- [[source \u2014 Retreat Day 1 Profitability Phoenix Kenya Competitive Strategy Summary (Apr 14 2026)]] \u2014 Tosin's public Day 1 confirmation of Phase 2 June start, Kenya launch via Sumac, Moneywalls business-led platform model, org split post-platformization
- [[source \u2014 Retreat Day 1 Management Framework Loan Portfolio Risk Summary (Apr 14 2026)]] \u2014 Tosin's 7-principle management framework (cascade goals \u2192 structure \u2192 people \u2192 incentives \u2192 context \u2192 systems \u2192 governance)
- [[Source \u2014 Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] \u2014 first full inventory of the MFB cards stack feeding the CI&P build; strike-team formation + new CMS plan