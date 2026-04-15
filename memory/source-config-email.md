---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: "2026-04-15T09:15:44Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-15T09:09:00Z"
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
- 2026-04-15 10:09 WAT tick: ~30 signals in 08:09–09:09 UTC window. Two Briefing-tier: **(1) NIBSS RC91 failure window 09:49–09:53 WAT (4-min)** — [[Olamide Ajibulu]] 10:00 WAT notified [[NIBSS]] PTSA + [[Moses Ajani]] (same contact who attributed Stanbic RC91 to Moniepoint timeout); Moses acknowledged 10:06 WAT investigating. Logged to [[Stanbic Bank ATS — Persistent RC91 Pattern]] as fresh NIBSS-rails data point for Oladapo's 12:30 1:1 commitment close-out. **(2) Fidelity Afrigo card routing error** — [[Victoria Ogaga-Omokri]] 09:46 WAT asked Emeka Joseph why Afrigo cards route to Interswitch instead of Fidelity FEP; Emeka 09:58 WAT asked retest. Logged to [[Fidelity Bank ATS — RC91 Failure Ongoing]]. Awareness-tier: MEMORY RESOURCE INCREASE chaser 2 at 09:30 WAT (++Abraham Isinguzoro, Fidelity non-response 15h26min); Fidelity NSS admin credentials reminder 10:01 WAT (Abraham → Jeje); Dennis shared TeamApt_Strategy_Retreat_2026_FINAL deck 09:02 WAT (Retreat Day 2 pre-read); Florence + Christine bank statement requests to Fidelity/Access (routine); UBA claims validation backlog 07–10 Apr (Olamide catching up); Read AI Strategy Retreat Day 2 report 08:10 WAT; BambooHR time-off approvals (Ravi Veluguleti, Babatunde Ademusire); Confluence weekly digest; PayFac Monnify settlement thread (routine Finance). Skip: F5 BIG-IP AWS Marketplace (marketing), Confluence digest (automated), Lorum prospecting (cold outreach). **No Immediate alerts.**
- 2026-04-15 09:09 WAT tick: 11 signals in 07:09–08:08 UTC window. Three briefing-tier: (1) **Babajide Ojoboorun 09:07 WAT — Re: ACCESS BANK VULNERABILITIES REMEDIATION JAR FILE SCAN REPORT** — shared Bank Integration jar with Access Bank security team; logged to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]. (2) **Emeka Joseph 08:42 WAT — Re: MEMORY RESOURCE INCREASE** — chaser to Fidelity FEP, 14h37min no response; logged to [[Fidelity Bank ATS — RC91 Failure Ongoing]]. (3) **Juro 08:35 WAT — NDA Dangote PRP fully signed** — Dennis Ajalie + Emeka Awagu signatures on file; logged to [[Dangote Petroleum Refinery and Petrochemicals FZE]]. Awareness-tier: Florence statement requests (Fidelity + Access), Olamide validation of claims batch (07:26–07:32 UTC — resolved Kennedy Ojo's 07:20 UTC UBA chaser in same window). Skip: Ruth Adetunji Core Switch Standup calendar invitation (handled by calendar source — even though calendar source is currently blind). No Immediate alerts.
- 2026-04-15 08:10 WAT tick: 3 new signals in 06:10–07:09 UTC (07:10–08:09 WAT) window. (1) **Faith Cyril 08:07 WAT — Re: TRIP TO RACK CENTER** — "This was well received" courtesy close-out of Rack Centre approval thread. Layer 1 (To me). Awareness — routine ack, no CTO action. (2) **Nonso Ezigbo via aptpaytechnicalsupport 08:02 WAT — VALIDATION OF CLAIMS ABOVE 6 MONTHS 15/04/2026** — disputes workflow, To Moniepoint Dispute, CC aptpay group. Layer 2, no keyword match. Awareness. (3) **Confluence digest 07:32 WAT — Oladapo updates to Teamapt IT-Service-Management** — automated daily digest, skip (automated). No Immediate alerts. No tracked-situation updates needed.
- 2026-04-15 07:10 WAT briefing tick: 3 new signals in 22:09 UTC Apr 14 – 06:10 UTC Apr 15 overnight window. (1) **Fumbi Lawrence 04:55 WAT Apr 15 — Re: Request For Access To The Rack Center** — "Access granted" reply addressed to Emeka, CC Lateefat + Ekene Udodi. Layer 1 signal. Awareness B7. (2) **Qazim Adedigba 23:57 WAT Apr 14 — Re: Hourly Reports 20260414** — 16/17 routes operational, Sterling off, 3 open tickets (TDSD-6276, TDSD-6385, TDSD-6548). Awareness B6. (3) **AWS Marketplace 01:10 WAT Apr 15 — F5 BIG-IP product update** — skipped per marketing rule. Awareness B9. **DCIR Monitoring silence 27h+ since 04:06 WAT Apr 14 100% spike** — implicit recovery. B8 awareness + B3 structural retro carry-forward.
- 2026-04-14 23:09 WAT tick: 2 new signals in 20:09–22:09 UTC window (21:09–23:09 WAT), both SENT by Emeka (user approvals, not inbound asks). Routine logistics approvals.
