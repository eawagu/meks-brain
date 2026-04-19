---
title: Engineering Leadership — Hiring, Capacity, and Performance Patterns
type:
  - "synthesis"
cssclasses:
  - "synthesis"
status: current
created: "2026-04-19T17:56:33Z"
updated: "2026-04-19T17:56:33Z"
summary: Cross-cutting synthesis of engineering leadership at Moniepoint/TeamApt — role definition (VPs as business-unit CTOs), executive triad (CEO/CPO/CTO), active HoE search with 4 candidates and 2 batch deliberations, Tolulope PIP case as canonical ambiguous-PIP pattern, Phoenix-driven engineering leadership restructuring, and implications for the HoE search, Monnify EL gap, documentation discipline, and dual reporting clarification.
---

## Scope and Purpose

This synthesis covers engineering leadership at Moniepoint/[[TeamApt Limited]] as a system: the role expectations, the executive triad that sets those expectations, the capacity-allocation patterns across the org, the active hiring pipeline, and the performance-management signals (PIP cases, accountability exchanges) that indicate where the model is under strain.

Scope: 2026 Q1–Q2 snapshot. Sources concentrated around the Q1 strategy retreat, Head of Engineering hiring batches (Apr 1, Apr 10), the Tolulope Obianwu PIP process, and the ongoing Phoenix transition that is restructuring which engineering leaders sit where.

## Role Definition

### "VPs of Engineering = Business Unit CTOs"

Moniepoint's explicit framing (see [[Engineering Leadership]]): Heads of Engineering / VPs of Engineering are treated as **CTOs of their business unit**. The expectations extend beyond traditional engineering management:

- Technical depth across the full stack — mobile, web, FE, BE, infra, DevOps
- Scaling experience — teams, systems, throughput
- Team design and org structure ownership
- Culture alignment
- Cross-functional partnership with the business head of the unit

This framing shapes the interview rubric (see Deliberation sources below) and the bar for the active Head of Engineering search.

### Director-Level Calibration (per Apr 1 Deliberation)

The Apr 1 Head of Engineering batch deliberation (source 220 / 272) produced a specific calibration adjustment: **LLD (Low-Level Design) removed from Round 1 scorecards**. For director-level roles, Round 1 should focus on trade-offs, failure points, and high-level architectural thinking — not code-level specificity.

This calibration was driven by an observed pattern: interviewers were rejecting director-level candidates for LLD weaknesses that don't differentiate at that seniority. The correction refocuses the signal on strategic/architectural judgment.

**Resume inflation patterns** were also explicitly called out at the Apr 1 session — a recurring concern that the paper profile overstates the operating experience.

## The Executive Context

Engineering leadership at TeamApt sits within a triad executive structure that shapes where engineering accountability lands:

| Role | Person | Scope |
|---|---|---|
| CEO | [[Dennis Ajalie]] | TeamApt Ltd strategic leadership; reporting line for CTO |
| CPO/COO | [[Frank Atashili]] | Product Division — 7 division-level OKRs across 4 businesses |
| CTO | [[Emeka Awagu]] | Technology Operations division — 6 accountability areas including "Right People in Right Seats" |
| Group CTO | [[Felix Ike]] | Moniepoint Inc. dotted-line for Emeka; interviewer on HoE panels |

Engineering leaders (Heads of, EMs) sit under the CTO. Business leads (Department Leads for DD, Monnify, TPP, Domestic Switching) sit under the CPO/COO. The **dual reporting model** is acknowledged as a known ambiguity surface — particularly at the Mek/Frank interface.

### Business-Line Leadership (Peers to CTO)

The four business-line leaders below each operate with significant engineering leadership authority within their vertical:

| Business Line | Lead | Engineering Footprint |
|---|---|---|
| [[Direct Debit]] (DD/CDD) | [[Daniel Ojinaka]] | Direct Debit platform, ACS, GoSubscribe, SAFE |
| [[Monnify]] | [[Damilare Ogunnaike]] | Monnify Gateway, Loom, Limit Engine, MPGS; ~116 staff |
| [[Third Party Processing]] | [[Tracy Ojaigho]] | Aptent, ACT, EMV Data Prep, Rsync CMS; designated CI&P Platform lead |
| [[Domestic Switching]] | [[Babatunde Okufi]] | Juliana, ATS, TACHA; CBDO title |

