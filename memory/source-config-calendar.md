---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed remains 2026-04-20T16:09:00Z (full sweep deferred to next briefing tick). 2026-04-23 09:11 WAT tick: Calendar MCP RECOVERED after ~64h dark. Apr 23 today + Apr 24 tomorrow probe shows 13:00 WAT WAT today double-book (DD Production Issues vs DD Weekly Check-ins), ATPP Standup canceled (calendar-conflict relief). Apr 24 carries 4 overlapping events at 11:00-12:00 WAT (HoE Round 2 + HoE Blocker + Lattice Reviews 15:00 + Tech Support 16:00 + CI&P 13:00)."
updated: "2026-04-23T08:20:42Z"
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

### Tick 2026-04-23 ~09:11 WAT — RECOVERY (Full-level promotion on state change)

Probe scope: `list_events` startTime=2026-04-23T08:00 WAT, endTime=2026-04-24T18:00 WAT, primary calendar — returned 17 events spanning today + tomorrow. Calendar MCP fully recovered.

**Today (Apr 23) — relevant signals:**
- 08:30-09:30 WAT — Direct to Bank Daily standup (Khadijat Musa organizer; needsAction).
- 10:00-10:30 WAT — Ravi / Emeka 1:1 (accepted, organizer self).
- 11:30-12:10 WAT — Juliana Switch Daily Catchup (June Johnson; needsAction).
- **13:00-14:00 WAT — DOUBLE-BOOK:** Direct Debit Production Issues Weekly Analysis (Yasir Ali organizer; needsAction) + Weekly Check-ins Direct Debit (Dojinaka organizer; optional/needsAction). Both DD-themed; possible merge candidate or one-to-decline.
- 15:30-16:30 WAT (Lisbon TZ) — Interview for Head of Engineering (VP+ level) Kuldeep Singh (Chris Purkis; needsAction).
- 18:00-19:00 WAT — Product - Engineering Sync (recurring, accepted, organizer self).

**Today canceled:**
- ATPP Daily Standup 14:00 WAT — Ruth Adetunji canceled ("because of Dispute Management Sprint Planning") at 08:56 WAT today via email. **Calendar-overlap relief**: removes one of the prior 14:00 WAT conflict items.

**Tomorrow (Apr 24) — relevant signals:**
- 08:30 WAT — TeamApt All Hands (accepted, recurring).
- 11:00-12:00 WAT — Round 2: Interview for HoE Position Venkatesh Purushothaman (Tobilola Fasanya; needsAction).
- 11:00-12:00 WAT (LA TZ) / overlaps WAT later — Blocker: Head of Engineering (VP+) Slots (Chris Purkis; needsAction).
- 12:00-12:40 WAT (Lisbon TZ) — Deliberation: HoE batch interviews (Chris Purkis; needsAction).
- 13:00-14:00 WAT — CI&P Team Structure (Tracy Ojaigho; needsAction) — NEW invite created Apr 22 16:07 WAT, modified Apr 23 05:46 WAT (after Tracy added).
- 15:00-17:00 WAT — Lattice Downward Reviews — 8 pending (self-organized batch, accepted, scheduled per briefing-2026-04-16 B5 triage). Lattice deadline Apr 27.
- 16:00-17:00 WAT — Tech Support Meeting (recurring, organizer Chidera Molokwu; needsAction).

**Apr 24 conflict observation.** 11:00-12:00 WAT Apr 24 carries Round 2 HoE (Venkatesh) + Blocker HoE Slots (LA-TZ overlap). Triple-overlap is plausible if both fire concurrently. Plus Deliberation 12:00-12:40 (Lisbon TZ ~ 12:00-12:40 WAT). Calendar-overlap concern on Apr 24 morning HoE block — likely intentional given the HoE backlog framing in briefing-2026-04-22 / Lattice context.

**Backlog catch-up policy.** `last_processed` deliberately NOT advanced — left at 2026-04-20T16:09:00Z. Next briefing tick will run full Layer 1 calendar diff sweep across the 64h gap to catch any cancellations / new invites / RSVP changes that occurred during the dark window. This tick's probe was scope-limited (today + tomorrow only).

**Dispatch decisions:**
- ATPP standup cancellation surfaced as awareness — no further action (resolves prior 14:00 WAT conflict line item).
- 13:00 WAT Apr 23 DD double-book noted for accumulation into next briefing tick.
- Apr 24 HoE batch holds calendar attention; Lattice Reviews 15:00 WAT batch is on-schedule.
- No new invites in the immediate-attention window required Immediate-tier dispatch.

**`last_processed` unchanged at 2026-04-20T16:09:00Z** — see backlog catch-up policy above.
