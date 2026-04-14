---
type:
  - "source-config"
title: source-config-google-drive
created: "2026-04-12T20:46:37Z"
summary: Signal source registration and filtering directives for Google Drive (Google Drive MCP) — Shared with me, Gemini meeting notes only.
updated: 2026-04-14
cssclasses:
  - "source-config"
last_processed: "2026-04-14T06:10:00Z"
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
- Meeting notes are created once by Gemini post-meeting and not modified. `createdTime` is the correct delta signal.
- `capture_note` generates its own timestamped filename. The metadata header inside the content provides traceability back to the original Google Doc.
- Cards and Account All Hands (Apr 13, 09:57 UTC) was too large to fetch via google_drive_fetch — skipped this tick. Will retry next tick or flag for manual review.