---
title: ACS
type:
  - "concept"
cssclasses:
  - "concept"
aliases:
  - "Access Control Server"
created: "2026-04-23T05:30:10Z"
updated: "2026-04-23T05:30:10Z"
summary: "Access Control Server — 3D Secure authentication service for CNP card transactions; Moniepoint MFB's previous provider (Vicas) discontinued due to cost; replacement provider discussions in progress as part of Visa Tokenization & VAS roadmap."
---

## Overview

Access Control Server (ACS) is the 3D Secure authentication service for online (card-not-present) card transactions — it decides whether to challenge the cardholder (OTP, biometric) and issues the authentication result back to the acquiring side.

## Moniepoint MFB Usage

- Previous ACS provider: [[Vicas]] — **discontinued due to cost**
- Replacement provider discussions: **in progress** as part of the 2026 Visa Tokenization & VAS roadmap
- [[Card OTP Service]] designed to be extensible to support 3DS / ACS (alongside current Safe Token)
- ACS scope sits within the deferred VAS team's responsibilities — currently under [[Card Infrastructure Team]]

## Phoenix Platform Role

In the [[Card Issuance & Processing Platform]], the equivalent issuer-side cardholder authentication capability is the [[3DS/SCA Service]] owned by [[Team 1 Card Processing]].

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]