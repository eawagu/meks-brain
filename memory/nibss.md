---
type:
  - "entity"
title: NIBSS
created: 2026-04-11
summary: "Nigeria Inter-Bank Settlement System — national payment infrastructure provider for Moniepoint's Direct Debit rails. Apr 14 2026: NIBSS DD P1 active (pending mandate Null errors, 03:00 WAT start); concurrent NIBSS response latency delaying wallet disbursements. Citrix LB migration completed Apr 13."
updated: "2026-04-14T06:13:09Z"
cssclasses:
  - "entity"
---

## Overview

Nigeria Inter-Bank Settlement System (NIBSS) is the national payment infrastructure provider. Moniepoint's Direct Debit program runs on NIBSS rails. NIBSS also underpins RC91/RC96 routing.

## Integration with Moniepoint

- **Direct Debit rails** — mandate creation, debit execution, settlement
- **RC91 routing** — NIBSS-mediated bank routing; 13+ banks affected in Apr 2026
- **RC96** — routing code; P1 failure Apr 9 with 64%+ failure rate
- **VPN dependency** — NIBSS connectivity requires VPN; VPN root cause identified for Apr 2026 outage (TDSD referenced in notes); ACS connector replaced with VPN fix Apr 10
- **RC91 attribution (Apr 12)** — NIBSS (Moses Ajani) attributed RC91 to "no response from your end within the timeout period" — NIBSS says Moniepoint processing latency caused the failures, not bank ATS. Competing frame with bank-side attribution, both held pending engineering investigation.

## Incident History (Apr 2026)

| Date | Event |
|---|---|
| Mar 30, 2026 | VPN root cause identified (RC91 FCMB 5th bank) |
| Apr 5, 2026 | NIBSS activation resolved after 21h (Easter P1) |
| Apr 6, 2026 | NIBSS DD TDSD-6437 formalised |
| Apr 9, 2026 | RC96 P1 — 64%+ failure rate |
| Apr 10, 2026 | ACS connector replaced (VPN fix) |
| Apr 12, 2026 | NIBSS attributes RC91 to Moniepoint timeout (Moses Ajani, 08:56 WAT) |
| Apr 13, 2026 | Citrix LB migration completed successfully (Oladapo Onayemi confirmed 19:30 WAT, Tomiwa Odumuyiwa acknowledged) |
| Apr 14, 2026 | **NIBSS DD P1 active** — pending mandate Null errors, start 03:00 WAT, filed 07:05 WAT. See [[NIBSS DD — Pending Mandate P1 Active]]. Same night: NIBSS response latency degraded wallet-to-bank disbursements (Monnify customer-facing notice at 03:15 WAT). |

## Citrix LB Migration (Apr 12–13) — Completed

Scheduled maintenance migration of Citrix environment to License Activation Service (LAS), initiated by NIBSS ([[Tomiwa Odumuyiwa]], Relationship Manager, Partnership Business).

- **Window:** 23:30 WAT Apr 12 – 05:00 WAT Apr 13
- **Scope:** SDX box at HQ; NIP Production and 1st Priority instances across HQ and DR
- **Approach:** DR upgraded first → traffic redirected to DR → HQ SDX and NIP instances upgraded → services migrated from Citrix MPX to LAS-enabled Citrix VPX
- **Outcome:** Completed successfully. [[Oladapo Onayemi]] confirmed 19:30 WAT Apr 13: "All NIBSS services consumed by Teamapt are functioning as expected following the migration." Tomiwa Odumuyiwa acknowledged.
- **Affected services (now stable):** NIP, N-Gate, NPS, EasyPay, PAPPS, BVN, POS, NQR, NIBSS PayPlus
- **Previously missed:** Earlier Citrix LB migration window was missed; [[Haruna Isa]] (NIBSS) apologized Apr 11. This rescheduled activity now complete.

## Active Issues

- **[[NIBSS DD — Pending Mandate P1 Active]]** — P1 filed 07:05 WAT Apr 14; pending mandate Null errors; escalated to NIBSS; broader blast radius into Monnify disbursements. Temporal overlap with DCIR/Wema 100% failure episode 01:00–04:06 WAT.
- **TDSD-6437** — DD NIBSS compound failures; formally tracked
- **RC96 P1** — 64%+ failure; status as of Apr 9 unresolved in notes
- **RC91 attribution dispute** — NIBSS says Moniepoint timeout, pending engineering investigation ([[Oladapo Onayemi]] commitment due Apr 15)

## Relationships

- [[TeamApt / Moniepoint]] — primary integration counterparty
- [[Direct Debit Program]] — rails consumer
- [[RC91 Multi-Bank Failure Pattern]] — routing failure context
- [[Stanbic Bank]] — highest-failure bank on NIBSS DD rails
- [[Oladapo Onayemi]] — Moniepoint SRE lead, coordinating NIBSS counterparty engagement
- [[Tomiwa Odumuyiwa]] — NIBSS Relationship Manager, migration notification source
- [[Moses Ajani]] — NIBSS PTSA Operations, RC91 attribution source
- [[Daniel Ojinaka]] — TeamApt DD/CDD department lead; owns the business-line impact of this P1