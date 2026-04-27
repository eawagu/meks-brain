---
type:
  - "source"
title: CEO Gazette - 24th April 26
created: "2026-04-27T05:33:22Z"
summary: CEO weekly update for week ending April 24, 2026 covering NIBSS routing collapse, T-Switch turnaround, JULS card crisis re-emergence, DD approval stagnation at 31.66%, JumiaPay/Cowrywise recovery status, and ISO/Sterling/NRS compliance items.
updated: "2026-04-27T05:41:07Z"
cssclasses:
  - "source"
source_path: CEO Gazette - 24th April 26.pptx
retention_label: postgres
retention_rationale: Multi-section weekly CEO update with detailed quantitative metrics across processors, disbursements, virtual accounts, card failures, DD mandates, compliance, and recovery — granular numbers and dated incident analyses likely to be queried for trend comparison and root-cause drilling.
---

## Summary

Weekly CEO update (week of April 24, 2026) for [[TeamApt Limited]] / [[Moniepoint]]. NIBSS instability dominated the operational picture — routing collapsed from 96.5% to 69.2% PTSA share, driving 4 of 6 customer incidents. T-Switch delivered its best week on record (97.84% success rate, +13.6pp approval). Card-side, the [[JULS Card Crisis]] resurged with JULS ACCESS hitting 68.18% failure on Apr 23 and JULS FCMB joining at 25%. [[Direct Debit Mandate Performance]] remains structurally broken three weeks running (31.66% approval). Compliance: [[ISO Standards Audit]] live, Sterling Bank compliance testing scheduled, NRS TMS form returned to CBN.

## Key Points

- **Customer Impact:** [[NIBSS]] drove 4 of 6 logged incidents — disbursement downtimes, failed-but-not-reversed transactions, pending mandate requests, name inquiry failures. Longest incident ran 4 days. Support handled 2,240 tickets at 95.9% resolution; 1–3 minute first replies on WhatsApp/Livechat/Email. CSAT 99, 100% good ratings, 0 bad.
- **Monnify Acquisition (week):** 402 sign-ups, 20 KYC rejections, 17 activations, 28% conversion, 28.36 weeks avg time-to-live, 0.042% non-compliant merchants, 156 min minimum time-to-first-transaction. 31 merchants went live this week.
- **Reserve Account Utilization:** 468,432 generated / 34,283 paid = 7.32% utilization (trending downwards WoW).
- **Top New Merchants (Monnify):** [[Arkbaruch Network]] (765 successful / 1,639 attempted, first txn 2026-04-23), Macrofocus Nigeria Limited (61/72), IB DATA LIMITED (47/47), Fasahasub (31/31), Wozaa Digital Innovation LTD (29/30), Sabichange Technologies Limited (20/29), Mufti services limited (12/19), IVORY RUMUAGHAOLU MULTI-PURPOSE COOPERATIVE (6/20), SAMCHALS GLOBAL CONCEPTS (4/5).
- **Processor Stability — T-Switch turnaround:** approval 76.4% → 90.1% (+13.6pp), success 85.7% → 97.3%, on par with [[NIBSS]]. Three weeks of erratic performance appear resolved; needs one more week to confirm fix vs. temporary recovery.
- **NIBSS Apr 17 routing anomaly:** NIBSS carried only 1.2M txns (~20% of normal) while [[TeamApt T-Switch]] (3.3M), [[ISW]] (3.5M), [[UPSL]] (3.2M) absorbed load. NIBSS lowest approval that day (84.5%). Mirrors Apr 8 routing event; suggests recurring NIBSS instability at start of week.
- **[[ATS]] declining:** Down 2.5pp in approval after recovery in Wk2; quiet but consistent decline across two weeks. Functional but downward drift warrants monitoring.
- **TeamApt share of Moniepoint declining 4 weeks straight:** 35.68% (Wk1) → 32.54% (this week), cumulative -3.1pp loss while total platform volumes flat — losing share to other processors, not market contraction. Apr 17 low at 26.1% (NIBSS-correlated). Apr 22 spike to 41.6% — extreme day-to-day volatility on flat total volume.
- **PTSA Compliance Monitor:** [[NIBSS]] share 96.5% → 69.2% (-27pp, largest single-week shift in 4 weeks of data). Apr 17: NIBSS at 24.4%, T-Switch at 67.6% — near-complete role reversal. T-Switch carried 7× normal volume share at 97.84% success. NIBSS success rate held (99.4-99.7% on days it carried traffic; Apr 17 dipped to 94.2% on tail-end of incident). Issue is volume distribution/routing control, not processor quality. Heavy T-Switch reliance is a compliance risk (not designed as primary).
- **Monnify Disbursement Recovery:** Failures dropped 68% WoW (123K → 39K). Avg success 97.52% (+3.93pp). Still 1.78pp below pre-crisis benchmark; no day reached 99%+. Apr 17 (95.6%) and Apr 23 (96.1%) still low. Volumes lower (1.53M vs 1.95M); full validation needs normal-volume test.
- **Monnify Virtual Accounts:** [[Moniepoint]] share recovered 60.3% → 63.2% (above Wk1 baseline 62.9%). Total platform +3.0% WoW. [[Sterling Bank]] gave back gains — 33.9% → 31.1%; Apr 14 spike was one-off, not trend. Total 2.36M collections matches Wk1 baseline.
- **Card Transaction Failure — JULS Crisis Resurgence:** JULS ACCESS hit 68.18% failure on Apr 23 (worse than Wk1 peak of 63.64%). JULS FCMB joined: weekly avg 14.25% (vs 1.54% prior week), 25% on Apr 23. Both JULS providers collapsing in concert points to shared infrastructure failure. [[ISW]] held steady at 1.88%, [[HabariPay]] at 0.72% — clean separation confirms [[JULS]]-specific fault.
- **TeamApt DD Mandate Performance — three-week unresolved crisis:** Approval at 31.66% (vs Wk1 baseline 33.76%); Wk2 was 30.72%. Marginal +0.94pp is noise. Debit success execution recovering: +5.14pp to 90.71%, debit volume +19.8% WoW — bottleneck is at approval stage, not processing. Mandate creation volumes down 2.3% WoW, -7.1% since Wk1 — active mandate base eroding.
- **Compliance:**
  - [[ISO Standards Audit]]: annual audit commenced Mon Apr 20, ongoing through next week.
  - [[Sterling Bank Compliance Testing]]: scheduled next week, focuses on Virtual Account and Transfer API services. Requirements distributed to stakeholders.
  - [[NRS Transaction Monitoring System]] integration: per CBN circular dated Mar 16, 2026 mandating PSSPs/Switches to integrate with [[NRS Transaction Monitoring System]]. Compliance status form fully completed and returned to [[CBN]] within timeframe.
