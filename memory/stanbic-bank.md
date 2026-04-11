---
title: Stanbic Bank
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: "Bank on Moniepoint's RC91 routing — persistent SLA failure across 15+ direct debit cycles; both SLAs formally breached as of Apr 9, 2026."
---

## Overview

Stanbic Bank (Stanbic IBTC) is one of the banks on Moniepoint's direct debit and RC91 routing infrastructure. It has been the most persistently failing bank in the RC91 multi-bank failure pattern.

## Failure Timeline

| Date | Event |
|---|---|
| Apr 5, 2026 | 4 cycles in 24h (Easter Saturday P1) |
| Apr 6, 2026 | Cycle 7 reached |
| Apr 7, 2026 | Continued failure |
| Apr 8, 2026 | SLA breached; Cycle escalating |
| Apr 9, 2026 | Both SLAs breached; Cycle 15 (7 days continuous) |

## SLA Status

- **Both SLAs breached** as of Apr 9, 2026
- Stanbic Cycle 15 represents 7 continuous days of failure
- No resolution confirmed in available notes

## Context

- Part of the [[RC91 Multi-Bank Failure Pattern]] — 13+ banks affected
- Stanbic is the bank with the longest unresolved failure run in the cohort
- TDSD-6276 relates to Union Bank settlement (separate issue but same settlement integrity cluster)

## Relationships

- [[RC91 Multi-Bank Failure Pattern]] — root pattern
- [[Direct Debit Program]] — affected product
- [[TeamApt / Moniepoint]] — counterparty
- [[NIBSS]] — rails provider