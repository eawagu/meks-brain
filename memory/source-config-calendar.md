---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload; last_processed 2026-04-20T05:09:34Z. 06:09 WAT Monday briefing tick: two overnight invite deltas on today — IMS Management Review 09:00-10:00 WAT (conflicts DTB standup 30m); Strategy Event Debrief 14:45 WAT. Apr 20 16:00 WAT ATPP/Tech-Support conflict unresolved."
updated: "2026-04-20T05:39:17Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T05:09:34Z"
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

Tick 2026-04-20 06:09 WAT **full-level (06:00 briefing floor)**. Window: 20:09 WAT Apr 19 → 06:09 WAT Apr 20 (~10h, includes overnight delegation window 23:00–06:00 WAT).

**Two overnight invite deltas on today (Monday Apr 20):**

1. **IMS Management Review — Apr 20 09:00–10:00 WAT (NEW invite, same-day trigger).** CONFLICT: overlaps DTB Daily Standup (08:30–09:30 WAT) by 30 minutes (09:00–09:30 WAT). Forced choice — either attend DTB standup full 08:30–09:30 and miss IMS opening 30m, or transition to IMS at 09:00 WAT (leaving DTB standup 30m early). Dispatched to briefing-2026-04-20 as Decision item B2. Factors: urgency 0.8 · impact_scope 0.5 · cto_specificity 0.6 · pattern_significance 0.3 · accountability_alignment 0.7.

2. **Strategy Event Debrief — Apr 20 14:45 WAT (NEW invite).** Slots into previously light afternoon window. No direct conflict with an existing meeting, but compresses afternoon into a stacked sequence: Strategy Debrief 14:45 → ATPP Standup 16:00 → Tech Support 16:00 (unresolved conflict from prior tick) → Moniepoint Dinner 18:00. Dispatched as part of afternoon-stack item B5 on briefing-2026-04-20.

**Carry-forward unresolved:** Apr 20 16:00–17:00 WAT **ATPP Daily Standup vs Tech Support meeting — conflict persists.** Both accepted, exact overlap. No resolution action observed overnight. Dispatched to briefing-2026-04-20 as Decision item B5 (afternoon-stack question: which to attend, which to delegate/decline).

No RSVP changes on previously accepted meetings, no cancellations, no new Tuesday Apr 21 agenda-less invites, no reschedules.

**Forward view (Monday Apr 20, updated):**
- 08:30–09:30 WAT — Direct to Bank : Daily stand up
- **09:00–10:00 WAT — IMS Management Review (NEW)** — conflicts DTB standup 30m
- 10:30–11:15 WAT — Cards and Account: All Hands
- 11:30–12:30 WAT — Channels Onboarding & Disbursement
- 13:30–14:10 WAT — Juliana Switch Daily Standup
- **14:45 WAT — Strategy Event Debrief (NEW)**
- **16:00–17:00 WAT — ATPP Daily Standup vs Tech support meeting (UNRESOLVED CONFLICT)**
- 18:00–19:00 WAT — Moniepoint Dinner (accepted; 19:00 IST label)
- 18:00–19:00 WAT — Product - Engineering Sync (self-organized, Frank Atashili pending) — **NEW CONFLICT: overlaps Moniepoint Dinner exactly.** Carry to next tick for user choice if not self-resolved.

Tue Apr 21 — no meetings shown in forward view.
Wed Apr 22 — HoE Round 2 panel 4pm–5pm WAT for Bhuvnesh Bansal (confirmed, formal invite received Apr 19 20:08 WAT from [[Tobilola Fasanya]]).
Lattice Review window closes Apr 27 (7 days remaining).
