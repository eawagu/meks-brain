---
type:
  - "concept"
title: RC91 Multi-Bank Failure Pattern
created: 2026-04-11
summary: "Sustained multi-bank RC91 pattern since Mar 30, 2026 — 14+ banks across Switch and ATS product streams. CoralPay suite turned off (ZIB, FBN, PVB, SBP) as mitigation for the CoralPay-routed sub-pattern; RCA attributed bank-side or CoralPay. Stanbic is the recurring pattern the bank is handling (bank-owned resolution, no CTO action). Other affected banks remain on per-incident tracks. Apr 19 overnight: Stanbic cycle 31 (7h3m, longest cycle in pattern), three independent fast-cycle RC91 events (NIBSS PTSA, Fidelity, Union Bank), and Access scheduled maintenance (NOT a wave participant)."
updated: "2026-04-19T08:17:01Z"
cssclasses:
  - "concept"
---

## Overview
RC91 ("Issuer or Switch Inoperative") failures have been observed across 14+ banks since March 30, 2026, across both TeamApt's Switch and ATS product streams. **RCA resolution:** the root cause was attributed to bank-side faults or [[CoralPay]]. The mitigation applied is the **CoralPay suite route-off** — ZIB, FBN, PVB, and SBP (Sterling) are all turned off per business decision (see [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]]). Banks not on CoralPay routes are tracked as either bank-owned recurring patterns or per-incident P1s; the RCA does not attribute a common upstream cause across all 14+ participating banks.

**Apr 19 overnight — corrected framing.** Initial triage framing described a "5-bank wave" with regime-change signals and a common-mode upstream cause hypothesis. Per direct user (CTO) correction during Apr 19 triage, that framing was wrong:
- [[Access Bank — Multi-Track Failures]] — Apr 19 00:00–07:50 WAT was **scheduled Access bank maintenance**, NOT an RC91 cycle. Reclassified out of the pattern. TDSD-6625 reflects the automated P1 raised against the maintenance window, not a genuine RC91 cycle. Same-minute concurrence with Stanbic cycle 31 at 00:00 WAT is coincidence (maintenance windows commonly start on the hour).
- [[Stanbic Bank ATS — Persistent RC91 Pattern]] — cycle 31 (00:00→07:03 WAT, 7h3m) is the longest single cycle in the ongoing Stanbic pattern, **not a regime change**. Stanbic is the recurring pattern the bank is handling; bank-owned resolution; no CTO action.
- [[NIBSS PTSA — RC91 Apr 19]] (15m), [[Fidelity Bank ATS — RC91 Failure Ongoing]] cycle 5 (14m), [[Union Bank — RC91 P1 Apr 19]] (2h10m) — three independent fast-cycle RC91 events, unremarkable within the broader pattern. No evidence of a shared cause with Stanbic.

The "largest concurrent wave yet" narrative previously held on this page is withdrawn. The same-minute-onset common-mode hypothesis that was anchored on Stanbic+Access concurrence is withdrawn (Access was maintenance). TDSD-6626 NIBSS DR Exercise correlation is tracked by ops as routine, no CTO action.

**Apr 13 development (retained):** NIBSS ([[Moses Ajani]]) proactively reported [[Ecobank]] card transactions on Moniepoint NUS nodes being declined with RC91. This is the same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12. Whether the Moniepoint-side latency hypothesis remains active post-RCA is unclear — the RCA concluded bank-side or CoralPay, which does not obviously map to the Moniepoint-latency framing. Open tension for future synthesis.

## Pattern Characteristics
- **Scope**: 14+ banks; both Switch and ATS product streams
- **Duration**: Detected March 30, 2026; persistent through April 19, 2026 (20+ days)
- **Failure mechanism**: RC91 = issuer or switch reports itself as inoperative; intermittent with typical fast bank-side recovery (minutes). Some banks exhibit longer cycles (e.g., Stanbic cycle 31 at 7h3m) but these remain within per-bank pattern variance rather than a pattern-wide regime change.
- **Intermediary exposure and mitigation**: [[CoralPay]] routing (PVB, FBN, SBP, ZIB) identified as either the bank-side-or-CoralPay root cause per RCA; mitigation applied — all four CoralPay-routed banks turned off per business decision.
- **Bank-owned tracks**: Stanbic is the recurring pattern the bank is handling. Other banks with active P1s are tracked individually on situation pages.
- **Common-mode upstream hypothesis**: withdrawn for the Apr 19 overnight concurrence (Access was maintenance, not a cycle). Broader common-mode hypotheses across banks remain unconfirmed and no longer anchored on Apr 19 evidence.

