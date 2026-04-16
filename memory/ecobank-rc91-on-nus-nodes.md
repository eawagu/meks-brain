---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "NIBSS (Moses Ajani) reported Ecobank NUS node RC91 Apr 13. New ATS RC91 cycle Apr 16 (18:54 WAT, unresolved >1h) + monitoring portal down (502) at 19:31 WAT — broader Ecobank infrastructure instability signal."
updated: "2026-04-16T19:13:19Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] ([[Moses Ajani]], PTSA Operations) reported [[Ecobank]] card transactions routed to [[TeamApt / Moniepoint]] NUS nodes being declined with RC91. Email sent 03:04 WAT Apr 13 to [[Qazim Adedigba]], aptpaytechnicalsupport, [[Mustapha Ajibade]], [[Saheed Yusuf]], Innocent Nwaokorie, [[Daniel Armstrong]]. Attached: ECOB.xlsx with sample declined transactions.

This is the same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12 ("no response from your end within the timeout period"). Ecobank being affected on NUS nodes with the same RC91 pattern strengthens the Moniepoint-side processing latency hypothesis. The open [[Commitment — Stanbic RC91 Internal Processing Latency Investigation]] (due Apr 15, [[Oladapo Onayemi]]) should include Ecobank NUS data in scope.

**Apr 16 — new ATS RC91 cycle (distinct from NUS node report):** [[Olamide Ajibulu]] filed standard ATS RC91 at 18:54 WAT — intermittent failures. Follow-up at 19:23 WAT with no Ecobank response. Concurrently, Ecobank monitoring portal reported down (502) at 19:31 WAT. Portal inaccessibility during active RC91 suggests broader Ecobank-side infrastructure instability — potentially affecting both card (NUS) and transfer (ATS) channels simultaneously.

Part of the [[RC91 Multi-Bank Failure Pattern]] — now 14+ banks affected over 14+ days.

## Sources
Email, 03:04 WAT Apr 13, Moses Ajani via aptpaytechnicalsupport; email Olamide Ajibulu → Ecobank, 18:54 WAT Apr 16 (ATS RC91); email Olamide Ajibulu → Ecobank, 19:31 WAT Apr 16 (portal down 502)

## Deltas
- [2026-04-13 03:04 WAT] — NIBSS reports Ecobank card transactions on NUS nodes declined with RC91; requests investigation.
- [2026-04-16 18:54 WAT] — New ATS RC91 cycle filed by Olamide Ajibulu. Intermittent failures. Follow-up at 19:23 WAT, no response.
- [2026-04-16 19:31 WAT] — Ecobank monitoring portal down (502). Infrastructure instability concurrent with active RC91.