---
role: cto-teamapt
type:
  - "situation"
title: FCMB — RC91 P1 Apr 17
status: developing
created: "2026-04-18T09:41:07Z"
summary: "FCMB RC91 P1 filed 23:44 WAT Apr 17 by Oladapo Onayemi (TDSD-6613); Apr 18 14:03 WAT continuation signal (Daniel Armstrong email → FCMB; Gabriel Oluwagbemiga reply 14:08 WAT asking to reconfirm status). TDSD-6613 still active into Saturday afternoon — FCMB moving toward recurrent-cycle pattern."
updated: "2026-04-18T13:15:52Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[FCMB]] RC91 P1 filed by [[Oladapo Onayemi]] with Jira ticket [[TDSD-6613]] at 23:44 WAT Apr 17 — ticket raised overnight during the skipped 23:00–05:00 WAT window. P1 was ~10h45m active at the 10:29 WAT Apr 18 tick observation; no resolution signal in the overnight thread. **Apr 18 14:03 WAT — continuation signal:** [[Daniel Armstrong]] filed a fresh RC91 cycle email to FCMB ([[Bashir Adeyemi]], SwitchApplicationSupport@fcmb.com, Ogundairo.Tobiloba@fcmb.com; CC aptpaytechnicalsupport@teamapt.com, [[Oladapo Onayemi]]) — subject `FCMB | RC91 | 20260418` — stating "transactions are failing with RC91 intermittently. Kindly assist to review." Gabriel Oluwagbemiga (FCMB Switch Application Support) replied 14:08 WAT: "Kindly reconfirm status and revert." No resolution signal between TDSD-6613 filing and this new email — the bank-side assessment is not converging.

This moves FCMB from "first cycle in watch window" to "active-continuing P1 with intra-day email re-filing" — a distinct profile from Stanbic (short, bank-resolved cycles repeating) and closer to Wema/UBA (long-silent single P1 cycles). FCMB had prior low-frequency noise on the RC91 track (historical note on [[FCMB]] entity page, cycle Apr 16), but no prior P1 escalation. The 23:44 WAT Apr 17 filing moves FCMB from "minor noise" to "active participant in the RC91 wave"; the 14:03 WAT Apr 18 re-filing confirms bank-side is not auto-recovering within typical cycle duration.

**Multi-bank RC91 wave — current participants:**
- [[Stanbic Bank ATS — Persistent RC91 Pattern]] (cycle 28 ran ~7m Apr 18 10:17–10:43 WAT via email track; cycle 27 Slack-filed status still unconfirmed)
- [[Access Bank — Multi-Track Failures]] (cycle 6 overnight Apr 18, bank-auto-recovered, no TDSD)
- [[Sterling + Polaris — Routes Degraded]] (Sterling now in CoralPay suite)
- [[UBA Bank — RC91 P1 Apr 17]] (filed 18:45 WAT Apr 17, silent into today)
- [[Wema Bank — RC91 P1 Apr 17]] (filed Apr 17, silent 25h+)
- [[NIBSS PTSA — RC91 Apr 17]] (filed Apr 17, silent 23h+)
- FCMB (this situation — now with intra-day recurrence signal)

The concentration of new-participant banks within a 24-hour window on Apr 17 is pattern-significant — see [[RC91 Multi-Bank Failure Pattern]]. FCMB's Apr 18 re-filing is the first post-briefing-2026-04-18 delta on the wave.

**CTO posture:** No direct action — Daniel Armstrong filing via email, Oladapo tracking via TDSD-6613, Gabriel (FCMB) responding. Per briefing-2026-04-18 B6 calibration precedent, recurring RC91 on tracked patterns do not trigger Immediate re-dispatch; this cycle is noted and accumulated for briefing-2026-04-19. Watch for resolution signal and whether FCMB develops persistent-pattern cadence.

## Sources
- Jira [[TDSD-6613]], [[Oladapo Onayemi]] 23:44 WAT Apr 17 — FCMB RC91 P1 filing
- Email, [[Daniel Armstrong]] → FCMB 14:03 WAT Apr 18 (subject `FCMB | RC91 | 20260418`); Gabriel Oluwagbemiga (FCMB Switch Application Support) reply 14:08 WAT

## Deltas
- [2026-04-18 10:29 WAT] — Situation opened at next tick after overnight P1 filing. ~10h45m active at observation, no resolution signal. First FCMB P1 of the watch window; joins the Apr 17 multi-bank RC91 wave expansion.
- [2026-04-18 14:09 WAT] — Continuation signal via email track: Daniel Armstrong re-filed RC91 cycle to FCMB at 14:03 WAT; Gabriel (FCMB) asked to reconfirm 14:08 WAT. TDSD-6613 still active ~14h20m in. FCMB profile shifting from one-off P1 to active-continuing with intra-day re-filing. Not re-dispatched Immediate per B6 calibration. Accumulated for briefing-2026-04-19.