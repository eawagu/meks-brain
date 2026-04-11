---
title: 3DS/SCA Service
type:
  - "entity"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "entity"
summary: The 3DS/SCA Service is the issuer-side cardholder authentication service within the Card Issuance & Processing Platform, owned by Team 1 Card Processing, that orchestrates challenge flows for card-not-present transactions via market module adapters before authorization proceeds.
---

## Overview

The 3DS/SCA Service is the issuer-side cardholder authentication service within [[Project Phoenix]] / [[Card Issuance & Processing Platform]], owned by [[Team 1 Card Processing]]. It handles all card-not-present (CNP) authentication — orchestrating the challenge flow via market module adapters and passing the authentication result to the [[Authorization Engine]] before authorization proceeds.

## Role in Transaction Flow

Card-not-present transactions follow this sequence:
1. Transaction arrives at [[Authorization Engine]]
2. [[Authorization Engine]] gates on 3DS/SCA authentication
3. **3DS/SCA Service** orchestrates challenge flow (biometric or OTP) via market module adapter
4. Auth result passed to [[Authorization Engine]]
5. Authorization decision made

The 3DS/SCA Service does NOT skip this gate — CNP authorization cannot proceed until authentication completes.

## Market Module Adapters

Market-specific SCA implementations are delivered as module adapters, not Spine changes:
- **UK Module** — PSD2-compliant SCA adapter (regulatory mandate)
- Other markets — scheme-specific authentication implementations

The Spine's 3DS/SCA Service provides the shared orchestration framework; modules provide the protocol-specific implementations.

## Key Dependency

- [[Payment Gateway]] — key dependency for passing auth result before authorization proceeds

## SLA

Card Processing SLA (shared with [[Authorization Engine]]).

## Sources

- [[001-CI_P-exec-overview_v1.1]] — executive overview
- [[002-CI_P_Platform_Team_Structure_v1_6]] — team ownership and service responsibilities
