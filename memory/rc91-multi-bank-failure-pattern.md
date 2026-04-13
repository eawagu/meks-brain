---
type:
  - "concept"
title: RC91 Multi-Bank Failure Pattern
created: 2026-04-11
summary: A sustained multi-bank transaction failure pattern — RC91 errors across 14+ banks (Ecobank added Apr 13 via NIBSS escalation on NUS nodes). NIBSS attributes to Moniepoint timeout. Latency investigation due Apr 15.
updated: "2026-04-13T02:12:34Z"
cssclasses:
  - "concept"
---

## Overview
RC91 ("Issuer or Switch Inoperative") failures have escalated from isolated per-bank incidents to a systemic pattern affecting 14+ banks across both TeamApt's Switch and ATS product streams. The pattern began clustering around March 30, 2026, persisted through Easter weekend, and remained active as of April 13. The per-incident bank escalation model has definitively failed to contain it — each bank resolves individual cycles while the underlying root cause remains unfixed.

**Apr 13 development:** NIBSS ([[Moses Ajani]]) proactively reported [[Ecobank]] card transactions on Moniepoint NUS nodes being declined with RC91. This is the same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12 — the Moniepoint-side latency hypothesis gains further evidence as the pattern spreads to additional banks on NUS nodes. Open commitment: [[Oladapo Onayemi]] investigating Moniepoint processing latency to NIBSS node (due Apr 15).

## Pattern Characteristics
- **Scope**: 14+ banks; both Switch and ATS product streams (Ecobank added Apr 13)
- **Duration**: Detected March 30, 2026; persistent through at least April 13, 2026 (14+ days)
- **Failure mechanism**: RC91 = issuer or switch reports itself as inoperative; often intermittent, cycling multiple times per bank per day
- **Intermediary exposure**: [[CoralPay]] routing (PVB, FBN, SBP, ZIB) is a common intermediary in cross-bank failures — escalated to Problem Investigation (TDSD-6448) April 6
- **Root cause hypothesis (strengthening):** NIBSS attributes RC91 to Moniepoint timeout — "no response from your end within the timeout period." Ecobank NUS nodes now showing the same pattern, consistent with Moniepoint-side processing latency rather than bank-specific issues.

## Banks Affected (documented)
| Bank | Product Stream | Status (as of Apr 13) | Notable |
|---|---|---|---|
| [[Stanbic Bank]] | ATS | Active — 20 cycles in 11 days | NIBSS attributes to Moniepoint timeout; SRE manual sweeps 4x daily |
| [[Ecobank]] | ATS (NUS) | Active — NIBSS escalation Apr 13 | First NIBSS-reported RC91 on NUS nodes; same timeout attribution |
| [[CoralPay]]-routed: PVB, FBN, SBP, ZIB | Switch | Problem Investigation (TDSD-6448) | Structural escalation; no fix commitment |
| [[Sterling Bank]] | ATS/Switch | Suspended (RC91) | [[CoralPay]] engaging for permanent fix |
| [[FCMB]] | ATS | Off (RC91/VPN disconnection) | TDSD-6478; first Jira ticket |
| [[Polaris Bank]] | Switch | Restored Apr 8 after 5-day suspension | RC21/RC91; VPN root cause |
| [[Access Bank]] | Multiple | Multiple failure modes concurrent | RC91 + ACS auth + Juliana 500 + RC96 |
| [[Wema Bank]] | ATS | 5 cycles accelerating frequency | No Jira tickets filed |
| [[Fidelity Bank]] | ATS | 2 cycles, bank emergency maintenance | No Jira tickets |
| [[Union Bank]] | ATS | Cycle Apr 12, resolved ~16min | TDSD-6519 |
| Keystone, UBA, Zenith, NIBSS | Various | Intermittent | Per-incident escalation only |

## Structural Assessment Gap
- [[Oladapo Onayemi]] was tasked with a multi-bank RC91 structural assessment due March 30
- No delivery signal appeared across 14+ days despite pattern reaching widest scope yet
- New commitment: Oladapo investigating Moniepoint processing latency to NIBSS node (due Apr 15) — specifically measuring latency spikes over Apr 3–12
- NIBSS (Moses Ajani) confirmed a VPN tunnel glitch as root cause for one incident and signalled openness to a "dedicated link" between NIBSS and TeamApt — potential structural remediation input
- SRE workaround for Stanbic: manual sweeps 4x daily (6:30/10:30/13:30/16:30 WAT) — contains but doesn't fix

## TMS Protocol Migration (Structural Fix — Separate Track)
Solomon Amadi committed to HTTP protocol migration for TMS on April 6: internal rollout April 7, BO piloting end of week, full rollout the following week. This addresses the HA Proxy readiness probe failures that produced RC68/RC91 — a different failure mode but the same symptom.

## CoralPay Problem Investigation
TDSD-6448 filed April 6 by Qazim Adedigba — first structural escalation in 3+ months. Three predecessor incident tickets superseded. CoralPay is the routing intermediary for PVB, FBN, SBP, and ZIB. No fix commitment or timeline from CoralPay visible as of April 10.

## Sources
- [[notes-2026-03-30]] — FCMB enters pattern; NIBSS VPN root cause confirmed
- [[notes-2026-04-01]] through [[notes-2026-04-10]] — daily progression
- [[weekly-digest-2026-03-30]] — week summary; structural assessment gap documented