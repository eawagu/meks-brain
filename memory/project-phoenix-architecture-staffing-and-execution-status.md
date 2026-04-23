---
type:
  - "synthesis"
title: Project Phoenix — Architecture, Staffing, and Execution Status
status: current
created: "2026-04-19T18:20:10Z"
summary: Cross-cutting synthesis of Project Phoenix — architecture (6 clusters, Spine-and-Module pattern), staffing (Stage 1 plan, TSP strike teams, MFB cards transition with Tracy filling CI&P Product and Femi continuing as Cards Business Leader, TSP resource gap), execution status (CI&P Phase 1 kicked off Apr 7, TSP Phase 1 underway, Kenya via Sumac), and implications including TSP M1 gate, MFB Systems Blindspot partial resolution on Cards, Stage 2 change freeze enforcement, and the remaining CI&P Design Lead gap.
updated: "2026-04-23T06:12:43Z"
cssclasses:
  - "synthesis"
---

## Scope and Purpose

[[Project Phoenix]] is [[Moniepoint]]'s group-wide transformation initiative with two goals: **platformization** (consolidate duplicate builds across group companies into shared platforms) and **AI-nativeness** (embed AI into every workflow via [[Eywa]]). It reframes the group's build model: a new country becomes a configuration profile, not a new codebase.

This synthesis consolidates Phoenix across its three operating axes:
1. **Architecture** — the platform cluster structure, Spine-and-Module pattern, layer decomposition
2. **Staffing** — the Stage 1 project plan, strike teams, cross-entity resource commitments
3. **Execution status** — current phase state, active tensions, open risks, forward gates

Scope: April 2026 snapshot. Phoenix is actively underway; this captures what is shipped, what is building, and what is contested.

## Strategic Framing

### The Two Goals

**Platformization** — consolidate duplicate builds across group companies (TeamApt, Moniepoint MFB, others) into shared platforms consumed as tenants. Strategic target: multi-country expansion without code duplication.

**AI-nativeness** — every platform and process embeds AI via Eywa. Claude access currently via [[Michael Afolabi]]. Eywa is the organizational nervous system connecting every function's context and AI skills; currently powered by Claude, model-agnostic.

### Core Belief Statement

Per [[Project Phoenix Initiative (compiled March 2026)]]:
> "TeamApt builds switching and processing systems that connect banks, fintechs, and regulators. TeamApt is not limited to building systems for a single bank."

This distinguishes TeamApt from being framed as "Moniepoint MFB's technology arm" — a positioning issue Phoenix is designed to structurally resolve.

### Group vs TeamApt Framing

Phoenix is a **group initiative, not a TeamApt initiative**. The central [[Platform Organization]] sits at the group level (legal home: [[Moniepoint Technologies UK]] / IPCo) and serves all business entities (OpCos — MFB, TeamApt, MonieWorld, Sumac, future countries) as tenants. TeamApt had already been building in a platformized, multi-tenant, country-agnostic way before Phoenix was conceived — a natural consequence of operating switching and processing across multiple entities and international card scheme ecosystems. TeamApt's pre-Phoenix architecture is therefore a head-start contributing to the central platform, not a precondition that Phoenix simply formalises TeamApt ownership of.

## Architecture

### Six Platform Clusters (Tosin's Project_Phoenix_v3, Mar 24 2026)

Phoenix organizes all Moniepoint infrastructure into six clusters with distinct domain accountability:

| # | Cluster | Scope |
|---|---|---|
| 1 | Business Banking Platforms | Card Acceptance & Processing, Payment Gateway (Monnify+), POS Hardware, Spend Management |
| 2 | Digital Banking Platforms | Account Payments, Money Management, VAS, Identity/Onboarding/Shell, [[Card Issuance & Processing Platform]], Cross-Border, Rewards |
| 3 | [[Moniepoint Group Transaction Switching Platform]] (TSP) | **Foundational layer** — all card, account, VAS processing routes through this |
| 4 | Credit Platforms | Credit Platform |
| 5 | Customer Platforms | Mobile/Web/POS Applications, CRM, Design System |
| 6 | Banking Operations Platforms | CBA, MonieCRM, MonieDesk, Finance Systems, Field Verification, MOOS, [[Loom]], Moniebook |

