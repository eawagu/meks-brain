---
title: Card Dispute Service
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-19T16:35:58Z"
updated: "2026-04-19T16:35:58Z"
summary: One of the five Spine services in the Card Issuance & Processing Platform — handles the full dispute lifecycle for cardholder transaction challenges, owned by Team 1 Card Processing under Project Phoenix.
---

## Overview

Card Dispute Service is one of five market-agnostic Spine services in the [[Card Issuance Platform]] under [[Project Phoenix]]. It handles the end-to-end dispute lifecycle for cardholder transaction challenges — from dispute initiation through resolution — across all supported markets (Nigeria, UK, Kenya).

Owned by [[Team 1 Card Processing]], alongside the [[Authorization Engine]] and [[3DS/SCA Service]]. SLA: Performance SLA (per CI&P platform standards).

## Role in the Platform

The five Spine services in the Card Issuance & Processing Platform are:
1. [[Authorization Engine]]
2. [[Card Management System]]
3. [[3DS/SCA Service]]
4. Card Dispute Service
5. EMV Data Preparation Platform

Card Dispute Service sits at the resolution end of the transaction trust surface — after authorization and authentication, dispute handling closes the cardholder protection loop.

## Architecture Context

Follows the Spine-and-Module pattern: the Spine service is market-agnostic; market-specific behaviour (scheme rules, compliance requirements, regional dispute timelines) is handled via module adapters. This allows the core dispute logic to be shared across Nigeria, UK, and Kenya deployments.

The existing CMS ([[Card Manager Service CMS Specification]]) handles disputes today via Postilion/Kuwego integration. Card Dispute Service is the Phoenix-architecture replacement/successor within the platform Spine.

## Related Pages

- [[Card Issuance Platform]] — parent platform
- [[Project Phoenix]] — programme context
- [[Team 1 Card Processing]] — owning team
- [[Authorization Engine]] — upstream Spine service
- [[3DS/SCA Service]] — upstream Spine service
- [[Card Management System]] — existing CMS that currently handles disputes
- [[Card Issuance Platform Executive Overview]] — source
