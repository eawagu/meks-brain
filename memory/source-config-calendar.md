---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T07:09:34Z. 08:09 WAT Skim tick: IMS Management Review shifted from 09:00 to 08:30 WAT creating exact-overlap collision with DTB standup (08:30). Not an Immediate-trigger; captured for next briefing Decision item."
updated: "2026-04-20T07:20:21Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T07:09:34Z"
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

Tick 2026-04-20 08:09 WAT Skim-level. **Meaningful delta:** IMS Management Review moved from 09:00–10:00 WAT to **08:30 WAT** — now an **exact overlap** with recurring DTB standup at 08:30 (previously a partial 30-minute conflict at the end of DTB). This upgrades the earlier B2 decision item into a hard collision within the briefing cycle. Not in the 8 Immediate triggers defined in config-salience (meeting-time shifts with <1h notice are not enumerated) — holding at Briefing-tier, will be the top Decision item on the next morning briefing with a proposal to decline one of the two. Remainder of same-day calendar unchanged: 2026 Strategy Event Debrief 14:45 WAT; Tech Support 16:00 WAT + ATPP standup 16:00 WAT overlap (B5 carryforward); Moniepoint Dinner 19:00 WAT. No other RSVP changes, new invites, or cancellations.
