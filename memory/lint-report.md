---
type:
  - "config"
title: lint-report
created: "2026-04-12T07:47:04Z"
summary: "Judgment lint findings from 2026-04-26 — 100 stale claims (38 pages still pinned at 2026-04-11 confirms ingest pipeline failure unresolved); 100 concept gaps (pipe-spec leakage, alias-detector false positives, and source-name leakage all persist from prior cycle); 7 stale syntheses (every synthesis page now drifted 2–6d); 1 new high-value true gap (Wycliffe Ochieng' apostrophe variant, 26 refs); meta-finding: 4 of 6 prior recommendations remain unresolved.</summary>
<parameter name=\"frontmatter_updates\">{\"updated\": \"2026-04-26\"}"
updated: 2026-04-28
cssclasses:
  - "config"
last_triaged: "2026-04-28T13:25:00Z"
---

## Judgment Lint — 2026-04-26

Brain stats at time of run: 438 entity, 420 source, 352 concept, 31 situation, 14 config, 13 briefing, 7 synthesis, 5 source-config, 1 commitment, 1 reminder. 0 open commitments. 7 synthesis pages.

Growth since last run (2026-04-19): +111 entity, +20 source, +148 concept, +7 situation, +3 config, +6 briefing, +6 synthesis, 0 source-config, 0 commitment, 0 reminder. The synthesis count jumped from 1 → 7 (last cycle's recommendation executed). Source ingestion slowed dramatically (+20 vs +134 prior week) — concept growth (+148) outpacing it suggests existing sources are being expanded into concept pages rather than new sources arriving, OR the ingest pipeline has further regressed.

---

## 1. Stale Claims

100 pages flagged (query at cost cap — true count higher). Distribution by gap:

| Gap | Count | Verdict |
|---|---|---|
| 14d | 2 | Needs attention — ingest cohort |
| 13d | 1 | Needs attention — ingest cohort |
| 12d | 3 | Needs attention — ingest cohort |
| 9d | 1 | Needs attention |
| 8d | 1 | Needs attention |
| 7d | 2 | Needs attention |
| 6d | 1 | Needs attention |
| 5d | 4 | Needs attention |
| 4d | 1 | Needs attention |
| 3d | 24 | Needs attention |
| 2d | 23 | Borderline |
| 1d | 11 | Minor |
| 0d | 27 | Timing artifact |

**Pattern (systemic — confirmed unresolved from prior cycle).** 38 pages have `page_updated: 2026-04-11` — exactly the date flagged in the previous lint. These pages have not received a single update in 15 days despite ongoing source activity referencing them. The previous lint's root-cause hypothesis (ingest pipeline schema step 3 — "for each entity/concept touched, if page exists: rewrite to incorporate" — not firing) is now strongly supported: per-page drift would not produce a clean date-cohort that survives 7 days of additional ingest. This is an ingest pipeline regression, not content drift.

**Top-severity individual pages (5+ day gaps, 15 pages):**

| Page | Type | Gap | Notes |
|---|---|---|---|
| Vaibhav Bansal | entity | 14d | New top-of-list — 11 sources, person never updated since seed |
| AWS | entity | 14d | Cloud platform, 6+ sources |
| TSP | entity | 13d | Central platform — also flagged in prior lint at 6d |
| Card Issuance & Processing Platform | entity | 12d | Heavy Phoenix activity since |
| MasterCard Integration | concept | 12d | Cited 20+ sources |
| Card Issuance Platform | concept | 12d | Phoenix architecture |
| Dennis Ajalie | entity | 9d | Engineering leadership |
| Monnify | entity | 8d | Settlements — TDSD-6645 active |
| Monify | entity | 7d | Spelling variant of Monnify (alias gap, not stale-claims) |
| Solomon | entity | 7d | |
| Moniepoint | entity | 6d | Top-level entity |
| MonieBook | entity | 5d | Carried over from prior lint at 5d — also unchanged |
| CoralPay | entity | 5d | Carried over from prior lint at 5d — also unchanged |
| Transaction Switching | concept | 5d | Carried over from prior lint at 5d |
| BRM Regulatory Exposure | concept | 5d | Carried over from prior lint at 5d |

**Assessment:** This is the same finding as 2026-04-19 with stronger evidence. The 4 entries that were at 5d gaps last cycle (MonieBook, CoralPay, Transaction Switching, BRM Regulatory Exposure) are *still* at 5d gaps — they updated once in the interval but the stale pattern recurred immediately. Per-page remediation will not hold. **Investigating the ingest pipeline is the single highest-impact action.**

**Triage disposition (2026-04-28):** Skipped as a category — ingest pipeline regression is structural; per-page remediation cannot hold until the upstream code path is fixed. Deferred to brain pipeline investigation as a separate workstream.

---

## 2. Concept Gaps

100 wiki-linked terms without their own page (query at cost cap). Three detector issues from prior lint remain unresolved and continue to dominate the top of the list.

### Detector Issues — Persistent from Prior Lint

| Term | Refs | Issue Class |
|---|---|---|
| Moniepoint\|Moniepoint Inc. | 35 | Pipe-spec leakage |
| TeamApt-Platformization-Org-Movements (1)\|Org Movements brief | 27 | Pipe-spec leakage (source filename) |
| TeamApt\|TeamApt Limited | 22 | Pipe-spec leakage |
| Abdulgafar Obeitor\|Gafar | 6 | Pipe-spec leakage |
| Elfrique\|Elfrique Solutions Limited | 5 | Pipe-spec leakage |
| Multi-Factor Authentication\|MFA | 4 | Pipe-spec leakage |
| Direct to Bank Daily Stand Up 2026-04-01 0824 | 10 | Source-name leakage |
| Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21 | 5 | Source-name leakage |

**Status:** Identical issue class to 2026-04-19 finding. Recommendation #2 and #3/#4 from prior lint remain unactioned. Pipe-spec count actually grew (was ~3 previously, now 6 distinct cases).

### Alias Fixes — Detector False Positives Still Present

Apparent alias gaps where the canonical page already exists. Previous lint claimed all 13 alias fixes were already in place; if so, the detector still does not resolve aliases before flagging.

| Term | Refs | Existing Canonical Page (verify) | Action |
|---|---|---|---|
| Mastercard | 31 | MasterCard Integration / scheme entity | Verify alias resolution; investigate detector |
| Wycliffe Ochieng' | 26 | Wycliffe Ochieng (177) | Add apostrophe-variant alias OR fix wikilink source — **new high-occurrence case** |
| MoniePoint MFB | 13 | Moniepoint MFB | Add casing-variant alias |
| TeamApt / Moniepoint | 13 | Compound reference — needs disambiguation policy | Decide: alias on both, or new page? |
| OPay | 12 | Opay (180) | Prior lint claimed alias added — verify still in place |
| Cowrywise | 11 | CowryWise (504) | Prior lint claimed alias added — verify |
| Moniepoint Inc. | 6 | Moniepoint | Already covered by pipe-spec; add as standalone alias |
| InterSwitch | 4 | Interswitch / ISW | Add casing alias |
| Moneypoint | 4 | Moniepoint | Add typo alias OR fix source |
| MoniePoint | 3 | Moniepoint | Add casing alias |

**Wycliffe Ochieng' is the standout new case** — 26 references using apostrophe variant. The non-apostrophe page (177) has only 8 source references. Suggests the apostrophe form is becoming canonical; consider renaming the page rather than aliasing.

**Triage disposition (2026-04-28):** All 10 verified as detector false positives — every flagged alias is already in the canonical page's frontmatter `aliases` array. The detector is not consulting frontmatter before flagging. This is a structural detector issue, not a triage action item. Two items pulled out for separate decisions: (a) Wycliffe Ochieng' canonical-form question — kept canonical as-is (cost of rename exceeds benefit since aliases already resolve); (b) `TeamApt / Moniepoint` compound alias removed from Moniepoint (5) — was a semantic bug flattening parent/subsidiary distinction. Notes entry added documenting the deliberate exclusion.

### High-Value True Gaps (10+ occurrences, after detector noise removed)

| Term | Refs | Notes |
|---|---|---|
| Atlas | 14 | **Carried from prior lint** (was 10 refs, user skipped). Now grown +4. Needs decision: create page or document why permanently skipped. |

**Triage disposition (2026-04-28):** Atlas entity page created (id 2947) with full sourcing from Atlas Transfer Service Specification, MFB Systems Blindspot Analysis, and Project Phoenix Initiative.

### Medium-Value Gaps (5–9 occurrences) — Notable Additions Since Last Lint

| Term | Refs | Notes |
|---|---|---|
| Sunday Ayodele | 9 | Person — Project Phoenix context |
| Sulaiman Adeeyo | 9 | Person — Project Phoenix context |
| Direct to Bank | 8 | Distinct concept from Direct Debit; appears in standup transcripts |
| Habari Pay | 7 | Spacing variant — likely alias for HabariPay |
| Moshood Idris | 6 | Person — Card Infrastructure team |
| Michael Afolabi | 6 | Person — Project Phoenix |
| Syed Ali | 6 | Person — TSP staffing |
| Sumac MFB | 6 | Entity — Phoenix corporate structure |
| Tunde Okufi | 6 | Likely alias for Babatunde Okufi (170) |
| Mohammed-Nasir Ajoge | 6 | Person — Card Infrastructure team |
| Kafka | 6 | Tech concept — already has narrower "Kafka partitioning" page |
| Eywa | 6 | Entity — Phoenix-related |
| TPP | 6 | Abbreviation — needs disambiguation |
| Adewuyi Mayowa | 5 | Person — Bank Integration RC91 context |
| Frances Omelu | 5 | Person — NIBSS context |
| Paul Okeke | 5 | Person — Phoenix architecture |
| Amar Sharma, Ridwan Abdulazeez, Spandan Mishra, Oreoluwa Somuyiwa, Taiwo Enikuomehin, Abdullah Ismail, Oluwatosin Awodire | 4–5 each | Card Infrastructure team cluster — would benefit from team page batch creation |
| Moses Ajani | 5 | Person — RC91 context |
| Ekene Udodi | 5 | Person — multiple incident contexts |
| NIBSS PTSA — RC91 Apr 17 | 5 | Looks like a situation page that should exist |
| Moniepoint Technologies UK | 5 | Corporate structure — Phoenix |
| Khalil | 4 | Person — TSP context |
| Ope Adeyemi, Astrid Decrop, Emir Emanetoglu, Christine Fok, Kaushal Shukla | 4 each | Phoenix consultants/staff cluster |

**Triage disposition (2026-04-28):**

Detector false positives (already aliased — no action): Habari Pay, Tunde Okufi, Syed Ali (3).

Aliases added to existing pages (3): Sumac MFB → Sumac Microfinance Bank; Moniepoint Technologies UK → MP Technologies UK; Direct to Bank → Direct to Bank program.

New pages created (14):
- Sulaiman Adeeyo, Sunday Ayodele, Michael Afolabi, Eywa, Frances Omelu (5 high-confidence with verified roles)
- Card Infrastructure Team roster batch (9): Spandan Mishra, Oreoluwa Somuyiwa, Abdullah Ismail, Amar Sharma, Oluwatosin Awodire, Ridwan Abdulazeez, Taiwo Enikuomehin, Mohammed-Nasir Ajoge, Moshood Idris

Skipped (insufficient role signal — would create thin pages): Paul Okeke, Adewuyi Mayowa, Moses Ajani, Ekene Udodi, Khalil (5).

Skipped (ambiguous/disambiguation needed): Kafka, TPP (2).

### Lower-Value Gaps (3–4 occurrences) — Deferred

50+ terms at 3–4 occurrences. Notable: PIP Process, Head of Engineering hiring, 2026 Strategy Retreat, MADD, Aptent, MPGS, Engineering Resources, OKR Cascade, OKR Accountability, EMV Compliance, Compliance Gap Inventory, Country-Agnostic Platform, Consolidated Switch, Stanbic IBTC. Several of these are reasonable concept-page candidates but the prior lint's lower-value tier was deferred — same disposition this cycle.

---

## 3. Synthesis Candidates

7 synthesis pages exist (was 1 at prior lint). The structural gap is closing but synthesis density remains low relative to 420 sources / 438 entities / 352 concepts.

### Priority 1 — High cross-cutting insight density

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| AI-Driven Development at Moniepoint | AI-Driven Development concept (19), TeamApt AI-Driven Development, Platform Conference — AI-Powered PM, Claude Code, Cosmos library, Alex and Paul Reverse Engineering Showcase | 19+ | **New.** Cross-cuts product process, engineering tooling, and presentation/reverse-engineering work. AI-Driven Development concept has 19 sources but no synthesis. |
| Card Issuance & Processing Platform — Phoenix Architecture and Team Topology | Card Issuance Platform (10+ from gap analysis), Card Manager Service (5), Card Controls, MasterCard Integration (20), Card Sales/Distribution Team, Card Infrastructure Team, MFB Cards Team | 30+ | **New.** Card platform has accumulated heavy source mass post-Phoenix split (multiple service pages, two team structure docs, SLA breach context). Synthesis would tie service architecture to team accountability. |
| Cards Team Personnel and Transition (Olufemi → Tracy) | Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21 (5), Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14, Card Infrastructure team page, Card Sales & Distribution Team page, individual scattered people pages | 8+ | **New.** Concentrated personnel transition with implications for Phoenix and MFB Cards. Currently fragmented across team pages and standup notes. |

### Priority 2 — Domain consolidation

| Proposed Title | Key Pages | Source Count | Why |
|---|---|---|---|
| Performance Management & Interview Calibration at Moniepoint | Performance Management concept (9), Interview Calibration (8), Moniepoint Hiring Process (7), Engineering Leadership synthesis (already exists) | 24+ | Related to existing Engineering Leadership synthesis but distinct surface — process/protocol layer rather than people/capacity. Could be a sub-synthesis. |
| Reconciliation, Settlement, and Recovery — Operational Layer | Reconciliation (8), Recovery Operations (8), Settlement Integrity (5), Clearing and Settlement (5), Settlement Accuracy (3) | 29+ | Five distinct concept pages all in the same operational domain. Synthesis would unify the framework and surface gaps between definitions. |
| CEO Gazette Pattern — Communication Cadence and Themes | CEO Gazette concept (11), individual gazette pages (multiple) | 11+ | Recurring artifact with consistent structure but no meta-page describing why/how/themes-over-time. Modest synthesis. |

**Triage disposition (2026-04-28):** Skipped new synthesis creation this cycle. Rationale: synthesis lifecycle has no maintenance mechanism (Meta-Observation 2 confirms all 7 existing syntheses stale within 1 week of creation). Adding 3+ new syntheses without addressing the maintenance mechanism just expands the staleness surface from 7 to 10. Deferred to brain pipeline workstream as part of the synthesis-refresh-mechanism design.

---

## 4. Stale Syntheses

7 candidates flagged — **every synthesis page is stale**. This is a structural problem with the synthesis lifecycle, not just individual page drift.

| Synthesis | Gap | Newest Related |
|---|---|---|
| Bank Integration — RC91 Patterns, Failures, and Operational Posture | 6d | 2026-04-25 (situation page update) |
| Direct Debit Program — Architecture, Operations, and Commercial Expansion | 5d | 2026-04-25 |
| Engineering Leadership — Hiring, Capacity, and Performance Patterns | 5d | 2026-04-25 |
| Travel History — Emeka Awagu | 5d | 2026-04-23 |
| Transaction Switching Platform — TSP Strategy, Architecture, and Resourcing | 5d | 2026-04-25 |
| Regulatory Compliance — CBN, Scheme, and Licensing Landscape | 4d | 2026-04-24 |
| Project Phoenix — Architecture, Staffing, and Execution Status | 2d | 2026-04-25 |

**Assessment:** Bank Integration synthesis at 6d is the most material — it covers active RC91 situations (Stanbic, NIBSS PTSA, FCMB, Ecobank, UBA all have updates in the gap window). The synthesis was created 2026-04-19 and has not absorbed any of the week's new RC91 signal. **Recommend review and rewrite for Bank Integration first**; remaining syntheses can be assessed in priority order.

The pattern itself — all 7 syntheses stale within a week of creation — suggests the brain has no mechanism to nudge synthesis updates as related pages change. This mirrors the stale-claims pipeline issue: writes to underlying pages are not propagating to synthesis pages.

**Triage disposition (2026-04-28):** Bank Integration synthesis refreshed — absorbed Apr 19→Apr 28 evolution including HabariPay pattern entry (Apr 24), JULS Card Crisis (Apr 23), 5-bank turn-off concentration (Apr 28), Wema/Access bilateral standoffs, Apr 27 evening closure backfill, and Fidelity TDSD-6753/6754 INITIAL REVIEW. Updated frontmatter date to 2026-04-28. Other 6 syntheses left for next cycle — synthesis-refresh-mechanism design is the structural fix.

---

## Triage Status

**Triaged 2026-04-28.**

---

## Meta-Observations (2026-04-26)

### Meta-Observation 1: Recommendations from Prior Lint Largely Unactioned

| Prior Recommendation | Status |
|---|---|
| 1. Investigate ingest pipeline entity-update step | **Unresolved** — same cohort at 2026-04-11 still pinned, +1 week deeper |
| 2. Fix alias-gap detector false positives | **Unresolved** — same OPay/Cowrywise/casing variants still flagged |
| 3. Fix pipe-spec leakage | **Unresolved** — pipe-spec cases grew from ~3 to 6 |
| 4. Fix source-name leakage | **Unresolved** — additional source-name term added (Cards Team KT) |
| 5. Revisit Atlas | **Unresolved** — grown from 10 → 14 refs |
| 6. Process lower-value gaps | **Deferred** — same disposition |
| Cross-recommendation: 6 syntheses | **Done** — 6 created, lifting count from 1 → 7 |

The synthesis-creation recommendation was the only one fully executed. Ingest/detector recommendations require code changes to the brain pipeline; they cannot be resolved through triage alone. This is a structural blocker — flagging the same defects each week without an upstream fix is itself a process failure.

### Meta-Observation 2: Synthesis Lifecycle Has No Maintenance Mechanism

All 7 syntheses created 2026-04-19 → 2026-04-23 are now stale. The brain creates synthesis pages but does not refresh them as constituent pages change. This is the synthesis-side analog to the stale-claims pipeline issue: write-through from constituent updates to dependent aggregations is missing.

### Meta-Observation 3: Source Ingestion Slowdown vs Concept Growth Asymmetry

Source count grew +20 in the week, concept count grew +148. Either (a) the user has shifted from new-source ingestion to concept-page extraction from existing sources, (b) ingest pipeline is degraded such that new sources are not being processed, or (c) lint's earlier visit caused a backfill of concept pages from existing sources. Worth investigating which.

---

## Recommendations (Ordered by Impact)

1. **Investigate the ingest pipeline entity-update step.** Highest-impact unresolved issue. 38 pages still pinned at 2026-04-11 across two consecutive lint cycles confirms this is not transient. Per-page remediation cannot hold until this is fixed at the pipeline level.
2. **Add a synthesis-refresh mechanism.** All 7 syntheses stale within 1 week of creation indicates the synthesis lifecycle is missing a maintenance phase. Options: heartbeat-driven synthesis refresh, lint-driven flagging (current), or constituent-change-driven rebuild.
3. **Fix detector issues (alias resolution, pipe-spec stripping, source-name filtering).** These are filling the top of the concept-gap list with noise and burying real findings. Fix at the lint query / ingest layer.
4. **Resolve Wycliffe Ochieng' apostrophe split.** 26 refs to apostrophe form vs 8 to non-apostrophe. Decide canonical form and consolidate. **(Triaged 2026-04-28: kept canonical as-is — aliases already resolve correctly.)**
5. **Triage Atlas decision.** 3rd consecutive lint surfacing. Either create page or document explicit decision-not-to-create with rationale, so it stops appearing. **(Triaged 2026-04-28: Atlas entity page created.)**
6. **Refresh Bank Integration synthesis first.** Most material stale synthesis (6d gap) covering active RC91 situations. **(Triaged 2026-04-28: refreshed to Apr 28.)**
7. **Process Card Infrastructure team people batch.** 7+ team members surface as 4–6 ref gaps. A team-page-driven batch creation would resolve the cluster efficiently. **(Triaged 2026-04-28: 9 roster pages created.)**
8. **Process lower-value gaps (3–4 refs)** in dedicated pass.

---

## Changes from Previous Run (2026-04-19)

- 6 synthesis pages created (Travel History → 7 total)
- Stale-claims systemic pattern persists with stronger evidence (15-day cohort survival)
- All 4 detector issues remain unresolved; pipe-spec cases grew
- Atlas re-surfaced (now 14 refs, was 10)
- Wycliffe Ochieng' apostrophe variant emerged as new top alias gap (26 refs)
- 7 stale syntheses (vs 1 last cycle — every existing synthesis is now stale)
- No new alias actions claimed-and-verified — recommend prior cycle's alias additions (OPay, Cowrywise) be verified during next triage