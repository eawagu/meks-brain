---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 After Settlement Resolution
status: developing
created: "2026-04-11T16:44:43Z"
summary: Settlement track completed Apr 8. Three RC91 cycles (Apr 8, Apr 11 overnight, Apr 11 evening) — frequency increasing. No Jira tickets filed for any cycle.
updated: "2026-04-11T18:51:22Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Settlement track ([[TDSD-6446]]) completed Apr 8 by [[Emeka Joseph]]. Three RC91 cycles: Apr 8 evening (19:47–20:10 WAT, 23 min, bank-resolved, [[Olamide Ajibulu]]), Apr 11 overnight (00:30–01:00 WAT, 30 min, bank-resolved), and Apr 11 evening (~19:21–19:32 WAT, ~11 min, bank-resolved). No Jira tickets filed for any cycle. [[Wema Bank]] AIR reversal timeouts (SRE L2 escalation) from Duty Handover Apr 7 still unconfirmed resolved. Third cycle on Apr 11 — frequency increasing (two cycles in single day). Korede Oladunjoye ([[Wema Bank]] Switching and Payments) confirmed resolution of evening cycle.

## Sources
email Wema RC91 thread 19:48–20:01 WAT Apr 8; jira TDSD-6446 Completed; slack #teamapt-tech-operations; email Wema RC91 19:21–19:32 WAT Apr 11

## Deltas
- 2026-04-11 01:09 WAT — New RC91 cycle overnight: 00:30–01:00 WAT (30 min, bank-resolved). [[Olamide Ajibulu]] posted resolution at 00:39 WAT. No Jira ticket filed. Second Wema RC91 cycle.
- 2026-04-11 19:32 WAT — Third RC91 cycle: [[Innocent Nwaokorie]] reported RC91 and high processing time at 19:21 WAT. Korede Oladunjoye ([[Wema Bank]]) confirmed transactions processing successfully at 19:32 WAT. Duration ~11 min. Two cycles in one day — frequency increasing.