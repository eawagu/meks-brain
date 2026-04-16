---
type:
  - "entity"
title: Ecobank
created: 2026-04-11
summary: "Pan-African bank — RC91 on NUS nodes (NIBSS, Apr 13); new ATS RC91 cycle Apr 16 (18:54 WAT, unresolved >1h); monitoring portal down (502) Apr 16 19:31 WAT. Direct to Bank SLA signature pending."
updated: "2026-04-16T19:13:06Z"
cssclasses:
  - "entity"
---

## Overview

[[Ecobank]] is a pan-African bank on [[TeamApt / Moniepoint]]'s integration pipeline. Direct to Bank SLA signature pending as of Apr 2026.

## ATS RC91

**Apr 16, 2026 — new ATS RC91 cycle:** [[Olamide Ajibulu]] filed RC91 failure at 18:54 WAT — transactions failing intermittently. Follow-up reminder sent to Ecobank contacts at 19:23 WAT (no response). No resolution signal as of 20:09 WAT (~1h15min active). Filed to ADEWUYI Mayowa, OGUNSANYA Olayombo, UMECHIKELU Callix, CHUKWUJI Daniel (Ecobank), CC aptpaytechnicalsupport.

This is the first standard ATS RC91 filing for Ecobank (distinct from the NIBSS NUS node report below). Adds Ecobank to the set of banks with direct ATS RC91 cycles alongside [[Stanbic Bank]], [[Wema Bank]], [[Union Bank]], [[FCMB]], [[Fidelity Bank]].

**Apr 16, 2026 — monitoring portal down (502):** [[Olamide Ajibulu]] reported Ecobank monitoring portal inaccessible at 19:31 WAT. Filed to the same Ecobank contacts + [[Feyisayo Oyeniran]] CC'd. Portal inaccessibility concurrent with active RC91 suggests broader Ecobank infrastructure instability.

**Apr 13, 2026 (NUS nodes):** [[Moses Ajani]] (NIBSS PTSA Operations) reported Ecobank card transactions routed to Moniepoint NUS nodes being declined with RC91. Email sent at 03:04 WAT to [[Qazim Adedigba]], aptpaytechnicalsupport, [[Mustapha Ajibade]], [[Saheed Yusuf]], Innocent Nwaokorie, [[Daniel Armstrong]]. Reply-to: majani@nibss-plc.com.ng. Attached: ECOB.xlsx with sample declined transactions.

The NUS node RC91 was the first NIBSS-escalated report for Ecobank. Same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12. Part of the [[RC91 Multi-Bank Failure Pattern]].

## Sources
[[Direct to Bank Daily Stand Up 2026-04-01 0824]]; email Olamide Ajibulu → Ecobank, 18:54 WAT Apr 16 (ATS RC91); email Olamide Ajibulu → Ecobank, 19:31 WAT Apr 16 (portal down 502)