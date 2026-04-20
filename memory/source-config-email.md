---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T14:09:00Z. 15:09 WAT Full tick: zero to:me threads, Layer 2 keyword sweep surfaced Sterling SLA revised document returned (onyedikachi.Amorha → Glory Alioha, governance track, user CC) + NIBSS TSA Integration project thread (Glory Alioha team, user CC). Zero operational incidents via email. Three CTO-approval-gate candidates still accumulating for Apr 21 briefing."
updated: "2026-04-20T15:20:31Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T15:09:00Z"
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

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated 11:09 + 12:09 + 13:09 + 14:09 + 15:09 + 16:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

## Notes

Tick 2026-04-20 16:09 WAT Full-level. 15:09→16:09 WAT window.

**Layer 1 `to:me newer_than:1h`** (pageSize 15) → 1 in-window thread:
- **Moniepoint Dinner tonight 19:00 WAT — logistics confirmation thread.** Layer 1 match (user on To:), tonight's dinner (already accepted per B5 override on calendar). Logistics track, not operational. Awareness-tier continuation of a known calendar commitment. Factors: source=email, layer=1, event_logistics, calendar_commitment_already_accepted, not_operational.

**Layer 2 `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:1h`** → response oversize repeat pattern confirmed. Narrow issuer sub-bucket `Stanbic newer_than:1h` returned the Stanbic RC91 cycle 32 filing emails:
- Afeez / ops team filed "Stanbic | RC91 | 20260420" ~15:18 WAT. Bank auto-responder + reconfirm-status sequence ran bank-side through 16:00 WAT close. **Already captured via Slack #teamapt-tech-operations + Jira TDSD-6639** — email track is the third leg of the now-routine triple-track visibility for Stanbic cycles. No new information beyond what the Stanbic situation page already records.

**No new governance/process email in window.**

**CTO-approval-gate candidates still totaling three for 2026-04-21 briefing:**
1. **TISD-480** ArgoCD CVE remediation — Apr 17 window MISSED; needs replan.
2. **TDSD-6203** ISO Managers change — 34-day pending; 2nd approval email.
3. **Lattice 8 Downward Reviews** — 7-day countdown (Apr 27).

No Immediate triggers from email this tick. TDSD-6630 NIBSS DD still in user-deferred state (no re-dispatch).
