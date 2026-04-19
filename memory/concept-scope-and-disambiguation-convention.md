---
title: Concept Scope and Disambiguation Convention
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-19T11:36:19Z"
updated: "2026-04-19T11:36:19Z"
summary: Brain convention governing how concepts are named, scoped, and disambiguated across entities — 11 rules covering entity-prefix naming (always), group-level prefix ("Moniepoint Group"), generic concept pages, bare wikilink resolution, disambiguation pages for Case B terms, immediate retroactive audit, no bare generic aliases on entity pages, lint signals A/B/C/D, lint-report structure, per-signal triage tiering, reactive generic page creation.
---

## Purpose

This convention governs how concepts are named, scoped, and disambiguated across the brain. It exists because many concepts in the brain are captured at a subsidiary or entity level but use generic names that will eventually have group-level or cross-subsidiary variants (e.g., OKR Process, Performance Management, Direct Debit). Without explicit scope discipline, wikilinks silently mis-resolve across entities and the brain accumulates latent mis-attributions that surface only when a second entity's variant appears.

The convention uses three levers together: (1) explicit entity prefixes in titles, (2) disciplined alias handling, and (3) lint-based detection of scope ambiguity at triage time.

## Scope of Application

Applies to all concept pages (`type: concept`) and any entity pages whose titles describe processes, frameworks, or practices rather than uniquely-named entities. Does not apply to source pages (ingest snapshots preserve original titles per ingest convention) or to entities whose names are genuinely unique and entity-specific (e.g., [[Juliana]] as a system name).

---

## Rule 1 — Entity Prefix Always

**All subsidiary-scoped concept pages MUST carry an entity prefix in the title, regardless of current collision status.**

Even when no second entity's variant currently exists in the brain, the prefix is applied. This prevents latent collision risk and makes scope explicit for every reader.

- Correct: `[[TeamApt Engineering Standards]]`, `[[Moniepoint Group OKR Process]]`
- Incorrect: `[[Engineering Standards]]` (when content is TeamApt-scoped), `[[OKR Process]]` (when content is Moniepoint-group-scoped)

## Rule 2 — Group-Level Entity Prefix is "Moniepoint Group"

**Concepts owned by [[Moniepoint|Moniepoint Inc.]] at the group level use the prefix "Moniepoint Group".**

Distinguishes from:
- [[Moniepoint MFB]] (the microfinance bank subsidiary, which has its own set of processes)
- [[TeamApt|TeamApt Limited]] (the payments infrastructure subsidiary)
- Any future Moniepoint Inc. subsidiary

"Moniepoint" alone is ambiguous in the brain; "Moniepoint Inc." is technically precise but awkward for concept-page titles; "Moniepoint Group" is unambiguous and natural.

## Rule 3 — Generic Concepts Get Their Own Pages

**Concepts with legitimate industry/academic meaning get a dedicated generic concept page, separate from any entity-scoped instantiations.**

A concept is "generic" when it has a meaningful definition independent of any specific entity's implementation. Examples:
- [[OKR Process]] — management framework, industry concept
- [[Direct Debit]] — banking primitive, payment mechanism
- [[Performance Management]] — HR discipline
- [[Incident Response Process]] — operational practice

The generic page explains the concept independent of any entity. Entity-scoped pages link back to the generic page via "Parent concept" or "See also" sections in their body.

Generic pages are created reactively (per Rule 11) when bare references accumulate — not proactively at every entity-scoped page creation.

## Rule 4 — Bare Generic Wikilinks Allowed; Lint Flags Ambiguity

**Bare generic wikilinks like `[[OKR Process]]` are allowed and resolve to the generic concept page. Lint detects when bare generic wikilinks are used in entity-scoped source contexts and flags them for user confirmation at triage time.**

Writer ergonomics: writers type what they mean. If the intended referent is the generic concept, `[[OKR Process]]` is correct. If the intended referent is a specific entity's instance, the entity-scoped wikilink `[[Moniepoint Group OKR Process]]` should be used.

Correction mechanism: when a source page is entity-scoped (e.g., a Moniepoint Inc. duty handover, a TeamApt internal note) and uses a bare generic wikilink, lint flags the link as potentially ambiguous. The user confirms at triage whether the writer meant the generic concept or an entity-scoped instance. If the latter, the link is rewritten to the entity-scoped form.

