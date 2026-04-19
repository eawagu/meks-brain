---
type:
  - "config"
title: lint-report
created: "2026-04-12T07:47:04Z"
summary: Judgment lint findings from 2026-04-19 — triaged 2026-04-19. 100 stale claims (68 3+ day gaps, systemic pipeline issue); 100 concept gaps processed (all 10 high-value + 17 medium-value); all 13 alias fixes already in place (detector false positive); all 6 synthesis candidates created (P1 × 4 + P2 × 2); lower-value gaps (3–4 refs) deferred.
updated: "2026-04-19T18:33:12Z"
cssclasses:
  - "config"
last_triaged: "2026-04-19T17:30:00Z"
---

## Judgment Lint — 2026-04-19

Brain stats at time of run: 400 source, 327 entity, 204 concept, 24 situation, 11 config, 7 briefing, 5 source-config, 1 commitment, 1 reminder, 1 synthesis. 0 open commitments. 1 synthesis page.

Growth since last run (2026-04-12): +134 source, +107 entity, +123 concept, +10 situation, +5 config, +6 briefing, +1 source-config, +1 reminder, +1 synthesis. The brain has nearly doubled in source density over 7 days — the signal accumulation rate is outpacing the structural maintenance rate.

---

## Triage Status

**Triaged: 2026-04-19 (current session, claude.ai).**

All high-value concept gaps and synthesis candidates processed this session. See triage report below for full disposition. Findings remain available for reference until next lint run regenerates the report.

---

[Report body retained from original lint run for reference]

## 1. Stale Claims

100 pages flagged (query hit the cost cap — true count is higher). Distribution by gap:

| Gap | Count | Verdict |
|---|---|---|
| 0 days | 6 | Timing artifact |
| 1 day | 10 | Minor — will resolve on next ingest |
| 2 days | 16 | Minor-borderline |
| 3 days | 46 | Needs attention |
| 4 days | 5 | Needs attention |
| 5 days | 15 | Needs attention |
| 6 days | 2 | Needs attention |

**Pattern (systemic, not per-page).** 68 pages have gaps of 3+ days. The vast majority of these were last updated 2026-04-11, while sources referencing them have been ingested continuously since. The pages are not drifting individually — they are drifting as a cohort. This indicates ingest is creating source pages but not updating referenced entity/concept pages (schema step 3: "for each entity/concept touched, if page exists: rewrite to incorporate"). The step is either not firing, firing conditionally, or failing silently.

**Triage disposition**: Noted as systemic issue; treat at pipeline level rather than per-page.

**Top-severity individual pages (5+ day gaps, 17 pages):**

| Page | Type | Gap | Notes |
|---|---|---|---|
| TSP | entity | 6d | Central platform entity, heavy source activity |
| Visa | entity | 6d | Scheme — card platform traffic |
| Access Bank | entity | 5d | Active situation (Multi-Track Failures) |
| Zenith Bank | entity | 5d | Core bank integration |
| CoralPay | entity | 5d | Active situation (FBN Turned Off) |
| HabariPay | entity | 5d | Third party processor |
| MonieBook | entity | 5d | Product entity |
| Transaction Switching | concept | 5d | Core platform concept |
| BRM Regulatory Exposure | concept | 5d | Compliance concept |
| Glory Alioha, Abiodun Famoye, Mariam Davies, Khadijat Musa, Ifeoluwa Oguntona, Abdulgafar Obeitor, Oluwakemi Oni, Opeyemi Animashaun | entity | 5d | People — scattered across recent source pages |

**Assessment:** The systemic pattern is the primary finding. Individual page fixes would be treating symptoms. The root cause is upstream — investigate the ingest pipeline's entity/concept update step. Until that is resolved, per-page remediation will not hold.

---

## 2. Concept Gaps

100 wiki-linked terms without their own page (query hit the cost cap). Grouped by action type.

### Alias Fixes — triaged, all already in place

13 alias fixes approved for application. On inspection, all 13 target aliases already exist on the target pages (MasterCard already has Mastercard alias, Moniepoint already has all variant aliases, etc.). The lint detector is producing false-positive alias gaps — a detector issue, not a real data gap. 0 alias mutations executed.

### High-Value True Gaps (10+ occurrences) — disposition