- **Recovery Status:**
  - No recoveries this week. [[Cowrywise Recovery]] still 78.07% complete: total exposure ₦159,542,627; recovered ₦124,354,205; outstanding ₦35,188,422 (counterparty: [[CowryWise]]).
  - [[JumiaPay Unfunded Transaction Exposure]] (counterparty: [[Jumiapay]]): managing ₦115.6M linked to JumiaPay reversals; ₦87.9M secured via lien. Continuing recovery for ₦5.9M disbursement discrepancies; 45% recovered from internal Moniepoint accounts; ₦3,228,717.43 with external banks, engagements ongoing.

## Entities Mentioned

- Organizations / platforms: [[TeamApt Limited]], [[Moniepoint]], [[Monnify]], [[CBN]], [[NRS Transaction Monitoring System]], [[ISO]]
- Processors: [[NIBSS]], [[TeamApt T-Switch]], [[ISW]], [[UPSL]], [[ATS]], [[JULS]], [[JULS ACCESS]], [[JULS FCMB]], [[HabariPay]]
- Banks: [[Sterling Bank]], [[Access Bank]] (referenced via PTSA context)
- Counterparties: [[CowryWise]], [[Jumiapay]]
- Top merchants: [[Arkbaruch Network]] (only one large enough to plausibly recur)

## Concepts

- [[PTSA Compliance]]
- [[NIBSS Routing Anomaly]]
- [[JULS Card Crisis]]
- [[Direct Debit Mandate Performance]]
- [[Disbursement Success Rate]]
- [[Reserve Account Utilization]]
- [[Cowrywise Recovery]]
- [[JumiaPay Unfunded Transaction Exposure]]
- [[ISO Standards Audit]]
- [[Sterling Bank Compliance Testing]]
- [[NRS TMS Integration]]
- [[CSAT Score]]
- [[TeamApt Share of Moniepoint Transactions]]
