---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-19T13:09:49Z. 14:09 WAT skim tick: 0 deltas in-window. Monday Apr 20 forward view intact; 16:00 WAT ATPP/Tech-Support conflict still unresolved; Wed Apr 22 HoE Round 2 confirmed 4pm–5pm WAT."
updated: "2026-04-19T13:19:05Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T13:09:49Z"
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

Tick 2026-04-19 14:09 WAT **skim-level**. ~1h window since 13:09 WAT last_processed.

Zero deltas in-window. No RSVP changes, no cancellations, no new same-day/next-day invites, no reschedules. Consistent with Sunday cadence on the everyday meeting axis.

Forward view (Monday Apr 20) unchanged since last tick:
- 08:30–09:30 WAT — Direct to Bank : Daily stand up
- 10:30–11:15 WAT — Cards and Account: All Hands
- 11:30–12:30 WAT — Channels Onboarding & Disbursement
- 13:30–14:10 WAT — Juliana Switch Daily Standup
- 14:30 WAT — Moniepoint Dinner (19:00 IST, accepted)
- **16:00–17:00 WAT — ATPP Daily Standup (accepted)**
- **16:00–17:00 WAT — Tech support meeting (accepted)** — **CONFLICT: overlaps ATPP Standup exactly.** Still unresolved; carry forward to next briefing.
- 18:00–19:00 WAT — Product - Engineering Sync (self-organized, Frank Atashili pending)

Tue Apr 21 — no meetings shown in forward view.
Wed Apr 22 — HoE Round 2 panel 4pm–5pm WAT (confirmed 13:09 WAT tick, moved from 11am).
Lattice Review window closes Apr 27 (8 days remaining).