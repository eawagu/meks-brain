---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 After Settlement Resolution
status: developing
created: "2026-04-11T16:44:43Z"
summary: Settlement track completed Apr 8. Four RC91 cycles (Apr 8, Apr 11 overnight, Apr 11 evening, Apr 12 midnight) — frequency accelerating. No Jira tickets filed for any cycle.
updated: "2026-04-12T00:12:48Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Settlement track ([[TDSD-6446]]) completed Apr 8 by [[Emeka Joseph]]. Four RC91 cycles with accelerating frequency:

1. **Apr 8 evening:** 19:47–20:10 WAT (23 min, bank-resolved, [[Olamide Ajibulu]])
2. **Apr 11 overnight:** 00:30–01:00 WAT (30 min, bank-resolved)
3. **Apr 11 evening:** ~19:21–19:32 WAT (~11 min, bank-resolved, [[Korede Oladunjoye]] confirmed)
4. **Apr 12 midnight (current):** Filed 00:30 WAT by [[Olamide Ajibulu]] (email to Wema Switching and Payments, 00:40 WAT). Slack P1 posted at 00:43 WAT. Status: ONGOING.

Pattern: Three cycles in 28 hours (Apr 11–12). Two cycles on Apr 11, now a third within 5 hours of the last resolution. Frequency is accelerating and duration between cycles is shrinking. [[Wema Bank]] AIR reversal timeouts (SRE L2 escalation from Duty Handover Apr 7) still unconfirmed resolved.

No Jira tickets filed for any of the four RC91 cycles. This is a documentation gap — recurring P1s with zero Jira trail.

Concurrent with [[Fidelity Bank]] RC91 P1 (also ongoing as of 00:47 WAT Apr 12). Two banks simultaneously in RC91 failure.

## Sources
email Wema RC91 thread 19:48–20:01 WAT Apr 8; jira TDSD-6446 Completed; slack #teamapt-tech-operations; email Wema RC91 19:21–19:32 WAT Apr 11; email Wema RC91 00:40 WAT Apr 12; slack #teamapt-tech-operations 00:43 WAT Apr 12

## Deltas
- 2026-04-11 01:09 WAT — New RC91 cycle overnight: 00:30–01:00 WAT (30 min, bank-resolved). [[Olamide Ajibulu]] posted resolution at 00:39 WAT. No Jira ticket filed. Second Wema RC91 cycle.
- 2026-04-11 19:32 WAT — Third RC91 cycle: [[Innocent Nwaokorie]] reported RC91 and high processing time at 19:21 WAT. Korede Oladunjoye ([[Wema Bank]]) confirmed transactions processing successfully at 19:32 WAT. Duration ~11 min. Two cycles in one day — frequency increasing.
- 2026-04-12 00:43 WAT — Fourth RC91 cycle filed. [[Olamide Ajibulu]] reported RC91 and high processing time (email 00:40 WAT, Slack P1 00:43 WAT). ONGOING. Three cycles in 28 hours. Concurrent with Fidelity RC91 P1.