| Term | Refs | Disposition |
|---|---|---|
| Direct Debit | 48 | Created (ID 1949) |
| OKR Process | 10 | Created (ID 1956) |
| Revenue Leakage Prevention | 5 | Created (ID 1957) |
| Card Dispute Service | 5 | Created (ID 1958) |
| Domestic Switching | 18 | Created (ID 1959) |
| Afeez Kazeem | 13 | Created (ID 1960) |
| OPay | 12 | Alias added to existing [[Opay]] (ID 180) |
| Cowrywise | 11 | Alias added to existing [[CowryWise]] (ID 504) |
| CBA | 11 | Created as [[Moniepoint Core Banking Application]] (ID 1964) with CBA/Kuwego/Core Banking Application aliases |
| Daniel Armstrong | 10 | Created with dual-context disambiguation flag (ID 1965) |
| Atlas | 10 | Skipped (user decision) |

### Medium-Value Gaps (5–9 occurrences) — all 17 processed

Batch-approved. 14 new pages created, 3 resolved as existing Juliana aliases. Summary:
- PalmPay (1967), Recovery Operations (1968), Iris (1969), Nadeem Abbas (1970), Elishma Nwobodo (1971), Nitish Chand (1972), Strangler Fig Pattern (1973), Corporate Registration (1974), Platform Strategy (1975), International Expansion (1976), DCIR (1977), JULS FCMB (1978), Platform Architecture (1979), Pawel Swiatek (1980)
- Juliana Account Switch, Juliana Card Switch — already aliases on [[Juliana]] (175)
- Juliana Switch — added as alias on [[Juliana]] (175)

### Lower-Value Gaps (3–4 occurrences) — Deferred

50+ terms at 3–4 occurrences. Not processed this session; revisit next lint cycle.

**Special — pipe-spec leakage & source-name leakage.** Ingest-level fixes pending:
- `Moniepoint|Moniepoint Inc.` (3 refs) and `Elfrique|Elfrique Solutions Limited` (5 refs) — malformed Obsidian alias syntax appearing as concept gaps. Ingest-level fix needed.
- "Direct to Bank Daily Stand Up 2026-04-01 0824" (9 refs) — source filename appearing as wikilink target. Either convert to proper source-page links or filter source-titled terms from concept-gap detector.

---

## 3. Synthesis Candidates — all 6 processed

1 synthesis page exists (Travel History — Emeka Awagu). With 400 sources and 327 entities, this remains the largest structural gap. All 6 recommended syntheses created this session:

| # | Title | ID | Priority |
|---|---|---|---|
| 1 | Bank Integration — RC91 Patterns, Failures, and Operational Posture | 1981 | P1 |
| 2 | Engineering Leadership — Hiring, Capacity, and Performance Patterns | 1998 | P1 |
| 3 | Regulatory Compliance — CBN, Scheme, and Licensing Landscape | 1999 | P1 |
| 4 | Project Phoenix — Architecture, Staffing, and Execution Status | 2000 | P1 |
| 5 | Direct Debit Program — Architecture, Operations, and Commercial Expansion | 2001 | P2 |
| 6 | Transaction Switching Platform — TSP Strategy, Architecture, and Resourcing | 2002 | P2 |

Synthesis pages created as orphans (no inbound links). Inbound links will accumulate as concept/situation pages are updated over time.

### Priority 1 — High cross-cutting insight density (carried over + new)

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| Bank Integration — RC91 Patterns, Failures, and Operational Posture | Access Bank (53), Stanbic (24), Fidelity (36), Ecobank (15), UBA (18), NIBSS (34), Bank Integration concept (25) | 53+ | **Higher priority than last run.** 7 active situations involve RC91 across multiple banks. Pattern is clearly cross-cutting and repeatedly referenced. The RC91 Multi-Bank Failure Pattern concept (12 sources) exists but is narrow — a full synthesis would tie bank-specific histories together. |
| Engineering Leadership — Hiring, Capacity, and Performance Patterns | Engineering Leadership concept (38), Head of Engineering Hiring (14), Frank Atashili (118), Dennis Ajalie (55), Damilare Ogunnaike (39) | 38+ | Hiring deliberations, PIP cases, and capacity allocation span 5+ heavy entities. Frank Atashili at 118 sources alone is an outlier — much of this is cross-referenced performance/hiring activity. |
| Regulatory Compliance — CBN, Scheme, and Licensing Landscape | Regulatory Compliance (31), CBN (14), Visa (34), MasterCard (14) | 31+ | Carried from last run. Compliance threads span licensing, scheme certification, CBN directives. |
| Project Phoenix — Architecture, Staffing, and Execution Status | Project Phoenix (71), TSP (26), Card Issuance Platform (16), related staffing sources | 71+ | **New.** Phoenix has accumulated enough mass across architecture (Spine/Module, CMS, Card Dispute Service), staffing (Stage 1 plan, resource roster), and execution status to warrant a cross-cutting view. |

