---
role: cto-teamapt
type:
  - "situation"
title: FCMB — RC91 P1 Apr 17
status: developing
created: "2026-04-18T09:41:07Z"
summary: "FCMB RC91 P1 filed 23:44 WAT Apr 17 (TDSD-6613); Apr 18 cycle shows recovery-then-recurrence sequence — 14:03 WAT new email, 14:14 WAT Daniel confirms 'processing fine', 16:17 WAT Afeez reports 'failing intermittently' again, 16:49 WAT samples provided. Same-day recovery-fail-recover pattern, new behavioral signature vs. one-off cycle."
updated: "2026-04-18T16:15:42Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[FCMB]] RC91 P1 filed by [[Oladapo Onayemi]] with Jira ticket [[TDSD-6613]] at 23:44 WAT Apr 17 — ticket raised overnight during the skipped 23:00–05:00 WAT window. P1 was ~10h45m active at the 10:29 WAT Apr 18 tick observation; no resolution signal in the overnight thread. **Apr 18 14:03 WAT — continuation signal:** [[Daniel Armstrong]] filed a fresh RC91 cycle email to FCMB ([[Bashir Adeyemi]], SwitchApplicationSupport@fcmb.com, Ogundairo.Tobiloba@fcmb.com; CC aptpaytechnicalsupport@teamapt.com, [[Oladapo Onayemi]]) — subject `FCMB | RC91 | 20260418` — stating "transactions are failing with RC91 intermittently. Kindly assist to review." Gabriel Oluwagbemiga (FCMB Switch Application Support) replied 14:08 WAT: "Kindly reconfirm status and revert."

**Apr 18 afternoon cycle — recovery-then-recurrence:** Daniel Armstrong confirmed processing fine at 14:14 WAT ("transactions are processing fine at the moment"). Then at 16:17 WAT, [[Afeez Kazeem]] replied in the same thread reporting "transactions are failing with RC91 intermittently" again — RC91 resumed within the same afternoon. Gabriel replied 16:47 WAT "Kindly reconfirm status now"; Afeez responded 16:49 WAT "Issue persists. See below samples for your reference." This is a same-day recovery → failure → unresolved-at-tick-window sequence — a distinct behavioral signature from the overnight-one-off cycle observed on Apr 17.

This moves FCMB from "first cycle in watch window" (Apr 17) to "active-continuing P1 with intra-day recovery-fail-recover recurrence" (Apr 18) — distinct from Stanbic (short bank-resolved cycles auto-recovering) and from Wema/UBA (long-silent single P1 cycles). The recovery-then-recurrence pattern suggests the underlying failure mode is not being corrected by whatever bank-side action produced the 14:14 WAT recovery. FCMB had prior low-frequency noise on the RC91 track (historical note on [[FCMB]] entity page, cycle Apr 16), but the Apr 18 signature is new.

**Multi-bank RC91 wave — current participants:**
- [[Stanbic Bank ATS — Persistent RC91 Pattern]] (cycle 29 ran ~4m Apr 18 14:52–14:56 WAT via email track; cycle 28 earlier same-day ~7m 10:17–10:43 WAT)
- [[Access Bank — Multi-Track Failures]] (cycle 6 overnight Apr 18, bank-auto-recovered, no TDSD)
- [[Sterling + Polaris — Routes Degraded]] (Sterling now in CoralPay suite)
- [[UBA Bank — RC91 P1 Apr 17]] (filed 18:45 WAT Apr 17, silent into today)
- [[Wema Bank — RC91 P1 Apr 17]] (filed Apr 17, silent 32h+)
- NIBSS PTSA — RETIRED 17:09 WAT Apr 18 (TDSD-6597 closed with RCA)
- [[Ecobank — RC91 on NUS Nodes]] (Afeez direct-to-bank escalation 16:09 WAT, follow-up 16:36 WAT)
- FCMB (this situation — now with intra-day recurrence signal after mid-afternoon recovery)

The concentration of new-participant banks within a 24-hour window on Apr 17 is pattern-significant — see [[RC91 Multi-Bank Failure Pattern]]. FCMB's Apr 18 recovery-then-recurrence is the first post-briefing-2026-04-18 delta on the wave to show this specific profile, and the NIBSS RCA this afternoon is the first pattern-break closure.

**CTO posture:** No direct action — Daniel Armstrong and Afeez Kazeem filing via email, Oladapo tracking via TDSD-6613, Gabriel (FCMB) responding. Per briefing-2026-04-18 B6 calibration precedent, recurring RC91 on tracked patterns do not trigger Immediate re-dispatch; this cycle is noted and accumulated for briefing-2026-04-19. Watch for resolution signal and whether the recovery-then-recurrence profile becomes characteristic of FCMB.

## Sources
- Jira [[TDSD-6613]], [[Oladapo Onayemi]] 23:44 WAT Apr 17 — FCMB RC91 P1 filing
- Email, [[Daniel Armstrong]] → FCMB 14:03 WAT Apr 18 (subject `FCMB | RC91 | 20260418`); Gabriel Oluwagbemiga (FCMB Switch Application Support) reply 14:08 WAT; Daniel "processing fine" 14:14 WAT; [[Afeez Kazeem]] "failing intermittently" 16:17 WAT; Gabriel "reconfirm status" 16:47 WAT; Afeez "Issue persists. See below samples" 16:49 WAT (Gmail thread 19da0b068a16f755)

## Deltas
- [2026-04-18 10:29 WAT] — Situation opened at next tick after overnight P1 filing. ~10h45m active at observation, no resolution signal. First FCMB P1 of the watch window; joins the Apr 17 multi-bank RC91 wave expansion.
- [2026-04-18 14:09 WAT] — Continuation signal via email track: Daniel Armstrong re-filed RC91 cycle to FCMB at 14:03 WAT; Gabriel (FCMB) asked to reconfirm 14:08 WAT. TDSD-6613 still active ~14h20m in. FCMB profile shifting from one-off P1 to active-continuing with intra-day re-filing. Not re-dispatched Immediate per B6 calibration. Accumulated for briefing-2026-04-19.
- [2026-04-18 17:09 WAT] — Recovery-then-recurrence same-day cycle observed. Daniel 14:14 WAT "processing fine"; Afeez 16:17 WAT "failing intermittently" again (2h03m after recovery); Gabriel 16:47 WAT reconfirm request; Afeez 16:49 WAT "Issue persists. See below samples." Bank-side posture now reactive rather than proactive — asking for reconfirmation rather than providing fix. Pattern significance: same-day recovery-fail-recover is a new behavioral signature for FCMB on RC91 track, distinct from both Stanbic (short auto-resolve) and Wema/UBA (long silent). Not Immediate per B6 calibration. Carries into briefing-2026-04-19 as pattern item. Factors: urgency 0.5 · impact_scope 0.6 · cto_specificity 0.5 · pattern_significance 0.85 (new recovery-fail-recover profile) · accountability_alignment 0.9.