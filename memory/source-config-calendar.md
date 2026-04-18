---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-17T19:09:00Z."
updated: "2026-04-18T09:45:25Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T09:29:50Z"
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

Tick 2026-04-18 10:29 WAT window: Saturday Retreat Day 5; light calendar overall, no priority signals. Forward view — Monday Apr 20 shows GoSubscribe demo (surfaced as briefing-2026-04-18 B8 awareness). Lattice Review all-day block continues (window closes Apr 27 — 9 days remaining). No declined RSVPs, no last-minute cancellations, no agenda-less blocks, no overload.
