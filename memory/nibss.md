---
type:
  - "entity"
title: NIBSS
created: 2026-04-11
summary: "Nigeria Inter-Bank Settlement System — national payment infrastructure provider for Moniepoint's Direct Debit rails. **NIBSS DD silent-close-without-RCA pattern: 3 of 4 cycles in 9 days match (Apr 14 retired, Apr 20 TDSD-6630 retired, Apr 23 TDSD-6702 49min self-close).** Cycle cadence accelerating: 6d → 2d → 1d intervals. Apr 15 12:51 WAT: Moses Ajani denial of NIBSS PTSA RC91 degradation — finger-pointing stalemate holds."
updated: "2026-04-23T15:24:51Z"
cssclasses:
  - "entity"
---

## Overview

Nigeria Inter-Bank Settlement System (NIBSS) is the national payment infrastructure provider. Moniepoint's Direct Debit program runs on NIBSS rails. NIBSS also underpins RC91/RC96 routing.

## Integration with Moniepoint

- **Direct Debit rails** — mandate creation, debit execution, settlement
- **RC91 routing** — NIBSS-mediated bank routing; 13+ banks affected in Apr 2026
- **RC96** — routing code; P1 failure Apr 9 with 64%+ failure rate
- **VPN dependency** — NIBSS connectivity requires VPN; VPN root cause identified for Apr 2026 outage (TDSD referenced in notes); ACS connector replaced with VPN fix Apr 10. Apr 22 VPN flapping → architectural transition to dedicated leased-line for all 4 PTSA nodes at 19:17 WAT (see [[NIBSS PTSA — VPN Flapping Apr 22]]).
- **RC91 attribution (Apr 12)** — NIBSS (Moses Ajani) attributed RC91 to "no response from your end within the timeout period." NIBSS says Moniepoint processing latency caused the failures, not bank ATS. Competing frame with bank-side attribution, both held pending engineering investigation.
- **RC91 attribution dispute deepens (Apr 15)** — [[Moses Ajani]] 12:51 WAT explicit denial on the NIBSS PTSA RC91 window (09:49–09:53 WAT): "We can confirm that there was no service degradation from our end as at this period. We can see transactions successfully processed even on Teamapt's terminals within this period." Directly contradicts [[Olamide Ajibulu]]'s 11:58 WAT position ("your system was unavailable, hence the transactions did not reach your interchange"). Pattern: NIBSS consistently attributes RC91 to Moniepoint side; Moniepoint attributes to NIBSS / bank side. Competing frames held.

## NIBSS DD — Silent-Close-Without-RCA Pattern (Apr 14–23, 2026)

Four NIBSS DD operational incidents in 9 days. **Silent-close-without-RCA rate: 3 of 4 (75%).** Only TDSD-6683 Apr 22 had explicit Slack + Jira closure; the other three closed as ticket state-changes with no human-authored RCA comment. The dominant closure shape on this product surface is silent-recovery-without-RCA when bank-side resolves.

| Cycle | Ticket / Situation | Filed | Closed | Duration | Closure shape |
|---|---|---|---|---|---|
| 1 | [[NIBSS DD — Pending Mandate P1 Active]] (retired) | Apr 14 07:05 WAT | Apr 16 ~06:23 WAT | ~47h | silent-recovery, no RCA |
| 2 | TDSD-6630 / [[NIBSS DD — Downtime P1 Apr 20]] (retired) | Apr 20 05:18 WAT | Apr 23 11:30 WAT (Kabir Yusuf Completed) | ~78h | silent-recovery, no RCA |
| 3 | TDSD-6683 (closed) | Apr 22 10:40 WAT | Apr 22 13:05 WAT | 2h25m | explicit Slack + Jira closure |
| 4 | **TDSD-6702 (closed)** | Apr 23 15:23 WAT | **Apr 23 16:12 WAT (Frances Omelu self-close)** | **~49m** | **silent-close, no RCA** |

**Cadence acceleration.** Intervals between NIBSS DD operational signals shortening: Apr 14 → Apr 20 = 6 days; Apr 20 → Apr 22 = 2 days; Apr 22 → Apr 23 = 1 day. The trend direction is worsening frequency, not improving stability. Synthesis-candidate observation for briefing-2026-04-24.

**TDSD-6702 (Apr 23 — 4th cycle).** Frances Omelu self-filed at 15:23 WAT with the standard customer-facing NIBSS-downtime template description ("experiencing issues with direct debit transactions... challenges originate from NIBSS... we will provide updates"). Status transitioned to Completed at 16:12:10 WAT by same Frances Omelu — same-assignee self-close within ~49 minutes. No closure comment. Matches the silent-close-without-RCA pattern seen in cycles 1 and 2. Medium priority, not a formal P1 filing (no Slack P1 template in-channel at the 16:11 WAT tick observation).

## Incident History (Apr 2026)

