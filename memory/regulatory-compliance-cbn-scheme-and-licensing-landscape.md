---
title: Regulatory Compliance — CBN, Scheme, and Licensing Landscape
type:
  - "synthesis"
cssclasses:
  - "synthesis"
status: current
created: "2026-04-19T18:04:28Z"
updated: "2026-04-19T18:04:28Z"
summary: "Cross-cutting synthesis of Moniepoint/TeamApt's regulatory compliance posture — CBN licensing portfolio (4 licenses), scheme certifications (Visa ✅, MC license pending, Verve pricing shock), 2025 outcomes (zero fines, Deloitte Generally Confirmed), 126 open gaps, BRM regulatory exposure, the asymmetric acquirer/scheme regulation issue, and implications for MasterCard license closure, CBN calendar instrumentation, and scheme-pricing advocacy."
---

## Scope and Purpose

Moniepoint/[[TeamApt Limited]] operates at the intersection of three distinct regulatory/compliance surfaces:

1. **Primary Nigerian regulator** — [[CBN]] (Central Bank of Nigeria), which issues licenses, directs product and terminal operations, and runs IT Standards audits
2. **Card schemes** — [[Visa]], [[MasterCard]], [[Verve]] (operated by [[Interswitch]]), and Afrigo — each with its own certification pipeline, fee regime, and compliance requirements
3. **Market infrastructure** — [[NIBSS]] and PTSAs for settlement and routing; PCIDSS and industry security standards

This synthesis consolidates the regulatory-compliance layer across all three surfaces, including the 2025→2026 trajectory of compliance posture, active licensing tracks, the scheme-pricing asymmetry issue, and the structural regulatory exposures that compound beyond individual compliance events.

Scope: 2025–2026 snapshot, with emphasis on the Apr 2026 state.

## The Regulatory Topology

### 1. CBN — Primary Financial Sector Regulator

CBN is the primary regulator for all TeamApt/Moniepoint business lines. Its jurisdiction covers:

- **Licensing** — the CBN license portfolio TeamApt holds (below)
- **Product regulation** — POS, Direct Debit, Acquiring, Settlement are all CBN-regulated
- **IT Standards** — annual audit cycle; 72% complete on CBN IT Standard Blueprint as of Jan 2026
- **Cyber incident reporting** — near-real-time (2–3 hour) reporting requirement for cyber incidents
- **Critical Information Infrastructure** — CBN designates CII entities with enhanced oversight

### 2. Card Schemes

Three global/domestic schemes dominate the TeamApt footprint:

- **[[Visa]]** — global, collections-only implementation and processing agreement active; Visa acquirer license ✅; L3 certifications for international acquiring
- **[[MasterCard]]** — global, collections-only integration + MPGS domestic POS processing; acquirer processor cert ✅; **license pending** (as of Apr 2026)
- **[[Verve]]** — Nigerian domestic scheme operated by [[Interswitch]]; active on all TeamApt POS traffic
- **Afrigo** — Nigerian domestic scheme; active

### 3. Market Infrastructure

- **[[NIBSS]]** — national settlement operator; compliance via CBN-mandated PTSA connectivity (NIBSS PTSA live; UPSL pending)
- **PCIDSS/IMS** — security standards with annual audit cycles
- **NDPR** — Nigerian Data Protection Regulation

## TeamApt's CBN License Portfolio

Four licenses form the foundation of all business lines:

| License | Used By | Notes |
|---|---|---|
| **Switching & Processing** | All 4 businesses | Foundation license |
| **Non-Bank Acquiring** | TPP, Monnify web acquiring | Required for merchant acquiring |
| **PTSP** (Payment Terminal Service Provider) | Domestic Switching | Required for terminal deployment/management |
| **SuperAgent** | Domestic Switching | Agent network management |

Additional scheme licenses:
- **Visa acquirer license** — obtained 2025 Q4 (recently)
- **MasterCard license** — pending as of Apr 2026

