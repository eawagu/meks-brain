---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: 22+ P1 RC91 cycles Apr 3–14. Cycle 22 morning Apr 14 captured earlier this morning. Oladapo Onayemi investigating Moniepoint processing latency per NIBSS attribution — commitment due Apr 15 (tomorrow). Escalation posture decision 9+ days overdue.
updated: "2026-04-15T09:13:52Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Twenty-two+ confirmed P1 cycles Apr 3–14 (12 days), all bank-resolved, same root cause unfixed. [[TDSD-6425]] administratively closed Apr 10 — closure does NOT resolve the strategic escalation posture decision. "Decide [[Stanbic Bank]] ATS escalation posture" state item 9+ days overdue (due Apr 6).

**Investigation track:** [[Oladapo Onayemi]] tasked with investigating whether Moniepoint processing latency to NIBSS node is anomalous (per NIBSS attribution of RC91 to Moniepoint timeout). Commitment due Wed Apr 15 (TODAY). **1:1 confirmed on calendar 12:30–13:00 WAT today** (calendar tool restored this tick after 12 ticks blind). No completion signal as of 10:09 WAT. Natural 1:1 check-in is the forcing function per briefing-2026-04-15 B1. Parallel investigation surface with [[NIBSS DD — Pending Mandate P1 Active]] (same NIBSS-rails root cause) — Oladapo's findings will likely inform both.

**Fresh NIBSS-wide RC91 signal Apr 15 09:49–09:53 WAT (4-min window):** [[Olamide Ajibulu]] notified NIBSS PTSA + [[Moses Ajani]] at 10:00 WAT of transaction failures sent to NIBSS node 09:49–09:53 WAT. Moses Ajani acknowledged 10:06 WAT "will investigate and revert." No specific bank identified in the notification — this is a TeamApt-to-NIBSS-node RC91 pattern, the exact attribution surface Oladapo's investigation targets. Moses Ajani is the same NIBSS contact who attributed Stanbic cycle-18 RC91 to Moniepoint timeout on Apr 12. This is a live data point for the 12:30 1:1 — the pattern continues on NIBSS-rails the day the investigation closes. (Not an Immediate alert: 4-min window, NIBSS already engaged; Briefing tier per config-salience.)

Cycle 23 on Apr 14 morning (brief): Slack P1 log 09:51 BST recorded Start 09:46 → End 09:58 BST, **12-minute duration**, bank-resolved. Separate from and shorter than cycle 22 filed earlier by [[Olamide Ajibulu]]. Standard short-cycle pattern.

Cycle 22 on Apr 14 morning: [[Olamide Ajibulu]] filed at 10:48 WAT (09:48 UTC) via email to itservicemanagementnigeria + servicemonitoring, cc aptpaytechnicalsupport. Subject: "Stanbic | RC91| 20260414." Stanbic SRE ([[Onyedikachukwu Udeaja]]) requested reconfirmation at 09:52 WAT. [[Olamide Ajibulu]] confirmed "transactions are now processing successfully" at 10:01 WAT (UTC offset mixed across thread). Pattern unchanged, bank-resolved.

Cycle 21+ on Apr 13 evening: [[Daniel Armstrong]] reported issue resurfaced at 21:30 WAT. Stanbic SRE ([[Samson Ibekwe]]) acknowledged "receiving attention" at 20:41 UTC, then requested reconfirmation at 20:58 UTC. [[Daniel Armstrong]] confirmed "transactions are processing fine" at 21:59 WAT. Duration: ~30 min. Standard quick-cycle pattern.

Concurrent morning pattern: Three banks filed RC91 P1s on Apr 14 morning inside a 4.5-hour window (UBA cycles 1–4 per [[UBA]], Stanbic cycles 22 and 23, Polaris cycle Slack-filed 10:50 BST). Plus active [[NIBSS DD — Pending Mandate P1 Active]] ongoing since 03:00 WAT. The cross-bank co-occurrence is consistent with NIBSS-side degradation rather than per-bank issues — which is exactly what Oladapo's commitment is investigating.

NIBSS Citrix LB migration completed successfully overnight Apr 12–13: [[Oladapo Onayemi]] confirmed all NIBSS services functioning at 19:30 WAT Apr 13. Migration does not appear to have affected RC91 pattern — cycles continued post-migration.

Cycle 20 (TDSD-6518): [[Qazim Adedigba]] filed at 13:47 WAT Apr 12. Gabriel Rerri (Stanbic IT Command Officer) requested reconfirmation at 14:18 WAT. [[Qazim Adedigba]] confirmed resolution at 14:21 WAT. Duration: ~34 min.

