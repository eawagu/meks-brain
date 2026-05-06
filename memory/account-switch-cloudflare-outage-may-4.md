---
role: cto-teamapt
type:
  - "situation"
title: Account Switch — Cloudflare Outage May 4
status: retired
created: "2026-05-04T17:18:58Z"
summary: "RETIRED 2026-05-06 18:11 WAT pre-overnight tick — 24h no-recurrence threshold met (15:30 WAT May 5 → 15:30 WAT May 6 elapsed clean; this tick at 18:11 WAT confirms zero recurrence in the 4h sweep window). Cycle 2 RESOLVED 15:30 WAT May 5 (TDSD-6843 Ekene Udodi + TDSD-6847 Mustapha Ajibade Completed 15:29-15:30 WAT). Total cycles 2 (May 4 14:33 WAT + May 5 06:25-15:30 WAT). Documentation-deficit pattern preserved as calibration history. Edge Monitoring escalation MANCo agenda remains active separately."
updated: "2026-05-06T17:17:09Z"
cssclasses:
  - "situation"
accountability: ats-operations
---

[[Account Switch]] portal is down because [[Cloudflare]] is unavailable — edge-layer outage rather than application-layer. Distinct from the Apr 12 [[Account Switch — Extended Portal Outage with Zero Documentation]] (now retired) — that was an app-layer problem; this is at the CDN/WAF tier. Cross-customer impact: [[Paystack]] cannot reach our services either.

