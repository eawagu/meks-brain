---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-17T13:10:00Z."
updated: "2026-04-17T14:16:36Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T14:09:00Z"
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

Tick 2026-04-17 15:09 WAT window: No priority signals. User TeamApt/New Relic meeting (14:00–14:45 WAT) ended at 14:45 WAT, updated at 13:44 WAT today (minor metadata change, not a priority signal). Remainder of day: Tech support meeting 16:00–17:00 WAT (accepted, no change), Product-Engineering Sync 18:00–19:00 WAT (accepted, instance-moved from 19:00 default). Lattice Review all-day block remains (closes Apr 27). No new priority signals for today or tomorrow.
