---
title: Transaction Switching Platform — TSP Strategy, Architecture, and Resourcing
type:
  - "synthesis"
cssclasses:
  - "synthesis"
status: current
created: "2026-04-19T18:31:30Z"
updated: "2026-04-19T18:31:30Z"
summary: Cross-cutting synthesis of TSP — two faces (card authorization kernel + unified payment platform), orchestrator-vs-switch architectural distinction, Spine+Module architecture with 19 transaction types and 23+ integrations, 6-capability modernisation sequence, strike team staffing (15 people, 65 total headcount), critical open risks (DD placement, external tenant model, MFB blindspot), Phase 1 milestones M1–M4, BL validation politics, and resource-gap escalation implications.
---

## Scope and Purpose

The Transaction Switching Platform (TSP) is Moniepoint's foundational Layer 1 payment processing kernel — the single conduit for all fund movement across the platform. It is the highest-priority engineering initiative in the organization as of Q2 2026.

This synthesis consolidates TSP specifically. The parent synthesis [[Project Phoenix — Architecture, Staffing, and Execution Status]] covers TSP in the Phoenix context; this page focuses on TSP as a platform in its own right: the architectural decomposition, unified-switch strategy, modernisation sequence, and current resourcing/business-leader-validation politics.

Scope: April 2026 snapshot. Three TSP concept pages exist in fragmented form (TSP entity, Moniepoint Group Transaction Switching Platform concept, Transaction Switching concept) — this synthesis is the cross-cutting view across them.

## The Two Faces of TSP

### Face 1: Card Authorization Kernel (TSP as Dependency)

In card authorization flows, TSP is **the Layer 1 dependency** of the [[Card Issuance & Processing Platform]]. The [[Authorization Engine]] calls TSP to place a lien on the account balance when a transaction is approved:

- **APPROVE** → Auth Engine → POST /v1/transactions → TSP places lien → approval returned to card scheme
- **DECLINE** → no TSP call; decline reason returned

**Coupling**: tight. Authorization is synchronous and cannot complete without TSP responding within the 500ms SLA.

**Fund Movement Delegation Principle**: The Card Issuance & Processing Platform never posts directly to [[Moniepoint Core Banking Application|CBA]]. All fund operations (liens, reversals, clearing, dispute provisional credits) are constructed and executed by TSP, which builds the appropriate CBA journal entries. This is a **hard architectural boundary**, not a guideline.

### Face 2: Unified Payment Platform (TSP as Destination)

In the broader Phoenix frame, TSP is **the destination for all AptPay products**. Five existing products migrate into TSP as platform capabilities:

| Current Product | TSP Capability |
|---|---|
| [[Juliana]] (Account) | Account Switching & Processing |
| [[Juliana]] (Card) | Card Switching & Processing |
| AptPay ATS | Integrations (Country-Agnostic) |
| VAS (bill pay, airtime) | VAS Switching & Processing |
| AptPay Direct Debit | **Decision required** — placement unresolved |
| [[TACHA]] / Juliana Backoffice | Settlement & Clearing |
| Dispute logic (fragmented) | Centralized Dispute Resolution (Proposed) |

The unified-platform strategy is deliberate: **one platform for all token types (card, account, wallet) and all transaction directions (push/pull)**, with country-specific adapters — not separate switches per product.

## The Orchestrator vs Switch Distinction

A critical architectural clarification from Frank's Gap Analysis:

**TSP as currently designed is a payment orchestrator** — it manages payment lifecycle within a controlled ecosystem:
- State machine
- Fee calculation
- Posting construction
- Routing

This is correct and needed.

**But TSP also needs a transaction switching layer** — real-time inter-institutional message routing between independent financial institutions:
- ISO 8583 message handling (parsing, construction, format translation)
- Sub-500ms authorization (scheme-mandated latency)
- HSM integration (PIN translation, MAC generation, PAN tokenization)
- Direct scheme connectivity (persistent TCP, network management messages, scheme certification)
- Stand-in processing (local approval when issuer/scheme unavailable)
- Hot lists (sub-millisecond lookup in authorization path)
- BIN table routing (tenant → country → global hierarchy)

