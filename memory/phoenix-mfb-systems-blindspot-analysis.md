---
title: Phoenix MFB Systems Blindspot Analysis
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Project Phoenix\MFB_Systems_Blindspot_Analysis.md
summary: "Critical gap analysis: MFB operates parallel card infrastructure (Postilion/PostCard, Smart Card Process, Safe Token, CMS Manager, Aptent) and settlement infrastructure (IRIS, Atlas) that Phoenix does NOT address. Two card infrastructure layers exist; migration plan must account for both."
---

## Summary

Critical gap analysis revealing Moniepoint MFB operates its own parallel card and settlement infrastructure that existing Phoenix platform specifications do not address. No migration plan exists for moving MFB onto Phoenix platforms.

## Key Points

- MFB card stack: Postilion/PostCard (vendor-managed by Interswitch), Smart Card Process, Safe Token, CMS Manager (12-person team), Aptent
- MFB settlement: IRIS (15-27B+ monthly txns), Atlas (500M txns/month, 12+ providers)
- Monnify relies on both IRIS and Atlas for production — they are live revenue drivers, not legacy
- Vendor exit complexity: Interswitch manages PostCard, requires contract exit, scheme re-certification
- The blindspot: all prior Phoenix analysis assumes TeamApt's systems are THE infrastructure layer; MFB has a parallel stack
- TSP Phase 4 (card switching) cannot proceed without resolving MFB Postilion migration

## Entities Mentioned

- [[Olufemi Davies]], [[Damilare Ogunnaike]]

## Concepts

- [[Card Issuance Platform]], [[Regulatory Compliance]]