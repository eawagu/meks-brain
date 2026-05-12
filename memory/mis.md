---
title: MIS
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-05-12T10:57:08Z"
updated: "2026-05-12T10:57:08Z"
summary: Modify Atlas Integration Service — owns disbursement transaction orchestration; sync-over-async pattern with Kafka publish and Redis-key thread block awaiting CBA response (Apr 22, 2026 arch review).
---

## Overview

MIS (Modify Atlas Integration Service) is the [[TeamApt]] / [[Moniepoint]] service that orchestrates disbursement transactions — sits between the [[Disbursement service]] and [[CBA]].

## Architecture (per 2026-04-22 review)

- Three-step transaction: debit source (merchant → transit account), transfer (transit → destination), async settlement
- Sync-over-async pattern: MIS publishes debit-source to [[Kafka]] and blocks thread on [[Redis]] key awaiting CBA response
- CBA returns code 00 → MIS unblocks via Redis key → executes transfer leg same way
- After success: thread releases; settlement published asynchronously on separate thread
- If MIS cannot post to Kafka → transaction enters pending; "in progress" returned to merchant
- Current 24h requery timeout (originally designed for 10 minutes; planned reduction pending CBA SLA)
- Architecture shift (ALIGNED 2026-04-22): remove requery API; direct retry via outbox pattern leveraging CBA idempotency

## Related

- [[Disbursement service]]
- [[CBA]]
- [[Kafka partitioning strategy]]
- [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]