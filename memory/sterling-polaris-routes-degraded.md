---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: Sterling remains OFF — Hourly Report 20260412 confirms CoralPay engaging bank for permanent fixes, no timeline. Polaris settlement issue (TDSD-6493) status unknown (Jira auth failure, 12th consecutive tick).
updated: "2026-04-12T09:13:00Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Sterling Bank]] remains OFF. [[TDSD-6385]] administratively closed Apr 10 ("routed off pending bank resolution") — no fix timeline. Hourly Report 20260412 ([[Qazim Adedigba]], 09:24 WAT Apr 12) confirms: "Sterling transactions were turned off due to persistent RC 91 failures, [[CoralPay]] is engaging the bank for permanent fixes." This is a permanent-fix track, not a temporary cycle — Sterling has been off for 3+ days.

[[Polaris Bank]] VPN track closed ([[TDSD-6346]], transactions processing via alternate path). [[TDSD-6493]] (Polaris settlement issue, filed 02:48 WAT Apr 10) was at INITIAL REVIEW with zero comments as of last verified Jira check. Current status unknown — Jira auth failure prevents verification (12th consecutive tick, >10h blind). Union Bank settlements >20m also failing RC 58 (TDSD-6276, known issue) — separate track but adds to settlement pressure.

## Sources
jira TDSD-6385 (Completed 08:27 WAT Apr 10), TDSD-6346 (Completed 08:32 WAT Apr 10), TDSD-6493 (INITIAL REVIEW, zero comments, confirmed 07:08 WAT Apr 11); email Hourly Reports 20260412 (Qazim Adedigba, 09:24 WAT Apr 12)

## Deltas
- 2026-04-10 07:00 WAT — TDSD-6493 filed: "Polaris Traffic Stopped due to settle issue" at 02:48 WAT. INITIAL REVIEW, [[Olamide Ajibulu]]. Polaris had been restored only ~2 days.
- 2026-04-10 11:00 WAT — TDSD-6385 (Sterling) and TDSD-6346 (Polaris VPN) both administratively closed. TDSD-6493 settlement issue still zero comments.
- 2026-04-10 15:00 WAT — TDSD-6493 confirmed zero comments at 15:00 WAT scan. 12h+ since filing with no Jira activity.
- 2026-04-11 07:08 WAT — TDSD-6493 still zero comments. 28h+ with no activity.
- 2026-04-12 10:09 WAT — Hourly Report confirms Sterling still OFF, CoralPay engaging bank for permanent fixes. Polaris settlement status unverifiable (Jira auth failure). Union Bank settlements >20m failing RC 58 (TDSD-6276) adds settlement pressure.