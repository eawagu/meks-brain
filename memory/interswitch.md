---
type:
  - "entity"
title: Interswitch
aliases:
  - "InterSwitch"
created: 2026-04-11
summary: Nigerian payment switching company — owns Postillion (the switch Moniepoint MFB is strategically migrating away from) and operates Verve; legacy Mastercard processing route; also a former employer of Emeka Awagu and Ina Alogwu.
updated: "2026-04-23T05:24:50Z"
cssclasses:
  - "entity"
---

## Overview

Interswitch is a major Nigerian payment switching and processing company. It operates the [[Verve]] card scheme and owns the [[Postillion]] payment switch. Domestic Visa POS transactions route through Interswitch/UPSL, bypassing TACHA.

## Moniepoint Integration

- Domestic Visa POS transactions route through Interswitch/UPSL
- ISW (Interswitch) referenced in incident reports as a processor for card transactions
- Owns [[Postillion]] — the switch the new [[Card Management System]] under [[Project Phoenix]] is explicitly designed to eliminate dependency on (per 2026-04-21 KT)
- Also routes [[Moniepoint MFB]]'s legacy [[Mastercard]] traffic (issuance halted, <300K outstanding)
- Operates [[Verve]] — the scheme at the center of the Q4 2025 [[Verve Pricing Dispute]]

## Strategic Tension

- Moniepoint MFB has a **deliberate strategy to reduce dependency on Interswitch** — motivated by uptime and feature-rollout speed.
- The new platform-built CMS under [[Project Phoenix]] is the structural mechanism for this exit.
- [[Card Manager Service]] limitation: uses dummy account number on Postillion, blocking Interswitch direct refunds by transfer.

## Positioning (2026 Retreat Day 1)

- Moniepoint leadership acknowledges Interswitch/Verve heritage but rejects current scheme-pricing tactics as rent-seeking.
- Asymmetric regulation: acquirers are price-capped and must-accept-all-schemes; schemes are not price-regulated.

## Personnel Connections

- [[Emeka Awagu]] — former employee (software engineer from 2008, later Head of Commerce & Digital Channels ~2016, departed 2020)
- [[Ina Alogwu]] — former employee (Risk Specialist from 2008, later Head of Product Strategy and Innovation ~2016)

## Sources

- [[Action Items Index]]
- [[Reference Letter for Ina Alogwu 9PSB Board]]
- [[Moniepoint 2026 Leadership Retreat UK - Day 1 Profitability Project Phoenix Kenya Launch - Summary]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]