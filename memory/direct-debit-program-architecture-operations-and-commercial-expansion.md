---
title: Direct Debit Program — Architecture, Operations, and Commercial Expansion
type:
  - "synthesis"
cssclasses:
  - "synthesis"
status: current
created: "2026-04-19T18:25:42Z"
updated: "2026-04-19T18:25:42Z"
summary: Cross-cutting synthesis of Direct Debit program — 3-tier architecture (CDD/AptPay/bank systems), operations doctrine and reconciliation cycle, production-issue patterns (metric-definition gaps, silent recovery, NIBSS DD P1), commercial expansion via PayFac pipeline and GoSubscribe agent-led distribution, and implications on GoSubscribe blockers, operational readiness checklist, and DD operations staffing.
---

## Scope and Purpose

The [[Direct Debit]] program is one of TeamApt's two Revenue Driver business lines and the primary commercial growth vector for 2026. This synthesis cross-cuts three axes that the concept page and individual source pages don't consolidate:

1. **Architecture** — the three-tier technical model, TACHA integration, bank-deployed components
2. **Operations** — the doctrine, reconciliation cycle, production-issue patterns, and operational discipline
3. **Commercial expansion** — the bank network growth, Payment Facilitator pipeline, GoSubscribe agent-led distribution strategy

Scope: April 2026 snapshot. The synthesis focuses on where these three axes interact — particularly where commercial expansion gets blocked by operational or architectural readiness.

## Strategic Position

### Revenue Driver Designation

Direct Debit is one of two **Revenue Driver** business lines at TeamApt (the other being [[Monnify]]). Led by [[Daniel Ojinaka]] (DD/CDD Department Lead). The two Enabler departments ([[Third Party Processing]], [[Domestic Switching]]) support revenue generation; DD itself is expected to produce growth.

### 2026 Commercial Priority

Per [[Dennis Ajalie]]'s Apr 15 CEO Strategy Deck, Direct Debit is one of **6 growth levers** in the strategy to diversify TeamApt's 86% Moniepoint revenue dependency. Specifically:
- **DD/MADD** — high-margin recurring rail; Phase 1 NIBSS BVN account linkage by June
- **[[GoSubscribe]]** — DD + niche payments on POS; agent-led distribution via 25K+ agents; DSTV/GOTV/utilities/micro-pensions/micro-health insurance

Dennis explicitly named GoSubscribe execution (alongside international card payments) as a top priority: "Aggressively push GoSubscribe working with VAS team."

### Scale Signals

- **2025 revenue** exceeded 200% of KR (Access Bank–driven)
- **2025 auth success rate**: 95.19%
- **Revenue model**: ₦17.50/transaction (₦25 merchant fee − ₦7.50 issuer fee)
- **Growth target**: 10% MoM
- **Cumulative volume milestone**: ₦1B hit Feb 2026

## Architecture

### Three-Tier Model

DD runs on a three-tier deployment model (see [[Direct Debit Architecture Specification]], [[TeamApt DirectDebit Architecture]]):

1. **TeamApt Cloud — Consolidated Direct Debit (CDD)** — Central orchestration, mandate management, reconciliation engine. The routing layer that fans out to bank-specific deployments.
2. **Bank-Deployed — AptPay Direct Debit** — Per-bank deployed components running in bank environments. Communicates with bank core systems directly.
3. **Bank Systems** — Core Banking, Email, SMS gateways at each issuing bank.

The consolidated layer sits in TeamApt Cloud; bank-specific modules fan out from it. 25 C4 diagram tabs cover the full system scope (system, container, component, sequence views).

### Key Subsystems

- **ACS (Access Control Server)** — mandate authentication / OTP
- **GoSubscribe** — subscription-layer product built on DD rails
- **SAFE (Secure Automated Fund Extraction)** — subscription and auto-payment framework
- **[[TACHA]]** — clearing and settlement backbone
- **[[Transit Account]]** — staging mechanism (Fidelity: 9020033048, Access: 1942066093, Polaris: 1790324517)

### TACHA Integration