Tracy Ojaigho's dual role (TPP lead + [[Card Issuance & Processing Platform]] lead under Phoenix) is the clearest example of a business-line lead carrying heavy engineering platform accountability.

## The Active Head of Engineering Search

### State (as of Apr 2026)

An open HoE role, active batch interviewing. The role is scoped to a "central product vertical" — likely product engineering, not infrastructure.

### Candidate Pipeline

| Candidate | Status | Signal |
|---|---|---|
| Unnamed (ex-Grab), VP+ | Rejected (Apr 1) | "Lacked depth" — failed calibration at VP level |
| [[Smit Parsania]] | No-hire (Apr 1) | Failed Apr 1 deliberation |
| [[Varun Singh]] | Interviewed Apr 8, deliberation Apr 10 | Assessed as central product vertical; no decision recorded |
| Other candidates | Apr 10 batch | Gemini transcription failed; minimal record |

### Interview Panel

The Apr 10 session (source 277 / 221) convened: [[Chris Purkis]] (facilitator), [[Pavan Venkatesan]], [[John Ojetunde]], [[Felix Ike]] (Group CTO), [[Oloruntoba Ojo]], [[Alex Adeyemo]], [[Tosin Eniolorunda]] (Group CEO), [[Rahul Goel]], and others. The panel composition indicates cross-entity governance — both TeamApt and Moniepoint Group leadership participate.

### The Gemini Transcription Gap

The Apr 10 deliberation has **no usable content** — Gemini transcription failed after 1m49s due to "insufficient conversation in a supported language." This is a structural recording gap: a key hiring decision session has no written record that can be referenced downstream. Transcript and recording exist in Drive but are not text-searchable in the brain.

