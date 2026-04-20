---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T10:09:00Z. 11:09 WAT Full tick: no same-day invite changes (Strategy Debrief minor metadata update already accepted per B5). Two new Moniepoint interview-slot invites for Apr 23/Apr 24 — awareness (3–4 days out, below priority signal #2 threshold). Cards & Account All Hands in progress (10:30–11:15 WAT)."
updated: "2026-04-20T10:17:46Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T10:09:00Z"
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

Tick 2026-04-20 11:09 WAT Full-level. Calendar sweep 10:09 WAT → 11:09 WAT today + extended window to catch invites for upcoming days.

**Two new invites arrived via email (from Chris Purkis / Moniepoint People):**
- **Apr 23 15:30–16:30 WAT "Blocker - Head of Engineering"** (created 09:43 WAT today). 3-day-out interview slot. Priority signal #2 (same-day/next-day) does NOT fire. Awareness.
- **Apr 24 11:00–12:00 WAT "Blocker: Head of Engineering (VP+) Slots" (updated invite)** (sent 10:06 WAT today). 4-day-out. Awareness.
- **Apr 21 13:00–14:00 WAT "Cards Team Str, Systems & Roadmap"** (created 08:44 WAT today, pre-tick but caught in Layer 1 email sweep). Next-day meeting — priority signal #2 fires. Awareness (agenda present, accepted by default; low urgency).

**Today's events proceeding per B5 triage overrides:**
- Cards and Account: All Hands 10:30–11:15 WAT (in progress at tick, accepted) — produced Gemini notes at 09:47 WAT.
- Channels Onboarding & Disbursement 11:30–12:30 WAT (accepted, 21m from tick).
- Juliana Switch Daily Standup 13:30–14:10 WAT (accepted, recurring).
- 2026 Strategy Event Debrief 14:45–15:45 WAT (accepted, minor metadata bump 10:09 WAT — no content change).
- Tech Support Meeting 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI.
- ATPP Daily Standup 16:00–17:00 WAT — B5 override: user to decline manually in GCal UI.
- Product - Engineering Sync 18:00–19:00 WAT (accepted).
- Moniepoint Dinner 19:00 WAT (accepted per B5, RSVP manual).

No RSVP changes to previously-accepted events, no cancellations, no agenda-less invites >30m (both new Blocker HoE invites have Google Meet + context), no back-to-back overload crossing the 4-consecutive threshold. No Immediate-tier triggers from calendar this tick.
