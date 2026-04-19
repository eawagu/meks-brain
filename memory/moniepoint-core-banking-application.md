---
title: Moniepoint Core Banking Application
type:
  - "concept"
cssclasses:
  - "concept"
aliases:
  - "CBA"
  - "Kuwego"
  - "Core Banking Application"
created: "2026-04-19T16:50:30Z"
updated: "2026-04-19T16:50:30Z"
summary: "Moniepoint MFB's internally developed core banking system — known as Kuwego; the primary ledger and account management platform, integrated with CMS via PostBridge (ISO 8583)."
---

## Overview

The Moniepoint Core Banking Application (CBA) is Moniepoint MFB's internally developed core banking system, referred to in technical documentation as **Kuwego**. It is the primary ledger and account management platform for [[Moniepoint MFB]].

## Integration with CMS

CBA integrates with the [[Card Management System]] (CMS) via [[PostBridge]] using ISO 8583 interchange. In the card processing flow:

- PostBridge routes card transactions from [[Postilion]] (ACI card switch) into CMS
- CMS communicates with Kuwego/CBA for account operations — balance checks, postings, reversals

This makes CBA the authoritative account ledger that card transactions ultimately settle against.

## Role in Phoenix Architecture

Within [[Project Phoenix]] / [[Card Issuance Platform]], the CBA remains a downstream dependency of the Spine services. The [[Authorization Engine]] and [[Card Management System]] (Phoenix) interface with CBA for ledger operations, maintaining the same integration boundary as the legacy CMS-to-Kuwego path.

## Related Pages

- [[Card Management System]] — CMS integrates with CBA via PostBridge
- [[PostBridge]] — ISO 8583 interchange layer between CMS and CBA
- [[Postilion]] — ACI card switch upstream of CMS
- [[Moniepoint MFB]] — the entity CBA serves
- [[Card Issuance Platform]] — Phoenix platform that depends on CBA
