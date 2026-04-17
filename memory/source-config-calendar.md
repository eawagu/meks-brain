---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-17T19:09:00Z."
updated: "2026-04-17T20:06:32Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T19:09:00Z"
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

Tick 2026-04-17 20:09 WAT window (18:09 → 20:09 WAT, spans the 19:00 WAT wind-down gap): No priority signals. Product-Engineering Sync (18:00–19:00 WAT) completed during the window (metadata stable through end of meeting). Lattice Review all-day block continues (window closes Apr 27 — 10 days remaining). Saturday Apr 18 and Sunday Apr 19 visible agenda shows no priority-signal events in the next-day window; reminder B2 (dad's birthday call) is tracked as a reminder page, not a calendar event. Monday Apr 20 agenda not yet scanned in this window — will pick up at the morning briefing-tick. No declined RSVPs, no cancellations, no agenda-less blocks, no overload.
