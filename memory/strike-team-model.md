---
title: Strike Team Model
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-23T05:30:09Z"
updated: "2026-04-23T05:30:09Z"
summary: "Moniepoint's pattern for driving major platform transitions — a small dedicated team drawn from the teams that will eventually join builds the new platform in parallel with the legacy transition; seen in TSP delivery and now the Cards Management System build."
---

## Definition

The Strike Team Model is [[Moniepoint]]'s pattern for driving major platform transitions: before a full team is migrated into a new structure, a **small dedicated team is assembled from representatives of the teams that will eventually join** — so construction of the new platform begins in parallel with, not after, the transition.

The pattern appears in at least two places in the brain:
- [[TSP]] delivery — [[Strike Team]] (Abeeb Ahmad, Christopher Ogbosuka et al. under [[Bunmi Oyefisayo]])
- [[Card Management System]] build — strike team being formed under [[Tracy Ojaigho]] (per 2026-04-21 KT)

## Composition

Per the 2026-04-21 KT, the Cards strike team will include at minimum:
- One maker (senior engineer)
- One EM
- At least one other member

Drawn from the teams that will eventually join the Cards platform.

## Mandates (Cards Strike Team)

1. **Build the new [[Card Management System]]** — proprietary, configurable platform to replace the dependency on [[Postillion]] and the legacy [[Card Manager Service]]. Launch workload: [[Visa]].
2. **Drive AI automation** within card operations:
   - Chargeback & Issue Resolution automation (highest priority)
   - Logistics & Production automation
   - Workflow automation (Jira replacement, tool evaluated with [[Rumulo]])

## Change Management

A deliberate reassurance pass is planned: the incoming strike team does not immediately disrupt current operations. Existing team is notified in advance ([[Olufemi Davies]]'s action). The frame is continuity-first.

## Why It Works

- Decouples platform construction timing from full organisational transition
- Preserves operational continuity on the legacy stack during the build
- Creates a concrete vehicle for AI automation priorities (otherwise diffuse across teams)
- Validates the new platform with a focused launch workload ([[Visa]] for CMS, first live transaction for TSP)

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Strike Team]]
- [[Project Phoenix]]