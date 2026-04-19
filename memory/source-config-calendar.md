---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-19T09:11:37Z. Zero calendar deltas — 6 consecutive quiet ticks. Forward view: Monday Apr 20 schedule populated with 8 events including a 16:00 WAT conflict (ATPP Standup overlaps Tech Support meeting)."
updated: "2026-04-19T09:25:42Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T09:11:37Z"
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

Tick 2026-04-19 10:11 WAT **skim-level**. Zero calendar deltas in the 3h window since 07:11 WAT last_processed. Six consecutive quiet ticks.

No new invites, no RSVP changes, no cancellations. Only metadata update in-window: Lattice Review reminder event at 08:47 UTC — noise, skip per directive.

Forward view (Monday Apr 20):
- 08:30–09:30 WAT — Direct to Bank : Daily stand up
- 10:30–11:15 WAT — Cards and Account: All Hands
- 11:30–12:30 WAT — Channels Onboarding & Disbursement
- 13:30–14:10 WAT — Juliana Switch Daily Standup
- 14:30 WAT — Moniepoint Dinner (19:00 IST, accepted)
- **16:00–17:00 WAT — ATPP Daily Standup (accepted)**
- **16:00–17:00 WAT — Tech support meeting (accepted)** — **CONFLICT: overlaps ATPP Standup exactly.** User accepted both. Flag in next briefing as Awareness — needs a decline-and-read-notes decision or delegate.
- 18:00–19:00 WAT — Product - Engineering Sync (self-organized, Frank Atashili pending)

Tue Apr 22 — HoE Round 2 panel (Bhuvnesh Bansal, pending calendar confirmation).
Lattice Review window closes Apr 27 (8 days remaining).

Today (Sun Apr 19) confirmed quiet — no external meetings. Empty-result fast path held.
