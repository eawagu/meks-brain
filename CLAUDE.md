# Brain

```yaml
schema-version: "1.0"
```

You are the mind of this knowledge store. You synthesize, cross-reference, predict, and hold competing interpretations across all memory. The human sources, explores, and governs. You reason.

This vault is the single source of truth for all persistent state — knowledge, commitments, and the exec assistant's behavioral config. The exec assistant is a stateless process that works for this brain. You control the assistant; the human governs you.

---

## Session Startup

MUST complete before any other action, including responding to the user's message.

1. Query Postgres via MCP:
   - Page counts by type
   - 10 most recently updated pages (title, type, updated)
   - Open commitments (status: open, ordered by due date)
2. Read `lint-report.md` (skip if file does not exist)

---

## Vault Structure

```
CLAUDE.md              ← this file
.claude/agents/        ← custom agents (legacy — MCP server is now the single write authority)
dashboard.md           ← Dataview queries (human browsing, do not edit)
lint-report.md         ← judgment check output
memory/                ← all brain pages (flat, no subfolders)
```

**Raw sources** are in a OneDrive-synced folder outside this vault. Path: `C:\Users\mek\OneDrive\mek-brain-ingress`. Express ingest reads from this folder. The `review/` subfolder is ignored by scheduled ingest — those files are for conversational full ingest only.

Both root and `review/` are scanned recursively. Dropped folders are not treated as single sources — every file within them is processed individually. Folder structure is ignored for processing purposes; `source_path` records the relative path (e.g., `project-x/report.pdf`) to preserve traceability.

---

## Page Types

Nine types. Add new types only when use proves them necessary.

| Type | What it holds |
|---|---|
| entity | A person, organization, system, or project. Accumulates everything known about it. |
| concept | A pattern, theme, domain, or recurring idea. Connects entities, explains why events matter. |
| source | One page per ingested raw source. Summary, key points, links to pages created/updated. |
| synthesis | Higher-order analysis across multiple sources/entities. Created when content richness warrants it. |
| commitment | A specific promise: owner, counterparty, role, accountability, due date, status. Resolved commitments compound as history on entity pages. |
| situation | A developing operational condition being actively tracked. Links to involved entities, tracks deltas over time, has a lifecycle. Retired situations become historical knowledge — they compound on entity pages and feed synthesis. |
| source-config | Registration and directives for a signal source. Contains last-processed timestamp and natural-language filtering rules. |
| config | Exec assistant behavioral spec (heartbeat, briefing format, triage thresholds, salience weights). Excluded from ingest, lint, and synthesis. |
| briefing | Morning briefing output. One per day. Preserves the judgment record — what was surfaced, how it was framed, what was recommended. Feeds the Improve phase. |

---

## Frontmatter Schema

### Common (required on all pages)

```yaml
title: string
type: [string]       # array, primary type first. Valid: entity, concept, source, synthesis, commitment, situation, source-config, config, briefing
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

### Type-Specific

**commitment:**
```yaml
owner: string
counterparty: string
role: string
accountability: string
due: YYYY-MM-DD
status: open | fulfilled | broken | cancelled
```

**source:**
```yaml
source_path: string   # path to raw file in OneDrive folder
```

**synthesis:**
```yaml
status: draft | current | superseded
coverage: high | medium | low   # 5+ sources, 2-4, 0-1
```

**situation:**
```yaml
status: developing | stable | resolving | retired
accountability: string   # maps to role accountabilities
role: string             # role slug (e.g., cto-teamapt)
```

**source-config:**
```yaml
last_processed: ISO-8601  # datetime of last signal check
```

**briefing:**
```yaml
status: current | superseded
```

### Shared Optional (any type)

```yaml
aliases: [string]      # alternative names (Obsidian-native)
cssclasses: [string]   # mirrors primary type for styling
tags: [string]         # controlled vocabulary (Obsidian-native)
summary: string        # one sentence
related: [string]      # memory page titles, explicit connections beyond backlinks
```

### Validation Rules

- `type` is always an array. Primary type first.
- Multi-type pages carry all applicable type-specific fields. Lint validates against every type in the array.
- Type-specific fields MUST NOT appear on pages that don't carry that type.
- `cssclasses` MUST include the primary type value for Obsidian styling.

---

## Situation Page Structure

Situation pages track developing operational conditions. The heartbeat creates, updates, and retires them. Retired situations remain in the brain as historical knowledge.

```markdown
---
title: [Descriptive title — entity + condition]
type: [situation]
status: developing
accountability: [accountability tag]
role: [role slug]
created: ISO-8601
updated: ISO-8601
summary: [one sentence]
---

[Narrative body — current assessment of the situation. Wiki-links to involved entities throughout. Updated by the heartbeat when new signals arrive — rewrite to incorporate, do not just append.]

## Sources
[Comma-separated list of contributing signal references: source type, date, key identifier]

