---
title: FCMB — RC91 P1 Apr 17
type:
  - "situation"
cssclasses:
  - "situation"
role: cto-teamapt
status: developing
accountability: Technology Reliability and Security
created: "2026-04-18T09:41:07Z"
updated: "2026-04-18T09:41:07Z"
summary: "FCMB RC91 P1 filed 23:44 WAT Apr 17 by Oladapo Onayemi (TDSD-6613). First FCMB P1 of the watch window — joins the multi-bank RC91 wave (Stanbic, Access, Sterling, Polaris, UBA, Wema, NIBSS PTSA)."
---

[[FCMB]] RC91 P1 filed by [[Oladapo Onayemi]] with Jira ticket [[TDSD-6613]] at 23:44 WAT Apr 17 — ticket raised overnight during the skipped 23:00–05:00 WAT window. P1 is ~10h45m active at the 10:29 WAT Apr 18 tick observation; no resolution signal in the overnight thread.

This is the **first FCMB cycle** to warrant dedicated situation-level tracking in the current watch window. FCMB had prior low-frequency noise on the RC91 track (historical note on [[FCMB]] entity page, cycle Apr 16), but no prior P1 escalation. The 23:44 WAT Apr 17 filing moves FCMB from "minor noise" to "active participant in the RC91 wave."

**Multi-bank RC91 wave — current participants:**
- [[Stanbic Bank ATS — Persistent RC91 Pattern]] (cycle 27 evening Apr 17, silent into today)
- [[Access Bank — Multi-Track Failures]] (cycle 6 overnight Apr 18, bank-auto-recovered)
- [[Sterling + Polaris — Routes Degraded]] (Sterling now in CoralPay suite)
- [[UBA Bank — RC91 P1 Apr 17]] (filed 18:45 WAT Apr 17, silent into today)
- [[Wema Bank — RC91 P1 Apr 17]] (filed Apr 17, silent 25h+)
- [[NIBSS PTSA — RC91 Apr 17]] (filed Apr 17, silent 23h+)
- FCMB (this situation)

The concentration of new-participant banks within a 24-hour window on Apr 17 is pattern-significant — see [[RC91 Multi-Bank Failure Pattern]].

**CTO posture:** No direct action — Oladapo is filing, ops team tracking via TDSD-6613. Watch for resolution signal and whether FCMB is a one-cycle touch or persistent participant. Confidence around the Apr 17 wave expansion increases with each new bank; the underlying cause (bank-side CBA instability vs. Moniepoint routing-restoration gap vs. NIBSS upstream) remains unresolved.

## Sources
- Jira [[TDSD-6613]], [[Oladapo Onayemi]] 23:44 WAT Apr 17 — FCMB RC91 P1 filing

## Deltas
- [2026-04-18 10:29 WAT] — Situation opened at next tick after overnight P1 filing. ~10h45m active at observation, no resolution signal. First FCMB P1 of the watch window; joins the Apr 17 multi-bank RC91 wave expansion.