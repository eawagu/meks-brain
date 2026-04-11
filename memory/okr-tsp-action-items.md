---
title: OKR TSP Action Items
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Action Items\OKR-TSP-Action-Items.md
summary: "17 action items from Alex's OKR-to-TSP capability mapping — TSP impacts ~130 of ~330 company KRs (39%), organized in 3 priority tiers with SLOs and risk mitigations."
---

## Summary

Comprehensive action item extraction from the OKR-to-TSP capability mapping (Alex's repo, 2026-03-31). [[TSP]] directly or indirectly impacts ~130 of ~330 company KRs (39%). 17 actions organized in three tiers: Tier 1 (4 items, 54 KRs unlocked, low effort), Tier 2 (5 items, medium effort, weeks not days), Tier 3 (7 items, cross-team coordination required). All 14 design gaps have been closed at spec level.

## Key Points

- **Tier 1 highest-leverage item**: Adding `channel` tag to transactions unlocks 16 POS-specific KRs with minimal effort (1 DDL column + 1 API field)
- Tier 1 collectively: channel tag (16 KRs), reversal duration observation (6 KRs), fee amount observation (28 KRs), recon day status table (4 KRs)
- Tier 2 focuses on tsp-recon implementation: core + NIP rail (~2 weeks), [[MasterCard]]/[[Visa]] scheme files (~3 weeks), NSS file generation, VAS provider recon, and Grafana dashboards
- Tier 3 requires cross-team work: Finance API, GCP cost allocation (FinOps), notification tracking, customer segment dimension, scheme fee export, terminal activity, stale lien detection
- TSP top 3 OKR levers: transaction success rate + latency, reconciliation completeness, fee accuracy
- VAS T+1 reconciliation risk: 44 providers, some settle T+2 — two-phase mitigation designed
- Card T+1 recon depends on scheme file arrival time (external dependency)
- SLOs defined: A2A ≥99.5% success, card P99 <400ms, reversal P99 <30s

## Entities Mentioned

- [[TSP]], [[Alex]], [[Visa]], [[MasterCard]], [[NIBSS]]
- [[Moniepoint]]

## Concepts

- [[Transaction Switching]] — TSP as single conduit for all fund movement
- [[Reconciliation]] — tsp-recon across NIP, card schemes, VAS providers
- [[Observability]] — Micrometer instrumentation, Grafana dashboards, SLO alerting