---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: "Calendar signal-source configuration: priority signals on declined RSVPs, cancellations, agenda-less invites, overload. last_processed 2026-04-24T06:10:00Z (07:10 WAT). 07:10 WAT Apr 24 zero-delta tick: Apr 24 event set unchanged from briefing-tick enumeration — no new invites, no cancellations, no RSVP deltas."
updated: "2026-04-24T06:18:28Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-24T06:10:00Z"
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

### last_processed 2026-04-24T06:10:00Z (07:10 WAT) — zero-delta tick

07:10 WAT Apr 24 tick: `list_events` for Apr 24 (07:10 WAT → Apr 25 00:00 WAT) returned 9 events ordered by lastModified — all timestamps pre-dating 06:09 WAT briefing tick (most recent `updated` is Org Changes at 14:38 WAT Apr 23). No new invites, no cancellations, no RSVP status deltas since briefing compose. All 9 events match briefing-2026-04-24 A6 enumeration. First meeting of the day is TeamApt All Hands at 08:30 WAT (80min away).

### last_processed 2026-04-24T05:09:00Z (06:09 WAT) — briefing-tick sweep

06:09 WAT Apr 24 briefing tick: `list_events` for Apr 24 (06:00 WAT → Apr 25 00:00 WAT) returned 11 events. Today's cluster:

- 08:30 WAT — TeamApt All Hands (accepted, recurring)
- **11:00 WAT — Round 2 HoE Interview Venkatesh Purushothaman (needsAction) — 1h**
- 11:00 WAT (LA TZ, resolves to 11:00 WAT local) — Blocker: HoE (VP+) Slots (Chris Purkis; needsAction, optional) — 1h
- **12:00 WAT (Lisbon TZ, resolves to 12:00 WAT local) — Deliberation: HoE batch interviews (needsAction) — 40min**
- 13:00 WAT — CI&P Team Structure (Tracy Ojaigho; needsAction) — 1h
- 15:00–17:00 WAT — [[Lattice Downward Reviews — 8 pending]] (self, accepted)
- 16:00 WAT — Tech Support Meeting (recurring, accepted per list_events)
- **16:00 WAT — TeamApt Org Changes (Pawel Swiatek; needsAction) — 2h block, agenda-less — NEW since Apr 23 tick**
- 18:00 WAT — Product-Engineering Sync (self recurring, accepted)

**Priority-signal matches fired for Org Changes:**
- #2 New invites for next-day meetings — YES (was next-day at Apr 22 22:33 WAT creation, now same-day at briefing tick)
- #4 Agenda-less invites for >30-min blocks — YES (2h, empty description)
- "Org Changes" subject strategic/material; Moniepoint leadership summons three TeamApt-side leaders (CTO Emeka + Frank Atashili + Tracy Ojaigho)

**Triple-overlap at 16:00 WAT:** Lattice 15-17 + Tech Support 16-17 + Org Changes 16-18. Resolved in briefing-2026-04-24 D2 option 1 (accept Org Changes + decline Tech Support instance + keep Lattice running in parallel).

**HoE cluster 11:00-12:40 WAT** — 3 overlapping HoE-related events (Round 2 interview + Blocker slot + Deliberation). Already-known cluster; no new delta this tick.

**No cancellations, no declined-RSVP deltas, no back-to-back overload beyond already-surfaced structure.** Backlog catch-up complete for Apr 20-23 via briefing-2026-04-23 + prior-tick notes.

### Dark window 2026-04-20 17:09 WAT → 2026-04-23 ~09:00 WAT (~64h auth-failure) — preserved

Calendar MCP returned auth-failure across all heartbeat ticks Apr 21 / Apr 22 / Apr 23 pre-recovery. Surfaced as briefing-2026-04-22 B2 + briefing-2026-04-23 D4. Recovery confirmed 09:11 WAT Apr 23.

### Tick 2026-04-23 ~14:09 WAT — Full (preserved context)

TeamApt Org Changes invite detected + triple-overlap identified; held as Decision candidate for briefing-2026-04-24 → now surfaced as D2.
