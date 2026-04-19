---
title: Platform Architecture
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T17:03:05Z"
updated: "2026-04-19T17:03:05Z"
summary: "The technical architecture implementing Moniepoint's Platform Strategy — microservices, API-first, event-driven, config-driven; 6-cluster Phoenix structure; Spine-and-Module pattern for market-agnostic services with market-specific adapters."
---

## Overview

Platform Architecture is the technical architecture enacting Moniepoint's [[Platform Strategy]] under [[Project Phoenix]]. Governs how platform capabilities are structured, integrated, and extended across markets.

## Core Architectural Principles

- **Microservices** — small, independently deployable services with clear ownership
- **API-first** — stable contract-based integration
- **Event-driven** — async messaging as primary integration pattern
- **Config-driven** — market-specific behavior expressed in configuration, not code

## Phoenix 6-Cluster Structure

Project Phoenix organizes platform capabilities into 6 clusters per Tosin's v3 architecture. Each cluster has:
- Defined capability scope
- Ownership framework
- Integration contracts with adjacent clusters

## Spine-and-Module Pattern

Applied within the [[Card Issuance Platform]] (Layer 2):
- **Spine** — market-agnostic core services (Authorization Engine, CMS, 3DS/SCA Service, Card Dispute Service, EMV Data Preparation)
- **Modules** — market-specific adapters for card schemes, compliance, personalization vendors

The pattern generalizes to other Phoenix clusters: capability cores are shared; market differentiation lives in adapters and configuration.

## Layered Architecture

3-layer model applied to the switching stack (see [[TSP vs TeamApt Switch Analysis]]):
1. **Product Experience** (Layer 3)
2. **Fund Movement / Orchestration** (Layer 2) — owned by [[Transaction Switching Platform]]
3. **Switching** (Layer 1) — owned by TeamApt Transaction Switch / [[Juliana]]

## Related

- [[Platform Strategy]] — the strategic framing
- [[Project Phoenix]] — the programme enacting it
- [[Card Issuance Platform]] — Layer 2 Spine-and-Module example
- [[Transaction Switching Platform]] — Layer 2 orchestration
- [[TSP vs TeamApt Switch Analysis]] — layer decomposition
- [[source — Platform Strategy and Vision]]