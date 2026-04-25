---
title: BVN
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:00Z"
updated: "2026-04-25T11:52:00Z"
summary: "Bank Verification Number — Nigerian customer identification standard. D2B Apr 22 aligned: BVN requirement removed from the FCMB integration as the bank plans to drop BVN from API responses entirely; team confirmed not used in current implementation."
---

## Definition

**BVN** (Bank Verification Number) is the Nigerian customer identification standard — an 11-digit number issued by NIBSS that identifies a customer across all Nigerian banks. In the [[Direct to Bank program]] context, BVN may appear in bank API responses but its presence is not load-bearing for current integration functionality.

## D2B Apr 22 aligned decision (FCMB)

- [[FCMB]] plans to **totally drop BVN from API responses**.
- Team confirmed BVN is **not used in the current implementation** ([[Glory Alioha]] reporting).
- [[Abiodun Famoye]]: BVN is a "good to have" feature that cannot be enforced if the bank chooses not to provide it.
- **Aligned**: BVN requirement removed from the integration; exclusion confirmed not to impact functionality.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## Implications

The BVN-drop decision raises a question for KYC and compliance: if BVN is the regulatory anchor for customer identification, dropping it from API responses may shift the burden of customer identity to other fields (account number, NIN, registered phone). Worth verifying whether the FCMB integration still receives BVN through any alternate channel (e.g., direct customer-onboarding flow) or whether the integration genuinely operates without BVN.

## Sources

- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
