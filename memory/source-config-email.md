---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T09:09:00Z. 10:09 WAT Skim tick: Gmail MCP narrow-window query hit token-budget cap on recent-thread sweeps (to:me OR keyword OR newer_than:1d both exceeded 200k chars) — narrow sweep deferred, confidence on 1h email window carried at medium via Slack+Jira corroboration (both clear). Flag for directive refinement: need filtered-content-projection query to avoid full-thread dumps."
updated: "2026-04-20T09:16:30Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T09:09:00Z"
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

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries (`newer_than:1d` returned 335k chars; narrowed `after:2026/04/20` returned 223k chars). Per-tick heartbeat cannot consume these results directly. Workaround options for next directive revision: (a) switch to `get_thread` on metadata-only snippets from smaller `list_threads`-style pagination, (b) run narrow keyword-bucketed queries (one keyword per query, `maxResults: 5`), (c) delegate to sub-agent for filtered-content projection. Flag for future source-config update.

## Notes

Tick 2026-04-20 10:09 WAT Skim-level. Narrow email-window query attempts for the 1h slice (09:09 → 10:09 WAT) exceeded Gmail MCP token budget (see Known limitation). Email sweep for this window therefore DEFERRED — 1h gap unverified directly, confidence carried at medium via corroborating Slack Tier 3 keyword sweep (zero matches) and Jira TDSD sweep (all banking Immediate-tier keywords accounted for as bank-resolved/awareness-tier). No Layer 1 (To:me) confirmation for this 1h window. State from 09:09 tick: Duty Handover Note 20260420 (Olamide → Qazim, 08:11–08:13 WAT); Keystone DCIR dispute thread ongoing. No known new operational-weight threads in 1h window.
