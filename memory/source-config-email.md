---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T08:09:34Z. 09:09 WAT Skim tick: Duty Handover 20260420 (Olamide→Qazim) captures operational state (13/17 PTSAs, Coralpay off, Eco+FCMB off on NIBSS PTSA); Keystone DCIR dispute thread ongoing (\"accounts still not funded for recovery\" 07:59 WAT); no new Layer 1 ops threads."
updated: "2026-04-20T08:17:54Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T08:09:34Z"
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

Tick 2026-04-20 09:09 WAT Skim-level. New delta since 08:09 tick:

- **Duty Handover Note 20260420** (Olamide Ajibulu → Qazim, 08:11–08:13 WAT): operational state snapshot — "13 of 17 PTSAs operational, Coralpay banks off due to RC91, Eco and fcmb off on NIBSS ptsa". Confirms state already tracked on [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] (CoralPay suite off) and [[Ecobank]] / [[FCMB]] entity pages (NIBSS PTSA off). No new situation page required — awareness confirmation.
- **Keystone DCIR dispute thread** (aptpaytechnicalsupport 07:59 WAT): reply to ongoing dispute loop — "Accounts are still not funded for recovery". Ongoing recovery friction, no escalation keyword. Awareness-tier.
- No other Layer 1 (To:me) threads of operational weight since 08:09 tick. No new P1/outage/RC91/breach keyword matches.
