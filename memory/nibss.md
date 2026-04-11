---
title: NIBSS
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: "Nigeria Inter-Bank Settlement System — national payment infrastructure provider for Moniepoint's Direct Debit rails; VPN dependency was root cause of Apr 2026 outages; RC96 P1 caused 64%+ failure rate."
---

## Overview

Nigeria Inter-Bank Settlement System (NIBSS) is the national payment infrastructure provider. Moniepoint's Direct Debit program runs on NIBSS rails. NIBSS also underpins RC91/RC96 routing.

## Integration with Moniepoint

- **Direct Debit rails** — mandate creation, debit execution, settlement
- **RC91 routing** — NIBSS-mediated bank routing; 13+ banks affected in Apr 2026
- **RC96** — routing code; P1 failure Apr 9 with 64%+ failure rate
- **VPN dependency** — NIBSS connectivity requires VPN; VPN root cause identified for Apr 2026 outage (TDSD referenced in notes); ACS connector replaced with VPN fix Apr 10

## Incident History (Apr 2026)

| Date | Event |
|---|---|
| Mar 30, 2026 | VPN root cause identified (RC91 FCMB 5th bank) |
| Apr 5, 2026 | NIBSS activation resolved after 21h (Easter P1) |
| Apr 6, 2026 | NIBSS DD TDSD-6437 formalised |
| Apr 9, 2026 | RC96 P1 — 64%+ failure rate |
| Apr 10, 2026 | ACS connector replaced (VPN fix) |

## Active Issues

- **TDSD-6437** — DD NIBSS compound failures; formally tracked
- **RC96 P1** — 64%+ failure; status as of Apr 9 unresolved in notes
- Stanbic Cycle 15 — 7 days; NIBSS rails implicated

## Relationships

- [[TeamApt / Moniepoint]] — primary integration counterparty
- [[Direct Debit Program]] — rails consumer
- [[RC91 Multi-Bank Failure Pattern]] — routing failure context
- [[Stanbic Bank]] — highest-failure bank on NIBSS DD rails