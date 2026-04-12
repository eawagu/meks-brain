---
type:
  - "config"
title: config-triage
created: "2026-04-12T03:09:55Z"
summary: Triage protocol — three-tier confidence-based flow (auto-advance / propose / escalate) with dynamic context assembly, governance-by-exception, and numbered response options in Tier 2 and Tier 3.
updated: "2026-04-12T16:38:28Z"
cssclasses:
  - "config"
---

## Purpose

Triage is the governance workflow for the daily briefing. The AI pre-resolves every item with a recommended disposition and confidence assessment. The user governs by exception — approving batches, confirming recommendations, or providing judgment on genuinely ambiguous items.

This protocol works in any client with brain MCP access (Cowork, Claude Code, claude.ai, future clients). The client owns presentation and interaction; the brain owns state.

## Trigger

User says "triage" (or equivalent: "let's triage", "morning briefing", "what needs my attention"). The client reads this config page and follows the protocol below.

## Flow

### 1. Load

Read today's briefing page from brain MCP: `get_page` with title `briefing-YYYY-MM-DD` (today's date in config-user timezone).

If no briefing page exists for today, inform the user and exit.

If the briefing page already has a `## Triage Results` section with all items dispositioned, inform the user that today's briefing has already been triaged.

### 2. Assemble Context

For each briefing item, read the pages listed in its **References** field via `get_page` (situation pages, entity pages). Then run `search` with the item's Ask or Signal text to find additional connections the heartbeat may have missed.

Compute the **Implication** for each item in real time — why this item matters given the current state of referenced situations, entity history, commitment patterns, and any new connections found via search. This is the dynamic context assembly step.

### 3. Present — Three-Tier Confidence-Based Flow

Group items by type and confidence (set by the heartbeat in the briefing page — see config-briefing). Present tiers in order: Tier 1 first, then Tier 2, then Tier 3. Within each tier, preserve the salience ordering from the briefing page.

#### Tier 1 — Auto-Advance (Awareness items only)

All Awareness items. No Decision items route here — every decision gets explicit disposition.

Present as a **batch summary table** — one line per item: ID, Signal summary, Recommended Disposition. Example:

```
| ID | Summary | Disposition |
|---|---|---|
| B5 | Sterling route restored — no CTO action | Noted |
| B6 | Jira sprint velocity normal | Noted |
| B8 | Team handling DNS propagation — resolved | Noted |
```

The user scans the batch and either:
- **Approves all** — "ok" or "approved" (blanket approval for entire Tier 1 batch)
- **Pulls items out** — "hold B5" (moves B5 to Tier 2 for individual treatment)

After Tier 1 disposition, advance to Tier 2.

#### Tier 2 — Propose (Decision items, confidence: high)

Decision items where the heartbeat has a single clear recommendation and high confidence.

Present **one item at a time**. For each item:
1. Item ID and Ask
2. Computed Implication (from Step 2 context assembly)
3. Numbered response options:

```
1. Approve — [specific recommended action restated concisely]
2. Override — state different disposition
3. Hold
```

The user responds with a number (e.g., `1`) or natural language:
- **1 (Approve)** — accept the recommendation as-is and execute
- **2 (Override)** — user states the override in natural language (e.g., `2 delegate to Felix, due Friday`). The AI confirms the override, clarifying any missing fields (e.g., delegatee, due date) before executing.
- **3 (Hold)** — no action; item remains untriaged for revisiting
- **Question** — user asks for more context without picking a number. The AI answers using brain search, then re-presents the item with the same numbered options.

After each item is dispositioned, advance to the next Tier 2 item. After all Tier 2 items, advance to Tier 3.

#### Tier 3 — Escalate (Decision items, confidence: low)

Decision items where the heartbeat identified multiple viable paths or flagged genuine uncertainty.

Present **one item at a time** with full context assembly. For each item:
1. Item ID and Ask
2. Computed Implication (from Step 2 context assembly) — more detailed than Tier 2, including competing considerations
3. **Structured alternatives** under disposition headers, with continuous numbering across all groups:

**Act**
1. [AI's top recommendation — specific named action with rationale]
2. [Alternative action with tradeoff explanation]

**Delegate**
3. [Specific delegatee + ask + suggested due date with rationale]

**Defer**
4. [Suggested date with rationale derived from deadline, dependency, or next review point]

**Resolve** *(only when item references a tracked situation with status != retired, or an open commitment)*
5. [Retire situation / fulfill commitment — with evidence justification]

**Discard**
6. Discard — [reason this is a valid option, e.g., "team already handling, no CTO leverage point"]

Rules for structured alternatives:
- Numbering is continuous across all groups (e.g., Act: 1–2, Delegate: 3, Defer: 4, Resolve: 5, Discard: 6).
- Every option names a specific action or destination derived from the item's content — never generic labels like "Act on this item."
- Resolve only appears when the item references a tracked situation or open commitment. Otherwise omitted entirely.
- Defer options include at least one suggested date with a rationale derived from the item's deadline, dependency, or next review point. If no date signal exists, prompt the user to provide a date.
- The user responds with just the number, or with natural language.

After each Tier 3 item is dispositioned, advance to the next.

### 4. Execute

For each dispositioned item:
- **Act:** Execute the action via the appropriate external MCP (Slack, Jira, Gmail, GCal — depends on the action). For actions that write to external systems, draft and wait for user approval before executing.
- **Delegate:** Create a commitment page in the brain via `create_page` (type: `["commitment"]`, fields: owner, counterparty/delegatee, specific ask, due date, accountability). Send the delegation via external MCP if specified.
- **Defer:** Create or update a commitment page with the deferred due date.
- **Resolve:** Update the referenced situation page status (e.g., to `retired`) or commitment status (e.g., to `fulfilled`) via `update_page`.
- **Discard / Noted:** No external action.
- **Hold:** No action; item remains untriaged for revisiting.

### 5. Annotate

After execution, append a `## Triage Results` section to the briefing page via `update_page`. Format per config-briefing:

```
| ID | Disposition | Action Taken | Commitment | Triaged |
|---|---|---|---|---|
| B1 | approved | [concrete action executed] | — | [ISO-8601 timestamp] |
| B2 | overridden | [replacement action] | [[commitment page]] | [ISO-8601 timestamp] |
```

Valid dispositions: `approved`, `overridden`, `held`, `discarded`, `noted`.

### 6. Report

After all items are dispositioned and executed, provide a brief summary:
- Items auto-advanced (Tier 1): N
- Items approved (Tier 2): N
- Items with structured alternatives (Tier 3): N
- Items overridden: N
- Items held: N
- Actions executed: list concrete actions taken
- Commitments created: list with page titles

## Notes

- The client assembles context at triage time, not at briefing creation time. This ensures all context is current — signals may have arrived between briefing creation and triage.
- The Improve phase of the heartbeat reads the Triage Results table to calibrate. Overrides (where the user rejected the AI's recommendation) are the primary learning signal. Tier 1 pull-outs (items the user moved from auto-advance to individual review) are a secondary signal — they indicate the item should have been a Decision item.
- Held items can be revisited by running triage again — the client checks which items lack a disposition in the Triage Results table.
- No new brain MCP tools are needed. Triage uses existing tools: `get_page`, `update_page`, `search`, `create_page`.