---
type:
  - "entity"
title: Ecobank
created: 2026-04-11
summary: "Pan-African bank — on Moniepoint's ATS routing. On 2026-04-27 Fund Settlement Agent integration commenced with two-week timeline (test environment completion ~12 May; production agent target 15 May). All sandbox issues resolved."
updated: "2026-04-27T17:49:43Z"
cssclasses:
  - "entity"
---

## Overview

[[Ecobank]] is a pan-African bank on [[TeamApt / Moniepoint]]'s integration pipeline. Direct to Bank SLA signature pending as of Apr 2026.

## ATS RC91

**Apr 16, 2026 — new ATS RC91 cycle:** [[Olamide Ajibulu]] filed RC91 failure at 18:54 WAT — transactions failing intermittently. Follow-up reminder sent at 19:23 WAT (no response). Filed to ADEWUYI Mayowa, OGUNSANYA Olayombo, UMECHIKELU Callix, CHUKWUJI Daniel, CC aptpaytechnicalsupport.

**Apr 16, 2026 — monitoring portal down (502):** [[Olamide Ajibulu]] reported Ecobank monitoring portal inaccessible at 19:31 WAT. Concurrent with active RC91 suggests broader Ecobank infrastructure instability.

**Apr 13, 2026 (NUS nodes):** [[Moses Ajani]] (NIBSS PTSA Operations) reported Ecobank card transactions routed to Moniepoint NUS nodes being declined with RC91. Email sent at 03:04 WAT to [[Qazim Adedigba]] et al. ECOB.xlsx attached with sample declined transactions. First NIBSS-escalated report for Ecobank. Part of the [[RC91 Multi-Bank Failure Pattern]].

## Direct to Bank — D2B Apr 22 standup

- **Account name change** — Ecobank requested until end of week for change of account name from previous entity to ATS.
- **Foreign settlement agent** — initial request was for [[Money Point]]; new process must be followed: form fill, account details, signature, resubmission for [[Himma]]. Doesn't affect ongoing test integration but required for live implementation. [[Ifeoluwa Oguntona]] owns submitting the settlement form.
- **LDAP user-disable workaround source** — the "standby role" pattern that strips authorities while preserving LDAP for other apps was originally implemented at Ecobank; [[Ugochukwu Ebirika]] surfacing it for Zenith adoption. [[Abdulgafar Obeitor]] to log in to confirm Ecobank LDAP user disable implementation is still live; Ugochukwu to reconfirm presence within Ecobank environment.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## 2026-04-27 — Project Delivery & Optimization Realignment

- **Ecobank Fund Settlement Agent** — all tests have been completed; sandbox issues resolved. Integration commenced today. Engineering committed to a **two-week timeline** for the test environment → completion ~**12 May**. After the test phase, the team will move to obtaining the production API. Production target: **15 May**.
- Source: [[Project delivery and optimization realignment - 2026-04-27 - Transcript]].

## Sources
[[Direct to Bank Daily Stand Up 2026-04-01 0824]]; email Olamide Ajibulu → Ecobank, 18:54 WAT Apr 16 (ATS RC91); email Olamide Ajibulu → Ecobank, 19:31 WAT Apr 16 (portal down 502); [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]; [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]; [[Project delivery and optimization realignment - 2026-04-27 - Notes]]