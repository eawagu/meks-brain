---
title: Card Manager Service CMS Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MoniePoint MFB\Card_Manager_Service_CMS_Specification.md
summary: "Technical specification of CMS, Moniepoint MFB's core card lifecycle management platform — originated from Resync source code, bridges Postilion switch and Kuwego CBA via PostBridge (ISO 8583), managing card production, activation, transactions, disputes for Verve, Mastercard, and Afrigo schemes."
---

## Summary

Technical specification of the Card Manager Service (CMS), Moniepoint MFB's core card lifecycle management platform. Originally built from Resync source code, CMS bridges Postilion (ACI card switch) and Kuwego CBA via PostBridge (ISO 8583 interchange). Manages card production, activation, transaction processing, limits, blocking, PIN management (HSM-integrated), disputes, and reversals for Verve, Mastercard, and Afrigo schemes. Deployed as 3 separate GKE instances.

## Key Points

- Originated from Resync source code partnership; currently evolved and maintained by Moniepoint Cards team
- PostBridge handles 54% of platform transactions (ISO 8583 interchange); March 2026 incident showed tight coupling
- Supported card schemes: Verve (507880, 507800002, 50612402074 BINs), Mastercard (516227), Afrigo (56402102)
- Capabilities: card production/issuance, virtual cards, digital cards (NFC/Tap to Pay), activation, blocking, PIN management, dispute resolution, reversals, lien management
- Three-instance deployment: Transient (Mainstream, Transaction) + Non-Transient (Admin) on `aptpay` namespace
- Active evolution: CMS Transaction Service extraction (Java 21), MJS→TAJS migration, Spanner migration (Q3 2026), Vault integration

## Entities Mentioned

- [[Damilare Ogunnaike]]

## Concepts

- [[Card Issuance Platform]], [[MasterCard Integration]]