---
type:
  - "source-config"
title: source-config-jira
created: 2026-04-11
summary: "Signal source registration and filtering directives for Jira (Atlassian MCP). 18-project scope. last_processed 2026-04-20T10:09:00Z. 11:09 WAT Full tick: 2 in-scope TDSD deltas (TDSD-6637 review comment at 11:04 WAT, TDSD-6203 Authorize metadata update at 10:13 WAT triggered by approval email). Out-of-scope TISD-480 surfaced via Layer 1 Gmail — ArgoCD CVE remediation at Awaiting Control Approval (Fri Apr 17 change window MISSED). TDSD-6630 NIBSS DD silent 5h42m on comments; user triage defer holds."
updated: "2026-04-20T10:17:46Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T10:09:00Z"
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

## Directives

### Priority model
- Service desk tickets (TDSD) with P1/outage markers — Immediate-tier candidates.
- Software project tickets with CTO approval gate — Briefing-tier.
- Routine dev/QA transitions — Awareness-tier.

### Active-situation entity match
Match updated tickets against active situation pages. Overlapping entity or keyword → elevate to Briefing-tier minimum.

### Out-of-scope surfacing via Layer 1 email
When a Jira ticket from an out-of-scope project (not in the 18-project scope above) surfaces to the user via Layer 1 Gmail (To:me) approval request, fetch the ticket metadata and treat per normal tier classification. Record in notes so the next sweep can follow the ticket without re-discovery. Example: TISD-480 surfaced 2026-04-20 via approval email.

### Skip rules
[Maintained via monthly skip-list regression review + weekly skip-list bulk-confirm per config-salience Periodic Reviews.]

## Notes

Tick 2026-04-20 11:09 WAT Full-level. TDSD sweep since 10:09 WAT surfaced 2 in-scope deltas:

**In-scope deltas:**
- **TDSD-6637 PENDING SETTLEMENT** — new comment "This is being reviewed" by Chinonyerem Alozie at 11:04 WAT (jsdPublic:true). Settlement wave carryforward from 10:09 tick. MNFY merchant tickets (MNFY|11, MNFY|12, MNFY|69) filed by Blessing Olawale (Moniepoint Ops) — unsettled transactions with no back office record. Awareness-tier; potential synthesis candidate with [[Merchant Settlement — Systemic Reconciliation Disparity]] if pattern sharpens.
- **TDSD-6203 Request for Change of ISO Managers** — updated 10:13 WAT via approval-email workflow. Second email approval request sent to Emeka at 09:18 WAT (first was 2026-03-23 = 34 days prior). Status: **Authorize** since Mar 17; Medium priority; reporter Esther Ajibode; no assignee. Description: fill vacant ISO manager slots (ISMS/BCMS/ITSMS/OH&S/IMS appointees). CTO approval-gate 12h silence rule fires heavily (34-day pending). **Briefing-tier Decision candidate** for 2026-04-21 briefing. Factors: source=jira+email, cto_approval_gate, authorize_state, 34_day_pending, second_reminder_email, compliance_accountability.

**Out-of-scope surface (via Layer 1 email):**
- **TISD-480** (project TeamApt Infrastructure Service Desk — not in 18-project scope) surfaced 09:31 WAT via approval email to Emeka. Summary: "Fix Vulnerabilities issues raised on WIZ: Argocd-server". Description: high/critical severity CVE-2024-37152 on internet-facing ArgoCD with high Kubernetes privileges; planned upgrade to ArgoCD 2.12.3+, WAF/RBAC hardening. Status: **Awaiting Control Approval**. Medium priority; reporter Hakeem Ogunbona; no assignee. **Proposed change window: Friday 17th April 2026 — ALREADY MISSED by 3 days at tick time.** Updated 10:30 WAT. **Briefing-tier Decision candidate** for 2026-04-21 briefing — needs window replan. Factors: source=jira+email, cto_approval_gate, critical_cve, internet_facing, change_window_missed, security_posture.

**TDSD-6630 NIBSS DD DOWNTIME silence status:**
- No new comments since 05:27 WAT Frances Omelu "escalated to NIBSS" (5h42m comment silence at tick).
- Last any-update 08:18 WAT (metadata refresh); 2h51m any-update silence.
- Medium priority; Assignee Kabir Yusuf; Status Work in progress.
- User triage B1 in briefing-2026-04-20 explicitly deferred to Apr 21 briefing — **no Immediate re-dispatch** per triage-deferred state.
- Silent-recovery pattern precedent intact (retired NIBSS DD Apr 14 after 47h silence).

**Settlement wave continuation (no new filings since 10:09 tick, only the TDSD-6637 comment):** TDSD-6495/6553/6637/6636/6635 from 10:09 tick still accumulating; no new additions this window.

No Immediate-tier transitions this tick. No new P1/outage filings.
