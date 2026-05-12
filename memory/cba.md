---
type:
  - "entity"
title: CBA
created: "2026-04-25T12:07:39Z"
summary: "Core Banking Application on Moniepoint stack — source of '06'/'CD06' error blocking disbursement reversals (Apr 22, 2026); reversal endpoint vs original-transaction-endpoint distinction."
updated: "2026-05-12T10:54:13Z"
cssclasses:
  - "entity"
---

## Overview

CBA (Core Banking Application) is the bank-side application Moniepoint integrates with for disbursement and reversal processing.

## 2026-04-22 Disbursement Issues meeting

- **CBA 06 / CD06 error** blocks reversals — risk of zero-sum error if 12k records reposted before root cause identified
- System misinterprets reversal status: queries general transactions endpoint, not reversal-specific — only 'reversal' tag in reference differentiates
- Team on second call with CBA team
- [[Dominic Usiabulu]] confirmed CBA access is live
- Concurrency-sensitive — requires batched submissions (3k → 1.5k → 500 → 100 records with sleep gaps initially)
- Disbursement-CBA integration architecture review scheduled separately on 2026-04-22 19:30 IST

## Related

- [[CBA 06 error]]
- [[Disbursement Issues & Next steps - 2026_04_22 11_25 WAT]]
- [[CBA integration]]