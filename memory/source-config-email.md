---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T12:09:00Z. 13:09 WAT Full tick: 2 new to:me threads in 12:09→13:09 window — Dennis Ajalie TeamApt Account Transfer For FCMB legal-review response (12:29 WAT, governance/awareness), Mohammed Sule NIBSS TSA Integration meeting ack (12:07 WAT, routine project comms). Zero operational incidents. Three CTO-approval-gate candidates still accumulating for Apr 21 briefing."
updated: "2026-04-20T12:16:50Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T12:09:00Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity.

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR "Adewuyi Mayowa") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated 11:09 + 12:09 + 13:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. The 13:09 WAT tick hit the 91k-char cap again on `to:me newer_than:1h` even with page size 20 — the `-from:me` narrowing + pageSize 10 also hit the cap. Fallback used this tick: run the broad query, persist the oversize response to file, use `jq` for targeted metadata extraction. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

## Notes

Tick 2026-04-20 13:09 WAT Full-level. Narrow per-keyword approach + jq-from-persisted-file fallback both used this tick.

**Layer 1 `to:me newer_than:1h`** (oversize → extracted via jq) → 2 new threads in 12:09→13:09 WAT window:

- **12:29 WAT — [[Dennis Ajalie]] "TeamApt Account Transfer For FCMB"** — Dennis (TeamApt Board Chair/Legal) to [[Abraham Isinguzoro]]: "Our Legal team has completed a review of the comments and provided their responses. Kindly share the updated document..." Governance/compliance routine — legal review response cycle. User is on recipient list. **Awareness-tier.** Factors: source=email, signal_type=governance_routine, legal_review_response, not_primary_asker_for_cto.
- **12:07 WAT — [[Mohammed Sule]] (msule@nibss-plc.com.ng) "RE: TSA Integration to NIBSS on Collections"** — Mohammed acknowledges Glory Alioha's meeting request, promises to reach out with suitable date/time. Continuation of thread ID `19da9f864043089f` already seen at 11:42 WAT (Glory's ask) and 08:18 WAT (Glory's initial template thank-you). Matches NIBSS keyword (not operational — project comms). **Awareness-tier.** Factors: source=email, keyword=NIBSS, signal_type=project_comms, large_distribution, ack_message.

**Operational keywords `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:1h`** → 1 thread (TSA NIBSS Integration, same as Layer 1 — project comms not incident). Zero operational incidents in past 1h.

**Issuer-name sub-bucket sweep not run this tick** — no active signals prompted it. Active Ecobank wait-state (17:24 WAT reactivation threshold) still ~4h15m out; will revisit at 17:09 WAT tick.

**CTO-approval-gate candidates still totaling three for 2026-04-21 briefing:**
1. **TISD-480** ArgoCD CVE remediation — Apr 17 window MISSED; needs replan.
2. **TDSD-6203** ISO Managers change — 34-day pending; 2nd approval email.
3. **Lattice 8 Downward Reviews** — 7-day countdown (Apr 27).

No Immediate triggers this tick. TDSD-6630 NIBSS DD still in user-deferred state (no re-dispatch).
