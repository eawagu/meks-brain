---
title: Iris
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T17:03:04Z"
updated: "2026-04-19T17:03:04Z"
summary: "Moniepoint MFB reconciliation/transfer platform processing 15-27B+ transactions/month — a Phoenix blindspot: not mapped in any platform spec despite scale."
---

## Overview

Iris is one of Moniepoint MFB's core platform systems, handling reconciliation and/or transfer operations at very high volume. Identified in the [[source — MFB Systems Blindspot Analysis]] as operating at **15-27B+ transactions/month** scale.

## Phoenix Blindspot

Iris is one of the MFB systems flagged as a **Project Phoenix blindspot** — all Phoenix platform analysis to date maps only TeamApt systems into the new platform clusters. MFB parallel infrastructure (including Iris, [[Atlas]], Postilion/PostCard, CMS Manager, Safe Token, Aptent) is not documented in any Phoenix platform spec. No migration plan exists for these systems.

This matters because:
- The raw transaction volume through MFB systems dwarfs the TeamApt switching volume
- Phoenix timelines assume platform consolidation but have not scoped the MFB system migration
- A successful Phoenix delivery on the TeamApt side does not address the MFB consolidation problem

## Related

- [[Atlas]] — peer MFB platform system, ~500M txn/month
- [[Moniepoint MFB]]
- [[Project Phoenix]]
- [[source — MFB Systems Blindspot Analysis]]
- [[Project Phoenix Initiative Overview]]