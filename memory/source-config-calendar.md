---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T05:09:34Z. 06:09 WAT Monday briefing tick: two overnight invite deltas on today — IMS Management Review 09:00-10:00 WAT (conflicts DTB standup 30m); Strategy Event Debrief 14:45 WAT. Apr 20 16:00 WAT ATPP/Tech-Support conflict unresolved."
updated: 2026-04-20
cssclasses:
  - "source-config"
last_processed: "2026-04-20T06:09:34Z"
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

Tick 2026-04-20 07:09 WAT Skim-level (post-06:09 briefing). Same-day calendar state unchanged from briefing tick: IMS Management Review 09:00–10:00 WAT + DTB standup conflict (B2), 2026 Strategy Event Debrief 14:45 WAT (B5), Tech Support 16:00 WAT + ATPP standup 16:00 WAT overlap (B5 carryforward), Moniepoint Dinner 19:00 WAT. No new invites, no cancellations, no RSVP changes detected this tick.
