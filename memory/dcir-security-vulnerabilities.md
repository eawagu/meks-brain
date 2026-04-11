---
title: DCIR Security Vulnerabilities
type:
  - "concept"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "concept"
summary: "A cluster of 5 CRITICAL security vulnerabilities discovered in TeamApt's DCIR/ACS/DirectDebit platform during an Access Bank audit, including default OAuth secrets, JWT tokens valid to 2037, and DsMockController auto-approving all 3DS in production."
---

## Overview
An Access Bank security audit of TeamApt's DCIR, ACS, and DirectDebit platform exposed 5 CRITICAL findings. [[Abdulgafar Obeitor]] committed to closing all vulnerabilities by April 8, 2026. Partial remediation has occurred but several items remain outstanding as of April 10.

## Findings (CRITICAL)
1. **Default OAuth secrets** on ACS/DCIR/DirectDebit — credentials using default value "secret"
2. **JWT tokens valid to 2037** — excessively long token lifetime; invalidation required
3. **DsMockController in production** — auto-approves all 3D Secure authentication; bypasses real 3DS validation
4. **Heapdump access forensic review obligation** — access to heapdumps may have exposed sensitive data; CBN/NDPR notification threshold may be triggered pending log review
5. **Parallex Bank auth error exposure on DCIR portal** (TDSD-6476, filed April 8) — error messages exposed in UI; additional finding beyond the original 5

## Remediation Timeline
| Date | Action |
|---|---|
| Apr 4 | Abdulgafar acknowledged vulnerability report; committed Apr 8 deadline |
| Apr 4 | Port 9041 whitelist requested (10.1.9.20) for remediation |
| Apr 5 | DCIR monitoring alerts escalating: 11.11% Apr 5, 22.22% Apr 6 vs thresholds |
| Apr 5–6 | ACS connector auth failure (TDSD-6439) — possibly early uncoordinated remediation breaking production 3DS |
| Apr 8 | TDSD-6477 filed (Access Bank JAR deployment, Authorize status) — first concrete delivery artifact; CTO sign-off required |
| Apr 8 | TDSD-6476 filed (Parallex auth error exposure) — new concurrent finding |
| Apr 9 | ACS connector replaced by Authentication Service routing via VPN (10.231.18.17:9559/9561) — eliminates internet-facing attack surface |

## Outstanding as of April 10
- DCIR/DirectDebit credential rotation (OAuth secrets)
- JWT token invalidation (all tokens valid to 2037)
- DsMockController removal from production
- TDSD-6477 CTO sign-off (Access Bank JAR deployment to production)
- TDSD-6476 INITIAL REVIEW (Parallex auth error exposure)
- CBN/NDPR notification decision pending log review of heapdump access

## Related Incidents
- TDSD-6439: ACS connector auth failure (Easter Sunday, 12h+ unresolved) — may have been caused by early uncoordinated remediation
- DCIR monitoring failure rate alerts: 11.11% → 22.22% → 20.59% across April 5–8

## Key People
- [[Abdulgafar Obeitor]] — remediation owner; committed April 8 deadline; filed TDSD-6477
- [[Babajide Ojoboorun]] — ACS connector replacement (VPN routing)
- [[Khadijat Musa]] — TDSD-6476 assigned
- [[Lateefat Adedeji-Oyedeji]] — BISO; security oversight
- [[Emeka Awagu]] — CTO sign-off required on TDSD-6477

## Sources
- [[notes-2026-04-05]] — 5 CRITICAL findings; April 8 deadline; port whitelist
- [[notes-2026-04-06]] — ACS auth failure; possible uncoordinated remediation; DCIR monitoring escalation
- [[notes-2026-04-08]] — TDSD-6477 filed; TDSD-6476 new finding
- [[notes-2026-04-10]] — ACS connector replaced; outstanding items listed
