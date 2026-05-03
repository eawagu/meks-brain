---
type:
  - "config"
title: lint-report
created: "2026-04-12T07:47:04Z"
summary: Judgment lint findings from 2026-05-03 — 50 stale claims (25 pages still pinned at 2026-04-11 cohort, now 22 days unresolved across 3 cycles); 50 concept gaps (pipe-spec leakage grew 6→7 cases, source-name leakage persists, several prior-cycle alias claims appear unverified); 7 stale syntheses (Bank Integration refresh decay rate measured at ~5 days proves structural lifecycle gap; Project Phoenix and Engineering Leadership now most material); 1 new instrumentation finding — only 30% briefing coverage for tick-instrumentation logging blocks statistical regression analysis.
updated: "2026-05-03T03:16:22Z"
cssclasses:
  - "config"
last_triaged: "2026-04-28T13:25:00Z"
---

## Judgment Lint — 2026-05-03

> **Note:** Structural pipeline issues (stale-claims propagation, synthesis lifecycle, detector noise) remain consolidated in [[Brain pipeline downstream gaps]]. This run continues to surface those issues as carryforward — the 2026-04-11 stale cohort and the pipe-spec/source-name detector noise have persisted across three consecutive cycles. Per-page remediation cannot hold until the upstream structural fixes land.

Brain stats at time of run: 477 entity, 448 source, 421 concept, 31 situation, 20 briefing, 17 config, 7 synthesis, 5 source-config, 2 commitment, 1 reminder. 1 open commitment. 7 synthesis pages.

