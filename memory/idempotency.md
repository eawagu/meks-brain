---
title: Idempotency
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:20:42Z"
updated: "2026-04-25T12:20:42Z"
summary: "Property where the same transaction message posted twice returns a 'duplicate transaction' code on the second attempt rather than executing twice. CBA's idempotency check enables direct-retry architecture (Apr 22 decision) by removing the need for a requery API."
---

## Definition

**Idempotency** is the property of an operation where applying it multiple times has the same effect as applying it once — critical for retry-safe distributed systems.

In the [[CBA]] context, idempotency means: the same transaction message posted twice returns a "duplicate transaction" code on the second attempt rather than executing the transaction twice.

## Why this matters (Apr 22 architecture decision)

The CBA's idempotency check is the **architectural enabler** for removing the requery API: instead of querying status before retrying, MIS can directly repost the message because CBA's idempotency prevents double-execution.

This collapses the requery+retry pattern (status check then conditional repost) into a simpler **direct retry** via [[Outbox pattern]].

## Reversal idempotency

The same property applies to reversals: CBA returns "duplicate transaction" if a reversal is attempted twice (per staging tests), preventing double reversal. Therefore reversal failures can also skip requery and directly retry.

## Confirmation pending

[[Muhammad Toqeer]] action: obtain formal confirmation regarding CBA policy for handling duplicate reversal transactions.

## Sources

- [[Disbursement-CBA Integration Architecture Review - 2026-04-22 19:30 IST]]
