---
title: Pseudo-Digitisation Tap-to-Pay
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-23T05:38:06Z"
updated: "2026-04-23T05:38:06Z"
summary: "MoniePoint's tap-to-pay design approach — PAN stored securely on customer Android device and transmitted via EMV NFC, bypassing Visa Token Service tokenisation; enabled by Sudo Africa subscription; future tension with Priority 2 full Visa Tokenization."
---

## Definition

**Pseudo-Digitisation Tap-to-Pay** is MoniePoint's design approach for NFC tap-to-pay on customer devices: the actual PAN (Primary Account Number) is stored securely on the customer's Android device and transmitted via EMV NFC at the point of sale — **bypassing the need for a [[Visa Token Service]] (VTS) tokenisation step.**

This contrasts with the orthodox card-network approach, which requires scheme-issued tokens (VTS for Visa, MDES for Mastercard) to abstract the PAN.

## Why It Matters

- **Cost avoidance:** VTS subscription and integration cost is sidestepped.
- **Speed to market:** eliminates the VTS certification and integration programme as a blocker for tap-to-pay.
- **Architectural simplicity:** one fewer system in the critical path of a tap transaction.

## Mechanism

1. Customer's Android device stores the PAN securely (hardware-backed).
2. At the POS, the device transmits via EMV NFC using the secured PAN (not a scheme token).
3. The transaction flows through standard EMV auth rails.

External provider powering this: [[Sudo Africa]] (subscription-based).

## Status at Moniepoint MFB (Apr 2026)

- Live for Android users internally (no iOS support — Apple's tap-to-pay stack requires a scheme tokenisation service).
- Broader rollout pending NFC readiness on the MoniePoint POS terminal estate — OP and PE terminals approximately 100% ready.

## Future Tension

Under the 2026 roadmap Priority 2 (Visa Tokenization & VAS), MoniePoint is evaluating a move to full Visa tokenization via a proper VTS provider. This would **replace** the pseudo-digitisation approach. Decision likely Q4 2026.

The trade-off: VTS cost + integration overhead vs. the scheme-compliant coverage that full tokenization provides (including iOS tap-to-pay, online tokenized transactions, and reduced scheme fee tiers on tokenized PAN).

## Related

- [[Digitisation Service]]
- [[Sudo Africa]]
- [[Visa Token Service]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]