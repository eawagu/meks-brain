---
type:
  - "entity"
title: Project Phoenix
created: 2026-04-11
summary: "Moniepoint's group-wide transformation initiative — platformization + AI-nativeness; central Platform Organization (Moniepoint Technologies UK / IPCo) serves all OpCos as tenants; TSP is Phase 1 because other platforms depend on it; One Platform migration via Strangler Fig targeting Nigeria/UK/Kenya in 6 months; CI&P Phase 1 broader kick-off Apr 7, 2026; CI&P-team-specific kick-off Apr 27, 2026 (hosted by Tracy Ojaigho)."
updated: "2026-04-28T16:49:51Z"
cssclasses:
  - "entity"
---

## Overview

Project Phoenix is [[Moniepoint]]'s group-wide transformation initiative with two goals: (1) **Platformization** — consolidate duplicate builds across group companies into shared platforms consumed as tenants, and (2) **AI-nativeness** — embed AI into every platform and process via [[Eywa]]. Strategic goal: multi-country expansion without code duplication — a new country = a new configuration profile, not a new build.

**This is a group initiative, not a TeamApt initiative.** The [[Platform Organization]] sits centrally at the group level (legal home: [[Moniepoint Technologies UK]] / IPCo) and serves all business entities (OpCos — [[Moniepoint MFB]], [[TeamApt]], [[MonieWorld]], [[Sumac MFB]], future countries) as tenants.

TeamApt had already been building in a platformized, multi-tenant, country-agnostic way before Phoenix was conceived, as a natural consequence of operating switching and processing across multiple entities and international card scheme ecosystems — so TeamApt's pre-Phoenix architecture is a **head-start contributing to the central platform**, not a precondition that Phoenix simply formalises TeamApt ownership of.

## CEO Communications Timeline

- **Feb 13, 2026**: [[Tosin Eniolorunda]] announced Phoenix to all DreamMakers — structural redesign of how Moniepoint builds, operates, and scales
- **Feb 16–20, 2026**: AI-native mandate — all functional managers rebuild workflows using AI (Eywa). Claude access via [[Michael Afolabi]]
- **Mar 24, 2026**: Tosin authored Project_Phoenix_v3 — comprehensive strategic document defining 6 platform clusters, execution governance, extreme reliability (99.99% uptime), talent density standards
- **Mar 27, 2026**: Phase 1 start confirmed — build for Nigeria, UK, Kenya. Full production in **6 months ("sacrosanct")**. [[Ravi Jakhodia]] leads program
- **Apr 14, 2026 (Retreat Day 1, London):** Tosin publicly confirmed Phase 1 TSP launch in progress (account transfers, cards, other services consolidated), core platform + Phoenix design system starting across POS and web. **Phase 2 begins June** — company-wide adoption of new design system + AI-native processes. Phase 3 — beta new app + parallel backend to "strangle" legacy, progressive traffic cutover. Team leads own June scope definitions and transition planning. Kenya launch 2026 confirmed via [[Sumac Microfinance Bank]] acquisition. Moneywalls shifts to business-led platform model (business team operates, central team runs platform). Org split target: one configurable global product + global platform team vs country business entities. See [[source — Retreat Day 1 Profitability Phoenix Kenya Competitive Strategy Summary (Apr 14 2026)]].
- **Apr 22, 2026**: [[Frank Atashili]] issued [[TeamApt-Platformization-Org-Movements (1)|Org Movements brief]] to [[Dennis Ajalie]] and [[Pawel Swiatek]] laying out how Phoenix lands on TeamApt's people — see *TeamApt Org Movements* below.
- **Apr 27, 2026**: Formal CI&P-team-specific kick-off meeting hosted by [[Tracy Ojaigho]] — see *Card Issuance & Processing Platform* section below for details.

## Platform Cluster Architecture (Official — Tosin's Project_Phoenix_v3)

The Platform Organization is structured into three operating divisions plus cross-cutting CoEs/departments, per the March 2026 Platforms Conference deck ([[source — Project Phoenix Org Structure Changes (March 2026)]])

### Business Banking Platforms
- [[TSP|Transaction Switching & Processing]] — foundational payment kernel; sub-platforms: Card Switching, Account Switching, VAS Switching, Integrations. **TSP is in Phase 1 because most other platforms depend on it, not because it's an umbrella that absorbs them.** Other platforms are peers, not children of TSP.
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

