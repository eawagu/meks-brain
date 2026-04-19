---
type:
  - "concept"
title: Clearing and Settlement
created: "2026-04-13T23:25:21Z"
summary: Industry-standard end-to-end process of validating, netting, and settling payment transactions between counterparties — authorization, clearing, settlement, reconciliation, adjustments.
updated: "2026-04-19T15:52:38Z"
cssclasses:
  - "concept"
---

## Definition

Clearing and Settlement is the end-to-end process by which payment transactions are validated, fees computed, net positions calculated, and funds disbursed between counterparties. An industry-standard concept in card scheme, bank, and payment processor operations.

## Core Components (Generic)

- **Authorization** — real-time approve/decline decision
- **Clearing** — batch-level validation, fee computation, net position calculation
- **Settlement** — actual fund movement between counterparties
- **Reconciliation** — matching clearing records with settlement outcomes
- **Adjustments** — reversals, refunds, disputes flowing back through clearing

## Settlement Types

Industry-standard categorization:
- **Primary settlement** — via central infrastructure (NIBSS in Nigeria, Fedwire in US, CHAPS in UK, etc.)
- **Secondary settlement** — via bilateral APIs or alternate rails when primary is unavailable

## Known Entity Adoptions

- [[TeamApt Clearing and Settlement]] — TeamApt Limited's implementation via [[TACHA]] as the clearing and settlement backbone for all domestic switching platforms.

## Related

- [[T+1 Settlement]]
- [[Settlement Integrity]]

## Notes

- 2026-04-19: Entity-scoped TeamApt/TACHA content moved to [[TeamApt Clearing and Settlement]] per Rule 12. This page retained as the generic banking/payments concept.