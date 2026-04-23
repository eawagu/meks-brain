---
title: Card Manager Service
type:
  - "entity"
cssclasses:
  - "entity"
aliases:
  - "Internal CMS"
  - "CMS Manager"
  - "Legacy CMS"
created: "2026-04-23T05:24:48Z"
updated: "2026-04-23T05:24:48Z"
summary: "Moniepoint MFB's legacy internal CMS — critical middleware between the card stack and the Core Banking Application; the platform being progressively migrated and ultimately replaced by the new Card Management System under Project Phoenix."
---

## Overview

Card Manager Service is the **legacy internal CMS** within [[Moniepoint MFB]]. It is the critical middleware connecting the card stack to the [[Core Banking Application]] (CBA / Kuwego) via [[Postillion]], owned operationally by [[Damilola Oyediran]]'s Card Infrastructure team and ultimately by [[Olufemi Davies]].

For the deeper technical specification — Resync origin, ISO 8583 PostBridge interchange, supported BIN ranges, three-instance GKE deployment, active subsystem extractions — see [[Card Manager Service CMS Specification]].

## Key Functions

- Card blocking and unblocking
- Account-to-card linking
- Transaction routing
- Bridge from internal card stack to Postillion / Interswitch and to CBA

## Known Limitations

- Uses a **dummy account number** on Postillion rather than the real account number, which currently prevents [[Interswitch]] from processing direct refunds by transfer.

## Migration Path (Project Phoenix)

Per the 2026-04-21 KT:
- Core card management functions in this service will be **migrated progressively** to the new [[Card Management System]] under the [[Card Issuance & Processing Platform]].
- The new CMS is the platform-built replacement; the **primary strategic objective is to eliminate [[Postillion]] dependency** via the new CMS.
- Tracy Ojaigho confirmed (with Damilola and [[Mish]]) that most functions currently in this service logically belong inside the new CMS.
- Visa is the launch workload for the new CMS; phased cut-over later in 2026 once stability is confirmed.

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Card Manager Service CMS Specification]]