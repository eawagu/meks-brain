---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T09:09:00Z (10:09 WAT). 10:09 WAT Apr 24 zero-delta tick: 8 events returned (All Hands dropped as ended 10:00 WAT), ordered by lastModified. Most recent update is Round 2 HoE Interview (Venkatesh Purushothaman) at 16:04 WAT Apr 23 — pre-existing; no delta. No new invites, no cancellations, no RSVP status changes. Next event: 11:00 WAT Round 2 HoE Interview (needsAction RSVP still pending)."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T09:09:00Z"
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

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — zero-delta tick

10:09 WAT Apr 24 tick: `list_events` for Apr 24 (10:09 WAT → Apr 25 00:00 WAT) returned 8 events (All Hands dropped from window — meeting ended 10:00 WAT). Most recent `updated`: Round 2 HoE Interview Venkatesh Purushothaman at 16:04 WAT Apr 23 — pre-existing, no metadata delta since prior tick. No new invites, no cancellations, no RSVP status deltas.

Upcoming today (unchanged):
- **11:00 WAT — Round 2 HoE Interview Venkatesh Purushothaman (needsAction, 1h)** — starts in ~51m; RSVP still pending (briefing-2026-04-24 A6 recommendation unresolved).
- 11:00 WAT — Blocker: HoE (VP+) Slots (Chris Purkis; needsAction, optional)
- 12:00 WAT — Deliberation: HoE batch interviews (needsAction, 40min)
- 13:00 WAT — CI&P Team Structure (Tracy Ojaigho; needsAction, 1h)
- 15:00–17:00 WAT — Lattice Downward Reviews — 8 pending (self, accepted)
- 16:00 WAT — Tech support meeting (recurring, accepted) — triple-overlap carryover from briefing-2026-04-24 D2
- 16:00 WAT — TeamApt Org Changes (Pawel Swiatek; accepted, 2h)
- 18:00 WAT — Product-Engineering Sync (self recurring, accepted)

No priority-signal matches this tick.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — zero-delta tick (preserved)

09:10 WAT Apr 24 tick: 10 events returned; most recent `updated` is TeamApt All Hands recurring instance at 07:07 UTC (08:07 WAT) — same event as prior tick, no further metadata refresh. All Hands meeting in progress at tick time. No priority-signal matches.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — zero-delta tick (preserved)

08:09 WAT Apr 24 tick: TeamApt All Hands metadata refresh only — skip-rule applies (recurring standing meeting, unchanged metadata). No priority-signal matches.

### last_processed 2026-04-24T06:10:00Z (07:10 WAT) — zero-delta tick (preserved)

07:10 WAT Apr 24 tick: 9 events returned, all timestamps pre-dating briefing tick. No deltas.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events returned. **Priority-signal match — TeamApt Org Changes (Pawel Swiatek, 16:00–18:00 WAT, 2h, agenda-less, NEW) matches #2 (next-day→same-day invite) + #4 (agenda-less >30min).** Triple-overlap at 16:00 WAT resolved in briefing-2026-04-24 D2 option 1. HoE cluster 11:00-12:40 WAT — 3 overlapping events, no new delta this tick.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP returned auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery confirmed 09:11 WAT Apr 23.
