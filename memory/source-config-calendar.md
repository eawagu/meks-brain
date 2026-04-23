---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed remains 2026-04-20T16:09:00Z (full sweep deferred to next briefing tick). 2026-04-23 09:11 WAT tick: Calendar MCP RECOVERED after ~64h dark. Apr 23 today + Apr 24 tomorrow probe shows 13:00 WAT WAT today double-book (DD Production Issues vs DD Weekly Check-ins), ATPP Standup canceled (calendar-conflict relief). Apr 24 carries 4 overlapping events at 11:00-12:00 WAT (HoE Round 2 + HoE Blocker + Lattice Reviews 15:00 + Tech Support 16:00 + CI&P 13:00)."
updated: "2026-04-23T13:20:26Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
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

### Tick 2026-04-20 17:09 WAT Full-level (condensed — pre-dark)

Zero in-window calendar modifications. Tomorrow's (Apr 21) 14:00 WAT triple-then-quadruple-book (ATPP Daily Standup + Monnify VAS Weekly + Zone Switching Partnership + NIBSS TSA Integration) carried as Apr 21 briefing decision candidate.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure)

Calendar MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 ticks pre-recovery. Surfaced as briefing-2026-04-22 B2 (joint with Gmail) and briefing-2026-04-23 D4. New invites + conflict detection blind for the window.

### Tick 2026-04-23 ~09:11 WAT — RECOVERY (condensed — see git history)

Probe scope: today + tomorrow via `list_events`. Apr 23 13:00 WAT DD double-book (DD Production Issues Weekly Analysis + Weekly Check-ins DD); ATPP Daily Standup 14:00 WAT today CANCELED (conflict relief); Apr 24 HoE interview cluster 11:00-12:40 WAT + Deliberation + CI&P 13:00 + Lattice 15:00 + Tech Support 16:00. `last_processed` held at 2026-04-20T16:09:00Z pending briefing-2026-04-24 catch-up.

### Tick 2026-04-23 ~14:09 WAT — Full (weekday work-hours; NEW invite "TeamApt Org Changes")

Probe scope: `list_events` startTime=2026-04-23T14:00 WAT, endTime=2026-04-25T00:00 WAT, primary calendar — 12 events returned. **Calendar MCP operational.**

**NEW invite this window — "TeamApt Org Changes" (event id 5ia9mtsqmjbgt1gvp82b7m1lul):**
- **Start:** 2026-04-24T16:00:00+01:00 WAT, **End:** 2026-04-24T18:00:00+01:00 WAT (2-hour block, Friday Apr 24)
- **Organizer:** [[Pawel Swiatek]] (pawel.swiatek@moniepoint.com) — parent-co (Moniepoint) leadership
- **Attendees:** emeka.awagu@teamapt.com (needsAction), frank.atashili@teamapt.com (needsAction), tracy.ojaigho@teamapt.com (needsAction), dajalie@teamapt.com (optional, needsAction)
- **Created:** 2026-04-22T18:33:54Z; **Updated:** 2026-04-23T12:34:42Z (calendar write just before 13:34 WAT email invite fired)
- **Google Meet:** https://meet.google.com/khb-xywd-bey
- **Description:** EMPTY (agenda-less)
- **Email pairing:** Gmail thread 19dba55e567fab81 at 13:34 WAT delivered the invite (source-config-email captures side)

**Priority-signal matches (source-config-calendar directives):**
- #2 New invites for next-day meetings — YES (Apr 24)
- #4 Agenda-less invites for >30-min blocks — YES (2h, empty description)
- Subject "TeamApt Org Changes" is strategic/material; three TeamApt-side leaders (CTO Emeka + Frank Atashili + Tracy Ojaigho) summoned by Moniepoint leadership

**Apr 24 triple-overlap at 16:00 WAT:**
1. [[Lattice Downward Reviews — 8 pending]] 15:00-17:00 WAT (Emeka self-organized, accepted; Lattice deadline Apr 27)
2. [[Tech Support Meeting]] 16:00-17:00 WAT (Chidera Molokwu recurring; Emeka accepted)
3. **"TeamApt Org Changes" 16:00-18:00 WAT (Pawel Swiatek; Emeka needsAction) — NEW**

Resolution options for briefing-2026-04-24 Decision item: (a) accept Org Changes + defer Lattice Reviews + decline Tech Support recurring instance; (b) accept Org Changes + skip Tech Support + keep Lattice running in parallel (Lattice is async-capable); (c) decline Org Changes citing conflicts + request asynchronous readout.

**Today (Apr 23) remaining schedule:**
- 15:30-16:30 WAT (Lisbon TZ) — Interview for HoE (VP+) Kuldeep Singh (Chris Purkis; **needsAction**, 1h20m out at tick). Already surfaced in 09:11 tick sweep; no new delta but approaching. Factors: source=calendar, today_remaining, needsAction, 1h20m_out, hoe_cluster_alignment, awareness_tier.
- 18:00-19:00 WAT — [[Product - Engineering Sync]] (self-organizer recurring, accepted).

**Tomorrow (Apr 24) confirmed cluster (no changes this window beyond Org Changes):**
- 08:30 WAT — TeamApt All Hands (accepted, recurring)
- 11:00 WAT — Round 2 HoE Interview Venkatesh Purushothaman (needsAction)
- 11:00 WAT (LA TZ) — Blocker: HoE (VP+) Slots (Chris Purkis; needsAction)
- 12:00 WAT (Lisbon TZ) — Deliberation: HoE batch interviews (needsAction)
- 13:00 WAT — CI&P Team Structure (Tracy Ojaigho; needsAction)
- 15:00 WAT — Lattice Downward Reviews (self)
- 16:00 WAT — Tech Support Meeting (recurring needsAction)
- **16:00 WAT — TeamApt Org Changes (NEW needsAction)**
- 18:00 WAT — Product - Engineering Sync (self recurring)

**Apr 24 morning overlap cluster (11:00-12:40 WAT):** 3 concurrent HoE-related events (Round 2 interview + Blocker slot + Deliberation). Known cluster; no new delta.

**Backlog catch-up policy.** `last_processed` STILL deliberately NOT advanced — held at 2026-04-20T16:09:00Z. Full 64h+ diff sweep continues to be queued for briefing-2026-04-24 06:00 WAT. This tick's probe was scope-limited to today-remaining + tomorrow's new events.

**Dispatch decisions:**
- TeamApt Org Changes invite — queued as **Decision candidate for briefing-2026-04-24** (strategic topic + triple-overlap resolution).
- HoE Kuldeep Singh interview today 15:30 WAT — Awareness (already-known; needsAction RSVP but within-work-hours, not Immediate).
- No Immediate-tier dispatch (no same-hour new cancellations, no CTO-specific <1h deadline).

**`last_processed` unchanged at 2026-04-20T16:09:00Z** — see backlog catch-up policy above.
