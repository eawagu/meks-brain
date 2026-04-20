---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T12:09:00Z. 13:09 WAT Full tick: 1 metadata update in 12:09→13:09 WAT window (ATPP Daily Standup Meeting 16:00 WAT updated 12:41 WAT — attendee RSVP change, no user action change; B5 override still applies). Juliana Switch Daily Standup upcoming at 13:30 WAT. No new invites, no RSVP changes to user, no cancellations."
updated: "2026-04-20T12:18:06Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T12:09:00Z"
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

Tick 2026-04-20 13:09 WAT Full-level. Calendar sweep 12:09 WAT → 13:09 WAT today + extended through tomorrow.

**1 calendar modification in the 1-hour window:**
- ATPP Daily Standup Meeting 16:00–17:00 WAT updated 12:41 WAT — attendee RSVP change (not user's). User's response still `accepted`. B5 override from briefing-2026-04-20 still applies: user to decline this meeting manually in GCal UI (conflict with Tech Support Meeting 16:00–17:00 WAT). No new heartbeat action required — decline is user's manual step per B5.

**Today's events on track per B5 overrides:**
- Cards and Account: All Hands 10:30–11:15 WAT — complete, Gemini notes produced 10:47 WAT (pending ingest when Drive auth restored).
- Channels Onboarding & Disbursement 11:30–12:30 WAT — complete.
- Juliana Switch Daily Standup 13:30–14:10 WAT — upcoming in ~21 minutes.
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

No RSVP changes to previously-accepted events by user, no cancellations, no agenda-less invites >30m, no back-to-back overload threshold crossed today. No Immediate-tier triggers from calendar this tick.
