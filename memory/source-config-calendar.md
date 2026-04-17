---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-17T15:09:00Z."
updated: "2026-04-17T15:17:52Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T15:09:00Z"
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

Tick 2026-04-17 16:09 WAT window (15:09 → 16:09 WAT): No priority signals. Tech support meeting (16:00–17:00 WAT) starts in ~0 min — accepted, metadata updated 14:50 WAT (minor, not a priority signal). Product-Engineering Sync (18:00–19:00 WAT) accepted, no change. Lattice Review all-day block metadata updated 15:56 WAT (minor — Lattice rendering the "8 pending downward reviews" counter); window closes Apr 27, 10 days remaining. No same-day or next-day new invites, no declined RSVPs, no agenda-less blocks, no overload.
