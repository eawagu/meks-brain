---
title: CBA 06 error
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-12T10:54:13Z"
updated: "2026-05-12T10:54:13Z"
summary: CBA error code 06/CD06 on Moniepoint disbursement reversals — root cause unknown as of Apr 22, 2026; further reversal processing and 12k repost paused until identified.
---

## Overview

CBA 06 (also referenced as CD06) is the error code returned by [[CBA]] that blocks reversal processing on the [[Moniepoint]] disbursement stack.

## 2026-04-22 status

- Returned by CBA on reversal attempts; subsequent requery returns 'approved' — [[Damilare Ogunnaike]] not convinced reversal actually succeeded
- System reports reversal complete by checking original-txn endpoint, not reversal-specific endpoint
- **ALIGNED**: retry process paused; 12k transaction posting deferred until root cause identified and resolved
- [[Benjamin Ononogbu]] to query [[PCB]] for failure reasons + investigate reversal API
- Action: change posting logic to handle code 06 and mark duplicates as successful

Source: [[Disbursement Issues & Next steps - 2026_04_22 11_25 WAT]]