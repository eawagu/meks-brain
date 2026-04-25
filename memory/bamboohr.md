---
type:
  - "entity"
title: BambooHR
created: "2026-04-20T05:35:14Z"
summary: HR platform used by TeamApt to store contracts and HR agreements; flagged in Apr 2026 ISMS audit OFI (A6.6) for not being subject to regular contract review.
updated: "2026-04-25T09:19:59Z"
cssclasses:
  - "entity"
---

## Overview
[[BambooHR]] is the HR platform used by [[TeamApt]] to maintain contracts and HR agreements. Sends automated daily approval-prompt emails for pending team time-off requests.

## Findings — TeamApt IMS Internal Audit (Apr 2026)
Per the [[TeamApt Management Review 19_04_2026]]: ISMS clause A6.6 OFI — "The agreements are maintained on BambooHR but not currently subject to regular review." Remediation: enforce regular review to stay aligned with current legal and regulatory requirements and to minimise risk exposures.

## Pending Time-Off Approvals — CTO-as-Manager Queue (Apr 25 observation)

**5 consecutive daily notifications (Apr 21, 22, 23, 24, 25) from `notifications@app.bamboohr.com` to `emeka.awagu@teamapt.com` (To: field — Layer 1 always-surface per [[source-config-email]]) carrying the same payload:**

- **[[Ravi Kiran Veluguleti]]** — Wed Apr 01 — 1 day of Sick (24 days unactioned at this observation)
- **[[Muhammad Samu]]** — date not visible in snippet (full thread fetch needed for date detail)

Notifications fired at 09:05–09:06 UTC daily (10:05–10:06 WAT). Each daily notification arrived as a fresh thread (BambooHR uses one-thread-per-notification rather than threading-on-subject), so the same approval queue surfaces as a new Layer 1 to:me message every morning.

**Calibration concern:** Per [[source-config-email]] Layer 1 directive ("messages where the user is in To: — no keyword gate, always-surface"), each day's notification should have produced at minimum an Awareness item in the corresponding briefing. None of briefings 2026-04-21 through 2026-04-25 surfaced this signal. Two possible failure modes: (a) the heartbeat per-tick salience reasoning treated `notifications@app.bamboohr.com` as a bot-like sender and silently down-weighted below briefing threshold, OR (b) the email sweep query buckets did not include these notifications in their result set (Gmail MCP residual-cache behavior or query-shape exclusion). MISS captured to [[config-salience]] Tuning Log via `capture_note` 10:10 WAT Apr 25.

**Operational implication:** the Ravi Kiran Veluguleti Apr 01 sick day approval has now sat unactioned 24 days. BambooHR likely auto-approves time-off after a configured stale threshold, but the CTO-as-manager loop is broken regardless — direct reports cannot rely on timely sign-off if the approval queue is silently invisible.

**Recommended action (briefing-2026-04-26 Decision candidate):** approve both pending requests via BambooHR, then either (a) configure a calendar-based reminder for the BambooHR daily digest, OR (b) update [[source-config-email]] with an explicit BambooHR-sender directive ("Always surface BambooHR notifications regardless of automated-status skip rule") to prevent recurrence.

## Sources
- [[TeamApt Management Review 19_04_2026]]
- Gmail thread 19dc3e3ea8fbbbb9 (2026-04-25 09:06 UTC) — Today's "Time Off Requested: Ravi Kiran Veluguleti and Muhammad Samu"
- Gmail thread 19dbebd659fb5484 (2026-04-24 09:06 UTC) — same payload
- Gmail thread 19db996af0c72b5a (2026-04-23 09:05 UTC) — same payload
- Gmail thread 19db4706ab8d810c (2026-04-22 09:05 UTC) — same payload
- Gmail thread 19daf4a1b6567477 (2026-04-21 09:06 UTC) — same payload
