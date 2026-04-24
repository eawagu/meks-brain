---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T16:09:00Z (17:09 WAT). 17:09 WAT Apr 24 full-level zero-delta tick: `list_events` 17:09 WAT → Apr 25 00:00 WAT returned 3 events (Lattice Reviews in progress, Product-Engineering Sync 18:00, TeamApt Org Changes 16:30-18:00 currently in progress). Most recent `updated` TeamApt Org Changes 12:18 WAT (3 ticks ago). No new events this tick — Tracy Ojaigho Apr 27 TPP x Platformization invite captured via email Layer 1 not yet reflected in calendar `list_events` (may sync in next tick). No priority-signal matches."
updated: 2026-04-24
cssclasses:
  - "source-config"
last_processed: "2026-04-24T16:09:00Z"
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

### last_processed 2026-04-24T16:09:00Z (17:09 WAT) — full-level zero-delta tick

17:09 WAT Apr 24 tick: `list_events` for remaining Apr 24 day (17:09 WAT → Apr 25 00:00 WAT) ordered by lastModified returned **3 events**, none with `updated` inside the 16:09→17:09 WAT window.

**Remaining events today:**
- 15:00–17:00 WAT — [[Lattice Downward Reviews — 8 pending]] (self, accepted) — **session ending / ended at 17:00 WAT**
- 16:30–18:00 WAT — TeamApt Org Changes (Pawel Swiatek; needsAction, 1h30m) — **currently in progress** (started 16:30 WAT, ends in ~51min per briefing-2026-04-24 D2 option 1 disposition)
- 18:00 WAT — Product-Engineering Sync (self recurring, accepted) — **starts in ~51min** (this hour's instance appears to have moved from 18:00 to 19:00 per `originalStartTime: 2026-04-24T18:00:00+01:00` with `start: 2026-04-24T19:00:00+01:00` — possible shift to accommodate Org Changes overrun, OR this is an existing weekly-series pattern).

**Cross-source note:** Tracy Ojaigho TPP x Platformization invite for Mon Apr 27 11:30-12:00 WAT arrived via Gmail at 16:31 WAT this tick (see source-config-email) but is not yet visible in `list_events` result (may be Gmail delivery → Calendar sync lag, or is out of current query window since today-only scope). Next tick's calendar sweep will include Monday Apr 27 if query window extends or if the accept/decline action triggers sync.

No priority-signal matches this tick. No Immediate dispatch.

Factors: `source=calendar`, `zero_delta`, `no_priority_signal_match`, `no_immediate_dispatch`, `d2_org_changes_in_progress`, `cross_source_tpp_invite_gmail_only`.

### last_processed 2026-04-24T15:09:00Z (16:09 WAT) — full-level zero-delta tick (preserved)

16:09 WAT Apr 24 tick: 5 events returned, none with `updated` inside the 15:09→16:09 WAT window. Most recent `updated`: TeamApt Org Changes 11:18 WAT Apr 24 (captured in the 13:09 WAT tick). Tech support meeting updated 17:11 WAT Apr 20; Product-Engineering Sync 22:14 WAT Apr 22; Lattice Reviews 15:54 WAT Apr 19. Lattice Reviews currently 1h+ into session. Tech Support + TeamApt Org Changes overlapping per briefing-2026-04-24 D2.

### last_processed 2026-04-24T14:09:00Z (15:09 WAT) — full-level zero-delta tick (preserved summary)

15:09 WAT Apr 24 tick: 5 events returned; most recent updated TeamApt Org Changes 12:18 WAT. No new updates. Lattice Reviews 15:00–17:00 WAT starting.

### last_processed 2026-04-24T13:09:00Z (14:09 WAT) — full-level zero-delta tick (preserved summary)

14:09 WAT Apr 24 tick: 5 events returned, no new updates since 12:18 WAT Org Changes time shift.

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick, TeamApt Org Changes time-shift delta (preserved summary)

13:09 WAT Apr 24 tick: TeamApt Org Changes updated 12:18 WAT by Pawel Swiatek — meeting time shifted 16:00→16:30 WAT. Calendar delta folded into briefing-2026-04-24 D2.

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep (preserved summary)

06:09 WAT Apr 24 briefing tick: 11 events returned. Priority-signal match — TeamApt Org Changes (Pawel Swiatek, 16:00–18:00 WAT, 2h, agenda-less, NEW). Triple-overlap at 16:00 WAT resolved in briefing-2026-04-24 D2 option 1.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
