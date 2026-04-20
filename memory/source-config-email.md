---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T07:09:34Z. 08:09 WAT Skim tick: Union Bank RC91 cycle closed by Olamide at 07:56 WAT after bank 07:33 response (6h39m cycle); situation page updated to resolving."
updated: "2026-04-20T07:20:20Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T07:09:34Z"
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

## Notes

Tick 2026-04-20 08:09 WAT Skim-level. Primary operational delta: **Union Bank RC91 | 20260420** thread closed — bank response received 07:33 WAT; Olamide Ajibulu closed the loop at 07:56 WAT (total cycle 6h39m, 3x longest prior cycle of 2h10m on Apr 19). Situation page updated to status=resolving. TDSD-6632 Jira track documented on situation page. No other Layer 1 (To:me) threads of operational weight since 07:09 tick. Weekly-status-report backlog (Polaris DD Pilot, Zone Account Switch, Premium Trust DD, Sterling Account Switch) from 07:09 tick remains Awareness-accumulating for next briefing.
