---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: Signal source registration and filtering directives for Google Drive (Google Drive MCP) — Shared with me, Gemini meeting notes only.
updated: 2026-04-15
cssclasses:
  - "source-config"
last_processed: "2026-04-15T08:09:00Z"
---

## Connection

- **Connector:** Google Drive MCP
- **Scope:** Shared with me — Gemini meeting notes only
- **Access patterns:**
  - `google_drive_search` — delta detection via `sharedWithMe and name contains 'Notes by Gemini' and createdTime > '{last_processed}'`, ordered by `createdTime desc`
  - `google_drive_fetch` — read document content by doc ID (Google Docs only)

## Directives

### Scope constraint

Only process files matching the query above. All other shared files are out of scope — the user handles those manually via the ingress folder.

### Processing split — Summary vs Transcript

Each "Notes by Gemini" document contains two heading-based sections: **Summary** and **Transcript**.

**Summary section → Phase 1 signal (Heartbeat):**
- Extract everything under the Summary heading.
- Treat as a briefing-tier signal.
- Cross-reference against brain (situations, commitments, entities) during Predict.
- Classify per config-salience tiers.

**Transcript section → Ingress via `capture_note`:**
- Extract everything under the Transcript heading.
- Call `capture_note` with the transcript content. Prepend a metadata header to the content:
  ```
  Source: {document title}
  Date: {createdTime}
  Type: meeting-transcript
  ---
  ```
- The next Phase 2 (Ingest) cycle picks up the transcript file and processes it through the standard ingest pipeline (source page, entity/concept extraction, wiki-linking, cross-referencing).
- Do not process the transcript in Phase 1.

### Delta detection

- Filter: `createdTime > '{last_processed}'` in the search query.
- After processing all new documents in a tick, update `last_processed` to the `createdTime` of the most recent document processed.

## Notes

- `google_drive_fetch` only reads Google Docs. Gemini meeting notes are Google Docs, so this is not a limitation for this source.
- `sharedWithMeTime` is only valid as an `orderBy` field, not as a query filter. `createdTime` is used for delta detection instead.
- Cards and Account All Hands (Apr 13, 09:57 UTC) was too large to fetch — skipped; will retry or flag for manual review.
- Some Gemini docs (e.g., Direct to Bank standup 2026-04-14) do not include an explicit "Transcript" heading; equivalent content under "Details" + "Next steps" + "Decisions" is handled as transcript content.
- 2026-04-15 09:09 WAT tick: Zero new Gemini docs in the 07:09–08:08 UTC window. **Twelfth consecutive quiet Drive tick** — Retreat Day 2 meetings now underway in London; first Gemini notes expected late afternoon WAT (retreat sessions are in-person, not all will be recorded by Gemini).
- 2026-04-15 08:10 WAT tick: Zero new Gemini docs in the 06:10–07:09 UTC window. **Eleventh consecutive quiet Drive tick** — Retreat Day 2 begins 09:00 WAT London; first Gemini notes expected late afternoon WAT.
- 2026-04-15 07:10 WAT briefing tick: Zero new Gemini docs in the 22:09 UTC Apr 14 – 06:10 UTC Apr 15 window. **Tenth consecutive quiet Drive tick** — retreat Day 1 evening + overnight fully wound down; Day 2 meetings begin 09:00 WAT today.
- 2026-04-14 23:09 WAT tick: Zero new Gemini docs — Retreat Day 1 Hawksmoor dinner concluding in London.
- 2026-04-14 21:09 WAT tick: Zero new Gemini docs. Eighth consecutive quiet Drive tick.
