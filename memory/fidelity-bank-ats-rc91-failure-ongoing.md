---
role: cto-teamapt
type:
  - "situation"
title: Fidelity Bank ATS — RC91 Failure Ongoing
status: developing
created: "2026-04-11T16:45:01Z"
summary: "Fidelity ATS Cycle 4 (TDSD-6552) RESOLVED 20:35 WAT — Qazim confirmed processing fine after John Uguru-Okorie (Fidelity) reconfirm request. Both Apr 14 RC91 cycles now closed (AM implicit, PM explicit). 'Failing generally' still silent 25h10min+. B2 still untriaged — pattern intact (2 cycles in one day)."
updated: "2026-04-15T08:12:16Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[Fidelity Bank]] ATS — escalated beyond RC91 to "failing generally" on Apr 13, with two RC91 P1s filed on Apr 14 (morning 09:08 WAT and evening 19:05 WAT TDSD-6552). Both Apr 14 cycles now closed. Afternoon Apr 14: Fidelity pushing for update on concurrent Cards/Moniepoint routing thread with customer-impact pressure language (closed 18:44 WAT). Evening Apr 14: infrastructure capacity signal — Fidelity Back office server (10.10.9.110) memory maxed, [[Emeka Joseph]] requesting 64GB.

**Current (Apr 15, 09:08 WAT):** All Apr 14 RC91 cycles resolved. "Failing generally" thread now 37h+ silent — no explicit resolution received; consistent with Fidelity's reconfirm-loop style where the RC91 cycle resolution implicitly closes the broader complaint. Pattern-empirical status intact (2 cycles in a 12h window Apr 14). Briefing-2026-04-15 B5 surfaces this as Awareness — no CTO action; monitor for next cycle. MEMORY RESOURCE INCREASE ask still outstanding: [[Emeka Joseph]] sent chaser 08:42 WAT Apr 15 (14h37min since original 18:05 WAT Apr 14 ask, no Fidelity response yet). Server memory stress persists.

1. **RC91 Cycle 4 — TDSD-6552 RESOLVED 20:35 WAT Apr 14:** John Uguru-Okorie (Fidelity FEP Support Team Lead) requested reconfirm; [[Qazim Adedigba]] confirmed "Transactions are processing fine now" at 20:35 WAT. ~1h30min cycle, standard reconfirmation pattern.

2. **Cards routing RC92 (BIN 56400206) — CLOSED:** [[Samuel Adewole]] 18:44 WAT Apr 14: "This has been configured already."

3. **MEMORY RESOURCE INCREASE (pending Fidelity, chased 08:42 WAT Apr 15):** [[Emeka Joseph]] 18:05 WAT Apr 14 requested Fidelity increase Back office server (10.10.9.110) memory to 64GB. Chaser sent 08:42 WAT Apr 15 — "We await your feedback on this request to resolve the server issue caused by low memory utilization." No Fidelity response in 14h37min. Infrastructure capacity signal remains open.

4. **DCIR Settlement Report 12-13 Apr — RESOLVING:** Fresh report regen triggered 17:57 WAT Apr 14.

**"Failing generally" track (Apr 13 19:25 WAT):** Still no explicit resolution signal — now **37h+ silent** from Fidelity. Bank engaging on other threads without acknowledging the ATS general failure. Both Apr 14 RC91 cycles resolved — "generally" framing now looking like an overstatement, with underlying pattern being the recurring RC91 cycles.

**Cycles log:**
- **Cycle 1 (Apr 11):** Filed 03:33 WAT by Olamide. No explicit resolution signal.
- **Cycle 2 (Apr 12):** Filed 00:17 WAT by Olamide. Fidelity acknowledged emergency maintenance 00:24 WAT.
- **Cycle 3 (Apr 14 morning):** Filed 09:08 WAT by Olamide. Implicitly resolved by afternoon Handover.
- **Cycle 4 (Apr 14 evening):** TDSD-6552. Filed 19:05 WAT. **RESOLVED 20:35 WAT (~1h30min cycle).**

