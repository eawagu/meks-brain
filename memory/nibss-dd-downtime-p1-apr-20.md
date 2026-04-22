---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Downtime P1 Apr 20
status: developing
created: "2026-04-20T05:23:14Z"
summary: "NIBSS DD downtime P1 (TDSD-6630) filed 05:18 WAT Apr 20 by Frances Omelu. 2026-04-22 14:15 WAT tick: Apr 22 NIBSS DD P2 cycle (10:40 WAT → 13:05 WAT resolved, 2h25m — briefing-2026-04-22 B4) now closed; 15:11 WAT NIBSS customer-facing retraction in Slack suggests possible new disruption — carryforward signal. TDSD-6630 itself still shows no movement since 08:18 WAT Apr 20 — silent-recovery pattern (retired Apr 14 precedent) now extends past 77h. Third NIBSS DD cycle in 9 days (Apr 14 retired, Apr 20 TDSD-6630 silent, Apr 22 P2 2h25m). Retirement decision deferred to briefing-2026-04-23 given fresh customer-facing signal."
updated: "2026-04-22T14:24:22Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit downtime P1 raised via [[TDSD-6630]] at 2026-04-20 05:18 WAT by [[Frances Omelu]], updated 05:59 WAT, Medium priority, Work in progress at the 06:09 WAT briefing tick. Filing occurred during the overnight delegation window (23:00–06:00 WAT), so surfacing was deferred to the 06:09 briefing tick per config-heartbeat rule.

**Structural parallel to retired Apr 14 NIBSS DD P1.** The prior [[NIBSS DD — Pending Mandate P1 Active]] situation (filed 07:05 WAT Apr 14, retired 06:23 WAT Apr 16 after 47h silence, implicit-resolve) exhibited identical pattern: filed, escalated to NIBSS, then silent without human closure. Apr 20 filing repeats the same structural defect that [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] tracks as recurring "silent recovery without human closure" concern. **Apr 22 adds a third data point:** separate P2 cycle filed 10:40 WAT Apr 22, resolved 13:05 WAT Apr 22 (2h25m) — this one reached Slack-level resolution confirmation, but the original TDSD-6630 still has no closure comment.

**User triage:** briefing-2026-04-20 B1 overridden by user — deferred to 2026-04-21 briefing with no action, no commitment. briefing-2026-04-21 never fired (gap — see briefing-2026-04-22 B5). briefing-2026-04-22 did not re-raise TDSD-6630 Immediate as original triage-deferral still holds. **Immediate-tier re-dispatch remains suppressed** per triage-deferred state.

**Comment silence timeline (TDSD-6630 specifically).**
- 05:23 WAT Apr 20 — [[Frances Omelu]] comment: "Pending create mandate transactions cleared before 3am, and we noticed a decrease in pending debit mandate request count. The count kept dropping up until 4:30am, but started to go back up at 4:32am."
- 05:27 WAT Apr 20 — [[Frances Omelu]] public comment: "This has been escalated to NIBSS for review and resolution."
- 08:18 WAT Apr 20 — metadata refresh (last any-update).
- 14:15 WAT Apr 22 tick — **comment silence ~56h48m** since 05:27 WAT Apr 20, **any-update silence ~53h57m** since 08:18 WAT Apr 20. Still Work in progress.

**Apr 22 P2 cycle — reached Slack-level resolution.**
- 10:40 WAT Apr 22 — pending mandate P2 signal filed in #teamapt-tech-operations. Surfaced as briefing-2026-04-22 B4 (Briefing-tier, not Immediate due to P2 priority).
- 13:05 WAT Apr 22 — thread resolved. Duration 2h25m.
- This confirms the 3-in-9-days pattern: Apr 14 (retired, 47h silence), Apr 20 TDSD-6630 (still silent 53h+), Apr 22 (2h25m explicit close).
- The Apr 22 cycle does not directly resolve TDSD-6630 (separate incident window), but its explicit Slack-level close compounds evidence that the product's silent-recovery pattern is partially behavioral (NIBSS side moves on without ticket closure) rather than technical.

**Carryforward signal — 15:11 WAT Apr 22 NIBSS customer-facing retraction.**
- In-channel message retracting earlier NIBSS customer-facing comms observed at 15:11 WAT.
- Could indicate (a) housekeeping retraction of stale Apr 20 comms now that Apr 22 cycle is resolved, or (b) fresh NIBSS-side disruption starting with premature public comms being walked back.
- Next-tick watch determines which. If new incident signal emerges, spawn separate situation; if silence holds, treat as housekeeping.

**Retirement posture.** Strict reading of retirement bias ("when uncertain, retire") would push retirement now — TDSD-6630 silent 53h+, Apr 22 cycle resolved, pattern precedent established. However: the 15:11 WAT NIBSS retraction is a fresh in-domain signal that could reshape judgment within 24h. **Retirement decision deferred to briefing-2026-04-23** pending that signal resolution. If 15:11 WAT retraction turns out to be housekeeping and TDSD-6630 still silent at briefing compose time, retire then.

## Sources
jira TDSD-6630 (comments 4757564, 4757577; created 05:18 WAT Apr 20; metadata 08:18 WAT Apr 20 — no further updates); slack #teamapt-tech-operations NIBSS DD P2 thread 10:40 WAT Apr 22 → resolved 13:05 WAT Apr 22; slack #teamapt-tech-operations NIBSS customer-facing comms retraction 15:11 WAT Apr 22

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
- 2026-04-20 17:09 WAT — tick: comment silence ~11h42m, any-update silence ~8h51m on TDSD-6630. Still WIP. **TDSD-6627 "NIBSS - Disbursements Downtime" Resolved/Done and TDSD-6583 "DISBURSEMENT DOWNTIME" Done in this tick window — both are separate tickets from TDSD-6630 (NIBSS Disbursements product, not NIBSS DD mandate product); no closure bearing on this situation.** User-deferral to 2026-04-21 briefing continues to hold. No re-dispatch.
- 2026-04-21 — briefing-2026-04-21 never fired (structural gap, captured in briefing-2026-04-22 B5). No tick-level checks performed against TDSD-6630 in this window.
- 2026-04-22 06:45 WAT — briefing-2026-04-22 issued (catch-up 43.5h window). TDSD-6630 original triage-deferral still holds; not re-raised as Immediate. B4 tracks a separate Apr 22 P2 cycle (10:40 WAT onset at briefing compose time).
- 2026-04-22 13:05 WAT — Apr 22 P2 cycle resolved in-channel (2h25m from 10:40 WAT). Third NIBSS DD cycle in 9 days confirmed. Pattern: Apr 14 (47h silent→retired), Apr 20 TDSD-6630 (still silent 53h+), Apr 22 (2h25m explicit close).
- 2026-04-22 14:15 WAT — tick: TDSD-6630 still no movement (comment silence ~56h48m, any-update silence ~53h57m). 15:11 WAT observed in-channel NIBSS customer-facing comms retraction — either housekeeping after Apr 22 resolution or fresh incident starting. Retirement decision **deferred to briefing-2026-04-23** pending next-tick signal clarity on the retraction. No Immediate re-dispatch (triage-deferred state). Factors: source=jira+slack, silent_53h+, pattern_3_in_9_days, p2_cycle_resolved_2h25m, customer_facing_retraction_ambiguous, retirement_deferred.
