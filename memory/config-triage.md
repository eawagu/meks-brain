---
title: config-triage
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-12T03:09:55Z"
updated: "2026-04-12T03:09:55Z"
summary: Triage protocol — how any brain-connected client walks through a briefing, assembles live context, collects governance decisions, writes dispositions, and executes approved actions.
---

## Purpose

Triage is the governance workflow for the daily briefing. The AI pre-resolves every item with a recommended disposition and concrete action. The user approves, overrides, or redirects. The AI executes approved actions.

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

### 3. Present

Present all items in a single view with their computed Implications and the heartbeat's Recommended Actions. The user scans the full set and governs by exception.

For each item, show:
- Item ID and Ask (or Signal for awareness items)
- Computed Implication (from step 2)
- Recommended Action (from the briefing page)

The user can respond with:
- **"approved"** or **"go"** — approve all recommendations at once
- **Item-level overrides** — e.g., "override B3: defer to Monday", "hold B7"
- **Questions** — the client answers using brain context, then re-presents the item for disposition

### 4. Execute

For each approved or overridden item:
- **Act:** Execute the action via the appropriate external MCP (Slack, Jira, Gmail, GCal — depends on the action).
- **Delegate:** Create a commitment page in the brain via `create_page` (type: `["commitment"]`, fields: owner, counterparty/delegatee, specific ask, due date, accountability). Send the delegation via external MCP if specified.
- **Defer:** Create or update a commitment page with the deferred due date.
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
- Items approved: N
- Items overridden: N
- Items held: N (these can be revisited later)
- Items discarded/noted: N
- Actions executed: list concrete actions taken
- Commitments created: list with page titles

## Notes

- The client assembles context at triage time, not at briefing creation time. This ensures all context is current — signals may have arrived between briefing creation and triage.
- The Improve phase of the heartbeat reads the Triage Results table to calibrate. Overrides (where the user rejected the AI's recommendation) are the primary learning signal.
- Held items can be revisited by running triage again — the client checks which items lack a disposition in the Triage Results table.
- No new brain MCP tools are needed. Triage uses existing tools: `get_page`, `update_page`, `search`, `create_page`.