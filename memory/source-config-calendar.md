---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-25T15:10:00Z (16:10 WAT). 16:10 WAT Apr 25 skim-tick: weekend zero-delta unchanged. Lattice deadline Mon Apr 27 ~1d7h remaining."
updated: "2026-04-25T16:24:56Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T16:10:00Z"
---

## Connection

Google Calendar MCP. Primary calendar for user.

## Directives

### Priority signals
1. Declined RSVPs on previously accepted meetings — status change worth noting.
2. New invites for same-day or next-day meetings.
3. Last-minute cancellations (within 2h of scheduled start).
4. Agenda-less invites for >30-minute blocks.
5. Back-to-back overload (>4 consecutive meetings without gap).

### Skip rules
- Recurring standing meetings with unchanged metadata — no delta, no surface.

## Notes

### last_processed 2026-04-25T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (10min late), weekend zero-delta unchanged

17:10 WAT Apr 25 Saturday skim tick (Step 0: level=skim, rationale=weekend-quiet-priors-with-active-fcmb-p1-needing-verification). Window 15:10:00Z → 16:10:00Z = 1h. `list_events` Apr 25 17:10 WAT → Apr 26 23:59 WAT (timeZone Africa/Lagos) returned **1 event**:
- Lattice Review recurring downward review block (8 pending) — ends 2026-04-28 (Tue). Updated 2026-04-19T14:54:32Z. Stale; no in-window modification.

**Saturday + Sunday calendar still clear.** No new invites, no RSVP changes, no cancellations. Open weekend window for triage compound (briefing-2026-04-25 D4), dad reminder close-out (D3), Lattice batch (deadline Mon Apr 27, **~1d6h remaining**).

Factors: `source=calendar`, `skim_tick`, `saturday_afternoon`, `weekend_clear_unchanged`, `lattice_deadline_apr27_1d6h_remaining`, `zero_priority_signal_match`, `no_immediate_dispatch`, `five_consecutive_zero_delta_skim_ticks`.

### last_processed 2026-04-25T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (10min late), weekend zero-delta unchanged (preserved summary)

16:10 WAT Apr 25 Saturday skim tick. Lattice Review recurring only. Saturday + Sunday clear. Lattice deadline ~1d7h remaining.

### last_processed 2026-04-25T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (10min late), weekend zero-delta unchanged (preserved summary)

15:10 WAT Apr 25 Saturday skim tick. Lattice Review recurring only. Saturday + Sunday clear. Lattice deadline ~1d8h remaining.

### last_processed 2026-04-25T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (10min late), weekend zero-delta unchanged (preserved summary)

14:10 WAT Apr 25 Saturday skim tick. Window 12:10:00Z → 13:10:00Z = 1h. `list_events` returned 1 event (Lattice Review recurring, stale). Saturday + Sunday calendar still clear. Lattice deadline ~1d9h remaining.

### last_processed 2026-04-25T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (10min late), weekend zero-delta unchanged (preserved summary)

13:10 WAT Apr 25 Saturday skim tick. Lattice Review recurring only. Saturday + Sunday calendar still clear. Lattice deadline Mon Apr 27 ~1d10h remaining.

### last_processed 2026-04-25T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (10min late), weekend zero-delta unchanged (preserved summary)

12:10 WAT Apr 25 Saturday skim tick. Lattice Review recurring only. Weekend clear. Lattice deadline ~1d11h remaining.

### last_processed 2026-04-25T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (10min late), weekend zero-delta unchanged (preserved summary)

11:10 WAT Apr 25 Saturday skim tick. Lattice Review recurring only. Weekend clear. Lattice deadline ~1d12h remaining.

### last_processed 2026-04-25T08:10:00Z (09:10 WAT) — skim-level 09:00-cron tick, weekend zero-delta unchanged (preserved summary)

09:10 WAT Apr 25 Saturday skim tick. Lattice Review recurring only. Weekend clear. Lattice deadline 1d15h away.

### last_processed 2026-04-25T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick, weekend zero-delta unchanged (preserved summary)

08:10 WAT Apr 25 skim. Lattice Review recurring only. Weekend clear. Lattice deadline ~1d18h away.

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick weekend zero-delta (preserved summary)

06:09 WAT Apr 25 Saturday briefing tick. Lattice Review recurring only. Weekend clear. No priority signal matches. Open weekend window for triage compound (D4) + dad reminder (D3) + Lattice batch (deadline Mon Apr 27).

### last_processed 2026-04-24T21:10:00Z (22:10 WAT) — skim weekend-ahead clear (preserved)

22:10 WAT Apr 24 skim. Lattice recurring only. Weekend ahead calendar-clear. No priority match.

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level zero-delta (preserved)

20:10 WAT Apr 24 full tick. Product-Eng Sync + Lattice concluded; no priority match.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — TeamApt Org Changes in progress (preserved)

17:09 WAT Apr 24. TeamApt Org Changes 16:30–18:00 WAT in progress.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — TeamApt Org Changes time-shift (preserved)

13:09 WAT Apr 24. TeamApt Org Changes updated 12:18 WAT Pawel Swiatek — meeting 16:00 → 16:30 WAT shift.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events. TeamApt Org Changes 16:00–18:00 WAT new (Pawel Swiatek). Triple-overlap resolved in briefing-2026-04-24 D2.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
