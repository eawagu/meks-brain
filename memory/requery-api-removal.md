---
title: Requery API removal
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-12T10:57:09Z"
updated: "2026-05-12T10:57:09Z"
summary: Architecture change (Apr 22, 2026 ALIGNED) — remove requery API call from disbursement flow; direct retry leveraging CBA idempotency (duplicate-transaction response) replaces it; outbox pattern reposts the original message.
---

Requery API removal is the ALIGNED architecture change from the 2026-04-22 [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]. 

Before: if requery returns 'unable to locate record', [[MIS]] reposts original message to [[Kafka]] with same reference — effectively a retry; subsequent duplicate response = success.

After: since [[CBA]] is idempotent and returns duplicate-transaction on repost, the requery API call is eliminated entirely (especially first leg). [[Outbox pattern]] replaces it with direct reposting of full packet.

Applies to both transfers and reversals (staging tests show CBA returns duplicate-transaction on reversal retry, preventing double reversal).

Source: [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]