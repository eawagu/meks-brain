---
title: Capture leakage
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T11:37:36Z"
updated: "2026-04-25T11:37:36Z"
summary: Failure mode where a capture-pipeline shell/wrapper command lands in the ingress folder as a standalone file instead of executing and writing the intended content — leaves a misnamed file with shell snippet body.
---

## Definition

Capture leakage is a failure mode of the brain capture pipeline (e.g., `capture_note` invocations) in which the shell or scripting wrapper that was supposed to *invoke* a capture instead reaches the ingress folder *as the captured content*. The result is a file in ingress whose filename suggests legitimate content (often a meeting title or note title), but whose body is a heredoc, command substitution, or wrapper snippet that was never meant to be the payload.

## Observed instances (2026-04-25 ingest batch)

Two sibling files, both 102 bytes, both the same `python3 << 'EOPY'` heredoc reading `/tmp/captureN.md`:

- [[Disbursement Issues & Next steps – 2026_04_22 11_25 WAT – Notes by Gemini]] — referenced `/tmp/capture2.md`
- [[Phoenix Stage 1- Weekly Check in - 2026_04_07 16_59 BST - Notes by Gemini]] — referenced `/tmp/capture1.md`

Both filenames suggest Gemini-authored meeting notes; neither file contains any actual meeting content. The two `/tmp/captureN.md` source files were either never written, lost, or ingested separately under different filenames.

## Failure characteristics

- Body is implausibly small for the filename's implied content (e.g., 102 bytes for a meeting note).
- Body is recognizably shell or scripting wrapper text — heredoc, here-string, command pipeline, or `cat <<EOF` pattern.
- Filename is well-formed and looks legitimate, masking the leakage at scan time.

## Structural fix candidates

1. **Pre-write content sniffer** — capture pipeline should refuse to write a file whose body matches a shell-wrapper heuristic (heredoc markers, leading `python3 << 'EOPY'`, etc.) and surface an error instead.
2. **Size floor** — capture entries below a configurable byte threshold (e.g., 200 bytes) should be flagged for review rather than written silently.
3. **Self-reference detection** — if a capture's body literally references the file path it is being written to (e.g., `open('/tmp/capture2.md')`), the pipeline has captured its own scaffolding and must abort.

## Related concepts

- [[Ingest pipeline integrity]]
