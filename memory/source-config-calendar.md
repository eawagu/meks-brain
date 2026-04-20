---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T16:09:00Z. 17:09 WAT Full tick: zero calendar modifications in-window. Event-planner call window (16:00-18:00 WAT commitment day) is active during this tick but user not present (scheduled task). Product-Engineering Sync 18:00 WAT next. Tomorrow's 14:00 triple-book persists as Apr 21 briefing decision candidate."
updated: "2026-04-20T16:23:59Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
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

Tick 2026-04-20 17:09 WAT Full-level. Calendar sweep 16:09→17:09 WAT + tomorrow.

**Zero calendar modifications in-window.** No new invites, no cancellations, no RSVP changes, no agenda-less invites >30m, no back-to-back overload threshold crossed. Quiet tick on calendar source.

**Today's events status at tick time (17:09 WAT):**
- 2026 Strategy Event Debrief 14:45–15:45 WAT — ended 1h24m ago.
- Tech Support Meeting 16:00–17:00 WAT — ended 9m ago (B5 override: user declined manually).
- ATPP Daily Standup 16:00–17:00 WAT — ended 9m ago (B5 override: user declined manually).
- **Event-planner call window 16:00–18:00 WAT — ACTIVE at tick time.** Reminder "[[Call the event planner for dad's birthday]]" pending. User is not present at this scheduled-task tick (no live surface), but the commitment day is today; if the call hasn't happened by 18:09 WAT tick, absence-of-signal escalation will fire for tomorrow's briefing.
- Product - Engineering Sync 18:00–19:00 WAT (pre-accepted) — starts in ~51m.
- Moniepoint Dinner 19:00 WAT (accepted per B5).

**Apr 21 tomorrow (unchanged from prior tick):**
- Panel Interview Head of Engineering 09:30 WAT; Blocker HoE interview 09:30 WAT (Lisbon tz).
- Tolulope / Emeka 11:00–11:30 WAT; Emeka / Muhammad 12:30–13:00 WAT.
- Cards Team Str, Systems & Roadmap 13:00–14:00 WAT — needsAction (decision candidate for Apr 21 briefing).
- ATPP Daily Standup 14:00 WAT; Monnify VAS Weekly 14:00 WAT; Zone Switching Partnership 14:00 WAT — **triple-book at 14:00**.
- NIBSS TSA Integration 14:00 WAT (per email thread confirmed this tick) — adds to the 14:00 conflict; now potentially a quadruple-book decision.
- 15:00–16:00 WAT open (Round 2 HoE interview cancelled prior tick).
- TeamApt Exec Catch-up 16:00 WAT.

**14:00 WAT Apr 21 conflict intensifies.** The prior-tick triple-book (ATPP Daily Standup + Monnify VAS Weekly + Zone Switching Partnership) now includes NIBSS TSA Integration per today's email confirmation. Four overlapping 14:00 WAT events tomorrow is a forced-triage scenario — strengthens the Apr 21 briefing decision candidate.

No Immediate-tier triggers from calendar this tick.
