---
title: config-ingress-retention
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-15T14:18:24Z"
updated: "2026-04-15T14:18:24Z"
summary: Ingress Retention runtime config — discard_mode switch gates irreversible discard disposition. Read by MCP server dispatch_raw at end of ingest.
---

Runtime configuration for the Ingress Retention disposition pipeline (per [[Ingress Retention — Judgment-Driven Routing]] design). The MCP server's `dispatch_raw` tool reads this page on every disposition call to determine whether `discard`-labeled raw content is actually deleted or shadow-redirected to `raw/`.

Authoritative for: discard-mode behavior. Other retention concerns (per-label calibration thresholds, labeling prompt directives) may be added here later.

## Settings

- **discard_mode:** `shadow`

## Field reference

### `discard_mode`

Governs disposition for source pages whose ingest-time `retention_label` was judged `discard` (raw content has no retention value beyond the source page itself), and for `MISS:` notes (treated as implicit `discard`).

Values:
- `shadow` — `discard`-labeled raw is NOT deleted. Original is moved from ingress to `raw/` instead (effectively the same disposition as `fs`). Used during the calibration period — lets the user observe what the agent is judging as `discard` before the action is irreversible.
- `live` — `discard`-labeled raw is deleted from ingress. The source page is the only retained representation. This is the eventual go-live state, gated on the calibration loop confirming the agent's labels are trustworthy.

`postgres` and `fs` labels are unaffected by this switch — they always perform their respective dispositions (write Postgres blob + move to `raw/`, or move to `raw/`). Only `discard` is gated here because only `discard` is irreversible.

The switch is durable — retained after go-live so it can be flipped back to `shadow` if the labeling classifier is retrained or drift is suspected. Asymmetric risk: trivial cost to keep the option, irreversible consequence if removed.

## Notes

- The field name is `discard_mode` (not `shadow_mode`) because the switch scopes to the `discard` verb specifically. If future labels acquire their own shadow states (none planned), they would be separate fields.
- This page is read by `dispatch_raw` (brain MCP write tool) on every disposition call. No caching — changes take effect on the next ingest tick.