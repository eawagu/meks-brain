---
title: Account Switch — Cloudflare Outage May 4
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
role: cto-teamapt
accountability: ats-operations
created: "2026-05-04T17:18:58Z"
updated: "2026-05-04T17:18:58Z"
summary: "Account Switch portal outage May 4 — Cloudflare unavailability blocks portal access + Paystack reach. Daniel Armstrong P1 14:33 WAT, ongoing 3h41m+ at 18:14 WAT pre-overnight tick — exceeds 2h Immediate trigger #2 by 1h41m. 21 alerts in #account-switch-alerts 14:15-17:28 WAT (CloudFlare-error cluster). No Jira ticket. Edge layer + cross-customer (Paystack) impact. Distinct from prior Account Switch portal outage (RETIRED — application-layer; this is edge/CDN layer). Status: developing."
---

[[Account Switch]] portal is down because [[Cloudflare]] is unavailable — edge-layer outage rather than application-layer. Distinct from the Apr 12 [[Account Switch — Extended Portal Outage with Zero Documentation]] (now retired) — that was an app-layer problem; this is at the CDN/WAF tier. Cross-customer impact: [[Paystack]] cannot reach our services either.

**Current state (18:14 WAT 2026-05-04 pre-overnight full-tick):** Active 3h41m, **EXCEEDS 2h Immediate trigger #2 by 1h41m**.

## Cycle 1 (May 4 14:33 WAT — ACTIVE)

**Filing chain:**
- **14:33 WAT P1 start** — [[Daniel Armstrong]] structured P1 post in #teamapt-tech-operations (C0ABU8GMW75) at 15:11 WAT (first observed timestamp; reported start 2:33 PM = 14:33 WAT): "P1: We can't reach the services on outpost due to CloudFlare not being available. Account Switch portal is currently inaccessible and Paystack can't reach us too. Identified Cause: Ongoing. Resolution Action: The issue was escalated for investigation and resolution. Incident Duration: Ongoing."
- **14:15-17:28 WAT alert cluster** — 21 system alerts logged in #account-switch-alerts (C098VUQCVRA), all CloudFlare-error related, beginning 14:15:21 CET (14:15 WAT). Last alert seen 17:28:52 WAT.
- **18:14 WAT this tick** — no closure post observed in either channel; outage 3h41m+ active. Sweep returned no recovery signal.

## Pattern significance

**Edge-layer outage — first observed in tracked history.** The retired [[Account Switch — Extended Portal Outage with Zero Documentation]] (Apr 12) was application-layer — TDSD-6488/TDSD-6508/TDSD-6512 were filed to track recovery. Today's outage roots at the Cloudflare CDN/WAF layer — different remediation path (edge-tier vs. app-tier).

**Edge visibility gap connection.** Edge monitoring is a known gap per [[TeamApt MANCo Meeting - 31 March 2026]]: [[Damilare Ogunnaike]] flagged most reports are DB-backed not real-time edge; [[Tolu Aina]] flagged Cloudflare access constraints; [[Edge Monitoring]] initiative was prioritized at March MANCo. Today's outage exposes the cost of unresolved edge visibility — 3h41m of degraded service with limited diagnostic surface.

**Cross-customer SLA exposure.** Paystack reach is blocked — `#teamapt-x-paystack-transfer-support` (C096LCNP26P) Tier 1 channel returned no new content this sweep, but the underlying transfer integration is at risk if outage extends.

## Triage classification

- Tier 1 (Immediate) — dispatched at 18:14 WAT this tick (CTO-DM via Slack MCP, U080PEXEZ0E channel). Trigger #2 (P1 >2h) primary; potentially Trigger #7 (route-off) if traffic-routing decision is made.
- Trigger #5 candidate — security-adjacent (edge layer), worth evaluating if Cloudflare access compromise vs. service availability.

## Sources

Slack #teamapt-tech-operations C0ABU8GMW75 15:11 WAT (Daniel Armstrong P1 post, start 14:33 WAT); Slack #account-switch-alerts C098VUQCVRA 14:15-17:28 WAT alert cluster (21 alerts); briefing-2026-05-04 (no item — outage post-dates 13:14 WAT briefing tick).

## Deltas

- [2026-05-04 18:14 WAT] — Created. Active 3h41m at observation. Exceeds 2h Immediate trigger #2 by 1h41m. CTO-DM dispatched via Slack MCP. CloudFlare edge layer; Paystack cross-customer reach blocked. No Jira ticket. Distinct from Apr 12 application-layer Account Switch outage (RETIRED) — different layer, different remediation path. Connects to [[Edge Monitoring]] initiative — March MANCo flagged the edge visibility gap that today exposes.
