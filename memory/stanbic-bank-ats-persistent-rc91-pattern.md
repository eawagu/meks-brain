---
role: cto-teamapt
type:
  - "situation"
title: Stanbic Bank ATS — Persistent RC91 Pattern
status: developing
created: "2026-04-11T16:42:02Z"
summary: "24+ P1 RC91 cycles Apr 3–16. Cycle 24 filed Apr 16 10:11 WAT — ~4h active at 14:09 WAT, no resolution signal. Third Immediate alert dispatched. NIBSS PTSA route failure filed 13:12 WAT — potential systemic root cause of simultaneous RC91s. Investigation fulfilled — CBA instability + inactive-node routing. Structural fix not deployed."
updated: "2026-04-16T15:15:19Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Twenty-four+ confirmed P1 cycles Apr 3–16 (14 days), all bank-resolved, same root cause unfixed. [[TDSD-6425]] administratively closed Apr 10 — closure does NOT resolve the strategic escalation posture decision. "Decide [[Stanbic Bank]] ATS escalation posture" state item 11+ days overdue (due Apr 6).

**Investigation FULFILLED Apr 15:** [[Oladapo Onayemi]]'s finding (DM, Apr 14 15:07–15:27 WAT): root cause is Stanbic CBA instability (primary trigger) + Moniepoint routes requests to an inactive node during failure, then fails to restore routing config after Stanbic recovers (amplifier). NOT a processing-latency problem — contradicts NIBSS attribution. Moniepoint team escalated "severally" by Oladapo without result. Automation of routing-restoration is the structural fix and lives inside Moniepoint's Domestic Switching department ([[Babatunde Okufi]]).

**Cycle 24 (Apr 16):** Filed 10:11 WAT by [[Afeez Kazeem]] to Stanbic Bank. ~5h+ active at 15:15 WAT, no resolution signal. Coincides with [[UBA]] RC91 (10:35 WAT, ongoing) and [[Union Bank]] RC91 (11:04 WAT, resolved 12:00 WAT). [[NIBSS PTSA — Route Failure Apr 16]] filed at 13:12 WAT — systemic PTSA-level failure may be the common root cause of all three simultaneous RC91s. If so, cycle 24 duration is extended by NIBSS infrastructure failure rather than Stanbic CBA instability alone.

**Daily Report #20260416** (Afeez Kazeem, 15:50 WAT) does NOT list Stanbic-specific ticket for cycle 24. FCMB (TDSD-6572), NIBSS (TDSD-6578), Union (TDSD-6576 resolved), UBA (TDSD-6574 ongoing) are listed. This may indicate Stanbic resolved without explicit confirmation email, or the daily report omitted it. Absence of resolution email in the 14:09–15:15 WAT window means the heartbeat continues to track as active.

## Sources
Email, Slack DM, Jira (TDSD-6425 closed), brain commitment page, email 2026-04-16 10:20 BST Afeez Kazeem, Daily Report 2026-04-16 15:50 WAT

## Deltas
- 2026-04-16 11:15 WAT — Cycle 24 filed. Stanbic RC91 start 10:11 WAT. Concurrent with UBA and Union Bank RC91s (4-bank systemic pattern with FCMB).
- 2026-04-16 12:09 WAT — Cycle 24 exceeded 2h silence threshold. Immediate alert dispatched.
- 2026-04-16 13:09 WAT — ~3h active. Continued silence. Immediate alert re-dispatched. NIBSS PTSA route failure identified as potential systemic root cause.
- 2026-04-16 14:09 WAT — ~4h active. NIBSS PTSA route failure filed 13:12 WAT. Systemic root-cause hypothesis: PTSA failure driving concurrent RC91s.
- 2026-04-16 15:15 WAT — ~5h active. Daily Report does not list Stanbic-specific ticket. No resolution signal. UBA confirmed ongoing. NIBSS PTSA confirmed ongoing. AWS Outposts new connectivity loss (14:59 WAT) + account switch portal unreachable (TDSD-6586) — infrastructure compounding.