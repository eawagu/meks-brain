---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T11:09:00Z (12:09 WAT). 12:09 WAT Apr 24 zero-delta tick: Round 2 HoE Interview Venkatesh Purushothaman metadata update 11:11 WAT (post-interview RSVP/metadata refresh — interview ended 12:00 WAT per event end). Interview-layer completion confirmed by parallel metaview.ai email notification 11:07 WAT. No new invites, no cancellations, no RSVP priority-signal deltas."
updated: "2026-04-24T11:24:06Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T11:09:00Z"
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

### last_processed 2026-04-24T11:09:00Z (12:09 WAT) — zero-delta tick (Round 2 HoE interview metadata refresh)

12:09 WAT Apr 24 tick: `list_events` for Apr 24 (12:09 WAT → Apr 25 00:00 WAT) returned 10 events. Most recent `updated`: **Round 2 HoE Interview Venkatesh Purushothaman** updated at **11:11:04 WAT Apr 24** — post-interview metadata refresh (interview concluded 12:00 WAT per event end; parallel metaview.ai transcript-ready email notification received 11:07 WAT). No RSVP status change, no cancellation. Skip-rule applies (unchanged recurring/pre-existing event).

Remaining today (unchanged from 11:09 WAT tick enumeration):
- 13:00 WAT — CI&P Team Structure (Tracy Ojaigho; needsAction, 1h)
- 15:00–17:00 WAT — Lattice Downward Reviews — 8 pending (self, accepted)
- 16:00 WAT — Tech support meeting (recurring, accepted) — triple-overlap carryover from briefing-2026-04-24 D2
- 16:00 WAT — TeamApt Org Changes (Pawel Swiatek; accepted, 2h)
- 18:00 WAT — Product-Engineering Sync (self recurring, accepted)

Also present (but already past at tick time):
- 08:30 WAT — TeamApt All Hands (recurring accepted, completed)
- 11:00 WAT — Round 2 HoE Interview Venkatesh Purushothaman (completed, scorecard pending)
- 11:00 WAT — Blocker: HoE (VP+) Slots (optional, completed)
- 12:00 WAT — Deliberation: HoE batch interviews (needsAction, starting now at 12:09 WAT / just-past-start)

No priority-signal matches this tick.

### last_processed 2026-04-24T10:09:00Z (11:09 WAT) — zero-delta tick (preserved)

11:09 WAT Apr 24 tick: 8 events returned. Most recent `updated`: **Deliberation: Head of Engineering batch interviews** (recurring, updated 10:42 WAT Apr 24 — 27m before tick). Routine metadata refresh on recurring event — skip-rule applies. No priority-signal matches.

### last_processed 2026-04-24T09:09:00Z (10:09 WAT) — zero-delta tick (preserved)

10:09 WAT Apr 24 tick: 8 events returned. Most recent `updated`: Round 2 HoE Interview Venkatesh Purushothaman at 16:04 WAT Apr 23 — pre-existing, no metadata delta since prior tick. No priority-signal matches.

### last_processed 2026-04-24T08:10:00Z (09:10 WAT) — zero-delta tick (preserved)

09:10 WAT Apr 24 tick: 10 events returned; most recent `updated` is TeamApt All Hands recurring instance at 07:07 UTC. Skip-rule applies. No priority-signal matches.

### last_processed 2026-04-24T07:09:00Z (08:09 WAT) — zero-delta tick (preserved)

08:09 WAT Apr 24 tick: TeamApt All Hands metadata refresh only — skip-rule applies. No priority-signal matches.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events returned. **Priority-signal match — TeamApt Org Changes (Pawel Swiatek, 16:00–18:00 WAT, 2h, agenda-less, NEW) matches #2 (next-day→same-day invite) + #4 (agenda-less >30min).** Triple-overlap at 16:00 WAT resolved in briefing-2026-04-24 D2 option 1. HoE cluster 11:00-12:40 WAT — 3 overlapping events, no new delta this tick.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP returned auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery confirmed 09:11 WAT Apr 23.
