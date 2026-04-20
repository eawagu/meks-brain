---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T16:09:00Z. 17:09 WAT Full tick: NIBSS TSA Integration meeting confirmation thread Apr 21 14:00 WAT surfaced via Layer 1 (user on To:). Zero new operational incidents via email. Union Bank cycle 2 filing did NOT produce an outbound-to-bank email (fast-cycle, auto-recovered internally). Three CTO-approval-gate candidates still accumulating for Apr 21 briefing."
updated: "2026-04-20T16:23:35Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T16:09:00Z"
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

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated 11:09 + 12:09 + 13:09 + 14:09 + 15:09 + 16:09 + 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

## Notes

Tick 2026-04-20 17:09 WAT Full-level. 16:09→17:09 WAT window.

**Layer 1 `to:me newer_than:1h`** → NIBSS TSA Integration meeting confirmation thread Apr 21 14:00 WAT. User on To:. This is a tomorrow-afternoon calendar commitment; already captured in calendar sweep. No new operational action.

**Layer 2 operational keyword sweep** → zero in-window operational escalations. Union Bank cycle 2 (16:22-16:34 WAT) did NOT produce an outbound-to-bank email — the fast-cycle auto-recovered within 12m and never crossed the "email the bank" escalation threshold. Contrast with Union Bank cycle 1 earlier today which did generate full email thread 19da83fdefd2e946 (6h39m bank-silent before first response).

**No Ecobank thread activity** on thread 19da60c7ea537e24 since Apr 19 17:24 WAT sample delivery — ~23h45m silence from [[Adewuyi Mayowa]] at tick observation time. Reactivation threshold 17:24 WAT today = **15 minutes after this tick ends**. Next heartbeat tick (18:09 WAT) will cross threshold; if Mayowa still silent, Ecobank situation reactivates and CTO-direct engagement returns as Decision candidate for Apr 21 briefing.

**No new governance/process email in window.**

**CTO-approval-gate candidates still totaling three for 2026-04-21 briefing:**
1. **TISD-480** ArgoCD CVE remediation — Apr 17 window MISSED; needs replan.
2. **TDSD-6203** ISO Managers change — 34-day pending; 2nd approval email.
3. **Lattice 8 Downward Reviews** — 7-day countdown (Apr 27).

No Immediate triggers from email this tick.