Direct Debit is one of 5 platform consumers feeding into [[TACHA]]:
- Consumer group: `DIRECT_DEBIT`
- CDD owns the DD dispute lifecycle
- Transactions flow: DD → Kafka `taccs_transactions_approved` → Control Plane → Fee Service → Clearing Service → Settlement Workflow → bank APIs
- Settlement cadence: T+1 via 4 daily windows (05:00, 09:00, 12:00, 15:00 WAT)

### Integration Pattern Per Bank

Each bank integration maintains:
- Dedicated transit account at the bank
- Bank-specific TACHA participant configuration, file format, response code mapping
- Settlement flow unique to the bank (different for Fidelity, Access, Polaris)
- AptPay Direct Debit bank-deployed module at the bank environment

**This per-bank customization is the primary friction in commercial expansion** — each new bank requires its own integration cycle, security review, VPN provisioning, and test environment access.

## Products

### MADD — Mandate-Based Direct Debit

The core product. Merchants/billers create mandates against customer accounts; debits execute on scheduled cycles without per-transaction customer action. Primary use cases: subscription billing, utility payments, insurance premiums.

### GoSubscribe — Subscription Layer on DD + POS

Launched 2026 as the primary commercial growth vehicle. Two channels:
- **GoSubscribe Web** — MVP reached 100% feature completion Q1 2026, passed security/QA review
- **GoSubscribe POS** — recurring direct debit subscriptions via POS terminals

**Agent-led distribution strategy** (per Dennis strategy deck): 25K+ agents distribute GoSubscribe for niche payment verticals — DSTV/GOTV, utilities, IPOs, micro-pensions, micro-health insurance for the informal sector.

**Current bank coverage**: Zenith Bank and Wema enabled on ATS for GoSubscribe. CEO asked for expansion beyond these two on April 1.

### SAFE — Secure Automated Fund Extraction

Subscription and auto-payment framework. Less documented in the brain; appears as a named product alongside MADD and GoSubscribe.

## Bank Network

### Live Integrations

| Bank | Status | Notes |
|---|---|---|
| [[Fidelity Bank]] | Live | Production deployment complete; 3,000+ pilot transactions; bank + ACT client |
| [[Access Bank]] | Live | Primary DD volume driver (2025 200% KR beat) |
| [[Polaris Bank]] | Live (reconciliation **suspended**) | Recorded exposure; reconciliation suspended per doctrine |

### Near-Production

| Bank | Status | Blocker |
|---|---|---|
| [[Keystone Bank]] | 90% deployed | Blocked by bank's mobile app store deployment |
| [[FCMB]] | ACS connector replacement in progress | MFA enrollment for VPN access confirmed |
| [[Zenith Bank]] | Integration active | — |
| [[Wema Bank]] | Integration active | ACS upgrade stalled at 35% (lack of test server access) |

### Pipeline

| Bank | Status |
|---|---|
| [[GTBank]] (via [[Habari Pay]]) | D2B integration deployed Apr 2026 |
| Premium Trust | Issuing bank partner |
| Stanbic | Under ATS RC91 recurring pattern |
| Union | DD access granted Apr 16; Cosmos blocker pending |

### Cross-Cut with RC91 Pattern

Multiple DD-integrated banks are simultaneously in the [[RC91 Multi-Bank Failure Pattern]] — this is the clearest cross-cutting operational issue. A bank can be a DD integration partner AND an ATS RC91 cycle participant simultaneously (Stanbic, Access, Fidelity, FCMB, Union, Wema all fit this profile). DD operational readiness and ATS operational readiness are entangled at the bank-relationship layer.

See the parallel synthesis: [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]].

## Operations

### Ownership

- **Department Lead**: [[Daniel Ojinaka]]
- **Operations Lead**: [[Mariam Davies]] (reports to [[Tolulope Obianwu]]) — leads CDD + GoSubscribe ops; **three vacant officer roles** below her
- **Engineering Lead**: [[Yasir Syed Ali]] — owns Direct Debit production issues weekly analysis
- **Weekly Progress Owner**: [[Idris Aliyu]] — coordinated by [[Nancy Muorah]]; meetings moved to Mondays to combine with ATS
- **Reconciliation Doctrine Author**: Tolulope Obianwu ([[Direct Debit Operations Readiness Doctrine]])

