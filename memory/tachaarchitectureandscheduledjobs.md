---
title: TACHA_Architecture_and_Scheduled_Jobs
type:
  - "source"
cssclasses:
  - "source"
source_path: TeamApt\Systems\TACHA\TACHA_Architecture_and_Scheduled_Jobs.md
created: "2026-04-13T23:15:03Z"
updated: "2026-04-13T23:15:03Z"
summary: Detailed technical architecture of TACHA clearing/settlement system — deployment model, Kafka infrastructure, database design, and 8 scheduled jobs registry.
---

## Summary

Technical architecture documentation for [[TACHA]], TeamApt's centralized clearing and settlement platform. Covers Kubernetes/AWS deployment, 6 microservices (Control Plane, Fee Service, Clearing Service, Settlement Workflow, Liquidity Manager, Backoffice), Kafka topic infrastructure with 7 topics, PostgreSQL database with 13 key tables, and a registry of 8 scheduled jobs.

## Key Points

- Deployment: Kubernetes on AWS (migrated from GCP), Harness CI/CD, Blue/Green strategy
- 6 microservices: Control Plane (validation/classification), Fee Service (3-second cron cycle), Clearing Service (Spring Batch, netting/ledger), Settlement Workflow (disbursement orchestration), Liquidity Manager (fund sweeps), Backoffice (Angular + Spring Boot at `clearing-house.teamapt.com`)
- Kafka: 7 topics including `taccs_transactions_approved` (inbound), `taccs_transactions_declined` (feedback), `clearing.adjustments.v1` (reversals/disputes), `taccs.settlement.audit` (immutable audit)
- Kafka config: `acks=all`, SASL_SSL, manual offset commit after ledger write, dead-letter topic monitoring
- Consumer groups per platform: Juliana, Direct Debit, Account Switch, PTSP, Monnify
- PostgreSQL: 13 key tables including `clearing_transactions`, `ledger_entries`, `settlement_batches`, `fee_rules`, `dispute_cases`
- Idempotency: composite key `platformIdentifier + transactionReference + transactionType` enforced at DB level
- **HIGH RISK**: Distributed locks COMMENTED OUT on 4 reporting jobs (3, 4, 5, 6) — potential race conditions in multi-instance deployment
- 8 scheduled jobs: Net Position Computation (every minute), Ledger Entry (every minute), Settlement API Execution (every 10 seconds), Settlement Workflow (every 30 seconds), 4 report generation jobs (4x daily at 05:15/09:15/12:15/15:15 WAT)
- Security: mTLS for REST, TLS+SASL for Kafka, field-level encryption for bank accounts, PAN masking, RBAC
- Observability: Grafana (Helios), New Relic distributed tracing, MDC correlation IDs
- Archival: DB → S3 → ClickHouse pipeline planned Q2 2026, RFC by [[Wycliffe Ochieng']]

## Entities Mentioned

[[TACHA]], [[TeamApt]], [[Wycliffe Ochieng']], [[Juliana Card Switch]], [[Juliana Account Switch]], [[Monnify]], [[NIBSS]], [[Polaris Bank]]

## Concepts

[[Clearing and Settlement]], [[Kafka Event-Driven Architecture]], [[Microservices Architecture]], [[NSS Smart Det]]