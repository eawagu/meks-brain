---
title: IRIS Reconciliation Platform Specification
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\MoniePoint MFB\IRIS_Reconciliation_Platform_Specification.md
summary: "Technical specification of IRIS (Integrated Reconciliation and Internal Settlement), Moniepoint's custom-built reconciliation platform processing 15–27B+ transactions monthly across MFB, TeamApt, and Globalwire, using MySQL + ClickHouse + Airflow architecture."
---

## Summary

Complete technical specification of IRIS (Integrated Reconciliation and Internal Settlement), Moniepoint's custom-built reconciliation and settlement platform. Built FY2021 to replace manual Excel processes; now processes 15–27B+ transactions monthly across Moniepoint MFB, TeamApt, and Globalwire. Multi-tier architecture: Java/Spring Boot, MySQL operational database, ClickHouse analytical engine, Apache Airflow ETL orchestration.

## Key Points

- FY2021 implementation; FY2023 moved reconciliation from Java to ClickHouse due to scale
- 27.51B transactions in December 2025 (peak); supports NGN, GBP, USD
- Statement uploaders (CSV, Excel, fixed-width) → Extractors → Resolvers (regex-based narration parsers) → Batch settlements → CBA posting
- Reconciliation via Airflow DAGs; ClickHouse matching engine; explanation messages auto-tagged for known patterns
- 300+ RBAC permissions; COSMOS auth + Google Workspace SSO; 8-hour JWT expiry
- 8 settlement banks + multiple payment processors integrated
- Revenue Assurance module ensures transaction revenue accounted for in CBA
- Banking Ops module automates NIP recovery and reversal workflows
- Critical gap: no dedicated PM assigned; Wole Olorunleke (VP Finance Systems) acts as de facto owner

## Entities Mentioned

- [[Damilare Ogunnaike]]

## Concepts

- [[Regulatory Compliance]]