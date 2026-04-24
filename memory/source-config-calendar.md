---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T14:09:00Z (15:09 WAT). 15:09 WAT Apr 24 full-level zero-delta tick: `list_events` for remaining Apr 24 day (15:09 WAT → Apr 25 00:00 WAT) returned 5 events, most recent `updated` TeamApt Org Changes 12:18 WAT (2 ticks ago, no new updates). Lattice Reviews 15:00–17:00 WAT currently starting. No priority-signal matches."
updated: "2026-04-24T14:22:34Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T14:09:00Z"
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

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level zero-delta tick

15:09 WAT Apr 24 tick: `list_events` for remaining Apr 24 day (15:09 WAT → Apr 25 00:00 WAT) returned 5 events ordered by lastModified. Most recent `updated`: TeamApt Org Changes 12:18:35 WAT (captured at the 13:09 WAT tick two ticks ago; no new delta this tick). Product-Engineering Sync updated 22:14 WAT Apr 22 (routine recurring). Tech support meeting updated 17:11 WAT Apr 20. Lattice Review placeholder updated 15:54 WAT Apr 19.

**Remaining events today (unchanged from prior tick enumeration):**
- 15:00–17:00 WAT — Lattice Downward Reviews — 8 pending (self, accepted) — **CURRENTLY STARTING at 15:09 WAT**
- 16:00 WAT — Tech support meeting (recurring, accepted) — 30-min overlap with Org Changes
- 16:30–18:00 WAT — TeamApt Org Changes (Pawel Swiatek; needsAction, 1h30m)
- 18:00 WAT — Product-Engineering Sync (self recurring, accepted)
- (Lattice Review — 8 Pending Downward Reviews long-running placeholder — not time-bounded)

No priority-signal matches this tick. No Immediate dispatch.

Factors: `source=calendar`, `zero_delta`, `no_priority_signal_match`, `no_immediate_dispatch`, `lattice_reviews_starting_at_tick_time`.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level zero-delta tick (preserved)

14:09 WAT Apr 24 tick: `list_events` for remaining Apr 24 day returned 5 events. Most recent `updated`: TeamApt Org Changes 12:18 WAT (already captured at 13:09 WAT tick). No new calendar-update activity since prior tick.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick, TeamApt Org Changes time-shift delta (preserved)

13:09 WAT Apr 24 tick: TeamApt Org Changes updated 12:18 WAT by Pawel Swiatek — meeting time shifted 16:00→16:30 WAT. Priority-signal match #2 partial (same-day update, not a new invite). Calendar delta folded into briefing-2026-04-24 D2 as refinement note — option 1 still holds, Tech Support overlap reduces from 1h to 30min.

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — zero-delta tick (preserved)

12:09 WAT Apr 24 tick: Round 2 HoE Interview Venkatesh Purushothaman metadata refresh (skip-rule applies). No priority-signal matches.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — zero-delta tick (preserved)

11:09 WAT Apr 24 tick: Deliberation: HoE batch interviews recurring update 10:42 WAT (skip-rule applies). No priority-signal matches.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events returned. **Priority-signal match — TeamApt Org Changes (Pawel Swiatek, 16:00–18:00 WAT, 2h, agenda-less, NEW) matches #2 + #4.** Triple-overlap at 16:00 WAT resolved in briefing-2026-04-24 D2 option 1.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP returned auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery confirmed 09:11 WAT Apr 23.
