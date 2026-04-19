---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-19T12:09:29Z. 13:09 WAT skim tick: 1 delta — Wed Apr 22 HoE Round 2 interview (Bhuvnesh Bansal panel) rescheduled 11am–12pm → 4pm–5pm WAT by Chris Purkis. Monday Apr 20 forward view intact; 16:00 WAT ATPP/Tech-Support conflict still unresolved."
updated: "2026-04-19T12:18:03Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T12:09:29Z"
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

Tick 2026-04-19 13:09 WAT **skim-level**. ~52m window since 12:17 WAT last_processed.

**1 delta in-window:** Wed Apr 22 HoE Round 2 interview (Bhuvnesh Bansal panel, organizer chris.purkis@moniepoint.com) rescheduled from 11am–12pm WAT to 4pm–5pm WAT. Invitees: user, tobilola.fasanya, adegoke.obasa. Reason: candidate unavailability at the earlier slot. Not in priority-signal categories 1–5 exactly (neither declined, new same-day, cancellation, agenda-less block, nor overload) — time change on accepted meeting 3 days out. Low salience. Awareness item for briefing-2026-04-20. Note: Apr 22 HoE panel was previously flagged as `pending calendar confirmation` in prior tick notes — that state is now resolved (confirmed at 4pm–5pm WAT).

No RSVP changes, no cancellations, no new same-day/next-day invites. Consistent with Sunday cadence on the everyday meeting axis.

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
Wed Apr 22 — HoE Round 2 panel 4pm–5pm WAT (confirmed this tick, moved from 11am).
Lattice Review window closes Apr 27 (8 days remaining).
