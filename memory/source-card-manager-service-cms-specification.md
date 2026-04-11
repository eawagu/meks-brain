---
title: Source Card Manager Service CMS Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Card Issuance Platform\Existing\Card-Manager-Service-CMS-Specification.md
summary: System specification for the existing Card Manager Service (CMS) at Moniepoint MFB — the core card lifecycle platform bridging Postilion switch and Kuwego CBA via PostBridge ISO 8583, managed by the Cards Infrastructure team under Femi Davies.
---

## Summary

Comprehensive specification of Moniepoint MFB's existing [[Card Management System]] (Card Manager Service). CMS sits between [[PostBridge]] (ISO 8583 interchange) and Kuwego CBA (core banking), managing the full card lifecycle: issuance, activation, transaction processing, dispute resolution, and deactivation. Deployed as 3 Kubernetes instances (Mainstream, Transaction, Admin) on GCP. [[PostBridge]] routes ~54% of platform transactions. Being modernized: transaction service split (Java 21, Spring Boot 3.5), event-driven architecture, Spanner migration planned Q3 2026.

## Key Points

- CMS bridges Postilion (ACI card switch) and Kuwego CBA via [[PostBridge]] ISO 8583
- Card schemes: Verve (507880), MasterCard (516227), Afrigo (56402102) — no Visa BIN listed
- Deployed in `aptpay` namespace: 3 instances (Mainstream 2 pods, Transaction 1 pod, Admin 1 pod), 2 CPU / 12Gi RAM each, MySQL primary DB
- PostBridge incident (Mar 2026): invalid `card_bin` entry caused CrashLoopBackOff, taking down 54% of transactions — demonstrates tight coupling
- Modernization: CMS Transaction Service split, TAJS event-driven arch, Spanner DB migration (Phase 3, Q3 2026), Vault integration, HPA POC
- Separate Resync-based replacement CMS exists (Chris Esumeh, documented in ATP space) — distinct from this Card Manager Service
- Team: [[Femi Davies]] (Head of Cards/BL), Damilola Oyediran (TPM), Nitish Chand (EA/tech lead)
- Dependencies: Kuwego CBA, Postilion, PostBridge, HSM, [[Interswitch]], Cosmos Control, BigTable, Redis, Kafka, MySQL

## Entities Mentioned

- [[Card Management System]], [[PostBridge]], [[Interswitch]], [[Moniepoint]]
- [[Femi Davies]], [[Tracy Ojaigho]], [[Kevin NgEno]]
- [[Project Phoenix]]

## Concepts

- [[Card Issuance]] — full lifecycle from production to deactivation
- [[Transaction Switching]] — PostBridge as ISO 8583 interchange layer