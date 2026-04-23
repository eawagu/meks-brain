---
type:
  - "entity"
title: Interswitch
aliases:
  - "InterSwitch"
created: 2026-04-11
summary: "Nigerian payment switching company \u2014 operates the Verve scheme and Postillion (ACI switch); Moniepoint MFB's legacy Card Manager Service bridges to Postillion via PostBridge (ISO 8583); primary target of Moniepoint's Postillion Elimination programme via the new Phoenix CMS; also a former employer of Emeka Awagu (2008\u20132020) and Ina Alogwu."
updated: "2026-04-23T05:40:40Z"
cssclasses:
  - "entity"
---

## Overview

Interswitch is a major Nigerian payment switching and processing company. It operates the [[Verve]] card scheme and [[Postillion]] (the ACI card switch). Domestic Visa POS transactions route through Interswitch/UPSL, bypassing TACHA.

## Moniepoint Integration

- Domestic Visa POS transactions route through Interswitch/UPSL
- ISW (Interswitch) referenced in incident reports as a processor for card transactions
- Operates [[Verve]] \u2014 the scheme at the center of the Q4 2025 [[Verve Pricing Dispute]]
- Operates [[Postillion]] \u2014 the ACI switch that [[Moniepoint MFB]]'s legacy [[Card Manager Service]] bridges to via PostBridge (ISO 8583)

## Strategic Tension \u2014 Postillion Dependency

[[Moniepoint MFB]] has a long-running strategy to reduce dependency on Interswitch / Postillion. Drivers:
- **Uptime** \u2014 Postillion outages translate directly into MFB card transaction failures
- **Feature rollout speed** \u2014 constrained by vendor-managed platform

The [[Postillion Elimination]] programme (primary strategic objective of the new Phoenix [[Card Management System]]) targets removal of this dependency \u2014 with [[Visa]] launching on the new CMS as the validation workload.

## Known Limitation (MFB Side)

The legacy Card Manager Service uses dummy account numbers on Postillion rather than real account numbers \u2014 currently blocks Interswitch from processing direct refunds by transfer.

## Mastercard Processing

Legacy MFB Mastercard (<300K cards outstanding, issuance halted) is processed through Interswitch.

## Positioning (2026 Retreat Day 1)

- Moniepoint leadership acknowledges Interswitch/Verve heritage but rejects current scheme-pricing tactics as rent-seeking.
- Asymmetric regulation: acquirers are price-capped and must-accept-all-schemes; schemes are not price-regulated.

## Personnel Connections

- [[Emeka Awagu]] \u2014 former employee (software engineer from 2008, later Head of Commerce & Digital Channels ~2016, departed 2020)
- [[Ina Alogwu]] \u2014 former employee (Risk Specialist from 2008, later Head of Product Strategy and Innovation ~2016)

## Sources

- [[Action Items Index]]
- [[Reference Letter for Ina Alogwu 9PSB Board]]
- [[Moniepoint 2026 Leadership Retreat UK - Day 1 Profitability Project Phoenix Kenya Launch - Summary]]
- [[Source \u2014 Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Card Manager Service CMS Specification]]