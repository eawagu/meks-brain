---
title: Configurable response codes
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-12T10:57:09Z"
updated: "2026-05-12T10:57:09Z"
summary: Architecture decision (Apr 22, 2026 ALIGNED) — disbursement retry system reads response codes from external config rather than hard-coded; supports future CB code additions without code changes.
---

Configurable response codes was an ALIGNED decision in the 2026-04-22 [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]: response codes for the retry/reversal/failure decision tree must be externally configurable rather than hard-coded business logic. Future communications from [[CBA]] / CB about new codes should not require code changes. Mapping between reversal and failed transactions must be correct.

Proposed by [[Prateek Gupta]]; agreed by [[Ravi Veluguleti]].

Source: [[Disbursement-CBA integration architecture review - 2026_04_22 19_30 IST]]