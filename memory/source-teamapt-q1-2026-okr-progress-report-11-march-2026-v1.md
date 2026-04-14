---
title: source — TeamApt Q1 2026 OKR Progress Report (11 March 2026, v1)
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt Q1 2026 Progress Report\TeamApt_Q1_2026_OKR_Progress_Report.docx
created: "2026-04-14T16:22:34Z"
updated: "2026-04-14T16:22:34Z"
summary: "Q1 2026 RAG status report across all TeamApt product businesses as of Week 10 of 13. CDD and NDS mostly AT RISK; Monnify Disbursements ON TRACK; TPP ON TRACK (readiness quarter); critical Access Bank 41% success rate; GoSubscribe slipping to Q2; PTSP 13 of 16 engineering OKR epics still 'To Do'."
---

Week-10 snapshot of Q1 2026 OKR delivery. Source: Jira (teamapt.atlassian.net), Confluence team planning pages, weekly operational reports. Scope: all four TeamApt product businesses and their engineering teams. Note: a v2 of this report (TeamApt_Q1_2026_OKR_Progress_Report2.docx) also exists — it expands on this version.

## Summary

Executive RAG status across 10 business/team lines as of 11 March 2026. **5 AT RISK, 2 MIXED, 3 ON TRACK.** Primary risk concentration: Direct Debit (CDD), NDS Juliana Switch, NDS AptPay Suite, NDS PTSP/PTAD, Monnify VAS. Critical issue: [[Access Bank]] DD success rate ~41% vs ≥98% SLA.

## Key Points

### RAG Summary (10 teams)
| Team | Lead | Status | Headline |
|---|---|---|---|
| Direct Debit (CDD) | Daniel Ojinaka | AT RISK | Phoenix shipped; [[GoSubscribe]] pushed to Q2; bank integrations lagging; volumes declining |
| Monnify Collections | Ankit Kushwaha (acting) | MIXED | VA improvements delivered; international payments and SAFE in early stages |
| Monnify Disbursements | Temitayo Akinmola | ON TRACK | Async intra-bank service in sprint; NPS integration ongoing |
| Monnify VAS | Barakat Ajadi | AT RISK | Q1 OKRs not filed; limited Jira evidence |
| Monnify Channels & Onboarding | David Ijaola | MIXED | Starter Merchants MVP deployed; address verification in active dev; Java 21 migration underway |
| Third Party Processing (TPP) | Tracy Ojaigho | ON TRACK | Readiness quarter (₦4M); settlement automation, MPGS, terminal certs in progress |
| NDS Juliana Switch | Kevin Ng'Eno / Wycliffe Ochieng | AT RISK | 5 of ~15 Q1 checklist items done |
| NDS AptPay Suite | Abdulgafar Obeitor / Ketan Dhamasana | AT RISK | No Jira evidence of ATS at Zenith, GoSubscribe upgrades, or reversal API |
| NDS PTSP/PTAD | Unwana Enang / Priya Chawla | AT RISK | 13 engineering OKR epics all 'To Do' |
| Core Switch Engineering | Oluwabunmi Oyefisayo / Ketan Dhamasana | MIXED | CoralPay isolation and reversal OKRs linked to AS Q1 checklist |

### Critical Operational Findings
- **[[Direct Debit]] metrics (week 2-6 March):** Mandate Activations 1,710 (▼9.14% WoW); Transaction Value ₦174.28M (▼1.24%); Transaction Volume 8,073 (▼13.05% critical decline); [[Access Bank]] Success Rate ~41% (far below SLA).
- **Access Bank DD root cause** is the most critical open issue — emergency war room needed (Daniel Ojinaka + Yasir Syed Ali).
- **GoSubscribe Q1 OKR will miss** — POS App (TCDD-91) and Backend (TCDD-228) due May 8-9 (Q2 delivery). Formal rescope recommended.
- **PTSP engineering OKR epics (PTSP-461 to PTSP-473):** all 13 engineering OKR epics (observability, Java 21, circuit breakers, canary deployments, automated rollback, feature flags, archiving) in 'To Do' status — engineering OKR score likely 0/5 without immediate sprint execution.
- **Terminal certifications (Visa D300, MC D300, Visa P8, MC P8):** externally gated deliverable shared between TPP Engineering (O6) and PTSP (O2). Submission status must be confirmed immediately.

