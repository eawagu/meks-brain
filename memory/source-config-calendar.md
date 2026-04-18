---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-18T13:10:00Z. Zero calendar deltas at 14:09 WAT tick."
updated: 2026-04-18
cssclasses:
  - "source-config"
last_processed: "2026-04-18T13:10:00Z"
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

Tick 2026-04-18 14:09 WAT window (13:11 WAT → 14:10 WAT, Skim level, no upgrade for Calendar): **Zero calendar deltas.** All listed events pre-window: Lattice Review all-day block (updated 08:49Z Apr 18), Direct to Bank daily standup (03:15Z Apr 18), Cards and Account All Hands (22:55Z Apr 17), Channels Onboarding & Disbursement (14:09Z Apr 17), Juliana Switch Daily (09:59Z Apr 13), ATPP Daily Standup (16:32Z Apr 12), Tech support meeting (12:50Z Apr 17), Product-Engineering Sync (09:06Z Apr 16), Moniepoint Dinner (09:11Z Apr 7). Forward view confirmed: Monday Apr 20 GoSubscribe demo; Wed Apr 22 HoE Round 2 panel (from yesterday's email track, not yet on calendar as confirmed event); Lattice Review window closes Apr 27. Saturday Retreat Day 5 continues — no in-window meeting signals. Empty-result fast path held.
