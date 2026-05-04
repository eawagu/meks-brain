---
title: FCMB — RC06 P1 May 4
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: ats-operations
role: cto-teamapt
created: "2026-05-04T13:21:19Z"
updated: "2026-05-04T13:21:19Z"
summary: "FCMB RC06 P1 cycle May 4 — first ever RC06 on FCMB (distinct from RC91 pattern). Bilateral email 12:47 WAT + nudge 13:38 WAT, Slack #teamapt-tech-operations P1 post 13:12 WAT (Daniel Armstrong). 1h27m+ active at 14:14 WAT 2026-05-04 tick observation. 2h Immediate trigger #2 fires at 14:47 WAT — inter-tick blind spot (next cron 18:00 WAT). No Jira ticket. Cross-bank RC06 trend: Polaris first RC06 Apr 30 (briefing-2026-04-30 B7) → FCMB first RC06 May 4. Status: developing."
---

[[FCMB]] RC06 (Do not honor / unreadable card or chip) is a new failure mode for the FCMB route — distinct from the dominant RC91 (Issuer or Switch Inoperative) pattern tracked on [[FCMB — RC91 P1 Apr 17]]. RC06 means the bank is reachable and responding, but declining the transaction at the card level — different root cause than connectivity-mode RC91.

**Current state (14:14 WAT 2026-05-04 full-tick):** Active P1 1h27m, no closure post observed.

## Cycle 1 (May 4 12:47 WAT — ACTIVE)

**Filing chain:**
- **12:47 WAT bilateral email** — [[Daniel Armstrong]] sent `FCMB | RC06 | 20260504` to [[Bashir Adeyemi]] / SwitchApplicationSupport@fcmb.com (CC aptpaytechnicalsupport@teamapt.com + oladapo.onayemi@moniepoint.com), Gmail thread `19df2d08a648e583`: "Hello Team, Please be informed that transactions are failing with RC06. Kindly assist to review."
- **13:12 WAT Slack P1** — [[Daniel Armstrong]] structured P1 post in #teamapt-tech-operations: "P1: Fcmb Bank RC06 failures. From the bank. Escalated. Start 12:47PM, End: Ongoing." Surfaced as briefing-2026-05-04 B1 with low confidence (no precedent envelope for FCMB RC06).
- **13:14 WAT briefing tick** — Immediate-tier DM drafted to user (D081JT4AD0Q) per config-salience trigger #1 (New P1 incident). Surfaced as B1.
- **13:38 WAT email nudge** — Daniel Armstrong reply on the same email thread: "Still failing. An update will be appreciated." Standard escalation cadence — second message ~51min after first, per Daniel's RC91 escalation template applied to RC06.

**At 14:14 WAT 2026-05-04 full-tick (this tick):**
- Cycle 1h27m active.
- No closure post in #teamapt-tech-operations since 13:14 WAT briefing tick (full Tier 1 channel sweep returned zero deltas this tick).
- No Jira ticket filed (single-track-Slack + email).
- 2h Immediate trigger #2 (config-salience) fires at 14:47 WAT — 33min from this tick observation, inside the inter-tick gap before the 18:00 WAT next cron position. Existing draft DM at D081JT4AD0Q remains live; per `slack_send_message_draft` `draft_already_exists` semantics, this tick cannot redraft to escalate.

## Pattern significance

**Cross-bank RC06 trend (May 2026 emergence):**
- [[Polaris Bank]] first RC06 cycle — Apr 30 (briefing-2026-04-30 B7) — tracked under [[Sterling + Polaris — Routes Degraded]] alongside its RC91 cycles. First RC06 on Polaris within 24h of multiple RC91 cycles on same route.
- [[FCMB]] first RC06 cycle — May 4 (this page). FCMB has been on RC91 cadence (Apr 17 through Apr 28 cycles, [[FCMB — RC91 P1 Apr 17]]). Today's RC06 is a failure-mode shift on the same route.

Two banks now showing first-time RC06 within 5 days. Watch for additional banks crossing into RC06 over coming days — possible upstream/scheme-side change manifesting as "Do not honor" outputs.

**Distinct from FCMB RC91 pattern.** RC06 ≠ RC91:
- RC91 = "Issuer or Switch Inoperative" — connectivity / unreachable
- RC06 = "Do not honor" — bank-level decline at card layer
- Different troubleshooting path; FCMB Switch team will treat as card-issuance / scheme-config issue, not connectivity.

## Triage classification

- Tier 1 (Immediate) — already dispatched at 13:14 WAT briefing tick per trigger #1 (New P1).
- Tier 2 (P1 duration) — fires at 14:47 WAT (config-salience >2h threshold). Falls in inter-tick gap. Existing Immediate draft from briefing tick is the standing alert; user will see it on next attention check.

## Next observation points

- 14:47 WAT — 2h trigger #2 crossing.
- 18:00 WAT — next cron tick observation; if still active, will be at 5h13m (well past 2h, within 4-5h Access RC91 envelope but unprecedented for FCMB).
- 2026-05-05 06:00 WAT — briefing tick rebriefing.

## Sources

Slack #teamapt-tech-operations C0ABU8GMW75 13:12 WAT May 4 (Daniel Armstrong P1 post, briefing B1); Gmail thread `19df2d08a648e583` 12:47 WAT + 13:38 WAT nudge May 4; briefing-2026-05-04 B1 (Decision item, low confidence).

## Deltas

- [2026-05-04 14:14 WAT] — Created. RC06 cycle 1 active 1h27m at observation. No closure post since 13:14 WAT briefing tick. 2h Immediate trigger #2 falls in inter-tick gap at 14:47 WAT before 18:00 WAT next cron. Cross-bank RC06 pattern identified (Polaris Apr 30 + FCMB May 4).
