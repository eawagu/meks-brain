---
type:
  - "concept"
title: RC91 Multi-Bank Failure Pattern
created: 2026-04-11
summary: "Sustained multi-bank RC91 pattern — Apr 19 overnight produced the largest concurrent wave yet: 5 P1s in ~3h (Stanbic 7h3m, Access 7h50m, NIBSS PTSA 15m, Fidelity 14m, Union 2h10m). Stanbic + Access same-minute onset at 00:00 WAT + 7h+ bank-side resolution is a regime-change signal; prior pattern resolved in minutes. Strengthens upstream-common-mode hypothesis."
updated: "2026-04-19T07:34:20Z"
cssclasses:
  - "concept"
---

## Overview
RC91 ("Issuer or Switch Inoperative") failures have escalated from isolated per-bank incidents to a systemic pattern affecting 14+ banks across both TeamApt's Switch and ATS product streams. The pattern began clustering around March 30, 2026, persisted through Easter weekend, and remained active through April 19. The per-incident bank escalation model has definitively failed to contain it — each bank resolves individual cycles while the underlying root cause remains unfixed.

**Apr 19 development — largest concurrent wave yet observed.** The overnight 00:00–04:50 WAT window produced 5 RC91 P1s within ~3h: [[Stanbic Bank ATS — Persistent RC91 Pattern]] cycle 31 (00:00→07:03 WAT, 7h3m, TDSD-6624), [[Access Bank — Multi-Track Failures]] cycle 8 (00:00→07:50 WAT, 7h50m, TDSD-6625), [[NIBSS PTSA — RC91 Apr 19]] (01:25–01:40 WAT, 15m), [[Fidelity Bank ATS — RC91 Failure Ongoing]] cycle 5 (01:50–02:04 WAT, 14m bank-resolved), [[Union Bank — RC91 P1 Apr 19]] (02:40–04:50 WAT, 2h10m — first-time participant on active wave). Stanbic and Access opened at the **same minute (00:00 WAT)** and both took >7h for bank-side resolution — prior cycles in both patterns resolved in minutes (Stanbic cycle 28: 7m; Access cycles 1–7: 3m–50m). Same-minute onset across two banks is not coincidence-plausible; 7h+ bank-side latency is a regime-change signal. The three shorter overnight resurfaces (NIBSS PTSA, Fidelity, Union Bank) resolved on typical timescales — either the common-mode driver affects banks differently by routing path, or these three are on a separate fault surface that clustered in time.

**Apr 13 development:** NIBSS ([[Moses Ajani]]) proactively reported [[Ecobank]] card transactions on Moniepoint NUS nodes being declined with RC91. This is the same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12 — the Moniepoint-side latency hypothesis gains further evidence as the pattern spreads to additional banks on NUS nodes. Open commitment: [[Oladapo Onayemi]] investigating Moniepoint processing latency to NIBSS node (due Apr 15 — **overdue as of Apr 19**).

## Pattern Characteristics
- **Scope**: 14+ banks; both Switch and ATS product streams (Ecobank added Apr 13; overnight wave Apr 19 added concurrent multi-bank regime-change signal)
- **Duration**: Detected March 30, 2026; persistent through at least April 19, 2026 (20+ days)
- **Failure mechanism**: RC91 = issuer or switch reports itself as inoperative; historically intermittent with fast bank-side recovery (minutes). **Apr 19 overnight introduced multi-hour bank-side latency for Stanbic + Access concurrently — regime change, not just frequency increase.**
- **Same-minute onset pattern (new Apr 19):** Stanbic cycle 31 + Access cycle 8 both opened at 00:00 WAT exactly. Same-minute onset across independently-managed bank routes rules out independent bank-side faults — points to common upstream trigger (Moniepoint routing/switching layer, NIBSS layer, CoralPay intermediary, or scheduled job/DR event).
- **Correlation candidate: TDSD-6626 NIBSS DR Exercise.** NIBSS Disaster Recovery exercise occurred overnight Apr 19 per TDSD-6626. Overlap with 5-bank wave onset warrants explicit RCA check — DR-exercise routing failover could produce exactly this signature (same-minute multi-bank onset + extended bank-side latency as failover resources absorb traffic).
- **Intermediary exposure**: [[CoralPay]] routing (PVB, FBN, SBP, ZIB) is a common intermediary in cross-bank failures — escalated to Problem Investigation (TDSD-6448) April 6
- **Root cause hypothesis (strengthening):** NIBSS attributes RC91 to Moniepoint timeout — "no response from your end within the timeout period." Ecobank NUS nodes now showing the same pattern; Apr 19 overnight wave strengthens this — 5-bank concurrent onset is consistent with upstream Moniepoint-side degradation rather than bank-specific issues. DR-exercise correlation is a testable refinement.