| Date | Event |
|---|---|
| Mar 30, 2026 | VPN root cause identified (RC91 FCMB 5th bank) |
| Apr 5, 2026 | NIBSS activation resolved after 21h (Easter P1) |
| Apr 6, 2026 | NIBSS DD TDSD-6437 formalised |
| Apr 9, 2026 | RC96 P1 — 64%+ failure rate |
| Apr 10, 2026 | ACS connector replaced (VPN fix) |
| Apr 12, 2026 | NIBSS attributes RC91 to Moniepoint timeout (Moses Ajani, 08:56 WAT) |
| Apr 13, 2026 | Citrix LB migration completed successfully (Oladapo Onayemi confirmed 19:30 WAT) |
| Apr 14, 2026 | **NIBSS DD P1 (cycle 1)** pending mandate Null errors (07:05 WAT, 47h silent-recovery, retired). Same night: NIBSS response latency degraded wallet-to-bank disbursements (Monnify customer-facing notice 03:15 WAT). |
| Apr 15, 2026 | NIBSS PTSA RC91 brief downtime 09:49–09:53 WAT (4 min); Moses Ajani denial cycle (finger-pointing stalemate). |
| Apr 20, 2026 | **NIBSS DD P1 (cycle 2)** TDSD-6630 Downtime (05:18 WAT, 78h silent-recovery, retired 2026-04-23 by Kabir Yusuf). |
| Apr 22, 2026 | **NIBSS DD P2 (cycle 3)** TDSD-6683 pending mandate (10:40 WAT, 2h25m explicit close — outlier shape). NIBSS PTSA VPN flapped 3x → architectural leased-line transition 19:17 WAT ([[NIBSS PTSA — VPN Flapping Apr 22]]). |
| Apr 23, 2026 | **NIBSS DD cycle 4** TDSD-6702 Downtime (15:23 WAT filed, 16:12 WAT self-closed Frances Omelu, 49m silent-close-no-RCA). Cadence acceleration. NIBSS PTSA leased-line stable (watch for 24h threshold at 19:17 WAT Apr 23). |

## Citrix LB Migration (Apr 12–13) — Completed

Scheduled maintenance migration of Citrix environment to License Activation Service (LAS), initiated by NIBSS ([[Tomiwa Odumuyiwa]], Relationship Manager, Partnership Business).

- **Window:** 23:30 WAT Apr 12 – 05:00 WAT Apr 13
- **Scope:** SDX box at HQ; NIP Production and 1st Priority instances across HQ and DR
- **Approach:** DR upgraded first → traffic redirected to DR → HQ SDX and NIP instances upgraded → services migrated from Citrix MPX to LAS-enabled Citrix VPX
- **Outcome:** Completed successfully. [[Oladapo Onayemi]] confirmed 19:30 WAT Apr 13: "All NIBSS services consumed by Teamapt are functioning as expected following the migration." Tomiwa Odumuyiwa acknowledged.
- **Affected services (now stable):** NIP, N-Gate, NPS, EasyPay, PAPPS, BVN, POS, NQR, NIBSS PayPlus

## Compliance / IMS Context

Per the [[TeamApt Management Review 19_04_2026]], NIBSS compliance is named alongside [[CBN]], [[NDPA]], and [[PCIDSS]] in the Service Management Risk register as a Major compliance exposure. SLA breaches by suppliers/banks (including NIBSS) are tracked under the Service Continuity risk category.

## Active Issues

- **Silent-close-without-RCA pattern on NIBSS DD** — 3 of 4 cycles in 9 days closing without human-authored RCA; cadence accelerating. See table above. Synthesis candidate.
- **TDSD-6437** — DD NIBSS compound failures; formally tracked.
- **RC96 P1** — 64%+ failure; status as of Apr 9 unresolved in notes.
- **RC91 attribution dispute** — NIBSS explicitly denies degradation on Apr 15 09:49–09:53 window ([[Moses Ajani]] 12:51 WAT). Pending engineering investigation ([[Oladapo Onayemi]] commitment originally due Apr 15).
- **NIBSS PTSA leased-line watch** — transitioned from VPN 19:17 WAT Apr 22; cumulative stable ~21h at 16:11 WAT Apr 23 tick; 24h threshold at 19:17 WAT Apr 23.

## Relationships

- [[TeamApt / Moniepoint]] — primary integration counterparty
- [[Direct Debit Program]] — rails consumer
- [[RC91 Multi-Bank Failure Pattern]] — routing failure context
- [[Stanbic Bank]] — highest-failure bank on NIBSS DD rails
- [[Oladapo Onayemi]] — Moniepoint SRE lead, coordinating NIBSS counterparty engagement
- [[Tomiwa Odumuyiwa]] — NIBSS Relationship Manager, migration notification source
- [[Moses Ajani]] — NIBSS PTSA Operations, RC91 attribution source
- [[Daniel Ojinaka]] — TeamApt DD/CDD department lead; owns the business-line impact of this P1
- [[Frances Omelu]] — TeamApt DD engineer; repeating filer/closer on NIBSS DD tickets (cycles 1, 4)
- [[Kabir Yusuf]] — TeamApt DD engineer; silent-close closer of cycle 2 (TDSD-6630)