**Current state**: Phoenix has the orchestrator built, but the switch layer is still being built out. Key capabilities already assembled for the switching layer (per TSP Executive Briefing analysis):
- ISO 8583 switching (jPOS 3.0 + Netty 4.2)
- Direct Visa & Mastercard scheme connections
- HSM integration
- 21-step workflow engine
- Config-driven Fee Engine (replacing 5 legacy libraries)
- 493 passing tests across 14 modules

**Both capabilities are needed** — the orchestrator for payment lifecycle, the switch for inter-institutional routing. Conflating them was the original architectural ambiguity; separating them clarifies what is built vs what remains.

## Architecture

### Spine + Module Pattern

TSP uses the same market-agnostic Spine + Module architecture as the Card Issuance & Processing Platform:

- **Spine** — shared core: orchestrator, 12–15 executors, reconciliation, 3DS (ACS/DS/MPI), settlement & clearing, dispute resolution
- **Modules** — country-specific adapters deployed independently per market
  - **Nigeria adapter**: 9 integrations
  - **UK adapter**: 6 integrations
  - **Direct scheme connections**: Visa, Mastercard

### Transaction Types

**19 transaction types** (expanded from 16 in the February 2026 v1 briefing):

Core types: CARD_AUTHORIZATION, AUTH_REVERSAL, PAY_OUT, PAY_IN, INTERNAL_TRANSFER, CARD_FINANCIAL, CARD_CLEARING, VAS_AIRTIME, VAS_DATA, VAS_BILL_PAYMENT, CROSS_CURRENCY, LOAN, DIRECT_DEBIT, MERCHANT_SETTLEMENT, plus 5 additional ASYNC/SYNC flows.

### Deployment Tiers

Three deployment tiers, designed from day one but shipped in sequence:
1. **Cloud Platform** — Moniepoint's own ops (Tier 1, shipping first)
2. **Central Switch** — regional, geographically compliant (Tier 2)
3. **Front-End Processor** — on-premises at bank (Tier 3)

### Codebase

**15-module Maven monorepo** at gitlab.com/tcosmos/fx/tsp-platform. One codebase, country-specific instances. PostBridge used internally; [[Juliana]] stays fronting banks during transition.

**Tech stack**: Java 25, Spring Boot 4.0, Spanner, Kafka + Debezium, jPOS 3.0.1 + Netty 4.2, Harness → GKE.

### Shared Dependencies

Six shared platform dependencies: [[Moniepoint Core Banking Application|CBA]], Cosmos, [[Loom]], Treasury/FX, Notifi, and one additional.

## Layer Positioning: TSP vs TeamApt Switch

Per [[TSP vs TeamApt Switch Analysis]], the layer decomposition across the switching stack:

| Layer | Owner | Responsibility |
|---|---|---|
| Layer 3 — Product Experience | Business lines (DD, Monnify, etc) | Customer-facing product UX |
| Layer 2 — Fund Movement / Orchestration | TSP (Phoenix) | Payment lifecycle, state machine, fee calculation |
| Layer 1 — Switching | TeamApt Transaction Switch (legacy) / TSP switching layer (building) | Wire protocols, authorization, scheme connectivity |

TSP is **Layer 2 as orchestrator** and **Layer 1 as switching layer**. The existing [[TeamApt T-Switch]] operates at Layer 1 today (57% inter-bank traffic share as of Apr 14 2026, with TeamApt card share 35.68% declining). Migration to TSP replaces both orchestration and switching layers.

## Platform Modernisation Sequence (Proposed)

Order in which AptPay products migrate into TSP (per TSP Strategy):

