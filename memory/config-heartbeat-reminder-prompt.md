---
title: config-heartbeat-reminder-prompt
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-27T07:24:46Z"
updated: "2026-04-27T07:24:46Z"
summary: Reminder pipeline extracted from config-heartbeat-prompt — loaded on-demand during Perceive Step 2 when open reminders exist. Spans Perceive Step 2 reasoning, Plan tier-force, Act rendering (three types), Act surfacing history.
---

This prompt is loaded by `config-heartbeat-prompt` during Perceive Step 2 when open reminders exist. It covers the full reminder pipeline: Perceive Step 2 reasoning, Plan tier-force, Act rendering (three types), Act surfacing history. Assumes base-prompt context (Decision tier per config-salience, briefing item structure per config-briefing, brain MCP tool surface).

## Perceive Step 2 — Reminder evaluation

For each open reminder returned by the trigger query, reason per-item using the inputs and outputs below. Do not apply fixed age or similarity thresholds — judge each reminder fresh this tick against its own context.

**Inputs for each reminder:**
- Reminder fields: title, body (with wiki-links), `due` (if set), `created`, `## Surfacing history` (if any)
- Current tick state: today's date, all signals collected in Step 1, pages updated in the last 7 days (via `search`)
- Semantic match: run `search` with the reminder's title + body to find the top pages by similarity

**Per-reminder reasoning:**
- (a) Should this reminder surface in today's briefing?
  - **Time:** `due` is today, past, or near enough that the user needs a nudge
  - **Context-match:** wiki-links in the reminder body overlap with entities or concepts named in current-tick signals or recently updated pages
  - **Age:** reminder has been pending long enough relative to its subject-area activity and last surfacing (from `## Surfacing history`) to warrant a "still live?" ask. When uncertain, lean toward surfacing — an aging reminder that silently piles up carries less signal than one that forces the user to confirm it is still live
- (b) Has recent brain content plausibly resolved the reminder's underlying need?
  - Look at pages updated in the last 7 days that semantically match the reminder
  - Evidence quality: a passing mention does not resolve; a concrete action or outcome on the reminder's subject does

**Output schema per reminder:**
- `item_type`: `reminder_surfacing`
- `reminder_title`: the reminder's title (used to locate the page for Surfacing history updates in Act)
- `surface_now`: boolean
- `surface_reason`: `time` | `context-match` | `age` | null
- `surface_why`: a one-phrase explanation (e.g., "due 2026-04-17", "matches [[Stanbic Bank ATS]] in current signal", "pending 45 days, last surfaced 2026-03-10")
- `auto_resolve_candidate`: boolean
- `auto_resolve_evidence`: `{ page_title, brief_quote }` | null

**Emission rule.** A `reminder_surfacing` signal MUST be emitted when at least one of `surface_now` or `auto_resolve_candidate` is true. The signal carries both boolean fields per the output schema above, populated with the per-reminder reasoning result. When `surface_now` is true, the signal MUST also carry the `surface_reason` and `surface_why` fields populated; when `auto_resolve_candidate` is true, the signal MUST also carry the `auto_resolve_evidence` field populated. When both `surface_now` and `auto_resolve_candidate` are false, MUST NOT emit a signal for this reminder.

## Plan — Reminder surfacings

Classify `reminder_surfacing` signals per config-salience like any other signal.

**Auto-resolve tier-force.** When `auto_resolve_candidate` is true on a `reminder_surfacing` signal, MUST classify the resulting briefing item as Decision tier (not Awareness, not Immediate) and MUST NOT apply the salience-score-based tier classification that would otherwise route this signal. The classified item then renders per the Auto-resolve candidate type in the Act section below.

## Act — Reminder briefing item content

Render `reminder_surfacing` signals as briefing items by type:

- **Surface-only** (`surface_now: true`, `auto_resolve_candidate: false`): Ask is the reminder's title (the action to take). Signal is `surface_why` plus `surface_reason`. Recommended Action is the reminder body or a user-facing restatement. References: `[[reminder title]]`.
- **Auto-resolve candidate** (`surface_now: false`, `auto_resolve_candidate: true`): Ask is `Reminder "[title]" — resolved by recent content?`. Signal: `Semantic match against [[page_title]] updated YYYY-MM-DD` with the brief_quote. Recommended Action: `Mark reminder as auto-resolved`. Confidence per Confidence Assessment Guidelines (config-briefing). References: `[[reminder title]]`, `[[page_title]]`.
- **Combined** (both true): single item framed as `[title] — resolved by [[page_title]], or still live?`. Present both paths; user chooses in triage.

## Act — Reminder surfacing history

After emitting a briefing item from a `reminder_surfacing` signal (per the Emission rule above), MUST call `update_page` on the reminder page to append an entry to its `## Surfacing history` section. If the section does not exist on the reminder page, MUST create it under the page body before appending. Entry format: `[ISO timestamp] — surfaced via {time|context-match|age|auto-resolve}: {surface_why or evidence.page_title}`. Use `auto-resolve` as the reason when only `auto_resolve_candidate` fired; use `surface_reason` when `surface_now` fired; use both separated by `+` for combined items. This runs on every briefing tick regardless of user disposition — history records the heartbeat's emission-time judgment, not the triage outcome.