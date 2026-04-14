---
title: Alex and Paul presentation — Reverse Engineering Showcase
type:
  - "source"
cssclasses:
  - "source"
source_path: Alex and Paul presentation.pdf
created: "2026-04-14T15:31:09Z"
updated: "2026-04-14T15:31:09Z"
summary: "[[Alex Adeyemo]] and [[Paul Okeke]]'s Day 2 10:00 AM presentation on a Claude-powered reverse-engineering pipeline that converts country-specific code (NG, UK) into country-agnostic platform artifacts — 3-phase workflow (Discover, Translate, Merge), EM-runs/PM-reviews model, built in 5 days with 245 commits."
---

## Summary
A presentation by [[Alex Adeyemo]] and [[Paul Okeke]] (Day 2, 10:00 AM, likely [[2026 Strategy Retreat CPO Prep Brief]]) showcasing a reverse-engineering tool that reads Moniepoint's actual code and produces platform artifacts for building country-agnostic products. Solves the problem of NG + UK + Kenya requiring 3 separate implementations by extracting code, discovering structure, translating to country-agnostic form, then merging into global artifacts with documented trade-offs.

## Key Points
- **The problem:** NG (10-digit NUBAN, NIP/NIBSS, flat fees) and UK (sort code + 8-digit, Faster Payments, Open Banking/TrueLayer, FX markup) apps have entirely different internals despite doing the same things. Adding Kenya means a third implementation from scratch.
- **Three phases**: Phase 1 Discovery (country-specific) → Phase 2 Artifact Translation (country-agnostic with template params like `{institution_routing_code_format}`, `{source_currency}`) → Phase 3 Merge (global artifacts + trade-off decisions).
- **EM-runs/PM-reviews model**: `/extract-code payout` → `/reverse-engineer payout ng` → PM reviews Step 4 artifacts → `/review-artifacts` for refinement → automated Phase 2/3 → senior sign-off.
- **Phase 1 steps**: Step 1 inventory + flow map (all channels), Step 2 deep view docs + feature grouping, Step 3 backend enrichment + confidence scores, Step 4 stories/ACs/journeys in market's language + migration assessment.
- **Built in 5 days using [[Claude Code]] + claude-engineering plugin skills**: 245 commits across 2 repos. Day 1 initial pipeline (Flutter + Java). Day 5 onboarding capability + EM-runs/PM-reviews model + Doc overhaul.
- **Extraction pipeline**: Moniepoint has 1,450+ repos across 55 [[GitLab]] groups; "payout" code in 8+ inconsistently-named repos (fx-payout-service, transaction-processing-engine, moniepoint-transfers). Synonym map grew from 12 → 38 capabilities. Multi-channel discovery: Flutter monorepo (mobile), Angular monolith + React micro-FEs + Next.js (web), POS.
- **Key lessons**: Code as source of truth beats simulated journeys. Confidence scoring (1–5 informational, not gates) gives PMs agency. Parallel background agents cut pipeline from hours to ~50 min. Context limits — not model capability — are the bottleneck. Config parameter dictionary (34 canonical params) and feature code registry (20 pre-assigned codes) solved param-name and feature-code collisions. Kenya sanity check in Phase 2 flags 17 [KENYA:] gaps early.
- **Pivot**: Moved from domain-scoped (300KB+) artifacts to capability-scoped (50–100KB per market) to make artifacts reviewable.
- **Added Step 4**: PMs couldn't review abstract config params; Step 4 bridges gap with market-language artifacts.
- **Scale numbers**: Combined payout + onboarding — 12,900+ source files analyzed, 24 output files, 103 merged stories, 30 trade-off decisions. 130+ config params discovered. System prompt 1,007 lines.
- **Kenya verdicts**: Payout — bank-to-bank = config + adapter, M-PESA = 4 core changes. Onboarding — core flow reusable, 5 new provider adapters needed.

## Entities Mentioned
[[Alex Adeyemo]], [[Paul Okeke]], [[Moniepoint]], [[Claude Code]], [[GitLab]], TrueLayer, NIBSS

## Concepts
[[Reverse Engineering Pipeline]], [[Country-Agnostic Platform]], [[Claude Code]], [[EM-Runs PM-Reviews Model]], [[Capability Scoping]], [[Multi-Channel Code Extraction]], [[Synonym Map]], [[Confidence Scoring]], [[Background Agent Orchestration]]