---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: Sun→Mon window unchanged from 10:10 WAT capture. Lattice deadline 36h50m remaining at this tick."
updated: "2026-04-26T17:21:07Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T17:10:00Z"
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

### last_processed 2026-04-26T17:10:00Z (18:10 WAT) — skim-level 18:00-cron tick, 0 priority signals / 0 metadata updates — Lattice deadline 29h50m

18:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-evening-active-situations-in-background). `list_events` Sun 17:00 WAT → Mon Apr 27 23:59 WAT returned the standard Mon Apr 27 11-meeting day unchanged from prior-tick capture. Most-recent event `updated` timestamp 12:37 WAT (Channels Onboarding & Disbursement, captured 13:10 WAT prior tick). **0 metadata updates in 16:10 → 17:09 UTC window.** No new invites, no RSVP changes, no cancellations. Lattice deadline now 29h50m remaining (countdown advancing on schedule). Sunday calendar clear (Lattice block only). Mon Apr 27 conflicts unchanged from briefing-2026-04-26 D4 (TPP×Platformization vs Channels Onboarding 11:30; ATPP vs Tech support 16:00).

Factors: source=calendar, skim_tick, sunday_zero_priority_signal_1h, sunday_zero_metadata_update_1h, monday_unchanged, lattice_deadline_29h50m, no_priority_signal_match, no_immediate_dispatch.

### last_processed 2026-04-26T16:10:00Z (17:10 WAT) — skim-level 17:00-cron tick (preserved summary)

17:10 WAT Apr 26 Sunday skim. Sun→Mon window unchanged. 0 metadata updates in 1h window. Lattice deadline 30h50m. Mon Apr 27 11-meeting day unchanged.

### last_processed 2026-04-26T15:10:00Z (16:10 WAT) — skim-level 16:00-cron tick (preserved summary)

16:10 WAT Apr 26 Sunday skim. Sun→Mon window unchanged. 0 metadata updates in 1h window. Lattice deadline 31h50m. Mon Apr 27 11-meeting day unchanged.

### last_processed 2026-04-26T14:10:00Z (15:10 WAT) — skim-level 15:00-cron tick (preserved summary)

15:10 WAT Apr 26 Sunday skim. Sun→Mon window unchanged. 0 metadata updates in 1h window. Lattice deadline 32h50m. Mon Apr 27 11-meeting day unchanged.

### last_processed 2026-04-26T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (preserved summary)

14:10 WAT Apr 26 Sunday skim. Sun→Mon window unchanged. 0 metadata updates in 1h window. Lattice deadline 33h50m. Mon Apr 27 11-meeting day unchanged.

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (preserved summary)

13:10 WAT Apr 26 Sunday skim. 1 minor recurring-meeting metadata update (Channels Onboarding & Disbursement updated 11:37 WAT — stable, no salience-relevant delta, skip-rule match). Lattice deadline 34h50m. Mon Apr 27 11-meeting day unchanged.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim. Sun→Mon window zero new events from prior tick. Lattice deadline 35h50m.

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick — Lattice deadline 36h50m (preserved summary)

11:10 WAT Apr 26 Sunday skim. Sun→Mon window zero new events. Mon Apr 27 11-meeting day unchanged. Lattice deadline 36h50m.

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick — Lattice deadline 37h50m (preserved summary)

10:10 WAT Apr 26 Sunday skim. Sun→Mon window zero new events. Mon Apr 27 11-meeting day unchanged. Lattice deadline 37h50m.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick — Lattice deadline 39h50m (preserved summary)

08:10 WAT Apr 26 Sunday skim. Sun→Mon window zero new events. Lattice deadline 39h50m.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick — Lattice deadline 40h50m (preserved summary)

07:10 WAT Apr 26 Sunday skim. Sun→Mon zero-delta. Mon Apr 27 unchanged from briefing.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (preserved summary)

06:10 WAT Apr 26 briefing tick. 12 events Apr 26 06:00 → Apr 27 23:59 WAT. Sunday clear (Lattice block only). Monday 11 events with 2 hard overlaps. Briefing-2026-04-26 D4.

### last_processed 2026-04-25T19:10:00Z–earlier — preserved summary

Apr 25 Saturday skim. Weekend zero-delta unchanged.

### last_processed 2026-04-25T11:10:00Z–earlier — preserved summary block

Apr 25 morning/afternoon ticks. Weekend zero-delta.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery.