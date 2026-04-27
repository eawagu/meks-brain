---
title: config-ingest-image-prompt
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-27T09:02:10Z"
updated: "2026-04-27T09:02:10Z"
summary: "Image-file handling extracted from config-ingest-prompt — loaded on-demand during Step 2 when read_ingress returns format: image. Covers vision-content interpretation, source page extraction, and image-specific retention judgment."
---

This prompt is loaded by `config-ingest-prompt` during Step 2 when `read_ingress` returns a response with `format: "image"` for a file. It covers vision-content handling and image-specific extraction for the source page body. Assumes base-prompt context (Step 2 sub-steps, retention judgment fields, source page body schema).

## Vision-content handling

The `read_ingress` response for an image file contains the image directly as vision content blocks (not markdown text), accompanied by a JSON metadata block with `format: "image"`. Examine the image content directly with vision — do not attempt to parse the response as text.

## Image extraction for source page

When creating the source page (sub-step 2 of Step 2 in config-ingest-prompt), examine the image visually. Extract all readable text — amounts, dates, names, reference numbers, addresses. Identify the document type (receipt, passport page, invoice, photo, etc.). Use extracted content to populate the source page body's `## Key Points` and `## Entities Mentioned` sections per the body schema in config-ingest-prompt. If text is partially legible, include best-effort reading with a note.

## Retention judgment for image files

Apply the same retention judgment as text files. Most images default to `fs` (worth keeping the original visual) unless the source page fully captures the content (then `discard`) or the image is reference material likely to drive future retrieval (then `postgres`).