---
title: Visa VIP System Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Visa\00-INDEX.md
summary: Consolidated 15-part VisaNet V.I.P. specification covering system architecture, ISO 8583 message format, transaction types, routing, STIP processing, security, settlement, and implementation checklist.
---

## Summary

Consolidated 15-part VisaNet V.I.P. specification (~165KB total). Comprehensive payment switching platform reference covering all aspects of [[Visa]] transaction processing.

## Key Points

### Architecture (Parts 0-1)
- VisaNet topology, dual-VIC redundancy, DEX/EAS connections
- BASE I (auth-only), SMS (full-service), BASE II (clearing), VSS (settlement)
- DMP vs SMP processing modes

### Message Format (Parts 2-3)
- ISO 8583-based with BCD packed format
- MTI classes: 01xx auth, 02xx financial, 03xx file, 04xx reversal, 05xx reconciliation
- 3-bitmap structure (primary/secondary/tertiary)

### Transaction Types (Parts 4-5)
- Complete catalog: POS, ATM, e-commerce, healthcare, prepaid, reversals
- MIT/CIT stored credential framework
- Mandatory/conditional field rules per message type

### Processing (Parts 6-8)
- Authorization → Financial → Reversal → Settlement pipeline
- STIP architecture with issuer-specified parameters
- Activity limits, velocity checks, Exception File controls
- Response code priority ranking

### Security (Part 9)
- CVV/iCVV/dCVV/CVV2/CAVV verification
- PIN verification (PVS)
- Encryption key management (AWK, IWK, DKE)

### Routing & Services (Parts 10-13)
- BIN-based routing, split routing (ATM/POS, PIN/No-PIN)
- Gateway services for non-Visa networks
- CPS chargeback protection, AVS, Visa Token Service, 3-D Secure
- Settlement via VSS, CPS TID matching

### Implementation (Part 14)
- Acquirer and issuer processing center checklists
- Dual-VIC connectivity mandatory
- Message type support matrix
- 15/30-day STIP advice recovery deadlines

## Entities Mentioned

[[Visa]], [[VisaNet]], [[Transaction Switching Platform]]

## Concepts

[[Card Scheme Integration]], [[ISO 8583 Messaging]], [[STIP Processing]], [[Payment Settlement]]