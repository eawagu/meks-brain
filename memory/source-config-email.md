---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering. last_processed 2026-04-26T10:10:00Z (11:10 WAT). 11:10 WAT Apr 26 skim-tick: Layer 1 zero, Layer 2 keyword 0 NEW (the 09:12 UTC Access DD bilateral thread `19dc9102d9bde88a` was already captured at 10:10 WAT prior tick — boundary case). Sunday morning quiet on email path."
updated: "2026-04-26T13:21:52Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-26T13:10:00Z"
---


## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate. **Bot-sender heuristic MUST NOT preempt Layer 1** — a To:user message from an automated address (bamboohr.com, lattice, calendar invites) is still Layer 1; the bot-sender filter applies only to CC/BCC paths.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.
- HR/people-management: time off, leave request, approval pending, hire approval, PIP.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity OR is To:user (Layer 1 preempts skip).

### Skim-tick query discipline (post 2026-04-25 17:10 WAT FCMB cycle-2 1-tick delay)
Skim-tick MUST run BOTH Layer 1 (`to:me newer_than:Nh`) AND Layer 2 keyword pass (operational keywords + issuer-name buckets) every tick. The 16:10 WAT Apr 25 prior-tick documented only Layer 1 sweep (\"clean empty result, no residual-cache\") and missed Afeez's FCMB RC91 escalation email filed at 15:04:26Z (within window). The next tick's keyword sweep recovered the signal at 17:10 WAT — 1h05m delay is bounded but undesirable. **Skim-tick MUST run the operational keyword bucket as part of the per-source delta-check pass** — Layer-1-only is not sufficient. Only the issuer-name buckets (which exceed token budget when OR'd) may be deferred under skim cost cap; operational + governance + process buckets fit within budget per the execution pattern below.

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR \"Adewuyi Mayowa\") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated through 17:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries. Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above; jq-from-persisted-file is the escape hatch when even pageSize 10 overflows.

### Known limitation — Residual-cache behavior on newer_than filter (observed 2026-04-24 18:09 WAT)
When no threads match the `newer_than:Nh` filter, Gmail MCP occasionally returns a cached thread (often an old thread the user is a participant in) instead of an empty result. Filter must be applied client-side: check each returned thread's most-recent-message timestamp against the window cutoff; treat threads whose latest message predates the cutoff as zero-delta.

## Notes

### last_processed 2026-04-26T13:10:00Z (14:10 WAT) — skim-level 14:00-cron tick (8h after Sunday briefing), Layer 1 zero + Layer 2 1 thread message at 13:55:56 WAT — Access DD bilateral thread, AMBIGUOUS SENDER, conservative read = TeamApt internal acknowledgment, bank-silence watchpoint reaches 4h threshold this tick

14:10 WAT Apr 26 Sunday skim tick (Step 0: level=skim, rationale=sunday-afternoon-with-active-p1-watch). Window 12:10:00Z → 13:10:00Z = 1h.

**Layer 1 query `to:me newer_than:1d`: 0 threads in window.** Empty result `{}` (Gmail MCP returned no residual-cache thread).

**Operational keyword query `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised OR Mandate) newer_than:2h`: 1 thread in window — `19dc9102d9bde88a` Access Bank | DD | Mandate Creation Failures.** Three messages in this thread now visible:
- 09:12:36 UTC (10:12 WAT) Daniel Armstrong → Access Card Switching Team — original bilateral filing (captured at 10:10 WAT prior tick)
- 11:45:52 UTC (12:45 WAT) Daniel Armstrong "Gentle reminder" (within prior 13:10 WAT tick's 12:10→13:10 UTC window — already known, boundary timing)
- **NEW THIS WINDOW: 12:55:56 UTC (13:55:56 WAT) message id `19dc9dca9d4d543c`. Sender field: `aptpaytechnicalsupport@teamapt.com`. Body signed: "Temitayo Bashir Ola-Buraimo TEAM…" (truncated). Body: "Dear @Daniel Armstrong, Kindly note that this is still being reviewed, we will revert with a feedback shortly. Regards. [cid:image761498.png@B612CB1F.37E08AB4]"**

**Sender attribution AMBIGUOUS** — literal sender field is TeamApt's shared support inbox; body signature name closely matches Access Bank contact `temitayo.ola-buraimo@accessbankplc.com` (with middle name "Bashir" added). Brain `search` for "Temitayo Bashir Ola-Buraimo aptpaytechnicalsupport TeamApt" found no TeamApt employee with that name (only TeamApt's `Temitayo Akinmola` engineer and Access Bank's `temitayo.ola-buraimo@accessbankplc.com` recipient). Two readings: (a) Access Bank's Temitayo replied via routing through aptpaytechnicalsupport (e.g., shared mailbox or forwarding rule); (b) TeamApt internal team member or shared-inbox auto-response acknowledging the open issue. The "@" salutation syntax ("Dear @Daniel Armstrong") is more typical of TeamApt internal than Access Bank formal correspondence — biases toward reading (b). **Conservative classification: TeamApt internal acknowledgment, bank silence persists at the 4h post-bilateral watchpoint** (10:12 WAT bilateral + 4h = 14:12 WAT; tick at 14:09 WAT is 3min pre-threshold).

Body is acknowledgment-only — "still being reviewed, will revert shortly" — no resolution, no novel structural change. The 11:45 reminder from Daniel reflects standard escalation-reminder pattern (within prior tick's window).

**No additional issuer-bucket sweeps this skim-tick** (cost cap; next briefing-tick will cover).

**Active P1 silence-rule check (cross-cutting):**
- **CoralPay ZIB RC91** — no email mention since Hourly Reports 07:50 WAT byte-identical resend (6h21m+ silent on email path). The 4th hourly report (when Daniel files it) is the watchpoint signal — still not yet visible at this tick (3h+ past Daniel's 08:01 WAT shift start). Possible explanations unchanged: (a) Daniel hasn't filed an hourly report (ops cadence broken on Sunday handover), (b) hourly report was filed but to a different thread/recipient.
- **Access Bank cycle 8** — closed bank-side at 07:54 WAT. Email path silent on closure (no closure note from bank, no Slack closure post propagated). 6h17m+ post-resolution.
- **Access Bank DD Mandate Failures** — bilateral filing 10:12 WAT. **3h57m+ post-bilateral, 4h watchpoint (14:12 WAT) reaches threshold this tick.** The 13:55 WAT thread message has AMBIGUOUS sender (TeamApt vs Access Bank); under conservative read (TeamApt internal), bank silence persists. Bank-side coordination breakdown remains the leading hypothesis. Next watchpoint: explicit `*.accessbankplc.com` sender in thread (vs `teamapt.com` ambiguity). If no `accessbankplc.com` sender visible by 06:10 WAT Apr 27 (briefing tick), escalate as briefing-2026-04-27 Decision item.

**No Immediate dispatch from email-side this tick** — bilateral thread acknowledgment is not a novel Immediate trigger.

Factors: source=email, skim_tick, layer1_zero, layer2_one_thread_delta_19dc9dca9d4d543c, sender_ambiguous_aptpaytechnicalsupport_signed_temitayo_bashir_ola_buraimo, brain_no_teamapt_employee_with_that_name, conservative_read_teamapt_internal_acknowledgment, sunday_afternoon_quiet_otherwise, no_immediate_dispatch_from_email_side, bank_silence_4h_watchpoint_reached_threshold_this_tick, watchpoint_for_briefing_apr27_if_no_accessbankplc_sender_by_then, coralpay_4th_hourly_report_still_missing_3h_past_daniel_shift_start.

### last_processed 2026-04-26T12:10:00Z (13:10 WAT) — skim-level 13:00-cron tick (preserved summary)

13:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 0 NEW threads in 1h window (Access DD bilateral thread `19dc9102d9bde88a` aged past `newer_than:2h` window — natural dedup). Sunday afternoon quiet on email path. CoralPay 4th hourly report still missing 2h+ past Daniel shift start. Access DD bank reply 2h58m+ post-bilateral with NO bank reply visible (well past typical 30–60min Access reply window). Watchpoint: if no reply by ~14:00 WAT (4h post-bilateral), bank-side coordination breakdown becomes leading hypothesis. No Immediate dispatch.

### last_processed 2026-04-26T11:10:00Z (12:10 WAT) — skim-level 12:00-cron tick (preserved summary)

12:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 keyword 0 NEW (Access DD bilateral thread `19dc9102d9bde88a` returned again — third-tick boundary-case repeat dedup). Bank reply 1h59m+ post-bilateral — escalating concern.

### last_processed 2026-04-26T10:10:00Z (11:10 WAT) — skim-level 11:00-cron tick (preserved summary)

11:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 keyword 0 NEW (Access DD bilateral thread already captured at 10:10 WAT prior tick — boundary case). Sunday morning quiet. No Immediate dispatch.

### last_processed 2026-04-26T09:10:00Z (10:10 WAT) — skim-level 10:00-cron tick (preserved summary)

10:10 WAT Apr 26 Sunday skim. Layer 1 zero. Layer 2 1 new thread `19dc9102d9bde88a` Daniel Armstrong → Access Card Switching Team 10:12 WAT. Immediate-tier dispatched.

### last_processed 2026-04-26T07:10:00Z (08:10 WAT) — skim-level 08:00-cron tick (preserved summary)

08:10 WAT Apr 26 Sunday skim. Hourly Reports 3rd byte-identical resend at 07:50 WAT. Duty Handover Note 08:01 WAT. No Immediate.

### last_processed 2026-04-26T06:10:00Z (07:10 WAT) — skim-level 07:00-cron tick (preserved summary)

Layer 1 zero. Operational keyword 1 thread — Hourly Reports 06:44 WAT byte-identical resend.

### last_processed 2026-04-26T05:10:00Z (06:10 WAT) — full-level briefing-tick (preserved summary)

Layer 1 zero. Operational keyword 1 delta — Hourly Reports 20260426 thread 19dc749cf20cd04b 01:56 WAT (Briefing-2026-04-26 A4).

### last_processed 2026-04-25T17:10:00Z–earlier — preserved summary block

Apr 25 ticks (Stanbic cycle 34, end-of-shift handover, FCMB cycle 2 keyword recovery 1-tick delay, BambooHR Layer 1 calibration miss).

### last_processed 2026-04-24T05:09:00Z–earlier — preserved summary block

Apr 24 ticks.