This is the second independent data point in 2026 Q2 that **documentation discipline for important decisions is structurally thin** (the first being [[Yasir Syed Ali]]'s Apr 15 flag that Jira tickets are missing key operational context).

## The CTO Accountability Framework

[[Emeka Awagu]]'s role is formally structured around six accountability areas ([[accountabilities]]):

1. **Technology Reliability & Security** — incidents, MTTR, security posture, P95 API response
2. **Technology Scales Ahead of Business** — roadmap alignment, scheme/product/market readiness
3. **Right People in Right Seats** — leadership seats filled at H Threshold, active performance management, OKR cascade
4. **Clear Structure & Decision Rights** — dual reporting model managed, cross-domain decision ownership
5. **Context & Institutional Memory** — documentation, knowledge transfer, AI-assisted operations
6. **Goals Cascade Correctly** — OKRs cascade from TeamApt goals through all Technology Operations pillars

Accountability area 3 ("Right People in Right Seats") is the direct mandate under which the HoE search, PIP processes, and performance management activity all sit. The framework makes engineering leadership turnover and calibration a first-class CTO responsibility.

### CEO Scorecard Footprint

Per [[CEO KPI Scorecard]] (FY2026), the CTO-owned KPIs within the 15% Technology Excellence category amount to ~11% direct weight:
- Platform Uptime & Reliability (6%)
- Operational Efficiency & SLA Compliance (5%)
- Cybersecurity Posture (4%) — flows elsewhere, not CTO
- Product Innovation Pipeline (6%) — flows to CPO
- Platform modernisation / Phoenix — flows to separate Platform Org

Emeka's Apr 15 self-assessment (note_2026-04-15T11-42-42-517Z): this is a **keep-the-lights-on mandate** with no build/evolve component — by design given Platform Org + CPO structure. CEO scorecard structurally treats engineering as a utility at "meets expectations" level. Proposed revisions: raise platform uptime "meets" bar from 99.9% to 99.95%; add per-category floors to SLA compliance to prevent composite masking.

## Engineering Pillars (The Direct-Report Map)

Under the CTO sit seven engineering pillars. Each pillar head reports to Emeka directly:

| Pillar | Head | Scale Signal | Risk |
|---|---|---|---|
| Enterprise Engineering | [[Ravi Kiran Veluguleti]] | Largest pillar | — |
| Core Operations | [[Tolulope Obianwu]] | Double load; on PIP | Highest transition risk |
| SRE | [[Oladapo Onayemi]] | Platform reliability; RC91 RCA lead | — |
| Infrastructure | [[Tolu Aina]] | Foundation layer | — |
| Data Engineering | [[Abayomi Ojamomi]] | Smallest pillar | Highest SPF risk |
| Dev Relations & Integrations | [[Muhammad Samu]] | External-facing | — |
| Information Security | [[Lateefat Adedeji-Oyedeji]] (BISO) | Compliance intersection | — |

Two distinct risk profiles jump out:

- **Core Operations (Tolulope)** — "double load" + PIP = the seat is structurally stressed. A PIP outcome against the incumbent creates an immediate seat-fill pressure.
- **Data Engineering (Abayomi)** — "highest SPF risk" due to smallest pillar. A single-person failure costs the pillar.

## The Tolulope Obianwu PIP Case

### Timeline

| Date | Event |
|---|---|
| Mar 10, 2026 | PIP document created |
| Mar 17, 2026 | Performance review (Dennis, Mek, Constance, Tolu — 1h14m) |
| Mar 23, 2026 | PIP issued by [[Constance Onyeji-Jarret]] (People Ops Lead) |
| Mar 24 – Apr 21, 2026 | PIP period (28 days) |
| Mar 30, 2026 | Frank Atashili accountability challenge — failed response |
| Apr 2, 2026 | Frank publicly closed the challenge — "thanks @Tolulope well done" |
| Apr 3, 2026 | Frank-Tolulope accountability exchange referenced |
| Apr 7–13, 2026 | Bereavement leave |
| Apr 14, 2026 | PIP posture decision due on return from leave |

### PIP Areas (per [[pip-documentation]])

Five focus areas:
1. Leadership, team engagement, and psychological safety
2. Accountability
3. Operational ownership
4. OKR approval
5. Operations doctrine delivery, settlement engine bank relationships, and cross-functional CSAT targets

Grounded in Q3 2025 Manager Effectiveness Survey + Q4 2025 Upward Feedback Report.

### Seat Context

Tolulope sits at **Job Level III in a Level IV seat** (per [[tolu]]). This is the clearest documented case in the brain of a seat-level mismatch driving performance friction. It's not purely individual capability — the seat has been operating above the current holder's grade.

### Performance Signals — Calibrated Both Ways

**Negative signals:**
- RC91 structural assessment undelivered (delegated to Oladapo but linked to Core Ops)
- OKR submission 4+ days overdue Apr 6
- Frank accountability challenge initially unanswered (Mar 30)
- Late responses to escalations

**Positive signals:**
- OKR template confirmed adopted (Mar 30)
- First operations doctrine (Direct Debit Operations Doctrine) formalized — approved Mar 30 by Daniel Ojinaka
- Frank's public endorsement Apr 2 partially offsets prior signals
- Defended posture with evidence on the accountability challenge

This is the canonical "ambiguous PIP" pattern — not obviously terminating, not obviously recovering. The posture decision on Apr 14 was the forcing-function gate.

### Direct Reports Under Tolulope

Seven direct reports tracked in the PIP context:
[[Temitope Osinowo]] (Monnify Settlement & Recon), [[Mariam Davies]] (DD Ops Lead), [[Goodness Orji]] (PTSP Lead), Yimika (TPP Ops Lead), Veronica (Monnify Customer Support), Emmanuel (Monnify Ops Lead), Dami (Domestic Switching Ops Lead).

A PIP exit would trigger succession planning across all seven scorecards.

## Performance Management Patterns

### The Frank-Tolulope Exchange as a Template

The Mar 30 – Apr 2 exchange is instructive as a pattern:

1. **Frank surfaces accountability gap publicly** (Mar 30, Slack) — asks for evidence on the Moniepoint retrieval reference sync delay
2. **Tolulope's initial response lags** — escalation signals to the People Ops chain
3. **Evidence-based defense materializes** — Jira links, timeline, interim solution
4. **Public close** — Frank endorses the resolution (Apr 2, 21:54 WAT)

This is performance accountability operating as a **public semi-formal mechanism** — not a closed-door 1:1, but also not a formal HR process. It exists as a layer between informal feedback and the PIP process.

### Lattice Performance Review (Apr 10 Deadline)

[[Oladapo Onayemi]]'s review: deadline Apr 10. [[Tolulope Obianwu]]'s review: deadline Apr 10. Both in CTO's manager queue. Tolulope's manager review unlocked after all peer reviews submitted (window closed Apr 10).

Lattice is the tooling layer for the routine performance management cycle. It runs concurrent with the PIP mechanism but does not replace it.

## Capacity-Allocation Patterns

### Engineering Manager Resignation at Monnify

Noted at MANCo (Apr 2026). Damilare Ogunnaike's Q1 business needs (per strategy retreat deck):
- Product Growth Partner (merchant lifecycle)
- Product Managers
- **Engineering Lead**

The Monnify engineering leadership gap is therefore known and currently unfilled. Against a department that produced ₦8.29B FY2025 revenue (Monnify is the largest of the four business lines), this is a first-order capacity constraint on Moniepoint's largest revenue driver.

### Phoenix as a Structural Capacity Shift

The [[Project Phoenix]] restructuring is moving engineering leadership seats around:

- **Tracy Ojaigho** — TPP lead + CI&P Platform lead (dual scope)
- **MFB Cards teams** — being absorbed under Tracy + Emeka via the [[Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14]] note
- **[[Ketan Dhamasana]]** — proposed EM for TeamApt-side CI&P team
- **[[Nadeem Abbas]] + [[Elishma Nwobodo]]** — MFB Team 1 PM/EM carrying through transition
- **[[Nitish Chand]]** — MFB Team 2 EM with 9-person roster; [[Amar Sharma]] on performance eval

Phoenix is doing two things simultaneously: creating new engineering leadership surfaces (CI&P Platform) and putting pre-existing MFB engineering leaders under new reporting lines. This is where the "Right People in Right Seats" accountability interacts with Phoenix execution most directly.

## Cross-Cutting Observations

### 1. The HoE Search Is a Signal of Pipeline Thinness

Four known candidates, two no-hires after one batch, unclear status for Varun Singh, Gemini-failed Apr 10 record. This is a slow-closing search. For a central product vertical at a fintech group of Moniepoint's scale, the pipeline density should be higher. Either the bar is genuinely very high (consistent with the "VPs as business-unit CTOs" framing) or the sourcing funnel is weak.

### 2. The PIP-as-Process Has Structural Gaps

The Tolulope case exposes pattern features that apply beyond her specific situation:
- **Mid-process bereavement**: 7-day leave inside a 28-day PIP window — the process lacks explicit guidance on how the PIP clock handles absence
- **Public accountability exchanges running parallel**: Frank's Mar 30 challenge and Apr 2 close operate outside the PIP's formal evidence trail, creating signal ambiguity
- **Level mismatch as root cause**: the seat-vs-grade mismatch predates the performance issues; this is a structural issue that a PIP can't fix

### 3. Documentation Discipline Is the Recurring Weak Point

Three independent signals in Q2 2026:
- Yasir's Jira ticket capture gap (Apr 15)
- Gemini transcription failure on Apr 10 HoE deliberation
- Brain entity-page staleness cohort at 2026-04-11 (68 pages 3+ days stale — the ingest pipeline failure from the Apr 19 lint report)

These are the same structural issue at three different layers: **write-through from live decisions to durable records is unreliable across multiple tools**. This affects engineering leadership specifically because hiring decisions, performance outcomes, and org changes are all high-context and low-reproducibility events.

### 4. The Dual Reporting Model Is the Highest-Ambiguity Design Feature

The Mek/Frank interface (CTO/CPO) is explicitly flagged as ambiguous. Frank's product division covers the business-line leads; Emeka's technology operations division covers the engineering pillars. Cross-domain decisions (Monnify engineering hiring, TPP Platform leadership, DD reliability) all land in the ambiguity zone. The model works when executives coordinate well; it is structurally prone to contested ownership.

### 5. Group vs Subsidiary Leadership Governance

HoE interview panels include [[Felix Ike]] (Group CTO) and [[Tosin Eniolorunda]] (Group CEO). Engineering leadership hiring is not purely a TeamApt decision — the Group exerts influence via panel composition. This governance matters for the HoE search and also for Phoenix, where Group-level platformization ambitions drive the restructuring.

## Implications for Leadership Action

1. **Close the HoE search with a decision** — the current velocity is consuming executive time without delivering a hire. Either establish a definitive close-or-extend decision point, or bring an explicit backup plan (internal promotion, contractor bridge) to limit the capacity drain.
2. **Fill the Monnify EL gap as highest-priority single hire** — Monnify is 50%+ of TeamApt revenue and has an acknowledged engineering leadership gap. Priority should exceed the central product vertical HoE search.
3. **Tolulope PIP posture decision** — Apr 14 was the gate; the decision structurally unlocks Core Operations capacity planning regardless of direction. Waiting past the deadline extends the seat-level mismatch cost.
4. **Documentation discipline as a first-class CTO KPI** — the three-layer failure pattern (Jira capture, Gemini transcription, brain staleness) suggests that pushing individual writers harder will not resolve it. A structural fix (write-back automation, AI-assisted meeting docs integrated into the brain) would remediate all three at once.
5. **Dual reporting clarification** — the Mek/Frank interface is accepted as ambiguous but not explicitly decomposed. A written decision rights matrix would reduce cross-domain escalation time, particularly for engineering hiring and performance decisions that touch both business-line leads and engineering pillars.

## Key References

### Concept Pages
- [[Engineering Leadership]] — role framing (VPs as business unit CTOs)
- [[Head of Engineering Hiring]] — open search
- [[Performance Improvement Plan]] — generic PIP concept
- [[CEO KPI Scorecard]] — FY2026 rubric
- [[Moniepoint Job Levels]] — 13-level framework

### Source Pages — Hiring
- [[Head of Engineering Batch Interview Deliberation 2026-04-01]] — full deliberation, calibration decisions
- [[Head of Engineering Batch Interview Deliberation 2026-04-10]] — Gemini transcription failed
- [[deliberation-head-of-engineering-batch-interviews-20260401]]
- [[deliberation-head-of-engineering-batch-interviews-20260410]]

### Source Pages — PIP
- [[pip-documentation]] — formal PIP document
- [[tolu]] — comprehensive profile including Level III in Level IV seat assessment
- [[INDEX — Tolu Obianwu PIP Context]]
- [[performance-review-2026-03-17]]

### Executive Entities
- [[Emeka Awagu]] (CTO), [[Dennis Ajalie]] (CEO), [[Frank Atashili]] (CPO/COO), [[Felix Ike]] (Group CTO), [[Tosin Eniolorunda]] (Group CEO)

### Business-Line Leads
- [[Daniel Ojinaka]] (DD), [[Damilare Ogunnaike]] (Monnify), [[Tracy Ojaigho]] (TPP), [[Babatunde Okufi]] (Domestic Switching)

### Engineering Pillar Heads
- [[Ravi Kiran Veluguleti]], [[Tolulope Obianwu]], [[Oladapo Onayemi]], [[Tolu Aina]], [[Abayomi Ojamomi]], [[Muhammad Samu]], [[Lateefat Adedeji-Oyedeji]]

### Candidates
- [[Varun Singh]], [[Smit Parsania]]

### Panel Members (Apr 1 / Apr 10 batches)
- [[Chris Purkis]], [[Pavan Venkatesan]], [[John Ojetunde]], [[Oloruntoba Ojo]], [[Alex Adeyemo]], [[Rahul Goel]]

### MFB Cards Transition (Phoenix)
- [[Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14]]
- [[Nadeem Abbas]], [[Elishma Nwobodo]], [[Nitish Chand]], [[Ketan Dhamasana]]

### People Ops
- [[Constance Onyeji-Jarret]] — Lead, People Operations at TeamApt; PIP issuer
