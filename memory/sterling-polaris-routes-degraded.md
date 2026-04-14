---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Sterling remains OFF (Day 4+). Hourly Report #20260414 20:33 WAT confirms 16/17 routes operational — Sterling off due to persistent RC91, CoralPay engaging bank. Fourth reconfirmation today (08:01, 16:04, 18:33, 20:33 WAT). No new Polaris signals (Jira still blind, 69+ ticks)."
updated: "2026-04-14T20:13:01Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Sterling Bank]] remains OFF (Day 4+). [[TDSD-6385]] administratively closed Apr 10 ("routed off pending bank resolution") — no fix timeline. Duty Handover Notes #20260414 reconfirmed twice today: morning ([[Innocent Nwaokorie]], 08:01 WAT) and afternoon ([[Olamide Ajibulu]] → [[Qazim Adedigba]], 16:04 WAT). Afternoon handover cites [[TDSD-6548]] alongside TDSD-6385 as active Sterling RC91 tickets. Hourly Reports #20260414 (Qazim, 18:33 WAT and 20:33 WAT/21:01 WAT) — third and fourth confirmations of the day: "Sterling transactions were turned off due to persistent RC 91 failures, Coralpay is engaging the bank for permanent fixes." [[CoralPay]] engagement with bank continues per Apr 12 handover. This is a permanent-fix track, not a temporary cycle.

**Afternoon handover (Apr 14, 16:04 WAT) net new details:** Sterling OFF reconfirmed; UBA intermittent failure RESOLVED at 13:30 WAT; Kafka healthy; UBA validation for Apr 2 sent; Union problem ticket TDSD-6276 open; Eco settlements issue TDSD-6540 open. Access Bank participant reports from March 3, 2025 still pending.

**Evening Hourly Reports (Apr 14, 18:33 WAT and 20:33 WAT):** Status-quo reporting from Qazim — 16 of 17 routes operational, Sterling off with CoralPay engagement ongoing, no new action items. Fourth reconfirmation today (08:01, 16:04, 18:33, 20:33 WAT) of the same state — pattern is static, structural fix (CoralPay→Sterling) remains the only path forward. No CTO escalation surface — operations loop is functioning and the block is bank-side.

[[Polaris Bank]] VPN track closed ([[TDSD-6346]]). [[TDSD-6493]] (Polaris settlement issue) status unknown — Jira auth failure prevents verification (69+ consecutive ticks, >69h blind). Union Bank settlements >20m also failing RC 58 (TDSD-6276, known issue) — separate track.

## Sources
jira TDSD-6385 (Completed 08:27 WAT Apr 10), TDSD-6346 (Completed 08:32 WAT Apr 10), TDSD-6493 (INITIAL REVIEW, zero comments, confirmed 07:08 WAT Apr 11), TDSD-6548 (Sterling RC91 referenced in afternoon handover), TDSD-6276 (Union), TDSD-6540 (Eco settlements); email Hourly Reports 20260412 (Qazim Adedigba, 09:24, 11:59, 15:55 WAT); email Duty Handover Note 20260412 (Qazim Adedigba, 16:05 WAT Apr 12); email Duty Handover Note #20260414 morning ([[Innocent Nwaokorie]], 08:01 WAT Apr 14); email Duty Handover Note #20260414 afternoon ([[Olamide Ajibulu]] → [[Qazim Adedigba]], 16:04 WAT Apr 14); email Hourly Reports 20260414 ([[Qazim Adedigba]], 18:33 WAT and 20:33 WAT/21:01 WAT Apr 14)

## Deltas
- 2026-04-10 07:00 WAT — TDSD-6493 filed: Polaris settlement issue.
- 2026-04-10 11:00 WAT — TDSD-6385 (Sterling) and TDSD-6346 (Polaris VPN) both administratively closed.
- 2026-04-11 07:08 WAT — TDSD-6493 still zero comments. 28h+ with no activity.
- 2026-04-12 10:09 WAT — Sterling still OFF, CoralPay engaging bank. Union RC 58 (TDSD-6276) adds settlement pressure.
- 2026-04-12 12:09 WAT — Hourly Report 11:59 WAT reconfirms same status.
- 2026-04-12 16:05 WAT — Duty Handover confirms no change. Sterling OFF, 16/17 routes operational.
- 2026-04-14 08:09 WAT — Duty Handover #20260414 reconfirms Sterling OFF (Day 4+). Only bank listed off.
- 2026-04-14 16:20 WAT — 2nd Duty Handover reconfirms; TDSD-6548 added alongside TDSD-6385. UBA intermittent RESOLVED 13:30 WAT.
- 2026-04-14 19:09 WAT — Hourly Report (Qazim, 18:33 WAT) — third confirmation of the day.
- 2026-04-14 21:09 WAT — Hourly Report (Qazim, 20:33 WAT Apr 14 / 21:01 WAT local BST-reporting) — fourth confirmation of the day. Same state: 16/17 routes operational, Sterling off with CoralPay engagement. Pattern static. No CTO action needed; structural fix (CoralPay→Sterling) remains the only path. Jira auth failure 69+ ticks, >69h blind.