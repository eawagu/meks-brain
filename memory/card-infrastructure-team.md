---
title: Card Infrastructure Team
type:
  - "entity"
cssclasses:
  - "entity"
aliases:
  - "MFB Cards Team 2"
created: "2026-04-23T05:30:09Z"
updated: "2026-04-23T05:30:09Z"
summary: The larger of two product teams in Moniepoint MFB Cards — PM Damilola Oyediran, EM Nitish Chand; owns transaction processing, security modules, and system integrations across Card Manager Service, Transaction Service, OTP, Disputes, Digitisation, Apps Pay UI, and Card Integration Service.
---

## Overview

The Card Infrastructure team is one of the two product teams within the [[Moniepoint MFB Cards Team]], led by PM [[Damilola Oyediran]] and EM [[Nitish Chand]], ultimately under [[Olufemi Davies]]. Also referred to as MFB Cards Team 2 — the **larger** of the two product teams.

## Scope

All transaction processing, security modules, and system integrations. Functions that would have migrated to a deferred third team (Value Added Services / VAS) — covering tokenization, ACS — currently remain under this team.

## Platforms Owned

- [[Card Manager Service]] — the legacy internal CMS; critical middleware to CBA via Postillion
- [[Card Transaction Service]] — actual transaction processing flow; second middleware layer
- [[Card OTP Service]] — OTPs for secure card operations (Safe Token, future Visa Token, 3DS/ACS)
- [[Dispute Management Service]] — end-to-end customer dispute handling
- [[Digitisation Service]] + [[Sudo Africa]] — tap-to-pay pseudo-digitisation
- [[Apps Pay UI]] — internal UI for background card operations
- [[Card Integration Service]] — integration to Money Desk and other internals

## External Switches / Providers

- [[Postillion]] + [[HSM]] (via Interswitch)
- [[Interswitch]] (legacy Mastercard route)
- [[Verve]] (~99% of transactions)
- [[Sudo Africa]] (tap-to-pay)
- IDS / AITA / GoZone (dispute rails)

## Operations Support

- [[Chargeback and Issue Resolution]] sub-team (leads [[Aima]] / [[Precious]]) — operates dispute flows and L2 customer support

## Sources

- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Note — Existing Cards Team Moniepoint MFB Transition 2026-04-14]]