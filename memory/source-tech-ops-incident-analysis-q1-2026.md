---
title: source — Tech Ops Incident Analysis Q1 2026
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt\Tech Operations\Tech_Ops_Incident_Analysis_Q1_2026.md
created: "2026-04-13T22:11:30Z"
updated: "2026-04-13T22:11:30Z"
summary: "294 incidents (Feb 2-Mar 30 2026), 3× weekly escalation, 78.6% P1, 60.2% RC91. Switch (52.7%) and ATS (36.4%) = 89.1%. CoralPay caused 24.8% of incidents. Top banks: FBN (41), PVB (38), Access (34). SRE 3-person concentration risk."
---

Incident analysis of #teamapt-tech-operations Slack channel, Feb 2 – Mar 30, 2026 (~8 weeks). Generated March 30, 2026.

## Key Findings
- **294 total incidents**, escalating from 28/week (early Feb) to 84/week (late Mar) — **3× increase**
- **78.6% P1** (231 of 294) — either genuine severity crisis or over-classification
- **60.2% RC91** (177 incidents) — systemic partner/bank unavailability, not internal bugs
- **89.1% from Switch + ATS** — both [[Domestic Switching]] products under [[Tunde Okufi]]

## Product Breakdown
| Product | Incidents | Share |
|---|---|---|
| Switch (Juliana Card Switch) | 155 | 52.7% |
| ATS (AptPay Transaction Switch) | 107 | 36.4% |
| Monnify Collections | 18 | 6.1% |
| Direct Debit | 11 | 3.7% |
| Monnify Disbursements | 2 | 0.7% |

## Top Banks Affected
[[First Bank]] (41), [[Providus Bank]] (38), [[Access Bank]] (34), [[Zenith Bank]] (24), [[Wema Bank]] (22), [[Fidelity Bank]] (20)

## Partner Risk
- **[[CoralPay]]**: 73 incidents (24.8%) — VPN drops, RC91 on FBN/PVB/ZIB. Spiked to 38 in Week 13. Single largest external risk factor.
- **[[NIBSS]]**: 26 incidents (8.8%) — PTSA leaseline, VPN, Redis infrastructure
- **Habari**: 7 incidents — GTB RC91 failures

## SRE Concentration Risk
3 reporters ([[Qazim Adedigba]], [[Olamide Ajibulu]], [[Daniel Armstrong]]) account for 75.5% of all reports.

## SRE Accountability Mapping
- Juliana Card Switch: [[Saheed Yusuf]] (SRE Lead), [[Tunde Okufi]] (BL)
- ATS/AptPay Suite: [[Ugochukwu Ebirika]] / [[Saheed Yusuf]] (SRE), [[Tunde Okufi]] (BL)
- Overall SRE: [[Oladapo Onayemi]] (Head, TSE)

## Recommendations
1. CoralPay risk mitigation — multi-processor routing for FBN/PVB/ZIB, circuit breakers
2. NIBSS connection hardening — redundant connectivity
3. Bank connectivity resilience — direct connections, per-bank circuit breakers
4. Incident management maturity — standardized templates, MTTD/MTTR tracking
5. SRE coverage — address 3-person concentration risk
6. Habari/GTB route resilience — secondary processor for GTB
7. [[Wema Bank]] partnership review — chronic notification failures

## References
[[CoralPay]], [[Domestic Switching]], [[Oladapo Onayemi]], [[Stanbic Bank ATS — Persistent RC91 Pattern]], [[Fidelity Bank ATS — RC91 Failure Ongoing]]