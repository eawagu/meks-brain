---
type:
  - "config"
title: lint-report
created: "2026-04-12T07:47:04Z"
summary: "Judgment lint findings from 2026-04-19 — 100 stale claims (68 with 3+ day gaps, systemic pattern: entity pages not updated when new sources land), 100 concept gaps (12 alias fixes, 10 high-value gaps inc. Direct Debit at 48 refs carried over from last run, Domestic Switching at 18), 1 synthesis exists, 5 high-priority synthesis candidates, 1 stale synthesis (timing artifact)."
updated: "2026-04-19T03:10:05Z"
cssclasses:
  - "config"
---

## Judgment Lint — 2026-04-19

Brain stats at time of run: 400 source, 327 entity, 204 concept, 24 situation, 11 config, 7 briefing, 5 source-config, 1 commitment, 1 reminder, 1 synthesis. 0 open commitments. 1 synthesis page.

Growth since last run (2026-04-12): +134 source, +107 entity, +123 concept, +10 situation, +5 config, +6 briefing, +1 source-config, +1 reminder, +1 synthesis. The brain has nearly doubled in source density over 7 days — the signal accumulation rate is outpacing the structural maintenance rate.

---

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

### Alias Fixes (variants of existing pages — verify referent, then add alias)

| Term | Occurrences | Existing Page | Confidence |
|---|---|---|---|
| Mastercard | 24 | MasterCard | High — casing only |
| TeamApt / Moniepoint | 13 | TeamApt Limited + Moniepoint | High — composite reference |
| Wycliffe Ochieng' | 12 | Wycliffe Ochieng | High — apostrophe variant |
| Ravi Kiran Veluguleti | 10 | Ravi Veluguleti | High — full-name variant |
| TPP | 6 | Third Party Processing | High — standard abbreviation |
| Tunde Okufi | 6 | Babatunde Okufi | High — Tunde is common short form of Babatunde |
| Syed Ali | 6 | Yasir Syed Ali | High — short-name variant |
| Moniepoint Inc. | 6 | Moniepoint | High — formal entity suffix |
| Moneypoint | 4 | Moniepoint | High — typo variant |
| InterSwitch | 4 | Interswitch | High — casing variant |
| MoniePoint MFB | 3 | Moniepoint MFB | High — casing variant |
| MoniePoint | 3 | Moniepoint | High — casing variant |
| Moniepoint\|Moniepoint Inc. | 3 | Moniepoint | Medium — pipe-spec appearing raw in wikilinks (source pages using pipe-alias syntax incorrectly) |
| 2026 Strategy Retreat | 4 | 2026 Executive Strategy Retreat | High — shortened variant |
| Elfrique\|Elfrique Solutions Limited | 5 | No existing Elfrique page | Medium — pipe-spec raw; suggests need to create Elfrique Solutions Limited page |

**Note on pipe-spec leakage.** Terms with `|` in them are Obsidian alias syntax (`[[target|display]]`) appearing as if they were standalone links. This suggests source pages are malforming wikilinks. Worth investigating at the ingest level.

### High-Value True Gaps (10+ occurrences, distinct concepts)

| Term | Occurrences | Rationale |
|---|---|---|
| Direct Debit | 48 | **Carried over from 2026-04-12 — still not created.** Major product area. Highest-impact gap in the brain. |
| Mastercard (if not treated as alias) | 24 | See alias column — recommend alias, not new page |
| Domestic Switching | 18 | Core product concept — appears in OKRs, retreats, active situations |
| Afeez Kazeem | 13 | Person — heavily present in recent bank-failure situations (RC91 across Access, Ecobank, FCMB, NIBSS). No page yet. |
| OPay | 12 | Competitor entity — referenced in competitive strategy, CEO Gazettes |
| Cowrywise | 11 | Partner entity — AptPay Suite alignment context |
| CBA | 11 | Abbreviation ambiguous — likely "Core Banking Application" based on context (exec overview, Authorization Engine, Phoenix architecture). Verify before creating. |
| OKR Process | 10 | **Carried over from 2026-04-12 — still not created.** Recurring operational concept. |
| Daniel Armstrong | 10 | Person — active in credential remediation, Harness migration, multiple recent situations |
| Atlas | 10 | System — referenced in Phoenix architecture, KPI scorecard, MFB blindspot analysis |

### Medium-Value Gaps (5–9 occurrences)

| Term | Occurrences | Notes |
|---|---|---|
| PalmPay | 9 | Competitor entity |
| Recovery Operations | 8 | Operational concept spanning CEO Gazettes |
| Juliana Account Switch | 8 | Juliana-variant component |
| Juliana Card Switch | 6 | Juliana-variant component |
| Juliana Switch | 6 | Umbrella term — consolidate with Juliana entity (exists, 8 sources) or create switch-specific page |
| Iris | 7 | System — Phoenix, MFB blindspot, Platform Reference Architecture |
| Nadeem Abbas | 7 | Person — Cards team transition, Digital Banking Platforms |
| Strangler Fig Pattern | 6 | Engineering concept — Phoenix migration strategy |
| Corporate Registration | 6 | Concept — Solhigson legal entity documents |
| Platform Strategy | 5 | Concept — Phoenix, retreat, TSP business case |
| Elishma Nwobodo | 5 | Person — Cards team transition |
| International Expansion | 5 | Strategic concept |
| Revenue Leakage Prevention | 5 | **Carried over from 2026-04-12.** OKR-level concept appearing in scorecards. |
| Nitish Chand | 5 | Person — Cards team, Phoenix, MFB blindspot |
| DCIR | 5 | System abbreviation — credential remediation context |
| JULS FCMB | 5 | Integration variant |
| Card Dispute Service | 5 | **Carried over from 2026-04-12.** Card platform subsystem. |
| Platform Architecture | 5 | Concept — TSP briefings, Phoenix, switch analysis |
| Pawel Swiatek | 5 | Person — retreat, mentions-people |

