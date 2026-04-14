---
title: CEO Gazette — 10th April 26
type:
  - "source"
cssclasses:
  - "source"
source_path: CEO Gazette - 10th April 26.pptx
created: "2026-04-14T15:32:18Z"
updated: "2026-04-14T15:32:18Z"
summary: Weekly CEO Gazette for week ending 10th April 2026 — flags 33.8% DD mandate approval rate as a structural revenue threat, JULS ACCESS card provider crisis (64% failure Apr 5–7, apparent migration to JULS WEMA Apr 8), ATS/DCIR near-outage Apr 5 (5.1% success), T-Switch volume spike Apr 8 suggesting NIBSS reroute; CBN terminal geo-tagging RFI submitted; ISO Mock Audit complete 4/5 standards.
---

## Summary
Weekly executive gazette for the week ending Apr 10, 2026 covering CSAT, Monnify acquisition/integration, switch/processor stability, compliance (ISO mock audit, CBN RFI, AML/CFT guidance), bank reconciliation, product deliverables, recovery, and new hires. Executive summary identifies two top risks: DD mandate approval rate (33.8%, flat all week) and the JULS provider group failure (JULS ACCESS 64% failure over three days with apparent migration to JULS WEMA the following day).

## Key Points
- **Top risks (executive summary):** (1) DD mandate approval rate 33.8% all week — 2 of 3 attempts failing before execution; direct revenue and CX threat. (2) JULS card provider crisis (64% failure Apr 5–7 on JULS ACCESS) and apparent Apr 8 migration pattern to JULS WEMA suggests a shared infrastructure vulnerability across the JULS provider group.
- **North Star Metric proposed:** end-to-end transaction success rate across channels. Current range: 99%+ disbursements, ~89% core payments, 34% mandate debits.
- **CSAT:** 94.5% (below 95% threshold). 52 good-sat tickets, 3 bad.
- **Monnify acquisition:** 402 total sign-ups, 20 KYC rejected, 17 activations, 28% conversion rate. Avg time-to-live 28.3 weeks; min 0.036 hours. 37 merchants went live. Virtual AC utilization 8.87% (trending down). Top new merchant: Derby Lotto (231/351 successful txns).
- **Switch/processor stability (week Apr 3–9):**
  - **NIBSS PTSA** — backbone, 97% of volume, 99.44% success, steady 2.14–2.22s response. Zero degradation.
  - **ISW** — 2.0–3.1M txns/day, 86.6–88.8% approval, 95.3–97.1% success, 1.5–2.3s. Reliable workhorse.
  - **Teamapt Switch (T-Switch)** — most volatile. Volume 24K–759K/day. Apr 4 & Apr 7 approval dropped to ~60–61%, response times spiked 5.5s. Apr 8 recovered to 98.4% success, 89.7% approval, 1.34s — best single-day performance in dataset. Apr 8 volume share surged 0.4–2.1% → **11.95%** (5–30× spike, 759,765 txns) suggesting a routing shift from NIBSS (partial degradation likely).
  - **ATS/DCIR** — Apr 5 near-total outage (2.7% success, 0% approval, 7,734 txns). Confirmed across two independent datasets — warrants formal post-mortem.
- **Card processing failure rates (Monnify Collections):**
  - **JULS ACCESS** — 3 consecutive days (Apr 5–7) with >50% failure, peaking **63.64% on Apr 5**. Self-resolved Apr 8. Root cause unknown.
  - **ISW** — benchmark, 1.2–1.7% failure every day, zero volatility, only provider with complete 7-day record.
  - **JULS WEMA** — Apr 8 failure jumped to **18.18%** (10× normal), the day after JULS ACCESS normalised. Suggests shared underlying dependency across JULS providers.
  - HABARIPAY, JULS FCMB, JULS WEMA each have data gaps — reporting hygiene issue.
- **Virtual Account Collections:** Moniepoint 62.9%, Sterling 31.5%, all others <5%. Sterling's volatility (88K→146K→back) is the notable risk. Weekend dip → Monday spike pattern. Fidelity + GTB combined <0.2% — consolidation candidates.
- **DD Mandate performance:** Creation flawless 100% every day. Debit approval 30.5–36.3% (34% avg) — structural problem, not transient. Execution past approval ~89.6%. Approval stage is the value-leak.
- **Compliance (Ibukun Atoyebi domain):**
  - ISO Mock Audit complete for ISMS, ITSMS, OHS, BCMS; QMS deferred.
  - Monnify→Moniepoint MFB integration — new SLAs being defined with Legal, timeline next week.
  - CBN **terminal geo-tagging RFI** submitted (re: Aug 2025 circular, 20 Oct 2025 deadline).
  - CBN guidance note on automated AML/CFT/CPF solutions: compliance assessed at institution level (not technology); requires defensibility (audit trails, explainable decisions), governance (ownership, model validation, change control), effectiveness (credible detection, false-positive management). **Implementation plan due by 10 June 2026 (Word + PDF).**
- **Bank reconciliation:**
  - [[Polaris Bank]] — routing not resumed.
  - [[Access Bank]] — complete to Apr 6; Apr 7 delayed → SLA breach; reconciliation ongoing.
  - [[Fidelity Bank]] — complete to Apr 6; Apr 7 delayed → SLA breach; awaiting bank feedback on duplicate posting from timed-out settlement.
- **Product team deliverables:**
  - Comprehensive Transaction Reports (Successful & Failed) — expected Apr 6–10.
  - Transit & Income Account Statements — pushed to Q2 OKRs.
  - **Tacha configuration for Direct Debit** — pilot transactions through Apr 10, settlement window review ongoing.
  - **Terminal Registration** — first geotagging request for **488,301 terminals** under review.
- **Recovery:** NGN 21.8M recovered this week. 78.05% completion (from 77.70%). [[Cowrywise]] exposure unchanged: NGN 35.19M yet to be recovered.
- **New hires:** Feranmi Oluwagbemide (Product Designer), Fadil Adajah (Operations Intern).

## Entities Mentioned
[[Moniepoint]], [[Monnify]], [[NIBSS]], [[ISW]], Teamapt Switch, ATS, [[DCIR]], JULS ACCESS, [[JULS WEMA]], JULS FCMB, HABARIPAY, [[Polaris Bank]], [[Access Bank]], [[Fidelity Bank]], [[Sterling Bank]], [[GTB]], [[CBN]], [[Cowrywise]], [[Tacha]], [[Ibukun Atoyebi]], Feranmi Oluwagbemide, Fadil Adajah, Derby Lotto

## Concepts
[[CEO Gazette]], [[End-to-End Transaction Success Rate]], [[DD Mandate Approval Bottleneck]], [[JULS Provider Shared Infrastructure Risk]], [[PTSA Compliance Monitor]], [[Terminal Geo-tagging]], [[AML/CFT/CPF Automated Solutions]], [[ISO Mock Audit]], [[Bank Reconciliation SLA]], [[Recovery Operations]], [[Weekend Performance Dip Pattern]]