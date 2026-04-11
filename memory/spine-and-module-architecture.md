---
title: Spine and Module Architecture
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: The Spine and Module Architecture is a platform design pattern used in Project Phoenix where a market-agnostic shared Spine handles core business logic while independently deployable market-specific Modules contain all localisation — enabling new market launches without modifying the Spine.
---

## Definition

The Spine and Module Architecture is the governing design pattern of [[Project Phoenix]]. The **Spine** (Layer 2) is the shared, market-agnostic platform — common business logic, services, and orchestration that works identically across all markets. The **Module** (Layer 3) is the market-specific adapter layer — scheme connectors, EMV data preparation, personalisation vendor adapters, 3DS/SCA protocol implementations, BIN configuration — one module per market, independently deployable.

The core invariant: "Adding a new market means adding a Module; the Spine requires no changes."

## Layer Structure

| Layer | Name | Description |
|---|---|---|
| Layer 1 | TSP | Transaction Switching & Processing — foundational payment kernel; all fund movement |
| Layer 2 | Spine | Shared platform services — Authorization Engine, Card Management, 3DS/SCA, Dispute, EMV Data Prep |
| Layer 3 | Module | Market-specific adapters and config — one per market, independently deployable |

## Why It Matters

This pattern separates what is universal (authorization logic, card lifecycle, dispute management) from what is local (scheme protocols, regulatory compliance, vendor integrations). The payoff compounds with each new market: the Spine is proven once in Nigeria, then all subsequent markets inherit a battle-tested platform and only need to build their Module.

## Market Modules

- **Nigeria Module** — Verve and Visa adapters, personalisation vendor, BIN/config
- **UK Module** — Visa/Mastercard adapters, PSD2-compliant SCA adapter
- **Kenya Module** — Visa adapter, config

## Design Tensions

- **Spine immutability claim vs. regulatory change risk** — document asserts Spine is unchanged per new market, but future regulations requiring Spine-level behavioral changes (new audit requirements, new approval algorithms) could force this boundary to shift.
- **PSD2 as Module adapter** — UK PSD2/SCA requirements are delivered as a Module adapter, not a Spine change, supporting the pattern's validity. But the Spine's 3DS/SCA Service must be generic enough to accommodate these adapters.

## Sources

- [[001-CI_P-exec-overview_v1.1]] — executive overview; primary architectural exposition
- [[002-CI_P_Platform_Team_Structure_v1_6]] — team ownership of Spine services and Module adapters
