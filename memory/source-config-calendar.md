---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T12:09:00Z (13:09 WAT). 13:09 WAT Apr 24 full-level tick: **TeamApt Org Changes updated 12:18 WAT by Pawel Swiatek — meeting time shifted 16:00→16:30 WAT** (30-min later start, end unchanged at 18:00 WAT). Priority-signal match #2 partial (same-day update, not a new invite). Calendar delta folded into briefing-2026-04-24 D2 as refinement note — option 1 still holds, Tech Support overlap reduces from 1h to 30min."
updated: "2026-04-24T12:26:52Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T12:09:00Z"
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

### last_processed 2026-04-24T12:09:00Z (13:09 WAT) — full-level tick, TeamApt Org Changes time-shift delta

13:09 WAT Apr 24 tick: `list_events` for Apr 24 (13:09 WAT → Apr 25 00:00 WAT) returned 6 events remaining today, ordered by lastModified. **Most recent `updated`: TeamApt Org Changes 12:18:35 WAT (11:18:35 UTC)** — metadata change from Pawel Swiatek.

**Calendar delta — TeamApt Org Changes meeting time shifted.**
- **Before this tick** (per briefing-2026-04-24 D2 compose): 16:00–18:00 WAT, 2h block.
- **After this tick**: **16:30–18:00 WAT**, 1h30m block. End time unchanged; start pushed 30 minutes later.
- **Same meeting** (event id `5ia9mtsqmjbgt1gvp82b7m1lul`); **same organizer** (Pawel Swiatek, Moniepoint leadership); same attendees (emeka.awagu needsAction, frank.atashili needsAction, tracy.ojaigho needsAction, dajalie optional tentative); **same agenda-less description** (empty).
- **Paired email signal:** Gmail thread 19dbf368f9c7d8df from pawel.swiatek@moniepoint.com at 11:18:36 WAT Apr 24 — "Updated invitation with note: TeamApt Org Changes @ Fri Apr 24, 2026 4:30pm - 6pm (WAT) (Emeka Awagu)".
- **Priority-signal match:** partial #2 (same-day update to previously-scheduled meeting, not a new invite). Directive as-stated doesn't explicitly cover time-shifts on existing invites; treating as delta-worthy because the original triple-overlap at 16:00 WAT was the D2 decision-driver.

**Implication for briefing-2026-04-24 D2.** D2 asked: triple-overlap at 16:00 WAT (Lattice 15:00–17:00, Tech Support 16:00–17:00, Org Changes 16:00–18:00) → accept + decline Tech Support + keep Lattice. **Shift reduces overlap severity:**
- Lattice 15:00–17:00 WAT now overlaps Org Changes 16:30–17:00 (30min instead of 1h).
- Tech Support 16:00–17:00 WAT now overlaps Org Changes 16:30–17:00 (30min instead of 1h).
- Option 1 still holds (accept Org Changes + decline Tech Support + keep Lattice running parallel), but declining Tech Support is now slightly less costly — a 30-min Org-Changes-overlap window against Tech Support is easier to handle than a 1h overlap.

**Disposition:** Awareness — fold into briefing-2026-04-25 Awareness as D2 refinement note, or attach as amendment to existing D2 disposition at triage time. No new Decision item needed. No Immediate dispatch.

Factors: source=calendar, priority_signal_2_partial_same_day_update, meeting_time_shifted_30min_later, moniepoint_leadership_sender_pawel_swiatek, d2_refinement, overlap_severity_reduced, option_1_still_holds, no_immediate_dispatch, briefing_2026_04_25_awareness_candidate.

**Remaining events today (unchanged from 12:09 WAT tick enumeration, time-shift-adjusted):**
- 13:00 WAT — CI&P Team Structure (Tracy Ojaigho; needsAction, 1h) — in-progress at tick start
- 15:00–17:00 WAT — Lattice Downward Reviews — 8 pending (self, accepted)
- 16:00 WAT — Tech support meeting (recurring, accepted) — now 30-min overlap with Org Changes (was 1h)
- **16:30 WAT — TeamApt Org Changes (Pawel Swiatek; needsAction, 1h30m)** — shifted from 16:00 start
- 18:00 WAT — Product-Engineering Sync (self recurring, accepted)

No other priority-signal matches this tick.

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
