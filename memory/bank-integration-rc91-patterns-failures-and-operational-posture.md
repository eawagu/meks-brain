---
title: Bank Integration — RC91 Patterns, Failures, and Operational Posture
type:
  - "synthesis"
cssclasses:
  - "synthesis"
status: current
created: "2026-04-19T17:15:10Z"
updated: "2026-04-19T17:15:10Z"
summary: "Cross-cutting synthesis of Moniepoint's bank-integration layer — RC91 pattern across 14+ banks (20+ days), three distinct failure profiles (fast-cycle / intermediate / scheduled maintenance), attribution dynamics between Moniepoint/NIBSS/banks, the Stanbic routing-restoration automation gap as highest-value single fix, and implications for leadership action on the Domestic Switching backlog."
---

## Scope and Purpose

Moniepoint/[[TeamApt Limited]] operates integration surfaces into 14+ Nigerian banks across two primary product streams: the [[ATS]] (Automated Transfer System) for bank-to-bank transfers, and bank-facing Direct Debit / card rails running through [[NIBSS]], [[CoralPay]], and [[HabariPay]]. Since late March 2026, these integration surfaces have surfaced a sustained, multi-bank operational failure pattern centered on RC91 ("Issuer or Switch Inoperative") but extending into credential remediation, settlement disputes, protocol migration, and attribution standoffs with NIBSS and banks.

This synthesis consolidates the bank-integration layer across the documented incidents, attribution disputes, and structural fixes. Scope: Apr 2026 snapshot. For per-bank cycle-level detail, see the linked entity and situation pages; this synthesis is the cross-cutting view.

## The Integration Topology

Bank integration traffic at Moniepoint follows three routing paths:

1. **Direct bank integrations** — per-bank ATS routes, per-bank Direct Debit deployments, per-bank DCIR portals. Each direct path is owned by the bank's switching/application support team (e.g., FCMB Switch Application Support, Union Bank FEP Administration, UBA Channel Switching Services).
2. **NIBSS-routed paths** — transactions routed through NIBSS PTSA, PTSA NUS nodes, or NIBSS Direct Debit rails. NIBSS is the national settlement infrastructure operator.
3. **Third-party switch routing** — [[CoralPay]] (FirstBank, Providus, Unity, Zenith, Sterling), [[HabariPay]] (GTBank), and other switch-to-switch partners.

Each path has independent failure modes, separate escalation paths, and different attribution dynamics. The RC91 pattern cuts across all three.

## The RC91 Multi-Bank Pattern

### Scope and Duration

Sustained from March 30, 2026 through April 19, 2026 (20+ days). Spans 14+ banks across both Switch and ATS product streams. RC91 is not a single incident — it is a recurring symptom surfacing across a diverse set of bank-integration paths, with heterogeneous underlying causes.

### Resolved RCA (per triage Apr 19)

Root cause attribution landed as **bank-side or CoralPay**. Mitigation applied: the entire CoralPay suite (ZIB, FBN, PVB, SBP — four banks) turned off as a business decision. Banks not on CoralPay routes are tracked either as bank-owned recurring patterns (Stanbic) or per-incident P1s (Union Bank, Fidelity, NIBSS PTSA, Ecobank, FCMB, Wema, UBA).

### Failure-Profile Classification

The pattern is not uniform. Three distinct failure profiles have emerged:

| Profile | Duration Band | Examples | Interpretation |
|---|---|---|---|
| Fast-cycle | 4m–64m | Stanbic (historical 30 cycles), Fidelity Apr 19 (14m), NIBSS PTSA Apr 19 (15m), Wema cycle 7 (~4m), UBA Apr 18 (3m) | Bank-side or intermediary transient; self-resolves |
| Intermediate | 1h–3h | Union Bank Apr 19 (2h10m), FCMB Apr 16 (43m + recurrence) | Longer restoration, bank engagement required |
| Scheduled maintenance | 7h+ | Stanbic Apr 19 (7h3m), Access Apr 19 (7h50m) | NOT cycles — planned bank maintenance windows that surfaced as automated P1s |

