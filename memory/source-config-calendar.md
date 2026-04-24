---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T19:10:00Z (20:10 WAT). 20:10 WAT Apr 24 full-level 20:00-cron tick zero-delta: `list_events` 20:10 WAT → Apr 25 23:59 WAT returned 1 event (Lattice Review recurring block, updated 2026-04-19 — stale, predates window). No priority-signal matches. No new invites/RSVP changes/cancellations for tomorrow."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T19:10:00Z"
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

### last_processed 2026-04-24T19:10:00Z (20:10 WAT) — full-level 20:00-cron tick (10min late), zero-delta

20:10 WAT Apr 24 full-level tick. `list_events` 20:10 WAT → Apr 25 23:59 WAT (ordered by lastModified, pageSize 25) returned **1 event**:
- Lattice Review recurring block (ends 2026-04-28) — updated 2026-04-19T14:54:32Z. Stale; predates window.

No new events surfaced for today-evening or tomorrow (Apr 25 Saturday). **Product-Engineering Sync 18:00-19:00 WAT concluded** between prior tick and this one — no follow-up meeting scheduled in the near horizon. Lattice Reviews 15:00-17:00 WAT concluded. Saturday Apr 25 calendar currently empty of events per this query; tomorrow (Apr 26 Sunday) also empty per lookback. Weekend ahead is calendar-clear.

**No priority-signal matches this tick.** No new invites, no RSVP changes, no cancellations, no agenda-less matches, no back-to-back overload signal.

Factors: `source=calendar`, `full_level`, `scheduled_cron_20wat_10min_late`, `zero_delta`, `no_priority_signal_match`, `no_immediate_dispatch`, `weekend_calendar_clear`, `product_engineering_sync_concluded`, `lattice_reviews_concluded`.

### last_processed 2026-04-24T17:22:16Z (18:22 WAT) — skim-level off-cron zero-delta tick (preserved)

18:22 WAT Apr 24 off-cron tick: `list_events` returned 2 events (Lattice, Product-Engineering Sync in-progress) — neither updated inside 17:09→17:22 UTC window.

### last_processed 2026-04-24T17:09:00Z (18:09 WAT) — full-level zero-delta tick (preserved)

18:09 WAT Apr 24 tick: `list_events` 2 events — Lattice recurring + Product-Engineering Sync starting 18:00 WAT. Neither updated inside 17:09→18:09 WAT window. D2 Org Changes meeting concluded 18:00 WAT.

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level zero-delta tick (preserved)

17:09 WAT Apr 24 tick: `list_events` 3 events, none updated inside 16:09→17:09 window. TeamApt Org Changes 16:30-18:00 WAT in progress.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level zero-delta tick (preserved summary)

16:09 WAT Apr 24 tick: 5 events, most recent updated TeamApt Org Changes 11:18 WAT. Lattice Reviews 1h into session.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level zero-delta tick (preserved summary)

15:09 WAT Apr 24 tick: 5 events; most recent TeamApt Org Changes 12:18 WAT time shift.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level zero-delta tick (preserved summary)

14:09 WAT Apr 24 tick: 5 events, no new since 12:18 WAT.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick, TeamApt Org Changes time-shift delta (preserved summary)

13:09 WAT Apr 24 tick: TeamApt Org Changes updated 12:18 WAT by Pawel Swiatek — meeting time shifted 16:00→16:30 WAT.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events. Priority-signal match — TeamApt Org Changes (Pawel Swiatek, 16:00–18:00 WAT, 2h, agenda-less, NEW). Triple-overlap at 16:00 WAT resolved in briefing-2026-04-24 D2 option 1.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
