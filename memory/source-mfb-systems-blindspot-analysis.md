---
title: source — MFB Systems Blindspot Analysis
type:
  - "source"
cssclasses:
  - "source"
source_path: MFB_Systems_Blindspot_Analysis.md
created: "2026-04-13T22:12:21Z"
updated: "2026-04-13T22:12:21Z"
summary: "Phoenix blindspot: Moniepoint MFB operates parallel card infrastructure (Postilion/PostCard, CMS Manager, Safe Token, Aptent) and reconciliation/transfer systems (Atlas ~500M txn/month, Iris 15-27B+ txn/month) not mapped in any Phoenix platform spec. No migration plan exists."
---

Phoenix Blindspot Analysis — Moniepoint MFB Systems & Teams. Prepared for [[Frank Atashili]] (CPO), March 2026. Confidential.

## The Blindspot
All Phoenix analysis to date maps only TeamApt systems into Phoenix platforms. Moniepoint MFB operates its own parallel infrastructure not documented in any Phoenix spec:

### Card Infrastructure (MFB)
- **Postilion/PostCard** — ACI/Interswitch vendor-managed CMS
- **CMS Manager** — MFB-built bridge (~12-person Cards Infrastructure team under [[Femi Davies]], TPMs [[Damilola Oyediran]] and [[Nadeem Abbas]], EA [[Nitish Chand]]). Full card lifecycle: production, activation, transaction processing, disputes, PIN, digital/NFC, multi-tenancy. Java 21/Spring Boot 3.5 modernization, Spanner migration Q3 2026.
- **Smart Card Process** — Interswitch EMV data enrichment
- **Safe Token** — Interswitch authentication/3DS
- **[[Aptent]]** — Originally TeamApt-built, now operated by MFB Payments Team. Authorization routing.

### Transfer & Reconciliation (MFB)
- **[[Atlas]]** — Multi-provider transfer orchestration, ~500M txn/month, 12+ downstream providers including NIBSS/NIP via Kuwego. Double-entry accounting via CBA. 5 upstream consumers. In [[Damilare Ogunnaike]]'s org.
- **[[Iris]]** — Integrated Reconciliation and Internal Settlement. 15-27B+ txn/month across all 3 group entities. ClickHouse analytics + Airflow pipelines. Also in Damilare's org.

### Critical Implications
- [[Monnify]] still uses Atlas and Iris (not TeamApt's Juliana/TACHA)
- TSP migration Phases 1-2 (account transfers) must account for Atlas, not just TeamApt legacy
- Phase 4 (card switching) requires full inventory of MFB card infrastructure + Interswitch vendor exit scoping
- Teams running these systems have not been told where they're going

## References
[[Project Phoenix]], [[Transaction Switching Platform]], [[source — TSP Executive Briefing Analysis]]