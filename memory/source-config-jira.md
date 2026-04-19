---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. 15:09 WAT skim tick: 3 deltas — MPDTTPI-1428 (Highest → Deployed To Prod, NIBSS DD Auth epic), MPDTTPI-1663 (Medium → Ready for Staging Test, Express Checkout Safe), MPDTTPI-1780 (Medium → Deployed To Prod, Airtel Smart Cash). All no-P1/no-SLA epic-level transitions. Awareness cluster for Monday briefing. last_processed 2026-04-19T14:09:34Z."
updated: "2026-04-19T14:21:13Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T14:09:34Z"
---

## Connection

- **Connector:** Atlassian MCP
- **Cloud ID:** 15be6fd4-ef3b-4d52-ab1b-e6e706a38e06
- **Site:** teamapt.atlassian.net
- **Scope — 18 projects (1 service_desk + 17 software):**

| Display name | Key | Archetype |
|---|---|---|
| TeamApt-Service-Desk | TDSD | service_desk |
| AptPay Consolidated Direct Debit | TCDD | software |
| Aptpay Core Switching | ATPG | software |
| AptPay Direct Debit (DTB) | ADD | software |
| AptPay Switch | AS | software |
| AptPay Third Party Processing | ATPP | software |
| Direct to Bank Solutions | AD | software |
| Monnify - Account Collections | MPDTTPI | software |
| Monnify - Card Collections | MPD | software |
| Monnify - Disbursement | MBYDB | software |
| Monnify - Onboarding and Channels | OCM | software |
| Monnify - Value Added Services | MNVAS | software |
| TeamApt - Enterprise Engineering | TM | software |
| TeamApt - Finance | TAF | software |
| TeamApt - Infrastructure | TI | software |
| TeamApt - Non Bank Acquiring | TNBA | software |
| TeamApt - Operations | TO | software |
| TeamApt - PTSP | PTSP | software |

Excluded: MV (Monnify - VAS, project id 15979) — redundant with MNVAS per user decision 2026-04-18.

JQL project list (paste-ready): `project IN (TDSD, TCDD, ATPG, "ADD", "AS", ATPP, "AD", MPDTTPI, MPD, MBYDB, OCM, MNVAS, TM, TAF, TI, TNBA, "TO", PTSP)`

- **Access patterns:**
  - `searchJiraIssuesUsingJql` — JQL queries for delta detection and pattern monitoring
  - `getJiraIssue` — full ticket detail when flagged
  - `getTransitionsForJiraIssue` — check available status transitions

## Directives

Layered filter. Layer A and Layer B are JQL-derivable (no LLM). Layer C is LLM-reasoned with a per-tick cost cap.

### Layer A — Channel filter

All sweep queries constrained to the 18 project keys above. Any ticket outside this set is discarded before Layer B.

### Layer B — Heuristic pre-rank

Score each candidate ticket 0–5 on signal density. Top 20 by score pass to Layer C; the rest cluster into overflow awareness items.

**Archetype-specific signals:**

*service_desk (TDSD only):*
- SLA breaching within 2 hours → +2
- SLA breached → +2
- Authorize status with CTO as named approver → +3
- P1/P2 priority, status != Closed → +2

*software (17 projects):*
- P1/P2 priority, status != Done → +2
- Status transition to blocked / escalated / needs-review → +2
- Assignee changed mid-sprint → +1
- Due date ≤ 3 days with status != Done → +2
- Priority bumped upward in last hour → +1

*Cross-archetype:*
- Mentioned by key in active situation page body (brain lookup) → +3
- In last-tick tracked set → +1
- Stale (no update >5 days, status != Closed/Done) → +1

### Layer C — LLM reasoning

Top 20 from Layer B receive full salience scoring per `config-salience` (five dimensions) with per-ticket `Factors:` line. Output per ticket: surface/suppress, salience score, one-line rationale.

**Per-tick cost cap:** `layer_c_cap: 20`

### Overflow clustering

Tickets beyond the cap grouped by `(project, dominant_signal_type)` — one awareness line per cluster.

Format: `[Project display name] — N ticket updates (K1 <signal-type-1>, K2 <signal-type-2>, ...). Sample IDs: <first-3-keys>.`

### Archetype signal reference

**service_desk (TDSD) — TDSD-specific patterns preserved from pre-expansion directives:**

- **Approval gate bottlenecks:** Authorize status where CTO is required approver. `project = TDSD AND status = Authorize`. Surface key, summary, time in Authorize, blockers. If > 4h in business hours → flag blocking.
- **SLA leading indicators:** `project = TDSD AND ("Time to first response" = breached() OR "Time to resolution" = breached())` — and imminent-breach within 2 hours.
- **P1/P2 incident lifecycle:** `project = TDSD AND priority in (Highest, High) AND status != Closed ORDER BY updated DESC`.
- **Zero-activity tickets:** P1/P2 no comment >1h (flag immediately); P3 no comment >24h (daily briefing); any ticket no activity >5 days (stale).
- **Status transitions of interest:** Completed/Closed (resolution + RCA), Awaiting Scheme Update / Awaiting Implementation (external dependency), backward transitions (regression signal).
- **Volume patterns:** >3 P1 in 24h window surfaced as systemic pattern, not individual incidents.

**software (17 projects) — archetype defaults, refined by data:**

- Status transition to blocked/escalated, priority bumps, assignee churn mid-cycle are primary signals.
- Sprint/estimate fields available — use for "overdue sprint work" detection in Layer B.
- Due date ≤ 24h on P1/P2 flagged to Layer C regardless of Layer B rank.
- No SLA fields — absence-of-signal rules that depend on SLA do not apply.