Plus a cross-cutting **Design System & UI Frameworks** layer.

### The Spine-and-Module Pattern

The governing design pattern (see [[Spine and Module Architecture]]):

| Layer | Name | Description |
|---|---|---|
| Layer 1 | TSP | Transaction Switching & Processing — foundational payment kernel; all fund movement |
| Layer 2 | Spine | Shared platform services — Authorization Engine, Card Management, 3DS/SCA, Dispute, EMV Data Prep |
| Layer 3 | Module | Market-specific adapters and config — one per market, independently deployable |

**Core invariant:** "Adding a new market means adding a Module; the Spine requires no changes."

The payoff compounds per market: Spine is proven once (Nigeria), every subsequent market inherits a battle-tested platform and only builds its Module.

### Card Issuance & Processing Platform — Layer 2 Example

CI&P is the most fully-specified Phoenix platform; it illustrates the Spine-and-Module pattern concretely.

**Spine services** (5 market-agnostic services):
- [[Authorization Engine]] — real-time approve/decline
- [[Card Management System]] — card lifecycle and program config
- [[3DS/SCA Service]] — cardholder authentication for CNP transactions
- [[Card Dispute Service]] — end-to-end dispute lifecycle
- [[EMV Data Preparation Platform]] — EMV profiles, personalisation vendor data flows

**Market Modules:**
- Nigeria — Verve + Visa adapters, personalisation vendor, BIN/config
- UK — Visa/Mastercard adapters, PSD2-compliant SCA adapter
- Kenya — Visa adapter, config

**Delivery phases:**
1. Phase 1 — Nigeria Platform Build (Spine + Nigeria Module) — **kicked off Apr 7 2026**
2. Phase 2 — Nigeria Incremental Cutover (feature-flagged with rollback)
3. Phase 3 — UK Launch
4. Phase 4 — Kenya Launch
5. Phase 5 — Additional markets (same pattern)

**Success targets:**
- Authorization latency: <500ms
- Auth reversal: <500ms
- Platform API availability: 99.99%
- New-market capability delivered via config vs. code: >80%
- Change failure rate: <5%
- Zero money-loss incidents

### What CI&P Does NOT Own (Dependency Map)

- Fund movement logic, fee calculation, posting construction → [[TSP]]
- Ledger, accounts, balances → [[Moniepoint Core Banking Application]] (CBA/Kuwego)
- AML/compliance screening → [[Loom]]
- Customer identity/onboarding → Identity/Shell
- Merchant acquiring, POS processing → Card Acceptance
- CNP collections → Payment Gateway (Monnify+)
- FX rate determination → Treasury/FX
- Lending decisions → Credit Platform

### Design Tensions in the Architecture

**Spine-immutability claim vs regulatory change risk** — the document asserts Spine is unchanged per new market. Future regulations requiring Spine-level behavioral changes (new audit rules, new approval algorithms) could force this boundary to shift. The invariant is conditional on regulators leaving authorization-core behavior unchanged.

**PSD2 as Module adapter** — UK PSD2/SCA requirements are designed as a Module adapter, not a Spine change, supporting the pattern's validity. But the Spine's 3DS/SCA Service must be generic enough to accommodate arbitrary authentication protocols — which in practice will test the boundary.

## Staffing

### Program Leadership

| Role | Person |
|---|---|
| Program Lead | [[Ravi Jakhodia]] |
| Governance | [[Tosin Eniolorunda]] (post-Stage 1) |
| AI PM Process | Romulo Braga |
| TSP Engineering | [[Alex Adeyemo]] |
| TSP Product | [[Frank Atashili]] |

### Stage 1 Workstream Assignments (per Phoenix Stage 1 Consolidated Project Plan)

