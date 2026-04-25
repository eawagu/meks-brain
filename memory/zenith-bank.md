---
type:
  - "entity"
title: Zenith Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS and CoralPay routing; settlement counterparty for the TeamApt/TMSS switch integration. D2B Apr 21–22: pentest fix, LDAP-vs-MFA reliance decision, user-disable workaround via standby role."
updated: "2026-04-25T11:47:32Z"
cssclasses:
  - "entity"
---

## Overview

Zenith Bank is a Nigerian bank with multiple touchpoints in the Moniepoint group:

- On Moniepoint's ATS routing
- On the [[CoralPay]] ZIB route (Zenith)
- POS settlement receivable item (MPRC-7031) entered Technical backlog Apr 1

> **Note on naming:** Gemini auto-transcripts render "Zenith" as "Zenit" (see [[Direct to Bank Daily Stand Up 2026-04-14 0822 — transcript]] and [[note_2026-04-23T13-53-37-857Z]]). This is a transcription artifact, not a distinct entity.

## TeamApt/TMSS Settlement Counterparty (Apr 2026)

Zenith Bank is the **settlement counterparty** for the [[TeamApt]] (TMSS) switch integration that will enable live transaction processing for [[Moniepoint MFB]] Cards:
- Technical integration with TeamApt: **complete**
- Business / settlement arrangement with Zenith: **final stages** ([[Kevin]] driving)
- Action item (Apr 21 KT): complete the settlement setup to enable live transaction processing

## ATS Track — D2B Apr 21 standup

- Pentest fixes expected ready today for rescanning; training tentatively planned for tomorrow.
- Decision (aligned): rely on current [[LDAP authentication]] for security; [[Multi-Factor Authentication|MFA]] absence to be addressed in communication with the bank — MFA implementation requires Zenith to share their OTP/2FA credentials ([[Fortunate Nwachukwu]]).
- LDAP confirmed working ([[Emeka Joseph]], [[Abdulgafar Obeitor]]). [[Abdulgafar Obeitor]] suggested reverting to bank early on inability to provide MFA against LDAP while fixing existing issues.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## ATS Track — D2B Apr 22 standup

- Matrix creation and user training scheduled today/tomorrow. Pentest resolution still awaited past yesterday's commitment.
- **User disable workaround** — [[Ugochukwu Ebirika]] surfaced an existing implementation pattern from [[Ecobank]]: a "standby" user role that strips authorities, leaving only a change-password prompt at login. Not full disablement (LDAP still works for other apps), but functionally restricts portal access. Role creation deadline: 12:00 today.
- [[Isaac Arinze]] uploading Zenith integration jobs to staging environment for testing — once tested, jobs will be available for [[Solomon]].
- [[Ifeoluwa Oguntona]] requested team check resolution availability and complete role creation before noon.
- [[Ugochukwu Ebirika]] to review Zenith workflow configuration documentation.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## ATS Track — D2B Apr 23 standup

Three open Zenith ATS threads surfaced at the Apr 23 D2B standup:

1. **Vulnerability / risk assessment** — the bank-found vulnerability was tested and resolved with final bank approval. Bank has now indicated plans for a user-based risk assessment; team is awaiting feedback, ideally today. [[Abiodun Famoye]] clarified this is the ATS track, not the DD assessment he had initially thought.
2. **[[Role Matrix]]** — the bank-provided matrix was incomplete and lacked specificity. [[Ifeoluwa Oguntona]], Gaffa ([[Abdulgafar Obeitor]]) and the bank met so the bank could explain needs and knowledge gaps; Gaffa committed to re-editing the team's role matrix document to accommodate bank requirements so they can finalize user roles and prepare for training (tentatively Tue/Wed next week).
3. **Scans** — bank completed its security scan and returned results; team's scan report (promised yesterday) remains pending. [[Yasir Syed Ali]] to sync with [[Isaac]] within ~1 hour before providing an update on when the team's scan deliverable will be available.

Source: [[note_2026-04-23T13-53-37-857Z]].

## Sources

- [[review-queue]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Direct to Bank Daily Stand Up 2026-04-14 0822 — transcript]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