### Monitored ticket patterns (operational context, TDSD-scoped)

- **RC91 cycles:** Bank ATS failures — recurring P1 pattern across Stanbic, UBA, Access, Fidelity, Wema, Habari, CoralPay, FCMB, Ecobank routes. Track cycle count per bank. Overnight wave closed 2026-04-19 08:24 WAT. New entries to accumulate on next cycles. See [[Stanbic Bank ATS — Persistent RC91 Pattern]] and [[Access Bank — Multi-Track Failures]].
- **RC06/RC05 card-layer cycles:** RC06 first observed on Access Apr 19 (09:27–09:45 WAT, 18m). RC05 first observed on Keystone Apr 17. Track for spread across banks.
- **Deploy window tickets:** Tickets requiring approval for maintenance windows (typically 01:00–03:00 WAT). Flag if approval pending and window within 4 hours.
- **Settlement tickets:** E92 responses, insufficient balance, reconciliation disputes. Track by bank.
- **Credential remediation:** DCIR/ACS/DD vulnerability chain — TDSD-6439, TDSD-6477, TDSD-6479 family. Track completion status.
- **Monnify internal faults:** TDSD-6617 (PENDING DISBURSEMENTS stuck IN PROGRESS, Medium, INITIAL REVIEW, assigned Emmanuel Eke) open — see [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] situation.
- **Direct-Debit mandate backlog (under watch):** TDSD-6622 (HIGH PENDING DEBIT MANDATE REQUESTS, Medium, WIP) opened 2026-04-19. Watch for escalation or volume growth.
- **NIBSS Disbursements (new pattern under watch):** TDSD-6627 opened 2026-04-19 12:17 WAT window — NIBSS-layer disbursement signal. Not presently matched to an active situation. Watch for recurrence or escalation; distinct from Monnify-internal TDSD-6617.
- **NIBSS DR Exercise correlation:** TDSD-6626 resolved 2026-04-19 07:49 WAT. Per user-override triage, NIBSS DR routed to ops; no further CTO action.

Equivalent cross-project patterns for the 17 software projects will accumulate via data as baseline stabilizes.

### Skip list

Seeded empty at 2026-04-18 expansion. Grows via weekly bulk-confirm review (Monday 07:00 WAT) — patterns dismissed 3+ consecutive times are proposed for addition. Each entry records: added_date, confirmed_by_user_date, skip_pattern (JQL fragment or key list), last_traffic_signature.

Monthly skip-list regression review (first briefing tick of each month) surfaces each skip entry with last-traffic-signature for keep / reconsider / surface-sample decision.

### Legacy skip rules (apply across all 18 projects)

- Sub-task updates on tickets already tracked at parent level
- Routine Jira automation messages (workflow transitions with no human comment)
- Tickets outside the 18-project scope unless explicitly referenced in a Tier 1 email or Slack message

### Phase 2 — anomaly-triggered reasoning

Current architecture uses fixed per-tick cap + layered pre-filter. Research (2026-04-18) flagged this as pre-AI scaffolding for steady-state operation; AI-native pattern is anomaly-triggered deep-dive (baseline per project, reason on deviations, Layer C escalation on anomaly rather than on rank).

**Migration gated on all three conditions met:**

1. **Baseline accumulation:** Minimum 4 weeks of per-project baseline data (priority distribution, status-change rate, assignee churn rolling window). Earliest eligible date: 2026-05-16.
2. **Cap starvation rate:** Fewer than 2 cap-starvation events per week. Event definition: Layer C cap hit AND a `MISS:` note within 48 hours that names a ticket starved by the cap.
3. **Baseline drift monitoring:** Statistical test on week-over-week baseline stability in place (detects when baseline tracks noise — the silent-failure mode).

When all three gate conditions verified → propose Phase 2 migration design with concrete implementation. Phase 2 NOT implemented until explicit go signal at that time.

## Connector Health

Active. RECOVERY HOLDING lifted 2026-04-18 on 18-project expansion. `searchJiraIssuesUsingJql` operational, no regression.

## Notes

Tick 2026-04-19 15:09 WAT **skim-level**. ~1h window since 14:09 WAT last_processed. JQL sweep surfaced 3 deltas in MPDTTPI (all epic-level transitions, no P1/P2).

**MPDTTPI (Monnify — Account Collections) — 3 epic-level transitions at 14:59 WAT:**
- MPDTTPI-1428 "NIBSS <> Moniepoint Account as Direct Debit Authorization Account" → Deployed To Prod (**Highest** priority)
- MPDTTPI-1663 "Express Checkout - Safe" → Ready for Staging Test (Medium)
- MPDTTPI-1780 "Airtel Smart Cash" → Deployed To Prod (Medium)

None wired to current active RC91/FCMB/Ecobank tracks. MPDTTPI-1428 is a NIBSS Direct Debit Authorization epic — adjacent to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] subject area but not on the active remediation chain. Layer B score: MPDTTPI-1428 → 2 (Highest priority + status transition), MPDTTPI-1663 → 1, MPDTTPI-1780 → 1.

**Cluster classification:** Single Awareness item for briefing-2026-04-20 — `MPDTTPI (Monnify — Account Collections) — 3 epic-level transitions (1 Highest to Deployed To Prod, 1 Medium to Staging, 1 Medium to Deployed To Prod). Sample IDs: MPDTTPI-1428 (NIBSS DD Auth), MPDTTPI-1663, MPDTTPI-1780.` No Immediate-tier dispatch. No P1/P2 escalations in-window; baseline still accumulating (~5 days of 28 required before Phase 2 migration gate). Zero cap starvation (3 candidates << 20 cap).
