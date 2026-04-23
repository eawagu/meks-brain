---
type:
  - "source"
title: Card Manager Service CMS Specification
created: 2026-04-11
summary: "Technical specification of CMS, Moniepoint MFB's legacy core card lifecycle management platform \u2014 originated from Resync source code, bridges Postilion switch and Kuwego CBA via PostBridge (ISO 8583), managing card production/activation/transactions/disputes for Verve, Mastercard, and Afrigo schemes; being replaced by the new Phoenix Card Management System under the Postillion Elimination objective."
updated: "2026-04-23T05:43:17Z"
cssclasses:
  - "source"
source_path: TeamApt Context\MoniePoint MFB\Card_Manager_Service_CMS_Specification.md
---

## Summary

Technical specification of the Card Manager Service (CMS), Moniepoint MFB's core card lifecycle management platform. Originally built from Resync source code, CMS bridges Postilion (ACI card switch) and Kuwego CBA via PostBridge (ISO 8583 interchange). Manages card production, activation, transaction processing, limits, blocking, PIN management (HSM-integrated), disputes, and reversals for Verve, Mastercard, and Afrigo schemes. Deployed as 3 separate GKE instances.

This is the **legacy system** that the new Phoenix [[Card Management System]] is being built to replace. Primary strategic objective of the replacement: [[Postillion Elimination]]. See [[Source \u2014 Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] for the replacement migration strategy.

## Key Points

- Originated from Resync source code partnership; currently evolved and maintained by Moniepoint Cards team (Team 2 \u2014 [[Card Infrastructure Team]] under [[Damilola Oyediran]] / [[Nitish Chand]])
- PostBridge handles 54% of platform transactions (ISO 8583 interchange); March 2026 incident showed tight coupling
- Supported card schemes: Verve (507880, 507800002, 50612402074 BINs), Mastercard (516227), Afrigo (56402102)
- Capabilities: card production/issuance, virtual cards, digital cards (NFC/Tap to Pay), activation, blocking, PIN management, dispute resolution, reversals, lien management
- Three-instance deployment: Transient (Mainstream, Transaction) + Non-Transient (Admin) on `aptpay` namespace
- Active evolution: CMS Transaction Service extraction (Java 21), MJS\u2192TAJS migration, Spanner migration (Q3 2026), Vault integration
- **Known limitation:** uses dummy account numbers on [[Postillion]] \u2014 blocks Interswitch direct refunds by transfer

## Replacement Under Phoenix

See [[Card Manager Service]] for the canonical entity page covering how this legacy system is being progressively replaced by the new Phoenix [[Card Management System]], with [[Visa]] as the launch workload on the new CMS.

## Entities Mentioned

- [[Damilare Ogunnaike]]
- [[Damilola Oyediran]]
- [[Nitish Chand]]
- [[Olufemi Davies]]

## Concepts

- [[Card Issuance Platform]], [[MasterCard Integration]], [[Postillion Elimination]]

## Related Sources

- [[Source \u2014 Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]] \u2014 replacement strategy + MFB cards stack inventory
- [[Card Manager Service]] \u2014 canonical entity page