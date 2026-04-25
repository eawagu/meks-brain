---
title: Disbursement service
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-25T12:20:42Z"
updated: "2026-04-25T12:20:42Z"
summary: "TeamApt service that initiates disbursement transactions; calls Modify Atlas Integration Service (MIS) for orchestration. Apr 22: undergoing architectural simplification (requery API elimination, outbox pattern adoption, configurable response codes)."
---

## Definition

The **Disbursement service** is the TeamApt service that initiates disbursement transactions and calls the [[Modify Atlas Integration Service]] (MIS) for transaction orchestration to the [[CBA]].

## Apr 22 architectural simplification

Following the 2026-04-22 architecture review, the integration is undergoing five aligned changes:

1. **Requery API removed** (replaced by direct retry via [[Outbox pattern]] leveraging CBA [[Idempotency]]).
2. **Rate Finance** adopted over 'Week' for the curve implementation.
3. **Existing references reused** for retries (no regeneration).
4. **Configurable response-code framework** (no hardcoded codes).
5. **Deferred deployment timeline** for engineering brainstorm.

Open items: error-code business sign-off; Kafka partitioning data collection.

## Sources

- [[Disbursement-CBA Integration Architecture Review - 2026-04-22 19:30 IST]]
