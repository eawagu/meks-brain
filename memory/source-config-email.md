---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: "2026-04-14T22:12:29Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-14T22:09:00Z"
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
- 2026-04-14 23:09 WAT tick: 2 new signals in 20:09–22:09 UTC window (21:09–23:09 WAT), both SENT by Emeka (user approvals, not inbound asks). (1) **Emeka 22:06 WAT — Re: Request For Access To The Rack Center** — "Approved" reply to Lateefat Adedeji-Oyedeji re: data centre access for Wednesday Apr 15 Key Loading activities. (2) **Emeka 21:57 WAT — Re: TRIP TO RACK CENTER** — "Approved" reply to Lateefat Adedeji-Oyedeji re: Wednesday Apr 15 11:00 AM ride to Rack Centre Plot 18, Jagal Close, Oregun. Both routine logistics approvals. No inbound actions. Awareness tier; no Immediate alerts.
- 2026-04-14 21:09 WAT tick: 3 new signals in 18:09–19:09 UTC window (19:09–20:09 WAT), + 1 marketing skip. Key signals: (1) **Qazim Adedigba 20:35 WAT — Fidelity RC91 Cycle 4 (TDSD-6552) RESOLVED** — reply to John Uguru-Okorie reconfirm request, "Transactions are processing fine now." Both Apr 14 RC91 cycles (morning + evening) now closed. Situation [[Fidelity Bank ATS — RC91 Failure Ongoing]] updated. No Immediate alert — resolution signal. (2) **John Uguru-Okorie 20:14 WAT — Fidelity reconfirm ask on TDSD-6552** — routine reconfirmation loop. (3) **Qazim Adedigba 20:33 WAT / 21:01 WAT — Hourly Report #20260414** — fourth reconfirmation of the day (16/17 routes, Sterling off with CoralPay engagement). Situation [[Sterling + Polaris — Routes Degraded]] updated. (4) Hilton Honors promo — skipped per marketing rule.
- 2026-04-14 19:09 WAT tick: 6 new messages in 17:09–18:09 UTC window (18:09–19:09 WAT). Key signals: (1) **Qazim Adedigba 19:05 WAT — Fidelity Bank | ATS | RC 91 Failures | 20260414 | TDSD-6552** — second Fidelity RC91 P1 of the day. Immediate-tier trigger. Situation [[Fidelity Bank ATS — RC91 Failure Ongoing]] updated with cycle 4. (2) **Samuel Adewole 18:44 WAT — Fidelity Cards BIN 56400206 routing "configured already"** — resolution signal on the ISW PTSA→ATS workaround. (3) **Qazim Adedigba 18:33 WAT — Hourly Reports 20260414** — 16/17 routes operational, Sterling off with CoralPay engagement ongoing. (4) **Lateefat Adedeji-Oyedeji 18:42/18:34 WAT — Rack Center access + Trip** (CC Emeka). (5) **Mariam Bakare 18:48 WAT — Union Bank reconciliation follow-up**.