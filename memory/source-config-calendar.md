---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T12:09:00Z (13:09 WAT). 13:09 WAT Apr 24 full-level tick: **TeamApt Org Changes updated 12:18 WAT by Pawel Swiatek — meeting time shifted 16:00→16:30 WAT** (30-min later start, end unchanged at 18:00 WAT). Priority-signal match #2 partial (same-day update, not a new invite). Calendar delta folded into briefing-2026-04-24 D2 as refinement note — option 1 still holds, Tech Support overlap reduces from 1h to 30min."
updated: "2026-04-24T13:23:55Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T13:09:00Z"
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

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level zero-delta tick

14:09 WAT Apr 24 tick: `list_events` for remaining Apr 24 day (14:09 WAT → Apr 25 00:00 WAT) returned 5 events ordered by lastModified. Most recent `updated`: TeamApt Org Changes 12:18:35 WAT (already captured at the 13:09 WAT prior tick). No new calendar-update activity since prior tick.

**Remaining events today (time-shift-adjusted, unchanged from 13:09 WAT tick enumeration):**
- 15:00–17:00 WAT — Lattice Downward Reviews — 8 pending (self, accepted)
- 16:00 WAT — Tech support meeting (recurring, accepted) — 30-min overlap with Org Changes
- 16:30–18:00 WAT — TeamApt Org Changes (Pawel Swiatek; needsAction, 1h30m)
- 18:00 WAT — Product-Engineering Sync (self recurring, accepted)
- (Lattice Review — 8 Pending Downward Reviews long-running placeholder — not time-bounded)

No priority-signal matches this tick. No Immediate dispatch.

Factors: source=calendar, zero_delta, no_priority_signal_match, no_immediate_dispatch.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick, TeamApt Org Changes time-shift delta (preserved)

13:09 WAT Apr 24 tick: TeamApt Org Changes updated 12:18 WAT by Pawel Swiatek — meeting time shifted 16:00→16:30 WAT. Priority-signal match #2 partial (same-day update, not a new invite). Calendar delta folded into briefing-2026-04-24 D2 as refinement note — option 1 still holds, Tech Support overlap reduces from 1h to 30min.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — zero-delta tick (Round 2 HoE interview metadata refresh) (preserved)

12:09 WAT Apr 24 tick: `list_events` for Apr 24 returned 10 events. Most recent `updated`: Round 2 HoE Interview Venkatesh Purushothaman updated at 11:11:04 WAT Apr 24 — post-interview metadata refresh. Skip-rule applies (unchanged pre-existing event). No priority-signal matches.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — zero-delta tick (preserved)

11:09 WAT Apr 24 tick: 8 events returned. Most recent `updated`: Deliberation: HoE batch interviews recurring update at 10:42 WAT. Skip-rule applies. No priority-signal matches.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — zero-delta tick (preserved)

10:09 WAT Apr 24 tick: 8 events. Most recent `updated`: Round 2 HoE Interview Venkatesh Purushothaman at 16:04 WAT Apr 23. No priority-signal matches.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — zero-delta tick (preserved)

09:10 WAT Apr 24 tick: 10 events; most recent `updated` is TeamApt All Hands recurring instance at 07:07 UTC. Skip-rule applies. No priority-signal matches.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events returned. **Priority-signal match — TeamApt Org Changes (Pawel Swiatek, 16:00–18:00 WAT, 2h, agenda-less, NEW) matches #2 (next-day→same-day invite) + #4 (agenda-less >30min).** Triple-overlap at 16:00 WAT resolved in briefing-2026-04-24 D2 option 1. HoE cluster 11:00-12:40 WAT — 3 overlapping events, no new delta this tick.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP returned auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery confirmed 09:11 WAT Apr 23.