### Priority 2 — Domain consolidation

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| Direct Debit Program — Architecture, Operations, and Commercial Expansion | Direct Debit Program, Direct Debit concept (to be created), architecture specs, production-issue weekly analyses | 15+ | Carried from last run. Also unlocks the Direct Debit concept-page gap. |
| Transaction Switching Platform — TSP Strategy, Architecture, and Resourcing | TSP (26), Transaction Switching Platform (33), Transaction Switching (20) | 26+ | TSP concept pages fragment into three related entries. Synthesis would clarify the product's boundary and current state. |

---

## 4. Stale Syntheses

1 candidate flagged: **Travel History — Emeka Awagu** (gap 0 days). This is a timing artifact — new travel-related source ingested the same day the synthesis was last touched. No action.

---

## Triage Session Findings (2026-04-19)

### Meta-Observation 1: Alias-Gap Detector Is Producing False Positives

All 13 approved alias fixes were already in place on the target pages. The lint detector flagged them as gaps because it did not resolve alias-targeted wikilinks before aggregating. This is a detector-logic issue. Impact: wastes human triage time on items that are already resolved.

**Recommendation**: Update the concept-gap detector to resolve aliases on target pages before flagging a term as a gap.

### Meta-Observation 2: Stale Claims Systemic Pattern Confirms An Ingest Pipeline Failure

68 entity/concept pages with 3+ day gaps, cohorted at 2026-04-11. This is not individual-page drift — it is an ingest pipeline step not firing. Per-page remediation will not hold until the pipeline fix is applied.

**Recommendation**: Investigate the ingest pipeline's entity/concept update step (schema step 3: "for each entity/concept touched, if page exists: rewrite to incorporate"). This is the highest-impact structural finding from this lint cycle.

### Meta-Observation 3: Documentation Discipline Pattern (Third Independent Signal)

Three independent Q2 2026 signals converge on the same structural issue: write-through from live decisions to durable records is unreliable across multiple tools.

1. Yasir Syed Ali flagged Jira ticket capture gap (2026-04-15)
2. Gemini transcription failed on Apr 10 HoE deliberation
3. 68-page entity staleness cohort (this lint report)

This is surfaced in the Engineering Leadership synthesis as a first-class finding. Worth addressing at the CTO-accountability level.

### Meta-Observation 4: Synthesis Velocity Gap Addressed This Cycle

Lint noted: "Between this run and the last, the brain grew by +134 sources but only +1 synthesis was added and none of the 2026-04-12 concept-page or alias recommendations were executed."

This session closed that gap: 6 syntheses created (Travel History → 7 total), 14 medium-value concept pages created, 4 carried-over high-value pages created, 1 disambiguation page (Daniel Armstrong) with explicit flag. Lower-value gaps (3–4 refs) and lint-detector issues (pipe-spec leakage, source-name leakage) deferred to ingest-level fixes.

---

## Recommendations (Ordered by Impact)

1. **Investigate ingest pipeline entity-update step.** The stale-claims pattern (68 entity/concept pages with 3+ day gaps, cohorted at 2026-04-11) is a systemic issue, not a content issue. Per-page fixes will not hold until the ingest update step is verified working. This is the single highest-impact finding.
2. **Fix alias-gap detector false positives.** Update the concept-gap detector to resolve aliases on target pages before flagging a term as a gap. All 13 alias fixes this session were already in place.
3. **Fix pipe-spec leakage in ingest.** Terms like `Moniepoint|Moniepoint Inc.` and `Elfrique|Elfrique Solutions Limited` are malformed Obsidian alias syntax bleeding into the concept-gap detector. Either the ingest's wikilink formation is wrong, or the lint query should strip pipe-specs before aggregating.
4. **Address source-name leakage in concept-gap detector.** Source filenames (e.g., "Direct to Bank Daily Stand Up 2026-04-01 0824") should not appear as concept gaps. Filter in the lint query.
5. **Revisit Atlas gap next cycle.** 10 refs skipped this session; remains a high-value gap.
6. **Process lower-value gaps (3–4 refs) in a dedicated pass.** 50+ terms at this tier not processed this session.

---

## Changes from Previous Run (2026-04-12)

- Stale-claims pattern confirmed as ingest-level failure (not content drift)
- 5 of 6 recommended syntheses created (only 1 existed at time of run)
- 14 medium-value concept pages created (vs 0 in previous cycle)
- 4 carried-over high-value pages created (Direct Debit, OKR Process, Revenue Leakage Prevention, Card Dispute Service)
- Alias-detector false-positive issue newly identified
- Cross-synthesis integration: syntheses reference each other (Bank Integration ↔ DD Program ↔ Phoenix ↔ Engineering Leadership ↔ TSP)