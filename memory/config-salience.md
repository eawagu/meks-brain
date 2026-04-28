---
type:
  - "config"
title: config-salience
created: "2026-04-11T15:44:57Z"
summary: "Exec assistant salience scoring — triage tiers with trigger conditions, dimension weights, absence-of-signal rules, tuning mechanism with missed signal capture (triage-time + async MISS: notes), threshold-based recalculation trigger (20 tuples), and structured recalculation protocol. 17 tuples accumulated (2 new MISSes appended 2026-04-28 ingest: Slack epoch bug 3rd-in-4-days recurrence, Drive normal-chain 4th consecutive deferral — both pattern_significance)."
updated: "2026-04-28T16:57:24Z"
cssclasses:
  - "config"
---

## Triage Tiers

### Immediate (Dispatch alert within the hour)

Fires when ANY of the following trigger conditions is met:

1. **New P1 incident** — Slack or email reports a new P1 start (keywords: P1, outage, down, incident, RC91, transaction failure, settlement failure).
2. **P1 duration exceeds threshold** — Active P1 with no resolution signal for >2 hours. Most RC91 cycles resolve in <1h; exceeding 2h is anomalous and likely stuck.
3. **SLA breach imminent** — Jira ticket approaching SLA threshold with <1 hour remaining.
4. **CTO approval blocking delivery** — Ticket at Authorize status where CTO is a named approver AND a deploy/action window is approaching within 4 hours.
5. **Security incident** — Keywords: breach, compromised, CVE in production, unauthorized access, credential leak, penetration test finding.
6. **Regulatory deadline <48h** — Commitment or signal with regulatory counterparty (CBN, NYDFS, NIBSS, PCI) due within 48 hours.
7. **Route turned off** — A bank route changes from operational to off (direct revenue impact, capacity planning required).
8. **Urgent direct message to CTO** — Message directed to me (To field / DM / @mention) with urgency signal. Urgency signals (any one sufficient): explicit markers ("urgent", "ASAP", "immediately", "need your input now", "blocking on you", "can you approve", "time-sensitive"); structural markers (message sent before 08:00 or after 20:00 WAT from Tier 1/2 sender); escalation pattern (same person messages across two channels within 1 hour); reply-requested framing (direct question requiring a decision, approval request with deadline mentioned).

### Briefing (next scheduled briefing)

