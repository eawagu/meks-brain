---
title: TACHA_Reversal_Refund_Dispute_Management
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt\Systems\TACHA\TACHA_Reversal_Refund_Dispute_Management.md
created: "2026-04-13T23:16:05Z"
updated: "2026-04-13T23:16:05Z"
summary: TACHA specification for reversals, refunds, and disputes — immutable adjustments, Kafka-driven clearing pipeline, negative net settlement handling, and scheme-agnostic design.
---

## Summary

Detailed specification for handling reversals, refunds, and disputes within [[TACHA]]. Based on RFC by [[Wycliffe Ochieng']] (January 2026, under review). Covers immutable adjustment model, Kafka-driven clearing flow via `clearing.adjustments.v1`, negative net settlement handling, and scheme-agnostic design with adapters.

## Key Points

- Design principles: Immutability (original never mutated), event-driven (adjustments through standard clearing pipeline), idempotency, traceability, scheme-agnostic core
- **Reversals:** Pre-settlement only; full reversal only in v1; creates contra ledger entry; Fee Service excluded from reversal processing
- **Refunds:** Post-settlement; supports partial and full; mandatory reversed settlement direction (debit acquirer, credit issuer); cumulative refund cap at original amount; Fee Service excluded
- **Disputes:** Post-settlement chargebacks; requires `isDispute=true`, `disputeLogCode`, `disputeApproverUser`; same direction rule as refunds; netted into next settlement window
- Dispute lifecycle (future): INITIATED → REPRESENTED → ARBITRATION → CLOSED — currently only pre-approved disputes from platforms
- Platform dispute ownership: Juliana POS (card-present), Juliana Web (card-not-present), CDD (DD disputes), Monnify (gateway disputes)
- **Negative net settlement:** Direction-aware netting; prefunded acquirers settled from collateral; non-prefunded capped at zero with shortfall to suspense account + treasury notification
- All adjustments published to `clearing.adjustments.v1` Kafka topic
- Kafka replay supported for reconciliation rebuild and DR
- NFR targets: 99.99% availability, <200ms adjustment creation latency
- Future enhancements: Scheme-specific dispute APIs (MasterCom, VROL), multi-currency FX, partial reversals, automated escalation

## Entities Mentioned

[[TACHA]], [[TeamApt]], [[Wycliffe Ochieng']], [[Juliana Card Switch]], [[Monnify]], [[Visa]], [[Mastercard]], [[HabariPay]]

## Concepts

[[Clearing and Settlement]], [[Dispute Management]], [[Chargebacks]]