## Banks Affected (documented)
| Bank | Product Stream | Status (as of Apr 19) | Notable |
|---|---|---|---|
| [[Stanbic Bank]] | ATS | Active — cycle 31 Apr 19 regime change (7h3m) | UNPRECEDENTED bank-side latency; TDSD-6624; same-minute onset with Access |
| [[Access Bank]] | ATS | Active — cycle 8 Apr 19 regime change (7h50m) | UNPRECEDENTED bank-side latency; TDSD-6625; same-minute onset with Stanbic |
| [[Union Bank]] | ATS | Active — Apr 19 overnight (2h10m) | First-time participant on active wave; 5 cycles in 8 days (Apr 12, 15, 16×2, 19) |
| [[NIBSS PTSA]] | Switch/Routing | Active — fresh Apr 19 (15m, re-surface) | Prior NIBSS PTSA Apr 17 situation retired; re-surfaced Apr 19 |
| [[Fidelity Bank]] | ATS | Active — cycle 5 Apr 19 (14m) after 3.5-day quiet | Re-surface broke quiet window; fast-cycle profile within overnight wave |
| [[Ecobank]] | ATS (NUS) | Active — attribution standoff ongoing | First NIBSS-reported RC91 on NUS nodes; TDSD-6619 Apr 18 |
| [[CoralPay]]-routed: PVB, FBN, SBP, ZIB | Switch | Problem Investigation (TDSD-6448); SBP formally added Apr 18 | Structural escalation; no fix commitment |
| [[Sterling Bank]] | ATS/Switch | Suspended (RC91); formally reclassified into CoralPay suite Apr 18 | [[CoralPay]] engaging for permanent fix |
| [[FCMB]] | ATS | Active — TDSD-6613 Apr 17 23:44 WAT P1 | First FCMB P1 of watch window |
| [[Polaris Bank]] | Switch | Restored Apr 8 after 5-day suspension | RC21/RC91; VPN root cause |
| [[Wema Bank]] | ATS | Active — 5+ cycles, accelerating | No Jira tickets filed |
| [[UBA Bank]] | ATS | Active — brief cycle Apr 18 evening (3m) | Part of Apr 18 evening-wave concurrence |
| [[Keystone Bank]] | Card | Active — RC05 not RC91; Apr 17 21:38 WAT P1 | DISTINCT failure mode — card-layer fault |
| Zenith, UBA, Habari | Various | Intermittent | Per-incident escalation only |

## Structural Assessment Gap
- [[Oladapo Onayemi]] was tasked with a multi-bank RC91 structural assessment due March 30
- No delivery signal appeared across 14+ days despite pattern reaching widest scope yet
- Apr 15 follow-up commitment: Oladapo investigating Moniepoint processing latency to NIBSS node (due Apr 15) — **now overdue by 4 days as of Apr 19; overnight wave makes this the critical-path CTO lever**
- NIBSS (Moses Ajani) confirmed a VPN tunnel glitch as root cause for one incident and signalled openness to a "dedicated link" between NIBSS and TeamApt — potential structural remediation input
- SRE workaround for Stanbic: manual sweeps 4x daily (6:30/10:30/13:30/16:30 WAT) — contains but doesn't fix; overnight wave predates first sweep

## TMS Protocol Migration (Structural Fix — Separate Track)
Solomon Amadi committed to HTTP protocol migration for TMS on April 6: internal rollout April 7, BO piloting end of week, full rollout the following week. This addresses the HA Proxy readiness probe failures that produced RC68/RC91 — a different failure mode but the same symptom.

## CoralPay Problem Investigation
TDSD-6448 filed April 6 by Qazim Adedigba — first structural escalation in 3+ months. Three predecessor incident tickets superseded. CoralPay is the routing intermediary for PVB, FBN, SBP, and ZIB. SBP (Sterling) formally reclassified into the suite per Duty Handover 20260418. No fix commitment or timeline from CoralPay visible as of April 19.

## Sources
- [[notes-2026-03-30]] — FCMB enters pattern; NIBSS VPN root cause confirmed
- [[notes-2026-04-01]] through [[notes-2026-04-18]] — daily progression
- [[weekly-digest-2026-03-30]] — week summary; structural assessment gap documented
- briefing-2026-04-17, briefing-2026-04-18 — wave-participant additions and concurrence events
- overnight-wave tracks Apr 19: TDSD-6624 (Stanbic), TDSD-6625 (Access), situation pages for NIBSS PTSA/Fidelity/Union
- TDSD-6626 — NIBSS DR Exercise (correlation candidate for same-minute onset)