The "scheduled maintenance" classification is critical: prior-day triage initially framed the Apr 19 00:00–07:50 WAT Stanbic+Access concurrence as a regime-change signal and common-mode wave. Two rounds of CTO correction established that both 7h+ windows were planned bank maintenance. TDSD-6624 (Stanbic) and TDSD-6625 (Access) are automated P1s raised against maintenance, not cycle records. The common-mode-wave hypothesis is withdrawn.

### Banks in the Pattern (current tracking state)

| Bank | Stream | Active State | Cycles (scope) | Notable |
|---|---|---|---|---|
| [[Stanbic Bank]] | ATS | Bank-handling recurring pattern | 30 genuine cycles Apr 3–18 | Bank owns resolution; no CTO action; Apr 19 was maintenance |
| [[Access Bank]] | ATS | Active multi-track | 7 RC91 cycles Apr 10–18; 8 concurrent tracks | Apr 19 was maintenance; see [[Access Bank — Multi-Track Failures]] |
| [[Union Bank]] | ATS | Active | 5 cycles in 8 days (Apr 12, 15, 16×2, 19) | Apr 19 first-ever overnight-wave participant (2h10m) |
| [[NIBSS PTSA]] | Switch/routing | Active | Re-surfaced Apr 19 (15m) after retirement | TDSD-6597 Apr 17 31h18m, closed by Afeez Kazeem |
| [[Fidelity Bank]] | ATS | Active | Cycle 5 Apr 19 (14m) after 3.5-day quiet | Fast-cycle profile |
| [[Ecobank]] | ATS (NUS) | Attribution standoff | TDSD-6619 Apr 18 | First NIBSS-reported RC91 on NUS nodes |
| [[FCMB]] | ATS | Active | Apr 16 cycle recurred; TDSD-6613 Apr 17 P1 | First FCMB P1 of watch window; DCIR portal also re-failing |
| [[Wema Bank]] | ATS | Active | 7 cycles Apr 8–17 | Cycle 7 Apr 17 bank-confirmed in 4 min; DCIR at 25–27% failure band |
| [[UBA]] | ATS | Active | 4 cycles in 4.5h Apr 14 + Apr 16, 18 | 36h intermittent degradation period; DCIR 2FA deployed weekend Apr 18–19 |
| [[Sterling Bank]] | ATS/Switch | Suspended | — | Reclassified into CoralPay suite Apr 18 |
| [[Polaris Bank]] | Switch | Restored | — | 5-day suspension; VPN root cause; restored Apr 8 |
| [[Keystone Bank]] | Card | Active | Apr 17 21:38 WAT P1 | RC05, NOT RC91 — card-layer fault; distinct failure mode |
| CoralPay-routed: PVB, FBN, SBP, ZIB | Switch | Turned off | — | Business decision per RCA mitigation |

## Attribution Dynamics

A defining characteristic of the pattern is the **attribution standoff** that recurs between parties:

### NIBSS ↔ Moniepoint

[[Moses Ajani]] (NIBSS PTSA Operations) has repeatedly attributed RC91 to Moniepoint-side timeout: "no response from your end within the timeout period" (Apr 12, Stanbic context). On Apr 15, for the 09:49–09:53 WAT NIBSS PTSA RC91 window, Moses Ajani issued an explicit denial of service degradation on NIBSS's side, claiming transactions processed successfully on TeamApt terminals during the same window. [[Olamide Ajibulu]]'s counter-position was that NIBSS was unavailable and transactions did not reach their interchange.

The standoff is now a stable pattern: NIBSS defaults to attributing to Moniepoint-side latency; Moniepoint counter-attributes to NIBSS or bank-side. Neither party concedes without engineering evidence.

### Bank ↔ Moniepoint