## Compliance Posture — 2025 Outcomes

Per [[TMAPT]] (the compliance entity/function within Moniepoint/TeamApt):

### Regulatory Outcomes
- **Zero regulatory fines for 2025 activities** — the headline technical achievement
- **₦12M fine paid** for delayed prior-year EFS filing (down from ~₦378M in prior-year standard fines — material cost reduction)
- **Deloitte independent compliance testing** — "Generally Confirmed" rating, highest achievable; this was a UBA prerequisite for specific engagement
- **CBN IT Standards audit** — completed positively Jan 2026; positive outcomes on Agile delivery and Open Banking readiness (per [[CEO Gazette — 23rd Jan 26]])
- **Cybersecurity audit + first CBS report submission** — completed
- **Website/e-commerce compliance uplift** — completed

### Compliance Gap Inventory (Jan 23, 2026)
**126 total open gaps** across 6 products (ATS, DD, Juliana, Monnify, NBA, PTSP). This is the live remediation backlog; gap closure is ongoing.

### Monify-Specific Compliance Uplift ("David Phase")
Per [[Monify]] entity page:
- Transaction monitoring (limit monitoring by Damilari; specific monitoring by Awal)
- Centralized UBO register deployed
- Customer screening and risk rating — dashboard with Loom
- Cybersecurity audit + CBS first submission
- Switch failure test successful
- Fraud policy developed and implemented

## Compliance Posture — 2026 Trajectory

### Q1 2026 Completions

- **CBN IT Standards audit** — positively closed Jan 23, 2026
- **CBN face-to-face review** — Payment System Supervision Department meeting Feb 12 covering switching transactions, partnerships, product pricing
- **PTSC connection** — complete ahead of deadline (per Q3 Leadership Retreat Day 3 minutes)
- **CBN-led IT Standards Blueprint** — 72% complete on Jan 30

### Active Q2 2026 Tracks

Multiple compliance threads are actively running as of April:

**Terminal & POS regulation:**
- **CBN POS recertification** — 10+ days overdue as of early April 2026
- **Terminal recertification filing** — [[Ibukun Atoyebi]] filed the late submission on Apr 8
- **POS geo-tagging response** — also filed Apr 8 by Ibukun
- **PTSC testing** — pending Q2 action
- **Geofencing Compliance** — NIBSS-certified SDK ready for deployment via config change if CBN mandates enforcement; ~20m accuracy limits tight-radius enforcement
- **PCIDSS/IMS audit prep** — in progress per Feb MANCo

**Reporting and cadence:**
- **CBN AML roadmap** — due June 10 (MANCo Apr 2026)
- **ICOFA adoption** — internal controls directive active; maturity dashboard criticized by Tosin for lacking outcome-based metrics
- **PTSA compliance on ATS** — 98% as of Apr 17 CEO Gazette (vs NIBSS at 90.8%)

**Cyber and critical infrastructure:**
- **National Cybersecurity Coordination roundtable** — Apr 2 mandatory CBN/ONSA meeting in Abuja (cross-sector cyber incident sharing, CERT coordination, regulatory reporting, fraud mitigation)
- **Remita breach exposure** — same Sterling threat actor; TeamApt exposure assessment ongoing
- **Sterling Campaign (CVE-2025-55182 React2Shell)** — SOS-348 closed Apr 2; patch still pending
- **DCIR Security Vulnerabilities** — 5 CRITICAL findings from Access Bank pen-test; closure committed by Apr 8; partial remediation

## Scheme-Specific State

### Visa
- Acquirer license obtained (Q4 2025)
- Acquirer processor certification ✅ (2025)
- MPGS live
- EMV Data Prep: all modules complete except Visa perso
- 3DS completed (Monnify international)
- Visa Payments Forum Paris (30 Jun – 2 Jul 2026) — Emeka Awagu invited; [[French Schengen visa application]] in progress
- Visa-TeamApt Processing Agreement — active

