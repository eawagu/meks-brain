---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T08:09:34Z. 09:09 WAT Skim tick: no new invites, no RSVP changes, no cancellations. Same-day calendar state unchanged from 08:09 tick."
updated: "2026-04-20T08:18:38Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T08:09:34Z"
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

Tick 2026-04-20 09:09 WAT Skim-level. No new same-day invites, no RSVP changes, no cancellations. Only metadata updates on existing accepted events (recurring standing meetings). Same-day calendar state unchanged from 08:09 tick: IMS Management Review 08:30 WAT (already passed — within the collision window with DTB standup, resolution at triage deferred); 2026 Strategy Event Debrief 14:45 WAT; Tech Support 16:00 WAT + ATPP standup 16:00 WAT overlap (B5 carryforward from briefing); Moniepoint Dinner 19:00 WAT. No Immediate-tier triggers.