### Blocked / Overdue Items
- Paystack (TCDD-71) and Alatpay (TCDD-74) PayFac integrations **BLOCKED**.
- TCDD-202 (Robust APIs) overdue since 10 Feb (4+ weeks late).
- Support desk setup (TCDD-137) overdue.
- [[Union Bank]] DD delayed (VPN issues); Keystone OTP unresolved; Polaris blocked on onboarding docs.

### Cross-Cutting Dependencies (Q1 Miss Risk)
- **TACHA Integration** (CDD + NDS Juliana) — both targeting March; if not live, both CDD O5.3 and Juliana O1 miss Q1.
- **GoSubscribe POS / ATS Bank Upgrades** (CDD + AptPay + NDS) — CDD POS due May; all three interconnected OKRs miss Q1.
- **Terminal Certifications** (TPP + PTSP) — shared L3 certification deliverable.
- **Zenith Bank ATS Deployment** (AptPay + Juliana Card) — neither visible as live; blocks Juliana O4.
- **Vaibhav Bansal departure** (Monnify EM resigned, on notice) — direct reports pending reassignment; creates Q2 delivery continuity risk.

### Jira Tracking Coverage Gaps
- Monnify VAS and AptPay Suite Q1 OKRs not fully tracked in Jira. VAS has no Q1 OKRs filed. PMO (Idris Aliyu) should enforce Jira epic-level tracking and formal Q1 OKR scoring as quarter-close requirement.

### Aspirational vs Engineering-Grounded OKRs
- Pattern across CDD and AptPay Suite: Q1 OKRs written for outcomes (GoSubscribe in production, ATS at Zenith live) that engineering teams scheduled for Q2. Either OKRs were aspirational (not grounded in engineering estimates) or scope expanded/complexity underestimated. Formal Q1 close process needed: score, acknowledge slippage, carry items into Q2 OKRs.

### Top 10 Actions for Final 3 Weeks of Q1
1. **CRITICAL:** Resolve Access Bank success rate (~41%) — emergency technical war room. Owner: Daniel Ojinaka + Yasir Syed Ali.
2. **HIGH:** Formally rescope GoSubscribe Q1 OKRs to Q2 with documentation. Owner: Daniel Ojinaka + [[Frank Atashili]].
3. **HIGH:** Confirm terminal certification submission status (D300, P8) with Visa and Mastercard. Owner: Tracy Ojaigho + Unwana Enang.
4. **HIGH:** Urgently start PTSP engineering OKR epics (13 'To Do'). Owner: Priya Chawla + Unwana Enang.
5. **HIGH:** Unblock Paystack and Alatpay PayFac integrations. Owner: Daniel Ojinaka + Babatunde Okufi.
6. **HIGH:** Confirm ATS production deployment timeline at Zenith — Q1 or Q2? Owner: Abdulgafar Obeitor + Ketan Dhamasana.
7. **HIGH:** Confirm TACHA clearing status and go-live date. Owner: Kevin Ng'Eno + Daniel Ojinaka.
8. **MEDIUM:** Reassign Vaibhav Bansal's direct reports + Q1/Q2 continuity plan. Owner: Damilare Ogunnaike + Ravi Kiran.
9. **MEDIUM:** Monnify VAS files Q1 OKRs + links to Jira epics. Owner: Barakat Ajadi.
10. **MEDIUM:** Initiate Q1 OKR close/scoring across all teams by April 1. Owner: Frank Atashili + Idris Aliyu (PMO).

## Entities Mentioned

[[TeamApt]], [[Moniepoint]], [[Monnify]], [[Access Bank]], [[Union Bank]], [[Zenith Bank]], [[FCMB]], [[GTBank]], [[Polaris Bank]], [[Sterling Bank]], [[Fidelity Bank]], [[Keystone]], [[Ecobank]], [[Paystack]], [[HabariPay]], [[CoralPay]], [[Visa]], Mastercard, [[Frank Atashili]], Daniel Ojinaka, Yasir Syed Ali, Damilare Ogunnaike, Ankit Kushwaha, Temitayo Akinmola, Barakat Ajadi, David Ijaola, Tracy Ojaigho, Oluwabunmi Oyefisayo, Olawale Adegboyega, Kevin Ng'Eno, Wycliffe Ochieng, Abdulgafar Obeitor, Ketan Dhamasana, Unwana Enang, Priya Chawla, Babatunde Okufi, Vaibhav Bansal, Ravi Kiran Veluguleti, Idris Aliyu

## Concepts

[[OKR]], [[Direct Debit]], [[GoSubscribe]], [[ATS]], [[Terminal Certification]], [[NSS Go-Live]], [[Project Phoenix]], [[Quarterly Planning]]