### MasterCard
- Acquirer processor certification ✅
- **Acquirer license pending** (Apr 2026)
- MPGS domestic POS processing live
- **Mar 2026 back-billing anomaly**: MasterCard back-billed fees from Dec 2025–Mar 2026 in a single month, inflating reported March scheme-cost numbers — significant financial reporting noise
- International card coverage 2026 target alongside Visa/Amex; $1M stretch goal not in official budget

### Verve (Interswitch)
- Active on all TeamApt POS traffic
- **Q4 2025 pricing shock** — material driver of Moniepoint's Q4 2025 PAT reversal
- **Regulatory loophole** — acquirers are price-capped and must accept all schemes; schemes are not price-regulated. Verve exploited this asymmetry to extract rent
- [[Dennis Ajalie]] leading negotiation for volume-linked discount

### Afrigo
- Active scheme; less documented in the brain

## The Asymmetric-Regulation Problem

A first-class strategic issue surfaced at the 2026 Leadership Retreat (Day 1):

**Asymmetric regulation of acquirers vs. schemes:**
- **Acquirers** — price-capped (CBN interchange fee structure), must-accept-all-schemes, capital requirements (₦2B + ₦2B escrow for switching companies per POS Payment Guidelines)
- **Schemes** — not price-regulated; can set fees unilaterally; no must-accept constraint

This asymmetry gave [[Verve]] the leverage to shift to flat pricing via loophole, producing the Q4 2025 PAT reversal. Framed by [[Tosin Eniolorunda]] as the exemplar of how current regulation structurally favors schemes over acquirers.

**Strategic response:** Moniepoint is pursuing regulatory engagement to:
1. Challenge competitor demarketing claims (see [[Moniepoint Group Competitor Demarketing]]) — OPay's 3G/Android-5-illegal claims
2. Negotiate volume-linked discounts with Verve (Dennis direct engagement)
3. Advocate for symmetric regulation via industry forums and CBN channels

## The BRM Regulatory Exposure

A distinct structural compliance issue tracked via [[BRM Regulatory Exposure]]:

**Problem:** Offline Bank Relationship Manager (BRM) employees remain on TeamApt payroll without transfer to the [[Moniepoint MFB]] entity. BRMs perform agency banking activity on behalf of the MFB.

**Compliance implication:**
- Ambiguous CBN reporting jurisdiction — which entity is accountable for BRM conduct?
- Fraud liability exposure — which entity bears loss if a BRM commits fraud?
- Regulatory boundary crossed — agency banking is MFB-regulated; payroll at TeamApt (a PSB, not MFB) creates structural inconsistency

This is the most persistent single-issue regulatory exposure documented in the brain — it has been flagged repeatedly without structural resolution.

## POS-Specific Regulatory Framework

Per [[Nigerian POS Payment Guidelines]]:

### Market Scale
- 5.5M terminals by end 2024
- 6.4B transactions H1 2024 (₦85.9T)
- 11.6B internet transactions H1 2024 (51.91% of e-payments)

### Key Obligations
- **Only PTSPs** (licensed entities) may deploy POS terminals nationwide
- **September 2024 deadline:** all transactions must route through licensed PTSAs (NIBSS or UPSL) — achieved
- **December 2025 deadline:** mandatory dual PTSA connectivity — structural change
- **ISO 20022 migration** — planned reintegration; current baseline via NIBSS MT formats
- **Geo-tagging** — mandatory for POS terminals
- **Switching company capital requirements** — ₦2B + ₦2B escrow

### CNP (Card-Not-Present) Guidelines
Per [[Nigerian Web E-Commerce Guidelines]]:
- Mandatory 2FA for all CNP transactions
- 3D Secure via ACS at issuer is primary protocol
- Card scheme neutrality enforced (no CP vs CNP discrimination)
- PA-DSS certification required for payment applications
- Domestic processing mandate for Nigerian-issued cards

## The Compliance Operating Model

