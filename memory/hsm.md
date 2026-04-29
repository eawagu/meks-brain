---
type:
  - "entity"
title: HSM
aliases:
  - "Hardware Security Module"
created: "2026-04-23T05:24:49Z"
summary: "Hardware Security Module — dedicated crypto processor securing card keys across Moniepoint's card infrastructure; works alongside Postillion for card production and authorisation. Apr 27: Visa test keys loaded on HSM as part of issuer processing readiness."
updated: "2026-04-29T11:44:38Z"
cssclasses:
  - "entity"
---

## Overview

**HSM (Hardware Security Module)** is a dedicated cryptographic processor that secures card keys. Used throughout [[Moniepoint MFB]]'s Card Infrastructure and across the broader Moniepoint platform (TSP ISO 8583 stack also references an HSM component).

## Scope in MFB Cards

- Stores and manages cryptographic keys for card operations
- Works alongside [[Postillion]] for card production and authorisation
- Part of the Card Production chain

## Key Types Referenced

Per the [[Card Manager Service CMS Specification]] and Card Management System documentation, key types managed: KVP, CVK, IK, CAK, ECK, EMK, KWP.

## Recent activity

- **2026-04-27 ATPP standup**: [[Visa]] test keys **loaded on HSM** as part of issuer processing readiness; issuer public key certificate also generated this week. Source: [[ATPP Daily Standup 20260427 Gemini Notes]].

## Related

- [[Postillion]]
- [[Card Manager Service]]
- [[Card Management System]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[ATPP Daily Standup 20260427 Gemini Notes]]
