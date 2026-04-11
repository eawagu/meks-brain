---
title: TACHA System Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\TeamApt\Systems\TACHA\TACHA_System_Specification.md
summary: "TACHA is TeamApt's centralized clearing, settlement, and reporting backoffice platform serving all transaction systems. Six core services: Control Plane, Fee Service, Clearing, Settlement Workflow, Backoffice, Liquidity Manager. Four daily settlement windows. v2.0.0 deployed February 2026."
---

## Summary

TACHA is TeamApt's centralized clearing, settlement, and reporting backoffice platform serving all transaction systems (Juliana Card/Account Switch, Monnify, Direct Debit, ATS, PTSP, TPP). Released beta 2025, v2.0.0 February 2026.

## Key Points

- Post-authorization layer processing transaction data from upstream platforms
- Six core services: Control Plane, Fee Service, Clearing, Settlement Workflow, Backoffice, Liquidity Manager
- Four daily settlement windows: 5:00 AM, 9:00 AM, 12:00 PM, 3:00 PM WAT
- Three settlement modes: Primary (NSS interbank), Secondary (API-based), Merchant (instant/T+1)
- Dual-approval (Maker-Checker) workflows; Kafka-based event pipeline with topic-level ACLs

## Concepts

- [[Regulatory Compliance]]