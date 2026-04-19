---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-19T19:09:34Z. 20:09 WAT skim tick: Moniepoint HoE Round 2 panel formal invite landed (Tobilola Fasanya for Bhuvnesh Bansal, Apr 22 16:00 WAT) — formalizes existing confirmed slot. Monday Apr 20 16:00 WAT ATPP/Tech-Support conflict still unresolved."
updated: "2026-04-19T19:27:08Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T19:09:34Z"
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

Tick 2026-04-19 20:09 WAT **skim-level**. ~2h window since 18:09 WAT last_processed.

**One delta in-window:** New/reformalized invite for Apr 22 16:00–17:00 WAT arrived via email thread 19da7253c2ebc76b from [[Tobilola Fasanya]] (moniepoint.com recruiter) at 20:08 WAT — HoE panel for candidate Bhuvnesh Bansal. Most likely the formal invitation for the existing confirmed "HoE Round 2 panel 4pm–5pm WAT" slot (moved from 11am per 13:09 WAT Sunday tick after [[Chris Purkis]]'s earlier proposal). Not a new conflict; calendar slot already accepted. Signal accumulates to briefing-2026-04-20 via email source-config as Awareness (meeting formalization + candidate name capture: Bhuvnesh Bansal).

No RSVP changes, no cancellations, no new same-day (Monday) agenda-less invites, no reschedules on existing meetings. Consistent with Sunday cadence.

Forward view (Monday Apr 20) unchanged since last tick:
- 08:30–09:30 WAT — Direct to Bank : Daily stand up
- 10:30–11:15 WAT — Cards and Account: All Hands
- 11:30–12:30 WAT — Channels Onboarding & Disbursement
- 13:30–14:10 WAT — Juliana Switch Daily Standup
- 14:30 WAT — Moniepoint Dinner (19:00 IST, accepted)
- **16:00–17:00 WAT — ATPP Daily Standup (accepted)**
- **16:00–17:00 WAT — Tech support meeting (accepted)** — **CONFLICT: overlaps ATPP Standup exactly.** Still unresolved; carry forward to briefing-2026-04-20.
- 18:00–19:00 WAT — Product - Engineering Sync (self-organized, Frank Atashili pending)

Tue Apr 21 — no meetings shown in forward view.
Wed Apr 22 — **HoE Round 2 panel 4pm–5pm WAT for Bhuvnesh Bansal** (confirmed earlier at 13:09 WAT tick, formal invite from Tobilola Fasanya landed this tick at 20:08 WAT).
Lattice Review window closes Apr 27 (8 days remaining).