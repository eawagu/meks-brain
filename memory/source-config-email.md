---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-17T19:09:00Z. Connector Health: RECOVERED at 20:09 WAT tick after 5 consecutive tool-upgrade failures — briefing-2026-04-18 Decision framing flips from outage remediation to RCA confirmation with Nicolaas."
updated: "2026-04-18T09:44:43Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-18T09:29:50Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone.
- Governance: board, audit, compliance escalation.

### Skip rules
- Automated system digests that duplicate Slack-surfaced signals.
- Calendar notification emails — use calendar source directly.

## Connector Health

**RECOVERY HOLDING** — 14h20m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational in this tick; no regression. RCA carry-forward for [[Nicolaas Taljaard]] remains open — see briefing-2026-04-18.

## Notes

Tick 2026-04-18 10:29 WAT window (first tick after the 23:00–05:00 WAT skip gap): High-priority Layer 1 catch this window:

- **[[Odunayo Esan]] 08:54 WAT Apr 18** — reconciliation quantification for Monnify Atlas NIP Outwards Transit (0000224028). ₦32,659,067.91 across 381 transactions; Temitope Odunuga's 17:35 WAT Apr 17 reconciliation spreadsheet attached. 12x scope expansion on the Apr 15 report. Surfaced as briefing-2026-04-18 B1. Delta captured on [[Monnify Atlas NIP Outwards Transit — Duplicate Debit Recurrence]].
- **Duty Handover Note 20260418** — formal SBP (Sterling Bank Plc) reclassification into CoralPay suite. Net route count unchanged at 13/17. Delta captured on [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]].

Layer 2 keyword scan returned steady-state traffic (RC91 threads on Stanbic/Access/UBA silent overnight, consistent with Slack silence). No Immediate-tier email signals. Next tick will continue monitoring.
