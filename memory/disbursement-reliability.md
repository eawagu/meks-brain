---
title: Disbursement reliability
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-12T10:54:13Z"
updated: "2026-05-12T10:54:13Z"
summary: Moniepoint disbursement service reliability — >98% success rate but persistent reversal correctness gaps and long-pending queue; 12k-record reprocessing initiative running Apr 22, 2026.
---

## Overview

Moniepoint disbursement reliability covers the success and failure characteristics of [[Moniepoint]]'s disbursement service.

## Apr 22, 2026 snapshot

- Success rate >98%
- Failures concentrated in: failed-not-reversed transactions + long-pending transactions
- 17,000+ records reversed Apr 10-20
- ~464 records pending Head-of-Engineering DB-update approval
- 12,000 records to reprocess via batched strategy
- Long-pending root cause: incorrect mapping of [[CBA]] failure status codes causing 'pending' default
- Oldest pending transaction: 24h (down from 64–68h)

Source: [[Disbursement Issues & Next steps - 2026_04_22 11_25 WAT]]

## Related

- [[CBA 06 error]]
- [[Retry mechanism design]]
- [[Batch reprocessing strategy]]