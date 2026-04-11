---
title: Card Issuance Platform Executive Overview
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Card Issuance Platform\001-CI_P-exec-overview_v1.1.docx.md
summary: Executive overview of the Card Issuance & Processing Platform (Project Phoenix Layer 2) — Spine-and-Module architecture owning complete card lifecycle, authorization engine, 3DS/SCA, dispute management, and EMV data preparation.
---

## Summary

Comprehensive executive overview of the Card Issuance & Processing Platform, a Layer 2 shared business capability within Project Phoenix. Follows a Spine-and-Module architecture: market-agnostic Spine holds five core services (Authorization Engine, Card Management System, 3DS/SCA Service, Card Dispute Service, EMV Data Preparation Platform); market-specific modules provide regional adapters for card schemes, compliance, and personalisation vendors.

## Key Points

- Full card lifecycle: issuance, activation, PIN management, blocking, replacement, deactivation
- Five core Spine services: Authorization Engine, CMS, 3DS/SCA, Card Dispute, EMV Data Prep
- Authorization Engine: <500ms SLA to card schemes; evaluates card status, balance, controls
- Card controls: spending limits (per-transaction/daily/weekly), MCC restrictions, geographic restrictions, channel restrictions
- Tight TSP coupling: all fund movements (liens, clearing, reversals) routed through TSP, not CBA directly
- Modular expansion: new market requires only a new Module; Spine unchanged
- Four primary flows: POS auth (sync), auth reversal (sync), card clearing (async), CNP with 3DS (sync)
- Serves Nigeria, UK, Kenya markets

## Concepts

- [[Card Issuance Platform]]
- [[Project Phoenix]]
- [[Transaction Switching Platform]]