Settlement validation thread active: [[Emeka Joseph]] confirming DCIR transaction migration to Stanbic team; Stanbic (Lucky Ohiorenuan) requesting failed transaction list citing CBN timeline pressure at 16:37 WAT Apr 11. ATS JAR deployment: [[Babajide Ojoboorun]] sent jar link to Stanbic (Oluwatobi Meshioye) at 20:11 WAT Apr 11 — deployment session pending Stanbic action. If jars were not deployed, these cycles are expected.

## Sources
email Stanbic RC91 thread Apr 3–14; email [[Olamide Ajibulu]] Stanbic | RC91| 20260414 filed 10:48 WAT Apr 14; slack #teamapt-tech-operations (cycle 22 + cycle 23 Apr 14); jira TDSD-6425 (Completed Apr 10); jira TDSD-6518 (filed Apr 12); email settlement validation Apr 10–11; email ATS JAR deployment Apr 11; email NIBSS PTSA RC91 04:49 WAT Apr 12; email NIBSS response 08:56 WAT Apr 12 ([[Moses Ajani]] — timeout attribution); email Daniel Armstrong resurfaced 21:30 WAT Apr 13; email Daniel Armstrong resolved 21:59 WAT Apr 13; **email [[Olamide Ajibulu]] 10:00 WAT Apr 15 "NIBSS| RC91|Failed transactions" (4-min window 09:49–09:53 WAT); email [[Moses Ajani]] 10:06 WAT Apr 15 acknowledged investigating**; gcal Oladapo 1:1 12:30–13:00 WAT Apr 15 confirmed (calendar tool restored)

## Deltas
- 2026-04-09 17:02 WAT — Jira TDSD-6425 confirmed still Work in Progress, last updated Apr 3 09:23 WAT, single comment ("Escalating to the bank"), no new activity in 6+ days.
- 2026-04-09 19:00 WAT — Cycle 15 filed by [[Olamide Ajibulu]] at 18:24 WAT.
- 2026-04-09 21:00 WAT — Cycle 15 RESOLVED at 20:07 WAT. Duration: 2h 37min.
- 2026-04-10 01:13 WAT — TDSD-6425 confirmed no new Jira activity (day 8).
- 2026-04-10 11:00 WAT — TDSD-6425 moved to Completed. Cycle 16 confirmed. Ticket administratively closed.
- 2026-04-11 11:39 WAT — Cycle 17: resurfaced 10:25 WAT, resolved 11:39 WAT.
- 2026-04-11 20:11 WAT — ATS JAR deployment follow-up sent to Stanbic.
- 2026-04-12 01:39 WAT — Cycle 18: Olamide reported. Stanbic claimed resolved, Olamide disputed at 02:48 WAT.
- 2026-04-12 04:49 WAT — NIBSS PTSA escalation. NIBSS attributed RC91 to Moniepoint timeout at 08:56 WAT.
- 2026-04-12 13:47 WAT — Cycle 20 (TDSD-6518). Resolved 14:21 WAT (~34 min).
- 2026-04-12 16:36 WAT — Triage: investigation delegated to [[Oladapo Onayemi]], commitment created (due Apr 15).
- 2026-04-13 21:30 WAT — Cycle 21+: [[Daniel Armstrong]] reported resurfaced. [[Samson Ibekwe]] acknowledged. Resolved 21:59 WAT (~30 min).
- 2026-04-14 10:09 WAT — Cycle 22: [[Olamide Ajibulu]] filed 10:48 WAT (09:48 UTC).
- 2026-04-14 11:09 WAT — No new Stanbic signals in 10:09–11:09 WAT window.
- 2026-04-14 12:09 WAT — Cycle 23 identified via Slack P1 log: 12-min bank-resolved cycle.
- 2026-04-15 10:09 WAT — **Fresh NIBSS-wide RC91 signal: 4-min failure window 09:49–09:53 WAT; Olamide Ajibulu notified NIBSS 10:00 WAT; [[Moses Ajani]] acknowledged 10:06 WAT "will investigate and revert." No bank specified — notification is at NIBSS-node level. Same Moses Ajani who attributed Stanbic RC91 to Moniepoint timeout Apr 12. Live data point for Oladapo 12:30 1:1 investigation close-out.** Calendar tool restored — 1:1 confirmed at 12:30 WAT on primary calendar. Commitment remains open, no completion signal received.