---
title: TACHA Reversal Refund Dispute Management
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\TeamApt\Systems\TACHA\TACHA_Reversal_Refund_Dispute_Management.md
summary: "Data model and processing flows for adjustments as first-class clearing data: reversals (pre-settlement undoing), refunds (post-settlement returns), disputes (post-settlement challenges). Immutable audit trail via Kafka, no fee reversal on refunds, negative net handled via suspense."
---

## Summary

Adjustment processing as first-class clearing data in TACHA: reversals, refunds, and disputes.

## Key Points

- Reversals: pre-settlement undoing; validate original exists and is pre-settlement
- Refunds: post-settlement returns; funds flow opposite to original; no fee reversal
- Disputes: post-settlement challenges requiring isDispute=true, disputeLogCode, disputeApproverUser
- Negative net: acquirer debits matched against issuer credits; shortfalls in suspense
- Immutable audit trail via taccs.settlement.audit Kafka topic; event replay capable

## Concepts

- [[Regulatory Compliance]]