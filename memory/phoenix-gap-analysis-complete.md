---
title: Phoenix Gap Analysis Complete
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Project Phoenix\phoenix-gap-analysis-complete.md
summary: "Strategic architecture gap analysis: Phoenix is bank-led (serves group entities) but TeamApt is switch-led (processes for external banks/fintechs). Most fundamental gap: TSP cannot onboard external institutions as tenants. Also: scheme connectivity underspecified, TSP conflates switching with orchestration."
---

## Summary

Strategic architecture gap analysis comparing Phoenix's bank-led platform model against TeamApt's switch-led business model. Core tension: Phoenix answers "how do group entities avoid duplication?" but not "how does a switching business connect multiple independent financial institutions?"

## Key Points

- External tenant gap: TSP cannot onboard external banks/fintechs as tenants — only designed for group entities. Most fundamental architectural gap
- Scheme connectivity: treated as per-market adapter detail; actually first-class concern (persistent TCP, HSM, network management, certification)
- TSP conflates switching with orchestration: Phoenix TSP is orchestrator; TeamApt needs BOTH orchestrator AND switch (sub-500ms, wire format translation, crypto)
- Capability gaps: stand-in processing, HSM integration, ISO 8583 underspecified, BIN table, clearing/settlement engine, network management messages
- Business impact: Direct Debit 🔴 (mandate homeless), Domestic Switching 🔴 (not architected as inter-bank), TPP 🟡 (missing multi-institution model), Monnify ✅
- Strategic: Phoenix serves group consumer products well but does not preserve TeamApt's B2B switching business

## Entities Mentioned

- [[Frank Atashili]]

## Concepts

- [[Engineering Leadership]], [[Regulatory Compliance]], [[MasterCard Integration]]