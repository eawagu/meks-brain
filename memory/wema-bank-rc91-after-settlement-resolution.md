---
role: cto-teamapt
type:
  - "situation"
title: Wema Bank — RC91 After Settlement Resolution
status: developing
created: "2026-04-11T16:44:43Z"
summary: "Settlement track completed Apr 8. Five RC91 cycles Apr 8–12. Apr 15 11:43 WAT: Wema DB remediation script executed. Apr 15 19:06 WAT: DCIR 40.65% failure warning (2x threshold) — first breach since Apr 14 04:06 WAT 100% episode; ~7h23min after remediation. Remediation did not fix underlying DCIR failure generator."
updated: "2026-04-15T18:13:17Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

Settlement track ([[TDSD-6446]]) completed Apr 8 by [[Emeka Joseph]]. Five RC91 cycles with accelerating frequency:

1. **Apr 8 evening:** 19:47–20:10 WAT (23 min, bank-resolved, [[Olamide Ajibulu]])
2. **Apr 11 overnight:** 00:30–01:00 WAT (30 min, bank-resolved)
3. **Apr 11 evening:** ~19:21–19:32 WAT (~11 min, bank-resolved, [[Korede Oladunjoye]] confirmed)
4. **Apr 12 midnight:** Filed 00:30 WAT by [[Olamide Ajibulu]] (email to Wema Switching and Payments, 00:40 WAT). Slack P1 posted at 00:43 WAT. Resolution status unknown — no confirmation signal received before cycle 5 began.
5. **Apr 12 03:41 WAT:** Filed by [[Olamide Ajibulu]] (email to [[Wema Bank]] Switching and Payments Services at 03:41 WAT). Transactions failing with RC91 and high processing time.

**Apr 15 remediation:** [[Emeka Joseph]] had a call with [[Amonetsone Gbubemi]] (Wema Switching and Payment Officer, Enterprise Technology Management) and followed up via email at 11:30 WAT Apr 15 asking Wema DB team to execute the outlined script so the completed settlement transactions could be updated to successful status. Amonetsone responded 11:43 WAT Apr 15: "This has been treated." — Wema-side remediation script EXECUTED. This closes the settlement-update loop that followed the five RC91 cycles.

**Apr 15 19:06 WAT — REMEDIATION POST-CHECK SIGNAL (NEW):** DCIR Monitoring Service alert fired — Transaction High Failure Warning at **40.65%** (threshold 20%). Reply-To `wemaalert@wemabank.com` identifies the source route as Wema DCIR. This is the first Wema DCIR threshold breach since the Apr 14 overnight 100% episode (28+ hours of silence prior to this alert), and arrives **~7h23min after** the Wema DB remediation script was executed. Implication: remediation addressed the stuck-state settlement-update loop but did NOT fix the underlying RC91 / DCIR failure-rate generator. Tactical signal to watch — not an Immediate alert (single breach, not escalating, no P1 filed in Slack/email) but pattern-significant. Briefing tier for next briefing.

Pattern: Four cycles in ~27 hours (Apr 11–12). Cycle 5 began less than 3 hours after cycle 4 was filed. [[Wema Bank]] AIR reversal timeouts (SRE L2 escalation from Duty Handover Apr 7) still unconfirmed resolved.

No Jira tickets filed for any of the five RC91 cycles. This is a documentation gap — recurring P1s with zero Jira trail. Jira connector blindness (source-config-jira 92+ ticks) means any post-hoc filings are unverifiable.

## Sources
email Wema RC91 thread 19:48–20:01 WAT Apr 8; jira TDSD-6446 Completed; slack #teamapt-tech-operations; email Wema RC91 19:21–19:32 WAT Apr 11; email Wema RC91 00:40 WAT Apr 12; slack #teamapt-tech-operations 00:43 WAT Apr 12; email Wema RC91 03:41 WAT Apr 12; email STATUS UPDATE thread Emeka Joseph ↔ Amonetsone Gbubemi 11:30–11:43 WAT Apr 15; email DCIR TEAMAPT Monitoring Service Alert 19:06 WAT Apr 15 (Reply-To wemaalert@wemabank.com) — 40.65% failure rate

## Deltas
- 2026-04-11 01:09 WAT — New RC91 cycle overnight: 00:30–01:00 WAT (30 min, bank-resolved). [[Olamide Ajibulu]] posted resolution at 00:39 WAT. No Jira ticket filed. Second Wema RC91 cycle.
- 2026-04-11 19:32 WAT — Third RC91 cycle: [[Innocent Nwaokorie]] reported RC91 and high processing time at 19:21 WAT. Korede Oladunjoye ([[Wema Bank]]) confirmed transactions processing successfully at 19:32 WAT. Duration ~11 min. Two cycles in one day — frequency increasing.
- 2026-04-12 00:43 WAT — Fourth RC91 cycle filed. [[Olamide Ajibulu]] reported RC91 and high processing time (email 00:40 WAT, Slack P1 00:43 WAT). Three cycles in 28 hours. Concurrent with Fidelity RC91 P1.
- 2026-04-12 03:41 WAT — Fifth RC91 cycle filed. [[Olamide Ajibulu]] reported RC91 and high processing time (email to Wema Switching and Payments Services). Four cycles in ~27 hours. Inter-cycle gap shrinking.
- 2026-04-15 12:09 WAT — **Remediation executed.** [[Emeka Joseph]] asked [[Amonetsone Gbubemi]] (Wema) via email 11:30 WAT Apr 15 to nudge Wema DB team to run the outlined script. Amonetsone confirmed 11:43 WAT Apr 15: "This has been treated." Settlement-update script EXECUTED by Wema DB. This addresses stuck-state settlement transactions; RC91 root cause recurrence is still to be observed.
- 2026-04-15 19:09 WAT — **Post-remediation DCIR failure signal.** DCIR Monitoring Service alert 19:06 WAT: Transaction High Failure Warning, rate 40.65%, threshold 20%. Reply-To wemaalert@wemabank.com (Wema DCIR route). First threshold breach since Apr 14 04:06 WAT 100% episode — 28+ hours of silence broken. Arrives ~7h23min after remediation script execution. Implication: remediation did not close the underlying failure-rate generator — stuck-settlement remediation is independent of DCIR failure root cause. Single data point — not yet a cycle, not yet a P1. Flag for Apr 16 briefing as pattern signal.