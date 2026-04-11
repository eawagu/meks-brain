---
title: Direct Debit Operations Readiness Doctrine
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: direct-debit-operations-readiness-doctrine.md
summary: Comprehensive operations doctrine for Direct Debit reconciliation covering Fidelity, Access, and Polaris Bank settlement flows, account structures, TACHA platform, T+1 settlement, and exception handling procedures, authored by Tolulope Obianwu.
---

## Summary

A comprehensive internal operations doctrine for Direct Debit (DD) reconciliation authored by Tolulope Obianwu (created 2026-03-23, last modified 2026-04-09). Covers three bank integrations — [[Fidelity Bank]], [[Access Bank]], and [[Polaris Bank]] — with detailed settlement flows, transit account structures, TACHA platform behavior, T+1 settlement logic, reconciliation procedures, and exception handling workflows.

## Key Points

- **TACHA platform** (The Automated Clearing House of Africa) is the clearing infrastructure used for all Direct Debit mandates and settlements.
- **T+1 settlement**: transactions initiated on Day T settle on Day T+1 via TACHA.
- **Transit accounts** buffer funds between mandate execution and final posting to merchant accounts:
  - Fidelity Transit: 9020033048
  - Access Transit: 1942066093
  - Polaris Transit: 1790324517
- **Reconciliation cycle**: daily reconciliation against TACHA settlement reports, with mismatches escalated within 24 hours.
- **Exception handling**: failed mandates are categorized (insufficient funds, account closed, mandate revoked) and routed to appropriate retry or write-off queues.
- **Settlement flows** are bank-specific: each bank has its own TACHA participant configuration, file format, and response code mapping.
- **Account structures**: each bank integration maintains a dedicated transit account through which funds are staged before final settlement.
- Doctrine establishes ownership: [[Tolulope Obianwu]] is the author and primary custodian.

## Entities Mentioned

- [[Tolulope Obianwu]] — author and custodian
- [[Fidelity Bank]] — DD integration partner
- [[Access Bank]] — DD integration partner
- [[Polaris Bank]] — DD integration partner
- [[TeamApt Limited]] — operator of the DD platform
- [[TACHA]] — clearing infrastructure (The Automated Clearing House of Africa)

## Concepts

- [[Direct Debit]] — the mandate-based payment collection mechanism this doctrine governs
- [[Reconciliation]] — daily cycle against TACHA settlement reports
- [[T+1 Settlement]] — clearing timing model used across all three bank integrations
- [[Transit Account]] — staging account structure between mandate execution and final settlement
- [[TACHA]] — clearing platform
- [[Exception Handling]] — categorization and routing of failed mandates