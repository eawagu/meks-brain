---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Downtime P1 Apr 20
status: developing
created: "2026-04-20T05:23:14Z"
summary: "NIBSS DD downtime P1 (TDSD-6630) filed 05:18 WAT Apr 20 by Frances Omelu. 10:09 WAT tick: no TDSD-6630 update since 08:18 WAT — any-update silence 1h51m, comment silence 4h42m since 05:27 WAT NIBSS escalation. User overrode B1 in briefing-2026-04-20 triage deferring to 2026-04-21 briefing — no Immediate re-dispatch per triage-deferred state. Silent-recovery pattern match with retired Apr 14 NIBSS DD precedent continues."
updated: "2026-04-20T13:15:52Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit downtime P1 raised via [[TDSD-6630]] at 2026-04-20 05:18 WAT by [[Frances Omelu]], updated 05:59 WAT, Medium priority, Work in progress at the 06:09 WAT briefing tick. Filing occurred during the overnight delegation window (23:00–06:00 WAT), so surfacing was deferred to the 06:09 briefing tick per config-heartbeat rule.

**Structural parallel to retired Apr 14 NIBSS DD P1.** The prior [[NIBSS DD — Pending Mandate P1 Active]] situation (filed 07:05 WAT Apr 14, retired 06:23 WAT Apr 16 after 47h silence, implicit-resolve) exhibited identical pattern: filed, escalated to NIBSS, then silent without human closure. Apr 20 filing repeats the same structural defect that [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] tracks as recurring "silent recovery without human closure" concern.

**User triage:** briefing-2026-04-20 B1 overridden by user — deferred to 2026-04-21 briefing with no action, no commitment. Per triage-deferred state, **Immediate-tier re-dispatch is suppressed** even when absence-of-signal thresholds would otherwise fire.

**Comment silence timeline.**
- 05:23 WAT — [[Frances Omelu]] comment: "Pending create mandate transactions cleared before 3am, and we noticed a decrease in pending debit mandate request count. The count kept dropping up until 4:30am, but started to go back up at 4:32am."
- 05:27 WAT — [[Frances Omelu]] public comment: "This has been escalated to NIBSS for review and resolution."
- 08:18 WAT — metadata refresh (last any-update).
- 14:09 WAT tick — **comment silence 8h42m** since 05:27 WAT, **any-update silence 5h51m** since 08:18 WAT. Still Work in progress.

## Sources
jira TDSD-6630 (comments 4757564, 4757577; created 05:18 WAT; metadata 08:18 WAT)

## Deltas
- 2026-04-20 05:18 WAT — TDSD-6630 filed by Frances Omelu during overnight delegation window.
- 2026-04-20 05:23 WAT — Frances Omelu internal comment on mandate count dynamics (drop to 4:30am, climb from 4:32am).
- 2026-04-20 05:27 WAT — Frances Omelu public comment: escalated to NIBSS. Comment-clock starts here.
- 2026-04-20 06:09 WAT — surfaced as B1 in briefing-2026-04-20.
- 2026-04-20 08:18 WAT — last any-update (metadata-only).
- 2026-04-20 08:47 WAT — user overrode B1 triage: deferred to 2026-04-21 briefing, no action, no commitment. Immediate re-dispatch suppressed per triage-deferred state.
- 2026-04-20 09:15 WAT — 09:09 tick: comment silence 3h42m, any-update silence 51m. No re-dispatch.
- 2026-04-20 10:09 WAT — tick: comment silence 4h42m, any-update silence 1h51m. No re-dispatch.
- 2026-04-20 14:09 WAT — tick: comment silence 8h42m, any-update silence 5h51m. Still WIP. Silent-recovery pattern match with retired Apr 14 precedent continues; user-deferral holds through afternoon.