## Banks Affected (documented)
| Bank | Product Stream | Status (as of Apr 19) | Notable |
|---|---|---|---|
| [[Stanbic Bank]] | ATS | Active — recurring pattern, bank handling | Cycle 31 Apr 19 = 7h3m, longest single cycle in pattern; not a regime change |
| [[Access Bank]] | ATS | Active — 7 RC91 cycles Apr 10–18; Apr 19 00:00–07:50 WAT was scheduled maintenance (not a cycle) | Eight concurrent tracks; see situation page |
| [[Union Bank]] | ATS | Active — Apr 19 overnight (2h10m), 5 cycles in 8 days | Apr 12, 15, 16×2, 19 |
| [[NIBSS PTSA]] | Switch/Routing | Active — fresh Apr 19 (15m, re-surface) | Prior NIBSS PTSA Apr 17 situation retired; re-surfaced Apr 19 |
| [[Fidelity Bank]] | ATS | Active — cycle 5 Apr 19 (14m) after 3.5-day quiet | Fast-cycle profile |
| [[Ecobank]] | ATS (NUS) | Active — attribution standoff ongoing | First NIBSS-reported RC91 on NUS nodes; TDSD-6619 Apr 18 |
| [[CoralPay]]-routed: PVB, FBN, SBP, ZIB | Switch | Turned off per business decision (all four) | CoralPay suite route-off per RCA mitigation |
| [[Sterling Bank]] | ATS/Switch | Suspended (RC91); reclassified into CoralPay suite Apr 18 | [[CoralPay]] engaging for permanent fix |
| [[FCMB]] | ATS | Active — TDSD-6613 Apr 17 23:44 WAT P1 | First FCMB P1 of watch window |
| [[Polaris Bank]] | Switch | Restored Apr 8 after 5-day suspension | RC21/RC91; VPN root cause |
| [[Wema Bank]] | ATS | Active — 5+ cycles, accelerating | No Jira tickets filed |
| [[UBA Bank]] | ATS | Active — brief cycle Apr 18 evening (3m) | Part of Apr 18 evening-wave concurrence |
| [[Keystone Bank]] | Card | Active — RC05 not RC91; Apr 17 21:38 WAT P1 | DISTINCT failure mode — card-layer fault |
| Zenith, UBA, Habari | Various | Intermittent | Per-incident escalation only |

## CoralPay Problem Investigation & Mitigation
TDSD-6448 filed April 6 by Qazim Adedigba — first structural escalation in 3+ months. CoralPay is the routing intermediary for PVB, FBN, SBP, and ZIB. Per Duty Handover 20260418, all four banks are turned off per business decision (ZIB/FBN/PVB Apr 11–17, SBP formally reclassified Apr 18). This is the RCA mitigation for the CoralPay-routed portion of the pattern. See [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] for the full engagement track.

## TMS Protocol Migration (Structural Fix — Separate Track)
Solomon Amadi committed to HTTP protocol migration for TMS on April 6: internal rollout April 7, BO piloting end of week, full rollout the following week. This addresses the HA Proxy readiness probe failures that produced RC68/RC91 — a different failure mode but the same symptom.

## Sources
- [[notes-2026-03-30]] — FCMB enters pattern; NIBSS VPN root cause confirmed
- [[notes-2026-04-01]] through [[notes-2026-04-18]] — daily progression
- [[weekly-digest-2026-03-30]] — week summary
- briefing-2026-04-17, briefing-2026-04-18, briefing-2026-04-19 — wave-participant additions, concurrence events, and Apr 19 triage correction (Access maintenance reclassification + Stanbic framing correction)
- TDSD-6624 (Stanbic cycle 31), TDSD-6625 (Access automated P1 raised against maintenance window)
- TDSD-6626 NIBSS DR Exercise — routine ops handling, not a CTO item
- User correction 2026-04-19 triage — Access maintenance reclassification, Stanbic bank-owned pattern framing, RCA status (bank-side or CoralPay; CoralPay turned off as mitigation)