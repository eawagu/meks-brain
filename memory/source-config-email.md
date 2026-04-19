---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T09:11:37Z. Post-briefing skim tick captured 7 threads including Access RC06 correspondence (08:27–08:57 UTC), Duty Handover 20260419 corroborating Coralpay off + Access reports, and resolution tails of overnight Stanbic/Access RC91 threads. RECOVERY HOLDING — 38h02m post-recovery, 11 consecutive clean ticks."
updated: "2026-04-19T09:24:00Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T09:11:37Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity.
- Governance: board, audit, compliance escalation.

### Skip rules
- Automated system digests that duplicate Slack-surfaced signals.
- Calendar notification emails — use calendar source directly.

## Connector Health

**RECOVERY HOLDING** — 38h02m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 11 consecutive ticks clean since recovery. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 10:11 WAT **skim-level**. Gmail `after:2026/04/19 newer_than:4h` returned 7 threads:

1. **Access | RC06 | 20260419** — Daniel Armstrong 08:27 UTC (09:27 WAT) filing to Access card switching team + Adeolu Atilade, Itunu Olubode, Adeolu Atilade, ogheneyoma.erese, Amarachi Ibe, Tunde Akingbade, Temitayo Ola-Buraimo; CC aptpaytechnicalsupport + Oladapo Onayemi. **Recurrence reply 08:57 UTC** ("issue has resurfaced") — this plus the Slack 09:50 WAT closure establishes 09:27→09:45 WAT duration. Correlates with Slack RC06 filing. Feeds [[Access Bank — Multi-Track Failures]] track 9 delta.
2. **Duty Handover Note 20260419** — Olamide Ajibulu → Daniel Armstrong at 07:04 UTC (08:04 WAT), acknowledged 07:25 UTC (08:25 WAT). Key operational state: "13 of 17 PTSAs are currently operational. Coralpay banks are turned off due to RC91 - MP decision. Notable Updates: Access Bank participant reports..." Corroborates user-override framing from briefing-2026-04-19 B1 triage (CoralPay off as mitigation).
3. **UBA TRANSACTION ENQUIRY** — aptpaytechnicalsupport → internal group at 07:07 UTC. Single-transaction decline inquiry on account 1000956616 (NGN 3000 on 2026-04-18). Operational but non-Immediate.
4. **Re: Access | RC 91 | 20260419 resolution tail** — Olamide Ajibulu → Mudiakevwe Omuvwie at 06:59 UTC confirmed "Transactions are now processing successfully". Post-07:11 WAT tail of overnight-wave thread already captured in briefing-2026-04-19 B1 narrative.
5. **Confluence daily digest** — Jamiu Ahmed APTENT load-test updates, 06:12 UTC. System digest noise, skip per directive.
6. **BambooHR Time Off: Ravi Kiran Veluguleti** — 09:05 UTC (Wed Apr 01 sick leave). HR noise, non-operational.
7. **Re: Stanbic | RC91 | 20260419 resolution tail** — Olamide 06:06 UTC "Transactions are now processing successfully". Already captured in briefing-2026-04-19.

Layer 1 (To:me) catch: only BambooHR at 09:05 UTC — noise. No urgent direct-to-CTO email in-window.

Layer 2 keyword hits: RC06 (new mode), RC91 (resolution tails), NIBSS (none new), issuer keywords on Access. No Immediate-tier dispatch — all hits are either resolved or corroborating already-triaged briefing items.

Accumulates to next briefing: RC06 track on Access (Awareness), Duty Handover corroboration (Awareness — routine handover format, factors=keyword=duty handover+RC91).