**5 core workstreams** (target: end of May 2026, 2 months):

| Workstream | Lead(s) | Scope |
|---|---|---|
| CBA | — | Core Banking Architecture |
| Cosmos | — | Common infra |
| App Shell | [[Adegoke Obasa]] + [[Paul Okeke]] / [[Ope Adeyemi]] (mobile) | Application shell |
| Notifications | — | Notification infra |
| TSP | [[Frank Atashili]] (product) + [[Alex Adeyemo]] (engineering) | Foundational switching layer |

**3 head-start workstreams:**
- **Kenya Onboarding Discovery** — [[Ope Adeyemi]] + [[Emir Emanetoglu]]
- **Kenya Core Discovery** — [[Kaushal Shukla]]
- **Unified UX Framework** — [[Astrid Decrop]] brainstorm → [[Christine Fok]] to execute (Stage 2)

### Card Issuance & Processing Team Structure

Two platform engineering teams under [[Digital Banking Platforms]]:

**[[Team 1 Card Processing]]** — owns the full transaction trust surface
- [[Authorization Engine]]
- [[3DS/SCA Service]]
- [[Card Dispute Service]]
- Triad: Product Lead + Engineering Manager + Product Designer

**[[Team 2 Card Issuance]]** — owns all card issuance activities
- [[Card Management System]]
- [[Card Controls Service]]
- [[EMV Data Preparation Platform]]
- Personalisation vendor interface
- Market modules (Nigeria, UK, Kenya perso adapters)
- Triad: Product Lead + Engineering Manager + Product Designer

**Cross-team contracts:** Team 1 consumes two API contracts from Team 2 (Controls evaluation, Mobile app surfaces). Team 1 does not modify Team 2's Spine services. All cross-team dependencies are mediated through versioned API contracts.

### TSP Strike Team Structure (Alex's 4-Phase Plan, ratified Apr 9)

- **Team Spine** — [[Sulaiman Adeeyo]] EM
- **Team Adapters** — [[Sunday Ayodele]] EM
- **Tech Lead** — [[Alex Adeyemo]]
- **Product Lead** — [[Frank Atashili]]
- **Program Lead** — [[Ravi Jakhodia]]
- **Card Switching Domain Owner** — [[Ravi Veluguleti]]
- **PM** — [[Bunmi Oyefisayo]]
- **Total:** 15 people across 2 strike teams

**Critical gap:** No dedicated Moniepoint engineers on TSP despite initial commitments from Tosin and Felix. Best-effort context-sharing from [[Felix Ike]] committed. Ravi J advocating through structure (OKRs, formal sign-offs) rather than direct resource confrontation — "safer route" per Frank/Alex private read.

### MFB Cards Team Transition (Apr 14)

Per [[Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14]] and [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]:

**MFB Team 1** — PM [[Nadeem Abbas]], EM [[Elishma Nwobodo]]. Full composition TBD.

**MFB Team 2** — PM [[Damilola Oyediran]], EM [[Nitish Chand]]. 9-person engineering roster:
- Backend: Spandan Mishra, Oreoluwa Somuyiwa, Abdullah Ismail, Amar Sharma (on performance evaluation)
- QA: Oluwatosin Awodire, Ridwan Abdulazeez
- Mobile FE: Taiwo Enikuomehin
- SRE: Mohammed-Nasir Ajoge, Moshood Idris

