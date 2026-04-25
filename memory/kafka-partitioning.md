---
title: Kafka partitioning
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:20:43Z"
updated: "2026-04-25T12:20:43Z"
summary: "Kafka partitioning strategy on the Disbursement↔CBA integration — trade-off between merchant-key (sequential, low 06 errors but consumer lag) and null-key (concurrent, faster but higher 06 failure rate). Apr 22 status: current strategy maintained pending impact-metric collection."
---

## Definition

**Kafka partitioning** in the [[Disbursement service]] context determines how messages are distributed across Kafka partitions and consumers — directly affects throughput, ordering, and concurrency safety.

## Current strategy (Apr 22)

- **Merchant account number** as the partition key for debit-source step.
- All transactions for a single merchant go to **one partition** → sequential execution → reduced 06 errors.

### Drawback

Consumer lag and processing delays for high-volume merchants. Example: a merchant processing 117 tx/min has all processing serialized through a single consumer.

## Alternative strategy (proposed by CBA team)

- **Null key** for both debit-source and transfer steps.
- Distributes transactions across all available partitions → faster processing time.

### Drawback

Increased concurrency → higher 06 failure rate → immediate retries needed.

## Trade-off framing

**Transaction completion time vs. success rate.** Decision pending: data on affected merchants must be collected before considering implementation. Currently a long-term alternative.

## Action

[[Prateek Gupta]] — collect numbers detailing effects of current strategy on high-volume merchants and SLAs.

## Sources

- [[Disbursement-CBA Integration Architecture Review - 2026-04-22 19:30 IST]]