[[Strangler Pattern]] (Strangler Fig). Led by [[Ravi Jakhodia]]. Total timeline: 6 months.

| Stage | Focus | Duration | Target |
|---|---|---|---|
| Stage 1 | Core Capabilities + Kenya Discovery | Months 1–2 | End of May 2026 |
| Stage 2 | All Platforms + Alpha Launch | Months 3–5 | End of August 2026 |
| Stage 3 | Beta + Commercial Roll-Out | Month 6 | September 2026 |

**Stage 2 imposes ~4-month change freeze** — only must-have exceptions approved by PM Governance Body (Tosin). Day 1 retreat reconfirmation: Phase 2 starts June; pre-June teams must clear regulatory, reliability, innovation priorities; BAU maintained during freeze; OKRs rely on product shipped by June; sales/local GTM drive 2025 680 goal.

Key risks: Design components slip (HIGH), informal freeze workarounds (HIGH), PM artefact format not finalized (MEDIUM).

Stage 1 workstreams (per [[Phoenix Stage 1 Consolidated Project Plan]]): 5 core (CBA, Cosmos, App Shell, Notifications, TSP) + 3 head-starts (Kenya Onboarding Discovery under [[Ope Adeyemi]]+[[Emir Emanetoglu]], Kenya Core Discovery under [[Kaushal Shukla]], Unified UX Framework under [[Astrid Decrop]]).

## Card Issuance & Processing Platform (Phase 1 — Kicked Off)

**Phase 1 broader kick-off: April 7, 2026** — formally initiated per [[Emeka Awagu]]'s CTO notes. Architecture in active design. Kick-off occurred during a high-operational-stress week (3 concurrent P1s, GoSubscribe war room, Easter weekend incidents).

**Formal CI&P-team-specific kick-off meeting: April 27, 2026** — hosted by [[Tracy Ojaigho]]. Attendees: [[Elishma Nwobodo]], [[Nadeem Abbas]], [[Emeka Awagu]], [[Damilola Oyediran]], Tracy, [[Nitish Chand]], [[Ketan Dhamasana]], [[Olufemi Davies]]. Three ALIGNED decisions:
- Hiring strategy balanced with [[AI and Automation Adoption]] (owner: Damilola).
- Platform migration target end of Q3 2026 with quarterly milestones.
- Phase One led by a dedicated [[Strike Team]] — composition finalized this week (owner: Nadeem).

Workstream owners assigned at the kick-off:
- **Strike team definition** → Nadeem Abbas
- **[[Governance Structure]]** → Tracy Ojaigho
- **Hiring roadmap** → Damilola Oyediran
- **Technology roadmap** → Elishma Nwobodo
- **Infrastructure assessment** → Emeka Awagu
- **Regulatory alignment** ([[PCI-DSS]] etc.) → Ketan Dhamasana
- **[[Change Management]]** → Olufemi Davies

Source: [[Project Phoenix - CI&P kick off meeting - 2026-04-27]]. See also [[Card Issuance and Processing]] (concept), [[Phase One Migration]], [[Centralized Card Platform]].

The platform is designed around a [[Spine and Module Architecture]] — a market-agnostic shared Spine plus independently deployable market-specific Modules. It is the **first fully-specified Phoenix platform and the proof point for the whole Spine-and-Module pattern**.

