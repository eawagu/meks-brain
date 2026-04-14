---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: 2026-04-14
cssclasses:
  - "source-config"
last_processed: "2026-04-14T13:21:00Z"
---

## Connection

- **Connector:** Gmail MCP
- **Accounts:** `emeka.awagu@teamapt.com` (primary), `eawagu@gmail.com`
- **Access pattern:** `gmail_search_messages` for delta detection; `gmail_read_message` / `gmail_read_thread` for content

## Directives

### Priority model — two layers

**Layer 1 — Addressed to me (To field):** Always surface. Someone directed this to me specifically — it expects a response, decision, or action. Do not apply keyword filtering. Assess and include in briefing regardless of content.

**Layer 2 — CC'd / distribution list / inbox-wide:** Apply sender tier and keyword filtering below. Only surface if a rule matches.

### Sender tiers

**Tier 1 — Immediate (surface on any heartbeat tick):**
- Board members and investors
- CEO / COO / Dennis Ajalie
- Direct reports (Tolu Aina, Tolulope Obianwu, and others per roles registry)
- Regulatory bodies (CBN, NYDFS, NIBSS, PCIDSS, external auditors)
- Bank counterparties when escalation thread (Stanbic, UBA, Access, Fidelity, Ecobank, Sterling, Polaris, Union, Habari)

**Tier 2 — Same-day (surface in next briefing):**
- Peer executives and department heads
- Engineering leads (Ekene Udodi, Oladapo Onayemi, Wycliffe Ochieng, Yasir Syed Ali)
- Compliance (Ibukun Atoyebi)
- Vendor escalations
- AWS (health events, account notifications)

**Tier 3 — Batch (daily digest only):**
- Distribution lists (unless content matches keyword rules)
- Internal team-wide announcements
- Vendor routine communications

### Keyword rules (apply to Layer 2 messages)

**Critical — surface immediately:**
- Incident: RC91, P1, outage, down, incident, emergency, production, SEV-1, settlement failure, transaction failure, ATS failure, DCIR failure
- Security: breach, compromised, vulnerability, credential, CVE, penetration test
- Regulatory: CBN, compliance violation, audit, investigation, subpoena, NYDFS, PCI
- Escalation: escalated to CTO, escalation, requires CTO approval, approval required

**High — surface in next briefing:**
- Operational: SLA breach, deploy window, maintenance window, duty handover, daily report
- HR/people decisions: PIP, performance improvement, termination, resignation, offer letter, headcount approval, Lattice review, exit interview
- Finance: budget approval, spending approval, contract approval
- Project: Phoenix, GoSubscribe, AptPay

**Skip — do not surface:**
- Marketing newsletters and promotional emails
- Automated calendar notification emails (handled by calendar source)
- Benefits enrollment, mandatory training reminders
- Automated system receipts and purchase confirmations
- All-hands meeting invites (unless agenda contains decision items)
- Out-of-office auto-replies

## Notes

- Layer 1 (To-addressed) takes precedence over all other rules. A skip-listed keyword in a To-addressed email still gets surfaced.
- When a thread is surfaced, include the full thread context, not just the latest message.
- Duty Handover emails follow a numbered pattern (e.g., "Duty Handover #20260411") — always surface regardless of sender tier.
- Bank escalation threads often span days with multiple participants. Track thread continuity, not just individual messages.
- HR/admin split: surface anything requiring my judgment or approval. Skip routine employee compliance (benefits, training, all-hands).
- 2026-04-14 14:09 WAT tick: Zero new messages in 12:09–13:09 UTC window. Quiet inbox coincident with Strategy Retreat Day 1 mid-afternoon block. No briefing/immediate dispatch.
- 2026-04-14 14:21 WAT tick (off-cadence): 4 messages in 13:09–13:21 UTC window. (1) Chris Purkis updated invitation for recurring "Blocker: Head of Engineering (VP+) Slots" — calendar invite update, handled by calendar source. (2–3) Patrick Okonkwo / Revent Technologies — two marketing pitches ("Transforming Teamapt Limited's Digital Journey", "Accelerate Teamapt Ltd Digital Transformation Initiative") — Tier 3 skip. (4) Pivot invoice approval, NGN913,750 to MAXITECH GLOBAL INVESTMENT LIMITED, requested by Benjamin Musa (DevOps & Infrastructure), invoice date Apr 7, due Apr 20, To: emeka.awagu — Layer 1 To-addressed, requires CTO approval; Briefing-tier (not Immediate, due date Apr 20). Accumulated for next briefing. No Immediate dispatch this tick.