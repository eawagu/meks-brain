---
type:
  - "concept"
title: Outbox pattern
created: "2026-04-25T12:20:42Z"
summary: Proposed replacement for requery API in MIS disbursement flow — store message in DB, poll to Kafka; combined with CBA idempotency eliminates need for long requery waits (Apr 22, 2026 arch review).
updated: "2026-05-12T10:57:08Z"
cssclasses:
  - "concept"
---

Outbox pattern was proposed in the 2026-04-22 [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]] as the replacement for [[MIS]]'s requery API call. Approach: store the message in DB, poll to [[Kafka]]. Combined with [[CBA]]'s idempotency (duplicate-transaction response code) on second post, this eliminates the need for long requery waits.

Source: [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]