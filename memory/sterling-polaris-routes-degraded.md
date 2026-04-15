---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: developing
created: "2026-04-11T16:43:06Z"
summary: "Sterling remains OFF (Day 4+). Hourly Report #20260414 20:33 WAT confirms 16/17 routes operational — Sterling off due to persistent RC91, CoralPay engaging bank. Fourth reconfirmation today (08:01, 16:04, 18:33, 20:33 WAT). No new Polaris signals (Jira still blind, 69+ ticks)."
updated: "2026-04-15T06:22:01Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Sterling Bank]] remains OFF (Day 5+). [[TDSD-6385]] administratively closed Apr 10 ("routed off pending bank resolution") — no fix timeline. [[CoralPay]] engagement with bank continues per Apr 12 handover. This is a permanent-fix track, not a temporary cycle.

**Current (Apr 15, 07:10 WAT):** Qazim Adedigba's 23:57 WAT Apr 14 hourly report (fifth confirmation in the Apr 14 24h cycle) re-confirms status: "16 of 17 routes operational. Sterling transactions were turned off due to persistent RC 91 failures, Coralpay is engaging the bank for permanent fixes." Three open tickets listed: TDSD-6276 (Union Bank settlement), TDSD-6385 (Sterling RC91), TDSD-6548 (UBA intermittent RC91). No new action items. Pattern static — structural fix remains only path. Briefing-2026-04-15 B6 surfaces as Awareness; no CTO action.

[[Polaris Bank]] VPN track closed ([[TDSD-6346]]). [[TDSD-6493]] (Polaris settlement issue) status unknown — Jira auth failure prevents verification (80+ consecutive ticks, briefing-2026-04-15 B2 tracking).

## Sources
jira TDSD-6385, TDSD-6346, TDSD-6493, TDSD-6548, TDSD-6276, TDSD-6540; email Hourly Reports 20260412 (Qazim, 09:24, 11:59, 15:55 WAT); email Duty Handover Note 20260412 (Qazim, 16:05 WAT Apr 12); email Duty Handover Note #20260414 morning ([[Innocent Nwaokorie]], 08:01 WAT Apr 14); email Duty Handover Note #20260414 afternoon ([[Olamide Ajibulu]] → [[Qazim Adedigba]], 16:04 WAT Apr 14); email Hourly Reports 20260414 ([[Qazim Adedigba]], 18:33 WAT, 20:33 WAT, and 23:57 WAT Apr 14)

## Deltas
- 2026-04-10 07:00 WAT — TDSD-6493 filed: Polaris settlement issue.
- 2026-04-10 11:00 WAT — TDSD-6385 (Sterling) and TDSD-6346 (Polaris VPN) both administratively closed.
- 2026-04-11 07:08 WAT — TDSD-6493 still zero comments. 28h+ with no activity.
- 2026-04-12 10:09 WAT — Sterling still OFF, CoralPay engaging bank.
- 2026-04-12 16:05 WAT — Duty Handover confirms no change.
- 2026-04-14 08:09 WAT — Duty Handover reconfirms Sterling OFF (Day 4+).
- 2026-04-14 16:20 WAT — 2nd Duty Handover; TDSD-6548 added.
- 2026-04-14 19:09 WAT — Hourly Report (Qazim, 18:33 WAT) — third confirmation of the day.
- 2026-04-14 21:09 WAT — Hourly Report (Qazim, 20:33/21:01 WAT) — fourth confirmation.
- 2026-04-15 07:10 WAT — Hourly Report (Qazim, 23:57 WAT Apr 14) — **fifth confirmation** of static state: 16/17 routes operational, Sterling off, CoralPay engagement ongoing. Sterling now Day 5+ off. Briefing-2026-04-15 B6 Awareness; no CTO action unless CoralPay timeline slips beyond this week.
