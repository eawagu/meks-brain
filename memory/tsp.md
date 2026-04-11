---
title: TSP
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: "TSP (Transaction Switching & Processing) is the Layer 1 foundational payment processing kernel in Moniepoint's platform — the single conduit for all fund movement — with tight coupling to the Authorization Engine requiring sub-500ms response times."
---

## Overview

TSP (Transaction Switching & Processing) is the foundational Layer 1 payment processing kernel in [[Moniepoint]]'s platform. All fund movement — holds, reversals, clearing — flows through TSP. It is a shared dependency consumed by the [[Card Issuance & Processing Platform]] and other platform components.

## Role in Card Authorization

The [[Authorization Engine]] calls TSP to place a lien (hold) on the account balance when a transaction is approved:
- **APPROVE** → Auth Engine calls TSP POST /v1/transactions → TSP places lien → approval returned to card scheme
- **DECLINE** → no TSP call; decline reason returned

Coupling classification: **tight** — authorization is synchronous and cannot complete without TSP responding within the 500ms SLA window.

## Fund Movement Delegation Principle

The [[Card Issuance & Processing Platform]] never posts directly to [[CBA]]. All fund operations (liens, reversals, clearing, dispute provisional credits) are constructed and executed by TSP, which builds the appropriate CBA journal entries. This is a hard architectural boundary, not a guideline.

## Key Operations

- `CARD_AUTHORIZATION` — place lien; must complete <500ms
- `AUTH_REVERSAL` — release lien; must complete <500ms
- Clearing — async (event-driven via [[Kafka]])
- Dispute provisional credit — via TSP during investigation

## Relationship to Loom

[[Loom]] (AML/compliance) is accessed via TSP — medium coupling through TSP, not direct from Card Issuance.

## Sources

- [[001-CI_P-exec-overview_v1.1]] — executive overview; Fund Movement Delegation Principle
