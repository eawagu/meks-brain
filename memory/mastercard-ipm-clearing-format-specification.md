---
title: MasterCard IPM Clearing Format Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\14-ipm-clearing-formats.md
summary: Integrated Product Messages (IPM) clearing format based on ISO 8583-1993 — message types (1240 presentments, 1442 chargebacks, 1644 admin, 1740 fees), data elements, file structure, and Private Data Subelements.
---

## Summary

IPM message format for clearing: 4-digit MTI (1240 presentments, 1442 chargebacks, 1644 admin, 1740 fees). Primary/secondary bitmaps indicate present data elements. File structure: Header (1644-697) → transactions → Trailer (1644-695). PDS in DE 48 provides extensible data.

## Key Points

- Sequential Message Number (DE 71) starting at 00000001; trailer DE 71 = total count
- All data elements in ascending numerical order
- File IDs must match between header and trailer
- PDS: File ID, Transmission ID, currency exponents, dispute info

## Concepts

- [[MasterCard Integration]]