### Department Structure
[[TMAPT]] (compliance entity/function) reports via:
- **[[Ibukun Atoyebi]]** — Chief Compliance Officer, TeamApt
- **[[Adefemi Opeogun]]** — compliance team member (DC narration corrections, income settlement account regularization, CBN submissions)
- **Ibukun Atoyebi's scope:** late CBN filings, POS geo-tagging responses, GoSubscribe bank expansion compliance readiness

### Cross-Functional Touch Points
Compliance touches every TeamApt business line:
- **[[Direct Debit]]** — NIBSS rails, customer mandate compliance, OTP delivery rules
- **[[Monnify]]** — KYC, merchant screening, transaction monitoring, VAS billing compliance
- **[[Third Party Processing]]** — scheme certifications, acquirer compliance, EMV Data Prep
- **[[Domestic Switching]]** — PTSP, SuperAgent, PTSA compliance, terminal deployment regulation

### Regulatory Calendar
The compliance team runs against a calendar of:
- Annual CBN IT Standards audit cycle
- Annual PCIDSS/IMS audit
- Quarterly CBS reporting (Cybersecurity Baseline Standard)
- ICOFA control traceability cycle
- Certificate renewals (POS recertification, scheme certifications)
- Ad-hoc incident reporting (2–3 hour cyber incident window)

## Cross-Cutting Observations

### 1. The 2025→2026 Trajectory Is Positive

Zero regulatory fines for 2025 activities + Deloitte "Generally Confirmed" rating + CBN IT Standards audit closed positively + ₦12M fine vs ₦378M prior-year baseline — these are strong compliance outcomes. The compliance function has demonstrably matured.

### 2. The Gap Inventory Is The Live Risk Surface

126 open compliance gaps across 6 products is the current remediation backlog. This is where day-to-day compliance work happens; most are non-urgent but they accumulate risk until closed. No single-sentence view of the gap-closure velocity is documented.

### 3. Licensing Is 80%+ Complete, MasterCard Is The Remaining Gap

Of the major license obligations, MasterCard acquirer license is the highest-value single remaining item. The certification has cleared; the license does not yet exist. This constrains international card acquiring ambition.

### 4. The Scheme-Pricing Asymmetry Is a Macro-Level Issue, Not a Compliance Gap

Verve's Q4 2025 pricing shock is not a compliance failure — it is a regulatory design failure that the asymmetry between acquirer and scheme price regulation creates. The fix is not TeamApt compliance work; it is regulatory advocacy and commercial negotiation.

### 5. CBN Recertification Delinquency Is a Recurring Signal

The 10+ day overdue CBN POS recertification in Apr 2026 is the second instance of compliance-calendar slippage documented (following the ₦12M EFS filing fine). This suggests the compliance team's calendar-tracking discipline has a periodic gap; the Deloitte "Generally Confirmed" rating does not eliminate deadline-slip risk.

### 6. Cybersecurity Compliance Is Concurrent With Cyber Operations

DCIR vulnerabilities, Sterling Campaign investigation, Remita breach exposure, and the CBN/ONSA roundtable all land in the compliance-adjacent space. These are not routine compliance — they are ad-hoc cybersecurity events with reporting obligations. The compliance function coordinates with [[Lateefat Adedeji-Oyedeji]] (BISO) and the SRE/security teams rather than owning independently.

### 7. ICOFA Maturity Is Outcome-Thin

Tosin's feedback on the ICOFA maturity dashboard — criticized for lacking outcome-based metrics — suggests that compliance reporting is currently activity-focused (processes implemented) rather than outcome-focused (financial statement integrity measurably improved). This is a reporting-design issue, not a process failure.

## Implications for Leadership Action

