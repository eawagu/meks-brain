---
title: Tech Ops Incident Remediation
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Action Items\Tech Ops Incident Remediation.md
summary: 17 remediation actions from Q1 2026 incident analysis (294 incidents, rate tripled to 84/week, 78.6% P1) — CoralPay is 24.8% of all incidents, NIBSS 8.8%, top 5 banks 38.4%.
---

## Summary

Remediation action plan extracted from Q1 2026 incident analysis. 294 incidents (Feb 2 – Mar 30), rate tripled from 28/week to 84/week, 78.6% P1 critical. 17 actions across: [[CoralPay]] (4 critical), [[NIBSS]] infrastructure (3 high), bank connectivity (3 high), incident management maturity (4 medium), SRE coverage (2 medium), and Wema Bank (1 medium).

## Key Points

- [[CoralPay]]: 73 incidents (24.8%), spiking to 38 in Week 13 alone. Routes FBN, PVB, and ZIB. Needs multi-processor routing, circuit breakers, and formal SLA
- [[Dennis Ajalie]]'s CoralPay-as-GTB-failover directive (Feb 8) flagged as potentially compounding risk given CoralPay's track record
- [[NIBSS]]: 26 incidents (8.8%) — structural leaseline/VPN outages and Redis failures. Needs redundant connectivity and automated health monitoring
- Top 5 banks (FBN, PVB, [[Access Bank]], Zenith, Wema) = 38.4% of incidents. Need direct connectivity alternatives
- Incident management gaps: no standardized templates, no MTTD/MTTR tracking, no post-incident reviews for P1s
- P1 classification at 78.6% suggests either genuine severity crisis or over-classification
- 3-person reporting concentration risk: Qazim, Olamide, Daniel = 75.5% of all incident reports
- Wema Bank: 22 incidents, repeated notification failures — formal partnership review needed

## Entities Mentioned

- [[CoralPay]], [[NIBSS]], [[Access Bank]], [[Wema Bank]]
- [[Dennis Ajalie]], [[Damilare Ogunnaike]], [[Babatunde Okufi]], [[Saheed Yusuf]], [[Oladapo Onayemi]], [[Ugochukwu Ebirika]]
- [[Qazim Adedigba]]

## Concepts

- [[Incident Remediation]] — structural fixes for tripled incident rate
- [[Observability]] — automated monitoring, health scoring, dashboards