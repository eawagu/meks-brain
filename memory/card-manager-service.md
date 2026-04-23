---
type:
  - "entity"
title: Card Manager Service
aliases:
  - "Internal CMS"
  - "CMS Manager"
  - "Legacy CMS"
created: "2026-04-23T05:24:48Z"
summary: "Moniepoint MFB's legacy internal CMS — critical middleware between cards and Core Banking via Postilion + PostBridge; being replaced by the new Phoenix Card Management System with the primary objective of eliminating Postillion dependency."
updated: "2026-04-23T05:35:45Z"
cssclasses:
  - "entity"
---

## Overview

**Card Manager Service** is [[Moniepoint MFB]]'s legacy internal Card Management System — the critical middleware that sits between the card system and the [[CBA|Core Banking Application]]. It bridges the Postilion switch and Kuwego CBA via PostBridge (ISO 8583).

This is the system the **new [[Card Management System]]** under [[Project Phoenix]] is being built to replace.

## Core Functions

- Card blocking / unblocking
- Account-to-card linking
- Transaction routing
- Card production / issuance
- Virtual and digital card support (NFC / Tap to Pay)
- Activation, PIN management, dispute resolution, reversals, lien management

## Known Limitations

- Uses **dummy account numbers** on [[Postillion]] rather than real account numbers — currently blocks [[Interswitch]] from processing direct refunds by transfer.
- Tight coupling to Postilion: PostBridge handles ~54% of platform transactions (ISO 8583 interchange); March 2026 incident exposed the coupling.

## Supported Card Schemes

- [[Verve]] (BINs 507880, 507800002, 50612402074)
- [[Mastercard]] (BIN 516227)
- [[Afrigo]] (BIN 56402102)

## Deployment

Three GKE instances on the `aptpay` namespace:
- Transient Mainstream
- Transient Transaction
- Non-Transient Admin

Active evolution tracks: CMS Transaction Service extraction (Java 21), MJS→TAJS migration, Spanner migration (Q3 2026), Vault integration.

## Origin

Originated from Resync source code; currently evolved and maintained by the Moniepoint MFB Cards Infrastructure team (Team 2 — under PM [[Damilola Oyediran]], EM [[Nitish Chand]]).

## Position Under Phoenix

**Primary strategic objective of the new CMS: eliminate Postillion dependency** (and therefore the reliance on this legacy service). A prior working session between [[Tracy Ojaigho]], [[Damilola Oyediran]], and [[Mish]] concluded that most functions currently handled outside the legacy CMS (by Card Manager Service) logically belong inside the new Phoenix CMS.

Migration strategy: [[Visa]] programme serves as launch vehicle; core functions (blocking, account-to-card linking, etc.) migrated progressively; phased cut-over later in the year once stability confirmed.

## Related

- [[Card Manager Service CMS Specification]] — full technical specification document
- [[Card Transaction Service]] — companion transaction-processing middleware
- [[Postillion]] — external switch this service bridges to
- [[Card Management System]] — Phoenix replacement
- [[Damilola Oyediran]]
- [[Nitish Chand]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]