This rule depends on Rule 3 — bare wikilinks can only resolve cleanly when generic concept pages exist.

## Rule 5 — Disambiguation Pages Only When 2+ Entity Variants Exist

**For terms that have no meaningful generic concept ("Case B" — just entity labels with no industry definition), disambiguation pages are created only once a second entity-scoped variant exists. Until then, bare wikilinks remain orphan and surface via lint.**

Case A (Rule 3 applies): generic concept page exists; bare wikilinks resolve to it. No disambiguation needed.

Case B (this rule): no meaningful generic concept; multiple entity-scoped variants coexist.
- Example candidate: [[Engineering Leadership]] — not a generic industry concept, just an entity label that could apply to TeamApt, Moniepoint Group, or Elfrique
- **First variant exists, second doesn't:** bare wikilink stays orphan. Lint flags it; user resolves at triage.
- **Second variant appears:** a lightweight disambiguation page is created at the bare term. The page lists entity-scoped variants and links to them. Bare wikilinks now resolve to the disambiguation page.

This is lazy disambiguation — infrastructure is added only when genuine collision exists, not preemptively.

## Rule 6 — Immediate Retroactive Audit

**Once this convention is finalized, run a dedicated audit of all concept and entity pages; rename/adjust violations in one pass before resuming normal lint triage.**

The audit:
1. Enumerate all concept pages and entity pages whose titles describe processes/frameworks/practices.
2. For each: determine scope from body content (which entity is the owner?).
3. Identify violations of Rules 1, 2, 7.
4. Propose renames, alias changes, and scope-correction notes.
5. Execute per-page changes with user approval per batch.

This is a dedicated workstream, not opportunistic compliance. Accepted cost: dozens of pages may need retitling.

## Rule 7 — No Bare Generic Aliases on Entity-Scoped Pages

**Entity-scoped concept pages MUST NOT claim bare generic aliases in their frontmatter.**

The silent-resolution mechanism of aliases is exactly what creates collision risk when a second entity's variant appears. Forbidding this keeps Rule 4 enforceable: bare wikilinks resolve to generic pages (if they exist) or stay orphan (if they don't), never to a specific entity's page via alias.

Relationships between entity-scoped and generic pages are preserved through **explicit wikilinks in page bodies**:
- Entity-scoped page body: `This is [[Moniepoint Group]]'s instantiation of the generic [[OKR Process]] framework.`
- Generic page body: `Known instantiations: [[Moniepoint Group OKR Process]], [[Elfrique OKR Process]].`
- Graph connectivity is preserved via explicit wikilinks, not alias resolution.

Current violation: the `OKR Process` alias on [[Moniepoint OKR Process]] (added 2026-04-19 during lint triage) must be removed as part of the Rule 6 retroactive audit. That page should also be renamed to [[Moniepoint Group OKR Process]] per Rule 2.

## Rule 8 — Lint Detection Signals

**Lint detects convention violations via four signals:**

| Signal | Rule | Detection | Example |
|---|---|---|---|
| **A** | Rule 1 | Concept/entity page body names a specific owner entity but title lacks that entity prefix | Page body says "TeamApt Engineering Leadership is responsible for…" but title is `[[Engineering Leadership]]` |
| **B** | Rule 7 | Entity-scoped page's aliases list contains a bare generic term | [[Moniepoint OKR Process]] has `aliases: [OKR Process]` |
| **C** | Rule 4 | Source page with entity-scoped context uses a bare generic wikilink | Moniepoint duty handover writes `[[OKR Process]]` instead of `[[Moniepoint Group OKR Process]]` |
| **D** | Rule 2 | Concept/entity page uses "Moniepoint" as prefix when body content signals Moniepoint Inc. group ownership | Page titled `[[Moniepoint OKR Process]]` with body describing group-level ownership |

Signal E (missing generic concept page for bare references) is already handled by existing concept-gap detection; not duplicated here.

## Rule 9 — Lint-Report Structure

**Lint-report carries a top-level "Convention Violations" section with separate subsections per signal.**

