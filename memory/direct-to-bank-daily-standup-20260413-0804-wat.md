---
title: Direct to Bank Daily standup - 2026_04_13 08_04 WAT
type:
  - "source"
cssclasses:
  - "source"
source_path: _Direct to Bank _ Daily stand up – 2026_04_13 08_04 WAT – Notes by Gemini.docx
retention_label: postgres
retention_rationale: D2B standup with named owners, specific bank workstreams (GTB, Zenith, Access, Wema, Ecobank, Fidelity), regulatory decision (DCI narration → ATS), Java 21 upgrade rollout, vulnerability 97% closure rate. Future retrieval likely for ATS/ACS service evolution + bank readiness tracking.
meeting_date: 2026-04-13
created: "2026-05-12T11:00:01Z"
updated: "2026-05-12T11:00:01Z"
summary: D2B Daily Standup 2026-04-13 — OKR closeout, GTB interbank transfer credentials pending, Zenith Bank vulns resolved, Java 21 + V2 upgrade rolling to Ecobank/Wema, Access Bank 97% vuln closure, Fidelity DCI narration replaced with ATS for regulatory compliance.
---

## Summary

Direct to Bank (D2B) Daily Standup on 2026-04-13 08:04 WAT. [[Abdulgafar Obeitor]] led OKR review covering interbank transfer integrations, bank-side service upgrades, vulnerability remediation, and Go-Subscribe POS prep. Critical week ("sacrosanct") for V2 upgrade (Java 21 + vulnerability fixes + Go-Subscribe) to be ready for bank deployment. Regulatory compliance decision: [[Fidelity Bank]] DCI narration being replaced with "ATS" because DCI is a "sin in the industry."

## Key Points

- **OKRs**: current-quarter closeout in progress; team-structure adjustments expected; previous-quarter review held last week; this week dedicated to finalizing + preparing review session
- **GTB interbank transfer**: awaiting credentials + signed SLAs; goal to finalize this week to enable production money movement
- **Money movement core service**: load testing complete last week; deployment now to make 5 banks available for TAC fund movement
- **Zenith Bank**: core security vulnerabilities resolved; awaiting bank to reactivate internet-pointing service to proceed with [[Moniepoint|MoneyPoint]] pilot transactions
- **Service upgrades for banks**: transitioning to newer Java version due to vulnerability issues raised against [[ATS]], [[ACS]], and direct services
- **Vulnerability closure rate: 97%** — remaining vulns being resolved this week
- **Java 21 + V2 upgrade rollout**: Ecobank, [[Wema Bank]] this week; [[Access Bank]] vulns affect direct debit + ACS
- **Access Bank transaction report download**: deploying to facilitate reconciliation by ops team
- **Go-Subscribe POS**: design feedback being reviewed; engineering work being closed out; demo + QA prep
- **Fund settlement service**: load testing concluded successfully (stable build); deployment in progress in production; stable build deployment hit JDK-version investigation issue
- **ATS V2**: testing still in progress; last vulnerability fixes applied Friday following infosec report; QA confirmation pending
- **Fidelity DCI narration**: being replaced with "ATS" because DCI is a regulatory violation that must not be shown
- **Access Bank Java upgrade feedback**: requires further engineering work
- **V2 upgrade contents**: vulnerability fixes + Java 21 + Go-Subscribe ready this week for bank deployment

## Next Steps

- [[Abdulgafar Obeitor]] — finalize quarterly OKRs + review-session material
- [[Abdulgafar Obeitor]] — align with [[Frank Atashili|Frank]] on structural changes; determine team ownership of shifted tasks by Wednesday
- [[Abdulgafar Obeitor]] — finalize GTB credentials + SLAs this week
- [[Abdulgafar Obeitor]] — pilot transactions using [[Moniepoint|Money Point]] this week
- [[Abdulgafar Obeitor]] — close out remaining bank-raised vulnerabilities
- [[Abdulgafar Obeitor]] — deploy V2 upgrade (Java 21 + vulnerability fixes) to [[Ecobank]] and [[Wema Bank]]
- [[Abiodun Famoye]] — review Go-Subscribe design feedback with design team
- [[Abiodun Famoye]] — close out Go-Subscribe engineering work; prep demo + QA testing
- [[Abiodun Famoye]] — prepare next-quarter OKRs (incorporate carryovers)
- [[Abiodun Famoye]] — send completed previous-quarter OKR sheet to [[Babatunde Okufi|Tunde Okufi]]
- [[Abiodun Famoye]] — share banks list and operational details with Abdulgafar

## Entities Mentioned

People: [[Abdulgafar Obeitor]], [[Abiodun Famoye]], [[Ketan Dhamasana]], [[Abraham Isinguzoro]], [[Opeyemi Animashaun]], [[Babatunde Okufi]], [[Frank Atashili]], [[Adeyinka Babalola]], [[Khadijat Musa]]

Banks: [[GTB]], [[Zenith Bank]], [[Access Bank]], [[Wema Bank]], [[Ecobank]], [[Fidelity Bank]]

Systems: [[ATS]], [[ACS]], [[Go-Subscribe]], [[DCI]], [[Direct service]], [[Fund settlement service]], [[Moniepoint]]

## Concepts

- [[Direct to Bank Daily standup]]
- [[Interbank transfer]]
- [[Java 21 migration]]
- [[Vulnerability management]]
- [[DCI narration]]
- [[Quarterly OKRs]]