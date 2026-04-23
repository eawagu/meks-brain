---
title: Digitisation Service
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-23T05:24:49Z"
updated: "2026-04-23T05:24:49Z"
summary: "Internal Moniepoint MFB service enabling tap-to-pay via pseudo-digitisation — PAN stored securely on the customer's Android device and transmitted via EMV NFC at POS, bypassing the need for Visa Token Service tokenisation; powered by Sudo Africa as the external provider."
---

## Overview

Digitisation Service is the internal [[Moniepoint MFB]] service that enables tap-to-pay functionality on customer mobile devices. Owned by Card Infrastructure ([[Damilola Oyediran]]).

## Approach: Pseudo-Digitisation

MoniePoint's approach is **[[Pseudo-Digitisation]]** — the actual PAN is **securely stored on the customer's Android device** and transmitted via EMV NFC at the point of sale, **bypassing the need for a Visa Token Service (VTS) tokenisation step**.

## External Provider

- **[[Sudo Africa]]** — subscription-based external provider

## Status (Apr 2026)

- **Live for Android users internally**
- Broader rollout pending NFC readiness on the MoniePoint POS terminal estate
- OP and PE terminals are **~100% NFC-ready**
- Broad customer rollout depends on completion of the [[Visa]] launch

## Future Direction

Full Visa tokenization (via VTS) is planned post-Visa launch (likely Q4 2026), **potentially replacing the current pseudo-digitisation approach**.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]