### Reconciliation Doctrine (Formalized Mar 2026)

The [[Direct Debit Operations Readiness Doctrine]] is the authoritative ops reference. Key elements:

- **T+1 settlement**: transactions initiated Day T settle Day T+1 via TACHA
- **Per-bank transit accounts**: stage funds between mandate execution and final posting
- **Daily reconciliation**: against TACHA settlement reports; mismatches escalated within 24 hours
- **Exception handling**: failed mandates categorized (insufficient funds, account closed, mandate revoked) and routed to retry or write-off queues
- **Exception SLA**: 48 hours
- **Bank-specific flows**: each bank has its own TACHA participant config, file format, response code mapping

This doctrine was explicitly called out as **the first operations doctrine formalized under Tolulope's team** — it became an evidence point in the PIP process (positive signal: doctrine approved by Daniel Ojinaka on Mar 30).

### Production-Issue Cadence

Weekly production issues analysis meeting led by [[Yasir Syed Ali]]. Apr 2026 meetings (full detail on individual source pages):

| Date | Key Topics |
|---|---|
| Apr 2 | Cron job for pending transactions; auto-reversal architecture; OTP delivery via email; response code harmonization |
| Apr 9 | Metric alignment (approval vs success rate); reporting discrepancies; latency from external bank connectivity; synchronization deadlock fix |

### Current Production Decisions (Apr 2026)

**Pending transaction threshold**: Cron job on consolidated side requeries bank after 10-minute threshold; marks transaction failed if no success response.

**Auto-reversal**: 3-month window. Mechanism designed to return funds from transit account to customer on transaction failure.

**OTP delivery**: Evaluating email OTP as primary channel with SMS fallback for customers without registered email.

**Response code harmonization**: In progress across bank integrations.

**Synchronization deadlock fix**: Awaiting deployment (Apr 9 standup).

**Security vulnerability remediation**: Ongoing for bank-deployed components (part of [[DCIR Security Vulnerabilities]] cluster).

### Team Composition (per Q2 OKR Planning)

- 2 Product
- 1 Engineering Manager
- 9 Engineers
- 2 QA
- **Open role**: APM

The team composition is capped — adding bank integrations or product features against a fixed engineering headcount creates the tension between commercial expansion pace and operational stability.

### Metric Alignment Gap

Per [[Direct Debit Production Issues Weekly Analysis 2026-04-09]]: the team explicitly worked to clarify the distinction between **approval rate** and **success rate**, and to isolate customer-induced failures from system-side failures. This metric-alignment work indicates that until Apr 9 the operational dashboard was reporting conflated metrics — a reporting-definition gap that undermines operational visibility.

### Operational Readiness Checklist Gap

Per [[AptPay Direct Debit - OKR Planning Q2 2026]]: "Monitoring and operational ownership must be defined before go-live — proposed operational readiness checklist as forcing function."

This is an explicit acknowledgment that DD has historically gone live without formal operational readiness definition. The forcing-function proposal moves this from a behavioral commitment to a structural gate.

## Active Production Incidents

### NIBSS DD Pending Mandate P1 (Apr 14 — Retired Apr 16)

Per [[NIBSS DD — Pending Mandate P1 Active]]:
- **Filed**: 07:05 WAT Apr 14 (incident start 03:00 WAT) by Frances Omelu
- **Symptom**: High count of pending mandate creation requests returning Null errors
- **Root cause (named)**: NIBSS-side — "From NIBSS" per incident filing
- **Blast radius**: Same upstream disruption delayed wallet-to-bank disbursements on [[Monnify]] at 03:15 WAT (same night)
- **Temporal concurrence**: DCIR/Wema 100% transaction failure episode 01:05→03:50→04:06 WAT — plausibly same upstream NIBSS root cause
- **Resolution pattern**: Silent recovery — retired 47h+ after last update, implicit-resolved without human closure. Same structural defect as DCIR/Wema pattern.