**TeamApt-side** (Ketan Dhamasana's proposal):
- EM: [[Ketan Dhamasana]]
- 2 Backend (1 Senior + 1 Mid/Junior), 1 QA, 1 part-time UI
- Requested: [[Razaq Adegbite]] (Senior Backend) — not yet confirmed

**Business-side continuity:** [[Olufemi Davies]] continues as Cards Business Leader at Moniepoint MFB — not replaced. Tracy (CI&P Product) + Femi (MFB Cards Business) operate as co-leads under the [[Strike Team + Continuity Operating Model]].

### Leadership Triad for CI&P

| Role | Person |
|---|---|
| Head of CI&P Product | [[Tracy Ojaigho]] |
| Head of CI&P Engineering | [[Emeka Awagu]] |
| Design Lead | TBD |

The parent cluster ([[Digital Banking Platforms]]) head is TBD — Tracy does not lead the parent cluster, she leads CI&P Product specifically.

### Moniepoint Group Panel Participation

Phoenix governance runs through Group-level bodies. HoE interview panels include [[Felix Ike]] (Group CTO) and [[Tosin Eniolorunda]] (Group CEO). Cross-entity governance exerts direct influence on engineering leadership selection and Phoenix resourcing decisions.

## Execution Status

### Timeline

| Stage | Focus | Duration | Target |
|---|---|---|---|
| Stage 1 | Core capabilities + Kenya Discovery | Months 1–2 | **End of May 2026** |
| Stage 2 | All Platforms + Alpha Launch | Months 3–5 | End of August 2026 |
| Stage 3 | Beta + Commercial Roll-out | Month 6 | September 2026 |

Total: **6 months "sacrosanct" (per Tosin, Mar 27)**. Originally estimated 3 months; doubled to reduce disruption to the Nigerian product roadmap.

### Stage Gates

**Stage 1 (current):** 5 core workstreams + 3 head-starts. GitLab TSP repo live (gitlab.com/tcosmos/mpi-mfb-platform/tsp). Alex's TSP-added plan shared Apr 10 as draft. TSP dev kickoff presentation shared by Alex Apr 9.

**Stage 2 begin (June):** 4-month change freeze imposed. Only must-have exceptions approved by PM Governance Body (Tosin). Company-wide adoption of new design system + AI-native processes. Team leads own June scope definitions and transition planning.

**Stage 3:** Beta (50 business + 50 personal users, mixed internal/external), phased commercial rollout 100→500→1,000→5,000 users, feature-flag controlled.

### TSP Phase 1 Milestones (ratified Apr 9)

| Milestone | Date | Scope |
|---|---|---|
| M1 — First Live Transaction | Wk 3 — Apr 24 | PAY_OUT NG via NIP |
| M2 — Two Markets, Six Products | Wk 6 — May 15 | NG + GB |
| M3 — Full Catalogue & Ops-Ready | Wk 9 — Jun 5 | All 19 transaction types |
| M4 — Cutover Begun | Wk 12 — Jun 26 | Progressive traffic migration |

### TSP Foundation Status (Apr 10)

**Already built:**
- 15-module Maven monorepo
- 9-part LLD (21k+ lines)
- Workflow engine + state machine
- ISO 8583 stack (PostBridge/TwoBridge/IPM/Netty/HSM)
- 6 step executors
- 493 passing tests (85% line / 80% branch coverage)

**Integration landscape:** 23+ external integrations across 6 protocols
- NG: 9 rails
- GB: 7 rails
- Global + core: 7 (CBA, Treasury/FX, Loom gRPC, Visa, Mastercard, HSM, scheme clearing files)

### Card Issuance & Processing — Phase 1 Kick-Off Status

**Kicked off April 7, 2026.** Architecture in active design. Kick-off occurred during a high-operational-stress week (3 concurrent P1s, GoSubscribe war room, Easter weekend incidents) — timing reflects organizational commitment rather than capacity availability.

### Integration Problems Status (Mar 30 Frank-Ravi sync)

| # | Problem | Status |
|---|---|---|
| 1 | People (blocked on architecture) | Active (primary risk) |
| 2 | Tools (Ravi) | Deferred |
| 3 | Architecture | RESOLVED (Apr 7) |
| 4 | Overlapping Systems | RESOLVED (Apr 7) |

### Day 1 Retreat Confirmation (Apr 14, London)

Tosin publicly confirmed:
- Phase 1 TSP launch in progress (account transfers, cards, other services consolidated)
- Core platform + Phoenix design system starting across POS and web
- Phase 2 begins June — company-wide adoption
- Phase 3 — beta new app + parallel backend to "strangle" legacy, progressive cutover
- Kenya launch 2026 via [[Sumac Microfinance Bank]] acquisition
- Moneywalls → business-led platform model (business team operates, central team runs platform)
- Org split target: one configurable global product + global platform team vs country business entities

### Leadership Presentations

- **Apr 14** — Phase 1 TSP launch confirmed (Tosin + Felix)
- **Apr 9** — TSP dev kickoff (Alex)
- **Apr 7** — CI&P Phase 1 formally initiated

## The MFB Systems Blindspot

A critical strategic gap in the Phoenix analysis (per [[source — MFB Systems Blindspot Analysis]]):

**Problem:** All Phoenix platform analysis to date maps only TeamApt systems. Moniepoint MFB operates parallel infrastructure NOT in any Phoenix platform spec.

### MFB Card Infrastructure (Not in Phoenix Spec)
- **Postilion/PostCard** — ACI/Interswitch vendor-managed CMS
- **Smart Card Process** — card lifecycle
- **Safe Token** — tokenization
- **[[Card Manager Service|CMS Manager]]** — MFB-built bridge (~12-person Cards Infrastructure team under [[Olufemi Davies]])
- **Aptent** — authorization routing

### MFB Transfer/Reconciliation Infrastructure
- **[[Iris]]** — group reconciliation, 15–27B+ txn/month — recommended: **Absorb**
- **[[Atlas]]** — transfer orchestration, ~500M txn/month, 12+ downstream providers — recommended: **Evaluate**

### Critical Cross-Entity Dependency

[[Monnify]] (under [[Damilare Ogunnaike]]) uses **Iris and Atlas** rather than [[TACHA]] and [[Juliana]] — the TeamApt-owned equivalents. This is a cross-entity entanglement that Phoenix was explicitly created to eliminate, yet remains unmapped in the current platformization plan.

Resolving this requires either (a) migrating Monnify to TACHA/Juliana, (b) designating Iris/Atlas as Phoenix platforms with formal tenant boundaries, or (c) accepting the parallel infrastructure as permanent — but the decision has not been made.

### Cards Blindspot — Partial Resolution

The CI&P operational takeover of MFB Cards (Apr 14 2026) + the Apr 21 knowledge transfer from Olufemi to Tracy are the first concrete resolution of this blindspot for the card stack. The full MFB cards systems inventory (Card Manager Service + Card Transaction Service + Card OTP Service + Dispute Management Service + Digitisation Service + Card Integration Service + Apps Pay UI + Card Service + Logistics Service) is now mapped; migration strategy to the new Phoenix CMS is decided (Visa as launch workload; Postillion Elimination as primary objective; phased progressive cut-over). See [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]].

