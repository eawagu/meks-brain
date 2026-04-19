---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-19T12:09:29Z. 13:09 WAT skim tick (full-elevated on deltas): 2 Layer 2 FCMB signals — FCMB | RC91 | 20260418 thread day-3 continuation 12:54 WAT + NEW DCIR portal error 91 thread 12:47 WAT from Joel Olowo (MMB MIS). Calendar-invite skip: HoE Apr 22 reschedule 11am→4pm WAT. RECOVERY HOLDING — 41h post-recovery, 13 clean ticks."
updated: "2026-04-19T12:18:03Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-19T12:09:29Z"
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

**RECOVERY HOLDING** — 41h00m post-recovery at this tick (recovered 2026-04-17 20:09 WAT). Gmail MCP `search_threads` operational; 13 consecutive ticks clean since recovery. Two live delta hits this tick confirm the connector is producing substantive Layer 2 signal (not just noise). RCA carry-forward for [[Nicolaas Taljaard]] remains open.

## Notes

Tick 2026-04-19 13:09 WAT **skim-level, elevated to full-processing on deltas**. Gmail `newer_than:2h` keyword query returned two operational Layer 2 hits in the ~52m window since 12:17 WAT last_processed.

1. **FCMB | RC91 | 20260418 thread (Gmail 19da0b068a16f755) — day-3 continuation 12:54 WAT.** [[Daniel Armstrong]] posted "intermittent RC91, please check" on the Apr 18 thread after overnight silence. Addressed to [[Afeez Kazeem]]; FCMB recipients on CC. Accumulates to briefing-2026-04-20 as pattern item: three consecutive calendar days of signal on the same thread. Situation [[FCMB — RC91 P1 Apr 17]] updated with delta entry. Not Immediate (no P1 filing; existing tracked pattern). Factors: source=email, thread=existing-FCMB-RC91, continuation, pattern_significance=day-3-post-overnight.

2. **NEW DCIR portal error 91 thread (Gmail 19da5913f1f27ad9) — 12:47 WAT.** Sender: Joel Olowo ("MMB MIS" — likely Moniepoint MFB MIS unit, confirm at triage). To: SwitchApplicationSupport@fcmb.com + aptpaytechnicalsupport@teamapt.com; CC: 3 FCMB addresses. Subject: "High-rate failure of transaction on DCIR portal with error 91". Body: "high rate of transaction failures with Error 91 on the DCIR portal." In-window replies: Daniel Armstrong 12:56 WAT, Bashir Adeyemi 12:58 WAT requesting samples. First in-window FCMB-side DCIR portal surface for Error 91 (distinct from bank ATS switch track tracked in prior FCMB cycles). Accumulates to briefing-2026-04-20 as Decision item candidate: second independent surface for FCMB/RC91 pattern means the Apr 19 RCA (bank-side or CoralPay) may not cover the DCIR portal track. Situation [[FCMB — RC91 P1 Apr 17]] updated with delta. Not Immediate (no P1; two-way investigation already in flow in-window). Factors: source=email, sender=MMB-MIS, keyword=DCIR+error-91, new-surface-for-tracked-pattern, pattern_significance.

3. **Skipped — calendar-invite re-scheduling emails for Wed Apr 22 HoE Round 2 interview (chris.purkis@moniepoint.com, 13:07/13:08 WAT).** Moved from 11am–12pm WAT to 4pm–5pm WAT. Per source-config-email skip rule "Calendar notification emails — use calendar source directly." Calendar delta captured in source-config-calendar.

Layer 1 (To:me) — no Layer 1 hits in-window beyond the calendar invites already skipped.

Consistent with active Sunday operational cadence despite weekend day-of-week. Gmail connector health confirmed by substantive Layer 2 hit. Situation write completed: [[FCMB — RC91 P1 Apr 17]] updated with both Apr 19 signals.