**RETIRED 2026-05-06 18:11 WAT pre-overnight tick.** 24h-no-recurrence threshold met cleanly. Cycle 2 RESOLVED 15:30 WAT May 5; the 06:09 WAT, 10:11 WAT, 14:10 WAT, 18:11 WAT May 6 ticks all swept zero Cloudflare/Account Switch signal across Slack Tier 1 (#teamapt-tech-operations + #account-switch-alerts), Jira (no re-opened tickets, no new TDSDs), and email (no Cloudflare/Account-Switch keyword hits, no system alert forwards). Last #account-switch-alerts system alert: 06:48 WAT May 5. Total observation window without recurrence: 26h41m at retirement (15:30 WAT May 5 → 18:11 WAT May 6). Multi-cycle outage envelope held to 2 cycles only. Status `resolving` → `retired`. Pattern significance preserved on entity pages [[Cloudflare]] + [[Account Switch]] and on [[Edge Monitoring]] for ongoing MANCo-level tracking.

## Cycle 1 (May 4 14:33 WAT — closed without resolution post)

**Filing chain:**
- **14:33 WAT P1 start** — [[Daniel Armstrong]] structured P1 post in #teamapt-tech-operations (C0ABU8GMW75) at 15:11 WAT (first observed timestamp; reported start 2:33 PM = 14:33 WAT): "P1: We can't reach the services on outpost due to CloudFlare not being available. Account Switch portal is currently inaccessible and Paystack can't reach us too. Identified Cause: Ongoing. Resolution Action: The issue was escalated for investigation and resolution. Incident Duration: Ongoing."
- **14:15-17:28 WAT alert cluster** — 21 system alerts logged in #account-switch-alerts (C098VUQCVRA), all CloudFlare-error related, beginning 14:15:21 CET (14:15 WAT). Last alert seen 17:28:52 WAT.
- **18:14 WAT pre-overnight tick** — no closure post observed in either channel; outage 3h41m+ active. Sweep returned no recovery signal.
- **No closure post observed overnight or at 06:09 WAT briefing tick.** Briefing-2026-05-05 B1 fired Active-P1-silence rule (~12h silent vs. 1h threshold) — Immediate DM dispatched.

## Cycle 2 (May 5 06:25 WAT — RESOLVED 15:30 WAT, 9h05m)

**Filing chain:**
- **06:25 WAT P1 start (reported)** — [[Olamide Ajibulu]] structured P1 post in #teamapt-tech-operations (C0ABU8GMW75) at 06:39 WAT.
- **#account-switch-alerts** — 4 alerts at 06:23, 06:28, 06:48 (×2) WAT.
- **TDSD-6843** — [[Olamide Ajibulu]] (reporter+assignee) 07:50 WAT, "Account switch portal connection timeout", Medium, INITIAL REVIEW.
- **TDSD-6847** — [[Omotoyosi Sanni]] (reporter) → [[Mustapha Ajibade]] (assignee) 08:49 WAT, "Inability to access Account Switch Portal", Medium, INITIAL REVIEW.
- **10:11 WAT** — Cycle 2 active 3h46m+, Immediate DM dispatched.
- **14:10 WAT** — Cycle 2 active 7h45m+, both Jira tickets remain INITIAL REVIEW since 09:49 WAT, full afternoon silence on Slack channels. Third Immediate dispatch.
- **15:29:47 WAT** — **TDSD-6843 Completed** ([[Ekene Udodi]]).
- **15:30:00 WAT** — **TDSD-6847 Completed** ([[Mustapha Ajibade]]).
- **18:11 WAT** — Resolution discovered in Jira sweep at 18:00 pre-overnight tick. No Slack closure post in either channel through entire 4h sweep window since 14:10 tick. **Documentation-deficit pattern repeats from Cycle 1** — operational anti-pattern persists; closure post is the natural verification surface and its absence creates the absence-of-evidence problem the heartbeat must reverse-engineer from Jira-side state. Active-P1-silence rule fired at 14:10 tick on stale assumption — Cycle 2 was actually resolving in parallel.

## TDSD-6834 HA port-change — completed but insufficient

Approved 22:22 WAT May 4, Completed 09:05 WAT May 5. [[Ekene Udodi]] reporter+assignee. Change: single-port (4000) → multi-port for HA on Moniepoint→Account-switch via Traft Outpost. The completion did not prevent yesterday's CloudFlare-driven recurrence — *HA fix targets failover behavior, not CloudFlare availability itself*. The fix is structural for resilience but not the blocker for the current outage.

## Pattern significance

**Edge-layer outage — confirmed multi-day with documentation-deficit recurrence.** First cycle May 4 14:33 WAT (closed without resolution post), second cycle May 5 06:25 WAT (resolved 15:30 WAT bank-side, 9h05m). Same root cause (CloudFlare unavailability), same impact pattern (portal + Paystack reach), same documentation pattern (no closure post in either channel — Jira-side closure only). The recurrence after ~16h of (assumed) overnight quiet established this as a recurring edge-tier condition, not a one-off incident. **The documentation-deficit pattern is itself a separate process gap** — closure posts allow operational verification; without them, every silence period creates an absence-of-evidence problem that cycle-2 resolution was eventually visible only through Jira-side ticket state changes.

**Edge visibility gap connection.** Edge monitoring is a known gap per [[TeamApt MANCo Meeting - 31 March 2026]]: [[Damilare Ogunnaike]] flagged most reports are DB-backed not real-time edge; [[Tolu Aina]] flagged Cloudflare access constraints; [[Edge Monitoring]] initiative was prioritized at March MANCo. The May 4–5 multi-cycle outage confirms the cost of unresolved edge visibility — without real-time edge monitoring, ops has no diagnostic surface to distinguish genuine CloudFlare outage vs. config drift vs. credential/auth issue. Edge Monitoring agenda continues independently of this situation's retirement.

**Cross-customer SLA exposure.** Paystack reach blocked across both cycles. `#teamapt-x-paystack-transfer-support` (C096LCNP26P) Tier 1 channel returned no new content this sweep — but the underlying transfer integration was at risk during the 9h05m Cycle 2 active window.

## Triage classification (final)

- Tier 1 (Immediate) — dispatched at 18:14 WAT May 4, 06:09 WAT May 5, 10:11 WAT May 5, 14:10 WAT May 5. Resolution-discovery 18:11 May 5 inverted the trigger. From 06:09 WAT May 6 onward the Active-P1-silence rule remained mute (no active P1) and the 24h-no-recurrence countdown ran clean from 15:30 WAT May 5 to 15:30 WAT May 6 → retirement at the 18:11 WAT May 6 tick (next post-15:30 tick). Trigger #2 (P1 >2h) primary. Trigger #5 candidate (Cisco ASA CVE-2020-3452) tracked separately on briefing-2026-05-06 B1 as a possible converging edge-security signal.

## Sources

Slack #teamapt-tech-operations C0ABU8GMW75 May 4 15:11 WAT (Daniel Armstrong P1, start 14:33 WAT) + May 5 06:39 WAT (Olamide Ajibulu P1, start 06:25 WAT); Slack #account-switch-alerts C098VUQCVRA May 4 14:15-17:28 WAT alert cluster (21 alerts) + May 5 06:23-06:48 WAT (4 alerts); TDSD-6843 + TDSD-6847 (both Completed 15:29-15:30 WAT May 5) + TDSD-6834 (Jira); briefing-2026-05-04, briefing-2026-05-05 B1, briefing-2026-05-06 B10.

## Deltas

- [2026-05-04 18:14 WAT] — Created. Active 3h41m at observation. Exceeds 2h Immediate trigger #2 by 1h41m. CTO-DM dispatched via Slack MCP. CloudFlare edge layer; Paystack cross-customer reach blocked. No Jira ticket. Distinct from Apr 12 application-layer Account Switch outage (RETIRED) — different layer, different remediation path. Connects to [[Edge Monitoring]] initiative — March MANCo flagged the edge visibility gap that today exposes.
- [2026-05-05 06:09 WAT] — Briefing-tick observation: ~12h silent since last update. Active-P1-silence absence-of-signal rule fires (1h threshold exceeded by ~11h). Briefing-2026-05-05 B1 records the silence-rule fire.
- [2026-05-05 10:11 WAT] — **Cycle 2 active.** New P1 declaration by Olamide Ajibulu at 06:39 WAT (start 06:25 WAT) — same root cause, same impact. TDSD-6843 (07:50) + TDSD-6847 (08:49) filed, both INITIAL REVIEW. TDSD-6834 HA port-change Completed 09:05 WAT but did not prevent recurrence. Multi-day pattern confirmed. CTO-DM dispatched. Possible converging signal with today's Cisco ASA CVE-2020-3452 reopened vuln.
- [2026-05-05 14:10 WAT] — Cycle 2 ongoing 7h45m+. Both Jira tickets remain INITIAL REVIEW with no updates since 09:49 WAT. Slack channels silent across entire 4h sweep window. Active-P1-silence rule fires again — 1h threshold exceeded by 6h45m+ on Cycle 2 alone. Third consecutive Immediate DM dispatched.
- [2026-05-05 18:11 WAT] — **Cycle 2 RESOLVED ~15:30 WAT discovered this tick.** TDSD-6843 Completed 15:29:47 WAT (Ekene Udodi); TDSD-6847 Completed 15:30:00 WAT (Mustapha Ajibade). Cycle 2 end-to-end 9h05m (06:25→15:30 WAT). No Slack closure post — Jira-side resolution discovered via 18:00 pre-overnight Jira sweep. Status `developing` → `resolving`. The 14:10 tick's Immediate dispatch was based on stale silence-rule assumption — actual cycle 2 was resolving 1h20m later. **Calibration signal:** Active-P1-silence rule firing on a near-resolved P1 because the heartbeat depends on Slack closure posts that never came; the Jira-side closure was visible 30 min after the 14:10 tick window closed. Rule is correct in spec, but the documentation-deficit upstream pattern produces false-positive Immediates. Captured separately as MISS tuple. Status not retired this tick — 24h no-recurrence observation needed before retirement candidate. Edge Monitoring initiative urgency persists; MANCo 10:00–12:00 WAT outcome on agenda unconfirmed.
- [2026-05-06 06:09 WAT] — **24h-no-recurrence countdown reaches 15:30 WAT today.** Zero overnight recurrence observed at briefing tick: Slack Tier 1 silent on Cloudflare/Account Switch since 15:30 WAT May 5; no Jira tickets re-opened; no email alerts; no system alerts in #account-switch-alerts since 06:48 WAT May 5. Active-P1-silence rule mute (no active P1). Status `resolving` held — retirement candidate at 15:30 WAT today if zero recurrence. Surfaced as briefing-2026-05-06 B10 with 24h-countdown framing. Edge Monitoring MANCo agenda escalation now urgency-grounded; B1 Cisco ASA CVE Trigger #5 surfaces as converging-signal candidate.
- **[2026-05-06 18:11 WAT pre-overnight tick — RETIRED.** Status `resolving` → `retired`. 24h-no-recurrence threshold met cleanly: 15:30 WAT May 5 (Cycle 2 close) → 15:30 WAT May 6 (24h elapsed) → 18:11 WAT May 6 (this tick) = 26h41m total observation window without recurrence. Sweep across all sources (Slack Tier 1 #teamapt-tech-operations + #account-switch-alerts, Jira TDSD layer A, Email Layer 1+2 keyword) returned zero Cloudflare/Account-Switch signal in this window AND across all 4 today's ticks (06:09, 10:11, 14:10, 18:11 WAT). #account-switch-alerts last system alert 06:48 WAT May 5 (≥36h silent). Edge Monitoring MANCo agenda escalation continues independently — retirement of this situation does not retire that initiative. Pattern significance preserved on [[Cloudflare]] + [[Account Switch]] entity pages and on [[Edge Monitoring]] for ongoing MANCo tracking. Documentation-deficit calibration signal preserved as MISS tuple at 18:11 May 5 (already in tuning-log unwritten queue per body-truncation defect; will land when frontmatter-only update API ships per briefing B4 fix-C). Factors: source=heartbeat-tracking, status_resolving_to_retired, twenty_six_hour_no_recurrence_threshold_met, no_immediate_dispatch, b10_carryforward_resolved, edge_monitoring_manco_continues_separately, accountability_alignment_high.]