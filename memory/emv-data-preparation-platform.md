---
title: EMV Data Preparation Platform
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-13T15:30:58Z"
updated: "2026-04-13T15:30:58Z"
summary: Card issuance subsystem that generates EMV chip data profiles for physical card personalization — a market-specific Module-layer component within Project Phoenix.
---

## Definition

EMV Data Preparation is the subsystem within the [[Card Issuance & Processing Platform]] ([[Project Phoenix]]) responsible for generating the chip data profile that gets written to a payment card during personalization. It is a market-specific Module-layer component — each market's scheme and regulatory requirements produce different EMV tag sets.

## Role in Card Lifecycle

Sits between card program definition (in the [[Card Management System]]) and physical card production:
1. Card program defines the product parameters (BIN, fee structure, limits)
2. **EMV Data Preparation** translates those parameters into the EMV tag profile for the chip
3. Card production vendor receives the prepared data and writes it to the physical card

## Key Technical Aspects

- EMV tags include: 9F26 (Application Cryptogram), 9F27 (CID), 9F36 (ATC), issuer public keys, CVM lists
- Market-specific: Nigeria vs UK vs Kenya may require different tag sets, CVM priorities, and offline floor limits
- Scheme-specific: [[MasterCard]] and [[Visa]] have distinct tag requirements and certification processes

## References

Referenced in [[003_CMS_Core_Features_Overview_v1.0]], [[MasterCard Security and Cryptography Specification]], and card issuance architecture sources.