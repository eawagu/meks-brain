---
type:
  - "concept"
title: GoSubscribe
created: 2026-04-11
summary: TeamApt Direct Debit product for recurring subscriptions via POS — one of 6 strategic growth levers in CEO diversification plan; agent-led distribution via 25K+ agents for DSTV/GOTV, utilities, IPOs, micro-pensions, micro-health insurance; staging validation issues (RC91 routing reverting, POS amount hardcoding) as of Apr 10; CEO Dennis aggressively pushing execution.
updated: "2026-04-16T05:45:57Z"
cssclasses:
  - "concept"
---

## Overview
GoSubscribe is a [[TeamApt]] product that enables recurring direct debit subscriptions via POS terminals, using the Direct Debit mandate infrastructure. Currently only Zenith Bank and WEMA are enabled on ATS for GoSubscribe; [[Dennis Ajalie]] (CEO) asked for expansion to other banks on April 1. The product has undergone war-room-level debugging in early April 2026 ahead of a CEO demo with Dennis on April 7.

## Strategic Position (Apr 15, 2026 — CEO Strategy Deck)

GoSubscribe is one of 6 growth levers in [[Dennis Ajalie]]'s diversification strategy to reduce TeamApt's 86% Moniepoint revenue dependency. Positioned as: DD + niche payments on POS, with agent-led distribution via 25K+ agents.

**Target verticals:** DSTV/GOTV subscriptions, utilities, IPOs, micro-pensions, micro-health insurance for the informal sector.

Dennis explicitly named GoSubscribe execution (alongside international card payments) as a top priority: "Aggressively push GoSubscribe working with VAS team."

## Status Timeline
| Date | Event |
|---|---|
| Mar 30 | CEO Dennis asks what's needed to expand beyond Zenith + WEMA |
| Apr 3 | TMS stopped routing to TeamApt (Switch last received mandate Apr 2) |
| Apr 6 | Two confirmed root causes: (1) TMS routing stopped since Apr 3; (2) Kafka staging connectivity down |
| Apr 6 | Both root causes cleared by 13:55 WAT; RC68 enrollment failure persists as 3rd failure mode |
| Apr 7 | War room at 08:00 WAT; mandate activation confirmed at 10:13 WAT (RC00 APPROVED); CEO demo viable |
| Apr 7 | Wrong PIN → RC00 approved (P0 authentication bypass found, 18:18 WAT) |
| Apr 8 | Wrong PIN P0 confirmed dev environment limitation (13:00 WAT, Timilehin Izundu) — production rollout block lifted pending PR merge + retest |
| Apr 8 | RC91 routing config confirmed structurally reverting post-Abeeb Ola patch (16:42 WAT) — Abeeb: "I'm not sure why it keeps reverting" |
| Apr 8 | POS charge amount hardcoded at NGN100 — backend must return actual debit amount dynamically |

## Blocking Items (as of April 10)
1. **RC91 routing config reverting** — Abeeb Ola's patch not holding; structural fix required; production rollout blocked until durable fix
2. **POS amount hardcoded at NGN100** — backend API must return actual debit amount dynamically; design decision pending from Victor Madu
3. **Receipt generation fix** — Akindele Odedoyin PR awaiting merge + Ekene Oranekwu retest

## Key People
- [[Victor Madu]] — product ownership; committed morning call Apr 7; POS amount design decision
- [[Ekene Oranekwu]] — testing; reported all defects
- [[Yasir Syed Ali]] — senior ownership commitment; war room hosting
- [[Ketan Dhamasana]] — Kafka fix path
- [[Abeeb Ola]] — TMS routing config; patch not holding
- [[Timilehin Izundu]] — confirmed PIN P0 = dev env
- [[Akindele Odedoyin]] — receipt generation PR
- [[Daniel Ojinaka]] — DD product lead; Paystack integration

## Related
- [[Direct Debit Reconciliation]] — operational backend
- [[RC91 Multi-Bank Failure Pattern]] — TMS/HA Proxy failures producing RC91/RC68 are related
- [[Paystack]] — commercial integration being established via #teamapt-x-paystack-transfer-support
- [[Value-Added Services Retention Effect]] — VAS-first strategy aligns with GoSubscribe's agent-led VAS distribution

## Sources
- [[notes-2026-04-02]] — CEO GoSubscribe bank expansion ask
- [[notes-2026-04-07]] — GoSubscribe CEO demo at risk; two root causes confirmed; RC68 persists
- [[notes-2026-04-08]] — mandate activation confirmed; wrong-PIN P0; RC91 routing config reverting; POS amount hardcoding
- [[notes-2026-04-09]] — RC91 routing config confirmed structural; POS amount gap; NIBSS RC96 threat
- [[source — TeamApt Strategy Retreat 2026 CEO Deck (Dennis Ajalie, Apr 15)]]