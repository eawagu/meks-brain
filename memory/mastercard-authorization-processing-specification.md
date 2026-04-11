---
title: MasterCard Authorization Processing Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\06-authorization-processing.md
summary: MasterCard authorization processing lifecycle — terminal initiation through issuer decision, covering basic flow, Stand-In fallback (30-second timeout), currency conversion, preauthorization, and completion.
---

## Summary

Complete MasterCard authorization processing lifecycle. Flow: Terminal → Acquirer MIP → MasterCard Network → Issuer MIP with timeout handling and Stand-In fallback. Covers STAN tracking, processing codes, response codes (00 approved, 10 partial, 05 decline), and special transaction types.

## Key Points

- Auth flow: Terminal → Acquirer MIP → MC Network → Issuer MIP
- Stand-In fallback after 30-second timeout when issuer unavailable
- STAN (System Trace Audit Number) for transaction matching
- Processing codes define transaction type, source/destination account combinations
- Response codes: 00 (approved), 10 (partial), 05 (decline)

## Concepts

- [[MasterCard Integration]]
- [[Card Issuance Platform]]