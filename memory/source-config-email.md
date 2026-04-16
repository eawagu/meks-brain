---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: "2026-04-16T10:18:05Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-16T10:15:00Z"
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
- **2026-04-16 06:23 WAT briefing tick:** 9 messages via `newer_than:8h` query. Key signals: (1) DCIR TEAMAPT Monitoring Service 23:36 WAT — 66.0% failure rate (Wema DCIR route); (2) DCIR TEAMAPT Monitoring Service 23:20 WAT — 20.4% (Wema); (3) Segun Ogunsola (Parallex Bank) 02:29 WAT — server restart completed, awaiting DCIR interchange routing; (4) Rasheed Olanrewaju (UBA) 02:46 WAT — Direct Card servers restart completed; (5) Qazim Adedigba 00:06 WAT — Duty Handover Note 20260415 (16/17 routes, Sterling off); (6) Chris Purkis 22:57 UTC — two Head of Engineering events cancelled Fri Apr 17. All signals routed to briefing-2026-04-16.
- **2026-04-16 07:09 WAT tick:** 1 message via `newer_than:2h`: Ben Cowen (Lorum Ledger) 05:34 UTC — vendor pitch re virtual accounts/correspondent clearing (Re: USD, AED, GBP, EURO Clearing & Local Accounts). Layer 1 (To-addressed), Awareness tier. Accumulates for next briefing.
- **2026-04-16 08:09 WAT tick:** 4 messages via `newer_than:2h`: Monnify auto-ticket #38844 (skip — automated system receipt), Mariam Davies PayFac Settlement report (CC'd routine), Florence Olarinde ×2 Fidelity + Access bank statement requests (CC'd routine). All filtered by Layer 2 rules — no sender tier match, no keyword match. Zero actionable deltas.
- **2026-04-16 09:09 WAT tick:** 17 messages via `newer_than:2h`. Key signals: (1) FCMB RC91 20260416 — Afeez Kazeem filed 08:19 WAT, FCMB reconfirm request 08:35, Afeez confirmed resolved 09:02 WAT (~43 min cycle). Layer 2 keyword "RC91" match → Awareness (resolved, no CTO action). (2) Blessing Abel-Oguche re HSM key generation — asking Ekene for update, Emeka CC'd. Card infrastructure. (3) Access Bank ONUS POS User Management Review — Adeolu Atilade (Access) raised 5 security gaps (no AD, no MFA, no SoD, excessive admin, no user export); Babajide acknowledged. (4) Zone<>TeamApt Juliana Account Transfer — Zone acknowledged, will progress with Imo Akpanuwa. (5) TDSD-6572 new Jira ticket (Afeez/FCMB RC91 related). (6) Routine: bank statement requests, PayFac settlement, claims validation, unauthorized debit response — all filtered. Accumulates for next briefing.
- **2026-04-16 10:20 WAT tick:** 21 messages via `newer_than:2h`. New signals since 09:09 WAT: (1) **BambooHR time off approval — Layer 1 (To: Emeka):** Ravi Kiran Veluguleti (Sick, 1 day) and Babatunde Ademusire pending approval. HR action item, Briefing tier. (2) **FCMB RC91 recurrence** — Afeez Kazeem 09:26 WAT: "still experiencing intermittent RC91 failures" after 09:02 resolution. Initial resolution was premature. Awareness tier (ops handling). (3) **Zenith CISO vulnerability acknowledged** — Festus Amede (CISO) 10:06 WAT thanked for closing vulnerabilities. Also escalated internally to Daniel Eneh then recalled. Security keyword "vulnerability" match. Awareness tier (positive). (4) **UBA DCIR 2FA deployment approved** — Christian Uchegbu (UBA) 09:58 WAT: production deployment approved, weekend implementation. DCIR credential remediation progress. Briefing tier. (5) Emeka Joseph — Wema Bank checklist review (routine). (6) Routine: Sterling DCIR claims, bank statement requests, unauthorized debit — filtered. All accumulate for next briefing.
- **2026-04-16 11:15 WAT tick:** 23 messages via `newer_than:2h`. New signals since 10:20 WAT: (1) **Union Bank RC91 P1** — Afeez Kazeem 11:04 WAT, filed to Union Bank FEP Administration. Victor Iyama (Union Bank) 10:09 UTC requested reconfirmation. Ongoing. Layer 2 keyword "RC91" match. (2) **UBA RC91** — Afeez Kazeem 10:35 WAT, filed to UBA Channel Switching. Layer 2 keyword "RC91" match. (3) **TDSD-6576** — new Jira ticket (Afeez Kazeem, 10:05 UTC). Jira blind — visible via email only. (4) **Panel Interview Head of Engineering Round 2** — Oluwatobilola Fasanya 09:59 UTC, calendar invite for Akshya Kumar, Tue Apr 21 9:30–10:30 WAT. Emeka + Chukwudum Ekwueme + Chris Purkis on panel. Layer 1 (To: Emeka). Briefing tier. (5) **McKinsey webinar invite** — Agentic AI in Retail Banking. Skip (promotional). (6) Stanbic settlement account reconciliation (Emeka Joseph / Stanbic reconciliation unit) — routine ops. (7) Routine: PayFac settlement, claims, disputes, bank statements — filtered. RC91 signals classified Awareness (ops handling). Panel Interview accumulates for next briefing.