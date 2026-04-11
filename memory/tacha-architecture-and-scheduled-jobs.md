---
title: TACHA Architecture and Scheduled Jobs
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\TeamApt\Systems\TACHA\TACHA_Architecture_and_Scheduled_Jobs.md
summary: "Technical architecture: Kubernetes/AWS with blue/green deployment, 8 critical scheduled jobs (Net Position, Ledger Entry, 4x daily reports, Settlement API/Workflow), PostgreSQL, Kafka, mTLS+TLS. Race condition risk on report jobs (missing distributed locks)."
---

## Summary

Detailed technical architecture, deployment model, Kafka infrastructure, database schema, and scheduled jobs registry for TACHA.

## Key Points

- Kubernetes on AWS with blue/green strategy
- 8 critical scheduled jobs; 3-second fee computation, 1-minute ledger entries, 10-second settlement API
- PostgreSQL with uniqueness constraints for idempotency
- Report generation jobs missing distributed locks (race condition risk)
- Security: mTLS REST, TLS+SASL Kafka, field-level encryption for bank account details

## Concepts

- [[Engineering Leadership]]