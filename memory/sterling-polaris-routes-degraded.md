---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Sterling remains OFF (Day 4+) — Duty Handover #20260414 (08:01 WAT) reconfirms route off, CoralPay engagement ongoing, no timeline. 16/17 PTSAs operational. Polaris TDSD-6493 status still unverifiable (Jira auth failure, 57+ ticks, >57h blind)."
updated: "2026-04-14T07:15:19Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Sterling Bank]] remains OFF (Day 4+). [[TDSD-6385]] administratively closed Apr 10 ("routed off pending bank resolution") — no fix timeline. Duty Handover Note #20260414 ([[Innocent Nwaokorie]], 08:01 WAT Apr 14) reconfirms: "Sterling transactions is turned off due to RC91" and reinstates the active ticket reference (TDSD-6385). [[CoralPay]] engagement with bank continues per Apr 12 handover. This is a permanent-fix track, not a temporary cycle.

Additional handover details (Apr 14): 16 of 17 PTSAs operational; Access Bank participant reports from March 3, 2025 still pending (TSE aware); Wema settlement for Apr 14 5:05:14 AM still in progress while others completed; Window 1 reports available; Kafka notifications healthy (0 pending both queues); UBA validation for Apr 2 sent; TDSD-6276 Union problem ticket referenced; TDSD-6540 Eco settlements issue; Parallex settlements 6pm awaiting requery; Access 11am settlements failed — reconfirm tomorrow.

[[Polaris Bank]] VPN track closed ([[TDSD-6346]], transactions processing via alternate path). [[TDSD-6493]] (Polaris settlement issue, filed 02:48 WAT Apr 10) was at INITIAL REVIEW with zero comments as of last verified Jira check. Current status unknown — Jira auth failure prevents verification (57+ consecutive ticks, >57h blind). Union Bank settlements >20m also failing RC 58 (TDSD-6276, known issue) — separate track but adds to settlement pressure.

## Sources
jira TDSD-6385 (Completed 08:27 WAT Apr 10), TDSD-6346 (Completed 08:32 WAT Apr 10), TDSD-6493 (INITIAL REVIEW, zero comments, confirmed 07:08 WAT Apr 11); email Hourly Reports 20260412 (Qazim Adedigba, 09:24, 11:59, 15:55 WAT); email Duty Handover Note 20260412 (Qazim Adedigba, 16:05 WAT Apr 12); email Duty Handover Note #20260414 ([[Innocent Nwaokorie]], 08:01 WAT Apr 14)

## Deltas
- 2026-04-10 07:00 WAT — TDSD-6493 filed: "Polaris Traffic Stopped due to settle issue" at 02:48 WAT. INITIAL REVIEW, [[Olamide Ajibulu]]. Polaris had been restored only ~2 days.
- 2026-04-10 11:00 WAT — TDSD-6385 (Sterling) and TDSD-6346 (Polaris VPN) both administratively closed. TDSD-6493 settlement issue still zero comments.
- 2026-04-10 15:00 WAT — TDSD-6493 confirmed zero comments at 15:00 WAT scan. 12h+ since filing with no Jira activity.
- 2026-04-11 07:08 WAT — TDSD-6493 still zero comments. 28h+ with no activity.
- 2026-04-12 10:09 WAT — Hourly Report confirms Sterling still OFF, CoralPay engaging bank for permanent fixes. Polaris settlement status unverifiable (Jira auth failure). Union Bank settlements >20m failing RC 58 (TDSD-6276) adds settlement pressure.
- 2026-04-12 12:09 WAT — Hourly Report 11:59 WAT reconfirms same status. No change. Jira auth failure continues (14th tick, >13h blind).
- 2026-04-12 16:05 WAT — Duty Handover Note confirms no change. Sterling OFF, CoralPay engaging bank. 16/17 routes operational. Jira auth failure now 18th consecutive tick, >16h blind.
- 2026-04-14 08:09 WAT — Duty Handover Note #20260414 reconfirms Sterling OFF (Day 4+). Only bank listed as off. 16/17 PTSAs operational. TDSD-6385 referenced as active. No resolution timeline. Jira auth failure now 57+ consecutive ticks, >57h blind — Polaris TDSD-6493 still unverifiable.