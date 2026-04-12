---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: Signal source registration and filtering directives for Jira (Atlassian MCP).
updated: "2026-04-12T08:14:07Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-12T08:09:00Z"
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
- **RC91 cycles:** Bank ATS failures — recurring P1 pattern across Stanbic, UBA, Access, Fidelity, Wema, Habari, CoralPay routes. Track cycle count per bank.
- **Deploy window tickets:** Tickets requiring approval for maintenance windows (typically 01:00–03:00 WAT). Flag if approval is pending and window is within 4 hours.
- **Settlement tickets:** E92 responses, insufficient balance, reconciliation disputes. Track by bank.
- **Credential remediation:** DCIR/ACS/DD vulnerability chain — TDSD-6439, TDSD-6477, TDSD-6479 family. Track completion status.

### Skip rules

- Sub-task updates on tickets already being tracked at parent level
- Routine Jira automation messages (workflow transitions with no human comment)
- Tickets in projects other than TDSD unless explicitly referenced in a Tier 1 email or Slack message

## Notes

- The Jira MCP requires `cloudId` on every call. Use `15be6fd4-ef3b-4d52-ab1b-e6e706a38e06`.
- 374 projects visible on this Atlassian instance. TDSD is the primary operational project. Other projects may become relevant — the heartbeat should note when a Tier 1 Slack or email message references a non-TDSD ticket and flag it for possible addition.
- Approval gate monitoring is the most CTO-relevant Jira signal. The TDSD-6479 pattern (five consecutive missed deploy windows, CTO approval sole blocker) is the canonical example of what this source-config is designed to catch early.
- JQL `breached()` function requires Jira Service Management SLA configuration. If SLA fields are not available, fall back to created-date-based heuristics (P1 open > 4h = likely breached).
- **AUTH FAILURE 2026-04-11T22:09 UTC:** Jira connector returned "requires authentication" — signals missed this tick. Needs user re-auth.
- **AUTH FAILURE 2026-04-11T23:09 UTC:** Jira connector still requires authentication — second consecutive tick missed. User re-auth required.
- **AUTH FAILURE 2026-04-12T00:00 UTC:** Jira connector still requires authentication — third consecutive tick missed. User re-auth required. All Jira monitoring blind since 22:09 UTC Apr 11.
- **AUTH FAILURE 2026-04-12T01:09 UTC:** Jira connector still requires authentication — fourth consecutive tick missed. >3 hours of complete Jira blindness. User re-auth required.
- **AUTH FAILURE 2026-04-12T02:10 UTC:** Jira connector still requires authentication — fifth consecutive tick missed. >4 hours of complete Jira blindness. User re-auth required.
- **AUTH FAILURE 2026-04-12T03:10 UTC:** Jira connector still requires authentication — sixth consecutive tick missed. >5 hours of complete Jira blindness. User re-auth required.
- **AUTH FAILURE 2026-04-12T04:09 UTC:** Jira connector still requires authentication — seventh consecutive tick missed. >6 hours of complete Jira blindness. User re-auth required.
- **AUTH FAILURE 2026-04-12T05:09 UTC:** Jira connector still requires authentication — eighth consecutive tick missed. >7 hours of complete Jira blindness. User re-auth required. Surfaced as B1 in briefing-2026-04-12.
- **AUTH FAILURE 2026-04-12T06:10 UTC:** Jira connector still requires authentication — ninth consecutive tick missed. >8 hours of complete Jira blindness. User re-auth required.
- **AUTH FAILURE 2026-04-12T07:09 UTC:** Jira connector still requires authentication — tenth consecutive tick missed. >9 hours of complete Jira blindness. User re-auth required.
- **AUTH FAILURE 2026-04-12T08:09 UTC:** Jira connector still requires authentication — eleventh consecutive tick missed. >10 hours of complete Jira blindness. User re-auth required.