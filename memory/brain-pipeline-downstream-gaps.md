---
title: Brain pipeline downstream gaps
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-28T17:35:11Z"
updated: "2026-04-28T17:35:11Z"
summary: "Three persistent brain pipeline downstream gaps surfaced in lint cycles 2026-04-19 and 2026-04-26 without resolution: (1) stale-claims propagation failure — 38-page cohort pinned at 2026-04-11 across cycles; (2) synthesis lifecycle has no maintenance mechanism — all 7 syntheses stale within 1 week of creation; (3) lint detector noise — alias resolution, pipe-spec leakage, source-name leakage produce ~50% false-positive rate. All three are write-through/view-consistency failures. Triage cannot fix them."
---

## Definition

The brain has three persistent **downstream pipeline gaps** that surface in lint reports cycle after cycle without being resolved. They are distinct from input-boundary defects ([[Ingest pipeline integrity]], [[Capture leakage]]) — those concern files arriving in ingress; these concern what happens to pages **after** ingest succeeds.

Triage cannot fix any of them. They require code changes to the brain's ingest, lint, or maintenance pipelines.

## The Three Gaps

### Gap 1: Stale-claims propagation failure

**Symptom.** A cohort of 38+ pages remains pinned at `page_updated: 2026-04-11` across multiple lint cycles, despite continuous source ingestion that references those entities.

**Mechanism (hypothesis).** [[config-ingest-prompt]] specifies a step like "for each entity/concept touched, if page exists: rewrite to incorporate." This step is either not firing or only firing for a subset of touches. The give-away: a clean date-cohort surviving 15+ days of additional ingest cannot be produced by per-page drift — it requires a structural pipeline gap.

**Lint history.**
- 2026-04-19 lint flagged the cohort at 2026-04-11 pinning. Recommendation: investigate ingest pipeline.
- 2026-04-26 lint re-flagged the same cohort at the same pin date, with stronger evidence (cohort survived another week unchanged).
- 4 entities (MonieBook, CoralPay, Transaction Switching, BRM Regulatory Exposure) updated once between cycles but immediately re-pinned at 5d gaps. Per-page touch can move a page off the cohort momentarily, but the underlying pipeline does not sustain it.

**Why it matters.** Pages drift further from their source signal each day. Triage finds itself surfacing the same stale claims on each cycle without forward motion. Memory dependability degrades — Claude reads stale entity body text and reasons from out-of-date snapshots.

### Gap 2: Synthesis lifecycle has no maintenance mechanism

**Symptom.** All 7 synthesis pages created 2026-04-19 → 2026-04-23 went stale within 1 week of creation. Every synthesis page now drifts 2–6d behind its newest constituent.

**Mechanism (hypothesis).** Synthesis pages are created when judgment-lint flags a cluster needing synthesis. They are **not** updated when constituent pages change. There is no:
- Heartbeat-driven synthesis refresh ("for every synthesis page, periodically check if constituents changed").
- Constituent-change-driven rebuild ("when X changes, propagate to syntheses that reference X").
- Lint-flag-on-staleness-only rule (lint correctly flags this, but the only resolution path is manual rewrite).

**Lint history.**
- 2026-04-19 lint surfaced 1 synthesis page (the only one then existing). Created 6 more in response to recommendation.
- 2026-04-26 lint surfaced 7 synthesis pages — all 7 stale.

**Why it matters.** Synthesis is the brain's mechanism for cross-cutting insight. If it has a one-shot lifecycle (create-then-rot) rather than a maintained one, the synthesis tier fills with confidently-written pages that have decayed without warning. A reader cannot tell from the page itself whether it reflects current state.

**Refresh as a structural fix.** A manual refresh (as performed on Bank Integration synthesis 2026-04-28) buys a single cycle of currency. It does not address the lifecycle gap — the page will be stale again within 5–7 days.

### Gap 3: Lint detector noise

**Symptom.** ~50% of lint findings are false positives. Specifically:
- **Alias detector false positives** — terms flagged as alias-gaps when the alias is already present in the canonical page's frontmatter. Verified 2026-04-28: 10 of 10 alias findings were already aliased. The detector is not consulting frontmatter `aliases` arrays before flagging.
- **Pipe-spec leakage** — wikilink format `[[Page|Display]]` causes the `Page|Display` literal to be flagged as a separate concept gap. 6+ cases each cycle.
- **Source-name leakage** — source page filenames (e.g., `Direct to Bank Daily Stand Up 2026-04-01 0824`) appear as concept gaps. 2+ cases each cycle.

**Mechanism (hypothesis).** Lint queries do not normalize wikilinks (strip pipe-aliases, exclude source-page filenames) and do not check frontmatter aliases before reporting term-without-page.

**Lint history.**
- 2026-04-19 lint flagged the issue. Recommendations 2/3/4 made.
- 2026-04-26 lint re-flagged with growth (pipe-spec cases grew from ~3 to 6).

**Why it matters.** Verification overhead. Each false positive consumes a `batch_get_pages` call during triage. Real findings are buried in noise — Atlas surfaced 3 cycles before triage, partly because high-volume detector noise pushed the genuine high-value gap down the list.

## What These Gaps Share

All three are **write-through and view consistency** failures.

- Gap 1 — writes to source pages don't propagate to entity bodies.
- Gap 2 — writes to entity/concept pages don't propagate to synthesis pages.
- Gap 3 — page-state (frontmatter aliases) doesn't propagate to lint-query view.

The brain is built around correct write semantics on individual pages. The connective tissue between pages — propagation, derived views, cross-page consistency — is missing or partial.

## Why Lint Cannot Fix Them

