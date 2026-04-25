---
title: Tap to pay
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:07:39Z"
updated: "2026-04-25T12:07:39Z"
summary: Phone-as-card payment functionality on the Cards roadmap — launches alongside Visa. Currently implemented via Sudo Africa pseudo-digitization (PAN stored on device, EMV NFC); future migration to Visa Tokenization.
---

## Definition

**Tap to pay** is phone-as-card payment functionality on the Moniepoint MFB Cards roadmap — implemented via pseudo-digitization where the actual PAN is securely stored on the customer's phone and transmitted via EMV NFC at point-of-sale.

Current implementation is via [[Sudo Africa]] (subscription-based external provider). Future direction is full [[Visa Tokenization]] (VTS).

## Roadmap (Apr 21 KT)

Launches alongside the [[Visa project]]. Then [[Visa Tokenization]] follows.

## Why pseudo-digitization first

Sudo Africa's approach bypasses the Visa Token Service — PAN-on-device with EMV NFC. This was the chosen approach because it shipped faster than full VTS integration. Eventual migration to VTS is on the 2026 priority list.

## Related

- [[Visa Tokenization]]
- [[Sudo Africa]]
- [[Cards Team Structure Systems Roadmap - 2026-04-21 13:00 WAT]]
