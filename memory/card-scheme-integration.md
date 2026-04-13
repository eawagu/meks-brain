---
title: Card Scheme Integration
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-13T15:31:51Z"
updated: "2026-04-13T15:31:51Z"
summary: Technical and certification processes for connecting to Visa and MasterCard networks — spanning authorization, clearing, settlement, and dispute handling.
---

## Definition

Card Scheme Integration is the set of technical and certification processes required to connect a payment processor to card networks ([[Visa]], [[MasterCard]]) for authorization, clearing, settlement, and dispute handling.

## Integration Layers

- **Authorization** — real-time message exchange (0100/0110) for transaction approval/decline
- **Clearing** — batch file exchange (IPM for MasterCard, TC files for Visa) for settled transactions
- **Settlement** — net financial position calculation and fund transfer
- **Dispute** — chargeback, representment, and arbitration flows per scheme rules

## Moniepoint/TeamApt Context

Two integration postures:
- **[[Collections-Only Processing]]** — current state for MasterCard; acquiring/collections only, deferring full issuer processing
- **Full Issuer Processing** — target state under [[Project Phoenix]]; requires certification for both Visa and MasterCard as an issuer processor

Key integration entities:
- [[MasterCard Integration]] — authorization, MPGS, IPM clearing, GCMS
- [[Visa]] — domestic POS via [[Interswitch]]/UPSL
- Certification processes span EMV compliance, 3DS/SCA, and BIN registration

## References

Referenced in [[MasterCard Authorization Processing Specification]], [[MasterCard Security and Cryptography Specification]], and card issuance architecture sources.