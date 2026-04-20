---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T14:09:00Z. 15:09 WAT Full tick: 1 new calendar modification — Cards Team Str, Systems & Roadmap Apr 21 13:00–14:00 WAT invite (needsAction). Fills the slot between Emeka/Muhammad 1:1 (12:30–13:00) and the 14:00 triple-book — decision required for Apr 21 briefing. Today's 2026 Strategy Event Debrief 14:45–15:45 WAT starts in ~36 min."
updated: "2026-04-20T15:21:46Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T15:09:00Z"
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

Tick 2026-04-20 16:09 WAT Full-level. Calendar sweep 15:09→16:09 WAT + tomorrow.

**Zero calendar modifications in-window.** No new invites, no cancellations, no RSVP changes, no agenda-less invites >30m, no back-to-back overload threshold crossed. Quiet tick on calendar source.

**Today's events status:**
- 2026 Strategy Event Debrief 14:45–15:45 WAT — **in progress at tick start; ended ~24 min ago.** Accepted per B5 override.
- Tech Support Meeting 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI. Tick runs at 16:09 WAT — overlap with start but triage decision already recorded.
- ATPP Daily Standup 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI. Same overlap with tick.
- **Event-planner call window 16:00–18:00 WAT open** per B3 triage commitment. Reminder still pending (see Step 2 evaluation — no re-surface this tick; already surfaced in briefing-2026-04-20 B3).
- Product - Engineering Sync 18:00–19:00 WAT (pre-accepted).
- Moniepoint Dinner 19:00 WAT (accepted per B5, user manual RSVP). Logistics email confirmed in email sweep this tick.

**Apr 21 tomorrow (unchanged from prior tick):**
- Panel Interview Head of Engineering 09:30 WAT; Blocker HoE interview 09:30 WAT (Lisbon tz).
- Tolulope / Emeka 11:00–11:30 WAT; Emeka / Muhammad 12:30–13:00 WAT.
- Cards Team Str, Systems & Roadmap 13:00–14:00 WAT — needsAction (decision candidate for Apr 21 briefing).
- ATPP Daily Standup 14:00 WAT; Monnify VAS Weekly 14:00 WAT; Zone Switching Partnership 14:00 WAT — triple-book at 14:00.
- 15:00–16:00 WAT open (Round 2 HoE interview cancelled prior tick).
- TeamApt Exec Catch-up 16:00 WAT.

No Immediate-tier triggers from calendar this tick.
