---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-18T14:10:00Z. Zero calendar deltas at 15:09 WAT tick."
updated: "2026-04-18T15:24:53Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T15:09:28Z"
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

Tick 2026-04-18 16:09 WAT window (15:10 WAT → 16:09 WAT, Skim level, no upgrade for Calendar): **Zero calendar deltas fast-path check held.** No new invites in-window, no RSVP changes, no cancellations. Saturday Retreat Day 5 cadence holding. Forward view confirmed: Monday Apr 20 GoSubscribe demo; Wed Apr 22 HoE Round 2 panel (Bhuvnesh Bansal, pending calendar confirmation); Lattice Review window closes Apr 27 (9 days remaining). Empty-result fast path held.
