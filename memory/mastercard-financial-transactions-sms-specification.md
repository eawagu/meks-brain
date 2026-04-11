---
title: MasterCard Financial Transactions SMS Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\07-financial-transactions-sms.md
summary: MasterCard Single Message System (SMS) specification — combines authorization and settlement into single 0200/0210 pair for debit networks (Debit MasterCard, Maestro, Cirrus ATM).
---

## Summary

SMS combines authorization and settlement into single message pair (0200/0210) for debit networks, contrasting with DMS (0100/0110 + 0120/0130) for credit. Covers Debit MasterCard, Maestro, Cirrus ATM processing with immediate posting, Stand-In limits, partial approvals, and batch settlement.

## Key Points

- SMS: 0200/0210 single message; DMS: dual message for credit
- Processing codes: 000000 (purchase), 010010 (ATM withdrawal), 020000 (balance inquiry), 090010 (purchase + cashback)
- Stand-In SMS limits: ATM $300, daily $1,000, 3/day; POS $500
- 0220/0230 advice messages for settlement confirmation
- 250-byte batch record format (FHDR, FREC, FTRL)

## Concepts

- [[MasterCard Integration]]