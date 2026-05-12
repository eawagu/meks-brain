---
title: Direct to Bank Daily standup - 2026_04_15 08_22 WAT
type:
  - "source"
cssclasses:
  - "source"
source_path: _Direct to Bank _ Daily stand up – 2026_04_15 08_22 WAT – Notes by Gemini.docx
retention_label: postgres
retention_rationale: "D2B standup with ALIGNED fresh-scan methodology decision; GT Bank API integration progress (Azak name-inquiry/token success), Polaris bank downtime, Premium Trust core banking, Yasir's Jira ticket-management concern. Future retrieval likely for integration tracking."
meeting_date: 2026-04-15
created: "2026-05-12T11:02:18Z"
updated: "2026-05-12T11:02:18Z"
summary: D2B Daily Standup 2026-04-15 — Zenith vulnerability fix deploying today; fresh security scan methodology aligned with Zenith; GT Bank API via Abar name-inquiry/token success (transfer pending); Polaris bank downtime; Felix signature needed for Transfer API SLA; Yasir flagged Jira ticket-management gap.
---

## Summary

D2B Daily Standup 2026-04-15 08:22 WAT — Zenith vulnerability fix confirmed on test, deploying to live today; ALIGNED on fresh-scan methodology with Zenith bank security team. GT Bank API integration via [[Abar]] succeeded for name inquiry + token generation; transfer testing pending. SLA bottlenecks for [[UBA]] and Echo Bank continue. Polaris bank experiencing significant downtime, prioritized internally. [[Yasir Syed Ali]] flagged Jira ticket management gap (Money Point updates, Union/Habari Pay info not captured).

## ALIGNED Decisions

- **Fresh security scan methodology**: team to conduct clean scan + send report to bank security team for comparison

## Key Points

- **Zenith vulnerability fix**: confirmed on test env post-remediation; deploying to Zenith live today; [[Ifeoluwa Oguntona]] visiting bank to discuss perpetual role-matrix delay
- **ZenD vulnerabilities**: bank-side meeting agreed both sides perform fresh scans; team to scan + send report; bank to create new repo for Java app and rescan; clean report → synergy; future pen test subject to head-of-security approval
- **UBA + Echo Bank SLA**: still attempting to get over the line; Echo Bank work ongoing with Daniel; minor blocker on sandbox access
- **DD VPN/server access**: Oluwakemi got feedback that bank (Polaris) is experiencing significant downtime — priority issue for them
- **Polaris utilization report**: [[Abiodun Famoye]] requested; [[Oluwakemi Oni]] to hold (bank internal issues); request is ops issue (not infra) — align with Miriam for clarification
- **Premium Trust**: finalizing core banking app process; server requirements for production shared yesterday; bank tagged [[Khadijat Musa]] + D for requirement clarification; bank requested until next week to conclude card implementation
- **MoneyPoint integration**: VPN established between MoneyPoint and internal env; finance team having technical issues setting up settlement account; [[Taiwo Baptista]] to follow up with finance today
- **GT Bank API via [[Abar]]**: new port + IP received; testing by Azak successful for name inquiry + token; transfer testing pending; [[Taiwo Baptista]] targeting close-out this week for production deployment; bank to fast-track SLA signing + counter-sign return
- **Transfer API SLA**: [[Opeyemi Animashaun]] calling for internal-signature help; specifically Felix's signature needed before sending to bank
- **Jira ticket management gap**: [[Yasir Syed Ali]] raised concern — Money Point update + Union Bank/Habari Pay details not captured properly; [[Taiwo Baptista]] confirmed they update tickets; SLA/account request for Money Point documented in existing ticket
- **'Beta' = production**: in this context, beta phase treated as production
- **Union Bank V2 J update**: expected Thursday or Friday (per Khadijat)

## Next Steps

- [[Ifeoluwa Oguntona]] — deploy Zenith vulnerability fix to live today; meet bank today on role matrix
- The group — perform clean security scan; send report to bank security team
- [[Oluwakemi Oni]] — contact stakeholders re Polaris issues; align with Miriam on operational Polaris utilization report
- [[Khadijat Musa]] + D — clarify Premium Trust tagged requirements
- [[Taiwo Baptista]] — follow up with Finance on MoneyPoint settlement account technical challenge; check Money Point ticket pending updates
- The group — deploy GT Bank API via Abar to production later this week
- [[Opeyemi Animashaun]] — obtain Felix's signature for Transfer API SLA; send signed doc to bank

## Entities Mentioned

People: [[Ifeoluwa Oguntona]], [[Oluwakemi Oni]], [[Abiodun Famoye]], [[Glory Alioha]], [[Khadijat Musa]], [[Taiwo Baptista]], [[Opeyemi Animashaun]], [[Yasir Syed Ali]], Felix, Daniel, Miriam, "D" (Daniel?), Victor Osborne, Azak

Banks: [[Zenith Bank]] (Zenit), [[UBA]], [[Echo Bank]], [[Polaris Bank]], [[Premium Trust]], [[GT Bank]], [[Union Bank]], [[HabariPay]] (Habari Pay), [[Moniepoint]]

Systems: [[Abar]], [[ATS]], [[Direct service]]

## Concepts

- [[Direct to Bank Daily standup]]
- [[SLA sign-off blocker]]
- [[Fresh security scan methodology]]
- [[Jira ticket management]]