**Structural issue**: "Silent recovery without human closure" is a recurring operational pattern across DD and ATS incidents. It means the team does not reliably produce retros when NIBSS-side issues recover — a learning/institutional-memory gap.

### TDSD-6437 — DD NIBSS Compound Failures

Formally tracked per [[Direct Debit Program]] entity page. DD-specific NIBSS failures distinct from the standard RC91 pattern.

### Stanbic RC91 (Overlapping with DD)

Stanbic Bank has both an ATS RC91 recurring pattern (30 genuine cycles Apr 3–18, bank-owned) AND is a DD-integrated bank. Cycles affect DD transaction routing when they intersect DD-relevant windows.

## Commercial Expansion

### Payment Facilitator (PayFac) Pipeline

DD distribution happens through Payment Facilitators — intermediary platforms that aggregate merchants. PayFac status (per [[AptPay Direct Debit - OKR Planning Q2 2026]]):

| Facilitator | Status |
|---|---|
| [[CowryWise]] | **Live** — first DD merchant; bullish on DD as future payment rail |
| [[Paystack]] | Active engagement; Moniepoint product team level |
| [[GlobalPay]] | Deprioritized — shifted attention to other projects |
| [[LendSqr]] | **Blocked integration** — cited insufficient banks in TeamApt network |
| Cyberpay | Pipeline |
| [[Habari Pay]] | Active (GTBank path) |
| [[Kora Pay]] | Pipeline |
| Quidax | Pipeline |
| Mono | Pipeline |

**LendSqr's block is strategically important**: it identifies bank network coverage as the limiting factor for PayFac adoption. PayFacs need enough banks in the network to serve their merchant base; when coverage is below threshold, they won't integrate. This ties commercial expansion back to bank-integration velocity.

### The Integration ≠ Activation Lesson

From 2025: **20 billers onboarded but 0% actively transacting.**

This is the single most-referenced learning across Daniel Ojinaka's pages and the Direct Debit Program concept. Onboarding a biller does not produce revenue; activation requires post-onboarding operational work (bank configuration, mandate UX testing, biller-side integration completion, agent training where applicable).

The Q2 OKR planning explicitly calls out this gap: **monitoring and operational ownership must be defined before go-live**. The forcing-function response is the operational readiness checklist (still proposed, not yet implemented).

### GoSubscribe Commercial Trajectory

Per the Dennis strategy deck, GoSubscribe is positioned as the agent-channel distribution of DD into niche verticals. Target verticals imply large transaction counts at small individual amounts — DSTV/GOTV, utilities, micro-pensions, micro-health insurance for the informal sector.

**Current blockers** (per [[GoSubscribe]]):
1. RC91 routing config reverting — Abeeb Ola's patch not holding; structural fix required
2. POS amount hardcoded at NGN100 — backend API must return actual debit amount dynamically
3. Receipt generation fix — PR awaiting merge + retest