### Scope
- [[Card Management System]] — card lifecycle engine and program configuration (replaces [[Moniepoint MFB]]'s legacy [[Card Manager Service]])
- [[Authorization Engine]] — real-time approve/decline decisions
- [[3DS/SCA Service]] — cardholder authentication for card-not-present transactions
- [[Card Dispute Service]] — end-to-end dispute lifecycle management
- [[EMV Data Preparation Platform]] — EMV profile management and personalisation vendor data flows

### Delivery Phases
1. **Phase 1** — Nigeria Platform Build: Spine + Nigeria Module (Verve and Visa adapters, personalisation vendor, BIN/config) ← **KICKED OFF APR 7, 2026; CI&P-team-specific formal kick-off APR 27, 2026**
2. **Phase 2** — Nigeria Incremental Cutover: feature-flagged traffic migration with rollback capability
3. **Phase 3** — UK Launch: add UK Module (Visa/Mastercard adapters, PSD2-compliant SCA adapter)
4. **Phase 4** — Kenya Launch: add Kenya Module (Visa adapter, config)
5. **Phase 5** — Additional Markets: same pattern, Spine unchanged

### Team Structure

Two platform engineering teams under [[Digital Banking Platforms]]:
- [[Team 1 Card Processing]] — owns Authorization Engine, 3DS/SCA, Card Dispute Service
- [[Team 2 Card Issuance]] — owns Card Management System, Card Controls Service, EMV Data Prep

Under the [[Strike Team + Continuity Operating Model]] (2026-04-14), platform leadership ([[Tracy Ojaigho]] + [[Emeka Awagu]]) formally took operational ownership of the existing [[MFB Cards Team]]. Existing engineers continue maintaining the legacy stack (continuity); a strike team builds the new CMS.

### Success Targets
- Card authorization latency: <500ms
- Auth reversal: <500ms
- Platform API availability: 99.99%
- New market capability delivered via config vs. code: >80%
- Change failure rate: <5%
- Zero money-loss incidents
- Phase One: process 10% of production volume with zero tolerance for data loss or transaction discrepancies (per Apr 27 kick-off)

## TSP Phase 1 Status (as of April 10, 2026)

Per [[TSP Phase 1 Project Plan DRAFT (Apr 10)]] (Frank's business-layer plan) and Alex's April 9 technical delivery plan ratified at TSP Dev Kickoff. Full details in [[TSP]] and [[Transaction Switching Platform]].

- Scope formally agreed: clean transaction switching (auth, clearing, settlement, dispute routing), all 19 transaction types, both NG+GB markets, continuous delivery 12 weeks.
- Team: 2 strike teams (15 people). Team Spine ([[Sulaiman Adeeyo]] EM) + Team Adapters ([[Sunday Ayodele]] EM). [[Alex Adeyemo]] Tech Lead, [[Frank Atashili]] Product Lead, [[Ravi Jakhodia]] Program Lead, [[Ravi Veluguleti]] Card Switching Domain Owner. PM: [[Bunmi Oyefisayo]]. No dedicated MoniePoint engineers (best-effort only — [[Felix Ike]] committed to context-sharing).
- Milestones: M1 First Live Transaction wk 3 (Apr 24) PAY_OUT NG via NIP; M2 Two Markets Six Products wk 6 (May 15); M3 Full Catalogue & Ops-Ready wk 9 (Jun 5) all 19 types; M4 Cutover Begun wk 12 (Jun 26).
- Foundation already built: 15-module Maven monorepo, 9-part LLD (21k+ lines), workflow engine, state machine, ISO 8583 stack (PostBridge/TwoBridge/IPM/Netty/HSM), 6 step executors, 493 passing tests (85% line/80% branch).
- Integration landscape: 23+ external integrations across 6 protocols — NG (9 rails), GB (7 rails), global+core (7: CBA, Treasury/FX, Loom gRPC, Visa, Mastercard, HSM, scheme clearing files).
- Integration Problems (from Mar 30 Frank–Ravi sync): #1 People (blocked on architecture), #2 Tools (Ravi, deferred), #3+4 Architecture+Overlapping Systems RESOLVED Apr 7. See [[Ravi J Expectations and Prep (Apr 7)]] for Frank's explicit/implicit deliverables and 7-day prep.
- Leadership presentation: Monday April 14 afternoon (Tosin + Felix).

## TeamApt Org Movements (Apr 22, 2026 brief)

Frank Atashili's 22-Apr-2026 [[TeamApt-Platformization-Org-Movements (1)|Org Movements brief]] to Dennis and Pawel operationalises Phoenix on the TeamApt side. Phase 1 is strike-team-only: approximately 15 of ~200 product/engineering staff move now; everyone else stays, with phased absorption in later phases.

### OpCo consolidation: four businesses collapse to two
- **Switching & Processing** (Enabler, merger of TPP + Domestic Switching): Lead [[Babatunde Okufi]] as CBDO double-hat. Scope: Acquirer/Issuer processing customers, PTSP/PTAD, ATS client relationships, Juliana Switch commercial, ACT.
- **Monnify + Direct Debit** (Revenue Driver): Lead [[Daniel Ojinaka]]. Scope: Monnify commercial plus CDD (MADD, GoSubscribe, SAFE).
- Shared OpCo functions unchanged: licences, operations, compliance & risk, customers & BD, finance / legal / people ops.

### Three movements into platforms
- **Movement 1 — TSPP Phase 1 (strike team only)**: Triad Product Head [[Frank Atashili]] (Canada), Eng Head [[Alex Adeyemo]] (UK), Design Head TBD, Lead Tech PM [[Oluwabunmi Oyefisayo]] (Australia). Strike team: [[Abeeb Ahmad]] (Juliana Switch), [[Muhammad Siddiqui]] (Principal SE), [[Christopher Ogbosuka]] (built TACHA), plus 2–3 UK engineers, supplements from MonieWorld and Cards (MFB). Hold-the-fort: [[Wycliffe Ochieng']] (EM double-hat Switch + ATS), [[Abdulgafar Obeitor|Gafar]] + AptPay BAU engineers. Juliana/ATS/App Centre stay up; Strangler Fig cutover, not big-bang. Future phases absorb CDD, Switching Solutions + AptPay Suite, Switch Engineering.
- **Movement 2 — CI&P Phase 1**: Under Tracy + Emeka. Team 1 Card Processing (Auth Engine, 3DS/SCA, Card Dispute) — Phase 1 strike team spec-and-builds; TeamApt Acquirer Processing stays in TeamApt on BAU. Team 2 Card Issuance (CMS, Card Controls, EMV Data Prep, Perso interface) — Phase 1: [[Ketan Dhamasana]] transfers as EM; Issuer Processing and CMS teams stay in TeamApt for now.
- **Movement 3 — Monnify system seeds Payment Gateway Platform**: [[Damilare Ogunnaike]] converts to Platform Head; Monnify codebase becomes PG Platform v0. Platform consumes TSPP for switching/processing, CI&P for 3DS/SCA. Monnify business stays in TeamApt under Daniel; phased hand-off as platform matures. Engineering Head TBD.

### Leader conversions (business → platform)
- Frank Atashili: CPO/COO → Head of Platform TSPP (Product). Drops commercial responsibility for CDD and TPP revenue; picks up platform roadmap for switching and processing across NG, UK, KE.
- Tracy Ojaigho: Business Lead TPP → Head, CI&P. Leaves TPP commercial/P&L; takes platform-level ownership of CMS, EMV prep, card dispute, 3DS, Authorization Engine across markets.
- Damilare Ogunnaike: Business Lead Monnify → Head, Payment Gateway Platform. Monnify commercial stays in OpCo under Daniel.

### PM moves (TSPP Phase 1)
- Moves now: [[Oluwabunmi Oyefisayo]] → TSPP Lead Technical PM; [[Idris Aliyu]] → Functional manager, TSPP APMs; [[Ruth Adetunji]] → APM support TSPP Phase 1 (Change Spec authoring; Claude access coordination).
- EM note: Ketan Dhamasana transfers to CMS/Card Issuance under Emeka & Tracy (Phase 1); [[Ravi Kiran Veluguleti]] remains with TSPP as functional engineering manager.
- Stay in TeamApt for now: [[Kevin Ng'Eno]] (Switching Solutions), [[Abdulgafar Obeitor]] (AptPay Suite), Taiwo (Svc Mgr Acquirer Processing), [[Abiodun Famoye]] (APM CDD).

### Numbers at a glance
- 3 leaders crossing to platforms; ~10 strike-team seats in Phase 1; 2 TeamApt leaders with added scope; net ~15 TeamApt staff moving, out of ~200+ P&E headcount.
- OpCo continuity: licences (CBN Switching/Processing/PSSP/PTSP), customers & BD, operations ([[Oladapo Onayemi]] pillar), compliance ([[Ibukun Atoyebi]]), audit ([[Olufemi Agbaje]]), people ops (Constance — reporting to move to Frank).

### Timeline
- Now – Q2 2026: boundaries + TSPP Phase 1 strike team stood up.
- Mid-2026: capability specs authored in Phoenix format; legacy BAU held.
- Late 2026: first alpha via Strangler Fig on separate app; legacy routes cut selectively.
- 2027 steady state: Dispute extracted first, then Operator platform, then Authentication/Authorization big split.

## MFB Systems Blindspot

[[Moniepoint MFB]] operates parallel card infrastructure that needs to be mapped onto the central platform: [[Postillion]]/PostCard (ACI/Interswitch), Smart Card Process, Safe Token, [[Card Manager Service|CMS Manager]] (~12-person team under Femi Davies), Aptent (authorization routing). Beyond cards: [[Iris]] (group reconciliation, 15–27B+ txn/month — recommended: Absorb), [[Atlas]] (transfer orchestration, ~500M txn/month, 12+ downstream providers — recommended: Evaluate). Critical cross-entity dependency: TeamApt's Monnify uses Iris and Atlas rather than TACHA and Juliana — the very cross-entity entanglement Phoenix was created to eliminate. Both sit in [[Damilare Ogunnaike]]'s Monnify org.

The CI&P takeover of MFB Cards (Apr 14 2026) is the first operational resolution of this blindspot for the card stack. See [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] for the full MFB cards inventory feeding the platform build.

## Eywa (AI Layer)

Organizational nervous system — connects every function's context and AI skills. Currently powered by Claude, model-agnostic. Artifact hierarchy: Platform → Team → Capability → Feature → User Story → Acceptance Criteria. Country/entity agnostic by design.

Operational application of AI-nativeness inside CI&P: see [[AI-Native Operations]]. Priorities agreed 2026-04-21: Chargeback & Issue Resolution (highest), Logistics & Production, then general workflow automation (Jira → AI ticketing, tool evaluation led by [[Rumulo]]).

## Talent Density

Phoenix described as "calibration moment." Primary dimensions tested: Customer Obsession, Craft. Threshold dimensions (non-negotiable): No Ego, Candor, Integrity. "We will watch carefully, and we will act on what we see." — Tosin

## Accountability Standards

99.99% minimum uptime for all core platforms, defined P99 latency targets, zero tolerance for unowned incidents, expanded automated test coverage, transparent reliability metrics.

## Active Tensions

- **Extend vs. rebuild**: [[Frank Atashili]]'s original framing ("extend and formalize, not rebuild") vs. [[Alex Adeyemo]]'s endorsed position (TSP as new build from scratch — composable FinOps platform)
- **MFB migration risk**: Phoenix platforms could launch alongside rather than replacing existing MFB systems, creating more duplication. The CI&P takeover of MFB Cards directly addresses this risk for the card stack; Monnify → Iris/Atlas dependency remains unresolved.
- **Timeline ambition**: 6-month "sacrosanct" deadline vs. scope of transformation. [[source — One Platform Migration Plan Analysis]] flags risks in Ravi's plan
- **Resources vs. mandate**: No dedicated MoniePoint engineers on TSP despite initial commitments from Tosin and Felix. Ravi J advocates through structure (OKRs, formal sign-offs) rather than direct resource confrontation — "safer route" per Frank/Alex private read

## Sources

- [[Project Phoenix Initiative (compiled March 2026)]] — Frank's comprehensive planning document (Apr 10 version)
- [[Phoenix Stage 1 Consolidated Project Plan]] — Ravi J's mastersheet companion (Apr 10)
- [[TSP Phase 1 Project Plan DRAFT (Apr 10)]] — Frank's business-layer plan aligned to Alex's 4-phase technical delivery
- [[Ravi J Expectations and Prep (Apr 7)]] — Frank's deliverable consolidation after Apr 7 meetings
- [[source — Project Phoenix Initiative]] — earlier comprehensive planning document
- [[source — Platform Strategy and Vision]] — "One Platform Many Markets" vision, technical architecture rules, governance
- [[source — Project Phoenix Org Structure Changes (March 2026)]] — authoritative group org structure (OpCo / IPCo / DevCo, org trees)
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
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] — first full inventory of the MFB cards stack feeding the CI&P build; strike-team formation + new CMS plan
- [[TeamApt-Platformization-Org-Movements (1)]] — Frank's Apr 22, 2026 brief to Dennis and Pawel on how Phoenix lands on TeamApt's people
- [[Project Phoenix - CI&P kick off meeting - 2026-04-27]] — formal CI&P-team-specific kick-off; ALIGNED decisions and workstream owners
