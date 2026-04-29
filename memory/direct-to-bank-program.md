---
type:
  - "concept"
  - "entity"
title: Direct to Bank program
aliases:
  - "Direct to Bank"
  - "D2B"
  - "Direct to Bank Program"
created: "2026-04-25T11:47:34Z"
summary: TeamApt internal program covering bank integration pipeline (ATS, Direct Debit, Fund Settlement) across ~15+ Nigerian and pan-African banks. Daily standup is the operational cadence; meeting owner Khadijat Musa.
updated: "2026-04-29T11:52:37Z"
cssclasses:
  - "concept"
---

## Definition

The Direct to Bank (D2B) program is the [[TeamApt]] internal effort to onboard Nigerian and pan-African banks onto Moniepoint's processing infrastructure across three integration tracks:

- **ATS** (Advanced Transaction Switch) — acquiring/processing.
- **Direct Debit** integration — mandate creation and transaction processing.
- **Fund Settlement** — settlement-account configuration and SLA sign-off.

## Operational cadence

- **Daily standup** owned by [[Khadijat Musa]] (khadijat.musa@teamapt.com); Gemini auto-notes are the canonical record.
- **Meeting time:** typically 08:00–09:00 WAT (Apr 2026 batch shows 08:10, 08:21, 08:26, and 08:27 WAT slots; an earlier 07:27 WAT slot the same day appears to have been an aborted instance).

## Banks tracked (Apr 2026)

- ATS routing: [[Zenith Bank]], [[Union Bank]], [[FCMB]], [[Ecobank]], [[UBA]], [[Polaris Bank]], [[Access Bank]] (and others)
- Direct Debit pipeline: [[Money Point]], [[Tap]], [[Keystone Bank]], [[Karry MFB]], [[Steel Bank]], [[Abar Pay]], [[GT Bank]], [[CAB]]
- SLA sign-off pending: [[UBA]] (signed Apr 15, legal follow-up Apr 28), [[WHMA Bank]], [[Steel Bank]], [[Coral Pay]] / [[Access Bank]], [[Polaris Bank]]
- [[Zen DG]] integration: 2-week timeline extended into 3rd week (per Apr 28 standup); delays continuing per Apr 29 standup
- [[VPN Connectivity]] processes underway for multiple banks (Apr 29 standup)

## Recurring patterns

- **JAR deployment** standardization across all banks — single uniform set of JAR files; vulnerabilities resolved on one bank propagate after confirmation. See [[JAR deployment standardization]].
- **LDAP-vs-MFA security stance** — LDAP authentication relied on as primary; MFA absence escalated to bank communications. See [[LDAP authentication]], [[Multi-Factor Authentication]].
- **War rooms** convened for high-friction integrations (Money Point Direct Debit, Polaris API instability). See [[War room]].
- **SLA sign-off blockers** dominate the pipeline — see [[SLA sign-off blocker]].
- **Polaris pattern of "extend until next week"** rolled at least three times (Apr 16, Apr 22, Apr 23); Apr 28 update suggests narrowing to a peer-test step (incremental progress).
- **Apr 28 governance decision:** ticket-status update ownership clarified — the **assigned ticket owner** must perform daily status updates, not the project delivery lead.
- **Recurring direct-debit vulnerabilities** under investigation across multiple bank deployments (Apr 29 standup).

## Sources

- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-21 07:27 WAT - empty stub]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[Direct to Bank Daily Stand Up 2026-04-01 0824]]
- [[Direct to Bank Daily Standup 2026-03-30]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[Direct to Bank Daily standup - 2026-04-28 08:27 WAT]]
- [[Direct to Bank Daily standup - 2026-04-29 08:26 WAT]]
