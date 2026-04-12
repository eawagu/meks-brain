---
type:
  - "entity"
title: Stanbic Bank
created: 2026-04-11
summary: "Bank on Moniepoint's RC91 routing — 18+ P1 cycles in 11 days (Apr 3–12). Both SLAs breached. ATS JAR deployment pending Stanbic action."
updated: "2026-04-12T01:11:51Z"
cssclasses:
  - "entity"
---

## Overview

Stanbic Bank (Stanbic IBTC) is one of the banks on Moniepoint's direct debit and RC91 routing infrastructure. It has been the most persistently failing bank in the RC91 multi-bank failure pattern.

## Failure Timeline

| Date | Event |
|---|---|
| Apr 3, 2026 | First RC91 cycle in current pattern |
| Apr 5, 2026 | 4 cycles in 24h (Easter Saturday P1) |
| Apr 6, 2026 | Cycle 7 reached |
| Apr 7, 2026 | Continued failure |
| Apr 8, 2026 | SLA breached; Cycle escalating |
| Apr 9, 2026 | Both SLAs breached; Cycle 15 (7 days continuous) |
| Apr 10, 2026 | Cycle 16; TDSD-6425 administratively closed |
| Apr 11, 2026 | Cycle 17; ATS JAR deployment sent to Stanbic; Settlement validation thread with CBN pressure |
| Apr 12, 2026 | Cycle 18 filed at 01:39 WAT by [[Olamide Ajibulu]]; [[Peace Ikhuenbor]] acknowledged at 01:47 WAT |

## SLA Status

- **Both SLAs breached** as of Apr 9, 2026
- 18+ cycles in 11 days — all bank-resolved, same root cause unfixed
- Escalation posture decision 6+ days overdue (due Apr 6)

## Active Tracks

- **ATS JAR deployment:** [[Babajide Ojoboorun]] sent jars to Stanbic (Oluwatobi Meshioye) at 20:11 WAT Apr 11. Pending Stanbic action — if not deployed, explains continued failures.
- **Settlement validation:** [[Emeka Joseph]] confirmed DCIR migration. Stanbic (Lucky Ohiorenuan) requesting failed transaction list citing CBN timeline pressure.
- **TDSD-6425:** Administratively closed Apr 10. No RCA posted. Does not resolve the strategic escalation posture decision.

## Context

- Part of the [[RC91 Multi-Bank Failure Pattern]] — 13+ banks affected
- Stanbic is the bank with the longest unresolved failure run in the cohort
- See [[Stanbic Bank ATS — Persistent RC91 Pattern]] for full situation tracking

## Relationships

- [[RC91 Multi-Bank Failure Pattern]] — root pattern
- [[Direct Debit Program]] — affected product
- [[TeamApt / Moniepoint]] — counterparty
- [[NIBSS]] — rails provider