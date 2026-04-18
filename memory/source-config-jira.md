---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope (TDSD service_desk + 17 software) with layered filter (Layer A channel / Layer B heuristic / Layer C LLM with cap=20) and Phase 2 anomaly-triggered migration gate. TDSD-6597 NIBSS PTSA RC91 closed at tick boundary with full RCA; NIBSS situation retired.
updated: "2026-04-18T19:21:15Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T19:09:27Z"
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

Example: `Monnify - Disbursement — 14 ticket updates (8 status transitions, 4 assignee changes, 2 priority bumps). Sample IDs: MBYDB-4421, MBYDB-4422, MBYDB-4430.`

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

- **RC91 cycles:** Bank ATS failures — recurring P1 pattern across Stanbic, UBA, Access, Fidelity, Wema, Habari, CoralPay, FCMB routes. Track cycle count per bank. TDSD-6618 (Stanbic cycle 30, Apr 18 18:45 WAT, resolved 19:37 WAT) as latest entry — see [[Stanbic Bank ATS — Persistent RC91 Pattern]].
- **RC05 cycles:** First observed on Keystone Apr 17 — distinct card-layer failure mode from RC91. Track for spread.
- **Deploy window tickets:** Tickets requiring approval for maintenance windows (typically 01:00–03:00 WAT). Flag if approval pending and window within 4 hours.
- **Settlement tickets:** E92 responses, insufficient balance, reconciliation disputes. Track by bank. TDSD-6615 (Keystone settlement pending requery, Apr 18 15:41 WAT, Medium priority, assigned Daniel Fetuga) as current active entry — downstream of Keystone RC05 Apr 17 P1.
- **Credential remediation:** DCIR/ACS/DD vulnerability chain — TDSD-6439, TDSD-6477, TDSD-6479 family. Track completion status.
- **Monnify internal faults:** Kafka lag, disbursement queue, switch latency — TDSD-6614 (Apr 18 15:09–15:12 WAT, Kafka monnify database 2h lag, cloud-engineer fast-resolve) and TDSD-6617 (Apr 18 18:06 WAT, PENDING DISBURSEMENTS stuck IN PROGRESS, Medium, INITIAL REVIEW, assigned Emmanuel Eke) as current active entries — see [[Monnify Disbursements — Stuck IN PROGRESS Apr 17+]] situation.

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

Active. RECOVERY HOLDING lifted 2026-04-18 on 18-project expansion — `searchJiraIssuesUsingJql` operational, no regression. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 20:09 WAT window (18:09 WAT → 20:09 WAT, Skim level — Jira per-source delta-check fired full processing on hit): **One in-scope Jira delta — TDSD-6618 Stanbic RC91 (cycle 30).** Filed 2026-04-18 18:45:00 WAT by [[Afeez Kazeem]], P1, resolved 19:37 WAT (~52 minutes on-ticket, ~64 minutes end-to-end from 18:39 WAT Slack filing). Triple-track visibility this cycle (Slack 18:39 WAT + Email 18:40 WAT + Jira 18:45 WAT) vs. email-only cycles 28/29 — behavioral-signature shift flagged on [[Stanbic Bank ATS — Persistent RC91 Pattern]]. Four Stanbic RC91 cycles in 32h window ≈ 3x historical baseline; salience carries to briefing-2026-04-19 as pattern item (calibration-hold precedent briefing-2026-04-17 B1 / briefing-2026-04-18 B6 suppresses Immediate re-dispatch).

TDSD-6617 (Monnify PENDING DISBURSEMENTS, tracked prior tick) — no new activity in-window, still INITIAL REVIEW assigned [[Emmanuel Eke]]. TDSD-6615 (Keystone settlement requery) — no new activity in-window. TDSD-6614 (Kafka monnify database lag) — resolved prior tick, no regression. Out-of-scope activity (IN, MNPI, LOOM, IN-*) filtered at Layer A. Layer B cap starvation: 0. No other Layer B-ranked in-scope tickets crossed Layer C threshold this window.
