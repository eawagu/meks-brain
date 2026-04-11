---
title: Phoenix Engineering Technical Standards
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Project Phoenix\Engineering\Engineering_Technical_Standards.md
summary: "Technical standards presented at Platform Conference (March 10, 2026): microservices by business capability, API-first + Kafka, 80% test coverage minimum, CI/CD with feature flags and canary deployments, structured JSON logging, distributed tracing, Change Specs + ADRs mandatory."
---

## Summary

Technical principles, coding standards, architecture patterns, and quality requirements presented by Alex and Paul at Platform Conference (March 10, 2026).

## Key Points

- Core principles: Platform thinking, API-first, Configuration over customization, Automation by default, Observability mandatory, Security by design
- Architecture: microservices by business capability; each service owns data; API (sync) + event-driven (async)
- 80% test coverage minimum; code review required; automated linting; no secrets in code
- CI/CD for all services; feature flags; canary deployments; blue-green for zero-downtime; IaC (Terraform)
- Structured JSON logging, distributed tracing, business metrics dashboards, SLAs/SLOs
- Change Specs + ADRs required; tech radar maintained; tech debt tracked explicitly

## Concepts

- [[AI-Driven Development]], [[Engineering Leadership]]