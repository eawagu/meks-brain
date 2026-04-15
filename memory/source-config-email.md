---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: "2026-04-15T15:15:13Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-15T15:09:00Z"
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
- **2026-04-15 16:09 WAT tick: 7 new signals in 14:09–15:09 UTC window. ONE HIGH-PRIORITY BRIEFING ITEM.** (1) **Tolulope Obianwu 15:29 WAT "Re: URGENT: Reconciliation Discrepancy – Monnify Atlas NIP Outwards Transit Account (0000224028)"** — Tier 1 direct report CC'd to Emeka. Thread origin Odunayo Esan 15:02 WAT flagging duplicate debits ₦2,671,766.05 on transit account 0000224028. Oluwafemi Ajayi (Moniepoint Settlement Head) 15:24 WAT requesting service disablement, cites prior Mar 17–26 ₦3.2M unrecovered. Tolulope framing as systemic, asking Damilare for product overhaul and structured reviews. NEW situation page [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]] opened. Salience: Briefing tier (CC'd, not To; CTO posture is oversight; Damilare is business-owner actor). Feeds tomorrow's 06:00 WAT briefing. (2) Abayomi Ojamomi 15:18 WAT response to "Persistent Balance Disparities" — CC'd, apologizes for delay, continues thread; awareness. (3) Oluwadamilola Odugbesan 15:14 WAT "ATS Reconciliation Requirements" chaser to Khadija Musa — CC'd, awareness. (4) Ifeoluwa Oguntona 16:04 WAT Zenith x TeamApt DD vulnerability reconfirmation response — CC'd, routine remediation thread; awareness. (5) Ogechukwu Alaebo 15:02 UTC Monnify PayFac Access Bank "instruction was not signed" — not addressed, skip. (6) Parallex server restart coordination (Babajide 15:35, Emmanuel 15:38 WAT) — not addressed, skip. (7) Charles Chukwuemeka 15:31 WAT unauthorized debit court order — Cowrywise thread, not addressed, skip.
- 2026-04-15 15:09 WAT tick: 6 new signals in 13:09–14:09 UTC window. ONE IMMEDIATE. (1) IMMEDIATE: Olamide Ajibulu 15:07 WAT "Union Bank | RC91 | 20260415" — new Union Bank RC91 P1 filing. Keywords: "RC 91", "failing", "high processing time". Routing oddity — addressed to `fepsupport@fidelitybank.ng` (Fidelity, not Union) — likely template error. Cycle 2 in 3 days for Union (cycle 1 was TDSD-6519 Apr 12, ~16min). Slack DM draft queued to U080PEXEZ0E. [[Union Bank]] entity updated. (2) Florence Olarinde 14:57 WAT Fidelity bank statement chaser to Justin Ighodaro — CC only, awareness. (3) Emeka Joseph 14:57 WAT Zenith vulnerability reconfirmation ask to Onyinye Nweke — Emeka not on CC, skip. (4) Abraham Isinguzoro 14:56 WAT Fidelity UAT rescheduling support to Tunde Okufi — CC Emeka, awareness. (5) Latifat Saka 14:41 WAT Moniepoint dispute investigation complete — DL only, awareness. (6) Moses Ajani 14:32 WAT "BIN BROADCAST FOR FIRST BANK 7218239" — routine tech broadcast, skip.
- 2026-04-15 14:09 WAT tick: ~4 genuinely new signals. Fidelity MEMORY RESOURCE INCREASE COMPLETED (48GB). Pivot INV-6056/INV-6038 layer-1 approvals. Zone-TeamApt Juliana Account Transfer Agreement summary. Stanbic commitment due today — Oladapo 1:1 concluded ~13:00 WAT; no post-1:1 email from Oladapo.
- 2026-04-15 13:09 WAT tick: ~30 signals. NIBSS Moses Ajani RC91 denial; CEO KPI Scorecard FY2025; Persistent Balance Disparities escalation; CMS Project Resync chaser; Direct Card Servers Restart maintenance.
- 2026-04-15 12:09 WAT tick: ~10 signals. Wema remediation script EXECUTED; NIBSS RC91 reconfirmation loop; Gemini Direct to Bank standup notes.
- 2026-04-15 11:09 WAT tick: 12 signals. Parallex DCIR DB INDEX JOB FAILURE; Fidelity MEMORY RESOURCE acked.
- 2026-04-15 10:09 WAT tick: ~30 signals. NIBSS RC91 window 09:49–09:53 WAT; Fidelity Afrigo card routing error.
- 2026-04-15 09:09 WAT tick: 11 signals. Access Bank vulnerability jar; MEMORY RESOURCE chaser 1; Juro NDA Dangote PRP fully signed.
- 2026-04-15 08:10 WAT tick: 3 new signals. No Immediate alerts.
- 2026-04-15 07:10 WAT briefing tick: 3 new signals. Rack Centre access granted (B7); Qazim hourly report (B6); AWS Marketplace F5 BIG-IP (B9 skip).
