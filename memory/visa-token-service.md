---
title: Visa Token Service
type:
  - "concept"
cssclasses:
  - "concept"
aliases:
  - "VTS"
created: "2026-04-23T05:30:10Z"
updated: "2026-04-23T05:30:10Z"
summary: "Visa's tokenisation service — issues device-bound tokens standing in for the PAN; not currently used by Moniepoint MFB (which uses pseudo-digitisation instead) but planned post-Visa launch as part of Visa Tokenization & VAS roadmap, potentially replacing pseudo-digitisation."
---

## Overview

Visa Token Service (VTS) is [[Visa]]'s tokenisation service — it issues device-bound tokens that stand in for the PAN during card-not-present and contactless transactions, enabling scheme-level fraud controls and liability shifts.

## Moniepoint MFB Position

- VTS is **not currently used** in the MFB tap-to-pay flow. Instead, [[Moniepoint MFB]] uses [[Pseudo-Digitisation]] — the PAN itself is stored on the Android device and transmitted via EMV NFC, bypassing VTS.
- **Full Visa tokenization via VTS is planned post-Visa launch** (likely Q4 2026) as part of the Visa Tokenization & VAS roadmap.
- The future VTS deployment may **replace pseudo-digitisation** or run alongside it depending on design choices to be made.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]