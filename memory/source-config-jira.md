---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). RECOVERED at 20:09 WAT tick after 131+ consecutive blind ticks (~139 hours / 5.8 days since 2026-04-11T22:09 UTC). Briefing-2026-04-18 Decision framing flips from outage remediation to RCA confirmation with Nicolaas."
updated: "2026-04-18T09:45:17Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T09:29:50Z"
---

## Connection

- **Connector:** Atlassian MCP
- **Cloud ID:** 15be6fd4-ef3b-4d52-ab1b-e6e706a38e06
- **Site:** teamapt.atlassian.net
- **Primary project:** TDSD (Tech Service Desk — incidents and operations)
- **Access patterns:**
  - `searchJiraIssuesUsingJql` — JQL queries for delta detection and pattern monitoring
  - `getJiraIssue` — full ticket detail when flagged
  - `getTransitionsForJiraIssue` — check available status transitions

## Directives

### Priority model — signal types ordered by CTO relevance

**1. Approval gate bottlenecks (highest priority):**
Tickets in Authorize status where CTO (Emeka Awagu) is a required approver. These block delivery — every hour in Authorize is a missed window.
- JQL: `project = TDSD AND status = Authorize`
- Surface: ticket key, summary, how long in Authorize, who else has approved, what it blocks
- Escalation signal: if in Authorize > 4 hours during business hours, flag as blocking

**2. SLA breach — leading indicator:**
Surface tickets approaching SLA breach before they breach, not after. Post-breach tickets surfaced as process failure documentation.
- JQL: `project = TDSD AND "Time to first response" = breached() OR "Time to resolution" = breached()`
- Also flag: tickets where first response SLA will breach within 2 hours

**3. P1/P2 incident lifecycle:**
Track incident tickets from filing through resolution. Key signals: new P1/P2 filed, status transitions, resolution, RCA posted.
- JQL: `project = TDSD AND priority in (Highest, High) AND status != Closed ORDER BY updated DESC`
- Surface: new filings, status changes, resolution messages, time-to-resolution

**4. Zero-activity tickets (process failure signal):**
Tickets with no comments or status changes after defined thresholds. Indicates dropped work or silent failure.
- P1/P2: zero comments after 1 hour → flag immediately
- P3 and below: zero comments after 24 hours → flag in daily briefing
- Any ticket: no activity for 5+ days regardless of priority → flag as stale
- JQL for stale: `project = TDSD AND updated < -5d AND status NOT IN (Closed, Done, Completed, Resolved)`

**5. Status transitions of interest:**
- Moved to Completed/Closed: track resolution, note if RCA was posted
- Moved to Awaiting Scheme Update / Awaiting Implementation: external dependency — track for staleness
- Moved backward (e.g., from Work in Progress back to Initial Review): regression signal

**6. Ticket volume patterns:**
If more than 3 P1 tickets are filed within a 24-hour window, surface as a systemic pattern, not individual incidents. Cross-reference with brain entity pages for bank/service correlation.

### Monitored ticket patterns (from current operational context)

These are recurring patterns the heartbeat should watch for:
- **RC91 cycles:** Bank ATS failures — recurring P1 pattern across Stanbic, UBA, Access, Fidelity, Wema, Habari, CoralPay, FCMB routes. Track cycle count per bank.
- **RC05 cycles:** First observed on Keystone Apr 17 — distinct card-layer failure mode from RC91. Track for spread.
- **Deploy window tickets:** Tickets requiring approval for maintenance windows (typically 01:00–03:00 WAT). Flag if approval is pending and window is within 4 hours.
- **Settlement tickets:** E92 responses, insufficient balance, reconciliation disputes. Track by bank.
- **Credential remediation:** DCIR/ACS/DD vulnerability chain — TDSD-6439, TDSD-6477, TDSD-6479 family. Track completion status.

### Skip rules

- Sub-task updates on tickets already being tracked at parent level
- Routine Jira automation messages (workflow transitions with no human comment)
- Tickets in projects other than TDSD unless explicitly referenced in a Tier 1 email or Slack message

## Connector Health

**RECOVERY HOLDING** — 14h20m post-recovery at this tick (recovered 2026-04-17 20:09 WAT after 131+ blind ticks / 5.8 days). `searchJiraIssuesUsingJql` operational in this tick; no regression. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 10:29 WAT window: TDSD delta overnight — **TDSD-6613** filed 23:44 WAT Apr 17 by [[Oladapo Onayemi]] for FCMB RC91 P1. New situation page [[FCMB — RC91 P1 Apr 17]] created. Two related tickets continue to be tracked: TDSD-6611 (Awaiting Scheme Update), TDSD-6610 (Work in Progress, disbursement-reversal failure cross-reference).

No Authorize-status tickets with CTO gate surfaced. No SLA breaches in the <1h window. Initial post-recovery inventory ([[source-config-jira]] Connector Health section above) remains the authoritative baseline for the first full operational Jira day.
