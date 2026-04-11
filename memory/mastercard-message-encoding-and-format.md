---
title: MasterCard Message Encoding and Format
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\03-message-encoding-and-format.md
summary: ISO 8583-1987 message encoding specification for MasterCard — message structure (length header, MTI, bitmaps, data elements), character types, length notations (fixed/LLVAR/LLLVAR), justification rules, and complete construction/parsing algorithms with examples.
---

## Summary

Third in the [[MasterCard]] technical specification series. Defines the complete ISO 8583-1987 message format: 4-byte length header + MTI + primary bitmap (64 bits) + optional secondary bitmap + data elements. Covers character type notations (a/n/s/an/ans/b/x/z), length encoding (fixed, LLVAR 2-digit prefix, LLLVAR 3-digit prefix), justification rules (numeric right-justified zero-padded, alpha left-justified space-padded), and provides complete pseudocode for message construction and parsing algorithms.

## Key Points

- Message structure: 4-byte binary length header → 4-byte MTI → 8-byte primary bitmap → optional 8-byte secondary bitmap → variable data elements
- Platform-imposed max message size: 8,192 bytes
- Primary bitmap bit 1 signals secondary bitmap presence (for data elements 65-128)
- Presence indicators: M (mandatory), C (conditional), O (optional), CE (conditional echo), ME (mandatory echo), X (system-provided)
- LLVAR: 2-digit ASCII length prefix, max 99 chars; LLLVAR: 3-digit prefix, max 999 bytes
- Supports ASCII/UTF-8 for TCP/IP and EBCDIC for mainframe connections
- Complete authorization request (1200) and response (1110) examples with binary construction walkthrough

## Entities Mentioned

- [[MasterCard]]

## Concepts

- [[Transaction Switching]] — ISO 8583 message format as the foundation of card payment switching