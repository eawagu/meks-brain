---
type:
  - "entity"
title: Zenith Bank
created: 2026-04-11
summary: "Nigerian bank on Moniepoint's ATS and CoralPay routing; settlement counterparty for the TeamApt/TMSS switch integration. Apr 23 D2B: ATS vulnerability resolved + bank-approved; user-based risk assessment feedback pending; Role Matrix and bank scan report still open. Note: Gemini transcripts render 'Zenith' as 'Zenit'."
updated: "2026-04-23T14:43:37Z"
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

## ATS Track (Direct to Bank) — Apr 23 standup

Three open Zenith ATS threads surfaced at the Apr 23 D2B standup:

1. **Vulnerability / risk assessment** — the bank-found vulnerability was tested and resolved with final bank approval. Bank has now indicated plans for a user-based risk assessment; team is awaiting feedback, ideally today. [[Abiodun Famoye]] clarified this is the ATS track, not the DD assessment he had initially thought.
2. **[[Role Matrix]]** — the bank-provided matrix was incomplete and lacked specificity. [[Ifeoluwa Oguntona]], Gaffa ([[Abdulgafar Obeitor]]) and the bank met so the bank could explain needs and knowledge gaps; Gaffa committed to re-editing the team's role matrix document to accommodate bank requirements so they can finalize user roles and prepare for training (tentatively Tue/Wed next week).
3. **Scans** — bank completed its security scan and returned results; team's scan report (promised yesterday) remains pending. [[Yasir Syed Ali]] to sync with [[Isaac]] within ~1 hour before providing an update on when the team's scan deliverable will be available.

Source: [[note_2026-04-23T13-53-37-857Z]].

## Sources

- [[review-queue]]
- [[Source — Cards Team Knowledge Transfer Olufemi to Tracy 2026-04-21]]
- [[Direct to Bank Daily Stand Up 2026-04-14 0822 — transcript]]
- [[note_2026-04-23T13-53-37-857Z]]