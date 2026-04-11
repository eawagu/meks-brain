---
title: TSP Deployment Architecture Position
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Transaction Switching Platform\TSP_Deployment_Architecture_Position.md
summary: Strategic position paper on deploying TSP across three architectural tiers (Cloud Platform, Central Switch, Front-End Processor) — file timed out during read, content incomplete.
---

## Summary

Strategic position paper by [[Frank Atashili]] on deploying [[Transaction Switching Platform]] across three architectural tiers: Tier 1 (Cloud Platform — Moniepoint's own ops), Tier 2 (Central Switch — regional, geographically compliant), Tier 3 (Front-End Processor — on-premises at bank). Recommends multi-tier design from day one despite shipping Tier 1 first.

## Key Points

- Three deployment tiers: Cloud Platform, Central Switch, Front-End Processor
- Spine + Module architecture for scalability
- Database abstraction layer (Spanner/MySQL/SQL Server)
- Event bus abstraction
- Multi-tenant configuration isolation
- On-prem HSM support for Tier 3
- Store-and-forward for Tier 3
- Remote management plane
- Note: File timed out during read — content may be incomplete

## Entities Mentioned

[[Frank Atashili]], [[Alex Adeyemo]], [[Transaction Switching Platform]], [[Mastercard]], [[Visa]]

## Concepts

[[Transaction Switching Platform]], [[Multi-Tier Deployment]], [[Platform Architecture]]