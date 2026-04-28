---
title: Strangler Pattern
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-28T16:43:51Z"
updated: "2026-04-28T16:43:51Z"
summary: Migration approach in which new platform capabilities are built in parallel to legacy systems, with traffic gradually rerouted to the new platform until the legacy system is decommissioned. The primary migration strategy across all Project Phoenix platforms (TSP, CI&P, Payment Gateway).
---

## Definition

The **Strangler Pattern** (also called **Strangler Fig**) is a software migration approach attributed to Martin Fowler, where a new system is built around a legacy system, gradually intercepting and replacing functionality piece by piece. Eventually the legacy system has nothing left to do and is decommissioned.

The metaphor is the strangler fig tree, which germinates in the canopy of a host tree and grows downward, eventually fully enveloping the host.

## Why this pattern

- **Risk reduction** — no big-bang cutover; problems surface incrementally.
- **Parallel run** — new and legacy operate simultaneously, allowing comparison and verification.
- **Rollback** — feature-flagged cutover means traffic can be returned to legacy if issues emerge.
- **Continuity** — business operations continue uninterrupted; existing teams maintain the legacy system on continuity basis while a [[Strike Team]] builds the new.

## Application across Project Phoenix

Strangler Pattern is the **default migration strategy** across all [[Project Phoenix]] platforms.

- **TSP** — Strangler Fig cutover, not big-bang; legacy Juliana / ATS / App Centre stay up while new TSP routes are progressively cut over.
- **CI&P** — parallel build of new Card Management System, Authorization Engine, etc. while [[Postillion]] remains in production. External traffic gradually routes to the new platform; Phase One target = 10% of production volume.
- **Payment Gateway Platform** — Monnify codebase becomes PG Platform v0; phased hand-off as platform matures.
- **App / Backend** (per Tosin Apr 14 retreat): Phase 3 introduces beta new app + parallel backend to "strangle" legacy with progressive traffic cutover.

## 2026-04-27 — CI&P Kick Off reaffirmation

The CI&P kick-off meeting on 2026-04-27 explicitly named the strangler pattern as the migration strategy: build parallel capabilities in the new platform while maintaining the existing Postillion system in production; external traffic gradually routes to the new platform; legacy decommissioned at the end. Quarterly milestones: Phase One completion (Q2), Phase Two expansion (Q3), production cutover at Q3 end.

Source: [[Project Phoenix - CI&P kick off meeting - 2026-04-27]].

## Success criteria pattern

- Phase One success usually defined as a percentage of production volume cut over with zero tolerance for data loss or transaction discrepancy.
- Cutover completion is the trigger for legacy decommissioning, not the build itself.

## Related

- [[Project Phoenix]]
- [[Strike Team]]
- [[Strike Team + Continuity Operating Model]]
- [[Card Issuance & Processing Platform]]
- [[Postillion]]
- [[TSP]]
- [[Project Phoenix - CI&P kick off meeting - 2026-04-27]]
