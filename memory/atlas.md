---
title: Atlas
type:
  - "entity"
cssclasses:
  - "entity"
aliases:

created: "2026-04-28T11:50:15Z"
updated: "2026-04-28T11:50:15Z"
summary: "Moniepoint's internal integration switch for account-to-account fund transfers — built under Damilare Ogunnaike's Monnify organization; routes to 13+ external providers; approaching 500M tx/month; identified as MFB Systems Blindspot in Project Phoenix planning."
---

## Overview

Atlas is [[Moniepoint]]'s internal integration switch and gateway for processing account-to-account fund transfers. It centralizes inter-bank and intra-bank transfer operations by routing to 13+ external providers, sitting in [[Moniepoint MFB]]'s parallel infrastructure stack alongside [[Iris]] (reconciliation) and the legacy Cards stack ([[Postillion]], CMS Manager, [[Aptent]]).

Built by and operates under [[Damilare Ogunnaike]]'s [[Monnify]] organization.

## Scale

- **Approaching 500M transactions/month**
- Target >97% success rate; p95 latency <30s
- Deployed on Kuwego cluster (Monnify instance, separate from other Moniepoint clusters)
- Spanner migration on roadmap for infinite scale

## Provider Routing

Atlas routes to 13+ transfer providers:

- [[NIBSS]] / NIP
- [[Interswitch]]
- Hydrogen
- [[HabariPay]]
- [[CoralPay]]
- E-Tranzact
- Palmpay
- Direct bank integrations

Provider routing is currently **manual**; auto-routing is on the roadmap.

## Architecture

- **Double-entry accounting via CBA per transfer**: JP1 (initiation) + JP2 (settlement) journal pairs
- **Two-tier fee model**: Provider Fee (configured, automatic) + Client Fee (Beneficiary, client-controlled)
- **APIs**: REST API v1, v2, v3; `atlas-client-lib` Java JAR wrapper available
- **Authentication**: OAuth 2.0 client credentials
- **Middleware integration**: [[Modify Atlas Integration Service|MAIS]] (Monnify Atlas Integration Service) sits between Atlas and the Disbursement and Settlement services

## Distinct From

- **[[Modify Atlas Integration Service]] (MIS/MAIS)** — narrower middleware service that orchestrates the disbursement transaction flow (debit-source → transfer → async settlement) between the Disbursement service and CBA. MIS is downstream of Atlas, not Atlas itself.
- **[[ATS]]** (Automated Transfer System) — Moniepoint's bank-to-bank transfer routing layer, distinct from Atlas. ATS appears in CEO Gazette weekly performance signals; Atlas is the deeper internal switch.

## Project Phoenix Context

Atlas is one of the systems flagged in the **MFB Systems Blindspot** analysis (March 2026) — Moniepoint MFB operates parallel infrastructure that initial Phoenix platform specs did not map. Atlas, alongside [[Iris]] (15–27B+ tx/month reconciliation), represents non-trivial transfer/reconciliation surface area Phoenix planning must absorb.

No migration plan to Phoenix platforms exists for Atlas as of the blindspot analysis.

## Personnel

- [[Damilare Ogunnaike]] — Monnify business owner, owns Atlas
- [[Himanshu Gautam]] — engineer on Atlas Transfer Service team

## Sources

- [[Atlas Transfer Service Specification]] — complete technical spec
- [[source — MFB Systems Blindspot Analysis]]
- [[source — Project Phoenix Initiative]]
- [[Project Phoenix Initiative (compiled March 2026)]]
- [[Moniepoint MFB]] — parallel infrastructure context
