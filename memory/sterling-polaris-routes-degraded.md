---
role: cto-teamapt
type:
  - "situation"
title: Sterling + Polaris — Routes Degraded
status: stable
created: "2026-04-11T16:43:06Z"
summary: "Sterling remains OFF (Day 6+). Duty Handover 00:06 WAT Apr 16 re-confirms 16/17 routes operational — Sterling off, CoralPay engaging bank. No timeline on fix. Stable pattern continues."
updated: "2026-04-16T05:32:00Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Sterling Bank]] remains OFF (Day 6+). [[TDSD-6385]] administratively closed Apr 10 ("routed off pending bank resolution") — no fix timeline. [[CoralPay]] engagement with bank continues per Apr 12 handover. This is a permanent-fix track, not a temporary cycle.

**Current (Apr 16, 06:23 WAT):** Qazim Adedigba's Duty Handover Note 20260415 (00:06 WAT Apr 16) re-confirms status: "16 of 17 routes operational. Sterling transactions were turned off due to persistent RC 91 failures, Coralpay is engaging the bank for permanent fixes." Open tickets: TDSD-6276 (Union Bank Settlement), TDSD-6385 (Sterling RC91). Zero tickets raised/closed overnight. Pattern static — sixth consecutive day off.

[[Polaris Bank]] VPN track closed ([[TDSD-6346]]). [[TDSD-6493]] (Polaris settlement issue) status unknown — Jira auth failure prevents verification (100+ consecutive ticks).

## Sources
jira TDSD-6385, TDSD-6346, TDSD-6493; email Duty Handover Note 20260415 (Qazim Adedigba, 00:06 WAT Apr 16); email Hourly Reports 20260415 (Qazim Adedigba, 23:58 WAT Apr 15)

## Deltas
- 2026-04-10 11:00 WAT — TDSD-6385 (Sterling) administratively closed.
- 2026-04-12 10:09 WAT — Sterling still OFF, CoralPay engaging bank.
- 2026-04-14 08:09 WAT — Duty Handover reconfirms Sterling OFF (Day 4+).
- 2026-04-15 07:10 WAT — Day 5+ off. Briefing-2026-04-15 B6 Awareness.
- 2026-04-16 06:23 WAT — **Day 6+ off.** Duty Handover 00:06 WAT re-confirms. Status changed `developing` → `stable` — no active remediation path, condition is static pending CoralPay/bank resolution. Briefing-2026-04-16 B8 Awareness.