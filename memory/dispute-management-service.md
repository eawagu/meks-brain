---
title: Dispute Management Service
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-23T05:24:49Z"
updated: "2026-04-23T05:24:49Z"
summary: Handles customer-logged card disputes end-to-end in Moniepoint MFB — receives from mobile app, checks against IDS/AIT, routes to resolution path, and communicates status; future expansion to international rails (Verve Online, Mastercard Chargeback).
---

## Overview

Dispute Management Service handles customer-logged card disputes end-to-end within the [[Moniepoint MFB]] card stack. Operated in practice by the Chargeback & Issue Resolution sub-team ([[Aima]] / [[Precious]]); platform ownership under Card Infrastructure ([[Damilola Oyediran]]).

## End-to-End Flow

1. Receives dispute from the MoniePoint mobile app
2. Checks against IDS / AIT
3. Routes to the appropriate resolution path
4. Communicates status back to the customer

## Future Roadmap

Integration expansion to cover **international dispute rails**:
- Verve Online
- [[Mastercard]] Chargeback

## AI Automation Priority

The Chargeback & Issue Resolution team that operates this service is the **highest-priority AI automation target** for the strike team forming under [[Tracy Ojaigho]] — automated dispute intake, routing, status communication.

## Relationship to Phoenix Card Dispute Service

The Phoenix-architecture replacement / successor at platform Spine level is [[Card Dispute Service]], owned by [[Team 1 Card Processing]].

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]