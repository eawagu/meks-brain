---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: Signal source registration and filtering directives for email (Gmail MCP).
updated: "2026-04-17T10:14:56Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-17T10:09:00Z"
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
- **2026-04-17 ~06:09 WAT tick (briefing):** Overnight inbox processed. Key deltas: Duty Handover Note 20260416 (Qazim Adedigba, 00:19 WAT Apr 17) — 13/17 PTSAs operational, CoralPay suite (ZIB, FBN, PVB) off per business decision, Access ATS RC91 cycle 5 (TDSD-6593, 10min), UBA + Habari brief cycles, new tickets TDSD-6587 + TDSD-6591. No new Ecobank RC91 email traffic since 21:04 WAT 'urgent' follow-up (cycle closed via Slack 22:01 WAT). Briefing-2026-04-17 B3 flagged the email↔Slack visibility gap as a candidate directive edit for the Improve phase — not applied autonomously.
- **2026-04-17 ~10:20 WAT tick (mid-morning, non-briefing):** Morning window deltas: Wema RC91 cycle 7 (filed 08:54 WAT, bank-confirmed 08:58 WAT, ~4 min). NIBSS RC91 20260417 (filed 08:40 WAT, Moses Ajani reviewing). UBA TDSD-6574 intermittent RC91 ongoing (Qazim 06:46 WAT). Stanbic TDSD-6518 reconfirmation (Samson/Qazim 08:06–08:31 WAT) — no new cycle. Access JAR vulnerability reassessment (Adeolu 08:32 WAT → Babajide fwd+ack 08:46–08:47 WAT). DCIR 25.98% alert 08:50 WAT. Hourly Report 20260417 (08:02 WAT) surfaces Sterling Bank Persistent RC91 (TDSD-6385) as new open ticket. No Immediate-tier dispatches warranted — all within established patterns; briefing already issued today.
- **2026-04-17 ~11:09 WAT tick (late-morning, non-briefing):** Late-morning window deltas (10:20–11:09 WAT): (1) NIBSS RC91 20260417 thread continuation — [[Moses Ajani]] responded 11:03 WAT with a partial-match assessment: "some of the transactions which were declined with RC: 91 as received from your system. We do not have record of others. Kindly assist." Continues the Apr 15 NIBSS stalemate pattern — divergent TeamApt↔NIBSS attribution on RC91 volumes. Bank-side still investigating; candidate for Apr 18 briefing if no resolution by EoD. (2) Stanbic Interbank Transfer API agreement — Dare Koleaje signed from Stanbic side 09:54 WAT; Ifeoluwa Oguntona acknowledged and initiated TeamApt signature workflow 10:31 WAT (CC, contract workflow, not CTO scope). (3) Fidelity NSS Meeting portal login thread — Abraham Isinguzoro resolved Jeje's portal access via link rotation 10:20 WAT (CC). (4) Blessing Abel-Oguche CMS output file request for White Plastic Card Production — CC, Layer 2 Tier 2, routine. (5) Fidelity BALANCE CONFIRMATION for Paystack thread continues (Christine Ogude ↔ Alexander Olasinde, 10:01–10:55 WAT, account statement request Apr 13 → date). No To-field Layer 1 messages to me in this window. No Immediate-tier dispatches warranted.