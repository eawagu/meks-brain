---
title: Gemini
type:
  - "entity"
cssclasses:
  - "entity"
created: "2026-04-25T11:37:36Z"
updated: "2026-04-25T11:37:36Z"
summary: "Google's Gemini AI assistant — used by Mek's organization to auto-generate meeting notes from Google Meet calls."
---

## Overview

Gemini is Google's AI assistant. In Mek's working context it functions as the auto-note-taker on Google Meet calls — almost every meeting source page in the brain is filed as "Notes by Gemini" with a filename pattern like `<Meeting Title> - YYYY_MM_DD HH_MM <TZ> - Notes by Gemini.md`. The notes typically include attendees, summary, key points, and action items, and are surfaced into the ingest pipeline (likely via Google Drive sync into the ingress folder).

## Observed behaviour

- Filenames carry the meeting title plus a timestamp and timezone (WAT, BST, IST, WEST observed across the 2026-04-25 ingest batch).
- Output format is structured markdown amenable to direct ingest as source pages.

## Source references

- [[Disbursement Issues & Next steps – 2026_04_22 11_25 WAT – Notes by Gemini]] (capture leakage — filename only)
- [[Phoenix Stage 1- Weekly Check in - 2026_04_07 16_59 BST - Notes by Gemini]] (capture leakage — filename only)
