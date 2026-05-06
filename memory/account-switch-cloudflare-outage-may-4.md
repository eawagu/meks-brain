---
role: cto-teamapt
type:
  - "situation"
title: Account Switch — Cloudflare Outage May 4
status: resolving
created: "2026-05-04T17:18:58Z"
summary: "Cloudflare outage Cycle 2 likely RESOLVED ~15:30 WAT May 5. TDSD-6843 Completed 15:29:47 WAT (Ekene Udodi), TDSD-6847 Completed 15:30:00 WAT (Mustapha Ajibade). Cycle 2 active 9h05m (06:25→15:30 WAT). No Slack closure post — Jira-side resolution only (documentation-deficit pattern persists). Status: developing → resolving."
updated: "2026-05-06T05:27:26Z"
cssclasses:
  - "situation"
accountability: ats-operations
---

[[Account Switch]] portal is down because [[Cloudflare]] is unavailable — edge-layer outage rather than application-layer. Distinct from the Apr 12 [[Account Switch — Extended Portal Outage with Zero Documentation]] (now retired) — that was an app-layer problem; this is at the CDN/WAF tier. Cross-customer impact: [[Paystack]] cannot reach our services either.

**Current state (06:09 WAT 2026-05-06 briefing tick):** Cycle 2 RESOLVED 15:30 WAT May 5. **Zero overnight recurrence observed at 06:09 May 6 sweep** — Slack Tier 1 channels (#teamapt-tech-operations, #account-switch-alerts) silent on Cloudflare/Account Switch since closure; no Jira tickets re-opened; no email alerts. **24h-no-recurrence countdown reaches 15:30 WAT today (May 6)** — retirement candidate at 15:30 today if zero recurrence holds. Status: `resolving` (unchanged this tick).

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

**Edge visibility gap connection.** Edge monitoring is a known gap per [[TeamApt MANCo Meeting - 31 March 2026]]: [[Damilare Ogunnaike]] flagged most reports are DB-backed not real-time edge; [[Tolu Aina]] flagged Cloudflare access constraints; [[Edge Monitoring]] initiative was prioritized at March MANCo. The May 4–5 multi-cycle outage confirms the cost of unresolved edge visibility — without real-time edge monitoring, ops has no diagnostic surface to distinguish genuine CloudFlare outage vs. config drift vs. credential/auth issue. **MANCo today 10:00–12:00 WAT** outcome on edge monitoring agenda still unconfirmed at 18:11 tick (no comment-thread retrieval this tick).

**Cross-customer SLA exposure.** Paystack reach blocked across both cycles. `#teamapt-x-paystack-transfer-support` (C096LCNP26P) Tier 1 channel returned no new content this sweep — but the underlying transfer integration was at risk during the 9h05m Cycle 2 active window.

## Triage classification

- Tier 1 (Immediate) — dispatched at 18:14 WAT May 4 (yesterday's pre-overnight tick), 06:09 WAT May 5 (briefing tick — Active-P1-silence rule), 10:11 WAT May 5 (recurrence dispatch), 14:10 WAT May 5 (silence-rule re-fire on Cycle 2). At 18:11 WAT May 5 the resolution-discovery did NOT trigger a 5th Immediate dispatch — the rule fires on unresolved active-P1; closure inverts the trigger. At 06:09 WAT May 6 (this tick) zero recurrence — Active-P1-silence rule MUTE (no active P1). Trigger #2 (P1 >2h) primary; Trigger #7 (route-off) candidate did not crystallize (portal accessibility restored without route-off decision). Recurrence pattern strengthened Trigger #1 (new P1) for May 5 cycle.
- Trigger #5 candidate — security-adjacent (edge layer). Cisco ASA CVE-2020-3452 reopened vuln (BISO Lateefat 09:09 WAT May 5 email, infrastructure-tier vulnerability) is potential converging signal — surfaced as briefing-2026-05-06 B1 at 96h-late recovery. Possible coincidence; possible converging edge-security signals.

## Sources

Slack #teamapt-tech-operations C0ABU8GMW75 May 4 15:11 WAT (Daniel Armstrong P1, start 14:33 WAT) + May 5 06:39 WAT (Olamide Ajibulu P1, start 06:25 WAT); Slack #account-switch-alerts C098VUQCVRA May 4 14:15-17:28 WAT alert cluster (21 alerts) + May 5 06:23-06:48 WAT (4 alerts); TDSD-6843 + TDSD-6847 (both Completed 15:29-15:30 WAT May 5) + TDSD-6834 (Jira); briefing-2026-05-04, briefing-2026-05-05 B1, briefing-2026-05-06 B10.

## Deltas

- [2026-05-04 18:14 WAT] — Created. Active 3h41m at observation. Exceeds 2h Immediate trigger #2 by 1h41m. CTO-DM dispatched via Slack MCP. CloudFlare edge layer; Paystack cross-customer reach blocked. No Jira ticket. Distinct from Apr 12 application-layer Account Switch outage (RETIRED) — different layer, different remediation path. Connects to [[Edge Monitoring]] initiative — March MANCo flagged the edge visibility gap that today exposes.
- [2026-05-05 06:09 WAT] — Briefing-tick observation: ~12h silent since last update. Active-P1-silence absence-of-signal rule fires (1h threshold exceeded by ~11h). Briefing-2026-05-05 B1 records the silence-rule fire.
- [2026-05-05 10:11 WAT] — **Cycle 2 active.** New P1 declaration by Olamide Ajibulu at 06:39 WAT (start 06:25 WAT) — same root cause, same impact. TDSD-6843 (07:50) + TDSD-6847 (08:49) filed, both INITIAL REVIEW. TDSD-6834 HA port-change Completed 09:05 WAT but did not prevent recurrence. Multi-day pattern confirmed. CTO-DM dispatched. Possible converging signal with today's Cisco ASA CVE-2020-3452 reopened vuln.
- [2026-05-05 14:10 WAT] — Cycle 2 ongoing 7h45m+. Both Jira tickets remain INITIAL REVIEW with no updates since 09:49 WAT. Slack channels silent across entire 4h sweep window. Active-P1-silence rule fires again — 1h threshold exceeded by 6h45m+ on Cycle 2 alone. Third consecutive Immediate DM dispatched.
- [2026-05-05 18:11 WAT] — **Cycle 2 RESOLVED ~15:30 WAT discovered this tick.** TDSD-6843 Completed 15:29:47 WAT (Ekene Udodi); TDSD-6847 Completed 15:30:00 WAT (Mustapha Ajibade). Cycle 2 end-to-end 9h05m (06:25→15:30 WAT). No Slack closure post — Jira-side resolution discovered via 18:00 pre-overnight Jira sweep. Status `developing` → `resolving`. The 14:10 tick's Immediate dispatch was based on stale silence-rule assumption — actual cycle 2 was resolving 1h20m later. **Calibration signal:** Active-P1-silence rule firing on a near-resolved P1 because the heartbeat depends on Slack closure posts that never came; the Jira-side closure was visible 30 min after the 14:10 tick window closed. Rule is correct in spec, but the documentation-deficit upstream pattern produces false-positive Immediates. Captured separately as MISS tuple. Status not retired this tick — 24h no-recurrence observation needed before retirement candidate. Edge Monitoring initiative urgency persists; MANCo 10:00–12:00 WAT outcome on agenda unconfirmed.
- [2026-05-06 06:09 WAT] — **24h-no-recurrence countdown reaches 15:30 WAT today.** Zero overnight recurrence observed at briefing tick: Slack Tier 1 silent on Cloudflare/Account Switch since 15:30 WAT May 5; no Jira tickets re-opened; no email alerts; no system alerts in #account-switch-alerts since 06:48 WAT May 5. Active-P1-silence rule mute (no active P1). Status `resolving` held — retirement candidate at 15:30 WAT today if zero recurrence. Surfaced as briefing-2026-05-06 B10 with 24h-countdown framing. Edge Monitoring MANCo agenda escalation now urgency-grounded; B1 Cisco ASA CVE Trigger #5 surfaces as converging-signal candidate.
