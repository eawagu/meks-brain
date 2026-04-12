---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: "20 P1 RC91 cycles in 11 days (Apr 3–12). Cycle 20 (TDSD-6518) filed 13:47 WAT Apr 12. NIBSS attributes RC91 to Moniepoint timeout. Escalation posture decision 6+ days overdue."
updated: "2026-04-12T13:12:27Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Twenty confirmed P1 cycles Apr 3–12 (11 days), all bank-resolved, same root cause unfixed. [[TDSD-6425]] administratively closed Apr 10 — closure does NOT resolve the strategic escalation posture decision. "Decide [[Stanbic Bank]] ATS escalation posture" state item 6+ days overdue (due Apr 6). Cycle 18 on Apr 12 early morning: [[Olamide Ajibulu]] reported Stanbic card transactions failing with RC91 and high processing time at 01:39 WAT. [[Peace Ikhuenbor]] (Stanbic SRE) acknowledged at 01:47 WAT — support team working towards resolution. At 02:40 WAT, Peace asked Olamide to "reconfirm as this has been resolved." At 02:48 WAT, Olamide responded that **failure still persists** — direct contradiction of the bank's claim. At 03:40 WAT, Olamide sent another follow-up to Peace requesting update — still no resolution confirmation. At 04:49 WAT, [[Olamide Ajibulu]] escalated to [[NIBSS]] PTSA reporting failures on transactions sent to NIBSS's node at 04:41 WAT on Apr 12. At 06:15 WAT, [[Peace Ikhuenbor]] again asked to "reconfirm status" — second reconfirmation request, implying Stanbic believes the issue is resolved on their end. At 08:56 WAT, [[NIBSS]] (Moses Ajani) responded: **transactions were declined due to "no response from your end within the timeout period"** — NIBSS attributes RC91 to Moniepoint's slow processing, not bank or NIBSS infrastructure. NIBSS notes responses were received after the timeout period. **Narrative shift: if NIBSS is correct, the root cause is Moniepoint processing latency, not Stanbic ATS.** This contradicts the longstanding framing of the issue as bank-side. Both frames held pending verification — Moniepoint engineering needs to investigate whether processing time to NIBSS node is anomalous.

Cycle 20 (TDSD-6518): [[Qazim Adedigba]] filed at 13:47 WAT Apr 12. Email to Stanbic (Chukwuemeka Erobi, Godwin Ajiboye, Mayor Onyebueke, Damilola Badiru, TechnologyCardSupport, Oluwatobi Meshioye, Toluwase Shorun, Oladipo Oluawe, Nzube Okezie, Service Monitoring, IT Service Management, ITSM Team, Samson Ibekwe). CC: aptpaytechnicalsupport. Subject: "Stanbic Bank | ATS | RC 91 Failure | 20260412 | TDSD-6518". Pattern continues — 20th cycle, no permanent fix, escalation posture decision still unresolved.

Concurrent RC91 on Apr 12: [[Union Bank]] RC91 (TDSD-6519, 14:02 WAT, [[Qazim Adedigba]]); [[Access Bank]] RC91 (02:24–03:04 WAT, resolved); [[Wema Bank]] RC91 (03:41 WAT). Multi-bank RC91 continues to support the NIBSS/Moniepoint-side hypothesis.

Settlement validation thread active: [[Emeka Joseph]] confirming DCIR transaction migration to Stanbic team; Stanbic (Lucky Ohiorenuan) requesting failed transaction list citing CBN timeline pressure at 16:37 WAT Apr 11. ATS JAR deployment: [[Babajide Ojoboorun]] sent jar link to Stanbic (Oluwatobi Meshioye) at 20:11 WAT Apr 11 — deployment session pending Stanbic action. If jars were not deployed, these cycles are expected.

## Sources
email Stanbic RC91 thread Apr 3–12; slack #teamapt-tech-operations; jira TDSD-6425 (Completed Apr 10); jira TDSD-6518 (filed Apr 12); email settlement validation Apr 10–11; email ATS JAR deployment Apr 11; email NIBSS PTSA RC91 04:49 WAT Apr 12; email Stanbic reconfirmation 06:15 WAT Apr 12; email NIBSS response 08:56 WAT Apr 12 (Moses Ajani — timeout attribution); email TDSD-6518 13:47 WAT Apr 12 (Qazim)

