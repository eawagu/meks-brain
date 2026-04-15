---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: "2026-04-15T12:15:20Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-15T12:09:00Z"
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
- **2026-04-15 13:09 WAT tick: ~30 signals in 11:09–12:09 UTC window. No Immediate alerts.** Briefing-tier: (1) **NIBSS Moses Ajani explicit denial** 12:51 WAT on NIBSS PTSA RC91 window — "no service degradation from our end... transactions successfully processed even on Teamapt's terminals within this period." Directly contradicts Olamide 11:58 WAT position. RC91 attribution finger-pointing stalemate intensifies — [[Oladapo Onayemi]] engineering investigation commitment is the deciding mechanism (due today, 1:1 concluded ~13:00 WAT). Logged to [[NIBSS]] entity. (2) **CEO KPI Scorecard FY2025 shared directly with Emeka** by Favour Adeyemo 12:14 WAT — To-addressed via Google Sheets share. Executive review artifact. (3) **Persistent Balance Disparities escalation** — Tolulope Obianwu 12:11 WAT to Abayomi Ojamomi, CC Emeka: "recurring data pipeline issues are concerning... affecting reconciliation." Direct report weighing in on reconciliation; links to [[Merchant Settlement — Systemic Reconciliation Disparity]] pattern. (4) **CMS Project Resync chaser** — Blessing Abel-Oguche 12:47 WAT to CIE@resyncpayments.com, CC Emeka: "task that was due for 14th of April should be ready." External vendor pressure, CC only. (5) **Direct Card Servers Restart** — Olubayo Akintola 12:04 WAT, maintenance window 02:00–02:30 WAT Apr 16; aptpaytechnicalsupport DL notification. Awareness-tier: Parallex DCIR DB Index session confirmed 16:00 WAT (Babajide + Segun); Stanbic DCIR portal data integrity discrepancy (RRN 260408258334, Ekene/Nosarieme chasers handled by Emeka Joseph); Access Bank RC91 20260415 alert (Olamide 12:08 WAT border-of-window); FCMB pending DCIR re-query list (Joel Olowo); PayFac Monnify settlement (Access + Fidelity, routine finance); Gemini Direct-to-Bank standup notes received; Stanbic settlement account 0001409339 transaction review (David Oseji/Emeka Joseph → Stanbic chargeback). Skip-tier: Azure webinar invite, Moniepoint Ops bank statement threads, Google Sheets share notifications, Lotus Beta Analytics webinar.
- 2026-04-15 12:09 WAT tick: ~10 new signals in 10:09–11:09 UTC window. No Immediate alerts. Briefing-tier: (1) **Wema remediation script executed** — [[Emeka Joseph]] 11:30 WAT → [[Amonetsone Gbubemi]] Wema ("nudge DB team to execute outlined script"); Amonetsone 11:43 WAT "This has been treated." Resolution signal for [[Wema Bank — RC91 After Settlement Resolution]] situation. Settlement-update script EXECUTED; RC91 recurrence is next observable. Awareness-tier: (2) NIBSS RC91 reconfirmation loop — Moses Ajani 11:11 WAT asked Olamide to reconfirm; Olamide 12:58 WAT explained "system was unavailable, hence transactions did not reach your interchange." NIBSS investigating the 09:49–09:53 WAT 4-min window. (3) Teams chat mention from Precious Okiemen 11:25 WAT — integration check-in, no urgency. (4) PayFac Monnify settlement ops chatter — Mariam Davies + Folasade Abidogun across Access + Fidelity threads, routine finance. (5) Gemini "Direct to Bank : Daily stand up 11:02 WAT" notes received — delegated to Drive source for processing.
- 2026-04-15 11:09 WAT tick: 12 signals in 09:09–10:09 UTC window. **No Immediate alerts.** Briefing-tier: (1) **Parallex Bank DCIR DB INDEX JOB FAILURE** — Segun Ogunsola 11:09 WAT → [[Babajide Ojoboorun]] + aptpaytechnicalsupport; new DCIR issue at Parallex, distinct from Authentication Error thread; logged to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]. (2) **Fidelity MEMORY RESOURCE INCREASE acknowledged** — Christian Okeke 10:54 WAT → [[Emeka Joseph]]; 16h49min response time; non-response pattern broken; logged to [[Fidelity Bank ATS — RC91 Failure Ongoing]]. (3) **Jeje pushback on NSS admin credentials** — Olusegun Jeje 10:45 WAT → [[Abraham Isinguzoro]]; claims no mail received, questions whether admin access should be on operations side; ownership/delivery friction; logged to Fidelity situation. (4) **Ecobank DCIR CLAIMS IN PROGRESS** — AllENG-POSDisputeMgm 11:03 WAT → Ecobank; transactions accepted on DCIR platform but funds not reflecting; dispute workflow active; logged to DCIR situation. Awareness-tier: Parallex DCIR Authentication Error remediation in flight (Babajide 11:07 WAT "will deploy to Test then Prod"); Segun chaser 11:04 WAT on same thread; Victoria Afrigo retest acked 10:41 WAT; Union Bank portal access guidance (Ugochukwu → Victor Iyama 10:41 WAT); Polaris DD session confirmed (Mumuney → Feyisayo 10:39 WAT); Mariam PayFac Access + Monnify settlement instructions (routine Finance); FCMB User Credentials chaser (Olamide 10:12 WAT — 18h+ FCMB non-response); BambooHR time-off chaser (Ravi + Babatunde).
- 2026-04-15 10:09 WAT tick: ~30 signals in 08:09–09:09 UTC window. Two Briefing-tier: NIBSS RC91 failure window 09:49–09:53 WAT (4-min); Fidelity Afrigo card routing error. Awareness-tier: MEMORY RESOURCE chaser 1; Fidelity NSS admin credentials reminder; Dennis Strategy Retreat deck shared; Florence + Christine statement requests; UBA claims validation backlog; Read AI Day 2 report; BambooHR approvals; Confluence digest. Skip: F5 BIG-IP marketing.
- 2026-04-15 09:09 WAT tick: 11 signals in 07:09–08:08 UTC window. Three briefing-tier: Babajide 09:07 WAT Access Bank vulnerability jar shared; Emeka Joseph 08:42 WAT MEMORY RESOURCE chaser 1; Juro NDA Dangote PRP fully signed.
- 2026-04-15 08:10 WAT tick: 3 new signals. Faith Cyril Rack Centre ack; aptpaytechnicalsupport claims validation; Confluence digest (skip). No Immediate alerts.
- 2026-04-15 07:10 WAT briefing tick: 3 new signals. Fumbi Lawrence Rack Centre access granted (B7); Qazim hourly report (B6); AWS Marketplace F5 BIG-IP (B9 skip).
- 2026-04-14 23:09 WAT tick: 2 outbound approvals by Emeka.
