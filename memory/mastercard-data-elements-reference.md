---
title: MasterCard Data Elements Reference
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\05-data-elements-reference.md
summary: ISO 8583 payment message specification for MasterCard transaction processing, documenting 53 critical data elements across 24+ message types with formats, lengths, validation rules, and presence requirements.
---

## Summary

ISO 8583 (1987) data elements reference for [[MasterCard]] transaction processing. Documents approximately 53 data elements used across 24+ message types, with field formats, lengths, validation rules, and presence requirements (Mandatory/Conditional/Optional).

## Key Points

- **ISO 8583 standard (1987)** defines up to 128 data elements; MasterCard utilizes approximately 53 across its transaction processing network.
- **Presence indicators**: M (Mandatory), C (Conditional), O (Optional), X (Not used), CE (Conditional Expense), ME (Mandatory Expansion), or system-provided.
- **PAN (DE 2)**: 13-19 digit numeric, left-justified. Contains BIN (6 digits) + account ID (9-12 digits) + Luhn check digit. Mandatory on all message types.
- **Processing Code (DE 3)**: 6-digit numeric with 3 subfields (2 digits each) encoding transaction type, account type, and amount type.
- **Amount fields (DE 4, 5, 6)**: 12-digit numeric for transaction, settlement, and cardholder billing amounts. Decimal implicit. DE 5/6 must match DE 4 in currency conversion scenarios.
- **STAN (DE 11)**: 6-digit System Trace Audit Number, must be unique per UTC day per originating institution. Mandatory on all transactions.
- **Date/Time fields**: Strict formatting — DE 7 (Transmission) = MMDDhhmmss UTC, DE 12 (Local) = hhmmss, DE 13/15/16 = MMDD or YYMM. Critical for reconciliation.
- **Conversion rates (DE 9, 10)**: 8-digit numeric with implicit decimal (4 left, 4 right). Present only when transaction currency differs from settlement/billing currency.
- **Merchant data (DE 18, 42, 43)**: MCC code (4 digits), terminal ID, merchant ID — required for authorization and routing.
- **Security requirements**: PAN encryption mandatory per MasterCard DSS. Logs must mask card data (last 4 only). Never transmit PAN in cleartext over unencrypted channels.
- **Length notation**: LLVAR (Length-Limited Variable) for variable fields. Numeric fields require zero-padding and left-justification for fixed-length DEs.
- **Track data validation**: Track 1/2 card data must match DE 2 PAN. Card expiration (DE 14, YYMM) must match Track 2 expiration.

## Entities Mentioned

[[MasterCard]]

## Concepts

[[Transaction Switching]], [[Card Issuance]]