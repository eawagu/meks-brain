---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T17:09:00Z (18:09 WAT). 18:09 WAT Apr 24 full-level zero-delta tick: `list_events` for 18:10 WAT → Apr 25 00:00 WAT window returned 2 events (Lattice Reviews just ended, Product-Engineering Sync 18:00-19:00 currently starting) — none updated inside 17:09→18:09 WAT window. No priority-signal matches."
updated: "2026-04-24T17:17:17Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T17:09:00Z"
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

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta tick

18:09 WAT Apr 24 tick: `list_events` for remaining Apr 24 day (18:10 WAT → Apr 25 00:00 WAT) ordered by lastModified returned **2 events**, none with `updated` inside the 17:09→18:09 WAT window.

**Remaining events today:**
- Lattice Review recurring block (ends today 2026-04-28) — updated 2026-04-19 14:54 WAT (stale, not new)
- 18:00–19:00 WAT — Product-Engineering Sync (self recurring, accepted) — **starting in ~0 min**; updated 2026-04-22 21:14 WAT (stale, captured prior tick). `originalStartTime: 2026-04-24T18:00:00+01:00` and `start: 2026-04-24T18:00:00+01:00` match — no time shift this instance.

Tracy Ojaigho TPP x Platformization invite for Mon Apr 27 captured via Gmail Layer 1 on prior tick (17:09 WAT) remains not yet visible in today-only `list_events` result (scope issue, not a deliverability issue — the Monday invite is in range of a Monday query but outside the "today 18:10 → Apr 25 midnight" window).

No priority-signal matches this tick. No Immediate dispatch.

Factors: `source=calendar`, `zero_delta`, `no_priority_signal_match`, `no_immediate_dispatch`, `d2_org_changes_concluded`, `product_engineering_sync_starting`.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level zero-delta tick (preserved)

17:09 WAT Apr 24 tick: `list_events` 17:09 WAT → Apr 25 00:00 WAT returned 3 events, none with `updated` inside the 16:09→17:09 WAT window. TeamApt Org Changes 16:30-18:00 WAT currently in progress.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level zero-delta tick (preserved)

16:09 WAT Apr 24 tick: 5 events returned, none with `updated` inside the 15:09→16:09 WAT window. Most recent `updated`: TeamApt Org Changes 11:18 WAT Apr 24. Lattice Reviews 1h+ into session.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level zero-delta tick (preserved summary)

15:09 WAT Apr 24 tick: 5 events returned; most recent updated TeamApt Org Changes 12:18 WAT. Lattice Reviews 15:00–17:00 WAT starting.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level zero-delta tick (preserved summary)

14:09 WAT Apr 24 tick: 5 events returned, no new updates since 12:18 WAT Org Changes time shift.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick, TeamApt Org Changes time-shift delta (preserved summary)

13:09 WAT Apr 24 tick: TeamApt Org Changes updated 12:18 WAT by Pawel Swiatek — meeting time shifted 16:00→16:30 WAT.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events returned. Priority-signal match — TeamApt Org Changes (Pawel Swiatek, 16:00–18:00 WAT, 2h, agenda-less, NEW). Triple-overlap at 16:00 WAT resolved in briefing-2026-04-24 D2 option 1.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
