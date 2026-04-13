---
type:
  - "entity"
title: Juliana
created: 2026-04-11
summary: "TeamApt's domestic switching system — Card Switch (37% of Moniepoint POS, 16 domestic issuers) and Account Switch (99.89% success rate); feeds TACHA for clearing/settlement; part of Domestic Switching department under Babatunde Okufi."
updated: "2026-04-13T23:21:47Z"
cssclasses:
  - "entity"
aliases:
  - "Juliana Card Switch"
  - "Juliana Account Switch"
  - "Consolidated Switch"
---

## Overview

Juliana is [[TeamApt]]'s domestic switching system, comprising two main components: **Card Switch** (POS/ATM card transaction routing) and **Account Switch** (account-to-account transfer routing). Part of the Domestic Switching department led by [[Babatunde Okufi]]. Currently fronts [[NIBSS]] and banks; will run in parallel with TSP during migration, with TSP added as a sink/route target via feature-flagged routing.

## Card Switch

Handles domestic POS and ATM card transaction routing. Originally called "Consolidated Switch" in 2024 when it was the best-performing new product — exceeded targets with 10 issuers (vs 7 target) and 2 domestic processors (Interswitch, UPSL).

**2025 performance:** 37% of [[Moniepoint]] POS traffic routed via Juliana (target was 70%). 16 domestic issuers connected. TACHA beta released for centralized clearing.

Card Switch is a TACHA platform consumer (consumer group: JULIANA_SWITCH). Owns card-present (POS) and card-not-present (web) dispute lifecycles.

## Account Switch

Handles account-to-account transfer routing via ATS (Account Transfer System). 

**2025 performance:** 99.89% transaction success rate. Only 2 of 10 targeted NSS banks operational. NSS centralization planned — Account Switch to submit DR/CR entries to [[TACHA]], decommissioning separate Smart Det generation.

Account Switch is a separate TACHA platform consumer (consumer group: ACCOUNT_SWITCH).

## Systems

- **Juliana** — the switching engine itself
- **ATS** — Account Transfer System
- **[[TACHA]]** — centralized clearing and settlement (receives transactions from both Card and Account Switch)
- **NSS** — NIBSS Settlement System integration

## Key Relationships

- [[TACHA]] — clearing/settlement backbone; Juliana is a platform consumer
- [[CoralPay]] — switch-to-switch routing partner providing indirect connectivity for FirstBank, Zenith, Providus, Unity
- [[HabariPay]] — switch-to-switch partner providing GTBank indirect connectivity
- [[Moniepoint MFB]] — largest customer by volume (37% POS traffic); PTSP services (₦150M monthly activations, ₦1.6B monthly fees)
- [[NIBSS]] — NSS integration for interbank settlement
- [[Interswitch]] / UPSL — connected domestic processors

## 2024 Performance

Originally launched as "Consolidated Switch" — best-performing new product in 2024. Achieved 10 issuers (exceeded 7 target), connected 2 domestic processors. Sprint velocity 75% (vs 100% target).

## 2025 Performance

Card Switch: 37% of Moniepoint POS (vs 70% target). Account Switch: 99.89% success rate. Only 2/10 NSS banks operational. TACHA beta released.

## Migration Context

Will run in parallel with TSP during [[Project Phoenix]] migration, with TSP added as a sink/route target via feature-flagged routing. See [[TSP Pending Decisions]].

## Sources

[[TeamApt_2024_Business]], [[TeamApt_2025_Business]], [[TeamApt_Businesses]], [[TeamApt_Customer_Registry]], [[TACHA_Architecture_and_Scheduled_Jobs]], [[TACHA_Reversal_Refund_Dispute_Management]], [[TSP Pending Decisions]]