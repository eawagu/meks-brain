---
title: Security team performance
type:
  - "concept"
cssclasses:
  - "concept"
created: "2026-04-25T12:07:40Z"
updated: "2026-04-25T12:07:40Z"
summary: Concern raised at Apr 22 weekly — internal security team slow throughput and inadequate tooling; banks find vulnerabilities the internal team misses (Access Bank 200, Zenith Bank also). Ravi to follow up Latifa; group planning Checkmarx procurement.
---

## Surface

At the 2026-04-22 [[TeamApt]] weekly team meeting, [[Yasir Syed Ali]] raised concerns about the security team:

- **Slowing things down** — throughput issues impacting other teams' delivery.
- **Not equipped with the right tools to find bugs** — banks ([[Access Bank]] raised 200 vulnerabilities; [[Zenith Bank]] raising different ones) consistently find vulnerabilities the internal security team misses.
- After Access Bank's 200-vuln raise, the total **increased after the security team went on a call with them** — suggesting internal scan coverage genuinely lagged what banks have visibility into.

[[Wycliffe Ochieng']] agreed: likely a tooling difference — banks discover new vulnerabilities after internal scans complete.

## Resolution path

- **Escalation** — [[Ravi Veluguleti]] will follow up with [[Latifa]] regarding security team delays. Will escalate the discussion if zero changes occur within 1 week.
- **Tool procurement** — the group is planning to get [[Checkmarx]], described as a better tool.
- **Stale-vuln cleanup** — Ravi to contact Latifa about cleanup on Team App.

Source: [[TeamApt Weekly Team Meeting - 2026-04-22 16:59 IST]].

## Why this matters structurally

When banks consistently find more vulns than internal scans, it signals the SAST/DAST tooling baseline is below what counterparties consider acceptable. This is the kind of structural gap that compounds: each bank-found vuln becomes a remediation tax with bank-visibility, while the internal posture remains unchanged. Procuring Checkmarx addresses tooling but not the throughput dimension — the 1-week-no-change escalation gate is the throughput-side mitigation.

## Related

- [[Vulnerability management]]
- [[Checkmarx]]
