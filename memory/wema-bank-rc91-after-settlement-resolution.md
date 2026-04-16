---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 After Settlement Resolution
status: developing
created: "2026-04-11T16:44:43Z"
summary: "Settlement track completed Apr 8. Six RC91 cycles Apr 8–16. Cycle 6 filed 19:06 WAT Apr 16, resolved 19:46 WAT (~40 min). DCIR failure rate still above threshold: 25.26% (19:06 WAT) → 26.68% (20:06 WAT Apr 16) — lower than 66% peak but persistent."
updated: "2026-04-16T19:13:45Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Settlement track ([[TDSD-6446]]) completed Apr 8 by [[Emeka Joseph]]. Six RC91 cycles with accelerating frequency:

1. **Apr 8 evening:** 19:47–20:10 WAT (23 min, bank-resolved, [[Olamide Ajibulu]])
2. **Apr 11 overnight:** 00:30–01:00 WAT (30 min, bank-resolved)
3. **Apr 11 evening:** ~19:21–19:32 WAT (~11 min, bank-resolved, [[Korede Oladunjoye]] confirmed)
4. **Apr 12 midnight:** Filed 00:30 WAT by [[Olamide Ajibulu]] (email to Wema Switching and Payments, 00:40 WAT). Slack P1 posted at 00:43 WAT. Resolution status unknown — no confirmation signal received before cycle 5 began.
5. **Apr 12 03:41 WAT:** Filed by [[Olamide Ajibulu]] (email to [[Wema Bank]] Switching and Payments Services at 03:41 WAT). Transactions failing with RC91 and high processing time.
6. **Apr 16 19:06 WAT:** Filed by [[Olamide Ajibulu]] to Wema Switching and Payments Services. RC91 with high processing time. Wema (Olusegun Eladiya) confirmed processing fine at 19:33 WAT. [[Olamide Ajibulu]] confirmed resolution at 19:46 WAT. ~40 min cycle.

**Apr 15 remediation:** [[Emeka Joseph]] had a call with [[Amonetsone Gbubemi]] (Wema Switching and Payment Officer, Enterprise Technology Management) and followed up via email at 11:30 WAT Apr 15 asking Wema DB team to execute the outlined script so the completed settlement transactions could be updated to successful status. Amonetsone responded 11:43 WAT Apr 15: "This has been treated." — Wema-side remediation script EXECUTED.

**DCIR failure rate trajectory (post-remediation):**
- 19:06 WAT Apr 15: **40.65%** (2× threshold) — first breach since Apr 14 04:06 WAT 100% episode
- 23:20 WAT Apr 15: **20.4%** (just above threshold) — brief dip
- 23:36 WAT Apr 15: **66.0%** (3.3× threshold) — sharp overnight escalation
- 19:06 WAT Apr 16: **25.26%** — DCIR monitoring alert (threshold 20%)
- 20:06 WAT Apr 16: **26.68%** — rising again

The DCIR failure rate has come down from the 66% peak but remains persistently above the 20% threshold. The DB remediation script addressed stuck-state settlement transactions but is a different layer from the DCIR failure root cause. The failure rate is volatile — 66% overnight peak followed by stabilization in the 25-27% range. The underlying failure generator is still active.

Pattern: Six cycles over 8 days (Apr 8–16). No Jira tickets filed for any of the six RC91 cycles. Jira connector blindness (source-config-jira 125+ ticks) means any post-hoc filings are unverifiable.

## Sources
email Wema RC91 thread 19:48–20:01 WAT Apr 8; jira TDSD-6446 Completed; slack #teamapt-tech-operations; email Wema RC91 19:21–19:32 WAT Apr 11; email Wema RC91 00:40 WAT Apr 12; slack #teamapt-tech-operations 00:43 WAT Apr 12; email Wema RC91 03:41 WAT Apr 12; email STATUS UPDATE thread Emeka Joseph ↔ Amonetsone Gbubemi 11:30–11:43 WAT Apr 15; email DCIR TEAMAPT Monitoring Service Alert 19:06 WAT Apr 15 (40.65%); email DCIR TEAMAPT Monitoring Service Alert 23:20 WAT Apr 15 (20.4%); email DCIR TEAMAPT Monitoring Service Alert 23:36 WAT Apr 15 (66.0%); email Wema RC91 19:06–19:46 WAT Apr 16; email DCIR TEAMAPT Monitoring Service Alert 19:06 WAT Apr 16 (25.26%); email DCIR TEAMAPT Monitoring Service Alert 20:06 WAT Apr 16 (26.68%)

## Deltas
- 2026-04-11 01:09 WAT — New RC91 cycle overnight: 00:30–01:00 WAT (30 min, bank-resolved). Second Wema RC91 cycle.
- 2026-04-11 19:32 WAT — Third RC91 cycle: ~11 min. Two cycles in one day — frequency increasing.
- 2026-04-12 00:43 WAT — Fourth RC91 cycle filed. Three cycles in 28 hours.
- 2026-04-12 03:41 WAT — Fifth RC91 cycle filed. Four cycles in ~27 hours.
- 2026-04-15 12:09 WAT — Remediation executed. Wema DB script run.
- 2026-04-15 19:09 WAT — Post-remediation DCIR failure signal. 40.65% failure warning.
- 2026-04-16 06:23 WAT — **Overnight DCIR escalation confirmed remediation failure.** Two alerts overnight: 20.4% (23:20 WAT) → 66.0% (23:36 WAT). Rate peaked at 3.3× threshold — 2 in 3 transactions failing. Three data points post-remediation confirm the DB script did not address the DCIR failure root cause. Briefing-2026-04-16 B1 Decision item — route disposition needed.
- 2026-04-16 19:09 WAT — **Sixth RC91 cycle.** Filed 19:06 WAT, resolved 19:46 WAT (~40 min). DCIR failure rate still above threshold: 25.26% (19:06) → 26.68% (20:06). Failure rate stabilized in 25-27% range — down from 66% peak but persistent.