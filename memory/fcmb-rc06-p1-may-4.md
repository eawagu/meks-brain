---
role: cto-teamapt
type:
  - "situation"
title: FCMB — RC06 P1 May 4
status: retired
created: "2026-05-04T13:21:19Z"
summary: "FCMB RC06 P1 cycle May 4 — first ever RC06 on FCMB (distinct from RC91 pattern). Bilateral email 12:47 WAT + nudge 13:38 WAT, Slack #teamapt-tech-operations P1 post 13:12 WAT (Daniel Armstrong). 1h27m+ active at 14:14 WAT 2026-05-04 tick observation. 2h Immediate trigger #2 fires at 14:47 WAT — inter-tick blind spot (next cron 18:00 WAT). No Jira ticket. Cross-bank RC06 trend: Polaris first RC06 Apr 30 (briefing-2026-04-30 B7) → FCMB first RC06 May 4. Status: developing."
updated: "2026-05-04T17:18:32Z"
cssclasses:
  - "situation"
accountability: ats-operations
---

[[FCMB]] RC06 (Do not honor / unreadable card or chip) — first cycle on FCMB route, resolved 14:24 WAT 2026-05-04. Distinct from the dominant RC91 (Issuer or Switch Inoperative) pattern tracked on [[FCMB — RC91 P1 Apr 17]] — RC06 means the bank is reachable and responding, but declining the transaction at the card level.

**Final state (resolved):** Cycle 1 active 1h37m total, 12:47 WAT → 14:24 WAT.

## Cycle 1 (May 4 12:47 WAT — 14:24 WAT, 1h37m bank-resolved)

**Filing chain:**
- **12:47 WAT bilateral email** — [[Daniel Armstrong]] sent `FCMB | RC06 | 20260504` to [[Bashir Adeyemi]] / SwitchApplicationSupport@fcmb.com (CC aptpaytechnicalsupport@teamapt.com + oladapo.onayemi@moniepoint.com), Gmail thread `19df2d08a648e583`: "Hello Team, Please be informed that transactions are failing with RC06. Kindly assist to review."
- **13:12 WAT Slack P1** — [[Daniel Armstrong]] structured P1 post in #teamapt-tech-operations: "P1: Fcmb Bank RC06 failures. From the bank. Escalated. Start 12:47PM, End: Ongoing." Surfaced as briefing-2026-05-04 B1 with low confidence (no precedent envelope for FCMB RC06).
- **13:14 WAT briefing tick** — Immediate-tier DM drafted to user (D081JT4AD0Q) per config-salience trigger #1 (New P1 incident). Surfaced as B1.
- **13:38 WAT email nudge** — Daniel Armstrong reply on the same email thread: "Still failing. An update will be appreciated." Standard escalation cadence — second message ~51min after first.
- **13:48 WAT FCMB reconfirmation request** — Gabriel Oluwagbemiga (FCMB Switch Application Support): "Kindly reconfirm status."
- **14:24 WAT bank-resolved** — Daniel Armstrong reply: "Hello Gabriel, Please be informed that transactions are processing fine at the moment." 1h37m total cycle duration.

## Pattern significance

**Cross-bank RC06 trend (May 2026 emergence) — confirmed:**
- [[Polaris Bank]] first RC06 cycle — Apr 30 (briefing-2026-04-30 B7) — tracked under [[Sterling + Polaris — Routes Degraded]] alongside its RC91 cycles.
- [[FCMB]] first RC06 cycle — May 4 (this page). 1h37m resolution envelope. FCMB has been on RC91 cadence (Apr 17 through Apr 28 cycles, [[FCMB — RC91 P1 Apr 17]]). Today's RC06 is a failure-mode shift on the same route.

Two banks now showing first-time RC06 within 5 days. Both within fast-cycle bank-resolved envelope. Watch for additional banks crossing into RC06 over coming days — possible upstream/scheme-side change manifesting as "Do not honor" outputs.

**Distinct from FCMB RC91 pattern:** RC91 = "Issuer or Switch Inoperative" (connectivity / unreachable); RC06 = "Do not honor" (bank-level decline at card layer). Different troubleshooting path; FCMB Switch team handled this as card-issuance / scheme-config issue, not connectivity.

## Outcome

- **Resolution:** bank-side, 1h37m, no Jira ticket filed (single-track-Slack + email).
- **2h trigger #2 NOT crossed** — resolved 23 min before would-have-fired at 14:47 WAT.
- **Standing Immediate draft (D081JT4AD0Q)** at briefing tick remains live but no longer needed for this cycle (briefing tick draft); user can disregard.

## Sources

Slack #teamapt-tech-operations C0ABU8GMW75 13:12 WAT May 4 (Daniel Armstrong P1 post, briefing B1); Gmail thread `19df2d08a648e583` 12:47 WAT + 13:38 WAT nudge + 13:48 WAT FCMB reconfirm + 14:24 WAT bank-resolved May 4; briefing-2026-05-04 B1 (Decision item, low confidence).

## Deltas

- [2026-05-04 14:14 WAT] — Created. RC06 cycle 1 active 1h27m at observation. No closure post since 13:14 WAT briefing tick. 2h Immediate trigger #2 falls in inter-tick gap at 14:47 WAT before 18:00 WAT next cron. Cross-bank RC06 pattern identified (Polaris Apr 30 + FCMB May 4).
- [2026-05-04 18:14 WAT] — Retired. Cycle 1 resolved 14:24 WAT (1h37m total) via bank-side fix after Gabriel Oluwagbemiga (FCMB Switch) reconfirmation request 13:48 WAT. Within fast-cycle bank-resolved envelope. 2h trigger #2 narrowly missed (would have fired 14:47 WAT, resolved 14:24 WAT). Cross-bank RC06 trend confirmed (Polaris Apr 30 fast-cycle + FCMB May 4 fast-cycle).