Monnify → Iris/Atlas remains unresolved.

## Eywa — The AI Layer

Organizational nervous system connecting every function's context and AI skills. Currently powered by Claude; model-agnostic by design.

### Artifact Hierarchy
Platform → Team → Capability → Feature → User Story → Acceptance Criteria

### Country/Entity Agnostic
Artifacts are scope-agnostic by design — they can describe TeamApt platforms, MFB capabilities, or Moniepoint Group-level features without schema changes.

### AI-Native Mandate
All functional managers rebuild workflows using AI (Eywa). Claude access via [[Michael Afolabi]]. Per Tosin's Feb 16–20 mandate: AI-native operations effective immediately.

### Operational Application — CI&P

See [[AI-Native Operations]]. CI&P strike team has an explicit AI-automation mandate alongside the CMS build. Priorities agreed 2026-04-21: Chargeback & Issue Resolution (highest), Logistics & Production, then general workflow automation (Jira → AI ticketing, tool evaluation led by [[Rumulo]]).

## Talent Density

Phoenix explicitly described as a "calibration moment" for talent density. Two dimensions tested primarily:
- **Customer Obsession**
- **Craft**

Three non-negotiable threshold dimensions:
- **No Ego**
- **Candor**
- **Integrity**

Per Tosin: "We will watch carefully, and we will act on what we see."

