---
title: NFC Tap-to-Pay
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-23T05:30:10Z"
updated: "2026-04-23T05:30:10Z"
summary: Contactless payment over short-range radio — Moniepoint MFB enables NFC tap-to-pay on Android via pseudo-digitisation; OP/PE terminal estate ~100% NFC-ready; broad rollout gated by Visa launch.
---

## Definition

NFC (Near-Field Communication) Tap-to-Pay is a contactless payment mechanism where a card or mobile device transmits EMV payment credentials to a POS terminal over short-range radio, enabling a payment without requiring chip insertion or magstripe swipe.

## Moniepoint MFB Implementation

[[Moniepoint MFB]] implements NFC tap-to-pay via [[Pseudo-Digitisation]] (internal [[Digitisation Service]] + [[Sudo Africa]] external provider). The PAN is stored securely on the customer's Android device and transmitted via EMV NFC at POS — no VTS tokenisation required.

## POS Terminal Readiness

- **OP and PE terminals: ~100% NFC-ready** as of Apr 2026
- Broad rollout pending [[Visa]] launch completion

## Relationship to Full Tokenisation

Full Visa tokenization via VTS is planned post-Visa launch (Q4 2026 likely), potentially replacing pseudo-digitisation. The underlying NFC transport remains the same — what changes is whether the PAN or a token is on the device.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]