1. **Account Switching & Processing** — PoC transition; lessons de-risk all others. Blind spot: dual switch ([[Juliana]] vs [[Atlas]])
2. **Centralized Clearing & Settlement ([[TACHA]])** — cross-cutting foundation; must have formal ownership, API contracts, SLOs first
3. **Centralized Dispute Resolution** — consolidate fragmented logic across Juliana, TPP, AptPay Suite
4. **Card Switching & Processing** — highest commercial risk (~42-50% POS share), sequenced after playbook proven
5. **Direct Debit** — last among core, allows tokenisation conflict resolution
6. **Remaining** (Integrations/ATS, VAS Switching) — based on dependency mapping

The sequence is risk-managed: Account Switching goes first as the least-exposed PoC; Card Switching (highest revenue exposure) goes later after the playbook is proven.

## Critical Open Risks

Per [[source — Project Phoenix PM Briefing Deck]] and TSP Executive Briefing Analysis:

| Risk | Status |
|---|---|
| Direct Debit placement unresolved | **CRITICAL** — blocks team formation and Git hierarchy |
| TACS unrecognised as cross-cutting auth service | **CRITICAL** — auth logic will fragment |
| Three-way tokenisation conflict (ATS, DD Issuer Module, Card Switch) | **CRITICAL** |
| External tenant model absent — all callers internal | **CRITICAL** — B2B switching business architecturally homeless |
| PTSP running parallel transition without TSP coordination | **CRITICAL** |
| Card fee ownership (TSP Fee Engine or FEP?) | PENDING — blocks Card Phase 4 |
| Juliana "~60% of ATS" claim unspecified | HIGH — account switch routing capability may be uncovered |
| Sub-platform senior roles all TBH | HIGH — Layer 1 program unstaffed |

### The External Tenant Gap

**The most fundamental architectural issue**: No concept of external financial institutions as TSP clients. TSP's current design assumes internal-only callers — which conflicts with TeamApt's core belief statement ("TeamApt is not limited to building systems for a single bank"). The B2B switching business is architecturally homeless until this is resolved.

### Other Gaps (per Frank's TSP Executive Briefing Analysis)

Already addressed in the current TSP design:
- Card switching explicitly owned by TSP (replaces ~60% of ATS/Juliana)
- ISO 8583 protocol handling via jPOS 3.0 + Netty 4.2
- HSM integration present
- Direct Visa and Mastercard scheme connections architected
- Reconciliation owned by TSP
- Mandate management claimed by TSP

Still open:
- Multi-institution clearing/settlement — TSP owns reconciliation but not full clearing engine (NIBSS settlement files, Visa TC33, MC IPM)
- Juliana 60/40 split ambiguous — which 60%? Account Switch inter-bank routing may not be covered
- AptPay Suite invisible in architecture
- GoSubscribe/subscription billing — no platform home for recurring payment scheduling, retry, dunning
- Tokenization platform not mentioned
- BIN table architecture not described
- Stand-in processing — not TSP's to build but TSP must handle scheme-initiated approvals

## Staffing & Team Structure

### Strike Team Model

**Small SEAL team model. 65 total headcount** per the TSP Strike Team Staffing Meeting 2026-04-01:
- 2 leadership
- 3 PMs
- 5 APMs
- 4 EMs
- 48 engineers/SRE
- 1 Architect (shared)
- 1 VAS PM (Bunmi Oyefisayo)
- 2 QAs (shared)

