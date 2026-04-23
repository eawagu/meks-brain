---
type:
  - "entity"
title: Interswitch
aliases:
  - "InterSwitch"
created: 2026-04-11
summary: "Nigerian payment switching company — operates Verve and Postillion; target of Moniepoint Postillion Elimination via Phoenix CMS. Apr 23 D2B: direct debit fixes validated by Ghanaian test team; 3 remaining issues under work; in-house E2E test scheduled tomorrow."
updated: "2026-04-23T14:43:36Z"
cssclasses:
  - "entity"
---

## Overview

Interswitch is a major Nigerian payment switching and processing company. It operates the [[Verve]] card scheme and [[Postillion]] (the ACI card switch). Domestic Visa POS transactions route through Interswitch/UPSL, bypassing TACHA.

## Moniepoint Integration

- Domestic Visa POS transactions route through Interswitch/UPSL
- ISW (Interswitch) referenced in incident reports as a processor for card transactions
- Operates [[Verve]] — the scheme at the center of the Q4 2025 [[Verve Pricing Dispute]]
- Operates [[Postillion]] — the ACI switch that [[Moniepoint MFB]]'s legacy [[Card Manager Service]] bridges to via PostBridge (ISO 8583)

## Direct Debit Integration

**2026-04-23:** Interswitch direct debit had fixes applied to raised bugs, and testing conducted by the Ghanaian team validated many fixes successfully. Three remaining issues are actively being worked on and will be reviewed and tested today, with plans for an in-house end-to-end test scheduled for tomorrow (Apr 24). Source: [[note_2026-04-23T13-53-37-857Z]].

## Strategic Tension — Postillion Dependency

[[Moniepoint MFB]] has a long-running strategy to reduce dependency on Interswitch / Postillion. Drivers:
- **Uptime** — Postillion outages translate directly into MFB card transaction failures
- **Feature rollout speed** — constrained by vendor-managed platform

The [[Postillion Elimination]] programme (primary strategic objective of the new Phoenix [[Card Management System]]) targets removal of this dependency — with [[Visa]] launching on the new CMS as the validation workload.

## Known Limitation (MFB Side)

The legacy Card Manager Service uses dummy account numbers on Postillion rather than real account numbers — currently blocks Interswitch from processing direct refunds by transfer.

## Mastercard Processing

Legacy MFB Mastercard (<300K cards outstanding, issuance halted) is processed through Interswitch.

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
- [[Card Manager Service CMS Specification]]
- [[note_2026-04-23T13-53-37-857Z]]