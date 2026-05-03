---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: Sun→Mon window unchanged from 10:10 WAT capture. Lattice deadline 36h50m remaining at this tick."
updated: "2026-05-03T05:41:08Z"
cssclasses:
  - "source-config"
last_processed: "2026-05-03T05:12:00Z"
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

(Per config-heartbeat-prompt Source-config write scope directive: heartbeat MUST NOT modify body content. Tick-level audit lives in git history. This section intentionally empty.)