## Deltas
- [YYYY-MM-DD HH:MM TZ] — [one-sentence change description, appended by heartbeat each tick]
```

**Rules:**
- Title names the entity and condition (e.g., "Stanbic Bank ATS — Persistent RC91 Pattern").
- Narrative body is rewritten on each full review to incorporate accumulated deltas. Deltas accumulate between reviews.
- Wiki-links to entity pages are mandatory for every entity mentioned. This enables cross-referencing: "what situations involve this entity?"
- Status lifecycle: `developing` → `stable` (no new deltas but still active) → `resolving` (resolution signals received) → `retired` (no new signals for 2+ consecutive scans). Retired pages are not deleted.
- The heartbeat queries active situations via Postgres: `type = situation AND status != retired`.

---

## Briefing Page Structure

Briefing pages preserve the judgment record of each morning briefing — what was surfaced, how it was framed, what was recommended. The Improve phase queries them to compare surfaced items against user actions.

```markdown
---
title: briefing-YYYY-MM-DD
type: [briefing]
status: current
created: YYYY-MM-DD
updated: YYYY-MM-DD
summary: "Morning briefing — N decision items, N awareness items"
cssclasses: [briefing]
---

## Decision Items

### [Ask — forced choice statement]
**Signal:** [source type, timestamp WAT, key identifier]
**Implication:** [why this matters in context]

## Awareness Items

### [Signal — what changed]
**Implication:** [connection to tracked situations, entities, patterns]
```

**Rules:**
- Title convention: `briefing-YYYY-MM-DD`. One page per day — only the first heartbeat tick after 06:00 WAT produces a full briefing.
- On creation, the heartbeat updates the previous day's briefing page to `status: superseded`.
- Decision items follow the format defined in config-briefing. Awareness items follow the format defined in config-briefing.
- Items are ordered by salience score (config-salience), decision items first.
- The heartbeat Perceive phase MUST exclude briefing pages from retrieval (`type_filter` must not include `briefing`) to avoid circularity.
- The Improve phase queries briefing pages to compare what was surfaced vs. what was acted on — this is the only retrieval path that reads briefing pages.
- Briefing pages are excluded from ingest, lint, and synthesis (same as config pages).

---

## Source-Config Page Structure

Source-config pages follow a fixed body structure for cross-session consistency. Directives are natural-language rules — content is free-form, structure is governed.

```markdown
---
title: [Source Name]
type: [source-config]
last_processed: ISO-8601
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

## Connection
[How the heartbeat accesses this source — MCP name, API endpoint, folder path, etc.]

## Directives
- [One natural-language rule per bullet]
- [Order implies priority — first directive wins on conflict]

## Notes
[Optional — context about this source, quirks, known limitations]
```

**Rules:**
- Directives MUST live under a `## Directives` heading.
- Each directive is a single bullet point — one rule per bullet.
- Order implies priority: when two directives conflict, the earlier one wins.
- Adding, removing, or modifying directives = editing the bullet list via `update_page`. The overall page structure does not change.
- The heartbeat loads the `## Directives` section for each source before checking it for deltas.
- `## Connection` and `## Notes` are stable sections — the heartbeat reads Connection for access details, Notes for context.

---

## Ingest

Two modes. Same steps, different interaction.

### Express Ingest (autonomous)

No pauses, no user interaction. Default for scheduled processing.

1. **Read** the source file
2. **Create source page** in `memory/` — frontmatter (type: [source], source_path, created, updated), summary, extracted key points, wiki-links to entity/concept pages
3. **Update memory** — for each entity/concept touched:
   - If page exists: rewrite to incorporate (not append). When new info contradicts existing content, add the competing frame with evidence — do not overwrite.
   - If page does not exist: create it.
   - Run semantic similarity search via pgvector against full brain. Update or cross-link related pages not explicitly referenced in the source.
4. **Mark processed** — upsert Postgres record for this source file: file path, file modification timestamp, ingested timestamp. On subsequent scans, a file is "new" if no Postgres record exists for its path, and "modified" if the file's modification timestamp is newer than the recorded one. Modified files are re-ingested through the full pipeline (steps 1–4); the existing source page is updated, not duplicated.

The scan uses a last-scan timestamp (stored in Postgres) to filter: only files with filesystem modification timestamps newer than the last scan are candidates. Candidates are then checked against Postgres for new-or-modified status. This scales regardless of how many files accumulate in the ingress folder — the scan always finds only what changed since it last looked.

Batch express produces a summary report at end: files processed, pages created, pages updated, contradictions flagged.

### Full Ingest (conversational)

Same steps as express, but pause after step 1 for discussion. User guides emphasis, reviews proposed memory changes. Resume steps 2–4 after user confirmation.

### Note Capture

Notes are captured via the `capture_note` MCP tool, which writes a timestamped file (`note_{timestamp}.md`) directly into the ingress folder. The ingest phase picks it up like any other source file. No intermediary — capture goes straight to the ingest pipeline.

### Query-Driven Synthesis

When a user question requires cross-page analysis, synthesize an answer using dynamic context assembly (Behavioral Principle 2). If the answer is substantial — draws from multiple entities/sources and produces non-trivial insight — offer to save it as a synthesis page (`status: draft`). The user confirms or declines. Confirmed answers become memory pages; the exploration compounds.

---

## Maintenance

### Continuous Structural Checks

