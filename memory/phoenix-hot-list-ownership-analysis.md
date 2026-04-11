---
title: Phoenix Hot List Ownership Analysis
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Project Phoenix\Hot_List_Ownership_Analysis.md
summary: "Analysis correcting misattribution of hot lists to TSP: per PCI DSS/ISO 8583/EMV specs, ownership belongs with card issuers (HOT_CARD), acquirers (HOT_MERCHANT, HOT_TERMINAL), and fraud prevention (HOT_BIN, HOT_COUNTRY). TSP's role is calling these services during orchestration."
---

## Summary

Analysis correcting a gap where hot lists (lost/stolen cards, risky merchants/terminals) were incorrectly attributed to TSP. Industry research confirms ownership belongs with card issuers, acquirers, schemes, and fraud prevention — not the switch.

## Key Points

- Hot lists not a switch responsibility per PCI DSS, ISO 8583, EMV specs
- Proper owners: Issuers (HOT_CARD), Acquirers (HOT_MERCHANT, HOT_TERMINAL), Fraud Prevention (HOT_BIN, HOT_COUNTRY)
- TSP's role is calling these services during transaction orchestration
- Maps cleanly to Phoenix architecture

## Concepts

- [[Card Issuance Platform]], [[Regulatory Compliance]]