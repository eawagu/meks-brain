---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-19T06:11:27Z. Zero calendar deltas overnight — 5 consecutive quiet ticks. Forward view: Monday Apr 20 GoSubscribe demo; Wed Apr 22 HoE Round 2 panel; Lattice Review window closes Apr 27."
updated: "2026-04-19T07:40:13Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T06:11:27Z"
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

Tick 2026-04-19 07:11 WAT briefing-tick window (22:09 WAT Apr 18 → 07:11 WAT Apr 19, Full work level per briefing-tick override but no delta): **Zero calendar deltas fast-path check held — 5 consecutive quiet ticks.** No new invites in-window, no RSVP changes, no cancellations. Sunday cadence light as expected. Forward view unchanged: Monday Apr 20 GoSubscribe demo; Wed Apr 22 HoE Round 2 panel (Bhuvnesh Bansal, pending calendar confirmation); Lattice Review window closes Apr 27 (8 days remaining). Today (Sun Apr 19) has no high-priority external meetings on record — opens space for overnight-wave RCA follow-up actions. Empty-result fast path held.