**Tier 1 engineers** (data-driven selection via GitLab/Jira analytics): Yusuf (#1), Christopher Ogbosuka, Abeeb Ahmad, Daniel O.

**Geographic spread**: Nigeria (55), India (2), Kenya (2), UK (1), others.

### Phase 1 Strike Team (15 people, 2 sub-teams)

**Team Spine** — EM [[Sulaiman Adeeyo]]
**Team Adapters** — EM [[Sunday Ayodele]]
**Tech Lead** — [[Alex Adeyemo]] (Head of Eng)
**Product Lead** — [[Frank Atashili]] (part-time)
**Program Lead** — [[Ravi Jakhodia]]
**Card Switching Domain Owner** — [[Ravi Veluguleti]] (VP, TMAP)
**PM** — [[Bunmi Oyefisayo]]

**Engineers**: Abeeb Ahmad, Christopher Ogbosuka, Vijyendra Mishra (UK), Muhammad Iqbal (UK), [[Muhammad Siddiqui]] (Principal), Krunal Chaudhari (UK), Moyosore Omoniyi (UK), Mubasher Saifullah (UK).

**Shared**: 1 Architect, 1 VAS PM (Bunmi Oyefisayo), 2 QAs.

### Team Realignment Into TSP

| Current Team | PM | Target TSP Capability |
|---|---|---|
| Switching Solutions | [[Kevin Ng'Eno]] | Card/Account Switching & Processing |
| AptPay Suite | [[Abdulgafar Obeitor]] | Integrations / Settlement & Clearing |
| Switch Engineering | [[Oluwabunmi Oyefisayo]] | Core switch platform engineering |
| CDD | [[Abiodun Famoye]] | Direct Debit (within TSP) |
| PMO | [[Idris Aliyu]] | TSP-wide product operations |

### The Resourcing Reality

**No dedicated Moniepoint engineers on TSP** despite initial commitments from Tosin and Felix. Felix committed to context-sharing only (not direct resource allocation).

**Frank's ask to Ravi J**: Advocate for TSP support in team OKRs (~20% time).

**Ravi's framing — the "safer route"**: Per Frank + Alex private read, "Ravi pushed for OKRs and formal sign-offs but stopped short of fighting for 80% engineer time. Advocacy through structure, not direct confrontation with Felix/Tosin on resources." The implication: resource negotiation remains Frank + Alex's fight; Ravi sets up governance/escalation frameworks but will not resolve the underlying resource gap.

This is the single-largest capacity constraint on TSP Phase 1 delivery.

## The Business Leader Validation Fight

Per [[Ravi J Expectations and Prep (Apr 7)]], **formal Business Leader validation is non-negotiable for Ravi.** His exact position:

> "If we're building a TSP and the current business leaders don't even have the time to give it, then how serious are we as an organization?"

### BLs Requiring Sign-Off

| BL | Product | Status |
|---|---|---|
| [[Khalil]] | VAS | Engaged |
| Solomon + 1 | Account Switching | Needs securing |
| [[Femi Davies]] / [[Damilola Oyediran]] | Card infrastructure | Needs securing |
| [[Damilare Ogunnaike]] | Atlas / Iris (Monnify org) | Needs securing |

### Why BL Validation Matters

Without formal sign-off, TSP risks:
- Being built without business-leader endorsement that protects the team later
- Misalignment with leadership on timeline
- Delivering capabilities BLs then reject at integration point

The validation sessions are planned for weeks 2–3 (Apr 14–25). These sessions run directly into the London strategy conference window (Apr 14–16), creating calendar pressure.

### Phase 1 Must Unblock Stage 2

Ravi's deepest concern: "If you're not clear about what is the outcome of TSP by the end of Stage 1, then my worry is that when say Payments picks it up in Stage 2, how will they really deliver."

API contracts, adapter specs, integration patterns must be documented before Phase 1 ends. This is a documentation-discipline gate; if Stage 1 ships the code but not the documentation, Stage 2 consumers can't onboard.

## Delivery

### Phase 1 Scope Definition

**Objective**: Unified TSP platform receiving transactions from internal Moniepoint/TeamApt domain platforms, switching to correct destinations, proving E2E processing for all 19 transaction types in both NG and GB markets with continuous delivery and in-flight migration/cutover by end of Phase 1.

**In scope**:
- 19 transaction types
- Spine (scaffolded)
- Switching (auth/clearing/settlement/dispute routing)
- NIP + MPS + ISO 8583/PostBridge adapters
- Recon + backoffice + deployment pipelines
- Migration/cutover with feature flags
- Capability discovery

**Out of scope**:
- External bank ATS deployments (deferred)
- All 40+ providers (Phase 1 proves interface types with 1–2 providers each)
- Full traffic migration
- Big-bang cutover
- SaaS-to-external-banks
- Banking host functions
- PTSP/PTAD
- Multi-institution clearing engine

### Milestones (Ratified Apr 9)

| Milestone | Week | Date | Scope |
|---|---|---|---|
| M1 — First Live Transaction | 3 | Apr 24 | PAY_OUT NG via NIP |
| M2 — Two Markets, Six Products | 6 | May 15 | PAY_OUT GB, PAY_IN NG+GB, INTERNAL_TRANSFER, CARD_FINANCIAL, CARD_AUTH, VAS_AIRTIME |
| M3 — Full Catalogue & Ops-Ready | 9 | Jun 5 | All 19 types, recon engine, backoffice, Harness CD, 3DS, feature flag guards |
| M4 — Cutover Begun | 12 | Jun 26 | Atlas feature flag, internal canary, 5%→25%→100% ramp, tsp-history-bridge, first legacy removal |

**Phase 1 target**: end of May 2026 (Stage 1). **Full six-month deadline**: end of September 2026 (declared sacrosanct by Tosin).

### Foundation Already Delivered (as of April 2026)

- 15-module Maven monorepo at gitlab.com/tcosmos/fx/tsp-platform
- 9-part LLD (21k+ lines)
- Tech stack established (Java 25, Spring Boot 4.0, Spanner, Kafka+Debezium, jPOS 3.0.1+Netty 4.2, Harness→GKE)
- Spine built: workflow engine, state machine (16 states), fee engine (5 calculators), posting strategies, routing, 6 step executors, integration clients (CBA/Treasury/Loom), adapter infrastructure
- Infrastructure: ISO 8583 codec (Visa+MC packagers, HSM Thales PKCS#11), CDC outbox, 34 DDL migrations, 102 test classes (85% line/80% branch coverage)
- Reverse engineering: NG payout (44 stories), VAS (18 stories), card switching (42 capabilities), 78 legacy components across 15 capabilities

### Still to Build

- TransactionService orchestrator
- ~15 remaining step executors
- tsp-adapter-ng (NIP SOAP, NPS ISO 20022, Interswitch, VAS)
- tsp-adapter-gb (ClearBank, FPS, TrueLayer, Checkout.com)
- Visa/MC dispatch logic
- ISO 20022 codec
- Recon strategies
- Backoffice API
- 3DS
- Deployment pipelines
- Feature flags (CountryActivationGuard)

### Integration Landscape

**23+ external integrations across 6 protocols**:

**Nigeria (9)**: NPS ISO 20022, NIP SOAP, 10+ Bank FEPs PostBridge, Interswitch, CoralPay, PTSA, 44 VAS providers, NIBSS NSS, NG Account Resolver

**Great Britain (7)**: ClearBank FPS, RailsR FPS, TrueLayer, Volt, Checkout.com, BACS, CoP/TellMoney

**Global + Core (7)**: CBA, Treasury/FX, Loom gRPC, Visa direct (ISO 8583 + SFTP), Mastercard direct (ISO 8583 + SFTP), HSM Thales PKCS#11, scheme clearing files

### Migration Pattern

**Feature flag at validation-to-fund-movement seam in Atlas.** TSP initially connects to existing downstream integrations (no re-certification). Internal/test users first, gradual expansion.

**Strangler fig / shadow mode.** Shadow mode gate: **14-day window with 0% discrepancy** required before traffic cut-over. Legacy teams stay operational during migration — **no code freeze**.

## Impact by Product Team

Per TSP Executive Briefing Analysis:

### HIGH Impact Teams — Fundamental Scope Change

- **Account Payments** — 5 of 19 types; PAY_OUT is Phase 1 critical path
- **Card Issuance** — 6 of 19 types; TSP takes card switching layer
- **VAS Platform** — 44 provider integrations moving to TSP

These teams transition from **owning full flow** to being **"callers"** of TSP. This is the largest disruption — their existing roadmaps and architecture ownership are structurally rewritten.

### MEDIUM Impact — Complementary Scope

- **Cross-Border Payments** — Phase 5, strategically critical for UK
- **Card Acceptance** — settlement changes
- **Payment Gateway ([[Monnify]])** — best-served business line
- **Credit** — Phase 5, clean separation

### Non-Negotiable Constraint

[[Juliana]] Card Switch holds **~42–50% of Nigeria's POS (agent/merchant) market**. Zero disruption during transition — parallel-run validation, SRE sign-off, maintained scheme certifications, same-day settlement commitments. This is the single largest migration constraint.

## The MFB Parallel Stack Blindspot

Per [[TSP vs TeamApt Switch Analysis]] and [[source — MFB Systems Blindspot Analysis]]:

**TSP migration plan does not account for migrating MFB off the Interswitch stack.**

### MFB Card Infrastructure (not in TSP plan)
- Postilion/PostCard (ACI/Interswitch vendor-managed)
- Smart Card Process
- Safe Token
- [[Card Manager Service CMS Specification|CMS Manager]] (~12-person team under [[Femi Davies]])
- Aptent (authorization routing)

### MFB Transfer/Reconciliation (not in TSP plan)
- **[[Atlas]]** — ~500M txn/month, 12+ downstream providers, NIP via [[Moniepoint Core Banking Application|Kuwego]]
- **[[Iris]]** — 15-27B+ txn/month, reconciliation across all 3 group entities

**The cross-entity entanglement**: [[Monnify]] still uses Atlas and Iris, not TeamApt equivalents (Juliana/TACHA). This is the single largest cross-entity dependency TSP needs to resolve — and it's not scoped.

Both platforms sit in [[Damilare Ogunnaike]]'s Monnify organization. Resolving this requires either:
- (a) Migrating Monnify to TACHA/Juliana
- (b) Designating Atlas/Iris as Phoenix platforms with formal tenant boundaries
- (c) Accepting the parallel infrastructure as permanent

Decision has not been made.

## Strategic Position

### The Circulatory System Framing

TSP is the **"circulatory system" of Moniepoint Inc.'s platform** (Frank Atashili's framing from the April 7, 2026 kick-off). It is:

- The highest-priority engineering initiative in the organization as of Q2 2026
- Consumes the best engineers (Tier 1 data-driven selection)
- Receives direct executive mandate from Tosin (Group CEO)

### Frank's Deliverables (per Ravi J Expectations)

Six explicit deliverables from Ravi to Frank:

1. **Detailed Project Plan** (HIGHEST PRIORITY) — status: first draft created ([[TSP Phase 1 Project Plan DRAFT (Apr 10)]])
2. **Formal BL validation** — non-negotiable
3. **Team brief** — kickoff for the 2 dev teams
4. **Company-wide briefing** — originally Thursday Apr 10, accommodating Frank's travel
5. **Schedule meetings** — internal team review Fri Apr 11, leadership (Tosin + Felix) Mon Apr 14 afternoon
6. **Honest timeline communication** — not conservative, not unrealistic

Frank's Monday pitch recommendation: **accept 3-month timeline (~early July)**, gap from 2-month = 4 weeks, options are accept/add resources/reduce scope. Recommendation to accept because reusable engine architecture delivers significantly more capability.

### Explicit Don'ts

- **Don't promise 2-month delivery** — Ravi respects honesty over optimism
- **Don't skip BL validation** — protects the team later
- **Don't wait for resources to materialize** — resource negotiation is Frank+Alex's fight
- **Don't let the London strategy conference (Apr 14–16) consume momentum** — internal review Friday, leadership Monday before conference takes over

## Cross-Cutting Observations

### 1. TSP Is Two Distinct Programs Sharing One Name

Building the orchestrator (payment lifecycle) and building the switch (inter-institutional routing) are **different engineering programs** with different skill requirements, different timelines, and different risk profiles. The current single-team-structure conflates them; separating them would clarify resource needs and milestone dependencies.

### 2. Phase 1 Success Is Necessary But Not Sufficient

Phase 1 proves the platform CAN switch transactions. But Phase 1 scope explicitly excludes multi-institution clearing, external tenant model, Atlas/Iris migration, and the MFB Interswitch stack migration. Passing Phase 1 tests Layer 2 orchestration; Layer 1 switching and Layer 0 migration remain open.

### 3. Business Leader Validation Is The Political Fight

The BL validation fight is not about API contracts — it's about whether business lines endorse TSP as their future destination. If BLs won't commit time, their post-TSP product architecture will drift from the platform assumption. This is a soft-power alignment problem dressed as a project management gate.

### 4. The Resource Gap Is Load-Bearing

No dedicated Moniepoint engineers + best-effort context-sharing from Felix + Ravi unwilling to fight the resource battle = TSP delivers on current TeamApt capacity or doesn't deliver. Frank + Alex's options are scope cut, timeline extend, or escalation to Tosin directly. Each has costs.

### 5. The Modernisation Sequence Is Risk-Aware But Execution-Fragile

Sequencing Account Switching first (as PoC) and Card Switching later (highest revenue) is correct risk logic. But the sequence depends on each migration generating reusable playbooks for the next. If Account Switching's lessons don't transfer (because it's dual-switch against Atlas, not just Juliana), the risk-managed sequence collapses into per-migration improvisation.

### 6. The 3-Month Timeline Is The Honest Anchor

Frank's recommendation to accept 3 months (vs 2) is the clearest artifact of the Phoenix timeline tension. The sacrosanct 6-month deadline absorbs a 1-month TSP slip inside Stage 1, but every downstream Phoenix workstream depends on Stage 1 completion. A 1-month TSP slip cascades.

### 7. MFB Integration Remains Strategic Blind Spot

TSP's phased migration elegantly handles TeamApt products. It has no plan for MFB's Atlas/Iris/Postilion/CMS Manager stack. Either this gets scoped into a Stage 2+ wave, or Phoenix's stated goal (eliminate cross-entity duplication) is structurally undeliverable.

### 8. The "Safer Route" Signal Reveals Governance Limits

Ravi J's "advocacy through structure, not direct confrontation" approach is pragmatic — he cannot force Tosin/Felix to allocate engineers. But it also means the Phoenix program-management layer has **no escalation path** when resource gaps threaten delivery. Frank + Alex are left to negotiate upward directly, which is a weak program governance model.

## Implications for Leadership Action

1. **M1 (Apr 24) is the first test** — First Live Transaction PAY_OUT NG validates the orchestrator + Nigeria adapter stack. If M1 slips, every downstream milestone compresses, and the 3-month timeline becomes aspirational.
2. **Resolve the Direct Debit placement decision** — flagged CRITICAL, blocks team formation. This is a bounded decision with no identified owner escalation path; it needs an explicit forcing function.
3. **Close the external tenant model gap** — TSP's core belief statement ("not limited to a single bank") requires architectural support. Until external tenant model is designed, TSP cannot operate as a B2B switching platform, which constrains revenue diversification.
4. **Establish the MFB integration wave** — Atlas, Iris, Postilion/PostCard, CMS Manager, Aptent, Smart Card, Safe Token need a designated Phoenix wave. Without it, Monnify→Atlas/Iris dependency persists, and Phoenix's cross-entity goal is incomplete.
5. **Formalize BL validation sign-off** — the non-signing BLs (Solomon+1, Femi Davies/Damilola Oyediran, Damilare Ogunnaike) need a specific calendar commitment. A "BL sign-off dashboard" with named BLs, sign-off dates, and blocker status would make the political fight visible.
6. **Decide the resource escalation** — accept current resources (with 3-month timeline and explicit scope cut options), add resources (requires Tosin/Felix intervention), or raise to Group board. The current posture (Frank+Alex quietly managing without explicit escalation) is the most expensive option because it delays the resource decision indefinitely.

## Key References

### TSP Pages (Fragmented)
- [[TSP]] — entity page (card authorization kernel face)
- [[Moniepoint Group Transaction Switching Platform]] — concept page (unified platform face)
- [[Transaction Switching]] — generic concept
- [[Transaction Switching Platform]] — stub (redirects to [[Moniepoint Group Transaction Switching Platform]])

### Architecture & Strategy Sources
- [[TSP vs TeamApt Switch Analysis]] — 3-layer architecture
- [[source — TSP Executive Briefing Analysis]] — Frank's analysis of Alex's March 23 briefing
- [[TSP Executive Briefing v1]] — Feb 27 (Layer 1 kernel, 16 tx types, 6-phase migration)
- [[TSP Executive Briefing v2]] — March 2026 (19 tx types, 14-module monorepo, dual-country adapters)
- [[TSP Executive Roadmap Idris]] — AptPay migration roadmap
- [[TSP Deployment Architecture Position]] — three-tier deployment

### Phase 1 Delivery Sources
- [[TSP Phase 1 Project Plan DRAFT (Apr 10)]] — Frank's business-layer plan
- [[Ravi J Expectations and Prep (Apr 7)]] — Frank's deliverable consolidation
- [[TSP Phase 1 Scope Prep Romulo 2026-04-07]] — PAY_OUT scope
- [[Project Phoenix Phase 1 Kick-off 2026-04-07]] — TSP as org core
- [[Project Phoenix Actions]] — 21 open actions, Sept 2026 deadline

### Strategy & Staffing Sources
- [[TSP Strategy Session 2026-04-01]] — unified platform confirmed, strike team
- [[TSP Strategy Meeting Frank Alex 2026-04-01]] — architecture, team selection, 3-month minimum
- [[TSP Strike Team Staffing Meeting 2026-04-01]] — SEAL team model, no code freeze
- [[Phoenix Stage 1 Consolidated Project Plan]] — Ravi J's mastersheet

### Key People
- [[Frank Atashili]] — platform lead, architecture owner, Product Lead
- [[Alex Adeyemo]] — Head of Eng / Tech Lead
- [[Ravi Jakhodia]] — Program Lead
- [[Ravi Veluguleti]] — Card Switching Domain Owner, VP, TMAP
- [[Bunmi Oyefisayo]] — PM
- [[Sulaiman Adeeyo]] — Team Spine EM
- [[Sunday Ayodele]] — Team Adapters EM
- [[Tosin Eniolorunda]] — Group CEO, governance
- [[Felix Ike]] — Group CTO, context-sharing commitment

### Business Leaders for Validation
- [[Khalil]] — VAS (engaged)
- Solomon+1 — Account Switching
- [[Femi Davies]] / [[Damilola Oyediran]] — Card infrastructure
- [[Damilare Ogunnaike]] — Atlas/Iris (Monnify org)

### MFB Entities (Blindspot)
- [[Atlas]] — MFB transfer orchestration
- [[Iris]] — MFB reconciliation
- [[Moniepoint MFB]] — parent entity

### Related Syntheses
- [[Project Phoenix — Architecture, Staffing, and Execution Status]] — parent synthesis covering TSP in Phoenix context
- [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]] — TSP handles the switching layer for future RC91 routing
- [[Direct Debit Program — Architecture, Operations, and Commercial Expansion]] — DD placement within TSP remains CRITICAL open issue
- [[Engineering Leadership — Hiring, Capacity, and Performance Patterns]] — TSP team realignment is the primary engineering leadership movement in Q2