Triage acts on lint findings page-by-page. None of these defects yield to per-page action:
- Per-page touches on stale claims regress immediately (the cohort re-pins).
- Per-synthesis manual refreshes are point-in-time; the lifecycle gap remains.
- Per-finding alias additions (where genuinely missing) don't fix the detector — they reduce one false positive while leaving the resolution logic intact.

Surfacing the same defect each lint cycle without an upstream fix is itself a process failure pattern (per Working Preferences: *"When a process fails, Mek expects structural fixes — forcing functions, phase gates, external verification — not behavioral commitments."*).

## Possible Solutions

### For Gap 1 (Stale-claims propagation)

**S1.1 — Audit and instrument the ingest entity-update step.** Add observability to the ingest pipeline that logs, for each ingested source: (a) which entities/concepts were detected as references, (b) which of those existing pages were touched (rewrite triggered), (c) which were skipped and why. Compare logs across multiple ingests of sources referencing the 2026-04-11 cohort. The skipped reasons will localize the bug.

**S1.2 — Add a forced-refresh judgement step to ingest.** For each entity referenced by a new source, even if the express-mode rewrite step decides "no material change," touch `page_updated`. Trades a slightly noisier `updated` field for an unambiguous "was this entity considered during ingest" signal. Useful as a stopgap while S1.1 root-causes the bug.

**S1.3 — Lint-driven backfill.** If the ingest pipeline cannot be fixed quickly, run a periodic backfill: for each page in the stale cohort, search sources updated since the page's `updated` for new claims, and re-emit through the ingest schema. Treats the symptom but breaks the cohort's growth.

### For Gap 2 (Synthesis lifecycle)

**S2.1 — Constituent-change-driven synthesis flag.** Add a frontmatter field to synthesis pages listing their constituent pages (already implicit via wikilinks). On ingest, if any constituent has been updated since the synthesis's `updated`, flag the synthesis for refresh. Lint already does this; the new step is making the flag actionable (assigned to a heartbeat tick or to express-mode triage).

**S2.2 — Heartbeat-driven synthesis tick.** A dedicated tick type (similar to triage tick or lint tick) that walks each synthesis page, identifies changed constituents, and either (a) refreshes the synthesis or (b) annotates the page with a "drift since 2026-04-XX — refresh needed" banner that's visible to readers.

**S2.3 — Lifecycle policy: synthesis pages have an explicit `freshness` SLO.** Each synthesis declares its target freshness (e.g., 7 days) in frontmatter. Past SLO, the page renders with a staleness warning. Forces the question: does this synthesis still earn its keep, or should it be retired?

**S2.4 — Don't create new syntheses without solving S2.1/S2.2/S2.3 first.** Adopted as triage policy 2026-04-28: the maintenance gap means each new synthesis is a future stale page. Creating more without lifecycle support expands the staleness surface.

### For Gap 3 (Lint detector noise)

**S3.1 — Alias resolution in lint query.** Before flagging a term as a concept gap, check whether any existing page has the term in its frontmatter `aliases` array. Single query change, removes ~50% of alias false positives.

**S3.2 — Wikilink normalization.** Strip pipe-spec form `[[Page|Display]]` to `Page` before tokenization in lint queries. Removes pipe-spec leakage entirely.

**S3.3 — Source-page exclusion.** Filter out terms that match an existing source-page title before flagging as concept gap. Source pages are not entities; their filenames should never surface as gaps.

**S3.4 — False-positive feedback loop.** Track per-finding triage dispositions (e.g., "this finding was a false positive — already aliased") in the lint-report annotations. On the next cycle, if the same term re-surfaces and was previously dispositioned as false positive, suppress or de-rank it. Self-improving lint.

## Forcing-Function Recommendations

Per Working Preferences, structural fixes need external verification, not behavioral commitments. Two options:

1. **Single owner with deadline.** Pick one gap, assign a fix-by date, and treat it as a tracked commitment. Highest-impact target: Gap 1 (stale-claims propagation), because it degrades the brain's core memory accuracy and underlies parts of Gap 3 (alias detector and stale propagation share a "view doesn't reflect underlying state" mechanism).

2. **Lint-driven escalation gate.** Add a rule to the lint-report disposition flow: if a structural recommendation has been unresolved for ≥3 consecutive cycles, escalate to a tracked commitment automatically. Forces the pipeline issues to graduate from "flagged for 4+ cycles" to "owned with deadline" without requiring manual ladder-climbing each cycle.

The lint-report's Meta-Observation 1 has been documenting unresolved recommendations across cycles — option 2 turns that observation into a forcing function rather than a recurring note.

## Related Pages

- [[Ingest pipeline integrity]] — input-boundary integrity (different scope: capture-time and ingress-scan-time defenses)
- [[Capture leakage]] — specific input-boundary failure mode
- [[lint-report]] — the surfacing surface for these gaps each cycle
- [[config-ingest-prompt]] — defines ingest schema (where Gap 1 mechanism lives)
- [[config-heartbeat]] — defines heartbeat tick types (where S2.2 would attach)
- [[Heartbeat Ingest Report 2026-04-13T21]] — example ingest log (instrumentation reference for S1.1)

## History

- 2026-04-19 — lint flagged Gap 1 and Gap 3 as recommendations; Gap 2 not yet visible (only 1 synthesis existed).
- 2026-04-26 — lint re-flagged all three with stronger evidence; Meta-Observation 1 explicitly notes "4 of 6 prior recommendations remain unresolved."
- 2026-04-28 — triage skipped stale-claims as a category (per-page remediation cannot hold); skipped new synthesis creation (lifecycle gap means new syntheses become stale-on-arrival); manually refreshed Bank Integration synthesis as one-cycle stopgap. This page created to consolidate the pattern and surface candidate fixes outside the lint-report's per-cycle disposition flow.
