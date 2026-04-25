---
title: Modify Atlas Integration Service
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-25T12:20:42Z"
updated: "2026-04-25T12:20:42Z"
summary: "MIS — TeamApt's middleware service that orchestrates the disbursement transaction flow (debit-source → transfer → async settlement) between the Disbursement service and CBA. Owner of the requery/retry logic being simplified Apr 22."
---

## Definition

The **Modify Atlas Integration Service** (MIS) is the TeamApt middleware service that orchestrates the disbursement transaction flow between the [[Disbursement service]] and the [[CBA]] (Core Banking Application).

## Three-step transaction flow

1. **Debit source** — money moves from merchant source account to transit account.
2. **Transfer** — funds move to destination account.
3. **Async settlement** — funds move for fees and related items (asynchronous, separate thread).

## Synchronous-over-async pattern

MIS publishes a debit-source message to [[Kafka]] and **blocks the thread**, simulating synchronous behaviour over the async channel — waiting for a key/response from the CBA. CBA consumes, performs the transaction, pushes a response code (e.g., 00 success); MIS unblocks and proceeds to step 2.

## Failure handling

- **Kafka post failure** → transaction enters **pending state**; "in progress" returned to merchant. Currently configured 24h timeout (planned reduction).
- **Debit source failure** (CBA returns 05) → no reversal needed; failed response immediately returned.
- **Transfer step failure** → failed response to merchant + asynchronous reversal flow triggered.

## Architectural simplification (Apr 22 decision)

[[Requery elimination]]: requery API is being **removed** — because CBA is idempotent (returns "duplicate transaction" on second post), MIS can directly retry by reposting the message. This replaces the requery+retry pattern with a simpler outbox-style direct retry.

## Sources

- [[Disbursement-CBA Integration Architecture Review - 2026-04-22 19:30 IST]]