1. **Close the MasterCard acquirer license gap** — it is the highest-value single licensing item remaining and unlocks international card acquiring ambition. It should have a tracked closure target.
2. **Structural CBN calendar instrumentation** — the POS recertification slip is the second calendar-driven compliance event with slippage; a forcing-function fix (automated calendar alerts to CCO, pre-emptive filing deadlines) would remove a class of avoidable risk.
3. **BRM regulatory exposure needs structural resolution** — this has been repeatedly flagged without closure. Options: transfer BRMs to MFB payroll, formalize a dual-entity agency arrangement with CBN clearance, or accept the exposure with executive sign-off. The current state (unmanaged ambiguity) is the worst option.
4. **Scheme-pricing asymmetry requires sustained regulatory advocacy** — the Verve loophole is a symptom of a larger design issue. Moniepoint's weight in the Nigerian payment market supports industry-level engagement on symmetric regulation; this would be an 18–24 month horizon initiative.
5. **ICOFA metrics redesign** — shift from activity-tracking to outcome-tracking per Tosin's feedback. Examples: "controls tested in past 90 days" → "financial statement line items with verified source-process traceability percentage"; "policies implemented" → "audit findings closed with measurable control effectiveness".
6. **Compliance gap burn-down needs public cadence** — 126 open gaps without public burn-down velocity makes prioritization opaque. Weekly closure rate + aging distribution would convert the gap inventory into a managed backlog.

## Key References

### Concept Pages
- [[Regulatory Compliance]] — generic industry discipline
- [[TeamApt Regulatory Compliance]] — entity-scoped compliance work
- [[BRM Regulatory Exposure]] — the payroll/MFB boundary issue
- [[Moniepoint Group ICOFA Adoption]] — internal controls framework
- [[Geofencing Compliance]] — POS geofencing capability
- [[Moniepoint Group Competitor Demarketing]] — regulatory response to OPay claims
- [[ISO 20022 Reintegration]] — planned message standard migration
- [[PTSC]] — unified payment switching component
- [[DCIR Security Vulnerabilities]] — 5 CRITICAL findings from Access Bank pen-test

### Regulator Entities
- [[CBN]] — Central Bank of Nigeria (primary regulator)
- [[NIBSS]] — market infrastructure operator
- Corporate Affairs Commission (CAC) — company registration

### Scheme Entities
- [[Visa]] — acquirer license ✅, L3 cert, Visa Payments Forum Paris
- [[MasterCard]] — license pending, acquirer cert ✅
- [[Verve]] — Q4 2025 pricing shock, negotiation ongoing
- [[Interswitch]] — Verve operator

### Compliance Entities
- [[TMAPT]] — compliance function (zero 2025 fines, Deloitte "Generally Confirmed")
- [[Monify]] — David-phase compliance uplift site
- [[Ibukun Atoyebi]] — CCO
- [[Adefemi Opeogun]] — compliance team member
- [[Lateefat Adedeji-Oyedeji]] — BISO (InfoSec interface)

### Source Pages
- [[CEO Gazette — 23rd Jan 26]] — CBN IT Standards audit + 126 compliance gaps
- [[CEO Gazette — 30th Jan 26]] — 72% Blueprint completion
- [[CEO Gazette — 13th Feb 26]] — CBN face-to-face review Feb 12
- [[TeamApt MANCo Meeting 2026-02-24]] — PCIDSS/IMS audit prep, CBN AML roadmap
- [[Nigerian POS Payment Guidelines]] — regulatory framework
- [[Nigerian Web E-Commerce Guidelines]] — CNP framework
- [[Moniepoint 2026 Leadership Retreat UK - Day 3 Feature Discovery Compliance Uplift Cross-Market Platformization - Meeting Minutes]]
- [[Moniepoint 2026 Leadership Retreat UK - Day 1 Profitability Project Phoenix Kenya Launch - Summary]] — asymmetric regulation framing
- [[04-02 Roundtable Meeting_ Cross-Sector Cyber Incident Sharing, CERT Coordination, Regulatory Reporting, and Fraud Mitigation in Nigeria-Discussion Summary]] — CBN/ONSA cyber roundtable
- [[TeamApt Customer and Partner Registry]] — license portfolio inventory
