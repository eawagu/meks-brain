---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-26T06:10:00Z (07:10 WAT). 07:10 WAT Apr 26 skim-tick: Sunday→Monday window unchanged (Lattice block + Mon 11-meeting day captured at briefing). Lattice deadline 40h50m remaining at this tick."
updated: "2026-04-26T06:24:05Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T06:10:00Z"
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

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (1h after Sunday briefing), Sun→Mon window zero new events — Lattice deadline 40h50m

07:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=hour-after-briefing-with-2-active-p1s-needing-delta-check). Sunday-morning calendar-side priority signals are extremely unlikely; quick `list_events` Sun 06:00 WAT → Mon 23:59 WAT confirmed only the Lattice Review recurring downward review block (end Apr 28 00:00 UTC = Apr 28 01:00 WAT). **No new invites, no RSVP changes, no cancellations in 1h window.** Mon Apr 27 schedule unchanged from briefing-tick capture: 11 events with 2 hard overlaps (TPP×Plat vs Channels Onboarding 11:30; ATPP vs Tech support 16:00). Lattice deadline now 40h50m remaining (was 41h50m at briefing tick — countdown advancing).

Factors: source=calendar, skim_tick, sunday_zero_delta_1h, monday_unchanged, lattice_deadline_40h50m, no_priority_signal_match.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (Sunday Apr 26), Sun clear + Mon Apr 27 11-meeting day with 2 hard overlaps + Lattice deadline 41h50m (preserved summary)

06:10 WAT Apr 26 Sunday briefing tick (Step 0: level=full, rationale=briefing-tick). `list_events` Apr 26 06:00 WAT → Apr 27 23:59 WAT (timeZone Africa/Lagos) returned 12 events:

**Sunday Apr 26: 0 events** (Lattice Review recurring downward review block only — same as Saturday). Calendar clear.

**Monday Apr 27: 11 events** —
1. 08:30–09:30 WAT — Direct to Bank: Daily stand up (recurring, Khadijat Musa organizer, updated 03:28 WAT Apr 26 → minor delta in metadata)
2. 09:45–10:15 WAT — PTSP Weekly Stand-up (recurring, Ifeoluwa Aliyu organizer)
3. 10:30–11:15 WAT — Cards and Account: All Hands (recurring, David Redemi organizer)
4. **11:30–12:00 WAT — TPP × Platformization** (one-off, Tracy Ojaigho creator, created Apr 24 16:31 WAT, updated Apr 26 00:33 WAT — `responseStatus=needsAction` for user)
5. **11:30–12:30 WAT — Channels Onboarding & Disbursement** (recurring, Barakat Ajadi organizer — `responseStatus=accepted`) — **HARD OVERLAP with #4**
6. 12:00–13:00 BST = 13:00–14:00 WAT — Phoenix Stage 1 Weekly Check in (recurring, Ravi Jakhodia)
7. 13:30–14:10 WAT — Juliana Switch Daily Standup (recurring, June Johnson)
8. 14:10–15:10 WAT — Fraud monitoring plan and concerns (one-off, June Johnson, created Apr 20)
9. 15:00–16:00 WAT — Project Phoenix CI&P kick off meeting (one-off, Tracy Ojaigho, created Apr 22)
10. **16:00–17:00 WAT — ATPP Daily Standup Meeting** (recurring, Ruth Adetunji — `responseStatus=accepted`)
11. **16:00–17:00 WAT — Tech support meeting** (recurring, Chidera Molokwu — `responseStatus=accepted`) — **HARD OVERLAP with #10**
12. 18:00–19:00 WAT — Product - Engineering Sync (recurring, user organizer)

**Lattice Review** — 8 Pending Downward Reviews recurring block ends Apr 28 00:00 (Africa/Lagos = ~Apr 27 23:00 WAT) → effective deadline ~Apr 27 end-of-day → **41h50m remaining** at this tick.

**Priority signal matches:**
- Priority signal #1 (declined RSVPs): none observed.
- Priority signal #2 (same-day/next-day invites): TPP × Platformization (created Apr 24, ~3 days advance — not same-day) and Tracy's Project Phoenix CI&P (created Apr 22, 5d advance).
- Priority signal #5 (back-to-back overload): Mon Apr 27 has 6 consecutive meetings 09:45–17:00 WAT with only one ~30min gap (12:00→13:00 WAT) and the two 11:30 + 16:00 hard overlaps. **Overload condition met.**
- Hard overlaps × 2: 11:30 (TPP×Plat 30min vs Channels Onboarding 60min); 16:00 (ATPP vs Tech support, both 60min).

**Briefing-2026-04-26 D4** — covers Mon meeting choices + Lattice deadline.

**Sunday window:** clear for D3 (bulk-triage) + D4 path 3 (Lattice batch) + D5 (dad reminder close-out).

Factors: source=calendar, briefing_tick, sunday_clear, monday_11_meetings, hard_overlap_count_2, lattice_deadline_41h50m, overload_condition_met, weekend_clear_unchanged, briefing_tier_classification.

### last_processed 2026-04-25T19:10:00Z (20:10 WAT) — skim-level 20:00-cron tick, weekend zero-delta unchanged (preserved summary)

20:10 WAT Apr 25 Saturday skim tick. 11 Mon Apr 27 events + Lattice block. Zero events Sat/Sun past 18:00 WAT. Two Mon Apr 27 events `needsAction` (Phoenix CI&P 15:00–16:00, TPP × Platformization 11:30–12:00) — predate window. Weekend clear. Lattice deadline 1d4h.

### last_processed 2026-04-25T11:10:00Z–17:10:00Z — preserved summary block

Multiple Saturday skim ticks, weekend zero-delta unchanged across all. Lattice deadline countdown.

### last_processed 2026-04-25T05:09:54Z–08:10:00Z — preserved summary block

Saturday early ticks. 06:09 WAT briefing-tick weekend zero-delta. Open weekend window for triage compound + dad reminder + Lattice batch.

### last_processed 2026-04-24T05:09:00Z–21:10:00Z — preserved summary block

Apr 24 ticks. 06:09 WAT briefing-tick 11 events. TeamApt Org Changes 16:00–18:00 WAT new (Pawel Swiatek). Triple-overlap resolved in briefing-2026-04-24 D2.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP auth-failure across heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Recovery 09:11 WAT Apr 23.
