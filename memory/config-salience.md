---
title: config-salience
type:
  - "config"
cssclasses:
  - "config"
created: "2026-04-11T15:44:57Z"
updated: "2026-04-11T15:44:57Z"
summary: Exec assistant salience scoring — triage tiers with trigger conditions, dimension weights, absence-of-signal rules, and tuning mechanism.
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
| Impact scope | 0.20 | Revenue, customers, compliance, or team affected |
| CTO-specificity | 0.20 | Requires CTO decision vs. someone else can handle |
| Pattern significance | 0.20 | One-off vs. recurring; trend direction (worsening/stable/improving) |
| Accountability alignment | 0.20 | Maps to declared accountabilities in roles registry |

### Weight Constraints

- Minimum per dimension: 0.05
- Maximum per dimension: 0.40
- All weights must sum to 1.00
- Maximum adjustment per monthly tuning cycle: ±0.05 per dimension
- If a weight adjustment hits a cap, flag in the next briefing as a potential structural issue — the dimension definition may need revision, not just the weight.

## Absence-of-Signal Rules

| Context | Silence threshold | Triage tier | Alert format |
|---|---|---|---|
| Active P1 (unresolved) | 1 hour no update | Immediate | "P1 [title] active [duration] with no update in [N]h" |
| Ticket at CTO approval gate | 12 hours no action | Briefing | "[ticket] awaiting CTO approval for [N] days" |
| Delegation with due date | Due date + 0 days, no completion signal | Briefing | "[person] [item] was due [date], no completion signal" |
| Tracked situational context entry | 48 hours no new delta | Awareness | "[situation] no new signals in [N] days" |
| Source-config source (channel/inbox) | 7 days zero messages | Awareness | "[source] silent for [N] days — confirm still relevant" |

## Tuning Mechanism

### Observation Types

The Improve phase (config-heartbeat) observes three signal types after each tick:

1. **Acted on** — User responded to alert, executed scan action, or referenced the item in conversation. Positive signal for the dimensions that scored high.
2. **Dismissed** — Item surfaced but no action across two consecutive briefings, or user explicitly flagged as noise. Negative signal — reduce weight of dominant dimension.
3. **Missed** — User asked about something not surfaced, or discovered a situation that should have been flagged. Most valuable signal. Reverse-engineer which dimensions would have caught it, increase their weight.

### Tuning Tuples

After each tick, write: `[date, item_hash, action: acted|dismissed|missed, dominant_dimension]`

Tuples accumulate in a `## Tuning Log` section appended to this page (below).

### Monthly Weight Recalculation

- Batch pass recalculates weights from accumulated tuples using frequency-weighted adjustment.
- Tuples older than 90 days are compressed into the weight values and removed.
- Weight changes are capped per the constraints above.
- Recalculated weights are written to the Salience Dimensions table above. Human approval required before applying.

### Threshold Tuning

Triage tier thresholds and absence-of-signal N values require human approval to change. The Improve phase may propose adjustments (e.g., "P1 silence threshold of 1h produced 3 false positives this month — suggest 1.5h") but must not apply them without explicit approval.

## Tuning Log

*(Tuples appended by the Improve phase after each heartbeat tick)*