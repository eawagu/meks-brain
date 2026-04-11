---
title: TSP Architecture Proposal Prep Ravi 2026-04-07
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: TeamApt Context\Meetings\2026-04-07-Prep-TSP-Proposal-Ravi.md
summary: "Meeting prep for Frank's pitch to Ravi on the unified TSP architecture (53 codebases → 1 unified kernel, Java 25/Spring Boot 4/Cloud Spanner/Kafka), covering four-problem framework, timeline negotiation (3 months vs. Ravi's 2-month expectation), and $1.1M budget sign-off."
---

## Summary

Frank's pitch to Ravi on the unified TSP architecture (53 codebases → 1 unified kernel using 15 Maven modules, Java 25/Spring Boot 4/Cloud Spanner/Kafka) for international expansion. Covers the four-problem framework (people, tools, architecture, systems disposition), timeline negotiation, resource/budget sign-off ($1.1M), and escalates Claude access blocking development readiness.

## Key Points

- Architecture: single platform replacing fragmented legacy switching; supports NG, GB, Kenya from day one
- Four-problem framework: strike team model (2 teams, 14 engineers, no side work), CI/CD on Harness + SonarQube, workflow engine with saga compensation and adapter SPI, systems disposition plan
- Timeline: Frank/Alex estimate 3 months (end May for core + buffer); Ravi expects ~2 months (end May hard deadline); Phase 1 deliverable is PAY_OUT (Send Money to Bank) corridor
- Resource/budget: formal engineer release from current roles needed, $1.1M budget requires CFO (Bayo) sign-off, code freeze negotiation with Dennis
- Three parked decisions: card fee ownership, card clearing flow, Liquidity Manager scope — offer Ravi choice to decide now or defer to Phase 2
- Claude access blocking multiple team members; blocks skill development and Stage 2 readiness per Phoenix notes

## Entities Mentioned

- [[Dennis Ajalie]], [[Tosin Eniolorunda]], [[Frank Atashili]]

## Concepts

- [[AI-Driven Development]], [[Engineering Leadership]], [[Resource Allocation]]