### Accountability Standards

- 99.99% minimum uptime for all core platforms
- Defined P99 latency targets
- Zero tolerance for unowned incidents
- Expanded automated test coverage
- Transparent reliability metrics

## Active Tensions

### 1. Extend vs Rebuild (Frank vs Alex Framing)

[[Frank Atashili]]'s original framing: "extend and formalize, not rebuild."
[[Alex Adeyemo]]'s endorsed position (ratified): TSP as new build from scratch — composable FinOps platform.

Alex's position won at the Apr 9 ratification. Frank now frames his role as the business-layer Product Lead running against Alex's technical delivery plan. The extend-vs-rebuild tension has resolved in favor of rebuild for TSP specifically; unclear whether the same outcome will apply to other platforms.

### 2. MFB Migration Risk

Phoenix platforms could **launch alongside** rather than **replacing** existing MFB systems, creating more duplication rather than less. This is the inverse of Phoenix's stated goal. The MFB Systems Blindspot directly manifests this risk.

The CI&P takeover of MFB Cards (Apr 14, and the full-inventory knowledge transfer Apr 21) addresses this risk for the card stack specifically — with Postillion Elimination as the explicit migration objective, Visa programme as the launch workload, and phased progressive cut-over. Monnify → Iris/Atlas remains unresolved and represents the largest remaining migration-risk surface.

### 3. Timeline Ambition vs Scope

6-month "sacrosanct" deadline vs the scope of transformation. [[source — One Platform Migration Plan Analysis]] flags specific risks in Ravi's plan:
- Ambitious timeline for scope
- Large TSP scope within Stage 2
- ~4-month change freeze impact on Nigerian revenue-driver roadmap
- Kenya underspecified at plan ratification
- Leadership transition mid-stage
- No rollback plan defined

### 4. Resources vs Mandate

No dedicated Moniepoint engineers on TSP despite initial commitments from Tosin and Felix. [[Ravi Jakhodia]] advocating through structure (OKRs, formal sign-offs) rather than direct resource confrontation. The "safer route" per Frank/Alex private read.

This is the single-largest capacity constraint on TSP Phase 1 delivery. The M1 milestone (First Live Transaction, Apr 24) is days out and depends on the current staffing level executing as planned.

### 5. Design Components Slip Risk

Flagged HIGH risk in the Stage 1 plan. App Shell workstream depends on design system components; any slip cascades into App Shell, which cascades into Stage 1 completion.

### 6. Informal Freeze Workarounds

Flagged HIGH risk. Stage 2–3 change freeze creates executive-level pressure for exceptions. The formal exception process (PM Governance Body, Tosin) requires discipline to enforce; informal workarounds would erode the freeze's protective effect.

### 7. Cross-Entity Governance Ambiguity

Phoenix is a group initiative but lives inside dual-reporting structures (TeamApt subsidiary + Moniepoint Group). Group panel involvement in HoE hiring and Tosin's direct governance of Phoenix post-Stage 1 indicates the Group operates as a visible decision surface. But the operational boundary — who signs off on what — is not explicitly decomposed in any single source page.

## Cross-Cutting Observations

### 1. Phoenix Is Multiple Programs Executing Concurrently

TSP Phase 1, CI&P Phase 1, Kenya Discovery (two streams), App Shell, Cosmos, Notifications, UX Framework — these are seven parallel workstreams in Stage 1 alone. Phoenix is not a single program; it is a program of programs, with cross-stream dependencies and shared gating.

### 2. The Sacrosanct Deadline Creates Schedule Asymmetry

Tosin's "6-month sacrosanct" framing converts the deadline into an immovable constraint. Stage durations are fixed; scope therefore becomes the relief valve. This creates a structural pressure to descope rather than extend — which is a deliberate design choice but creates a specific risk: critical scope gets deferred to Stage 2+ rather than solved in Stage 1 where it was planned.

### 3. The CI&P Spine-and-Module Is The Proof Point For The Whole Pattern

