---
title: MasterCard Overview and Architecture
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MasterCard\01-overview-and-architecture.md
summary: Technical specification for MasterCard Transaction Switching Platform — covering architecture (MIP, Stand-In, Gateways), DMS/SMS processing models, authentication (PIN, CVV, EMV, 3DS, tokenization), and 24/365 availability requirements.
---

## Summary

First in a series of 19 [[MasterCard]] technical specification documents. Covers the real-time authorization and transaction processing architecture: MasterCard Interface Processor (MIP) at customer premises, central switching hub, Stand-In system for fallback authorization, and Gateways for non-MasterCard programs. Defines Dual Message System (DMS) and Single Message System (SMS) processing, and key capabilities including PIN/CVV/EMV/3DS authentication, tokenization, currency conversion, and resilience.

## Key Points

- MIP is the primary hardware/software interface at acquirer or issuer premises — handles message translation, validation, and connectivity to MasterCard Network
- Stand-In System provides automated fallback authorization when issuer is unavailable — uses historical data and predefined rules
- DMS: separate authorization (0100/0110) and financial (0200/0210) messages — used for credit, charge, CNP transactions
- SMS: combined auth+financial in single exchange (0200/0210) — used for PIN debit, prepaid, immediate posting
- ISO 8583-1987 message format standard
- Uptime target: 99.99%, response time 200-500ms, failover to stand-in within 5-10 seconds
- Authentication: PIN, CVV/CVC, EMV chip (TC/AAC/AAD), 3DS (full + frictionless), tokenization (HVT, device, issuer, acquirer tokens)
- Card brands: MasterCard, Debit MasterCard, Maestro, Cirrus + non-MC via gateways
- Two access methods per side: direct MIP connection or via processor/INF

## Entities Mentioned

- [[MasterCard]]

## Concepts

- [[Transaction Switching]] — MasterCard's core switching architecture and message routing
- [[Tokenisation]] — payment token generation as part of secure data handling
- [[Card Issuance]] — issuer processing and authorization decision rendering