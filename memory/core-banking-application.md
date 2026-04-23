---
title: Core Banking Application
type:
  - "entity"
cssclasses:
  - "entity"
aliases:
  - "CBA"
  - "Kuwego"
created: "2026-04-23T05:30:09Z"
updated: "2026-04-23T05:30:09Z"
summary: The ledger / accounts / balances system in the Moniepoint stack (Kuwego in Moniepoint MFB) — bridged by Card Manager Service in the legacy MFB stack; read-only dependency for the Authorization Engine in the Phoenix platform with all fund movement mediated through TSP.
---

## Overview

Core Banking Application (CBA) is the ledger / accounts / balances system in the [[Moniepoint]] stack. In [[Moniepoint MFB]] it is **Kuwego** (per [[Card Manager Service CMS Specification]]).

## Role in the Card Stack

### Legacy MFB Stack
- [[Card Manager Service]] is the **critical middleware** connecting the card system to the CBA (Kuwego) — via [[Postillion]] and PostBridge (ISO 8583).
- Account-to-card linking, card blocking, transaction routing all bridge through Card Manager Service to CBA.

### Phoenix Platform
- The [[Card Issuance & Processing Platform]] has **medium coupling** to CBA — read-only balance queries by the [[Authorization Engine]].
- CI&P never posts directly to CBA; all fund movement flows through [[TSP]], which constructs the appropriate CBA journal entries. This is a hard architectural boundary.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Card Manager Service CMS Specification]]
- [[Card Issuance Platform Executive Overview]]