The same pattern recurs at bank level. [[Adewuyi Mayowa]] (Ecobank) responded to an Apr 17 escalation with "Everything looks fine from this end" — contested attribution, no resolution action. The Apr 19 17:09 WAT tick broke Ecobank bank silence: Adewuyi requested re-confirmation and samples ~24h after first direct-to-bank contact. The CTO-direct-action case materially weakened; Monday reframed as a sample-response cycle with Adewuyi as engagement surface, not escalation surface.

### The Deciding Mechanism

Attribution standoffs are only resolved by engineering investigation producing dispositive evidence. [[Oladapo Onayemi]] was the Moniepoint SRE lead coordinating NIBSS counterparty engagement; his commitment on RC91 RCA was the tracked deciding mechanism. The RCA concluded bank-side or CoralPay — a resolution that partially validates both positions (banks and CoralPay are in scope; a pure Moniepoint-latency explanation is not).

## The Stanbic Routing-Restoration Automation Gap

Documented 2026-04-14 via [[Oladapo Onayemi]] DM. Mechanism: during a bank CBA failure, Moniepoint routes card requests to the inactive bank node; when the bank recovers, Moniepoint's routing-config restoration process is **manual and slow**, so Moniepoint-side failures persist on terminals after the bank is actually back up.

The automation gap (automated detection of bank recovery + automated config restoration) is a **Primitive 4 (Systems)** responsibility of the [[Domestic Switching]] department. Business owner: [[Babatunde Okufi]] (CBDO, TeamApt; reports to [[Dennis Ajalie]]).

Oladapo has escalated to the Moniepoint team "severally" without a Moniepoint-side fix being prioritized. The automation gap directly explains why bank-resolved RC91 cycles continue to show Moniepoint-side impact beyond bank recovery.

**Open leverage question:** which intra-group path lands this on the Domestic Switching backlog?
- Direct peer [[Emeka Awagu]] (CTO) → [[Babatunde Okufi]] (CBDO)
- Dotted-line via [[Felix Ike]] (Group CTO)
- Direct up through [[Dennis Ajalie]] (CEO, TeamApt)
- Business-owner pressure via [[Solomon Amadi]] (Payments Business owner, Moniepoint MFB — the bank-side customer)

## Concurrent Operational Tracks

The RC91 pattern does not exist in isolation. Several concurrent tracks interact with bank-integration health:

### DCIR/ACS/DD Credential Remediation

Following an [[Access Bank]] pen-test, 5 CRITICAL vulnerabilities were identified across [[DCIR]], ACS, and [[Direct Debit]] (see [[DCIR Security Vulnerabilities]]): default OAuth secrets, JWT tokens valid to 2037, DsMockController auto-approving all 3DS in production, plus two more. [[Abdulgafar Obeitor]] committed to closing all by April 8, 2026; partial remediation completed, residual items outstanding Apr 10.

**Bank-by-bank remediation state (Apr 2026):**
- **UBA** — DCIR 2FA production deployment approved, implemented Apr 18–19 weekend
- **FCMB** — MFA enrollment for VPN access confirmed; ACS connector replacement in progress; DCIR portal track RE-FAILED Apr 19 (1h27m apparent recovery collapsed)
- **Access Bank** — pen-test closed Apr; JAR-scan re-opened Apr 17
- **Zenith** — CISO acknowledged

DCIR failure rate (Wema route) trajectory Apr 15–17: 40.65% → 20.4% → 66.0% → stabilized at 25–27% band. Remediation has not stabilized this route below the 25% floor.

### Harness CI/CD Migration

TDSD-6479. CTO-approved Apr 12. DCIR and related services migrating to [[Harness]] for standardized deployment governance. MANCo confirmed 100% migration complete; pending CTO approval for P1 workloads. CBN AML flag applies.

### Settlement & Reconciliation

- Stanbic settlement validation thread (Apr 11+): DCIR migration confirmed by Emeka Joseph; Stanbic requesting failed transaction list citing CBN timeline pressure
- Union Bank recurring settlement batch failures: weekend/holiday ₦20M limit, [[TDSD-6276]]
- Stanbic settlement account reconciliation thread Apr 16 (Stanbic reconciliation unit engagement)
- NIBSS-flagged ATS timeout outstanding

