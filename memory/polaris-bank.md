---
type:
  - "entity"
title: Polaris Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS routing. D2B Apr 22: Polaris Name-Inquiry and Transfer APIs failing/unstable; fund-settlement sign-off remains a blocker; Oluwakemi visiting bank to address API instability; dedicated war-room session scheduled."
updated: "2026-04-25T11:47:32Z"
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

Earlier: Prosper (Polaris) requested stakeholders meeting to review ongoing projects (Oct 2025), wanting CFO present — flagged by [[Emeka Awagu]] as unusual.

## Pattern

Polaris's "extend until next week" response on the DD/fund-settlement SLA has now been stated **at least three times** (Apr 16, Apr 22 implicit, Apr 23 explicit) without a concrete delivery. Concurrent with Apr 22's API instability discovery (Name-Inquiry + Transfer both failing), this is now a multi-track durable failure, not just a delay pattern.

## Related
- [[Sterling + Polaris — Routes Degraded]]
- [[ATS]]
- [[Direct to Bank Daily Stand Up 2026-04-16]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
- [[note_2026-04-23T13-53-37-857Z]]
