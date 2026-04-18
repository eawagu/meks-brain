---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-18T12:11:47Z."
updated: "2026-04-18T12:17:58Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T12:11:47Z"
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

Tick 2026-04-18 13:09 WAT window (12:10 WAT → 13:11 WAT, Skim upgraded to Full): No in-window calendar deltas. Lattice Review all-day block returned by list_events but `updated` 08:49 WAT = pre-window; not a delta. The Gmail-derived HoE Round 2 invite (Wed Apr 22 11:00–12:00 WAT) will surface as a calendar event when/if user RSVPs — captured at email layer this window, not calendar layer. Saturday Retreat Day 5 continues. Forward view — Monday Apr 20 GoSubscribe demo (briefing-2026-04-18 B8); Wed Apr 22 HoE Round 2 panel (new); Lattice Review window closes Apr 27 (9 days remaining).