### TMS Protocol Migration

Structural fix separate from RC91 but addresses a closely-adjacent failure mode (RC68/RC91 from HA Proxy readiness probe failures). [[Solomon Amadi]] committed Apr 6 to HTTP protocol migration: internal rollout Apr 7, BO piloting end of week, full rollout following week.

## Operational Posture

### What the Current Operating Model Looks Like

- **Detection:** Automated P1 filing on RC91 threshold breach; Jira TDSD ticket creation; Slack #teamapt-tech-operations post; email escalation to bank Switch Support. Key ops filers: [[Afeez Kazeem]], [[Olamide Ajibulu]], [[Qazim Adedigba]].
- **Engagement:** Bank-specific email to dedicated switching-support addresses. Typical loop: file → bank asks reconfirm → ops reconfirms or confirms resolved → TDSD closed or left open.
- **Escalation:** When bank engagement fails or attribution is contested, escalate to NIBSS (if NIBSS-routed), or to the bank's dedicated infrastructure contact (e.g., Victor Iyama for Union Bank).
- **Resolution:** Most cycles are bank-resolved self-healing (fast-cycle profile). Intermediate and long cycles require bank action. Attribution-contested cycles require engineering evidence to close.

### Posture Characteristics

1. **Reactive, not structural** — the playbook is file/engage/await resolution. Root cause investigation happens per-incident, not via sustained bank-relationship engineering.
2. **Attribution-tolerant** — the team has normalized the NIBSS-vs-Moniepoint and bank-vs-Moniepoint attribution standoff. Multiple cycles close without clear attribution.
3. **Jira-documentation-discipline gap** — 2026-04-15 [[Yasir Syed Ali]] raised this explicitly: important information (Moniepoint settlement account update, Union Bank / HabariPay details) was not being captured in tickets. This is the second independent data point in one week that TeamApt's incident/operational documentation discipline is a structural gap, not a one-off.
4. **Forcing-function absence** — the Stanbic routing-restoration automation gap has been known internally but has not made it onto the Domestic Switching backlog despite multiple escalations. Behavioral remediation has failed; structural leverage has not been applied.

### Capacity Strain Signals

- Concurrent Access Bank tracks (7–8 active streams on a single bank in Apr 2026)
- 4-bank simultaneous RC91 on Apr 16 (FCMB, Stanbic, Union, UBA in the same morning window)
- Jira blind Day 5 (Apr 16 tick observation): filed tickets visible only via email notifications
- Duty Handover structure in use — overnight delegation window (23:00–06:00 WAT) defers Immediate-dispatch P1s to morning triage

## Cross-Cutting Observations

### 1. RC91 is a Symptom Layer, Not a Failure Class

The 14+ banks participating in the pattern have heterogeneous underlying causes. Stanbic is self-recurring and bank-owned. CoralPay-routed banks share an intermediary. Ecobank surfaces via NIBSS NUS nodes. Fidelity runs fast-cycle. Union varies mid-spectrum. Grouping these under "RC91 pattern" is correct for observability (the symptom is shared) but incorrect for remediation (the root causes differ). Any "fix the RC91 pattern" initiative must decompose per-route.

### 2. The Fix Stack Is Multi-Layered

Structural fixes span four independent tracks:
- **Routing restoration automation** (Moniepoint, Domestic Switching) — addresses the Stanbic-class persistence
- **CoralPay suite turn-off** (business decision) — addresses the CoralPay-routed sub-pattern
- **DCIR/ACS/DD credential remediation** (security) — addresses audit findings on the DCIR route
- **TMS HTTP migration** (Moniepoint infrastructure) — addresses HA Proxy readiness probe failure mode

Each fix moves an independent lever. None is a global RC91 fix.

### 3. Attribution Standoffs Are Structural

