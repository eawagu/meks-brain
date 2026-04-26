---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-26T06:10:00Z (07:10 WAT). 07:10 WAT Apr 26 skim-tick: Sunday→Monday window unchanged (Lattice block + Mon 11-meeting day captured at briefing). Lattice deadline 40h50m remaining at this tick."
updated: "2026-04-26T07:23:44Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T07:10:00Z"
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

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (2h after Sunday briefing), Sun→Mon window zero new events — Lattice deadline 39h50m

08:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-post-briefing-active-situations). Sunday-morning calendar-side priority signals are extremely unlikely; quick `list_events` Sun 07:10 WAT → Mon 23:59 WAT confirmed Mon Apr 27 11-meeting day unchanged from briefing-tick capture (TPP × Platformization 11:30, Channels Onboarding & Disbursement 11:30 — hard overlap; ATPP Daily Standup 16:00, Tech support meeting 16:00 — hard overlap; Lattice Review block ending Apr 28 00:00 UTC). Most recent calendar updates: "Direct to Bank: Daily stand up" updated 03:28 WAT Apr 26 (predates window); "TPP × Platformization" updated 00:33 WAT Apr 26 (predates window). **No new invites, no RSVP changes, no cancellations in 1h window.** Lattice deadline now 39h50m remaining (was 40h50m at 07:10 WAT, 41h50m at briefing tick — countdown advancing).

Factors: source=calendar, skim_tick, sunday_zero_delta_1h, monday_unchanged, lattice_deadline_39h50m, no_priority_signal_match.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), Sun→Mon window zero new events — Lattice deadline 40h50m (preserved summary)

07:10 WAT Apr 26 Sunday skim tick. Sun→Mon window confirmed only Lattice block end Apr 28 00:00 UTC. No new invites/RSVP changes/cancellations in 1h. Mon Apr 27 schedule unchanged from briefing-tick capture: 11 events with 2 hard overlaps. Lattice deadline 40h50m.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), Sun clear + Mon Apr 27 11-meeting day with 2 hard overlaps + Lattice deadline 41h50m (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick. `list_events` Apr 26 06:00 WAT → Apr 27 23:59 WAT returned 12 events. Sunday Apr 26: 0 events (Lattice Review block only — calendar clear). Monday Apr 27: 11 events including 2 hard overlaps (TPP × Plat vs Channels Onboarding 11:30; ATPP vs Tech support 16:00). Briefing-2026-04-26 D4 covers Mon meeting choices + Lattice deadline. Lattice deadline 41h50m at briefing tick.

### last_processed 2026-04-25T19:10:00Z (20:10 WAT) — skim-level 20:00-cron tick, weekend zero-delta unchanged (preserved summary)

20:10 WAT Apr 25 Saturday skim tick. 11 Mon Apr 27 events + Lattice block. Zero events Sat/Sun past 18:00 WAT. Two Mon Apr 27 events `needsAction`. Weekend clear. Lattice deadline 1d4h.

### last_processed 2026-04-25T11:10:00Z–17:10:00Z — preserved summary block

Multiple Saturday skim ticks, weekend zero-delta unchanged across all. Lattice deadline countdown.

### last_processed 2026-04-25T05:09:54Z–08:10:00Z — preserved summary block

Saturday early ticks. 06:09 WAT briefing-tick weekend zero-delta. Open weekend window for triage compound + dad reminder + Lattice batch.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks. 06:09 WAT briefing-tick 11 events. TeamApt Org Changes 16:00–18:00 WAT new (Pawel Swiatek). Triple-overlap resolved in briefing-2026-04-24 D2.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