**Multi-front exposure (Apr 14 rollup):**
1. "Failing generally" — 37h+ post-escalation, no explicit resolution
2. RC91 Cycles 3 + 4 — both resolved
3. Card routing (closed 18:44 WAT Apr 14)
4. ACT platform go-live targeted Apr 13–14
5. DD null mandate errors ([[TDSD-6504]] at [[NIBSS]])
6. AptPay UAT window Apr 14–15
7. DCIR Settlement reconciliation — fresh report regen triggered Apr 14 17:57 WAT
8. Back office server (10.10.9.110) memory saturation — pending Fidelity 14h37min+ (chased 08:42 WAT Apr 15)

No Jira tickets verifiable — Jira connector still blind (82+ ticks, briefing-2026-04-15 B2 tracking).

## Sources
email [[Emeka Joseph]] → Fidelity FEP Support 08:42 WAT Apr 15 (Re: MEMORY RESOURCE INCREASE chase); email [[Qazim Adedigba]] 23:57 WAT Apr 14 (Re: Hourly Reports 20260414 — 16/17 routes operational); email [[Qazim Adedigba]] → John Uguru-Okorie 20:35 WAT Apr 14 (Cycle 4 resolution); email John Uguru-Okorie → Qazim Adedigba 20:14 WAT Apr 14 (Please reconfirm); email [[Qazim Adedigba]] → Fidelity FEP Support 19:05 WAT Apr 14 (TDSD-6552 filing); email [[Samuel Adewole]] → Emeka Joseph 18:44 WAT Apr 14 (BIN 56400206 configured); email [[Emeka Joseph]] → Fidelity FEP Support 18:05 WAT Apr 14 (MEMORY RESOURCE INCREASE); email [[Emeka Joseph]] → Collins Abuya 17:57 WAT Apr 14 (DCIR SETTLEMENT REPORT regen); email [[Olamide Ajibulu]] 09:08 WAT Apr 14 (Cycle 3); email [[Daniel Armstrong]] → fepsupport@fidelitybank.ng 19:25 WAT Apr 13 (Failing generally); email Duty Handover Note #20260414 morning + afternoon

## Deltas
- 2026-04-11 07:51 WAT — Single thread reply in Slack. No resolution details.
- 2026-04-11 19:47 WAT — P1 now 16h17min active. Zero resolution signals.
- 2026-04-12 00:47 WAT — 2nd RC91 cycle filed. Fidelity acknowledged emergency maintenance.
- 2026-04-13 19:25 WAT — Escalated to "failing generally" — [[Daniel Armstrong]] reported broader failure beyond RC91.
- 2026-04-14 06:17 WAT — Briefing-2026-04-14 B2 (confidence: high) surfaced as Immediate-tier decision.
- 2026-04-14 10:09 WAT — New Fidelity RC91 P1 09:08 WAT. Cycle 3.
- 2026-04-14 16:20 WAT — Cards routing thread escalation; DCIR Settlement Report thread active.
- 2026-04-14 18:09 WAT — Evening: MEMORY RESOURCE INCREASE ask; DCIR Settlement resolution signal.
- 2026-04-14 19:09 WAT — TDSD-6552 filed (Cycle 4).
- 2026-04-14 21:09 WAT — Cycle 4 RESOLVED 20:35 WAT. Both Apr 14 cycles now closed.
- 2026-04-15 07:10 WAT — Qazim's 23:57 WAT Apr 14 hourly report confirms 16/17 routes operational (Fidelity implicit in set). **"Failing generally" thread 36h+ silent** — implicit resolution inferred. Memory increase ask still pending 13h+. Briefing-2026-04-15 B5 surfaces as Awareness.
- 2026-04-15 09:08 WAT — Emeka Joseph chased MEMORY RESOURCE INCREASE at 08:42 WAT ("We await your feedback"). Fidelity non-response now 14h37min. No new RC91 signals this tick. "Failing generally" thread 37h+ silent. Awareness-tier delta; no CTO action.
