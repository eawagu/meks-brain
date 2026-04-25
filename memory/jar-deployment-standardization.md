---
title: JAR deployment standardization
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:52:00Z"
updated: "2026-04-25T11:52:00Z"
summary: TeamApt Direct to Bank principle — single uniform set of JAR files deployed across all banks. New vulnerabilities raised by one bank deployed to other banks only after confirmation and deployment there. Aligned 2026-04-21.
---

## Definition

**JAR deployment standardization** is the [[Direct to Bank program]] principle that TeamApt deploys a single, uniform set of JAR files to all integrated banks rather than per-bank custom builds. Codified as an aligned decision at the 2026-04-21 D2B standup.

## Aligned decision (2026-04-21 D2B)

- Adopt a principle of deploying a single, uniform set of JAR files across all banks.
- New vulnerabilities raised by one bank (e.g., [[Union Bank]]) will only be deployed to other banks (e.g., [[Zenith Bank]]) after they have been confirmed and deployed there.
- Source: [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]].

## Implication for sequencing

The principle creates a deliberate one-bank-at-a-time fan-out for security fixes — confirm in production at the originating bank first, then propagate. Trade-off: slower fan-out vs. lower risk of fielding unverified fixes broadly.

## 2026-04-22 application

[[Keystone Bank]] aligned testing strategy invokes this principle: "deploy the latest JAR to the test environment to perform testing while awaiting the bank's mobile application completion." Source: [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]].

## Sources

- [[Direct to Bank Daily standup - 2026-04-21 08:10 WAT]]
- [[Direct to Bank Daily standup - 2026-04-22 08:21 WAT]]
