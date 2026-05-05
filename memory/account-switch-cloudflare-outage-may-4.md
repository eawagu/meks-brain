---
role: cto-teamapt
type:
  - "situation"
title: Account Switch — Cloudflare Outage May 4
status: developing
created: "2026-05-04T17:18:58Z"
summary: "Account Switch portal outage May 4 — Cloudflare unavailability blocks portal access + Paystack reach. Daniel Armstrong P1 14:33 WAT, ongoing 3h41m+ at 18:14 WAT pre-overnight tick — exceeds 2h Immediate trigger #2 by 1h41m. 21 alerts in #account-switch-alerts 14:15-17:28 WAT (CloudFlare-error cluster). No Jira ticket. Edge layer + cross-customer (Paystack) impact. Distinct from prior Account Switch portal outage (RETIRED — application-layer; this is edge/CDN layer). Status: developing."
updated: "2026-05-05T13:20:47Z"
cssclasses:
  - "situation"
accountability: ats-operations
---

[[Account Switch]] portal is down because [[Cloudflare]] is unavailable — edge-layer outage rather than application-layer. Distinct from the Apr 12 [[Account Switch — Extended Portal Outage with Zero Documentation]] (now retired) — that was an app-layer problem; this is at the CDN/WAF tier. Cross-customer impact: [[Paystack]] cannot reach our services either.

**Current state (14:10 WAT 2026-05-05 heartbeat 14:00 tick):** Cycle 2 ongoing 7h45m+ since 06:25 WAT P1. No closure post observed in either Slack channel or Jira ticket since 10:11 WAT prior tick. TDSD-6843 + TDSD-6847 both still INITIAL REVIEW. Active-P1 silence rule fires for Cycle 2 — 1h threshold exceeded by 6h45m+. **EXCEEDS 2h Immediate trigger #2 by ~5h45m for today's cycle alone.** Third Immediate dispatch today.

## Cycle 1 (May 4 14:33 WAT — closed without resolution post)

**Filing chain:**
- **14:33 WAT P1 start** — [[Daniel Armstrong]] structured P1 post in #teamapt-tech-operations (C0ABU8GMW75) at 15:11 WAT (first observed timestamp; reported start 2:33 PM = 14:33 WAT): "P1: We can't reach the services on outpost due to CloudFlare not being available. Account Switch portal is currently inaccessible and Paystack can't reach us too. Identified Cause: Ongoing. Resolution Action: The issue was escalated for investigation and resolution. Incident Duration: Ongoing."
- **14:15-17:28 WAT alert cluster** — 21 system alerts logged in #account-switch-alerts (C098VUQCVRA), all CloudFlare-error related, beginning 14:15:21 CET (14:15 WAT). Last alert seen 17:28:52 WAT.
- **18:14 WAT pre-overnight tick** — no closure post observed in either channel; outage 3h41m+ active. Sweep returned no recovery signal.
- **No closure post observed overnight or at 06:09 WAT briefing tick.** Briefing-2026-05-05 B1 fired Active-P1-silence rule (~12h silent vs. 1h threshold) — Immediate DM dispatched.

## Cycle 2 (May 5 06:25 WAT — ACTIVE 7h45m+)

**Filing chain:**
- **06:25 WAT P1 start (reported)** — [[Olamide Ajibulu]] structured P1 post in #teamapt-tech-operations (C0ABU8GMW75) at 06:39 WAT: "P1: We can't reach the services on outpost due to CloudFlare not being available. Account Switch portal is currently inaccessible and Paystack can't reach us too. Identified Cause: Ongoing. Resolution Action: The issue has been escalated for investigation and resolution. Incident Duration: Ongoing."
- **#account-switch-alerts** — 4 alerts at 06:23, 06:28, 06:48 (×2) WAT — body content not extracted but timing aligns with portal-error pings.
- **TDSD-6843** — [[Olamide Ajibulu]] (reporter+assignee) 07:50 WAT, "Account switch portal connection timeout", Medium, INITIAL REVIEW. Last update 07:53 WAT (6h17m+ stale at 14:10 WAT).
- **TDSD-6847** — [[Omotoyosi Sanni]] (reporter) → [[Mustapha Ajibade]] (assignee) 08:49 WAT, "Inability to access Account Switch Portal", Medium, INITIAL REVIEW. Last update 09:49 WAT (4h21m+ stale at 14:10 WAT).
- **10:11 WAT** — Cycle 2 active 3h46m+, no closure post. Cross-customer (Paystack) Tier 1 channel #teamapt-x-paystack-transfer-support silent. Immediate DM dispatched.
- **14:10 WAT (this tick)** — Cycle 2 active 7h45m+. Both Jira tickets remain INITIAL REVIEW with no field updates since 09:49 WAT. #teamapt-tech-operations + #account-switch-alerts silent across the entire 4h sweep window. No closure post observed. **MANCo 10:00–12:00 WAT has passed** — whether edge monitoring was raised on the agenda is unconfirmed without comment thread retrieval. Active-P1 silence rule fires again for Cycle 2 at 1h threshold exceeded by 6h45m+. Third consecutive Immediate DM dispatched. Two interpretations: (a) outage resolved without closure post (Cycle 1 documentation pattern repeating — operational anti-pattern), (b) outage genuinely ongoing with team working off-record. Either path produces an absence-of-evidence problem CTO needs to disambiguate.

## TDSD-6834 HA port-change — completed but insufficient

Approved 22:22 WAT May 4, Completed 09:05 WAT May 5. [[Ekene Udodi]] reporter+assignee. Change: single-port (4000) → multi-port for HA on Moniepoint→Account-switch via Traft Outpost. The completion did not prevent today's CloudFlare-driven recurrence — *HA fix targets failover behavior, not CloudFlare availability itself*. The fix is structural for resilience but not the blocker for the current outage.

