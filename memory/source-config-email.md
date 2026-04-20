---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T14:09:00Z. 15:09 WAT Full tick: zero to:me threads, Layer 2 keyword sweep surfaced Sterling SLA revised document returned (onyedikachi.Amorha → Glory Alioha, governance track, user CC) + NIBSS TSA Integration project thread (Glory Alioha team, user CC). Zero operational incidents via email. Three CTO-approval-gate candidates still accumulating for Apr 21 briefing."
updated: "2026-04-20T14:19:38Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T14:09:00Z"
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

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated 11:09 + 12:09 + 13:09 + 14:09 + 15:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. The 15:09 WAT tick hit the 108k-char cap on `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:1h` — the `to:me newer_than:1h` pass returned directly at pageSize 15. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

## Notes

Tick 2026-04-20 15:09 WAT Full-level. 14:09→15:09 WAT window.

**Layer 1 `to:me newer_than:1h`** (pageSize 15) → 0 new threads with user in To:. User on CC only for this tick's in-window messages.

**Operational keywords `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:1h`** → response oversize (108k chars). Persisted-to-file fallback not run this tick — the key operational signal (Union Bank P1 brief cycle 14:27–14:33 WAT) came from Slack #teamapt-tech-operations Qazim Adedigba filing at 14:36 WAT, not email. Email sweep on the oversize response deferred until a signal needs disambiguation.

**Layer 2 keyword sweeps (user on CC) — 2 threads with in-window messages:**

- **Sterling SLA revised document returned** — thread 19cb8e05e4fac61c. [[Onyedikachi Amorha]] (Sterling Bank Plc) sent the revised Account Switch SLA at 14:13 WAT (after the Apr 17 12:51 WAT nudge from Glory Alioha and subsequent call). Glory Alioha acknowledged 14:50 WAT: *"Our legal team will review the document, and I will provide our feedback once the process is complete."* **Awareness-tier — governance track continuation.** Sterling is CoralPay suite bank (route-off); SLA negotiation runs in parallel. Legal review is the next-mover. Factors: source=email, keyword=Sterling, governance_track, cc_only, not_operational, sla_revision_cycle, bank_response_completed.

- **NIBSS TSA Integration project thread** — thread 19da9f864043089f. [[Glory Alioha]] (TeamApt Project Delivery) + Mohammed Sule (NIBSS Public Sector) + Blessing Wondi (NIBSS) coordinating TSA Integration on Collections. 14:42 WAT message from Glory confirmed 2 PM tomorrow for the technical meeting. **Awareness-tier — project coordination, not operational.** User on CC. Factors: source=email, keyword=NIBSS, project_coordination, cc_only, not_operational, tsa_integration_scoping.

**CTO-approval-gate candidates still totaling three for 2026-04-21 briefing:**
1. **TISD-480** ArgoCD CVE remediation — Apr 17 window MISSED; needs replan.
2. **TDSD-6203** ISO Managers change — 34-day pending; 2nd approval email.
3. **Lattice 8 Downward Reviews** — 7-day countdown (Apr 27).

No Immediate triggers from email this tick. TDSD-6630 NIBSS DD still in user-deferred state (no re-dispatch).
