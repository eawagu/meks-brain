---
title: Stand-in Processing
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: "Stand-in Processing is the Card Management System's fallback authorization mechanism — used when the issuer host (CBA) is unavailable — where the CMS approves or declines transactions based on available balance, velocity limits, or declines all, depending on the issuer's configured authorization type."
---

## Definition

Stand-in Processing is the fallback authorization logic triggered when the issuer host ([[CBA]]) is unavailable during a transaction. Rather than defaulting to decline-all, the [[Card Management System]] can approve transactions autonomously using pre-configured rules.

## Authorization Types Governing Stand-in

Configured per issuer in the [[Card Management System]]. Five types:

| Type | Stand-in Behavior |
|---|---|
| Full Authorisation | No stand-in — CMS is the primary decision maker |
| Full Authorisation with Advices | No stand-in — CMS + advisory messages |
| Balance Stand-in | CMS compares available balance to configured floor; approves if sufficient |
| Velocity Stand-in | CMS compares transaction to cumulative velocity limits; approves if within limits |
| No Stand-in | CMS declines all transactions when host unavailable |

## Configuration Boundary

The authorization **type** (which stand-in mode applies) is configured at the **issuer level** in Issuer Management. The stand-in **parameters** (balance floor, velocity limits) are configured at the **card program level** in Card Program Management — these are explicitly out of scope for Issuer Management.

## Design Tension

The authorization type configuration (in scope for [[003A_Issuer_Management_PRD_v1_5]]) and the stand-in parameter configuration (out of scope, belongs to Card Program PRD) represent a split that could cause confusion — the issuer-level type determines which stand-in mode activates, but the program-level parameters determine the approval thresholds.

## Sources

- [[003A_Issuer_Management_PRD_v1_5]] — Issuer Management PRD; authorization type config
- [[003_CMS_Core_Features_Overview_v1.0]] — CMS features overview
- [[001-CI_P-exec-overview_v1.1]] — executive overview