Fires when: signal matches a tracked accountability AND action horizon >1 hour. Examples:
- New deltas on tracked situational context entries
- Delegation status changes (completed, overdue, stalled)
- Overdue items surfacing for the first time
- Meeting prep items (agenda-less meetings within 48h, declined RSVPs on recurring 1:1s)
- HR/people items with future deadlines (PIP decisions, OKR submissions, hire approvals)
- Recurring pattern escalation (e.g., "5th consecutive missed deploy window" — the structural decision is Briefing-level; the individual missed window was caught by trigger #4)
- Process failure detection (zero Jira documentation on active incidents)

### Awareness (end of briefing, no Ask)

Fires when: signal is relevant to domain but does not map to an open commitment or accountability gap. Examples:
- Resolved incidents with no follow-up action needed
- Team activity on tracked projects (Drive edits, Jira transitions by others)
- Routine operational metrics
- Vendor communications with no action required
- Channel activity in monitored Slack channels with no CTO-relevant signal

## Salience Dimensions

Five dimensions, scored 0.0–1.0 per signal. Weighted sum determines ordering within each triage tier.

| Dimension | Weight | What it measures |
|---|---|---|
| Urgency | 0.20 | Time until the window for action closes |
| Impact scope | 0.15 | Revenue, customers, compliance, or team affected |
| CTO-specificity | 0.20 | Requires CTO decision vs. someone else can handle |
| Pattern significance | 0.20 | One-off vs. recurring; trend direction (worsening/stable/improving) |
| Accountability alignment | 0.25 | Maps to declared accountabilities in roles registry |

### Weight Constraints

- Minimum per dimension: 0.05
- Maximum per dimension: 0.40
- All weights must sum to 1.00
- Maximum adjustment per recalculation cycle: ±0.05 per dimension
- If a weight adjustment hits a cap, flag in the next briefing as a potential structural issue — the dimension definition may need revision, not just the weight.

## Source-Specific Factors

Source-config pages may enumerate per-message factors specific to that signal source (e.g., source-config-slack lists channel identity, keyword floor, active-situation entity match, @mention, DM, sender weighting; source-config-jira lists archetype signals, Layer B heuristic weights, active-situation entity match). These factors are source-specific inputs that feed the five general dimensions above and drive the initial Immediate/Briefing/Awareness classification at emission time.

The source-config page is the authoritative enumeration — this file does not restate factors. Two obligations follow from the enumeration:

1. **Per-item factor trace.** The heartbeat Act phase appends a `Factors:` line to each briefing item's References section naming every factor that triggered the item's surfacing or tier assignment. Items without a Factors line cannot contribute to per-factor calibration.
2. **Per-factor calibration.** The Improve phase reads the Factors line and records the raw factor list alongside the Tuning Log tuple. Recalculation cycles can then surface factor-level patterns (e.g., "keyword floor over-fires for `failed` in CI channels") in addition to dimension-level patterns.

## Absence-of-Signal Rules

| Context | Silence threshold | Triage tier | Alert format |
|---|---|---|---|
| Active P1 (unresolved) | 1 hour no update | Immediate | "P1 [title] active [duration] with no update in [N]h" |
| Ticket at CTO approval gate | 12 hours no action | Briefing | "[ticket] awaiting CTO approval for [N] days" |
| Delegation with due date | Due date + 0 days, no completion signal | Briefing | "[person] [item] was due [date], no completion signal" |
| Tracked situational context entry | 48 hours no new delta | Awareness | "[situation] no new signals in [N] days" |
| Source-config source (channel/inbox) | 7 days zero messages | Awareness | "[source] silent for [N] days — confirm still relevant" |

## Periodic Reviews

Cadenced Decision items emitted at fixed intervals to audit mechanisms that the Improve phase's surfaced-vs-acted comparison cannot observe. A false-positive in a drop-stage mechanism (skip list, cheap-heuristic filter) silently removes signal before it ever becomes a briefing item, so the Tuning Log is blind to that failure mode. Periodic reviews are the structural guard.

| Review | Cadence | Owner source-config | Surface format |
|---|---|---|---|
| Slack skip-list regression | First briefing tick of each calendar month | source-config-slack | One Decision item per skip-list channel with added-date, confirmed-by-user-date, and last-traffic-signature (bot-only % over trailing 30 days). Action per row: keep / reconsider / surface sample. |
| Slack suspected-bot bulk-confirm | Monday 07:00 WAT briefing tick weekly | source-config-slack | One Decision item listing all pending suspected-bot candidates with each channel's last-traffic-signature. Action per channel: approve (move to skip list) / reject (remove from candidate set). Per-briefing per-channel surfacing is explicitly disallowed. |
| Jira skip-list regression | First briefing tick of each calendar month | source-config-jira | One Decision item per skip-list entry with added-date, confirmed-by-user-date, and last-traffic-signature (match rate over trailing 30 days). Action per row: keep / reconsider / surface sample. |
| Jira skip-list bulk-confirm | Monday 07:00 WAT briefing tick weekly | source-config-jira | One Decision item listing all pending skip candidates (patterns dismissed 3+ consecutive times) with each candidate's last-traffic-signature. Action per candidate: approve (move to skip list) / reject (remove from candidate set). Per-briefing per-candidate surfacing is explicitly disallowed. |

When a new drop-stage mechanism is added to any source-config, MUST add a matching periodic review row here — the review cadence is the only defense against silent signal loss in that mechanism.

## Tuning Mechanism

### Observation Types

The Improve phase (config-heartbeat) observes three signal types after each tick:

1. **Acted on** — User responded to alert, executed scan action, or referenced the item in conversation. Positive signal for the dimensions that scored high.
2. **Dismissed** — Item surfaced but no action across two consecutive briefings, or user explicitly flagged as noise. Negative signal — reduce weight of dominant dimension.
3. **Missed** — User asked about something not surfaced, or discovered a situation that should have been flagged. Most valuable signal. Reverse-engineer which dimensions would have caught it, increase their weight.

### Missed Signal Capture

Two input paths feed missed signal tuples into the Tuning Log:

1. **Triage-time prompt (primary).** After triage annotation (config-triage Step 5b), the client asks "Anything I should have caught?" User-reported misses are written as tuples immediately. This captures misses noticed at decision time — zero friction, in-flow.
2. **Async capture (secondary).** Notes captured via `capture_note` with a `MISS:` prefix (e.g., `MISS: should have flagged the Stanbic settlement delay from yesterday's Slack`) are routed to the Tuning Log by the ingest pipeline instead of creating source pages. This captures misses discovered later from any runtime — Cowork, Claude Code, claude.ai.

### Tuning Tuples

Format: `[date, item_identifier, action: acted|dismissed|missed, dominant_dimension]`

- `item_identifier`: briefing item ID (e.g., `B3`) for acted/dismissed tuples, or a short description for missed tuples.
- `dominant_dimension`: the salience dimension most responsible for the outcome — the dimension that scored highest for acted/dismissed items, or the dimension that would have caught the signal for missed items.

When the source item included a `Factors:` line (per Source-Specific Factors above), append `| factors: <comma-separated factors>` to the tuple so per-factor patterns can be computed at recalculation time alongside per-dimension patterns.

Tuples are written by: the Improve phase (acted/dismissed from Triage Results), the triage client (missed from Step 5b), and the ingest pipeline (missed from `MISS:` notes).

Tuples accumulate in the `## Tuning Log` section below.

### Recalculation Trigger

The Improve phase checks the tuple count in the Tuning Log on each tick. When the count reaches 20 or more, the Improve phase surfaces "Salience recalculation due — N tuples accumulated" as a Decision item in the next briefing (confidence: high, recommended action: approve recalculation). On approval during triage, the recalculation runs:

1. Read all tuples from the Tuning Log.
2. Compute frequency-weighted adjustments: for each dimension, count how often it appears as `dominant_dimension` across each action type. Increase weight for dimensions dominant in `missed` tuples (system under-weighted them). Decrease weight for dimensions dominant in `dismissed` tuples (system over-weighted them). `acted` tuples confirm current weights.
3. When factor traces are present, also compute per-factor frequency across action types. Factor-level patterns inform source-config directive refinement (e.g., narrowing keyword floor lists) rather than dimension weight changes.
4. Apply weight constraints (min 0.05, max 0.40, total 1.00, max ±0.05 per dimension per cycle).
5. Present proposed weight changes to the user with before/after comparison table. Include factor-level observations as a separate section (no automatic action — source-config edits are always user-gated).
6. On user approval: update the Salience Dimensions table above via `update_page`. Compress processed tuples into a summary line: `[date_range, N acted, N dismissed, N missed, weight_deltas_applied]`. Remove processed tuples from the Tuning Log.

### Threshold Tuning

Triage tier thresholds and absence-of-signal N values require human approval to change. The Improve phase may propose adjustments (e.g., "P1 silence threshold of 1h produced 3 false positives this month — suggest 1.5h") but must not apply them without explicit approval.

## Tuning Log

*(Tuples appended by the Improve phase, triage client, and ingest pipeline)*

- [2026-04-12 → 2026-04-20, 18 acted, 1 dismissed, 4 missed, weight_deltas_applied: impact_scope −0.05, accountability_alignment +0.05, cto_specificity held per user override, urgency/pattern_significance unchanged]
- [2026-04-20, B1, dismissed, pattern_significance | factors: source=jira, ticket_priority=medium, situation_match=nibss-dd-retired-apr14, pattern_significance, structural_defect_repeat]
- [2026-04-20, B2, acted, urgency | factors: source=calendar, signal_type=new-invite, conflict_with=recurring-standup, urgency=same-day, accountability_alignment]
- [2026-04-20, B3, acted, urgency | factors: source=reminder, due=today, deferred_count=2, week_window_narrowing, urgency-dominant]
- [2026-04-20, B4, acted, cto_specificity | factors: source=email, situation_delta, wait-state, 24h-heuristic, contested-attribution-risk, cto_specificity]
- [2026-04-20, B5, acted, urgency | factors: source=calendar, signal_type=new-invite+unresolved-conflict-carryforward, urgency=same-day, impact_scope=schedule-integrity]
- [2026-04-20, B6, acted, accountability_alignment | factors: source=config-salience, tuple_count=22, threshold_crossed, periodic_maintenance]
- [2026-04-20, Union Bank RC91 Apr 20 cycle filed 01:17 WAT via email (Olamide Ajibulu → itechannels@) not surfaced in briefing-2026-04-20 06:09 WAT despite email sweep window; briefing A2 falsely claimed "no new RC91 P1s beyond Stanbic cycle 31"; 6th Union Bank RC91 cycle in 9 days; 5h52m active at discovery exceeds typical 14m–2h10m envelope, missed, pattern_significance | factors: source=email, keyword=RC91+Union, filed_during_overnight_delegation_window, multi_message_outreach_without_bank_response, accumulating_cycle_count=6_in_9_days, duration_exceeds_historical_envelope, accountability_alignment_secondary]
- [2026-04-25, BambooHR daily Time-Off Approval notifications (Apr 21–25, 5 consecutive days) to emeka.awagu@teamapt.com Layer 1 To:me silently dropped from briefings — pending Ravi Kiran Veluguleti (Apr 01 sick, 24d unactioned) + Muhammad Samu approvals; Layer 1 always-surface directive bypassed; bot_sender heuristic over-fires when sender is bamboohr.com despite Layer 1 To:user override, missed, accountability_alignment | factors: source=email, layer1_to_me, sender=notifications@app.bamboohr.com, daily_recurring_5_consecutive, hr_people_management_signal, cto_as_manager_approval_queue, accountability_alignment_under_weighted, layer1_directive_bypassed, briefing_silent_5_consecutive_days]
- [2026-04-25, Slack epoch bug at 09:10 WAT Apr 25 tick caused false zero-delta on Tier 1 channel sweep — slack_read_channel oldest=1777705800 was 7 days (604,800s) AHEAD of intended 2026-04-25 07:10 UTC; missed Afeez Kazeem Wema RC91 P1 post in #teamapt-tech-operations at 08:39 WAT (Layer 1 active-situation-entity-match); 10:10 WAT tick recovered with corrected epoch and added correction deltas to Wema situation page and source-config-slack note; structural fix candidate: deterministic epoch compute from last_processed via int(parse_iso(last_processed).timestamp()) + assertion oldest <= int(time.time()) to refuse future epochs, missed, pattern_significance | factors: source=slack, sweep_method=channel_read, epoch_arithmetic_error, week_aligned_drift_604800s, false_zero_delta, layer1_active_situation_match_missed, propagated_to_situation_page_and_source_config_note, structural_defect_candidate_deterministic_epoch_compute, assertion_oldest_le_now_should_block]
- [2026-04-28, B1, dismissed, cto_specificity | factors: source=email+slack, multi_bank_route_off_overnight_5_banks, active_p1_stanbic_4h30m, exceeds_2h_immediate_trigger, bank_silence_4h_post_reconfirm, route_turned_off_immediate_trigger_7, immediate_dispatched_via_slack_dm, accountability_alignment_high, cto_specificity_high, pattern_significance_highest_recorded, concentration_risk_5_banks, user_disposition_hold_posture_ops_owns_no_cto_action]
- [2026-04-28, B2, dismissed, cto_specificity | factors: source=brain+email, briefing_apr27_untriaged_24h+, wema_bilateral_standoff_carryforward, access_dd_silent_47h_carryforward, multi_bank_concentration_today_amplifies_risk, ops_session_path_no_visible_motion_18h, accountability_alignment_high, pattern_significance_high, cto_specificity_high, user_disposition_coherent_with_b1_hold_posture_ops_owns_engineering_motion_via_babajide_feyisayo]
- [2026-04-28, B3, dismissed, urgency | factors: source=jira-mcp-error, structural_connector_failure, jira_blind_window_16h17m, briefing_apr22_pattern_recurrence, urgency_high_blocks_b2_context, last_processed_held_for_recovery_sweep, auth_self_recovered_within_2h_of_briefing, user_disposition_noted_resolved_no_action_needed]
- [2026-04-28, B4, dismissed, urgency | factors: source=calendar+email, deadline_expired_8h30m_overdue, briefing_apr27_b4_high_confidence_unactioned, accountability_alignment_high_8_downward_reports, urgency_post_deadline, hr_policy_dependent, user_disposition_lattice_review_submitted_via_other_channel_no_further_action]
- [2026-04-28, B6, acted, pattern_significance | factors: source=drive, single_in_window_file, normal_tick_handling_deferred_due_to_budget, last_processed_held_per_directive, no_signal_loss_on_defer, deferral_extended_to_2nd_consecutive_tick, user_disposition_approved_directive_compliant_deferral]
- [2026-04-28, B7, acted, urgency | factors: source=reminder, age_trigger_10th_consecutive, both_week_windows_closed_2-3d, untriage_compound_7_briefings, structural_break_in_deferral_mechanism_confirmed, briefing_apr27_b6_dismiss_recommendation_unactioned, user_disposition_overridden_call_done_off_record_reminder_marked_done_fulfilled_2026-04-28]
- [2026-04-28, Slack epoch bug recurred at 12:10 WAT 2026-04-28 heartbeat tick — first Tier 1 channel sweep attempt used oldest=1777713000 which was ~338122s (3.91 days) AHEAD of correct int(parse_iso("2026-04-28T09:09:51Z").timestamp())=1777367391; all 5 Tier 1 slack_read_channel calls returned false zero-delta; deterministic re-compute per source-config-slack directive recovered within-tick and surfaced same-tick Polaris RC91 Start 10:45 WAT (1h23m bank-resolved by 12:08 WAT) and CoralPay ZIB cycle 5 Start 10:46 WAT (4-min partner-resolved at 10:50 WAT); recurrence rate now 3 occurrences in 4 days (Apr 25 09:10, Apr 26 10:10, Apr 28 12:10) despite source-config-slack directive added Apr 25 — pure-prompt mitigation has not eliminated recurrence; runtime assertion oldest <= int(time.time()) proposed in 2026-04-25 MISS tuple would have blocked the future-epoch call and forced deterministic recompute; structural fix at tool-call boundary (heartbeat code or MCP server validation) remains only durable mitigation, missed, pattern_significance | factors: source=slack, sweep_method=channel_read+search, epoch_arithmetic_error, week_aligned_drift_338122s_3p91d, false_zero_delta_5_tier1_channels, recovered_within_tick_via_directive, recurrence_count_3_in_4_days, structural_defect_candidate_runtime_assertion, pure_prompt_mitigation_insufficient, accountability_alignment_high, pattern_significance_recurring_structural_failure]
- [2026-04-28, source-config-google-drive normal-chain handling chain (download → split → process non-transcript layer in-tick → dispatch transcript via capture_note) deferred at 4th consecutive full-tick on 112KB Drive file "Direct to Bank : Daily stand up – 2026/04/28 08:27 WAT – Notes by Gemini" (file_id 1a48cCfuwfrVgkF7RVHfq1EO6ddKXV1z29Hrv3vxfmko); deferral timeline 09:30 / 10:09 / 12:10 / 13:09 / 14:09 WAT Apr 28; deferral mechanism becoming baton-passing without work completing because each subsequent full-tick has had its own budget pressure; Drive last_processed held 22h2m stale at 14:09 WAT, crosses 24h dark-window-recovery threshold at 16:09 WAT today (~2h from MISS capture) and will then trigger bulk-dispatch path; structural fix candidates: (1) lower dark-window-recovery threshold for single-file backlog from 24h to 4h since 4 consecutive deferrals on 1 file is stronger signal than 24h staleness, (2) make subagent delegation default for Drive file processing whenever heartbeat tick already exceeds N tool calls regardless of normal vs. dark-window mode, (3) add explicit deferral counter in source-config-google-drive frontmatter triggering structural escalation Decision item at threshold (e.g., 3), missed, pattern_significance | factors: source=drive, normal_chain_handling, deferral_count=4_consecutive, file_size_112kb, file_id_1a48cCfuwfrVgkF7RVHfq1EO6ddKXV1z29Hrv3vxfmko, budget_protection_directive_only_in_dark_window_branch, last_processed_held_22h2m, dark_window_threshold_2h_away]

### Improve phase note — 2026-04-22 ~12:45 WAT tick

`briefing-2026-04-21` never fired (no page exists). This is a blind-spot tick — no Apr 21 Triage Results to derive tuples from, no surfaced-vs-acted data for Apr 21 signals. The missed-briefing event itself is surfaced as briefing-2026-04-22 B5 Decision item (structural-gate proposal) rather than a scored tuning tuple because the failure mode is not a dimension miscalibration. `briefing-2026-04-20` tuples were already recorded pre-compaction. Current count: 7 tuples (below 20 recalc threshold). Absence-of-signal rules fired correctly this tick: NIBSS DD TDSD-6630 silent 53h (A4, 48h threshold), dad reminder overdue 2d (B3, due_date+0), Ecobank 42h past 24h window (B6). No new tuples written by this Improve phase.

### Ingest phase note — 2026-04-25 ingest tick

Two new MISS tuples appended from async `capture_note` MISS: notes processed in this ingest run (see Step 1b of config-ingest-prompt). Current count: 9 tuples (below 20 recalc threshold). Both tuples carry rich factor traces — the BambooHR tuple highlights `bot_sender` heuristic over-firing on Layer 1 To:me email (structural rather than weight-only fix candidate); the Slack epoch bug tuple is primarily a structural defect surfacing channel and includes a deterministic-epoch-compute fix candidate plus an `oldest <= now` runtime assertion proposal. Both files routed via `finalize_ingest` with label="discard" (no source pages created — calibration signals only).

### Improve phase note — 2026-04-28 12:10 WAT tick

Read briefing-2026-04-28 Triage Results (16 dispositioned items: 5 discarded, 1 held, 1 approved, 1 overridden, 9 noted-on-Awareness). Classified per config-heartbeat-prompt rules: `held` (B5) → no tuple; `noted` on Awareness items (B8–B17, all noted) → no tuples (Tier 1 auto-advance default, no pull-outs); `discarded` on Decision items (B1, B2, B3, B4) → 4 dismissed tuples; `approved` on Decision item (B6) → 1 acted tuple; `overridden` on Decision item (B7) → 1 acted tuple. Total written this tick: 6 tuples. Cumulative count: 9 + 6 = **15 tuples** (below 20 recalc threshold; 5 more dispositions until recalc fires).

Per-tuple dominant-dimension reasoning: B1+B2 user disposition pattern (hold posture, ops owns, no CTO action needed) marks `cto_specificity` as the over-weighted dimension — both items were elevated to Decision tier on CTO-specificity reading that the user rejected. B3+B4 user dispositions (auth self-recovered before user got to triage; Lattice review submitted via other channel before in-app surfacing was relevant) mark `urgency` as over-weighted — both items presented as urgent recommended actions that turned out to be moot. B6 (Drive deferral approved per directive) marks `pattern_significance` as the dimension that correctly classified directive-compliant deferral. B7 (reminder 10th surfacing → user confirmed call done off-record) marks `urgency` as the dimension that correctly carried the age-trigger to user attention.

Tick-internal observation (NOT a tuple, structural-defect signal logged separately via `capture_note` with MISS: prefix for async ingest routing): Slack epoch bug recurred at this tick's first Tier 1 channel sweep attempt (`oldest=1777713000` was ~338122s = 3.91 days ahead of intended `int(parse_iso("2026-04-28T09:09:51Z").timestamp())=1777367391`). All 5 Tier 1 channel reads returned false-zero on first attempt; deterministic re-compute per source-config-slack directive recovered within-tick and surfaced both Polaris and CoralPay ZIB cycle-5 signals. The runtime `oldest <= int(time.time())` assertion proposed in the 2026-04-25 MISS tuple would have blocked the future-epoch call and forced the deterministic recompute path. Bug recurrence rate: 3 occurrences in 4 days (Apr 25 09:10, Apr 26 10:10 first attempt, Apr 28 12:10 first attempt) despite the source-config-slack directive being added Apr 25 — pure-prompt mitigation has not eliminated the bug. Structural fix (assertion at the tool-call boundary) remains the only durable path.

Recalculation check: 15 tuples accumulated, below 20 threshold. No "Salience recalculation due" Decision item to surface in next briefing yet.

Absence-of-signal check: no thresholds fired this tick — Stanbic active P1 is in the >1h silence band but ops-cycle owns this per briefing B1 disposition and the signal is non-novel (carryforward); the duty handover updates remain the operational narrative thread, not the heartbeat. Drive last_processed remains held at 2026-04-27T16:09:00Z (B6 directive-compliant deferral; 2 in-window files unprocessed: Direct to Bank Daily stand up + Juliana Switch Daily Catchup); at 20h0m+ stale, Drive crosses the 24h dark-window-recovery threshold at 16:09 WAT today — next tick after that boundary should re-evaluate against the bulk-dispatch path if budget pressure persists.

### Ingest phase note — 2026-04-28 ingest tick

Two new MISS tuples appended from async `capture_note` MISS: notes processed in this ingest run (see Step 1b of config-ingest-prompt). Both routed `dominant_dimension=pattern_significance`:

1. **Slack epoch bug 12:10 WAT recurrence** — 3rd recurrence in 4 days despite Apr 25 source-config-slack pure-prompt directive. Tuple reinforces the prior 2026-04-25 Slack epoch bug tuple (also `pattern_significance`). Three same-dimension tuples on the identical structural defect (deterministic epoch compute / `oldest <= now` assertion) within 4 days strengthens the signal that pure-prompt mitigation has not closed the loop — structural fix at the tool-call boundary (heartbeat code or MCP server validation) is the only durable path. Calibration substrate for surfacing as a Decision item in the next briefing per the file's own recommendation.

2. **Drive normal-chain 4th consecutive deferral** — single 112KB file deferred across 4 consecutive full-ticks (09:30 / 10:09 / 12:10 / 13:09 / 14:09 WAT Apr 28). The deferral mechanism is becoming baton-passing without the work completing because each subsequent full-tick carries its own budget pressure. Three structural fix candidates surfaced in the file: lower single-file dark-window-recovery threshold from 24h to 4h, make subagent delegation default for Drive whenever tick exceeds N tool calls (not only in dark-window-recovery branch), add a deferral counter to source-config-google-drive frontmatter triggering structural escalation at threshold (e.g., 3). Tuple complements the same-day B6 acted tuple (single-deferral approval per directive) — together the pair shows the directive-compliant deferral works for 1 tick but degrades into structural break by tick 4.

Cumulative count: 15 + 2 = **17 tuples** (below 20 recalc threshold; 3 more dispositions until recalc fires). Both files routed via `finalize_ingest` with label="discard" (no source pages created — calibration signals only).
