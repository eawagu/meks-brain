---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: "24+ P1 RC91 cycles Apr 3–16. Cycle 24 filed Apr 16 10:11 WAT (ongoing). Investigation fulfilled — root cause is Stanbic CBA instability + Moniepoint inactive-node routing. Structural fix (routing-restoration automation) not deployed. Part of 4-bank simultaneous RC91 pattern Apr 16 (FCMB, Stanbic, Union, UBA)."
updated: "2026-04-16T10:14:58Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Twenty-four+ confirmed P1 cycles Apr 3–16 (14 days), all bank-resolved, same root cause unfixed. [[TDSD-6425]] administratively closed Apr 10 — closure does NOT resolve the strategic escalation posture decision. "Decide [[Stanbic Bank]] ATS escalation posture" state item 11+ days overdue (due Apr 6).

**Investigation FULFILLED Apr 15:** [[Oladapo Onayemi]]'s finding (DM, Apr 14 15:07–15:27 WAT): root cause is Stanbic CBA instability (primary trigger) + Moniepoint routes requests to an inactive node during failure, then fails to restore routing config after Stanbic recovers (amplifier). NOT a processing-latency problem — contradicts NIBSS attribution. Moniepoint team escalated "severally" by Oladapo without result. **Structural fix: routing-restoration automation** — lives inside Moniepoint's Domestic Switching department ([[Babatunde Okufi]]). Fix not deployed; cycles continue as expected.

**Escalation posture decision** surfaced as briefing-2026-04-16 B2 with three paths: (1) direct peer escalation to Babatunde Okufi, (2) dotted-line to [[Felix Ike]], (3) Dennis Ajalie group-level. Not yet triaged.

**Apr 16 — 4-bank simultaneous RC91 pattern:** FCMB (morning, intermittent after initial resolution 08:19–09:02 WAT), Stanbic (cycle 24, 10:11 WAT ongoing), [[Union Bank]] (11:04 WAT ongoing), [[UBA]] (10:35 WAT filed). Four banks in one day exceeds the systemic-pattern threshold. Reinforces the NIBSS-side / Moniepoint-infrastructure root cause over per-bank explanations.

Cycle 24 on Apr 16: [[Afeez Kazeem]] posted P1 in #teamapt-tech-operations at 10:20 BST: "P1: Stanbic Bank RC 91 failures across processors. Cause: From the bank. Ongoing. Start Time 10:11 AM." Escalated to bank for investigation and resolution. Standard pattern — bank-resolved expected.

Cycle 23 on Apr 14 morning (brief): Slack P1 log 09:51 BST recorded Start 09:46 → End 09:58 BST, **12-minute duration**, bank-resolved. Separate from and shorter than cycle 22 filed earlier by [[Olamide Ajibulu]]. Standard short-cycle pattern.

Cycle 22 on Apr 14 morning: [[Olamide Ajibulu]] filed at 10:48 WAT (09:48 UTC) via email to itservicemanagementnigeria + servicemonitoring, cc aptpaytechnicalsupport. Subject: "Stanbic | RC91| 20260414." Stanbic SRE ([[Onyedikachukwu Udeaja]]) requested reconfirmation at 09:52 WAT. [[Olamide Ajibulu]] confirmed "transactions are now processing successfully" at 10:01 WAT. Pattern unchanged, bank-resolved.

Concurrent morning pattern: Three banks filed RC91 P1s on Apr 14 morning inside a 4.5-hour window (UBA cycles 1–4 per [[UBA]], Stanbic cycles 22 and 23, Polaris cycle Slack-filed 10:50 BST). Plus active [[NIBSS DD — Pending Mandate P1 Active]] ongoing since 03:00 WAT. The cross-bank co-occurrence is consistent with NIBSS-side degradation rather than per-bank issues.

NIBSS Citrix LB migration completed successfully overnight Apr 12–13: [[Oladapo Onayemi]] confirmed all NIBSS services functioning at 19:30 WAT Apr 13. Migration does not appear to have affected RC91 pattern — cycles continued post-migration.

Settlement validation thread active: [[Emeka Joseph]] confirming DCIR transaction migration to Stanbic team; Stanbic (Lucky Ohiorenuan) requesting failed transaction list citing CBN timeline pressure at 16:37 WAT Apr 11. ATS JAR deployment: [[Babajide Ojoboorun]] sent jar link to Stanbic (Oluwatobi Meshioye) at 20:11 WAT Apr 11 — deployment session pending Stanbic action.

## Sources
email Stanbic RC91 thread Apr 3–16; slack #teamapt-tech-operations (cycle 24 Apr 16, cycle 22 + cycle 23 Apr 14); jira TDSD-6425 (Completed Apr 10); jira TDSD-6518 (filed Apr 12); email settlement validation Apr 10–11; email ATS JAR deployment Apr 11; email NIBSS PTSA RC91 Apr 12 + Apr 15; **slack #teamapt-tech-operations cycle 24 10:20 BST Apr 16 ([[Afeez Kazeem]])**

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
- 2026-04-13 21:30 WAT — Cycle 21+: [[Daniel Armstrong]] reported resurfaced. Resolved 21:59 WAT (~30 min).
- 2026-04-14 10:09 WAT — Cycle 22: [[Olamide Ajibulu]] filed 10:48 WAT (09:48 UTC).
- 2026-04-14 12:09 WAT — Cycle 23 identified via Slack P1 log: 12-min bank-resolved cycle.
- 2026-04-15 10:09 WAT — Fresh NIBSS-wide RC91 signal: 4-min failure window 09:49–09:53 WAT.
- 2026-04-15 14:09 WAT — Investigation commitment FULFILLED. Oladapo finding: Stanbic CBA instability + Moniepoint inactive-node routing amplifier. Structural fix: routing-restoration automation (Domestic Switching / Babatunde Okufi).
- 2026-04-16 11:20 WAT — Cycle 24: [[Afeez Kazeem]] filed P1 in #teamapt-tech-operations 10:20 BST (Start 10:11 AM WAT, ongoing). Part of 4-bank simultaneous RC91 pattern (FCMB, Stanbic, Union, UBA).