These blockers directly prevent GoSubscribe production rollout. The production-readiness gap sits between the commercial priority (one of Dennis's top 2 execution priorities) and current engineering state.

### Competitive Context

[[Paystack]] engaged Moniepoint's product team on DD specifically in early April 2026. This is a commercial signal — Paystack either considers DD a competitive threat or a partnership opportunity. Context note: Paystack halted ₦4.4B during the Apr 5 Easter P1, exposing Paystack operational capacity limits that are relevant to the competitive frame.

## Financial Performance

### 2024

- **0→1 bank live by mid-year** (target was 7) — extremely slow progress
- **Sprint velocity**: 50.5% (vs 100% target)
- Revenue largely from DCIR; DD was in early deployment

### 2025

- **Revenue exceeded 200% of KR** — driven by Access Bank
- **Auth success**: 95.19%
- **20 billers onboarded, 0% actively transacting**
- **Cumulative volume milestone**: ₦1B hit Feb 2026

### Q1 2026 Accomplishments (per OKR Planning)

- **Project Phoenix deployed in CDD** with retry mechanisms — reduced failed/pending mandate activations
- **ACS Challenge UI** delivered as fully responsive and embeddable
- **GoSubscribe Web MVP** 100% feature complete; security/QA review passed
- **Fidelity production deployment** complete (3,000+ pilot transactions)
- **Keystone Bank deployment 90%** (blocked by bank app store)
- **100% unit test + automated E2E test coverage** across all DD services
- **Harness migration** completed for CI/CD

### Q1 2026 Gaps (per OKR Planning)

- **Automated tests as CI quality gates**: 0% achieved
- **Canary deployments**: 0% achieved
- **Deployment standardization (Dev/UAT/Prod)**: not achieved
- **ACS upgrade to Access/Wema/FCMB**: stalled at 35% (test server access gaps)
- **DevRel sandbox**: blocked — security team reluctant to expose APIs to internet
- **Bank-side deployment eliminating ₦50 mandatory charge**: 50% (deployed in 2 of 3 banks)

## Cross-Cutting Observations

### 1. Commercial Expansion Is Bottlenecked by Bank-Integration Cycle Time

Every new DD bank requires a full integration cycle: security review → VPN provisioning → test server access → bank-deployed module setup → TACHA participant config → transit account establishment → UAT → production. The cycle time varies per bank but runs in weeks-to-months. This bottlenecks the PayFac pipeline (LendSqr blocked on bank count) and GoSubscribe bank expansion (CEO asked for beyond Zenith/Wema Apr 1 — still in progress).

### 2. The Integration ≠ Activation Gap Is Structural

Onboarding without activation wastes sales/partnerships capacity. The proposed operational readiness checklist as a forcing function is the right structural response, but has not been implemented. Until it is, the 2025 0% activation pattern can recur on each new biller cohort.

### 3. Metric Definition Discipline Is A Recurring Weak Point

Metric alignment for approval vs success rate (Apr 9) indicates that until that date the team operated with conflated metrics. The broader [[Jira-documentation-discipline gap]] pattern identified in other syntheses recurs here: the DD team has similar definitional discipline gaps that undermine operational visibility.

### 4. Silent Recovery Is A Systemic Post-Incident Pattern

Both the NIBSS DD P1 (retired Apr 16 after 47h+ silence) and multiple ATS RC91 cycles show the same "silent recovery without human closure" pattern. This produces learning gaps: the team does not reliably extract why an incident resolved, which prevents pattern-level remediation.

### 5. GoSubscribe Execution Risk Is Disproportionate To Its Strategic Importance

GoSubscribe is one of Dennis's top 2 execution priorities (alongside international card payments). Yet its current production state is blocked on three specific issues (RC91 routing revert, POS amount hardcoding, receipt generation PR) that each require engineering resolution. The gap between strategic importance and production readiness is the single largest DD-specific risk.

### 6. Mariam Davies's Vacant Officer Roles Are A Capacity Signal

[[Mariam Davies]] as DD Operations Lead has **three vacant officer roles below her**. This is a structural understaffing in DD operations against an expanding bank network and PayFac pipeline. The operational load per existing officer grows with each new integration.

### 7. Fidelity's "Live in Production + ACT Client" Dual Status Is Unusual

Fidelity is simultaneously a live DD integration partner AND an ACT (Acquirer Card Transaction) client of TeamApt. This dual relationship means Fidelity sees TeamApt as both a service provider AND a customer — which creates commercial leverage dynamics different from other bank integrations. Worth tracking as a relationship template.

### 8. The Phoenix Deployment in CDD Is A Proof Point

Project Phoenix deployment with retry mechanisms reduced failed/pending mandate activations in Q1 2026. This is one of the earliest concrete outcomes of Phoenix architectural work visible in production DD metrics — a small but real signal that Phoenix infrastructure is delivering against its reliability targets.

## Implications for Leadership Action

1. **Close GoSubscribe's 3 production blockers as near-term priority** — CEO has named this a top-2 execution priority; the gap between strategic importance and production readiness is the single largest DD risk. RC91 routing config structural fix is the highest-leverage item.
2. **Implement the operational readiness checklist** — the 2025 "20 billers, 0% transacting" lesson has a named structural remedy. Moving from behavioral commitment to a forcing-function gate prevents pattern recurrence. This is bounded work with clear ownership (Mariam Davies, Yasir Syed Ali).
3. **Resolve the DD Operations officer vacancy** — 3 vacant officer roles under Mariam Davies represents structural understaffing against an expanding surface. Either fill or explicitly cap DD operations scope to current capacity.
4. **Close the silent-recovery pattern with mandatory retros** — the NIBSS DD P1 and DCIR/Wema episodes both show the same "resolution without retro" pattern. A cross-team rule requiring retros within 72h of silent-resolved incidents would close this gap.
5. **PayFac network coverage as a first-class metric** — LendSqr's "insufficient banks" block suggests a coverage-threshold that isn't explicitly tracked. A metric like "% of target PayFac partners with integration-viable bank coverage" would surface this.
6. **Define the Polaris reconciliation suspension exit criteria** — Polaris is marked as live but with reconciliation suspended due to recorded exposure. This is an ambiguous state — it's not fully operational and isn't fully shut down. Either define exit criteria to resume or make the suspension explicit in the doctrine.
7. **Track the Phoenix-in-CDD outcome** — the deployment reduced mandate activation failures; measuring the magnitude (before/after comparison) would provide one of the first concrete Phoenix ROI data points in production.

## Key References

### Concept Pages
- [[Direct Debit]] — comprehensive concept page (newly created)
- [[Direct Debit Program]] — original concept page
- [[GoSubscribe]] — subscription product on DD rails
- [[Transit Account]] — staging account structure
- [[Revenue Leakage Prevention]] — ops KPI affecting DD
- [[ACS (Access Control Server)]] — mandate authentication

### Entity Pages
- [[Daniel Ojinaka]] — DD/CDD Department Lead
- [[Mariam Davies]] — DD Operations Lead
- [[Yasir Syed Ali]] — Engineering lead, weekly ops
- [[AptPay]] — DD product team
- [[TACHA]] — clearing and settlement backbone
- [[CowryWise]] — first live DD merchant
- [[Paystack]] — competitive engagement
- Banks: [[Fidelity Bank]], [[Access Bank]], [[Polaris Bank]], [[Keystone Bank]], [[FCMB]], [[Wema Bank]], [[Zenith Bank]], [[GTBank]], [[Union Bank]]

### Source Pages — Operations
- [[Direct Debit Operations Readiness Doctrine]] — Tolulope's formal doctrine
- [[Direct Debit Architecture Specification]] — 3-tier architecture
- [[TeamApt DirectDebit Architecture]] — C4 architecture
- [[Direct_Debit_End_To_End_Reconciliation_Process_Flow]] — end-to-end process

### Source Pages — Production Issues
- [[Direct Debit Production Issues Weekly Analysis 2026-04-02]]
- [[Direct Debit Production Issues Weekly Analysis 2026-04-09]]
- [[Direct Debit Production Issues Weekly Analysis 2026-04-02 Gemini Notes]]
- [[Direct Debit Production Issues Weekly Analysis 2026-04-09 Gemini Notes]]
- [[Direct Debit Weekly Progress Update 2026-03-31]]

### Source Pages — Strategy & Planning
- [[AptPay Direct Debit - OKR Planning Q2 2026]] — Q1 review + Q2 roadmap
- [[source — TeamApt Strategy Retreat 2026 CEO Deck (Dennis Ajalie, Apr 15)]] — 6 growth levers

### Situation Pages
- [[NIBSS DD — Pending Mandate P1 Active]] — retired Apr 16

### Related Syntheses
- [[Bank Integration — RC91 Patterns, Failures, and Operational Posture]] — parallel synthesis on bank integration layer that heavily affects DD operations
- [[Engineering Leadership — Hiring, Capacity, and Performance Patterns]] — includes Tolulope Obianwu PIP which bears on Mariam Davies's reporting line and DD ops staffing
- [[Project Phoenix — Architecture, Staffing, and Execution Status]] — Phoenix deployment in CDD is one outcome visible in DD production metrics