Phoenix's entire platformization claim rests on the Spine-and-Module pattern working as specified. CI&P is the most detailed Phoenix platform and will be the first to exercise the pattern at production scale. Its Phase 1 outcomes (Nigeria Spine + Nigeria Module) directly validate or invalidate the claim "Adding a new market means adding a Module; the Spine requires no changes" — which is the foundation of the entire architecture thesis.

### 4. The MFB Blindspot Is A Phoenix-Level Strategic Gap (Partially Closing)

Phoenix defines six platform clusters, but MFB infrastructure (Iris, Atlas, Postilion, CMS Manager, Smart Card, Safe Token, Aptent) is not systematically mapped to them. The CI&P takeover of MFB Cards has now started closing the cards portion of this gap (full inventory mapped Apr 21; migration strategy decided; Postillion Elimination as the explicit objective; Visa as launch workload). Monnify → Iris/Atlas remains unresolved; until that is decided, the group platformization goal is incomplete by definition.

### 5. AI-Nativeness Is Operationally Vaguer Than Platformization

The platformization goal has concrete artifacts (6 clusters, Spine-and-Module pattern, Phase plan). The AI-nativeness goal is specified at the principle level (Eywa, all managers rebuild workflows with AI, Claude access via Michael Afolabi) but lacks the same concrete execution structure. The AI PM Process (Romulo Braga) is the most specific operationalization; the broader AI-native mandate runs on top of each existing function without equivalent cluster-level design. The CI&P strike team's explicit AI mandate (Chargeback → Logistics → Jira-tool) is one of the first concrete operationalizations at the platform level.

### 6. The Integration Problems Framework Is A Useful Pattern

The Frank-Ravi Mar 30 sync surfaced 4 integration problems (People, Tools, Architecture, Overlapping Systems). By Apr 7, two were resolved; by Apr 14, one was deferred, one remained active (People). This is a clean model for tracking Phoenix-level risk: explicit problems with explicit closure gates. It could generalize to other Phoenix streams.

### 7. Phase 1 Kick-Off Timing Reflects Commitment, Not Capacity

CI&P Phase 1 kicked off Apr 7 during a week of 3 concurrent P1s, GoSubscribe war room, and Easter weekend incident backlog. The kick-off happened despite stress, not because of slack. This indicates Phoenix timelines drive action independent of operational conditions — which supports the sacrosanct deadline framing but creates quality-risk if stress compounds.

## Implications for Leadership Action

1. **TSP M1 milestone is the most critical near-term gate** — First Live Transaction Apr 24 validates the entire TSP Phase 1 thesis. If M1 slips, the downstream milestones (M2 May 15, M3 Jun 5, M4 Jun 26) compress; the Stage 1 end-May deadline starts eroding.
2. **Resolve the TSP Moniepoint engineer resourcing gap** — the highest-value single intervention. Ravi's structural advocacy (OKRs, sign-offs) is operating but slow; a direct Tosin/Felix resource commitment would materially change TSP capacity and reduce the best-effort context-sharing dependency.
3. **Formalize the MFB Systems integration plan for non-Cards systems** — the cards portion is now mapped (Apr 21). Monnify → Iris/Atlas is the clearest remaining leverage point. Phoenix cannot deliver its stated goal (eliminate cross-entity entanglement) without resolving it.
4. **Define the Phoenix rollback protocol** — flagged as an explicit gap in the plan analysis. Every phase should have an explicit rollback path, not just "feature flags." Rollback planning is a risk-reduction investment that protects the sacrosanct deadline by making partial reverts safe.
5. **Monitor the Stage 2 change freeze enforcement** — the formal exception process needs protection. Informal workarounds are the identified HIGH risk; creating a single Slack channel or Eywa artifact for exception logging would make workarounds visible and reduce ambiguity on what counts as a valid exception.
6. **Fill the CI&P Design Lead role** — the Design Lead position in the CI&P triad is TBD. With Product ([[Tracy Ojaigho]]) and Engineering ([[Emeka Awagu]]) filled, Design completion closes the triad.

