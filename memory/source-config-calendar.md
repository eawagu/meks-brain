---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-18T10:10:00Z."
updated: "2026-04-18T10:20:22Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T10:10:00Z"
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

Tick 2026-04-18 11:10 WAT window (Skim tick): No calendar deltas. Saturday Retreat Day 5 continues. No new invites, no declined RSVPs, no cancellations, no overload. Forward view — Monday Apr 20 GoSubscribe demo (briefing-2026-04-18 B8); Lattice Review all-day block active, window closes Apr 27 (9 days remaining).