Growth since last run (2026-04-26): +39 entity, +28 source, +69 concept, 0 situation, +7 briefing, +3 config, 0 synthesis, 0 source-config, +1 commitment, 0 reminder. Synthesis count flat at 7 — no new syntheses created (deliberate per prior cycle's structural-fix-first policy). Source intake +28 (was +20 prior week — small reacceleration). Concept growth +69 (was +148 — slowing as detector noise continues to inflate the candidate pool).

---

## 1. Stale Claims

50 pages flagged (query at cost cap 50; true count higher). Distribution by gap:

| Gap | Count | Verdict |
|---|---|---|
| 17d | 1 | Needs attention — 2026-04-11 cohort survival (3rd cycle) |
| 16d | 14 | Needs attention — 2026-04-11 cohort survival |
| 15d | 1 | Needs attention |
| 14d | 3 | Needs attention |
| 13d | 2 | Needs attention |
| 12d | 4 | Needs attention |
| 11d | 3 | Needs attention |
| 10d | 1 | Needs attention |
| 9d | 1 | Needs attention |
| 7d | 5 | Needs attention |
| 6d | 8 | Needs attention |
| 5d | 5 | Needs attention |
| 4d | 1 | Needs attention |

**Pattern (systemic — confirmed unresolved across three lint cycles).** 25 of the 50 flagged pages have `page_updated: 2026-04-11` — exactly the same date cohort flagged in the 2026-04-19 and 2026-04-26 lints. These pages have not received a single update in 22 days despite continuous source activity referencing them. Evidence is now overwhelming that the ingest pipeline schema step 3 ("for each entity/concept touched, if page exists: rewrite to incorporate") is not firing. This is not content drift; it is a pipeline regression that has now compounded for 22 days.

**Top-severity individual pages (10+ day gaps, 30 pages):**

| Page | Type | Gap | Notes |
|---|---|---|---|
| Feyisayo Oyeniran | entity | 17d | 2026-04-11 cohort, person never re-touched |
| Olanike Adeyemi | entity | 16d | 2026-04-11 cohort |
| Tolu Aina | entity | 16d | 2026-04-11 cohort |
| DCIR Security Vulnerabilities | concept | 16d | Active operational concept, persistent stale |
| Ravi Jakhodia | entity | 16d | 2026-04-11 cohort |
| Constance Onyeji-Jarret | entity | 16d | 2026-04-11 cohort |
| OTP Authentication | concept | 16d | 8 sources, persistent stale |
| Bukola Taiwo | entity | 16d | 2026-04-11 cohort, 7 sources |
| Romulo Braga | entity | 16d | 2026-04-11 cohort, 9 sources |
| Precious Maduwuike | entity | 16d | 2026-04-11 cohort |
| Ankit Kushwaha | entity | 16d | 2026-04-11 cohort |
| Mustapha Ajibade | entity | 16d | 2026-04-11 cohort |
| Wema Bank | entity | 16d | Active RC91 entity, persistent stale |
| Lateefat Adedeji-Oyedeji | entity | 16d | 2026-04-11 cohort |
| Nancy Muorah | entity | 16d | 2026-04-11 cohort |
| Stanbic Bank | entity | 15d | Active RC91 entity, persistent stale |
| Tolulope Obianwu | entity | 14d | |
| AWS | entity | 14d | Carried from prior lint at 14d — never refreshed |
| Vaibhav Bansal | entity | 14d | Carried from prior lint at 14d, 11 sources |
| TSP | entity | 13d | Carried from prior lint at 13d |
| Direct Debit Program | concept | 13d | |
| MasterCard Integration | concept | 12d | Carried from prior lint at 12d, 20 sources |
| Integrated Management System | concept | 12d | New stale entry this cycle |
| Card Issuance & Processing Platform | entity | 12d | Carried at 12d |
| Card Issuance Platform | concept | 12d | Carried at 12d |
| Dennis Ajalie | entity | 11d | |
| TeamApt Limited | entity | 11d | |
| Monnify | entity | 11d | |
| Bank Integration | concept | 10d | Synthesis was refreshed 2026-04-28 but base concept page remains stale — synthesis-rewrite did not propagate down |

**Assessment:** Same finding as 2026-04-26 with even stronger evidence — the 2026-04-11 cohort persists at 17 days and counting. No per-page remediation will hold. **Triage disposition: defer to [[Brain pipeline downstream gaps]] structural-fix track.**

---

## 2. Concept Gaps

50 wiki-linked terms without their own page (query at cost cap 50). Detector noise continues to dominate the top of the list, displacing genuine high-value gaps from visibility.

### Detector Issues — Persistent from Prior Lint (3rd cycle unresolved)

| Term | Refs | Issue Class |
|---|---|---|
| Moniepoint\|Moniepoint Inc. | 35 | Pipe-spec leakage (same as 2026-04-26: 35 refs) |
| TeamApt-Platformization-Org-Movements (1)\|Org Movements brief | 27 | Pipe-spec + source-filename leakage |
| TeamApt\|TeamApt Limited | 25 | Pipe-spec leakage (was 22) |
| Abdulgafar Obeitor\|Gafar | 6 | Pipe-spec leakage |
| Fraud monitoring plan and concerns - 2026_04_27 14_11 WAT - Notes by Gemini\|fraud monitoring call | 6 | Pipe-spec + source-filename leakage (NEW this cycle) |
| Elfrique\|Elfrique Solutions Limited | 5 | Pipe-spec leakage |
| TPP\|Third-Party Processing | 5 | Pipe-spec leakage |
| Money Point\|Moniepoint | 4 | Pipe-spec leakage |
| Direct to Bank Daily Stand Up 2026-04-01 0824 | 10 | Source-filename leakage |

**Status:** Pipe-spec leakage cases grew from 6 → 7 distinct entries since 2026-04-26 (added: `Fraud monitoring plan...|fraud monitoring call`). Source-filename leakage persists. Combined, 9 of the top 50 concept-gap candidates are detector noise — 18% of the candidate pool wasted. See [[Brain pipeline downstream gaps#Gap 3: Lint detector noise]].

### Alias Fixes — Verified via batch_get_pages (2026-05-03)

| Term | Refs | Existing Canonical Page | Action |
|---|---|---|---|
| Mastercard | 40 | MasterCard (id confirmed) | Add casing alias `Mastercard` to MasterCard page |
| Wycliffe Ochieng' | 27 | Wycliffe Ochieng (177) | Apostrophe variant — kept canonical per 2026-04-28 triage; verify alias still resolves |
| Habari Pay | 7 | HabariPay (id confirmed) | Add spacing alias `Habari Pay` to HabariPay page |
| Moniepoint Inc. | 6 | Moniepoint (id confirmed) | Add alias `Moniepoint Inc.` to Moniepoint page |
| UBA Bank | 6 | UBA (id confirmed) | Add alias `UBA Bank` to UBA page |
| Daniel | 6 | Daniel Armstrong (likely; ambiguous per page summary) | Verify per source-page contexts; if FCMB/banking ops contexts, add alias to Daniel Armstrong |
| Moneypoint | 4 | Moniepoint (id confirmed) | Add typo alias `Moneypoint` to Moniepoint page |
| TeamApt / Moniepoint | 13 | Compound — deliberately not aliased per 2026-04-28 | Skip per prior decision |

**Diagnostic note:** Two prior-cycle alias-addition claims appear re-flagged this cycle (Habari Pay, UBA Bank). Either the alias additions did not persist to the canonical page frontmatter, or the detector is not consulting frontmatter aliases. **Recommended diagnostic:** read the HabariPay page frontmatter directly — if `Habari Pay` is in the `aliases` array, the detector is the bug; if it's missing, the prior triage action did not actually write.

### High-Value True Gaps (10+ occurrences)

| Term | Refs | Rationale |
|---|---|---|
| Tunde Okufi | 12 | Person — Direct to Bank, Project Delivery contexts. Prior lint claimed alias-of-Babatunde-Okufi; verification pending — no Babatunde Okufi page found in this cycle's lookup. Treat as likely true gap. |
| OPay | 12 | Competitor entity. Prior lint claimed alias added to "Opay" but `OPay` lookup returned not-found. Verify whether `Opay` page exists with proper alias coverage. |
| Cowrywise | 11 | Competitor entity. Same verification status as OPay — re-flagged after prior alias claim. |
| Direct to Bank | 9 | Concept distinct from Direct Debit. Prior triage said aliased to "Direct to Bank program"; re-flagged this cycle. |

### Medium-Value Gaps (5–9 occurrences)

| Term | Refs | Notes |
|---|---|---|
| Juliana Account Switch | 8 | Concept — Project Phoenix, TACHA contexts |
| Adewuyi Mayowa | 7 | Person — RC91 ops team |
| Chinonyerem Alozie | 7 | Person — Merchant Settlement reconciliation |
| Sumac MFB | 7 | Carried from prior lint (was 6); prior triage claimed aliased to Sumac Microfinance Bank — verify |
| Kabir Yusuf | 6 | Person — NIBSS context |
| TDSD-6645 | 6 | Jira ticket reference — should not be a wikilink target; consider lint to suppress TDSD-* patterns |
| Paul Okeke | 6 | Person — Phoenix architecture (deferred prior cycle) |
| Syed Ali | 6 | Person — TSP staffing (prior lint said aliased — re-flagged) |
| Juliana Card Switch | 6 | Concept — Phoenix |
| Global Pay | 6 | Entity — Direct Debit integration |
| Abayomi Ojamomi | 6 | Person — engineering leadership |
| Kafka | 6 | Tech concept (prior cycle: narrow "Kafka partitioning" page exists; broader page still missing) |
| TPP | 6 | Abbreviation — disambiguation needed; pipe-spec variant `TPP\|Third-Party Processing` also flagged |
| Gemini Meeting Notes Pipeline | 6 | Process concept — meeting-notes infrastructure |
| FCMB Direct Debit | 5 | Concept — bank-specific Direct Debit context |
| Ekene Udodi | 5 | Person — multiple incident contexts |
| Emir Emanetoglu | 5 | Person — Phoenix consultant |
| Dominic Usiabulu | 5 | Person — settlement reconciliation, TDSD-6645 attribution actor |
| Ope Adeyemi | 5 | Person — Phoenix |
| Astrid Decrop | 5 | Person — Phoenix |
| Moses Ajani | 5 | Person — RC91 (deferred prior cycle) |
| Mudiakevwe Omuvwie | 5 | Person — Access Bank ops |
| NIBSS PTSA — RC91 Apr 17 | 5 | Situation reference — likely should exist as situation page |
| Aptent | 5 | Entity — Phoenix corporate structure |
| Aqua | 5 | Entity — Direct Debit integration |
| Moniepoint Technologies UK | 5 | Carried from prior lint; prior triage claimed aliased to MP Technologies UK — verify |
| MoniePoint MFB | 13 | Carried from prior lint at 13 refs; canonical page existence uncertain — neither `MoniePoint MFB` nor casing-variants resolved in this cycle's lookup |

### Lower-Value Gaps (3–4 occurrences)

50+ terms at 3–4 occurrences (sample beyond cost cap). Notable mentions: Engineering Resources (4), Moneypoint (4 — typo, see Alias Fixes), EMV Compliance (4). Several Phoenix-related people repeat at this tier. Defer per prior cycle disposition.

---

## 3. Synthesis Candidates

7 synthesis pages exist (no growth since 2026-04-26 — deliberate per prior cycle's structural-fix-first policy). Synthesis density remains low relative to 477 entities / 448 sources / 421 concepts.

### Priority 1 — High cross-cutting insight density

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| Khadijat Musa — Comprehensive Profile | Khadijat Musa entity | 25 | Highest-source-count entity without dedicated synthesis. Cross-cuts hiring, performance management, engineering leadership. |
| Babajide Ojoboorun — Comprehensive Profile | Babajide Ojoboorun entity | 22 | Second-highest-source-count entity without synthesis. Cross-cuts engineering, ops, leadership decisions. |
| MasterCard Integration — Card Acquiring Status and Roadmap | MasterCard Integration concept (20), MasterCard scheme entity, Card Issuance Platform | 20+ | Concept page is stale 12 days; synthesis would consolidate certification status, MPGS kickoff, license-pending workstream. |
| AI-Driven Development at Moniepoint | AI-Driven Development concept (19), Claude Code, Cosmos library, Alex and Paul Reverse Engineering Showcase | 19+ | **Carried from prior lint** — still no synthesis. Cross-cuts product process, tooling, presentations. |
| Opeyemi Animashaun — Operations Lead Profile | Opeyemi Animashaun entity | 16 | Heavy operational footprint across reconciliation, settlements, P1 events. |

### Priority 2 — Domain consolidation

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| Performance Management & Interview Calibration | Performance Management (9), Interview Calibration (8), Moniepoint Hiring Process (7) | 24+ | Carried from prior lint; same rationale. |
| Reconciliation, Settlement, and Recovery — Operational Layer | Reconciliation (8), Recovery Operations (8), Collections-Only Processing (8) | 24+ | Carried from prior lint; same rationale. |
| OKR Process at Moniepoint | OKR Process (9), Resource Allocation (11) | 20+ | Process-layer synthesis covering goal-setting and resource flows. |
| Direct-to-Bank Integration Program | (concept-page gap — see Section 2) | — | Blocked by missing concept page. |

**Caveat:** Prior cycle deferred all new synthesis creation pending synthesis-refresh-mechanism design. That structural fix is still outstanding (see Section 4 + [[Brain pipeline downstream gaps]]). Adding 5+ new syntheses on top of 7 already-stale syntheses would expand the staleness surface from 7 to 12. **Recommend deferring new synthesis creation again until refresh mechanism exists.**

---

## 4. Stale Syntheses

7 candidates flagged — every existing synthesis is stale, including Bank Integration which was refreshed 2026-04-28 and re-staled within ~5 days. This empirically confirms the structural-lifecycle gap.

| Synthesis | Gap | Newest Related | Verdict |
|---|---|---|---|
| Engineering Leadership — Hiring, Capacity, and Performance Patterns | 13d | 2026-05-02 | Investigate — gap nearly tripled since last cycle (was 5d) |
| Direct Debit Program — Architecture, Operations, and Commercial Expansion | 10d | 2026-04-29 | Investigate — gap doubled (was 5d) |
| Regulatory Compliance — CBN, Scheme, and Licensing Landscape | 9d | 2026-04-29 | Investigate (was 4d) |
| Project Phoenix — Architecture, Staffing, and Execution Status | 9d | 2026-05-02 | Investigate — large entity churn since last refresh (was 2d) |
| Transaction Switching Platform — TSP Strategy, Architecture, and Resourcing | 8d | 2026-04-28 | Investigate (was 5d) |
| Travel History — Emeka Awagu | 5d | 2026-04-23 | Minor — flat since prior cycle, low operational stakes |
| Bank Integration — RC91 Patterns, Failures, and Operational Posture | 3d | 2026-05-01 | Confirms refresh decay rate — 5 days from refresh to re-staleness |

**Assessment:** The 2026-04-28 Bank Integration refresh proves the maintenance hypothesis: a synthesis can be brought current, but without a propagation mechanism it re-stales within ~5 days as new RC91 cycles fire. The other 6 syntheses are now even more stale (gaps doubled or tripled vs prior cycle for 4 of them). **Highest-impact rewrite candidates this cycle: Project Phoenix (9d, large entity churn — Project Phoenix entity at 21 sources was last touched 2026-04-23) and Engineering Leadership (13d, longest gap, active hiring decisions including Head of Engineering Moniepoint signals).** But per Recommendation #2, refreshes have ~5-day decay — structural fix is the higher-ROI investment.

---

## 5. Instrumentation Regression

Wall-clock distribution analysis across briefings 2026-04-12 through 2026-05-02 (only 6 of 20 briefings carry `## Tick Instrumentation` sections — instrumentation coverage is 30%, intermittent rather than continuous; this itself is a finding).

| Phase | Trend | Recommendation |
|---|---|---|
| Setup | Drifting upward (~35s baseline → ~240s by May 2) | Calibration-update — likely infrastructure cost from growing brain state, not a regression |
| Step1 (perceive/retrieval) | Material upward drift, 5–7× baseline over 6 days | Investigate — likely semantic-search depth or query chaining cost increase |
| Predict | Variance elevated (5–30s baseline → 180s spike May 2) | Calibration-update — entity/situation assessment scope appears to be growing |
| Plan | Spikes 4–6× baseline May 1–2 | Calibration-update — correlated with briefing decision-item complexity |
| Act | Spikes to 840s on briefing-composition ticks | Investigate — multi-hop retrieval load during briefing dispatch may have increased |
| Improve | 4 ticks ≥60s vs 10–30s baseline | Calibration-update — correlated with briefing stacking and untriaged carryforward |

**Most recent instrumentation snapshot (briefing-2026-05-02, 22:14 WAT off-cron, full-level):** Setup 4m, Step0 30s, Step1 12m, Step2 5s, Predict 3m, Plan 2m, Act 8m, Improve omitted. Total runtime 29m 5s — Step1 (12m) and Act (8m) dominate.

**Meta-finding:** Instrumentation coverage gap — only 6/20 (30%) recent briefings include the `## Tick Instrumentation` section. Without continuous coverage, regression detection is sparse and judgment-driven only. **Recommendation:** gate instrumentation logging on every tick (full or off-cron) to enable distribution analysis with statistical confidence.

---

## Recommendations (Ordered by Impact)

1. **Investigate the ingest pipeline entity-update step** (HIGH PRIORITY — 3rd cycle unresolved). 2026-04-11 cohort now 22 days pinned across 3 lint cycles. Per-page remediation cannot hold; structural fix in [[Brain pipeline downstream gaps#Gap 1]] is required before further triage adds value.
2. **Add a synthesis-refresh mechanism** (HIGH PRIORITY — 3rd cycle unresolved). 2026-04-28 Bank Integration refresh proved staleness re-emerges within ~5 days without propagation. Continuing to refresh syntheses one-at-a-time has no ROI without the structural fix. See [[Brain pipeline downstream gaps#Gap 2]].
3. **Fix detector noise** (HIGH PRIORITY — 3rd cycle unresolved). Pipe-spec leakage cases grew from 6 → 7 distinct entries this cycle. Source-filename leakage persists. 9 of top 50 concept-gap candidates (18%) are detector noise. See [[Brain pipeline downstream gaps#Gap 3]].
4. **Diagnostic on prior-cycle alias-claim persistence.** Read the HabariPay page frontmatter directly — if `Habari Pay` is in the `aliases` array, the detector is the bug; if missing, the prior triage action did not write. One read disambiguates "detector ignores frontmatter" from "alias additions silently fail." Apply same diagnostic to UBA, Sumac Microfinance Bank, MP Technologies UK pages.
5. **Refresh Project Phoenix and Engineering Leadership syntheses** — but only as a stopgap. Highest-impact stale syntheses with active operational signals (Phoenix entity churn, hiring decisions). Real fix is recommendation #2.
6. **Triage NIBSS PTSA — RC91 Apr 17 reference (5 refs).** Pattern matches the situation-page convention (e.g., Stanbic Bank ATS — Persistent RC91 Pattern); likely should exist as a situation page, not stay a wikilink target.
7. **Add instrumentation coverage to every tick.** Closes the 70% gap that prevents statistical regression analysis.
8. **Consider TDSD-* wikilink suppression in detector.** Jira tickets recurring as "concept gaps" is a category error — they are operational identifiers, not concepts.
9. **Process Khadijat Musa, Babajide Ojoboorun, Opeyemi Animashaun comprehensive-profile syntheses** — but only after synthesis-refresh mechanism exists (recommendation #2). Otherwise expanding the stale surface from 7 to 10.

---

## Changes from Previous Run (2026-04-26)

- Stale-claims cohort (2026-04-11 origin) now persists for 22 days — 3rd consecutive cycle unresolved. 25 of 50 flagged pages still in this cohort.
- Pipe-spec leakage grew 6 → 7 distinct cases (added: `Fraud monitoring plan...|fraud monitoring call`).
- Source-filename leakage persists.
- Of 6 syntheses untouched since 2026-04-19, 4 of 6 now at gap ≥9 days (was ≤5 days last cycle).
- Bank Integration synthesis refresh decay rate measured: ~5 days from refresh to re-staleness.
- Several prior-cycle alias-addition claims appear unverified (OPay, Cowrywise, Sumac MFB, Tunde Okufi, Habari Pay, UBA Bank, Direct to Bank, Syed Ali, Moniepoint Technologies UK all re-flagged) — diagnostic action proposed (recommendation #4).
- New finding: instrumentation coverage at 30% (6/20 briefings) — blocks statistical regression detection.
- Atlas concept gap closed (page created 2026-04-28).
- Wycliffe Ochieng' (apostrophe) still flagged at 27 refs (was 26) — alias-detector verification pending.
- Synthesis count flat at 7 (deliberate — structural-fix-first policy holds).