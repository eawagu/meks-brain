---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Day 4 of the pattern. New ATS RC91 cycle Apr 16 18:54 WAT now 2h10min unresolved — Olamide escalated to \"treat as urgent\" at 21:04 WAT. Ecobank portal (502) still down + Core Banking maintenance inquiry unacknowledged — broader Ecobank-side instability. Immediate alert dispatched at 22:14 WAT."
updated: "2026-04-16T21:15:28Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] ([[Moses Ajani]], PTSA Operations) reported [[Ecobank]] card transactions routed to [[TeamApt / Moniepoint]] NUS nodes being declined with RC91. Email sent 03:04 WAT Apr 13 to [[Qazim Adedigba]], aptpaytechnicalsupport, [[Mustapha Ajibade]], [[Saheed Yusuf]], Innocent Nwaokorie, [[Daniel Armstrong]]. Attached: ECOB.xlsx with sample declined transactions.

This is the same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12 ("no response from your end within the timeout period"). Ecobank being affected on NUS nodes with the same RC91 pattern strengthens the Moniepoint-side processing latency hypothesis. However, the [[Commitment — Stanbic RC91 Internal Processing Latency Investigation]] fulfilled Apr 15 with [[Oladapo Onayemi]]'s finding pointing to bank-side CBA instability + Moniepoint routing-restoration gap, so the NIBSS-timeout framing is now a contested frame rather than the working hypothesis.

**Apr 16 — new ATS RC91 cycle (distinct from NUS node report), escalation in progress:** [[Olamide Ajibulu]] filed standard ATS RC91 at 18:54 WAT — intermittent failures. Escalation sequence on the email thread: gentle reminder at 19:23 WAT, then third follow-up at **21:04 WAT** with explicit *"failure still persists. Please treat this as urgent."* Now **2h10min unresolved** with zero Ecobank response (ADEWUYI Mayowa, OGUNSANYA Olayombo, UMECHIKELU Callix, CHUKWUJI Daniel) across the full thread. Duration crosses the 2-hour Immediate threshold per config-salience trigger #2. Concurrent Ecobank-side signals: monitoring portal down (502) reported 19:31 WAT (still inaccessible), Ecobank Core Banking planned-maintenance inquiry at 20:32 WAT (Olamide → AllENG-ITServicedesk, no confirmation yet). Portal inaccessibility + unclear maintenance state during active RC91 suggests broader Ecobank-side infrastructure instability affecting multiple services.

Part of the [[RC91 Multi-Bank Failure Pattern]] — now 14+ banks affected over 14+ days.

## Sources
Email, 03:04 WAT Apr 13, Moses Ajani via aptpaytechnicalsupport; email Olamide Ajibulu → Ecobank, 18:54 WAT Apr 16 (ATS RC91); email Olamide Ajibulu → Ecobank, 19:23 WAT Apr 16 (reminder); email Olamide Ajibulu → Ecobank, 19:31 WAT Apr 16 (portal down 502); email Olamide Ajibulu → AllENG-ITServicedesk, 20:32 WAT Apr 16 (core banking maintenance inquiry); email Olamide Ajibulu → Ecobank, 21:04 WAT Apr 16 ("failure still persists, treat as urgent")

## Deltas
- [2026-04-13 03:04 WAT] — NIBSS reports Ecobank card transactions on NUS nodes declined with RC91; requests investigation.
- [2026-04-16 18:54 WAT] — New ATS RC91 cycle filed by Olamide Ajibulu. Intermittent failures. Follow-up at 19:23 WAT, no response.
- [2026-04-16 19:31 WAT] — Ecobank monitoring portal down (502). Infrastructure instability concurrent with active RC91.
- [2026-04-16 20:32 WAT] — Olamide emails Ecobank AllENG-ITServicedesk asking for confirmation that Ecobank Core Banking planned maintenance has completed. No response.
- [2026-04-16 21:04 WAT] — Olamide's third follow-up on the RC91 thread: "failure still persists. Please treat this as urgent." Incident now 2h10min unresolved with zero Ecobank response across the full thread. Immediate alert dispatched to CTO at 22:14 WAT tick.