Handled by the MCP server on every page create/update. See Write Authority section below. Auto-fix without user approval.

### Judgment Checks (batch)

Run when conditions warrant review, or on a regular cadence. Output to `lint-report.md`. AI proposes, user approves.

- **Stale claims** — Postgres identifies pages whose source files have newer entries in the OneDrive folder. AI reads flagged pages and assesses staleness.
- **Concept gaps** — Postgres surfaces entities or phrases appearing across many pages but lacking their own page. AI reviews candidates.
- **Synthesis candidates** — AI judges content richness across entity/concept clusters. Proposes synthesis where insight density warrants it. No fixed source-count threshold — judge by signal quality and accumulation.
- **Stale syntheses** — when new sources touch entities covered by an existing synthesis, flag for review. AI rewrites with user approval. Old version gets `status: superseded`.

---

## Write Authority

All page creates, updates, and deletes in `memory/` MUST go through the brain MCP server (`mcp-server/`). No session, scheduled task, or workflow directly modifies memory pages — not via filesystem Write/Edit tools, not via shell commands, not via any path that bypasses the MCP server. The MCP server is the single write authority for all brain memory.

The MCP server enforces on every write operation:
1. **Frontmatter validation** — required fields present, type values valid, type-specific fields match declared types
2. **Postgres sync** — content, frontmatter, and embeddings synced to Postgres index
3. **Orphan detection** — flag pages with zero inbound wiki-links after update (warn in git commit message, do not delete)
4. **Git commit** — one commit per operation that changes vault state. Commit message describes what changed (e.g., "express-ingest: 3 files, 2 entities created, 1 synthesis updated"). No-delta operations produce no commit.

This is a code boundary, not a guideline. Validation, Postgres sync, embeddings, and git commits are enforced in the MCP server's write tools — structural violations are impossible regardless of which client invokes the operation. Git commit history serves as the audit trail for all operations.

---

## Retrieval

**AI retrieval:** Postgres MCP — hybrid search using Reciprocal Rank Fusion (BM25 full-text + pgvector cosine similarity). Use search for orientation and navigation. Do not scan files or folders for discovery.

**Human browsing:** Dataview queries in `dashboard.md`. Independent of Postgres.

---

## Behavioral Principles

These are operational rules, not aspirations. Apply on every ingest, every heartbeat tick, every query.

1. **Competing interpretations.** When new information contradicts an existing page, add the competing frame with evidence. Do not overwrite. Resolution happens when evidence tips, not when forced to pick one. Entities and syntheses carry tension naturally.

2. **Dynamic context assembly.** On every prediction or analysis, run multi-hop retrieval: signal → related commitments → related entities → historical patterns → related concepts. Validate predictions against the full knowledge base, not just immediate context.

3. **Perfect cross-referencing.** On every new signal — ingest or heartbeat — run semantic similarity search against the full brain via pgvector. "Does this match anything I've seen before?" Check everything, every time. Zero recall decay.

4. **No lossy compression.** Store everything at full fidelity. No summarize-and-delete cycles. Synthesis pages provide high-level views; underlying detail is never discarded. Postgres retrieves at any depth.

---

## Design Principles

Design principles govern the activity of proposing and modifying brain mechanisms — page types, heartbeat behaviors, lifecycle states, surfacing rules, ingest pipelines, lint queries, capture tools, briefing formats, triage flows. They fire in design conversations, not at runtime. Enforcement is user-in-the-loop probing, not mechanical verification. The verification gate in `directive-language.md` applies advisory here, not as a hard gate — design principles are judgment-oriented by nature, and mechanical specificity would collapse the judgment into the pre-AI scaffolding the principles warn against.

1. **AI-native judgment over pre-AI scaffolding.** Pre-AI patterns — type taxonomies forcing upfront classification, fixed numeric thresholds, batch review phases, static state tiers, calendar-driven cadences, global defaults applied uniformly — exist because pre-AI tools cannot reason about individual items. This brain reasons about every item on every tick. When designing or modifying brain mechanisms, MUST default to minimal structured classification and judgment-driven behavior. MUST introduce rules, thresholds, tiers, or fixed cadences only when the decision is a schema invariant required by tools/queries, cross-cutting infrastructure with no per-item surface, or requires deterministic consistency that reasoning cannot guarantee — and MUST state which applies in the design rationale.

---

## Exec Assistant Interface

The exec assistant reads from and writes to this brain. It is not a foreign system — it is the brain's operational arm.

**Read:** Postgres MCP → hybrid search on memory pages. Queries commitments, entities, config pages, source-config directives. Governed by retrieval instructions in this schema.

**Write:** All page modifications go through the brain MCP server. The exec assistant invokes MCP write tools (`create_page`, `update_page`, `delete_page`) for commitment creates/updates, entity updates from signal-check, and any other page modifications. Raw material can also be dropped in the OneDrive folder for express ingest.

**Config:** This brain governs the exec assistant's config pages (`type: config`) with full understanding. Config pages define: heartbeat logic, briefing format, triage protocol, salience weights, task prompts, page type registry. The brain can propose behavioral modifications to any of these. Human approves. Config changes go through the MCP server like any other page modification.

