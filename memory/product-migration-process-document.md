---
title: Product Migration Process Document
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: product-migration-process-document.md
summary: "TeamApt's standardized product migration process — three-phase gate: UAT (stakeholder checklist sign-off), Pilot (controlled live with defined KPIs), Go-Live (hypercare period with performance benchmarking). Owned by Idris Aliyu."
---

## Summary

Standardized process document for migrating product features from testing to production at TeamApt. Three-phase gate model: UAT (triggered by Jira new feature request, requires unanimous stakeholder sign-off on departmental checklists), Pilot (controlled live with defined metrics — success rate, reconciliation accuracy, uptime, latency, error rate, incident resolution), Go-Live (scalability review, commercial readiness, hypercare period, formal closure). Process owner is Idris Aliyu.

## Key Points

- Phase 1 — UAT: Triggered by Jira 'New Feature Request/Release' form; Associate PMs drive; requires all stakeholders present; checklists from SRE, Ops, Compliance, InfoSec, PMO; unanimous sign-off gates progression
- Phase 2 — Pilot: Pilot scope document defined within 24 hours; SRE deploys to production; metrics tracked include transaction success/failure rate, reconciliation accuracy, uptime, latency, operational error rate, incident count/resolution time; post-pilot review meeting required before go-live
- Phase 3 — Go-Live: Scalability review, pricing/billing verification, sales enablement, marketing launch, support training (Tier 1-3), knowledge base update, monitoring dashboards; hypercare period follows with elevated vigilance; formal post-mortem and legacy decommissioning at closure
- Go-Live prerequisites: all pilot checklists signed off, KPIs met, high-risk items resolved, escalation plans established, 48-hour advance stakeholder notification
- Related checklists: InfoSec readiness, Ops readiness, Compliance readiness, SRE checklist, PMO readiness
- Tools: Jira (primary), Jira Service Desk (approvals)

## Entities Mentioned

[[Idris Aliyu]] (process owner)

## Concepts

[[Platform Engineering]]