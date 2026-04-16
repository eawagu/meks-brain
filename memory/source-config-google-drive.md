---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: Signal source registration and filtering directives for Google Drive (Google Drive MCP) — Shared with me, Gemini meeting notes only.
updated: "2026-04-16T13:18:04Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-16T08:03:43Z"
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
- **2026-04-16 06:23 WAT briefing tick:** Search returned zero new Gemini docs. **Twenty-third consecutive quiet Drive tick.** last_processed unchanged at 2026-04-15T10:51:42Z. Strategy Retreat Day 3 in-person — Gemini not capturing in-person sessions (expected).
- **2026-04-16 08:09 WAT tick:** Zero new Gemini docs. **Twenty-fourth consecutive quiet Drive tick.** last_processed unchanged. Retreat Day 3 in-person.
- **2026-04-16 09:09 WAT tick:** One new Gemini doc: "Direct to Bank : Daily stand up – 2026/04/16 08:14 WAT". Summary processed as Phase 1 signal (Awareness — D2B project status updates: Zenit ATS vuln resolved, Union DD access granted, 4 Felix agreements pending, Polaris extension to next week, GT Bank infra challenge, V2 Jazz regression almost done). Transcript routed to ingress via `capture_note` for Phase 2. last_processed updated to 2026-04-16T08:03:43Z.
- **2026-04-16 10:20 WAT tick:** Zero new Gemini docs since D2B standup at 08:03:43Z. **Twenty-fifth quiet Drive tick in the 26-tick series.** Retreat Day 3 in-person — no new meeting notes expected.
- **2026-04-16 11:15 WAT tick:** Zero new Gemini docs. **Twenty-sixth quiet Drive tick.** last_processed unchanged at 2026-04-16T08:03:43Z. Retreat Day 3 in-person.
- **2026-04-16 12:09 WAT tick:** Zero new Gemini docs. **Twenty-seventh quiet Drive tick.** last_processed unchanged at 2026-04-16T08:03:43Z. Retreat Day 3 in-person.
- **2026-04-16 13:09 WAT tick:** Zero new Gemini docs. **Twenty-eighth quiet Drive tick.** last_processed unchanged at 2026-04-16T08:03:43Z. Retreat Day 3 in-person.
- **2026-04-16 14:09 WAT tick:** Zero new Gemini docs. **Twenty-ninth quiet Drive tick.** last_processed unchanged at 2026-04-16T08:03:43Z. Retreat Day 3 in-person.