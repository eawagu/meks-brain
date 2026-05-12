---
title: Kafka partitioning strategy
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-12T10:57:09Z"
updated: "2026-05-12T10:57:09Z"
summary: Disbursement Kafka partitioning trade-off — merchant-account-key (sequential, fewer 06s, consumer lag) vs null-key (parallelism, higher 06 rate); current strategy maintained pending impact metrics (Apr 22, 2026).
---

## Overview

Kafka partitioning strategy for the [[MIS]] disbursement flow trades off completion time vs success rate.

## Strategies

- **Current (stable)**: merchant account number as partition key on debit source — all transactions for one merchant go to one partition; sequential execution; reduces [[CBA 06 error|06 errors]]; **downside**: consumer lag for high-volume merchants (e.g., one at 117 txn/min)
- **Alternative (CBA team)**: null key on both legs — distributes across partitions; faster processing; **downside**: increased concurrency raises 06 failure rates requiring immediate retries

## Decision (Apr 22)

Current merchant-key strategy maintained. [[Prateek Gupta]] to collect impact metrics on high-volume merchants and SLAs before evaluating switch.

Source: [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]