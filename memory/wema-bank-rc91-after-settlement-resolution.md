---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 After Settlement Resolution
status: developing
created: "2026-04-11T16:44:43Z"
summary: "Settlement track completed Apr 8. Five RC91 cycles (Apr 8, Apr 11 overnight, Apr 11 evening, Apr 12 midnight, Apr 12 03:41 WAT) — frequency accelerating. No Jira tickets filed for any cycle."
updated: "2026-04-12T03:12:46Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Settlement track ([[TDSD-6446]]) completed Apr 8 by [[Emeka Joseph]]. Five RC91 cycles with accelerating frequency:

1. **Apr 8 evening:** 19:47–20:10 WAT (23 min, bank-resolved, [[Olamide Ajibulu]])
2. **Apr 11 overnight:** 00:30–01:00 WAT (30 min, bank-resolved)
3. **Apr 11 evening:** ~19:21–19:32 WAT (~11 min, bank-resolved, [[Korede Oladunjoye]] confirmed)
4. **Apr 12 midnight:** Filed 00:30 WAT by [[Olamide Ajibulu]] (email to Wema Switching and Payments, 00:40 WAT). Slack P1 posted at 00:43 WAT. Resolution status unknown — no confirmation signal received before cycle 5 began.
5. **Apr 12 03:41 WAT (current):** Filed by [[Olamide Ajibulu]] (email to [[Wema Bank]] Switching and Payments Services at 03:41 WAT). Transactions failing with RC91 and high processing time. Status: ONGOING.

Pattern: Four cycles in ~27 hours (Apr 11–12). Cycle 5 began less than 3 hours after cycle 4 was filed. Frequency is accelerating and inter-cycle gap is shrinking. [[Wema Bank]] AIR reversal timeouts (SRE L2 escalation from Duty Handover Apr 7) still unconfirmed resolved.

No Jira tickets filed for any of the five RC91 cycles. This is a documentation gap — recurring P1s with zero Jira trail.

## Sources
email Wema RC91 thread 19:48–20:01 WAT Apr 8; jira TDSD-6446 Completed; slack #teamapt-tech-operations; email Wema RC91 19:21–19:32 WAT Apr 11; email Wema RC91 00:40 WAT Apr 12; slack #teamapt-tech-operations 00:43 WAT Apr 12; email Wema RC91 03:41 WAT Apr 12

## Deltas
- 2026-04-11 01:09 WAT — New RC91 cycle overnight: 00:30–01:00 WAT (30 min, bank-resolved). [[Olamide Ajibulu]] posted resolution at 00:39 WAT. No Jira ticket filed. Second Wema RC91 cycle.
- 2026-04-11 19:32 WAT — Third RC91 cycle: [[Innocent Nwaokorie]] reported RC91 and high processing time at 19:21 WAT. Korede Oladunjoye ([[Wema Bank]]) confirmed transactions processing successfully at 19:32 WAT. Duration ~11 min. Two cycles in one day — frequency increasing.
- 2026-04-12 00:43 WAT — Fourth RC91 cycle filed. [[Olamide Ajibulu]] reported RC91 and high processing time (email 00:40 WAT, Slack P1 00:43 WAT). Three cycles in 28 hours. Concurrent with Fidelity RC91 P1.
- 2026-04-12 03:41 WAT — Fifth RC91 cycle filed. [[Olamide Ajibulu]] reported RC91 and high processing time (email to Wema Switching and Payments Services). Four cycles in ~27 hours. Inter-cycle gap shrinking.