## Pattern significance

**Edge-layer outage — confirmed multi-day with documentation-deficit recurrence.** First cycle May 4 14:33 WAT (closed without resolution post), second cycle May 5 06:25 WAT (active 7h45m+ at 14:10 WAT, no resolution post, no Slack signal in 4h window). Same root cause (CloudFlare unavailability), same impact pattern (portal + Paystack reach), same documentation pattern (no closure post in either channel). The recurrence after ~16h of (assumed) overnight quiet establishes this as a recurring edge-tier condition, not a one-off incident. **The documentation-deficit pattern is itself a separate process gap** — closure posts allow operational verification; without them, every silence period creates an absence-of-evidence problem.

**Edge visibility gap connection.** Edge monitoring is a known gap per [[TeamApt MANCo Meeting - 31 March 2026]]: [[Damilare Ogunnaike]] flagged most reports are DB-backed not real-time edge; [[Tolu Aina]] flagged Cloudflare access constraints; [[Edge Monitoring]] initiative was prioritized at March MANCo. Today's recurrence after yesterday's outage confirms the cost of unresolved edge visibility — without real-time edge monitoring, ops has no diagnostic surface to distinguish genuine CloudFlare outage vs. config drift vs. credential/auth issue. **MANCo today 10:00–12:00 WAT was the natural escalation surface — outcome unconfirmed at 14:10 tick.**

**Cross-customer SLA exposure.** Paystack reach blocked across both cycles. `#teamapt-x-paystack-transfer-support` (C096LCNP26P) Tier 1 channel returned no new content this sweep — but the underlying transfer integration is at risk if outage extends through business hours.

## Triage classification

- Tier 1 (Immediate) — dispatched at 18:14 WAT May 4 (yesterday's pre-overnight tick), at 06:09 WAT May 5 (briefing tick — Active-P1-silence rule), at 10:11 WAT May 5 (recurrence dispatch), and at 14:10 WAT May 5 (this tick — silence-rule re-fire on Cycle 2). Trigger #2 (P1 >2h) primary; Trigger #7 (route-off) candidate if traffic-routing decision is made. Recurrence pattern strengthens Trigger #1 (new P1) for today's cycle.
- Trigger #5 candidate — security-adjacent (edge layer). Today's separate CVE-2020-3452 Cisco ASA reopened vuln (BISO Lateefat 09:09 WAT email, infrastructure-tier vulnerability) is potential converging signal. Possible coincidence; possible converging edge-security signals.

## Sources

Slack #teamapt-tech-operations C0ABU8GMW75 May 4 15:11 WAT (Daniel Armstrong P1, start 14:33 WAT) + May 5 06:39 WAT (Olamide Ajibulu P1, start 06:25 WAT); Slack #account-switch-alerts C098VUQCVRA May 4 14:15-17:28 WAT alert cluster (21 alerts) + May 5 06:23-06:48 WAT (4 alerts); TDSD-6843 + TDSD-6847 + TDSD-6834 (Jira); briefing-2026-05-04, briefing-2026-05-05 B1.

## Deltas

- [2026-05-04 18:14 WAT] — Created. Active 3h41m at observation. Exceeds 2h Immediate trigger #2 by 1h41m. CTO-DM dispatched via Slack MCP. CloudFlare edge layer; Paystack cross-customer reach blocked. No Jira ticket. Distinct from Apr 12 application-layer Account Switch outage (RETIRED) — different layer, different remediation path. Connects to [[Edge Monitoring]] initiative — March MANCo flagged the edge visibility gap that today exposes.
- [2026-05-05 06:09 WAT] — Briefing-tick observation: ~12h silent since last update. Active-P1-silence absence-of-signal rule fires (1h threshold exceeded by ~11h). Briefing-2026-05-05 B1 records the silence-rule fire. Status unconfirmed — no overnight Slack activity in either channel.
- [2026-05-05 10:11 WAT] — **Cycle 2 active.** New P1 declaration by Olamide Ajibulu at 06:39 WAT (start 06:25 WAT) — same root cause, same impact. TDSD-6843 (07:50) + TDSD-6847 (08:49) filed, both INITIAL REVIEW. TDSD-6834 HA port-change Completed 09:05 WAT but did not prevent recurrence (HA addresses failover, not CloudFlare availability). Multi-day pattern confirmed. CTO-DM dispatched via Slack MCP. MANCo 10:00–12:00 today flagged as natural escalation surface. Possible converging signal with today's Cisco ASA CVE-2020-3452 reopened vuln (BISO email 09:09 WAT) — both edge/infra-tier; worth considering whether they share a common root (Cisco firewall + CloudFlare both edge components).
- [2026-05-05 14:10 WAT] — **Cycle 2 ongoing 7h45m+. Documentation-deficit pattern repeating.** Both Jira tickets remain INITIAL REVIEW with no updates since 09:49 WAT (TDSD-6847) / 07:53 WAT (TDSD-6843). Slack #teamapt-tech-operations + #account-switch-alerts silent across entire 4h sweep window since prior tick. No closure post in either channel. MANCo window has passed; edge monitoring escalation outcome unconfirmed. Active-P1-silence rule fires again — 1h threshold exceeded by 6h45m+ on Cycle 2 alone. Third consecutive Immediate DM dispatched. Two equally-likely interpretations: outage resolved without post (Cycle 1 pattern repeats) OR outage active and quiet — both produce absence-of-evidence problem requiring CTO disambiguation.
