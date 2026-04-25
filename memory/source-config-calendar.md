---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-25T05:09:54Z (06:09 WAT). 06:09 WAT Apr 25 briefing-tick: weekend zero-delta — Saturday Apr 25 + Sunday Apr 26 calendar empty. Lattice Review recurring block (deadline Apr 28) only. No new invites, no RSVP changes. Open weekend window for triage compound + dad reminder + Lattice batch."
updated: "2026-04-25T05:27:00Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-25T05:09:54Z"
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

### last_processed 2026-04-25T05:09:54Z (06:09 WAT) — briefing-tick weekend zero-delta

06:09 WAT Apr 25 Saturday briefing tick. `list_events` Apr 25 05:00Z → Apr 26 23:00Z (orderBy startTime, pageSize 25, timeZone Africa/Lagos) returned **1 event**:
- Lattice Review recurring downward review block (8 pending) — ends 2026-04-28 (Tue). Updated 2026-04-19T14:54:32Z. Stale; no in-window update.

**Saturday Apr 25 + Sunday Apr 26 calendar clear.** No meetings, no invites, no conflicts. No priority-signal matches (no declined RSVPs, no new invites, no cancellations, no agenda-less, no overload). Open weekend window for triage compound (briefing-2026-04-25 D4), dad reminder close-out (D3), Lattice Review batch (deadline Mon Apr 27, 2 days away).

Factors: `source=calendar`, `briefing_tick`, `full_level`, `weekend_clear_sat_sun`, `lattice_deadline_apr27_2d`, `zero_priority_signal_match`, `no_immediate_dispatch`, `weekend_window_for_compound_actions`.

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
