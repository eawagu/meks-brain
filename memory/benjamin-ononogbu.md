---
type:
  - "entity"
title: Benjamin Ononogbu
created: "2026-04-25T12:20:41Z"
summary: TeamApt/Moniepoint engineer — owns reversal API investigation, posting-logic code change, transaction filter queries; coordinated 12k-record reprocessing with Dominic Usiabulu (Apr 22, 2026).
updated: "2026-05-12T10:54:12Z"
cssclasses:
  - "entity"
---

## Overview

Benjamin Ononogbu is a [[TeamApt]] / [[Moniepoint]] engineer working on the disbursement / reversal stack.

## 2026-04-22 Disbursement Issues meeting

- Owns reversal API root-cause investigation (status reported by querying original-txn endpoint, not reversal-specific)
- Action: change posting logic to handle CBA code 06 and mark duplicates as successful
- Coordinating 12k-record reprocessing with [[Dominic Usiabulu]]
- Authored transaction filter query (failed Apr 10-20, debit-source journal entries within range, credit reversal outside)
- Sets up reversal + pending dashboards with [[Emmanuel Eke]] and [[Emmanuel Olatunbosun]]
- Receives 700 updated CBA reversal request records from Dominic

Source: [[Disbursement Issues & Next steps - 2026_04_22 11_25 WAT]]