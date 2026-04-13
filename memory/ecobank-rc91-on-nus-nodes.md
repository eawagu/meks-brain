---
title: Ecobank — RC91 on NUS Nodes
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: Technology Reliability and Security
role: cto-teamapt
created: "2026-04-13T02:15:48Z"
updated: "2026-04-13T02:15:48Z"
summary: NIBSS (Moses Ajani) reported Ecobank card transactions on Moniepoint NUS nodes declined with RC91 — same timeout attribution as Stanbic. Linked to open latency investigation (due Apr 15).
---

[[NIBSS]] ([[Moses Ajani]], PTSA Operations) reported [[Ecobank]] card transactions routed to [[TeamApt / Moniepoint]] NUS nodes being declined with RC91. Email sent 03:04 WAT Apr 13 to [[Qazim Adedigba]], aptpaytechnicalsupport, [[Mustapha Ajibade]], [[Saheed Yusuf]], Innocent Nwaokorie, [[Daniel Armstrong]]. Attached: ECOB.xlsx with sample declined transactions.

This is the same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12 ("no response from your end within the timeout period"). Ecobank being affected on NUS nodes with the same RC91 pattern strengthens the Moniepoint-side processing latency hypothesis. The open [[Commitment — Stanbic RC91 Internal Processing Latency Investigation]] (due Apr 15, [[Oladapo Onayemi]]) should include Ecobank NUS data in scope.

Part of the [[RC91 Multi-Bank Failure Pattern]] — now 14+ banks affected over 14+ days.

## Sources
Email, 03:04 WAT Apr 13, Moses Ajani via aptpaytechnicalsupport

## Deltas
- [2026-04-13 03:04 WAT] — NIBSS reports Ecobank card transactions on NUS nodes declined with RC91; requests investigation.