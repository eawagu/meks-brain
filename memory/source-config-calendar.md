---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T09:09:00Z. 10:09 WAT Skim tick: no new invites created, no RSVP changes, no cancellations. Juliana Switch Daily Standup recurring 13:30–14:10 confirmed. Cards and Account All Hands 10:30–11:15 within 21m — no action required (accepted)."
updated: "2026-04-20T09:17:17Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T09:09:00Z"
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

Tick 2026-04-20 10:09 WAT Skim-level. No new same-day invites created since 09:09 tick, no RSVP changes, no cancellations. Calendar state for today:

- **Cards and Account All Hands** 10:30–11:15 WAT (within 21m of tick, accepted) — no action required.
- **Channels Onboarding & Disbursement** 11:30–12:30 WAT (accepted).
- **Juliana Switch Daily Standup** 13:30–14:10 WAT (accepted; recurring, updated 07:01 WAT for today's metadata).
- **2026 Strategy Event Debrief** 14:45–15:45 WAT (accepted per B5 triage override).
- **Tech Support Meeting** 16:00–17:00 WAT — B5 triage override: decline today's instance (user to decline manually in GCal UI).
- **ATPP Daily Standup Meeting** 16:00–17:00 WAT — B5 triage override: decline today's instance (user to decline manually in GCal UI). Overlap with Tech Support resolved by declining both.
- **Product - Engineering Sync** 18:00–19:00 WAT (accepted).
- **Moniepoint Dinner** 19:00 WAT (accepted per B5 triage; RSVP manual by user).

No Immediate-tier triggers from calendar this tick. IMS Management Review 08:30–09:30 WAT and DTB standup 08:30 WAT already resolved per B2 triage (attend IMS full, skip DTB).
