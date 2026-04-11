---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: 17+ P1 RC91 cycles in 10 days (Apr 3–11). Settlement validation with CBN pressure. ATS JAR deployment in progress — Babajide sent jars to Stanbic.
updated: "2026-04-11T20:12:34Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Seventeen confirmed P1 cycles Apr 3–11 (10 days), all bank-resolved, same root cause unfixed. [[TDSD-6425]] administratively closed Apr 10 — closure does NOT resolve the strategic escalation posture decision. "Decide [[Stanbic Bank]] ATS escalation posture" state item 5+ days overdue (due Apr 6). Cycle 17 on Apr 11 morning: [[Daniel Armstrong]] reported resurgence at 10:25 WAT, [[Stanbic Bank]] (Samson Ibekwe) asked to reconfirm at 10:52 WAT, Daniel confirmed resolved at 11:39 WAT. Settlement validation thread active: [[Emeka Joseph]] confirming DCIR transaction migration to Stanbic team; Stanbic (Lucky Ohiorenuan) requesting failed transaction list citing CBN timeline pressure at 16:37 WAT. ATS JAR deployment: [[Babajide Ojoboorun]] requested Stanbic (Oluwatobi Meshioye) to move jars to realtime server at 17:01 WAT; follow-up at 20:11 WAT with link to jars — deployment session pending Stanbic action.

## Sources
email Stanbic RC91 thread; slack #teamapt-tech-operations; jira TDSD-6425 (Completed Apr 10); email settlement validation Apr 10–11; email ATS JAR deployment Apr 11

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