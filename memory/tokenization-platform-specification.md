---
title: Tokenization Platform Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Tokenization\01-SYSTEM-ARCHITECTURE-OVERVIEW.md
summary: Consolidated 9-part EMV-compliant payment tokenization system specification covering system architecture, EMVCo framework, Visa VTS integration, Mastercard MDES integration, cryptography, token lifecycle API, transaction switch module, use cases, and data model.
---

## Summary

Consolidated 9-part specification for EMV-compliant payment tokenization system integrating [[Mastercard]] MDES and [[Visa]] VTS. Covers system architecture, EMVCo framework (v2.3.1), Visa VTS integration, Mastercard MDES integration, cryptography and security, token lifecycle API, transaction switch module, use cases and flows, and data model/glossary.

## Key Points

### Architecture (Part 1)
- Core components: Token Vault, TSP Engine, Token Requestor Registry, Cryptographic Engine, Network Gateway, Notification Service, ID&V Module, Push Provisioning
- Token lifecycle states: ACTIVE, SUSPENDED, DEACTIVATED, EXPIRED

### EMVCo Framework (Part 2)
- Based on EMV Payment Tokenisation Specification v2.3.1
- Token data objects: 9F24 PAR, 9F19 Token Requestor ID, 9F25 Last 4 PAN
- 6 use cases: proximity, online wallet, in-app, CoF, guest checkout, TPSP

### Visa VTS (Part 3)
- TAVV cryptogram generation (HMAC-SHA256)
- JWE encryption: RSA-OAEP-256 + A256GCM
- Step-up methods: Call Center, Mobile App, OTP, 3DS, VACAT, FIDO

### Mastercard MDES (Part 4)
- Account Number Indicators (C/CC/F/H/HC)
- DSRP cryptogram validation
- DMS vs SMS processing modes
- Token-to-PAN mapping at network

### Cryptography (Part 5)
- HSM: FIPS 140-2 Level 3 requirements
- Key hierarchy: Token Master Key, Derivation Key, Cryptogram Key, PAN Encryption Key
- Token Vault encryption: AES-256-GCM

### Token Lifecycle API (Part 6)
- REST API: create, provision, activate, suspend, resume, deactivate, update, reissue, query, de-tokenize
- Bulk operations: suspension (card lost), deactivation (account closure)

### Transaction Switch Module (Part 7)
- Note: Content returned may not match expected file — possible server-side mismatch

### Use Cases (Part 8)
- 11 detailed transaction scenarios with complete message flows
- NFC proximity, card-on-file, merchant-initiated, guest checkout, in-app, TPSP, push provisioning, MoneySend

### Data Model (Part 9)
- ISO 8583 DE mapping (Mastercard/Visa)
- Token state machine, assurance levels, location codes
- 60+ term glossary
- PCI DSS/FIPS 140-2/NIST standards alignment

## Entities Mentioned

[[Visa]], [[Mastercard]], [[EMVCo]], [[Transaction Switching Platform]]

## Concepts

[[Payment Tokenization]], [[Card Scheme Integration]], [[Cryptography]]