---
title: Sterling + Polaris — Routes Degraded
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-11T16:43:06Z"
updated: "2026-04-11T16:43:06Z"
summary: Sterling remains OFF with no fix timeline. Polaris settlement issue (TDSD-6493) at INITIAL REVIEW with zero comments for 28h+. Two routes effectively degraded.
---

[[Sterling Bank]] remains OFF. [[TDSD-6385]] administratively closed Apr 10 ("routed off pending bank resolution") — no fix timeline, [[CoralPay]] engaging bank. [[Polaris Bank]] VPN track closed ([[TDSD-6346]], transactions processing via alternate path). But [[TDSD-6493]] (Polaris settlement issue, filed 02:48 WAT Apr 10) remains INITIAL REVIEW with zero comments — 28h+ with no Jira activity. Two routes effectively degraded: Sterling fully off, Polaris settlement unresolved.

## Sources
jira TDSD-6385 (Completed 08:27 WAT Apr 10), TDSD-6346 (Completed 08:32 WAT Apr 10), TDSD-6493 (INITIAL REVIEW, zero comments, confirmed 07:08 WAT Apr 11)

## Deltas
- 2026-04-10 07:00 WAT — TDSD-6493 filed: "Polaris Traffic Stopped due to settle issue" at 02:48 WAT. INITIAL REVIEW, [[Olamide Ajibulu]]. Polaris had been restored only ~2 days.
- 2026-04-10 11:00 WAT — TDSD-6385 (Sterling) and TDSD-6346 (Polaris VPN) both administratively closed. TDSD-6493 settlement issue still zero comments.
- 2026-04-10 15:00 WAT — TDSD-6493 confirmed zero comments at 15:00 WAT scan. 12h+ since filing with no Jira activity.
- 2026-04-11 07:08 WAT — TDSD-6493 still zero comments. 28h+ with no activity.