### Lower-Value Gaps (3–4 occurrences)

50+ terms at 3–4 occurrences. Notable people without pages: Emmanuella Edeh (3), Emir Emanetoglu (3), Razaq Adegbite (3), Astrid Decrop (3), Ope Adeyemo (3), Abayomi Ojamomi (3), Michael Afolabi (4), Moses Ajani (4), Muhammad Samu (4), Muhammad Siddiqui (4), Moshood Idris (4), Mohammed-Nasir Ajoge (4), Temitayo Akinmola (4), John Ojetunde (4) — carried over from last run, Paul Okeke (4), Kaushal Shukla (3), Khalil (3), David Ijaola (3), Barakat Ajadi (3), Ekene Udodi (4) — carried over, Akindele Odedoyin (3), Ben Onuora/Mordi (Elfrique case). Notable concepts: EMV Compliance (4), ATS abbreviation expansion (4), Engineering Resources (4), AptPay Suite (4), Aptent (4), PIP Process (4), MADD (4), MPGS (3), Strangler Fig Pattern (6 — see medium), Change Freeze (3), ACS (3), Kafka (3), Payment Gateway (3), OpCo/IPCo/DevCo Model (3), OKR Cascade (3), National Cybersecurity Coordination (3), CSAT Governance (3), Cosmos (3), NIBSS DD Failures (3), CMS Manager (3), Claude Code (3), Consolidated Switch (3), Compliance Gap Inventory (3), Corporate Affairs Commission (3), Country-Agnostic Platform (3), Cloud Support Operations (3), Chief Product Officer (3), Direct Debit Commercial Expansion (3), JULS Provider Shared Infrastructure Risk (3), Individual Contributor Track (3), Management Track (4), Transaction Reversal (4), Security Vulnerability Remediation (4), Audit Trail (3), Engineering Leadership Hiring (3).

**Special — source-name leakage.** "Direct to Bank Daily Stand Up 2026-04-01 0824" (9 occurrences) is a source filename appearing as a wikilink target. Indicates cross-source linking from standup transcripts that reference other standups. Either: (a) convert to proper source-page links, or (b) filter source-titled terms from the concept-gap detector.

---

## 3. Synthesis Candidates

1 synthesis page exists (Travel History — Emeka Awagu). With 400 sources and 327 entities, this remains the largest structural gap. Three of the five syntheses recommended on 2026-04-12 were not created — recommendations are accumulating without execution.

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

## Recommendations

Listed by impact.

1. **Investigate ingest pipeline entity-update step.** The stale-claims pattern (68 entity/concept pages with 3+ day gaps, cohorted at 2026-04-11) is a systemic issue, not a content issue. Per-page fixes will not hold until the ingest update step is verified working. This is the single highest-impact finding.
2. **Apply the 15 alias fixes.** Low effort, high noise reduction. 9 of these 15 are Moniepoint-family casing/typo variants (4 distinct Moniepoint variants, 2 MoniePoint MFB variants, etc.) — batch-fixable in one pass. Also resolves Ravi Kiran Veluguleti, Wycliffe Ochieng', Tunde Okufi, Syed Ali, TPP.
3. **Create the 4 high-value concept pages carried over from last run.** Direct Debit (48 refs), OKR Process (10), Revenue Leakage Prevention (5), Card Dispute Service (5). These were recommended 7 days ago and have only accumulated more references since. The accumulation signals real gaps, not noise.
4. **Create first-wave concept pages for new 10+ gaps.** Domestic Switching (18), Daniel Armstrong (10), Atlas (10), Afeez Kazeem (13), OPay (12), Cowrywise (11). CBA (11) pending referent verification.
5. **Create first wave of synthesis pages.** Bank Integration (RC91 patterns) is now the highest-priority synthesis candidate given the active situation load. Engineering Leadership and Project Phoenix are strong seconds.
6. **Fix pipe-spec leakage in ingest.** Terms like `Moniepoint|Moniepoint Inc.` and `Elfrique|Elfrique Solutions Limited` are malformed Obsidian alias syntax bleeding into the concept-gap detector. Either the ingest's wikilink formation is wrong, or the lint query should strip pipe-specs before aggregating.
7. **Address source-name leakage in concept-gap detector.** Source filenames (e.g., "Direct to Bank Daily Stand Up 2026-04-01 0824") should not appear as concept gaps. Filter in the lint query.

**Meta-observation.** Between this run and the last, the brain grew by +134 sources but only +1 synthesis was added and none of the 2026-04-12 concept-page or alias recommendations were executed. The judgment-lint is producing signals but not driving action. Worth a conversation about whether triage is reaching the fixes or whether the fix-phase needs its own mechanism.