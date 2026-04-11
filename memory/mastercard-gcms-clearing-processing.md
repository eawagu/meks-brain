---
title: MasterCard GCMS Clearing Processing
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\15-gcms-clearing-processing.md
summary: Global Clearing Management System (GCMS) operations — transaction validation, currency conversion, interchange assessment, institutional routing, and settlement calculation across six daily cycles.
---

## Summary

GCMS operates six primary daily clearing cycles. Processing: capture → IPM submission → validation → currency conversion → interchange assessment → routing → settlement. Validates structural integrity, data values, and compliance. Four transmission methods: MIP (real-time), CONNECT:Direct (batch), File Express (web), TCP/IP (custom).

## Key Points

- Cycle 7 handles Mexico domestic (11:00 local)
- Interchange based on amount, MCC, product type, geography; chargebacks at ~1.5x base
- Validates MTI, bitmaps, DE formats, PAN, amounts, currencies, MCC appropriateness

## Concepts

- [[MasterCard Integration]]