Structure:

```
## N. Convention Violations

### N.1 Signal A — Missing Entity Prefix (Rule 1)
[table of violating pages]

### N.2 Signal B — Bare Generic Aliases on Entity Pages (Rule 7)
[table of violating pages]

### N.3 Signal C — Ambiguous Bare Generic Wikilinks (Rule 4)
[table of ambiguous wikilinks + source context]

### N.4 Signal D — Moniepoint vs Moniepoint Group (Rule 2)
[table of violating pages]
```

Findings are distinct from other lint sections (Stale Claims, Concept Gaps, Alias Fixes, Synthesis Candidates) to match their different fix patterns.

## Rule 10 — Triage Tiering for Convention Violations

**Signal-specific tiering during lint triage (config-triage Step 3b):**

| Signal | Tier | Presentation |
|---|---|---|
| **A** | Tier 2 | One at a time; heartbeat proposes new title; user confirms or overrides per page |
| **B** | Tier 1 batch | Table of alias removals; approve all / pull items out |
| **C** | Tier 2 | One at a time; user confirms which entity scope was meant per flagged wikilink |
| **D** | Tier 1 batch | Table of Moniepoint → Moniepoint Group renames; approve all / pull items out |

## Rule 11 — Reactive Generic Concept Page Creation

**Generic concept pages are created reactively via existing concept-gap detection when bare references accumulate. No proactive mechanism; no creation-time enforcement at entity-scoped page creation.**

The existing lint flow already flags bare wikilinks with no resolving page as concept gaps. When a bare generic term accumulates enough references to warrant its own page, the user creates it during concept-gap triage. This keeps the convention additive to existing flows rather than adding new friction.

---

## Implementation Status

- **Convention created:** 2026-04-19 during lint triage pause (post-Gap B-2, pre-Gap B-3)
- **Rule 6 retroactive audit:** pending — dedicated workstream required before resuming normal lint triage
- **Rules 8/9/10 lint implementation:** pending — heartbeat lint code changes required to emit Convention Violations findings
- **Known violations awaiting audit:**
  - [[Moniepoint OKR Process]] — should be [[Moniepoint Group OKR Process]] per Rule 2
  - [[Moniepoint OKR Process]] — has `OKR Process` alias in violation of Rule 7
  - Broader audit scope TBD at audit kickoff

## Decision History

Convention designed interactively during the 2026-04-19 triage session between [[Emeka Awagu]] (user) and the triage client. Design trigger: Gap B-3 (Domestic Switching, 18 refs) surfaced the collision concern that Elfrique and other subsidiaries would eventually have their own OKR processes, and the alias-based resolution approach used on [[Moniepoint OKR Process]] would cause silent mis-attribution.

Rule-by-rule decision record:
- Rule 1 (always prefix): user selected always-prefix over only-when-needed on collision-risk grounds
- Rule 2 ("Moniepoint Group" prefix): user selected Moniepoint Group over Moniepoint or Moniepoint Inc. for unambiguity and naturalness
- Rule 3 (generic pages exist): user selected always-create over entity-only or hybrid for semantic richness
- Rule 4 (bare allowed + lint flag): user selected lint-flag middle ground over strict-require or writer-discipline-only
- Rule 5 (lazy disambiguation): user selected 2+-variants threshold over always-create or leave-orphan
- Rule 6 (immediate audit): user selected dedicated audit over collision-only or lint-surfaced or opportunistic
- Rule 7 (no generic aliases on entity pages): user selected forbid after confirming body-link preservation of relationships
- Rule 8 (four signals): user selected A+B+C+D (excluded E as duplicative of existing concept-gap detection)
- Rule 9 (top-level section with subsections): user selected top-level with subsections over folding-into-existing or flat
- Rule 10 (per-signal tiering): user approved A Tier 2 / B Tier 1 / C Tier 2 / D Tier 1
- Rule 11 (reactive generic page creation): user selected existing concept-gap flow over new proactive lint signal or creation-time enforcement
- Title: user approved "Concept Scope and Disambiguation Convention" over the initial "Multi-Subsidiary Concept Naming Convention" after scope analysis showed the convention covered scope + disambiguation, not just naming.