---
type:
  - "entity"
title: Polaris Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS routing. D2B Apr 22: APIs failing/unstable; war room. Apr 28: APIs tested, awaiting peer test with Wally. Apr 28 Juliana Switch catchup: sentiment APIs functional, awaiting final QA — follow-up assigned to Ali/Wally."
updated: "2026-04-29T22:57:15Z"
cssclasses:
  - "entity"
---

## Overview

[[Polaris Bank]] is a Nigerian bank on [[TeamApt / Moniepoint]]'s [[ATS]] routing.

## ATS Status

VPN restored Apr 8, but settlement issue ([[TDSD-6493]]) filed Apr 10 with zero comments for 28+ hours. Route effectively degraded alongside [[Sterling Bank]].

## Direct Debit / Fund Settlement

**2026-04-16:** No feedback from Polaris Bank regarding fund settlement or [[Direct Debit]]. Bank contacted D2B team yesterday (Apr 15) indicating they are prioritizing internal issues. [[Glory Alioha]] clarified that the bank requested an extension to next week to respond regarding the SLA. [[Oluwakemi Oni]] following up. Source: [[Direct to Bank Daily Stand Up 2026-04-16]].

**2026-04-22 08:21 D2B:** Fund-settlement sign-off remains a blocker. **Name Inquiry API and Transfer API failing** — unstable, source of repeated escalations. [[Oluwakemi Oni]] intends to visit the bank today/tomorrow to address pending issues and resolve API instability. The group will hold a dedicated session today to resolve continuing Polaris API failures (war room). Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

**2026-04-23:** Still no feedback from Polaris on fund settlement and DD. [[Oluwakemi Oni]] noted Polaris contacted them yesterday (Apr 22) indicating they are prioritizing certain internal issues; a promised email was not received. [[Glory Alioha]] reaffirmed that Polaris requested an extension **until next week** (rolling forward from Apr 16's "next week" commitment — the extension has been rolled at least once). Oluwakemi owns follow-up with Polaris contacts. Source: [[note_2026-04-23T13-53-37-857Z]].

**2026-04-28 D2B:** Polaris APIs **tested**; team is **awaiting peer test with [[Wally]]** before proceeding. Source: [[Direct to Bank Daily standup - 2026-04-28 08:27 WAT]].

Earlier: Prosper (Polaris) requested stakeholders meeting to review ongoing projects (Oct 2025), wanting CFO present — flagged by [[Emeka Awagu]] as unusual.

## 2026-04-28 — Juliana Switch Daily Catchup (11:22 WAT) — Sentiment API Track

Distinct from the DD/fund-settlement and Name-Inquiry/Transfer API tracks: Polaris **sentiment APIs** are reported **functional** and **awaiting final QA verification**. Follow-up to confirm testing completion is assigned to **Ali** and **Wally** — Wally cross-references the Apr 28 D2B peer-test contact, suggesting Wally is the bridging Polaris-side QA/testing peer across both tracks. Source: [[Juliana Switch Daily Catchup - 2026_04_28 11_22 WAT - Notes by Gemini]].

## Pattern

Polaris's "extend until next week" response on the DD/fund-settlement SLA has now been stated **at least three times** (Apr 16, Apr 22 implicit, Apr 23 explicit) without a concrete delivery. Concurrent with Apr 22's API instability discovery (Name-Inquiry + Transfer both failing), this is now a multi-track durable failure, not just a delay pattern. Apr 28 update suggests the API instability has narrowed to a peer-test step — incremental progress on the API track even while the pattern note above stands on the SLA track. Apr 28 Juliana Switch catchup adds a third concurrent track (sentiment APIs functional, awaiting QA) — Polaris activity surface is widening, with two of three tracks (peer-test API, sentiment API QA) now in advanced testing phases.

## Related
- [[Sterling + Polaris — Routes Degraded]]
- [[ATS]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
- [[Direct to Bank Daily standup - 2026-04-28 08:27 WAT]]
- [[Juliana Switch Daily Catchup - 2026_04_28 11_22 WAT - Notes by Gemini]]
