---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-17T16:09:00Z."
updated: "2026-04-17T17:14:50Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T17:09:00Z"
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

Tick 2026-04-17 18:09 WAT window (17:09 → 18:09 WAT): No priority signals. Product-Engineering Sync (18:00–19:00 WAT) starting at tick time — accepted, metadata stable, Frank Atashili needsAction (unchanged). Lattice Review all-day block metadata last updated 15:56 WAT Apr 17 (prior tick's observation); window closes Apr 27 (10 days remaining). No new same-day or next-day invites, no declined RSVPs, no cancellations, no agenda-less blocks, no overload. Tomorrow (Sat Apr 18) and Sunday no priority-signal events in the visible window.
