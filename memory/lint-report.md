---
type:
  - "config"
title: lint-report
created: "2026-04-12T07:47:04Z"
summary: Judgment lint findings from 2026-05-10 — 50 stale claims (2026-04-11 cohort now 30 days unresolved across 4 cycles, source intake also collapsed +1 vs +28 prior week suggesting wider pipeline regression); 100 concept gaps with detector-bug diagnostic now CONCLUSIVE (aliases verified present in HabariPay/Moniepoint/MasterCard/Babatunde Okufi/Direct to Bank program/Sumac MFB/MP Technologies UK frontmatter — detector is the bug, not absent-alias-write); pipe-spec leakage grew 7→13 cases; Cowrywise + Syed Ali confirmed true gaps via batch_get_pages; 7 stale syntheses (Bank Integration re-staled 11 days after refresh confirms ~5d decay rate); instrumentation coverage REVERSED — now 100% of recent briefings (12/12 since 2026-04-27) carry tick-instrumentation tables.
updated: "2026-05-10T03:13:06Z"
cssclasses:
  - "config"
last_triaged: "2026-04-28T13:25:00Z"
---

## Judgment Lint — 2026-05-10

> **Note:** Structural pipeline issues (stale-claims propagation, synthesis lifecycle, detector noise) remain consolidated in [[Brain pipeline downstream gaps]]. This run continues to surface those issues as carryforward — the 2026-04-11 stale cohort and the pipe-spec/source-name detector noise have persisted across **four** consecutive cycles. Per-page remediation cannot hold until the upstream structural fixes land.
>
> **NEW this cycle:** the detector-bug diagnostic proposed in the 2026-05-03 lint (Recommendation #4) was executed. Result is conclusive — aliases ARE present in canonical-page frontmatter for HabariPay, Moniepoint, MasterCard, Babatunde Okufi, Direct to Bank program, Sumac Microfinance Bank, MP Technologies UK, Opay, and Wycliffe Ochieng. The detector is therefore not consulting the `aliases` array when assessing concept gaps. This rules out "alias additions silently fail" and confirms "detector ignores frontmatter" as the failure mode. See Section 2.

Brain stats at time of run: 481 entity, 449 source, 429 concept, 34 situation, 27 briefing, 17 config, 7 synthesis, 5 source-config, 2 commitment, 1 reminder. 1 open commitment (Moniepoint Q2 2026 Action Items, due 2026-05-15). 7 synthesis pages.

Growth since last run (2026-05-03): +4 entity, **+1 source**, +8 concept, +3 situation, +7 briefing, 0 config, 0 synthesis, 0 source-config, 0 commitment, 0 reminder. **Source intake collapsed (+1 vs prior week +28).** This is a 28× reduction over a single cycle. Either ingest has stopped firing, signal volume genuinely dropped, or sources are accumulating in ingress without retention disposition. Worth a probe outside this lint — see Recommendation #1 sub-item.

---

## 1. Stale Claims

50 pages flagged (query at cost cap 50; true count higher). Distribution by gap:

| Gap | Count | Verdict |
|---|---|---|
| 23d | 2 | Needs attention — 2026-04-11 cohort survival (4th cycle) |
| 17d | 1 | Needs attention — 2026-04-11 cohort survival (4th cycle) |
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

**Pattern (systemic — confirmed unresolved across four lint cycles).** 25 of the 50 flagged pages have `page_updated: 2026-04-11` — the exact same cohort flagged in the 2026-04-19, 2026-04-26, and 2026-05-03 lints. These pages have not received a single update in 30 days despite continuous source activity referencing them. The ingest pipeline schema step 3 ("for each entity/concept touched, if page exists: rewrite to incorporate") has not fired against this cohort for any of the 4 lint cycles observed. This is a stable, reproducible pipeline regression — not drift.

**New stale entries this cycle (compared to 2026-05-03):** Digital Transformation (concept, 23d), Core Banking Platform (concept, 23d) — both surface at top of list because newer sources (May 4) reference them. These were not in prior lint's top-50; the May 4 source ingest pulled them above the cost cap.

**Top-severity individual pages (10+ day gaps, 31 pages):**

| Page | Type | Gap | Notes |
|---|---|---|---|
| Digital Transformation | concept | 23d | NEW this cycle in top-50; persistent stale |
| Core Banking Platform | concept | 23d | NEW this cycle in top-50; persistent stale |
| Feyisayo Oyeniran | entity | 17d | 2026-04-11 cohort, person never re-touched |
| Constance Onyeji-Jarret | entity | 16d | 2026-04-11 cohort |
| Lateefat Adedeji-Oyedeji | entity | 16d | 2026-04-11 cohort, BISO context active |
| DCIR Security Vulnerabilities | concept | 16d | Active operational concept, persistent stale |
| Olanike Adeyemi | entity | 16d | 2026-04-11 cohort |
| Tolu Aina | entity | 16d | 2026-04-11 cohort |
| Wema Bank | entity | 16d | Active RC91 entity, persistent stale (cycle 9 May 8) |
| Precious Maduwuike | entity | 16d | 2026-04-11 cohort |
| Ankit Kushwaha | entity | 16d | 2026-04-11 cohort |
| Ravi Jakhodia | entity | 16d | 2026-04-11 cohort |
| Nancy Muorah | entity | 16d | 2026-04-11 cohort |
| OTP Authentication | concept | 16d | 8 sources, persistent stale |
| Romulo Braga | entity | 16d | 2026-04-11 cohort, 9 sources |
| Mustapha Ajibade | entity | 16d | 2026-04-11 cohort |
| Bukola Taiwo | entity | 16d | 2026-04-11 cohort, 7 sources |
| Stanbic Bank | entity | 15d | Active RC91 entity, persistent stale |
| AWS | entity | 14d | Carried at 14d — never refreshed |
| Tolulope Obianwu | entity | 14d | PIP context |
| Vaibhav Bansal | entity | 14d | 11 sources |
| TSP | entity | 13d | Carried |
| Direct Debit Program | concept | 13d | |
| MasterCard Integration | concept | 12d | Carried, 20 sources, alias-target page |
| Card Issuance & Processing Platform | entity | 12d | Carried |
| Integrated Management System | concept | 12d | Carried |
| Card Issuance Platform | concept | 12d | Carried |
| Dennis Ajalie | entity | 11d | |
| TeamApt Limited | entity | 11d | |
| Monnify | entity | 11d | |
| Bank Integration | concept | 10d | Synthesis refreshed 2026-04-28 but base concept page remains stale — synthesis-rewrite did not propagate down (confirmed 2nd cycle) |

**Assessment:** Same finding as prior 3 cycles with stronger evidence — the 2026-04-11 cohort persists at 30 days with no movement. **Triage disposition: defer to [[Brain pipeline downstream gaps]] structural-fix track.** Source intake collapse this week (+1 vs +28) is a new co-symptom that may share root cause.

---

## 2. Concept Gaps

100 wiki-linked terms without their own page (cost cap raised to 100 this cycle to surface tail beyond detector-noise contamination).

### Detector Bug — DIAGNOSTIC CONCLUSIVE

The 2026-05-03 lint Recommendation #4 was executed via `batch_get_pages` on 18 candidate canonical pages. **Result: aliases are present in canonical-page frontmatter for every case checked.** The detector is therefore not consulting the `aliases` array when computing concept gaps.

| Wiki-link Term Flagged | Refs | Canonical Page | Alias in Frontmatter? |
|---|---|---|---|
| Mastercard | 40 | MasterCard | ✓ `Mastercard` present |
| Wycliffe Ochieng' | 28 | Wycliffe Ochieng | ✓ `Wycliffe Ochieng'` present |
| Tunde Okufi | 12 | Babatunde Okufi | ✓ `Tunde Okufi` present |
| Direct to Bank | 12 | Direct to Bank program | ✓ `Direct to Bank` present |
| Habari Pay | 7 | HabariPay | ✓ `Habari Pay` present |
| Sumac MFB | 7 | Sumac Microfinance Bank | ✓ `Sumac MFB` present |
| Moniepoint Inc. | 6 | Moniepoint | ✓ `Moniepoint Inc.` present |
| Moneypoint | 4 | Moniepoint | ✓ `Moneypoint` present |
| MoniePoint | 3 | Moniepoint | ✓ `MoniePoint` present |
| Moniepoint Technologies UK | 5 | MP Technologies UK | ✓ `Moniepoint Technologies UK` present |

**Sole exception found:** `UBA Bank` (9 refs) — UBA page exists but `UBA Bank` is NOT in its aliases array (only `United Bank for Africa` is). This is a genuine missing-alias case, distinct from the detector bug.

**Disposition:** Three of the top 10 concept-gap candidates would disappear if the detector consulted frontmatter aliases. The fix is in the detector logic, not in writing more aliases. **See [[Brain pipeline downstream gaps#Gap 3]].**

### Detector Issues — Pipe-Spec & Source-Filename Leakage (4th cycle unresolved, GROWING)

| Term | Refs | Issue Class |
|---|---|---|
| Moniepoint\|Moniepoint Inc. | 35 | Pipe-spec leakage (was 35) |
| TeamApt-Platformization-Org-Movements (1)\|Org Movements brief | 27 | Pipe-spec + source-filename |
| TeamApt\|TeamApt Limited | 25 | Pipe-spec leakage (was 25) |
| TeamApt / Moniepoint | 13 | Compound (deliberately not aliased) |
| Direct to Bank Daily Stand Up 2026-04-01 0824 | 10 | Source-filename leakage |
| Abdulgafar Obeitor\|Gafar | 6 | Pipe-spec (was 6) |
| Fraud monitoring plan and concerns - 2026_04_27 14_11 WAT - Notes by Gemini\|fraud monitoring call | 6 | Pipe-spec + source-filename |
| Elfrique\|Elfrique Solutions Limited | 5 | Pipe-spec (was 5) |
| TPP\|Third-Party Processing | 5 | Pipe-spec (was 5) |
| Money Point\|Moniepoint | 4 | Pipe-spec (was 4) |
| Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21 | 4 | Source-filename leakage |
| TeamApt Limited - MANCo Meeting | 4 | Recurring meeting reference (likely source-name leakage) |
| Multi-Factor Authentication\|MFA | 4 | Pipe-spec (NEW this cycle) |

**Status:** Pipe-spec leakage cases grew from 7 → 9 distinct entries (added: `Multi-Factor Authentication|MFA`, plus the prior `Fraud monitoring...|fraud monitoring call` and `TPP|Third-Party Processing` continue). Source-filename leakage stable at 3. **Combined detector-noise total: 13 of top 100 candidates (13%) — gross count up from 9 last cycle.**

### High-Value True Gaps (10+ occurrences)

| Term | Refs | Rationale |
|---|---|---|
| Cowrywise | 11 | **Verified `exists: false` via batch_get_pages.** Competitor entity referenced in CEO Gazette + recurring contexts. Genuine gap — should have own page. |
| OPay | 12 | Opay page exists with `OPay` alias confirmed in frontmatter — flagged variant is detector bug (case mismatch routing through detector noise rather than alias resolution). |

### Medium-Value Gaps (5–9 occurrences) — Verified True Gaps

| Term | Refs | Notes |
|---|---|---|
| Daniel | 6 | Daniel Armstrong page exists, no aliases array — `Daniel` reference is ambiguous (could refer to Daniel Fetuga at 3 refs or Daniel Armstrong). Not alias-fix candidate; ingest disambiguation needed |
| Janakiraman PS | 8 | Person — Head of Engineering candidate, recent briefings; true gap |
| Dominic Usiabulu | 8 | Person — settlement reconciliation, TDSD-6645 attribution actor; high-frequency; true gap |
| Adewuyi Mayowa | 7 | Person — Ecobank ops; true gap |
| Kabir Yusuf | 7 | Person — NIBSS context; true gap |
| Ekene Udodi | 7 | Person — multiple incident contexts; true gap |
| Abayomi Ojamomi | 7 | Person — engineering leadership; true gap |
| Blessing Obioha | 7 | Person — refund tickets; true gap |
| Juliana Account Switch | 8 | Concept — Project Phoenix, TACHA contexts (separate from `Juliana Switch` which exists; this may be alias) |
| Chinonyerem Alozie | 7 | Person — Merchant Settlement reconciliation; true gap |
| Syed Ali | 6 | **Verified `exists: false` via batch_get_pages.** Person — TSP staffing; prior lint claimed aliased (false claim — detector noise carryforward) |
| Paul Okeke | 6 | Person — Phoenix architecture; deferred prior cycle |
| TDSD-6645 | 6 | Jira ticket — should NOT be wikilink target. Lint detector should suppress TDSD-* patterns |
| Kafka | 6 | Tech concept; narrow Kafka partitioning page exists; broader page still missing |
| Gemini Meeting Notes Pipeline | 6 | Process concept — meeting-notes infrastructure |
| Vault | 6 | Tech concept — recent briefings reference (HashiCorp Vault context); true gap |
| Kevin Ngeno | 6 | Person — recent briefings; true gap |
| Opeyemi Ahmed | 6 | Person — recent briefings; true gap |
| Juliana Card Switch | 6 | Concept — Phoenix; alias of Juliana Switch? |
| TPP | 6 | Abbreviation — disambiguation needed |
| FCMB Direct Debit | 5 | Concept — bank-specific Direct Debit context |
| Emir Emanetoglu | 5 | Person — Phoenix consultant; true gap |
| Hadiza Abubakar | 5 | Person — Wema Bank counterparty; true gap |
| Hakeem Ogunbona | 5 | Person — Cisco ASA email cc; true gap |
| Ope Adeyemi | 5 | Person — Phoenix; true gap |
| Astrid Decrop | 5 | Person — Phoenix; true gap |
| Bashir Adeyemi | 5 | Person — FCMB counterparty; true gap |
| Moses Ajani | 5 | Person — RC91 (deferred prior) |
| Mudiakevwe Omuvwie | 5 | Person — Access Bank ops; true gap |
| Aptent | 5 | Entity — Phoenix corporate structure |
| Aqua | 5 | Entity — Direct Debit integration |
| Tacha | 5 | Concept — TACHA initiative; true gap |
| Michael Oyedele | 5 | Person — recent briefings; true gap |
| Global Pay | 6 | Entity — Direct Debit integration; true gap |
| NIBSS PTSA — RC91 Apr 17 | 5 | Situation reference — likely should exist as situation page |

### Lower-Value Gaps (3–4 occurrences)

40+ terms at 3–4 occurrences. Notable: ATS (Automated Transfer System) (4), 2026 Strategy Retreat (4), Card Controls Service (4), Engineering Resources (4), EMV Compliance (4), Head of Engineering hiring (4), MADD (4), Christine Fok (4), Kaushal Shukla (4), Celestina Amadi (4), Goodness Orji (4), Akindele Odedoyin (4). Several Phoenix-related people repeat at this tier. Defer per prior cycle disposition.

---

## 3. Synthesis Candidates

7 synthesis pages exist (no growth since 2026-04-26 — deliberate per structural-fix-first policy held across 4 cycles). Synthesis density remains low relative to 481 entities / 449 sources / 429 concepts.

### Priority 1 — High cross-cutting insight density

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| Khadijat Musa — Comprehensive Profile | Khadijat Musa entity | 25 | Highest-source-count entity without dedicated synthesis. Cross-cuts hiring, performance management, engineering leadership. |
| Babajide Ojoboorun — Comprehensive Profile | Babajide Ojoboorun entity | 22 | Second-highest-source-count entity without synthesis. Cross-cuts engineering, ops, leadership. |
| MasterCard Integration — Card Acquiring Status and Roadmap | MasterCard Integration concept (20), MasterCard scheme entity, Card Issuance Platform | 20+ | Concept page is stale 12d; synthesis would consolidate certification status, MPGS kickoff, license-pending workstream. |
| AI-Driven Development at Moniepoint | AI-Driven Development concept (19), Claude Code, Cosmos library, Alex and Paul Reverse Engineering Showcase | 19+ | **Carried 4th cycle** — still no synthesis. Cross-cuts product process, tooling, presentations. |
| Opeyemi Animashaun — Operations Lead Profile | Opeyemi Animashaun entity | 16 | Heavy operational footprint across reconciliation, settlements, P1 events. |

### Priority 2 — Domain consolidation

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| Performance Management & Interview Calibration | Performance Management (9), Interview Calibration (8), Moniepoint Hiring Process (7) | 24+ | Carried; same rationale. |
| Reconciliation, Settlement, and Recovery — Operational Layer | Reconciliation (8), Recovery Operations (8), Collections-Only Processing (8) | 24+ | Carried; same rationale. |
| OKR Process at Moniepoint | OKR Process (9), Resource Allocation (11) | 20+ | Process-layer synthesis covering goal-setting and resource flows. |
| Direct-to-Bank Integration Program | Direct to Bank program (concept, exists), 12 sources via wiki-link | 12+ | Concept page exists but underdeveloped; synthesis would consolidate. |

**Caveat (carried 4th cycle):** Adding 5+ new syntheses on top of 7 already-stale syntheses would expand the staleness surface from 7 to 12. Recommend deferring new synthesis creation again until refresh mechanism exists.

---

## 4. Stale Syntheses

7 candidates flagged — every existing synthesis is stale, including Bank Integration which was refreshed 2026-04-28 and re-staled.

| Synthesis | Gap | Newest Related | Verdict |
|---|---|---|---|
| Regulatory Compliance — CBN, Scheme, and Licensing Landscape | 14d | 2026-05-04 | Investigate — gap up from 9d |
| Engineering Leadership — Hiring, Capacity, and Performance Patterns | 13d | 2026-05-02 | Investigate — flat from prior cycle (was 13d) |
| Bank Integration — RC91 Patterns, Failures, and Operational Posture | 11d | 2026-05-09 | **Refreshed 2026-04-28; now 11d stale.** Confirms ~5-day decay rate per prior measurement; second observation tightens the estimate. |
| Direct Debit Program — Architecture, Operations, and Commercial Expansion | 10d | 2026-04-29 | Flat from prior cycle (was 10d) |
| Project Phoenix — Architecture, Staffing, and Execution Status | 9d | 2026-05-02 | Flat from prior cycle (was 9d) — large entity churn |
| Transaction Switching Platform — TSP Strategy, Architecture, and Resourcing | 8d | 2026-04-28 | Flat from prior cycle (was 8d) |
| Travel History — Emeka Awagu | 5d | 2026-04-23 | Minor — flat |

**Assessment:** Bank Integration second-observation refresh-decay measurement: refreshed 2026-04-28, now 2026-05-09 newest_related = ~11 days. Adjusts decay estimate from "~5 days from refresh to re-staleness" (single-observation) to **"7–11 days from refresh to detectable staleness, depending on signal volume in the synthesis's domain."** Bank Integration sits over the active RC91 stream (high signal volume) but still took 11 days. Lower-volume syntheses (Travel History, TSP) drift slower.

**Highest-impact rewrite candidates this cycle:** Regulatory Compliance (14d, longest gap, regulatory-context active) and Engineering Leadership (13d, active hiring decisions). But per Recommendation #2, refreshes have measurable decay — structural fix is the higher-ROI investment.

---

## 5. Instrumentation Regression

Wall-clock distribution analysis across briefings 2026-04-12 through 2026-05-09. **Coverage gap from prior cycle CLOSED.** Of 27 total briefings, **12 carry `## Tick Instrumentation` sections (44%)** — and 12 of 12 most recent briefings (every briefing since 2026-04-27) carry the section. Coverage is now continuous in the recent window.

### Wall-clock samples from instrumented briefings

| Briefing | Tick | Level | Setup | Step1 | Predict | Plan | Act | Improve | Total |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-29 06:10 | full | 2m | 3m30s | 30s | 1m | 14m | 30s | ~22m |
| 2026-04-29 14:10 | full | 3m | **12m** | 30s | 30s | 3m | 30s | ~19m |
| 2026-05-04 13:14 | full | 4m | **18m** | 3m | 8m | 18m | blocked | ~51m |
| 2026-05-07 06:09 | full | 4m | **18m** | 4m | 3m | 7m | 1m | ~37m |
| 2026-05-09 06:10 | full | 10s | **60s** | 10s | 15s | 30s | 10s | ~2m15s |
| 2026-05-09 18:10 | full | 30s | 90s | 5s | 3s | 20s | 10s | ~3m |

| Phase | Trend (across instrumented window) | Recommendation |
|---|---|---|
| Setup | Variable 10s–4m. Briefing-tick-recovery scenarios bind Setup high (state-cold + multi-day catch-up). Routine ticks at 10–30s | Calibration-update — bimodal distribution (recovery-tick vs steady-state) is structural, not regression |
| Step1 (perceive/retrieval) | **Step1 is the dominant cost driver. Bimodal: 60s–90s on routine ticks, 12m–18m on recovery/multi-day catch-up ticks.** | Investigate — recovery-tick Step1 is 12–18× routine baseline. Likely multi-source semantic-search depth × catch-up window length |
| Predict | Range 5s–4m. Stable | No action |
| Plan | Range 3s–8m. Spikes correlate with high decision-item count (15-item briefings → 8m Plan; 9-item briefings → 30s Plan) | No action — load-correlated |
| Act | Range 20s–18m. Spikes correlate with briefing-page composition + carryforward expansion | Investigate — Act 18m on 2026-05-04 stands out |
| Improve | Range 1m–blocked. Body-truncation defect blocked Improve on 2026-05-04 (still meta-recursively blocking salience-tuple appends through 2026-05-08; workaround verified 2026-05-09) | Calibration-update — blocked-Improve is now a known structural gap, not measurement noise |

**Most recent instrumentation snapshot (briefing-2026-05-09, 4 ticks captured).** Steady-state ticks now run ~2–3m total — dramatic improvement from 22-51m recovery-tick scenarios earlier in the window. Body-truncation workaround (`update_page_frontmatter` + `append_to_page_section`) verified operational 2026-05-08; this matters because it unblocks Improve.

**Meta-finding (REVERSED from prior cycle):** Instrumentation coverage gap (was 30% in 2026-05-03 lint) has been CLOSED for the recent window. 12/12 briefings since 2026-04-27 carry the `## Tick Instrumentation` section. Statistical regression analysis is now possible — though the bimodal distribution (recovery-tick vs steady-state) means raw averages are misleading; analysis should bucket by tick rationale.

---

## Recommendations (Ordered by Impact)

1. **Investigate the ingest pipeline entity-update step + the source-intake collapse** (HIGHEST PRIORITY — 4th cycle unresolved on entity-update, NEW co-symptom this cycle). 2026-04-11 cohort now 30 days pinned across 4 lint cycles. Source intake collapsed from +28/week to +1/week in the same window — these may share a root cause. Per-page remediation cannot hold; structural fix in [[Brain pipeline downstream gaps#Gap 1]] is required before further triage adds value. Sub-action: probe `last_processed` timestamps on source-config-* pages and Postgres source-table for unprocessed-file accumulation.
2. **Fix the alias-detector** (HIGHEST PRIORITY — diagnostic now CONCLUSIVE this cycle). `batch_get_pages` confirmed aliases ARE present in HabariPay, Moniepoint, MasterCard, Babatunde Okufi, Direct to Bank program, Sumac Microfinance Bank, MP Technologies UK, Opay, Wycliffe Ochieng frontmatter. The detector is not consulting the `aliases` array. This single fix removes ~10 of top-100 concept-gap candidates and ends 4 cycles of false-positive carryforward. See [[Brain pipeline downstream gaps#Gap 3]].
3. **Add a synthesis-refresh mechanism** (HIGH PRIORITY — 4th cycle unresolved). Two-observation decay measurement now in: ~7–11 days from refresh to detectable staleness. Continuing one-at-a-time refreshes has no ROI. See [[Brain pipeline downstream gaps#Gap 2]].
4. **Fix detector pipe-spec leakage** (HIGH PRIORITY — 4th cycle unresolved, GROWING). Pipe-spec leakage cases grew from 7 → 9 distinct entries this cycle (added: `Multi-Factor Authentication|MFA`). Source-filename leakage stable. 13 of top 100 concept-gap candidates (13%) are detector noise. See [[Brain pipeline downstream gaps#Gap 3]].
5. **Add `UBA Bank` to UBA aliases.** Sole missing-alias case found in this cycle's diagnostic — UBA frontmatter contains only `United Bank for Africa`. Closing this prevents 9 refs from re-flagging.
6. **Create Cowrywise and Syed Ali entity pages.** Both verified `exists: false` via `batch_get_pages`. Genuine high-value true gaps. Cowrywise = competitor referenced in CEO Gazette; Syed Ali = TSP staffing context.
7. **Refresh Regulatory Compliance and Engineering Leadership syntheses** — but only as a stopgap. Highest-impact stale syntheses with active operational signals. Real fix is recommendation #3.
8. **Add `Cowrywise`, `Syed Ali`, `Janakiraman PS`, `Dominic Usiabulu`, `Adewuyi Mayowa`, `Kabir Yusuf`, `Ekene Udodi`, `Abayomi Ojamomi`, `Hadiza Abubakar`, `Hakeem Ogunbona`, `Bashir Adeyemi`, `Mudiakevwe Omuvwie`, `Kevin Ngeno`, `Opeyemi Ahmed`, `Michael Oyedele` person entity pages.** All verified true gaps with 5+ occurrences in active recent contexts.
9. **Triage NIBSS PTSA — RC91 Apr 17 reference (5 refs).** Pattern matches situation-page convention; likely should exist as a situation page.
10. **Suppress TDSD-* wikilink pattern in detector.** Jira tickets recurring as concept gaps is a category error.
11. **Process Khadijat Musa, Babajide Ojoboorun, Opeyemi Animashaun comprehensive-profile syntheses** — but only after synthesis-refresh mechanism exists (recommendation #3).

---

## Changes from Previous Run (2026-05-03)

- **Stale-claims cohort (2026-04-11 origin) now persists for 30 days — 4th consecutive cycle unresolved.** 25 of 50 flagged pages still in this cohort.
- **NEW co-symptom: source intake collapsed +28/week → +1/week.** Suggests broader ingest issue beyond entity-update step.
- **Detector-bug diagnostic CONCLUSIVE.** Aliases verified present in 9 canonical-page frontmatters via `batch_get_pages`. The detector is the bug. This ends 4 cycles of "alias claim re-flagged" carryforward — the prior alias additions DID write; the detector is not reading them.
- Pipe-spec leakage grew 7 → 9 distinct cases (added: `Multi-Factor Authentication|MFA`). Source-filename leakage stable at 3.
- Cowrywise and Syed Ali confirmed true gaps via batch_get_pages.
- Bank Integration synthesis refresh decay rate refined: 7–11 days (from 5d single-observation prior cycle).
- 4 of 7 syntheses' gaps unchanged from prior cycle (suggests dynamics stabilized at the structural-fix-first policy).
- **Instrumentation coverage gap CLOSED for recent window** — 12/12 briefings since 2026-04-27 carry instrumentation. Bimodal distribution (recovery-tick vs steady-state) is now visible — raw averages would be misleading.
- Body-truncation defect workaround verified operational 2026-05-08 (`update_page_frontmatter` + `append_to_page_section`).
- Synthesis count flat at 7 (deliberate — structural-fix-first policy holds, 4th cycle).
- 2 new entries this cycle in stale-claims top-50: Digital Transformation (concept, 23d), Core Banking Platform (concept, 23d) — pulled in by May 4 source.