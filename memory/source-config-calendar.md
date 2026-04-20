---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T13:09:00Z. 14:09 WAT Full tick: 2 metadata updates in 13:09→14:09 WAT window — Round 2 Interview HoE Apr 21 15:00 WAT CANCELLED (matches 13:47 WAT cancellation email), plus routine attendee RSVP change on Juliana Switch Daily Standup. No back-to-back overload threshold crossed, no user RSVP changes. B5 overrides still governing today."
updated: "2026-04-20T13:20:34Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T13:09:00Z"
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

Tick 2026-04-20 14:09 WAT Full-level. Calendar sweep 13:09 WAT → 14:09 WAT today + extended through tomorrow.

**2 calendar modifications in the 1-hour window:**
- **Round 2 Interview HoE Apr 21 15:00 WAT — CANCELLED.** Event deletion at ~13:47 WAT, matches email notification in Layer 1 Gmail sweep. Hiring-process signal, not operational. **Awareness-tier.** Factors: source=calendar, signal_type=cancellation, hiring_process_change, next_day_event, user_accepted_before_cancellation. Removes one of Apr 21's concentration points; frees 15:00–16:00 WAT block.
- Juliana Switch Daily Standup (13:30–14:10 WAT today) metadata refresh — attendee RSVP change (not user's). User still accepted. No action required.

**Today's events on track per B5 overrides:**
- Cards and Account: All Hands 10:30–11:15 WAT — complete, Gemini notes produced 10:47 WAT (pending ingest when Drive auth restored).
- Channels Onboarding & Disbursement 11:30–12:30 WAT — complete.
- Juliana Switch Daily Standup 13:30–14:10 WAT — in progress / just ended.
- 2026 Strategy Event Debrief 14:45–15:45 WAT (accepted per B5 override) — upcoming in ~36 minutes.
- Tech Support Meeting 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI.
- ATPP Daily Standup 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI.
- Product - Engineering Sync 18:00–19:00 WAT (pre-accepted).
- Moniepoint Dinner 19:00 WAT (accepted per B5, user manual RSVP).

**Tomorrow's notable events (for Apr 21 briefing context), updated for today's cancellation:**
- Panel Interview Head of Engineering 09:30 WAT; Blocker HoE interview 09:30 WAT (Lisbon tz).
- Tolulope / Emeka 11:00–11:30 WAT; Emeka / Muhammad 12:30–13:00 WAT.
- ATPP Daily Standup 14:00 WAT; Monnify VAS Weekly 14:00 WAT; Zone Switching Partnership 14:00 WAT — triple-book at 14:00.
- **~~Round 2 Interview HoE 15:00 WAT~~ — CANCELLED this tick.** 15:00–16:00 WAT now open.
- TeamApt Exec Catch-up 16:00 WAT.

No RSVP changes to previously-accepted events by user, no agenda-less invites >30m, no back-to-back overload threshold crossed today. No Immediate-tier triggers from calendar this tick.
