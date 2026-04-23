---
type:
  - "entity"
title: Dispute Management Service
created: "2026-04-23T05:24:49Z"
summary: End-to-end customer-logged card dispute handling in Moniepoint MFB — receives from mobile app, checks against IDS/AITA, routes, communicates status; roadmap includes Verve Online and Mastercard Chargeback integration.
updated: "2026-04-23T05:35:45Z"
cssclasses:
  - "entity"
---

## Overview

**Dispute Management Service** handles end-to-end customer-logged card disputes inside [[Moniepoint MFB]]'s Card Infrastructure stack.

## Scope

- Receives disputes from the mobile app
- Checks disputes against [[IDS]] (Internal Dispute System) / [[AITA]]
- Routes to the appropriate resolution path
- Communicates status back to the customer

## Roadmap

Integration expansion planned to cover international dispute rails:
- Verve Online
- Mastercard Chargeback

## Operational Relationship

The [[Chargeback and Issue Resolution]] sub-team (led by [[Aima]] / [[Precious]]) performs the human-in-the-loop chargeback processing that feeds into this service. This workflow is the **highest-priority AI automation target** for the CI&P strike team.

## Ownership

Owned by Team 2 (Card Infrastructure) under PM [[Damilola Oyediran]].

## Related

- [[Card Dispute Service]] — the Phoenix Spine equivalent
- [[Chargeback and Issue Resolution]]
- [[Aima]]
- [[Precious]]
- [[IDS]]
- [[AITA]]
- [[Damilola Oyediran]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]