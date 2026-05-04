---
title: Core Banking System
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-05-04T12:11:10Z"
updated: "2026-05-04T12:11:10Z"
summary: Banking platform that runs deposit, loan, ledger, and customer-account processing; selection drives downstream architecture decisions for digital channels, CX platforms, and card systems.
---

A Core Banking System (CBS) is the central transaction processing platform that runs deposit, loan, ledger, customer account, and posting operations for a bank. CBS selection has cascading downstream impact on website architecture, CX platforms, card issuance, and integration patterns — making it the foundational decision in any bank's IT strategy.

## CBS Selection — Best Practice Per DDMFB Review
Per [[DDMFB_2026_IT_Strategy_Review]], a properly-scoped CBS initiative requires:
- Dedicated standalone project document (not a paragraph in a strategy doc)
- Formal RFP process with defined evaluation criteria — see [[Vendor Evaluation & RFP]]
- Migration strategy and data migration plan
- Parallel run period
- Staff training program
- Integration requirements specification
- Regulatory approval timeline ([[CBN]] must approve core banking changes at licensed institutions)
- Realistic implementation timeline (typically 12–24 months)
- Total cost of ownership including implementation services, data migration, training, and at least 12 months of post-go-live support

## DDMFB 2026 — Application of Concept
[[DavoDani Microfinance Bank]] allocated ₦100M (~72% of total IT budget) to CBS in its 2026 strategy but documented the initiative in less than half a page. The candidate list erroneously included [[Microsoft Dynamics NAV]] — an ERP, not a CBS. The reviewer recommended sequencing CBS selection first since it determines the [[Customer Experience Platform]], website architecture, and ATM card deployment paths.