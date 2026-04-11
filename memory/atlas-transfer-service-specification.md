---
title: Atlas Transfer Service Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MoniePoint MFB\Atlas_Transfer_Service_Specification.md
summary: "Complete technical specification of Atlas, Moniepoint's internal integration switch and gateway for account-to-account fund transfers, routing to 13+ external providers with double-entry accounting, approaching 500M transactions/month."
---

## Summary

Complete technical specification of Atlas, Moniepoint's internal integration switch and gateway for processing account-to-account fund transfers. Atlas centralizes inter-bank and intra-bank transfer operations by routing to 13+ external providers (NIBSS/NIP, Interswitch, Hydrogen, HabariPay, CoralPay, E-Tranzact, Palmpay, direct bank integrations). Built by and operates under Damilare Ogunnaike's Monnify organization. Approaching 500M transactions/month with OAuth 2.0 client credentials authentication and double-entry accounting via CBA.

## Key Points

- 13+ transfer providers routable; provider routing currently manual (auto-routing on roadmap)
- Double-entry accounting via CBA per transfer: JP1 (initiation) + JP2 (settlement) journal pairs
- Two-tier fee model: Provider Fee (configured, automatic) + Client Fee (Beneficiary, client-controlled)
- REST API v1, v2, v3; `atlas-client-lib` Java JAR wrapper available
- Deployed on Kuwego cluster (Monnify instance, separate from other Moniepoint clusters)
- MAIS (Monnify Atlas Integration Service) acts as middleware for Disbursement and Settlement services
- Approaching 500M tx/month; target >97% success rate; p95 latency <30s
- Spanner migration on roadmap for infinite scale

## Entities Mentioned

- [[Damilare Ogunnaike]]

## Concepts

- [[MasterCard Integration]], [[Regulatory Compliance]]