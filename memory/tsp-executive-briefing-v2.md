---
title: TSP Executive Briefing v2
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Transaction Switching Platform\TSP_Executive_Briefing.md
summary: March 2026 comprehensive TSP briefing describing foundational payment kernel processing 19 transaction types, 14-module Maven monorepo, dual-country adapters, and strangler fig migration strategy.
---

## Summary

Comprehensive March 2026 briefing: [[Transaction Switching Platform]] as foundational payment kernel processing all fund movement (19 transaction types). Architecture: 14-module Maven monorepo, Nigeria adapter (9 integrations), UK adapter (6 integrations), direct scheme connections (Visa/Mastercard).

## Key Points

- 19 transaction types (expanded from 16 in v1)
- 14-module Maven monorepo architecture
- Nigeria adapter: 9 integrations; UK adapter: 6 integrations
- Direct Visa/Mastercard scheme adapters (new in v2)
- Card switching ownership made explicit (PTSA, FEP, 3DS)
- 5-team structure proposed
- Strangler fig migration with feature flags
- Tech stack: Java 25, Spring Boot 4.0, Spanner, Kafka, jPOS 3.0
- Regional PII vaults
- 99.99% uptime SLO

## Entities Mentioned

[[Alex Adeyemo]], [[Frank Atashili]], [[Ravi Kiran Veluguleti]], [[Emeka Awagu]], [[Tracy Ojaigho]], [[Ketan Dhamasana]]

## Concepts

[[Transaction Switching Platform]], [[Platform Architecture]], [[Strangler Fig Migration]]