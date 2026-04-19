---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T13:09:49Z. 14:09 WAT skim tick: 1 Layer 2 FCMB delta — DCIR portal thread resolution confirmation 13:32 WAT (Daniel Armstrong 'processing fine', 45m bank-side cycle). ATS-track thread silent post-12:54 WAT. RECOVERY HOLDING — 42h post-recovery, 14 clean ticks."
updated: "2026-04-19T13:18:11Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T13:09:49Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity.
- Governance: board, audit, compliance escalation.

### Skip rules
- Automated system digests that duplicate Slack-surfaced signals.
- Calendar notification emails — use calendar source directly.

## Connector Health

**RECOVERY HOLDING** — 42h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 14 consecutive ticks clean since recovery. Live delta hit this tick (DCIR portal resolution signal) confirms connector continues to produce substantive Layer 2 signal. RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 14:09 WAT **skim-level**. Gmail `newer_than:1h` keyword query returned one operational Layer 2 hit in the ~1h window since 13:09 WAT last_processed.

1. **DCIR portal resolution signal (Gmail thread 19da5913f1f27ad9) — 13:32 WAT.** [[Daniel Armstrong]] posted on the Apr 19 DCIR portal Error 91 thread: "Please be informed that transactions are processing fine at the moment." Recipients unchanged from thread origination (FCMB SwitchApplicationSupport + aptpaytechnicalsupport; FCMB CCs). **Significance:** the DCIR portal surface opened at 12:47 WAT by Joel Olowo (MMB MIS) resolved in 45m — consistent with prior FCMB fast-cycle pattern. Situation [[FCMB — RC91 P1 Apr 17]] updated with delta entry: two-surface divergence now observed — DCIR portal resolved, ATS-track thread (FCMB | RC91 | 20260418) remains silent post-12:54 WAT latent-unresolved. Not Immediate (fast-cycle resolution, no P1 filing). Accumulates to briefing-2026-04-20 as refinement of the FCMB Decision framing. Factors: source=email, thread=existing-FCMB-DCIR, resolution-signal, fast-cycle-consistent-with-pattern.

2. **ATS-track thread (FCMB | RC91 | 20260418, Gmail 19da0b068a16f755) — no in-window reply.** The day-3 continuation signal from Daniel Armstrong 12:54 WAT remains without FCMB-side response as of this tick. Gabriel Oluwagbemiga, Bashir Adeyemi, SwitchApplicationSupport, Ogundairo.Tobiloba all silent on the ATS track. This is the continuing concern going into briefing-2026-04-20 — not a new signal, but the absence of one on a thread that produced three consecutive days of RC91 reports.

Layer 1 (To:me) — no Layer 1 hits in-window.

No other Layer 2 keyword matches (no new Stanbic, UBA, Wema, Fidelity, Access, Ecobank, NIBSS, PTSA, CoralPay, CBN, P1, outage, Keystone, Polaris, Sterling threads).

Consistent with active Sunday operational cadence. Gmail connector health confirmed. Situation write completed: [[FCMB — RC91 P1 Apr 17]] updated with Apr 19 14:09 WAT delta (two-surface divergence framing).