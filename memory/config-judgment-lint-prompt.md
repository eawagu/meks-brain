---
type:
  - "config"
title: config-judgment-lint-prompt
created: "2026-04-12T19:52:49Z"
summary: Judgment lint task execution prompt — four-phase weekly lint (stale claims, concept gaps, synthesis candidates, stale syntheses), read by scheduled task stub at runtime.
updated: "2026-04-26T22:30:08Z"
cssclasses:
  - "config"
---

You are running the brain's weekly judgment lint. Detect structural gaps and quality issues across all brain pages. Write findings to the `lint-report` config page.

All operations go through the Brain MCP connector (mek-brain).

## Setup

Read brain stats via `get_stats` to record the current page counts by type. This goes in the report header.

## Phase 1: Run Lint Queries

Call `lint_queries` four times, once per query type:

1. `lint_queries` with `query_type: "stale_claims"` — returns entity/concept pages whose source files have newer entries
2. `lint_queries` with `query_type: "concept_gaps", min_occurrences: 3` — returns wiki-linked terms without their own page, with occurrence counts
3. `lint_queries` with `query_type: "synthesis_candidates", min_sources: 3` — returns pages with many source references but no synthesis
4. `lint_queries` with `query_type: "stale_syntheses"` — returns syntheses outdated by newer related pages
5. Instrumentation regression — query briefings via `search` (type_filter: `["briefing"]`, last 30 days), read each briefing's `## Tick Instrumentation` section. No `lint_queries` call needed.

## Phase 2: Assess Findings with Judgment

For each query's results, apply judgment — not just raw counts:

### Stale Claims
- For each flagged page, assess the gap (days since last update vs newest source). Gaps of 0 days are timing artifacts (same-day source newer than page update) — label as such. Gaps of 1 day are minor — will resolve on next ingest cycle. Only gaps of 3+ days warrant attention.
- Verdict per page: timing artifact / minor / needs attention.

### Concept Gaps
- Classify each gap into one of four categories:
  - **Alias fix** — the term is a variant of an existing page (casing difference, abbreviation, name variant). Identify the existing page.
  - **High-value true gap** — 10+ occurrences, represents a distinct concept/entity not covered by an existing page.
  - **Medium-value gap** — 5–9 occurrences.
  - **Lower-value gap** — 3–4 occurrences. List notable ones (people without pages, significant concepts) but don't detail every one.
- For alias fixes: verify the referent by reading the candidate existing page via `get_page` if the match is ambiguous (e.g., "Alex" could be multiple people).

### Synthesis Candidates
- Assess content richness — not just source count. A page with 30 sources touching the same narrow topic may not need synthesis. A cluster of 10 sources spanning 4 entities with cross-cutting patterns is a strong candidate.
- For each recommended synthesis, name the proposed title, list key pages and source counts, and explain the cross-cutting value.
- Prioritize: Priority 1 (high cross-cutting insight density) vs Priority 2 (domain consolidation).

### Stale Syntheses
- For each flagged synthesis, assess whether new sources materially change the synthesis or just add minor detail. Only flag for rewrite if the new material would change conclusions or add a competing interpretation.

### Instrumentation Regression
- For each phase column (Setup, Step0, Step1, Step2, Predict, Plan, Act, Improve), compute distribution across the window.
- Flag findings where: (a) a phase's wall-clock has trended materially upward over time, (b) individual ticks spike beyond typical variance for their level, (c) phase-cost ratios have shifted from baseline.
- Judgment-driven — no fixed numerical thresholds. Judge what counts as a meaningful regression in context of recent operational events (active situations, dark windows, cron drift).
- Verdict per finding: investigate / ignore / calibration-update.

## Phase 3: Write Lint Report

Update the `lint-report` config page via `update_page` (title: `lint-report`). The report follows this structure:

```
## Judgment Lint — YYYY-MM-DD

Brain stats at time of run: [counts by type from get_stats]. [Open commitment count]. [Synthesis page count].

---

## 1. Stale Claims
[N] pages flagged. [Summary of urgency level.]
[Table: Page | Type | Gap | Verdict]
**Assessment:** [Overall assessment and action recommendation.]

---

## 2. Concept Gaps
[N] wiki-linked terms without their own page. Grouped by action type.

### Alias Fixes
[Table: Term | Occurrences | Existing Page | Action]

### High-Value True Gaps
[Table: Term | Occurrences | Rationale]

### Medium-Value Gaps
[Table: Term | Occurrences | Notes]

### Lower-Value Gaps
[Summary paragraph with notable mentions.]

---

## 3. Synthesis Candidates
[Statement about current synthesis page count — this is the structural gap indicator.]

### Priority 1
[Table: Proposed Title | Key Pages | Source Count | Why]

### Priority 2
[Table: Proposed Title | Key Pages | Source Count | Why]

---

## 4. Stale Syntheses
[Findings or "No synthesis pages exist — nothing to assess."]

---

## 5. Instrumentation Regression
[Findings or "No regression detected — wall-clock distribution stable across window."]

[Table when findings exist: Phase | Trend | Recommendation]

---

## Recommendations
[Numbered list of recommended actions, ordered by impact.]
```

## Rules

- The lint-report is a config page — it is excluded from ingest, lint, and synthesis. It will not lint itself.
- Findings are presented for triage via config-triage (Step 3b). The triage client reads the lint-report directly. Completed fixes (alias additions, page creations) disappear from the next lint run automatically.
- Do not execute any fixes — only report findings. Execution happens during triage when the user approves.