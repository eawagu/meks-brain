---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: 2026-04-15
cssclasses:
  - "source-config"
last_processed: "2026-04-15T20:09:00Z"
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
- **2026-04-15 21:09 WAT tick: 4 genuinely new signals in 18:09–20:09 UTC window (4 via newer_than:3h query; 3h overlap with previous tick deduplicated). TWO CANDIDATE BRIEFING ITEMS for briefing-2026-04-16.** (1) **Precious Maduwuike 19:31 WAT → emeka.awagu@teamapt.com (Layer 1, To field)** — Google Slides share "TeamApt - Cybersecurity & IT Steering Committee (April 24, 2026).pptx". CC Dennis, Lateefat Adedeji-Oyedeji, Okechukwu Eke, Oladapo Onayemi, Tayo Mustapha, Tolu Aina. 9 days prep window. Governance/exec item. Briefing tier accumulated for 06:00 WAT Apr 16 briefing tick. (2) **Onyinye Nweke 19:24 WAT "Re: CRITICAL VULNERABILITY ON APTPAY WEB SERVER"** via aptpaytechnicalsupport To: Emeka Joseph — confirmation all issues fixed: "Exposed Heap Dump Endpoint Critical Closed; Sensitive Data and Passwords exposed..." This is the Access Bank vulnerability chain resolution (jar scan thread from Apr 15 09:09 WAT tick). Updated [[Access Bank — Multi-Track Failures]] with closure delta. Awareness tier. (3) Ifeoluwa Oguntona 19:35 WAT → Virginia Inifie @ stanbicibtc (CC Dennis, Frank, eedeh, Nora, Khadijat) "Stanbic<>Teamapt: Request for Interbank Transfer API" SLA review — Emeka on deep CC, awareness only, no action. (4) Zenith Bank DD checkmarx scan reports 19:44 WAT from Onyinye Nweke — security project progress, awareness. DCIR 19:06 WAT 40.65% alert previously caught at 19:09 WAT tick.
- 2026-04-15 19:09 WAT tick: 5 new signals in 17:09–18:09 UTC window. ONE BRIEFING-TIER ITEM (DCIR/Wema alert resumption). (1) **DCIR TEAMAPT Monitoring Service Alert 19:06 WAT** — Transaction High Failure Warning, rate 40.65% (threshold 20%). Reply-To `wemaalert@wemabank.com` identifies Wema DCIR route. First DCIR threshold breach since Apr 14 04:06 WAT 100% episode (~39h silence broken). Arrives ~7h23min after Wema DB remediation script execution 11:43 WAT — suggests remediation did NOT close underlying DCIR failure-rate generator. Classified briefing-tier (single alert, not escalating, no P1 filed). Updated [[Wema Bank — RC91 After Settlement Resolution]] and [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] with deltas. (2) **Qazim Hourly Report 19:20 WAT** — 16/17 routes operational, Sterling off (ongoing, no new delta), Stanbic sweep schedule unchanged, Open Tickets TDSD-6276 (Union Settlement) + TDSD-6385 (Sterling). Awareness. (3) Charles Chukwuemeka 18:42/18:24 WAT — Cowrywise UNAUTHORIZED DEBIT thread, Emeka not on CC, skip. (4) Edidiong Emmanuel 19:14 WAT — same thread, skip. Union Bank RC91 P1 (filed 15:07 WAT to wrong address) still no resolution signal ~4h out — already Immediate-alerted prior tick, not re-alerting.
- 2026-04-15 18:09 WAT tick: 6 new signals in 16:09–17:09 UTC window. TWO BRIEFING-TIER ITEMS (both Pivot invoice approvals addressed directly to Emeka — Layer 1). (1) Pivot INV-6036 17:41 WAT — Kehinde Lawrence (Infrastructure) requesting Emeka approval. Vendor: RACK CENTRE LIMITED. Invoice date Apr 9. Amount NGN15,924,405.00. (2) Pivot INV-6037 17:34 WAT — Same requester/vendor/date. Amount NGN77,131,680.00. Combined Rack Centre approval load ~NGN93M. Briefing tier.
- 2026-04-15 17:09 WAT tick: ZERO new signals in 15:09–16:09 UTC window. Quiet tick.
- 2026-04-15 16:09 WAT tick: 7 new signals. ONE HIGH-PRIORITY BRIEFING ITEM — Tolulope Obianwu 15:29 WAT Monnify Atlas NIP Outwards Transit duplicate-debit escalation (CC Emeka); NEW situation page [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]] opened.
- 2026-04-15 15:09 WAT tick: 6 new signals. ONE IMMEDIATE — Olamide Ajibulu 15:07 WAT "Union Bank | RC91 | 20260415" new Union Bank RC91 P1 filing (routing oddity — addressed to fepsupport@fidelitybank.ng). Slack DM draft queued to U080PEXEZ0E.
- 2026-04-15 14:09 WAT tick: ~4 genuinely new signals. Fidelity MEMORY RESOURCE INCREASE COMPLETED (48GB). Pivot INV-6056/INV-6038 layer-1 approvals.
- 2026-04-15 13:09 WAT tick: ~30 signals. NIBSS Moses Ajani RC91 denial; CEO KPI Scorecard FY2025; Persistent Balance Disparities escalation.
- 2026-04-15 12:09 WAT tick: ~10 signals. Wema remediation script EXECUTED; NIBSS RC91 reconfirmation loop.
- 2026-04-15 11:09 WAT tick: 12 signals. Parallex DCIR DB INDEX JOB FAILURE; Fidelity MEMORY RESOURCE acked.
- 2026-04-15 10:09 WAT tick: ~30 signals. NIBSS RC91 window 09:49–09:53 WAT; Fidelity Afrigo card routing error.
- 2026-04-15 09:09 WAT tick: 11 signals. Access Bank vulnerability jar; MEMORY RESOURCE chaser 1; Juro NDA Dangote PRP fully signed.
- 2026-04-15 08:10 WAT tick: 3 new signals. No Immediate alerts.
- 2026-04-15 07:10 WAT briefing tick: 3 new signals. Rack Centre access granted (B7); Qazim hourly report (B6); AWS Marketplace F5 BIG-IP (B9 skip).
