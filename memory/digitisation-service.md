---
type:
  - "entity"
title: Digitisation Service
created: "2026-04-23T05:24:49Z"
summary: Moniepoint MFB tap-to-pay service using pseudo-digitisation — PAN stored securely on Android device, transmitted via EMV NFC, bypassing Visa Token Service; external provider is Sudo Africa; live on Android, rollout pending POS NFC readiness.
updated: "2026-04-23T05:35:45Z"
cssclasses:
  - "entity"
---

## Overview

**Digitisation Service** is [[Moniepoint MFB]]'s internal tap-to-pay service, paired with external provider [[Sudo Africa]]. It enables NFC tap-to-pay functionality on customer devices.

## Design Principle — Pseudo-Digitisation

MoniePoint's approach is **pseudo-digitisation**: the actual PAN is stored securely on the customer's Android device and transmitted via EMV NFC at the point of sale, **bypassing the need for a [[Visa Token Service]] (VTS) tokenisation step**. This sidesteps the VTS subscription cost and integration complexity while still delivering the tap-to-pay UX.

External provider: [[Sudo Africa]] (subscription-based).

## Status (Apr 2026)

- Live for Android users internally
- Broader rollout pending NFC readiness on the MoniePoint POS terminal estate (OP and PE terminals are approximately 100% ready)

## Future Tension

Under the 2026 roadmap, **Visa Tokenization & VAS** (Priority 2) includes the possibility of moving to full Visa tokenization via a proper VTS provider — potentially replacing the current pseudo-digitisation approach. Decision likely Q4 2026.

## Ownership

Owned by Team 2 (Card Infrastructure) under PM [[Damilola Oyediran]].

## Related

- [[Sudo Africa]]
- [[Card OTP Service]]
- [[Damilola Oyediran]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]