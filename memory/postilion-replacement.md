---
title: Postilion replacement
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:07:40Z"
updated: "2026-04-25T12:07:40Z"
summary: Strategic objective of the new Phoenix CMS — eliminate dependency on Postillion (the ACI/Interswitch switch). Visa project is the launch validation workload. Faster rollouts and uptime achieved by reducing Interswitch dependency.
---

## Definition

**Postilion replacement** (canonical: [[Postillion Elimination]]) is the strategic objective of the new Phoenix [[Card Management System]] — eliminate dependency on [[Postillion]] (the ACI/Interswitch switch) and the operational limitations that come with it (dummy account numbers blocking direct refunds, tight coupling to a vendor-managed switch).

## Apr 21 KT context

At the Cards Team Str/Sys/Roadmap meeting, this was named (in aligned-decision form) as the primary strategic focus of the platform rollout: "migrate services to eliminate dependency on Postilion."

The **strategy for the new CMS is to reduce Interswitch dependency**, which has helped the team achieve faster rollouts and uptime.

## Migration approach

- [[Visa project]] serves as the launch validation workload on the new CMS.
- Core functions (card blocking, account-to-card linking, etc.) migrated progressively from the legacy [[Card Manager Service]].
- Phased cut-over planned later in 2026 once stability confirmed.

## Related

- [[Postillion]]
- [[Card Management System]]
- [[Card Manager Service]]
- [[Cards Team Structure Systems Roadmap - 2026-04-21 13:00 WAT]]
