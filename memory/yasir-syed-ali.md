---
type:
  - "entity"
title: Yasir Syed Ali
aliases:
  - "Syed Ali"
created: 2026-04-11
summary: "TeamApt engineering lead — owns Direct Debit production issues weekly analysis; participates in D2B standups. Apr 21: emphasized single-set JAR deployment principle. Apr 22: flagged Keystone testing-delay risk. Apr 23: coordinates Zenith ATS scan deliverable."
updated: "2026-04-25T11:51:58Z"
cssclasses:
  - "entity"
---

TeamApt engineering lead. Owner of the Direct Debit production issues weekly analysis meeting — leads recurring review of DD operational failures, reversal logic, and response code harmonization. Participates in [[Direct to Bank program]] daily standup.

## 2026-04-15 — Jira ticket management gap raised

During the [[Direct to Bank Daily Standup]] (2026-04-15 08:22 WAT, per [[note_2026-04-15T09-12-36-153Z]]), Yasir raised a concern that Jira ticket management is lacking — important information such as the [[Moniepoint]] settlement account update and details about [[Union Bank]] / [[Habari Pay]] is not being properly captured in tickets. [[Taiwo Baptista]] confirmed the Money Point SLA/account request is in an existing ticket, and Yasir committed to review the ticket to ensure all needed beta-phase information is captured. This signal aligns with the wider process-documentation failure pattern currently tracked in briefing-2026-04-15 B3 (monitoring-to-human-pickup retro) and is a second independent data point this week that TeamApt's incident/operational documentation discipline is a structural gap, not a one-off.

## 2026-04-21 — D2B Standup (08:10 WAT)

- Emphasized that the team generally follows **one set of JAR files across all banks**, noting that vulnerabilities raised by one bank (e.g., [[Union Bank]]) will only be deployed to other banks (e.g., [[Zenith Bank]]) after they have been confirmed and deployed there. This codified the [[JAR deployment standardization]] principle.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## 2026-04-22 — D2B Standup (08:21 WAT)

- **Keystone testing-delay risk** — expressed concern that delays in Keystone Bank testing could lead to realizing later that other functions are not working. Team clarified APIs have been shared; necessary integration is on the bank's side.
- Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## 2026-04-23 — Zenith ATS scan deliverable

[[Zenith Bank]] completed its security scan and returned results; the team's scan report (promised yesterday) remains pending. Yasir committed to syncing with [[Isaac Arinze|Isaac]] within ~1 hour before providing an update on when the team's scan deliverable will be available. Source: [[note_2026-04-23T13-53-37-857Z]].

## Sources
[[Direct Debit Production Issues Weekly Analysis 2026-04-02 Gemini Notes]], [[Direct Debit Production Issues Weekly Analysis 2026-04-02 MD]], [[note_2026-04-15T09-12-36-153Z]], [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]], [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]], [[note_2026-04-23T13-53-37-857Z]].
