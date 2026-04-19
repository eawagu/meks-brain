---
title: Strangler Fig Pattern
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T17:03:05Z"
updated: "2026-04-19T17:03:05Z"
summary: "Incremental migration pattern where a new system is built alongside a legacy system and gradually takes over functionality — core migration strategy for Project Phoenix's One Platform consolidation."
---

## Overview

The Strangler Fig Pattern is a software migration strategy named after a plant that grows around an existing tree, gradually replacing it from the outside in. Applied to software, a new system is built alongside a legacy system; functionality is migrated incrementally — service by service, capability by capability — until the legacy system is fully replaced and can be decommissioned.

**Origin:** Martin Fowler's writing on legacy system migration.

## Application at Moniepoint

Strangler Fig is the core migration strategy for [[Project Phoenix]]'s **One Platform** consolidation of Nigeria, UK, and Kenya onto a unified architecture.

Key features of the Phoenix implementation:
- **Dual-running:** Legacy and new systems operate in parallel during migration
- **Feature-flagged routing:** Traffic shifted from legacy to new system via configuration
- **Staged delivery:** 3 stages over 6 months (Stage 1: 2mo core, Stage 2: 3mo alpha, Stage 3: 1mo beta)
- **Change freeze:** ~4-month change freeze on Nigerian product roadmap during Stages 2–3 to avoid target-drift
- **Go/No-Go gates** between stages

## Risks in the Phoenix Application

Per [[source — One Platform Migration Plan Analysis]]:
- Timeline ambition (6 months is compressed for this scope)
- Large TSP scope within Stage 2
- ~4-month change freeze impact on Nigerian revenue-driver roadmap
- Kenya underspecified at plan ratification
- Leadership transition mid-stage
- No rollback plan defined in the original plan

## Related

- [[Project Phoenix]]
- [[Phoenix Stage 1 Consolidated Project Plan]]
- [[source — One Platform Migration Plan Analysis]]
- [[Ravi Jakhodia]] — plan owner