---
title: Domestic Switching
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T16:42:45Z"
updated: "2026-04-19T16:42:45Z"
summary: "TeamApt's Enabler business line for domestic payment transaction routing — operates Juliana (Card Switch + Account Switch), 37% of Moniepoint terminal traffic, led by Babatunde Okufi, migrating to TSP orchestration layer in 2026."
---

## Overview

Domestic Switching is one of TeamApt's four core business lines, classified as an **Enabler** (alongside [[Third Party Processing]]). It provides the infrastructure for routing domestic payment transactions — card-based and account-to-account — across Nigerian banks and payment schemes.

Business lead: [[Babatunde Okufi]] (Head BD / BL Domestic Switching). Part of the Product Division under [[Frank Atashili]] (CPO/COO).

## Core System

[[Juliana]] is the domestic switching system, comprising two components:

- **Card Switch** — POS and ATM card transaction routing. 37% of Moniepoint terminal traffic routed via Juliana. 16 domestic issuers connected.
- **Account Switch** — Account-to-account transfer routing. 99.89% success rate. Target: ₦5M+ quarterly volume.

Juliana feeds [[TACHA]] for clearing and settlement. Will run in parallel with [[Transaction Switching Platform]] (TSP) during migration — TSP added as a sink/route target via feature-flagged routing.

## Revenue Model

Enabler tier — not a primary revenue driver. 2026 target: ₦5M+ quarterly Account Switch volume. T-Switch market share: 57% of inter-bank traffic (as of Apr 14, 2026).

## 2026 Strategic Context

Domestic Switching is one of the four businesses under the Product Division, alongside [[Direct Debit]], [[Monnify]], and [[Third Party Processing]]. The 2026 strategic focus is on migrating the switching layer to TSP — positioning TSP as the orchestration layer (Layer 2) while Juliana/T-Switch remains the switching layer (Layer 1). See [[TSP vs TeamApt Switch Analysis]].

Frank Atashili's Product Division OKRs include 7 division-level objectives across all 4 businesses; Domestic Switching carries its own OKR set.

## Key Metrics

- T-Switch inter-bank share: 57% (Apr 14, 2026)
- TeamApt card share: 35.68% (declining — watch trend)
- 16 Juliana Card Switch domestic issuers
- 37% of Moniepoint terminal traffic via Card Switch
- Account Switch success rate: 99.89%

## CBN Licensing

Domestic Switching operations are governed by CBN licensing. Specific license type: Switching and Processing License (held by TeamApt).

## Related Pages

- [[Juliana]] — the domestic switching system
- [[TeamApt T-Switch]] — switching infrastructure performance
- [[TACHA]] — clearing and settlement backbone
- [[Transaction Switching Platform]] — TSP migration target
- [[Third Party Processing]] — peer Enabler business
- [[Babatunde Okufi]] — business line lead
- [[Frank Atashili]] — Product Division owner
- [[source — TeamApt 2026 Business Context]]
- [[TeamApt_Businesses]]