Between Moniepoint, NIBSS, and the banks, no party has unilateral ability to produce dispositive evidence. NIBSS and banks have their own monitoring that shows their side operational; Moniepoint's monitoring shows RC91. Closing an attribution standoff requires either (a) cross-party engineering investigation (as happened with the Oladapo RCA) or (b) automated evidence generation (transaction samples, timing traces) at the point of escalation. The current process does (a) manually; (b) does not exist systematically.

### 4. Bank-Specific Integration Maturity Varies Significantly

Direct to Bank VPN setup: delayed for UBA. Cosmos blocker pending for Union Bank DD. Ecobank Direct to Bank SLA signature pending. Access Bank resistant to cloud infrastructure setup. FCMB MFA enrollment per-route per-security-review. Each bank integration is operationally distinct — common playbook breaks down per-bank.

## Implications for Leadership Action

1. **The Stanbic automation gap is the highest-value single structural fix** — it directly resolves the largest single contributor to RC91-pattern persistence (Stanbic's 30 cycles, plus the analogous mechanism operating on any bank-recovery event). It is known, bounded, and has an identified owner. The missing element is forcing-function placement.
2. **Attribution evidence infrastructure is a second-order investment** — building automated transaction-sample and timing-trace generation into the escalation flow would collapse the attribution-standoff loop that currently consumes operations time per cycle.
3. **Per-bank integration maturity needs visibility as a first-class metric** — tracking VPN status, SLA signature, deployment pipeline completeness, and credential remediation state per bank would surface the integration-maturity gradient that currently manifests as per-incident surprise.
4. **Operational documentation discipline needs a forcing function** — the Jira-ticket-capture gap (Yasir's signal) and the 3-day entity-page staleness cohort both point to the same structural issue: write-through updates from incident work to knowledge assets don't happen reliably. This is a capacity-and-process problem that compounds over time.

## Key References

### Concept & Situation Pages
- [[RC91 Multi-Bank Failure Pattern]] — the core pattern page
- [[Stanbic Bank ATS — Persistent RC91 Pattern]] — 30-cycle bank-owned track
- [[Access Bank — Multi-Track Failures]] — 8-concurrent-track entity
- [[Union Bank — RC91 P1 Apr 19]] — overnight-wave situation
- [[Ecobank — RC91 on NUS Nodes]] — attribution standoff
- [[FCMB — RC91 P1 Apr 17]] — first FCMB P1 of watch window
- [[NIBSS PTSA — Intermittent RC91 Apr 17]] — retired Apr 18
- [[NIBSS PTSA — RC91 Apr 19]] — re-surfaced
- [[Fidelity Bank ATS — RC91 Failure Ongoing]] — fast-cycle profile
- [[Wema Bank — RC91 After Settlement Resolution]]
- [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]]
- [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]
- [[DCIR Security Vulnerabilities]]

### Entities
- Banks: [[Access Bank]], [[Stanbic Bank]], [[Fidelity Bank]], [[Ecobank]], [[UBA]], [[Wema Bank]], [[FCMB]], [[Union Bank]], [[Zenith Bank]], [[Sterling Bank]], [[Keystone Bank]], [[Polaris Bank]]
- Infrastructure: [[NIBSS]], [[CoralPay]], [[HabariPay]], [[ATS]]
- People (ops): [[Oladapo Onayemi]], [[Afeez Kazeem]], [[Olamide Ajibulu]], [[Qazim Adedigba]], [[Yasir Syed Ali]]
- People (counterparties): [[Moses Ajani]] (NIBSS), [[Adewuyi Mayowa]] (Ecobank), Victor Iyama (Union Bank)
- Leverage-path people: [[Babatunde Okufi]], [[Dennis Ajalie]], [[Felix Ike]], [[Solomon Amadi]], [[Emeka Awagu]]

### Concepts
- [[Domestic Switching]] — owning department for routing-restoration automation
- [[Direct Debit]] — the product rail running over NIBSS
- [[Harness]] — CI/CD migration target
- [[DCIR]] — platform under remediation
- [[TeamApt Incident Remediation]] — structural-fix concept
