---
type:
  - "entity"
title: Postillion
aliases:
  - "Postilion"
  - "PostCard"
created: "2026-04-23T05:24:48Z"
summary: External ACI card switch owned by Interswitch; used by Moniepoint MFB for card production and authorisation via PostBridge ISO 8583 (~54% of transactions); primary strategic objective of the new Phoenix CMS is to eliminate Postillion dependency. 2026-04-27 CI&P kick-off reaffirmed strangler-pattern migration approach.
updated: "2026-04-28T16:43:51Z"
cssclasses:
  - "entity"
---

## Overview

**Postillion** (often spelled "Postilion") is the external ACI card payment switch owned/operated by [[Interswitch]]. Used by [[Moniepoint MFB]] for card production and authorisation.

## Position in the MFB Cards Stack

The legacy [[Card Manager Service]] bridges the Moniepoint MFB card system to Postillion via **PostBridge** (ISO 8583 interchange). PostBridge handles approximately 54% of platform transactions.

## Strategic Tension

A deliberate long-running strategy has been in place to **reduce dependency on Interswitch / Postillion** in order to:
- Improve uptime
- Speed up feature rollouts

The **primary strategic objective of the new [[Card Management System]]** under [[Project Phoenix]] is to **eliminate Postillion dependency entirely**. The [[Visa]] programme launch on the new CMS will be the first validation of this separation.

## 2026-04-27 — CI&P Kick Off reaffirmation

The formal CI&P kick-off meeting reaffirmed the migration approach against Postillion: a [[Strangler Pattern]] build of parallel capabilities in the new platform while Postillion remains in production. External traffic gradually routes to the new platform; legacy Postillion is eventually decommissioned. Phase One success criterion is processing **10% of production volume** with zero tolerance for data loss or transaction discrepancies.

Source: [[Project Phoenix - CI&P kick off meeting - 2026-04-27]].

## Known Limitation

The Card Manager Service uses dummy account numbers on Postillion rather than real account numbers — currently blocks [[Interswitch]] from processing direct refunds by transfer.

## Related

- [[Interswitch]]
- [[Card Manager Service]]
- [[Card Manager Service CMS Specification]]
- [[Card Management System]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Project Phoenix - CI&P kick off meeting - 2026-04-27]]