## Key References

### Concept Pages
- [[Spine and Module Architecture]] — governing design pattern
- [[Card Issuance Platform]] — Layer 2 platform concept
- [[Moniepoint Group Transaction Switching Platform]] — Layer 1 foundational kernel
- [[Strangler Fig Pattern]] — migration pattern (separate synthesis exists)
- [[Platform Strategy]] — strategic framework
- [[Platform Architecture]] — technical architecture
- [[Strike Team + Continuity Operating Model]] — Phoenix transition operating model
- [[Postillion Elimination]] — CI&P strategic objective
- [[AI-Native Operations]] — operational thread of AI-nativeness

### Entity Pages
- [[Project Phoenix]] — master entity
- [[Platform Organization]] — central group-level org unit
- [[Card Issuance & Processing Platform]] — the first fully-specified platform
- [[Team 1 Card Processing]] — Authorization Engine + 3DS/SCA + Dispute Service
- [[Team 2 Card Issuance]] — CMS + Controls + EMV Data Prep
- [[Digital Banking Platforms]] — parent cluster (head TBD)
- [[MFB Cards Team]] — absorbing team on MFB side

### Program Leaders
- [[Ravi Jakhodia]] — Program Lead
- [[Tosin Eniolorunda]] — Governance (post-Stage 1)
- [[Alex Adeyemo]] — TSP Engineering Lead
- [[Frank Atashili]] — TSP Product Lead
- [[Tracy Ojaigho]] — Head of CI&P Product
- [[Emeka Awagu]] — Head of CI&P Engineering
- [[Olufemi Davies]] — Cards Business Leader at Moniepoint MFB (co-lead with Tracy on Cards)
- [[Ravi Veluguleti]] — Card Switching Domain Owner
- [[Sulaiman Adeeyo]] — Team Spine EM
- [[Sunday Ayodele]] — Team Adapters EM
- [[Ketan Dhamasana]] — Proposed TeamApt-side CI&P EM
- [[Bunmi Oyefisayo]] — TSP PM
- [[Felix Ike]] — Group CTO, context-sharing commitment

### MFB Transition Entities
- [[Nadeem Abbas]] — MFB Team 1 PM
- [[Elishma Nwobodo]] — MFB Team 1 EM
- [[Damilola Oyediran]] — MFB Team 2 PM
- [[Nitish Chand]] — MFB Team 2 EM
- [[Iris]] — MFB reconciliation platform (Phoenix blindspot)
- [[Atlas]] — MFB transfer orchestration (Phoenix blindspot)

### Source Pages
- [[Project Phoenix Initiative (compiled March 2026)]] — Frank's comprehensive planning document (Apr 10)
- [[Phoenix Stage 1 Consolidated Project Plan]] — Ravi's mastersheet companion (Apr 10)
- [[source — Project Phoenix Initiative]] — earlier comprehensive document
- [[source — Platform Strategy and Vision]] — "One Platform Many Markets" vision
- [[source — Project Phoenix Org Structure Changes (March 2026)]] — authoritative group org structure
- [[source — Org Structure Changes — Project Phoenix]] — platform-centric transition
- [[source — TSP Executive Briefing Analysis]] — TSP gaps
- [[source — MFB Systems Blindspot Analysis]] — parallel infrastructure risk
- [[source — One Platform Migration Plan Analysis]] — Ravi's Strangler Fig plan risks
- [[001-CI_P-exec-overview_v1.1]] — CI&P executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] — CI&P team structure
- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS core features
- [[TSP Phase 1 Project Plan DRAFT (Apr 10)]] — Frank's business-layer plan
- [[Ravi J Expectations and Prep (Apr 7)]] — Frank's deliverable consolidation
- [[Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14]] — transition capture
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] — full MFB cards inventory + migration strategy
- [[source — Retreat Day 1 Profitability Phoenix Kenya Competitive Strategy Summary (Apr 14 2026)]] — Tosin's public Phase 2 confirmation