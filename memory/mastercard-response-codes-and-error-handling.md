---
title: MasterCard Response Codes and Error Handling
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\09-response-codes-and-error-handling.md
summary: Complete MasterCard response code (DE 39) reference and error handling procedures — authorization decisions, risk/fraud codes, PIN management, system errors, timeout handling, and duplicate detection.
---

## Summary

Complete DE 39 response code reference: 00 (approved), 10 (partial), 05 (do not honor), risk codes (34 fraud, 41 lost, 43 stolen), limit codes (51 insufficient funds, 61 exceeds limit), PIN codes (55 invalid, 75 tries exceeded), system codes (68 timeout, 91 inoperative, 96 error). Timeout 2-10 second window triggers Stand-In. Duplicate detection window 15-30 minutes.

## Key Points

- Risk codes: 34 (suspected fraud), 41 (lost card), 43 (stolen card), 57 (not permitted)
- Limit codes: 51 (insufficient funds), 61 (exceeds withdrawal limit), 65 (activity count limit)
- PIN codes: 55 (invalid PIN), 75 (tries exceeded), 86 (cannot verify)
- System codes: 68 (timeout), 91 (inoperative), 92 (unable to route), 94 (duplicate), 96 (error)
- DE 44 contains 3-digit field identifier for Format Error (30) responses

## Concepts

- [[MasterCard Integration]]