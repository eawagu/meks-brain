---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T11:09:00Z. 12:09 WAT Full tick: zero modifications in 11:09→12:09 WAT window. Today's schedule on track per B5 overrides. Channels Onboarding & Disbursement in progress (11:30–12:30 WAT). No new invites, no RSVP changes, no cancellations."
updated: "2026-04-20T11:16:24Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T11:09:00Z"
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

Tick 2026-04-20 12:09 WAT Full-level. Calendar sweep 11:09 WAT → 12:09 WAT today + extended through tomorrow.

**Zero calendar modifications in the 1-hour window.** Most-recent lastModified events are pre-tick:
- Juliana Switch Daily Standup 08:01 WAT (pre-tick metadata refresh).
- TeamApt Exec Catch-up 08:00 WAT (pre-tick metadata refresh).

**Today's events on track per B5 overrides:**
- Cards and Account: All Hands 10:30–11:15 WAT — complete, Gemini notes produced 10:47 WAT (pending ingest when Drive auth restored).
- Channels Onboarding & Disbursement 11:30–12:30 WAT — in progress at tick (ends in ~21m).
- Juliana Switch Daily Standup 13:30–14:10 WAT (accepted, upcoming).
- 2026 Strategy Event Debrief 14:45–15:45 WAT (accepted per B5 override).
- Tech Support Meeting 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI.
- ATPP Daily Standup 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI.
- Product - Engineering Sync 18:00–19:00 WAT (pre-accepted).
- Moniepoint Dinner 19:00 WAT (accepted per B5, user manual RSVP).

**Tomorrow's notable events (for Apr 21 briefing context):**
- Panel Interview Head of Engineering 09:30 WAT; Blocker HoE interview 09:30 WAT (Lisbon tz).
- Tolulope / Emeka 11:00–11:30 WAT; Emeka / Muhammad 12:30–13:00 WAT.
- ATPP Daily Standup 14:00 WAT; Monnify VAS Weekly 14:00 WAT; Zone Switching Partnership 14:00 WAT — triple-book at 14:00.
- Round 2 Interview HoE 15:00 WAT.
- TeamApt Exec Catch-up 16:00 WAT.

No RSVP changes to previously-accepted events, no cancellations, no agenda-less invites >30m, no back-to-back overload threshold crossed today. No Immediate-tier triggers from calendar this tick.
