---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T11:09:00Z. 12:09 WAT Full tick: 3 new to:me threads in 11:09→12:09 window — 1 new Briefing-tier Decision candidate (Lattice 8 pending Downward Reviews, Apr 27 deadline at 12:08 WAT), 2 awareness (Glory TSA/NIBSS follow-up, Blessing CMS chase). Zero operational incidents. Three CTO-approval-gate candidates now accumulating for Apr 21 briefing."
updated: "2026-04-20T11:15:31Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T11:09:00Z"
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

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated 11:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries (`newer_than:1d` returned 335k chars; 11-issuer OR-query returned 139k chars). Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above. Fallback options remaining for future revision: (a) switch to `get_thread` on metadata-only snippets from smaller `list_threads`-style pagination, (b) delegate to sub-agent for filtered-content projection on oversized queries.

## Notes

Tick 2026-04-20 12:09 WAT Full-level. Narrow per-keyword approach holds reliability across this tick.

**Layer 1 `to:me newer_than:2h`** → 3 new threads in 11:09→12:09 WAT window:

- **12:08 WAT — Lattice (notifications@mg.latticehq.com) "Reminder to complete your reviews"** — 7-day countdown to **Apr 27 deadline**, 8 pending Downward Reviews ("no extensions"). Concurrent calendar event `Lattice Review - Hi Emeka - 8 Pending Downward Reviews` runs Apr 13 → Apr 28 (all-day). **New Briefing-tier Decision candidate** for 2026-04-21 06:00 WAT briefing — HR/people deadline, no weekly-rhythm budget set. Factors: source=email, signal_type=hr_deadline_countdown, action_horizon=7_days, accountability_alignment=team_reviews.
- **11:42 WAT — [[Glory Alioha]] "Re: TSA Integration to NIBSS on Collections"** — follow-up to Mohammed (NIBSS) requesting technical alignment meeting. Routine project comms, large distribution list (CC includes Dennis Ajalie, Mek, Tunde Okufi, Project Delivery). Awareness.
- **11:23 WAT — [[Blessing Abel-Oguche]] "Re: MoniePoint Issuing BIN and Test Keys – Request for CMS Output File"** — reminder chase to Chris at Resync Payments (cie@resyncpayments.com) following Apr 17 thread. Awareness, routine cadence.

**Operational keywords `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:2h`** → 1 thread (TSA NIBSS Integration, same as Layer 1 — project comms not incident). Zero operational incidents in past 2h.

**Issuer-name sub-bucket sweep not run this tick** — no active signals prompted it; bank-name query still oversized without sub-bucketing. Active Ecobank wait-state (17:24 WAT threshold) unchanged from B4 override path.

**CTO-approval-gate candidates now totaling three for 2026-04-21 briefing:**
1. **TISD-480** ArgoCD CVE remediation — Apr 17 window MISSED; needs replan.
2. **TDSD-6203** ISO Managers change — 34-day pending; 2nd approval email.
3. **Lattice 8 Downward Reviews** — 7-day countdown (Apr 27).

No Immediate triggers this tick. TDSD-6630 NIBSS DD still in user-deferred state (no re-dispatch).
