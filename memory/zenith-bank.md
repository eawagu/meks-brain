---
type:
  - "entity"
title: Zenith Bank
created: 2026-04-11
summary: Nigerian bank — Moniepoint settlement counterparty for TMSS switch; on 2026-04-27 vulnerabilities fixed and team committed to running an internal scan to evidence-back false-positive claims; Zenith NSS proceeding via Money Point transactions (ATS endpoint not ready) with internal-work deadline 15 May; pilot kickoff target 30 April.
updated: "2026-04-27T17:49:43Z"
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

## 2026-04-27 — Project Delivery & Optimization Realignment

- **Vulnerability fixes** (Zenits ATS) — all bank-flagged appsec vulnerabilities have been fixed. In today's bank meeting, the team disputed several findings as likely false positives or mismatches; **bank's directive: team must run their own internal scan and bring the result back, so claims of false positive can be evidence-backed (no verbal/assumption-based claims)**. Team agreed with this. Internal security team committed to feedback before end-of-day. Fix-and-pilot commitment date: **30 April** (latest).
- **Training day 2** — did not happen last week (was meant for users to exercise the system and ask role-based questions after day 1 functionality walkthrough). Team requested a new date; awaiting bank confirmation.
- **Zenith NSS** — switch team configured the required per-bank-user daily reports. Because [[ATS]] endpoint is not ready (and is far away), [[Kevin]] proposed using [[Money Point|Moniepoint]] transactions for the NSS test; internal-work timeline **15 May**. Meeting expected this week to align direction. Expected NSS pilot date: **29 April**.
- Source: [[Project delivery and optimization realignment - 2026-04-27 - Transcript]].

## Sources

- [[review-queue]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Direct to Bank Daily Stand Up 2026-04-14 0822 — transcript]]
- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[Project delivery and optimization realignment - 2026-04-27 - Transcript]]
- [[Project delivery and optimization realignment - 2026-04-27 - Notes]]