## Deltas
- 2026-04-09 17:02 WAT — Jira TDSD-6425 confirmed still Work in Progress, last updated Apr 3 09:23 WAT, single comment ("Escalating to the bank"), no new activity in 6+ days. Ravi/Emeka meeting declined — escalation posture decision did not occur.
- 2026-04-09 19:00 WAT — Cycle 15 filed by [[Olamide Ajibulu]] at 18:24 WAT (start 17:30 WAT), still ongoing. [[Oladapo Onayemi]] requested incident update and RCA from Olamide at 17:18 WAT.
- 2026-04-09 21:00 WAT — Cycle 15 RESOLVED at 20:07 WAT by [[Olamide Ajibulu]]. Duration: 2h 37min. 15 cycles in 7 days confirmed. TDSD-6425 still zero activity.
- 2026-04-10 01:13 WAT — TDSD-6425 confirmed no new Jira activity (day 8). No new RC91 cycles overnight. Separate track: [[Emeka Joseph]] held Webex with Toluwase Shorun ([[Stanbic Bank]]) on settlement account.
- 2026-04-10 09:09 WAT — Resolution message in Slack at 08:21 WAT. Timing ambiguous — possible cycle 16 overnight.
- 2026-04-10 11:00 WAT — TDSD-6425 moved to Completed at 08:15 WAT. This is cycle 16 confirmed. Ticket administratively closed. Strategic escalation posture decision remains open and 4+ days overdue.
- 2026-04-11 11:39 WAT — Cycle 17: resurfaced at 10:25 WAT ([[Daniel Armstrong]]), Stanbic reconfirmed at 10:52 WAT, resolved by 11:39 WAT. Pattern continues post-ticket-closure.
- 2026-04-11 17:01 WAT — ATS JAR deployment request sent to Stanbic (Oluwatobi Meshioye) by [[Babajide Ojoboorun]].
- 2026-04-11 19:32 WAT — Settlement thread: Stanbic (Lucky Ohiorenuan) requesting failed transaction list citing CBN timeline pressure. [[Emeka Joseph]] confirmed DCIR migration complete at 17:32 WAT.
- 2026-04-11 20:11 WAT — ATS JAR deployment follow-up: [[Babajide Ojoboorun]] sent jar link to Stanbic (Oluwatobi Meshioye). Deployment session pending Stanbic action.
- 2026-04-12 01:39 WAT — Cycle 18: [[Olamide Ajibulu]] reported Stanbic card transactions failing with RC91 and high processing time. Email to Stanbic IT Service Management and Service Monitoring. [[Peace Ikhuenbor]] acknowledged at 01:47 WAT.
- 2026-04-12 02:40 WAT — [[Peace Ikhuenbor]] asked to reconfirm, claiming issue resolved. [[Olamide Ajibulu]] disputed at 02:48 WAT — failure still persists. Bank/Moniepoint contradiction on resolution status.
- 2026-04-12 03:40 WAT — [[Olamide Ajibulu]] sent another follow-up to Stanbic requesting update. No response received. Cycle 18 now >2h — Immediate threshold breached.
- 2026-04-12 04:49 WAT — [[Olamide Ajibulu]] escalated to [[NIBSS]] PTSA: failures on transactions sent to NIBSS node at 04:41 WAT. NIBSS-level involvement suggests routing-layer impact beyond Stanbic ATS alone. Cycle 18 now >3h, still unresolved.
- 2026-04-12 06:15 WAT — [[Peace Ikhuenbor]] again asked to "reconfirm status" — second reconfirmation request from Stanbic in this cycle. Bank maintains issue is resolved on their end. No confirmation from Moniepoint ops. Cycle 18 now >4.5h.
- 2026-04-12 08:56 WAT — [[NIBSS]] (Moses Ajani) responded to PTSA escalation: transactions declined due to "no response from your end within the timeout period." NIBSS received responses after timeout. **Cause attribution shift: NIBSS says Moniepoint processing latency caused the RC91, not bank ATS.** Multi-bank RC91 tonight (Access, Wema) consistent with Moniepoint-side hypothesis. Both frames held pending engineering investigation.
- 2026-04-12 13:47 WAT — Cycle 20: [[Qazim Adedigba]] filed TDSD-6518 — new RC91 failure on Stanbic. Email to Stanbic team (Erobi, Ajiboye, Onyebueke, Badiru, TechnologyCardSupport, Meshioye, Shorun, Oluawe, Okezie, Service Monitoring, ITSM). Pattern unbroken — 20th cycle, no permanent fix.