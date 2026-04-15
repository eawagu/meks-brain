---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: "2026-04-15T13:14:14Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-15T13:09:00Z"
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
- **2026-04-15 14:09 WAT tick: ~4 genuinely new signals in 12:09–13:09 UTC window. No Immediate alerts.** Briefing-tier: (1) **Fidelity MEMORY RESOURCE INCREASE COMPLETED 14:02 WAT** — Christian Okeke confirmed server memory now at 48GB; Emeka Joseph ack 14:04 WAT. Closes 20h escalation; 3h08min from Fidelity ack to fulfillment. Logged to [[Fidelity Bank ATS — RC91 Failure Ongoing]]; exposure item #9 closed. (2) **Pivot invoice approvals — 2 pending, addressed to Emeka:** INV-6056 Samuel Olulope (DevOps) Internet Solutions Nigeria NGN1,935,000 (14:00 WAT) and INV-6038 Kehinde Lawrence (Infra) Rack Centre NGN2,249,437.50 (13:19 WAT). Routine finance approvals but layer-1 To-addressed; surface as awareness-to-briefing items. (3) **Zone-TeamApt Juliana Account Transfer Agreement summary** — Taiwo Baptista 13:56 WAT to Chizoba Nwokedinobi, CC Emeka. Zone looking to route transactions to TeamApt as POS issuer. CC only, informational. Awareness-tier: Ecobank Core Banking Planned Maintenance notification 13:39 WAT (DL); Stanbic DCIR Portal wrong account number 260408258334 chaser cycle (Nosarieme 12:23 WAT → Emeka Joseph 13:25 WAT); Stanbic Settlement Account 0001409339 (David Oseji/Emeka Joseph 13:29-13:31 WAT requesting session with Stanbic Godwin Ajiboye, Toluwase Shorun); Moniepoint Disputes ack thread (Latifat Saka 13:53 WAT); FCMB pending DCIR re-query list (Joel Olowo 12:57 WAT); Florence Olarinde DAILY BANK STATEMENT thread continued. **Stanbic commitment due today — Oladapo 1:1 concluded ~13:00 WAT; no post-1:1 email from Oladapo in this window.** Carry to next briefing if still silent at 15:09 WAT tick.
- 2026-04-15 13:09 WAT tick: ~30 signals in 11:09–12:09 UTC window. No Immediate alerts. Briefing-tier: NIBSS Moses Ajani explicit denial 12:51 WAT on RC91 attribution; CEO KPI Scorecard FY2025 shared; Persistent Balance Disparities escalation; CMS Project Resync chaser; Direct Card Servers Restart maintenance. Awareness: multiple DCIR/settlement items. Skip: Azure, Lotus Beta Analytics webinars.
- 2026-04-15 12:09 WAT tick: ~10 new signals. Wema remediation script EXECUTED; NIBSS RC91 reconfirmation loop; Gemini Direct to Bank standup notes received.
- 2026-04-15 11:09 WAT tick: 12 signals. Parallex DCIR DB INDEX JOB FAILURE; Fidelity MEMORY RESOURCE acked; Jeje NSS pushback; Ecobank DCIR claims in progress.
- 2026-04-15 10:09 WAT tick: ~30 signals. NIBSS RC91 window 09:49–09:53 WAT; Fidelity Afrigo card routing error.
- 2026-04-15 09:09 WAT tick: 11 signals. Access Bank vulnerability jar shared; MEMORY RESOURCE chaser 1; Juro NDA Dangote PRP fully signed.
- 2026-04-15 08:10 WAT tick: 3 new signals. No Immediate alerts.
- 2026-04-15 07:10 WAT briefing tick: 3 new signals. Rack Centre access granted (B7); Qazim hourly report (B6); AWS Marketplace F5 BIG-IP (B9 skip).
- 2026-04-14 23:09 WAT tick: 2 outbound approvals by Emeka.
