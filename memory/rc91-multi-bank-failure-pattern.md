---
title: RC91 Multi-Bank Failure Pattern
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: A sustained multi-bank transaction failure pattern characterized by RC91 ("issuer or switch inoperative") errors across 13+ banks spanning both Switch and ATS product streams, with per-incident escalation failing to address root causes.
---

## Overview
RC91 ("Issuer or Switch Inoperative") failures have escalated from isolated per-bank incidents to a systemic pattern affecting 13+ banks across both TeamApt's Switch and ATS product streams. The pattern began clustering around March 30, 2026, persisted through Easter weekend, and remained active as of April 10. The per-incident bank escalation model has definitively failed to contain it — each bank resolves individual cycles while the underlying root cause remains unfixed.

## Pattern Characteristics
- **Scope**: 13+ banks; both Switch and ATS product streams
- **Duration**: Detected March 30, 2026; persistent through at least April 10, 2026 (11+ days)
- **Failure mechanism**: RC91 = issuer or switch reports itself as inoperative; often intermittent, cycling multiple times per bank per day
- **Intermediary exposure**: [[CoralPay]] routing (PVB, FBN, SBP, ZIB) is a common intermediary in cross-bank failures — escalated to Problem Investigation (TDSD-6448) April 6

## Banks Affected (documented)
| Bank | Product Stream | Status (as of Apr 10) | Notable |
|---|---|---|---|
| [[Stanbic Bank]] | ATS | Active — 15 cycles in 7 days | TDSD-6425 SLA breached; zero Jira activity since Apr 3 |
| [[CoralPay]]-routed: PVB, FBN, SBP, ZIB | Switch | Problem Investigation (TDSD-6448) | Structural escalation; no fix commitment |
| [[Sterling Bank]] | ATS/Switch | Suspended (RC91) | [[CoralPay]] engaging for permanent fix |
| [[FCMB]] | ATS | Off (RC91/VPN disconnection) | TDSD-6478; first Jira ticket |
| [[Polaris Bank]] | Switch | Restored Apr 8 after 5-day suspension | RC21/RC91; VPN root cause |
| [[Access Bank]] | Multiple | Multiple failure modes concurrent | RC91 + ACS auth + Juliana 500 + RC96 |
| Ecobank, Keystone, UBA, Union Bank, Zenith, NIBSS | Various | Intermittent | Per-incident escalation only |

## Structural Assessment Gap
- [[Oladapo Onayemi]] was tasked with a multi-bank RC91 structural assessment due March 30
- No delivery signal appeared across 11+ days despite pattern reaching widest scope yet
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
