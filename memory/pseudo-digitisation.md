---
title: Pseudo-Digitisation
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-23T05:30:09Z"
updated: "2026-04-23T05:30:09Z"
summary: "Moniepoint MFB's tap-to-pay approach that stores the actual PAN securely on the customer's Android device and transmits via EMV NFC at POS — bypassing the need for VTS-based tokenisation; powered by Sudo Africa; live internally on Android."
---

## Definition

Pseudo-Digitisation is [[Moniepoint MFB]]'s approach to enabling tap-to-pay on customer mobile devices **without invoking a card scheme's tokenisation service** (e.g. [[Visa]]'s VTS).

## Mechanism

1. The actual PAN is **securely stored on the customer's Android device**
2. The PAN is transmitted directly via **EMV NFC** at the point of sale
3. The EMV / POS terminal treats the transaction as a normal EMV contactless transaction
4. The scheme's tokenisation service is **bypassed**

This is in contrast to conventional digitisation flows where the scheme's tokenisation service (e.g. VTS) issues a device token that stands in for the PAN.

## Implementation

- Internal service: [[Digitisation Service]]
- External provider: [[Sudo Africa]] (subscription)
- Platform: Android only
- Transport: EMV NFC

## Status (Apr 2026)

- **Live for internal Android users**
- Broader rollout pending NFC readiness on MoniePoint POS terminal estate; OP and PE terminals ~100% NFC-ready
- Broad customer rollout depends on completion of the [[Visa]] launch

## Trade-off vs. VTS-Based Tokenisation

The 2026 roadmap anticipates **full Visa tokenization via VTS** post-Visa launch (Q4 2026 likely), potentially replacing pseudo-digitisation. Design tensions not explicitly documented in source, but likely considerations include: scheme-level fraud tooling depth, device-key compromise risk vs. VTS token-specific controls, cross-device provisioning, and scheme liability shift rules.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]