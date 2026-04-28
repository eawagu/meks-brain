---
type:
  - "synthesis"
title: Bank Integration — RC91 Patterns, Failures, and Operational Posture
status: current
created: "2026-04-19T17:15:10Z"
summary: "Cross-cutting synthesis of Moniepoint's bank-integration layer — RC91 pattern across 14+ banks (30+ days), now decomposing into issuer-ATS vs processor-layer sub-classifications; Apr 28 surfaces 5-bank simultaneous route turn-off as highest-concentration coordination event; HabariPay entered pattern Apr 24 as new processor-layer member; attribution standoffs proliferating (Wema + Access DD bilateral carryforwards); Stanbic routing-restoration automation gap remains unaddressed despite Apr 14→28 escalations; refresh date 2026-04-28."
updated: "2026-04-28T12:02:23Z"
cssclasses:
  - "synthesis"
---

## Scope and Purpose

Moniepoint/[[TeamApt Limited]] operates integration surfaces into 14+ Nigerian banks across two primary product streams: the [[ATS]] (Automated Transfer System) for bank-to-bank transfers, and bank-facing Direct Debit / card rails running through [[NIBSS]], [[CoralPay]], and [[HabariPay]]. Since late March 2026, these integration surfaces have surfaced a sustained, multi-bank operational failure pattern centered on RC91 ("Issuer or Switch Inoperative") but extending into credential remediation, settlement disputes, protocol migration, and attribution standoffs with NIBSS and banks.

This synthesis consolidates the bank-integration layer across the documented incidents, attribution disputes, and structural fixes. **Last refresh: 2026-04-28.** Apr 19→Apr 28 evolution captured below in a dedicated section. For per-bank cycle-level detail, see the linked entity and situation pages; this synthesis is the cross-cutting view.

## The Integration Topology

Bank integration traffic at Moniepoint follows three routing paths:

1. **Direct bank integrations** — per-bank ATS routes, per-bank Direct Debit deployments, per-bank DCIR portals. Each direct path is owned by the bank's switching/application support team (e.g., FCMB Switch Application Support, Union Bank FEP Administration, UBA Channel Switching Services).
2. **NIBSS-routed paths** — transactions routed through NIBSS PTSA, PTSA NUS nodes, or NIBSS Direct Debit rails. NIBSS is the national settlement infrastructure operator.
3. **Third-party switch routing** — [[CoralPay]] (FirstBank, Providus, Unity, Zenith, Sterling), [[HabariPay]] (GTBank), and other switch-to-switch partners.

Each path has independent failure modes, separate escalation paths, and different attribution dynamics. The RC91 pattern cuts across all three.

## The RC91 Multi-Bank Pattern

### Scope and Duration

Sustained from late March 2026 through April 28, 2026 (30+ days). Spans 14+ banks across both Switch and ATS product streams. RC91 is not a single incident — it is a recurring symptom surfacing across a diverse set of bank-integration paths, with heterogeneous underlying causes.

### RCA Position (per Apr 19 triage)

Root cause attribution landed as **bank-side or CoralPay**. Mitigation applied: the entire CoralPay suite (ZIB, FBN, PVB, SBP — four banks) turned off as a business decision. Banks not on CoralPay routes are tracked either as bank-owned recurring patterns (Stanbic) or per-incident P1s.

### Failure-Profile Classification

The pattern is not uniform. Three distinct failure profiles have emerged:

| Profile | Duration Band | Examples | Interpretation |
|---|---|---|---|
| Fast-cycle | 4m–64m | Stanbic (30+ historical cycles), Fidelity Apr 27 (4m), HabariPay Apr 24 (25m), Apr 25 (7m) | Bank-side or intermediary transient; self-resolves |
| Intermediate | 1h–3h | Union Bank cycles, FCMB cycles | Longer restoration, bank engagement required |
| Scheduled maintenance | 7h+ | Stanbic Apr 19, Access Apr 19 | NOT cycles — planned bank maintenance windows that surfaced as automated P1s |
| Active P1 (extended) | 4h+ unresolved | Stanbic Apr 28 (4h30m+ at 09:30 WAT) | New profile — sustained active P1 into business hours |

The "scheduled maintenance" classification is critical: prior-day triage initially framed the Apr 19 00:00–07:50 WAT Stanbic+Access concurrence as a regime-change signal and common-mode wave. Two rounds of CTO correction established that both 7h+ windows were planned bank maintenance.

### Banks in the Pattern (current tracking state — Apr 28, 2026)

| Bank | Stream | Active State | Notable |
|---|---|---|---|
| [[Stanbic Bank]] | ATS | Active P1 (4h30m+ as of Apr 28 morning) | DR Failback exercise scheduled May 9, 2026 |
| [[Access Bank]] | ATS | Multi-track | See [[Access Bank — Multi-Track Failures]] — cycles 9/10/11 closed Apr 27 evening |
| [[Union Bank]] | ATS | Active | Apr 27 evening events: ~20m fast-cycle + server-access event (treated 9min) |
| [[NIBSS PTSA]] | Switch/routing | Active | Intermittent recurrence; TDSD-6737 NIBSS network failure closed Apr 27 |
| [[Fidelity Bank]] | ATS | Active | Apr 27 fast-cycle 4min (19:22–19:26 WAT) + bilateral cycle 18:35 WAT; TDSD-6753 + TDSD-6754 Apr 28 ATS/DD credentials INITIAL REVIEW |
| [[Ecobank]] | ATS (NUS) | Attribution standoff |  |
| [[FCMB]] | ATS | TDSD-6478 RC91 closed Apr 27 17:45 WAT |  |
| [[Wema Bank]] | ATS | Route turned off | TDSD-6736 Wema RC91 closed Apr 27 17:32 WAT; bilateral standoff carryforward to Apr 28 |
| [[UBA]] | ATS | Active |  |
| [[Sterling Bank]] | Switch | Turned off (CoralPay) | Part of overnight Apr 28 5-bank turn-off |
| [[Polaris Bank]] | Switch | Turned off | TDSD-6752 RC91 work-in-progress; turned off overnight Apr 28 |
| [[Keystone Bank]] | Card | Active | RC05 (NOT RC91) — card-layer fault, distinct |
| **[[HabariPay]]** | Switch (GTB) | **NEW pattern member as of Apr 24** | First-ever RC91 cycle Apr 24 18:30–18:55 WAT (25min), 2nd cycle Apr 25 02:06 WAT (~7min VPN flap with RC91 persists). Crosses 48h situation-creation threshold. **Processor-layer RC91 distinct from issuer-ATS RC91.** |
| **CoralPay-routed: ZIB cycles continue** | Switch | Cycle 4 closed Apr 27 23:44 WAT (TDSD-6751); 4-cycle process-gap on production deploy effectiveness |  |
| **Apr 28 morning: 5 banks off** | — | **Wema + Polaris + FBN + Providus + Sterling all simultaneously off** | **Highest route-off concentration in brain's recorded history** (per briefing-2026-04-28 B1) |

## Apr 19→Apr 28 Evolution (Refresh Section)

This section absorbs the 9 days of activity since the synthesis was originally written.

### New pattern members and surfaces

- **HabariPay (GTB switch route) entered the pattern Apr 24** — first-ever processor-layer RC91 cycle. Critically, this introduces a new sub-classification: **processor-layer RC91** (intermediary infrastructure failure, e.g., Habari, NIBSS PTSA) is distinct from **issuer ATS RC91** (bank's own switch nodes, e.g., Stanbic, Access, Wema). Both manifest as the same response code but require different RCAs and escalation paths. The Apr 25 cycle revealed that VPN-tunnel-flap was a *sub-event in an active failure window*, not the cause — an important fault-localization finding.
- **JULS Card Crisis Apr 23** — JULS ACCESS hit 68.18% card failure, JULS FCMB 25%. HabariPay (0.72%) and ISW (1.88%) held steady, confirming the fault line is JULS-specific, not industry-wide. Adds a new failure axis distinct from RC91: card-rail vs switch-route.
- **NIBSS Routing Anomaly Apr 17** — when NIBSS dropped to ~20% of normal, ISW absorbed 3.5M routing-redirected transactions. Pattern documents how routing absorbers behave under primary-rail collapse.

### Concentration risk surfaced Apr 28

The Apr 28 morning briefing flagged **5 simultaneous route turn-offs** (Wema + Polaris + FBN + Providus + Sterling) as the highest concentration in brain history. Combined with active Stanbic P1 (4h30m+) this is a coordination event, not a per-bank failure. The mitigation pattern (turn off CoralPay suite as RCA-driven business decision) has expanded — now operating across multiple parallel routes simultaneously.

### Attribution-standoff carryforwards

- **Wema bilateral standoff** — Hadiza Abubakar's Apr 26 20:30 WAT "transactions did not get to the bank" claim contradicts TeamApt's affirmative ATS-arrival evidence. Standoff persisted through Apr 27. Per briefing-2026-04-28 B2, ops-session-to-review path requested Apr 27 14:58 WAT produced no visible motion 18h+. CTO-direct escalation to Hadiza is the next-tier action.
- **Access DD bank silence** — Apr 26→Apr 28 silence on bilateral, ~47h+ at Apr 28 morning tick. CTO-direct to Innocent Nwaokorie / Mudiakevwe Omuvwie next-tier.

### Resolved RCA/closure cycles

Closures during the Apr 27 evening window (surfaced via Jira backfill after MCP auth recovery Apr 28):
- **TDSD-6751** Zenith(CoralPay) RC91 cycle 4 — closed 23:44 WAT Apr 27 (~7h40m e2e). Overturns prior framing in [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]] which had marked CoralPay cycles as having "no TDSD" — the Jira track exists. Process-gap on the production-deploy not preventing recurrence is now 3 cycles, not 4 (one cycle does have post-incident Jira closure).
- **TDSD-6736** Wema RC91 closed 17:32 WAT Apr 27
- **TDSD-6750** Access 3DS Auth RC 301 closed 21:51 WAT Apr 27 (fast-cycle, distinct from RC91 track)
- **TDSD-6478** FCMB RC91 closed 17:45 WAT Apr 27
- **TDSD-6737** NIBSS network failure closed 17:00 WAT Apr 27
- **TDSD-6756** Disbursement Downtime 20260428 closed 10:03 WAT Apr 28 — fresh-and-closed within 6 minutes of briefing tick

### Fidelity track additions (Apr 28)

Two new INITIAL REVIEW Jira filings on Fidelity track surfaced post-auth-recovery: **TDSD-6753** (Fidelity ATS user credentials update) and **TDSD-6754** (Fidelity DD funds transfer credentials update), both filed by [[Feyisayo Oyeniran]] Apr 28 09:00–09:20 WAT. Fidelity now has formal Jira tracking on both ATS and DD credential tracks with Feyisayo as track owner.

### DR Failback exercise on the calendar

Stanbic DR Failback exercise scheduled May 9, 2026 (per Babajide Odusanya email Apr 27 22:14 WAT CET). Continuation of Feb 21 DR fail-over thread; coordination lead on TeamApt side is [[Oladapo Onayemi]].

### What hasn't changed

- **Stanbic routing-restoration automation gap remains unaddressed.** Apr 28 morning briefing's hold-posture disposition (no CTO-direct on Stanbic) means the structural fix has *not* been pursued — operating cycle continues to absorb the cost. The leverage-path question is unchanged from Apr 19.
- **Attribution-evidence infrastructure** has not been built. Each new attribution standoff (Wema, Access DD, Ecobank historical) consumes engineering time on case-by-case investigation.
- **Per-bank integration maturity** still not tracked as a first-class metric.
- **Operational documentation discipline** still has no forcing function. Jira MCP went auth-failed for 16h17m on Apr 27→28 (auto-recovered) — visibility gap continues to recur.

## Attribution Dynamics

A defining characteristic of the pattern is the **attribution standoff** that recurs between parties:

### NIBSS ↔ Moniepoint

[[Moses Ajani]] (NIBSS PTSA Operations) has repeatedly attributed RC91 to Moniepoint-side timeout. Standoff is a stable pattern: NIBSS defaults to attributing to Moniepoint-side latency; Moniepoint counter-attributes to NIBSS or bank-side. Neither party concedes without engineering evidence.

### Bank ↔ Moniepoint

The same pattern recurs at bank level. [[Adewuyi Mayowa]] (Ecobank) responded to an Apr 17 escalation with "Everything looks fine from this end" — contested attribution, no resolution action. **New as of Apr 26-28: Wema and Access DD bilateral standoffs** — both have produced no engineering motion in 24h+ business windows; CTO-direct escalation to bank IT directors is the next-tier action both tracks now require.

### The Deciding Mechanism

Attribution standoffs are only resolved by engineering investigation producing dispositive evidence. The current process does this manually, per-incident; automated evidence generation does not exist systematically.

## The Stanbic Routing-Restoration Automation Gap

Documented 2026-04-14 via [[Oladapo Onayemi]] DM. Mechanism: during a bank CBA failure, Moniepoint routes card requests to the inactive bank node; when the bank recovers, Moniepoint's routing-config restoration process is **manual and slow**, so Moniepoint-side failures persist on terminals after the bank is actually back up.

The automation gap (automated detection of bank recovery + automated config restoration) is a **Primitive 4 (Systems)** responsibility of the [[Domestic Switching]] department. Business owner: [[Babatunde Okufi]] (CBDO, TeamApt; reports to [[Dennis Ajalie]]).

Oladapo has escalated to the Moniepoint team "severally" without a Moniepoint-side fix being prioritized. **As of Apr 28, the gap remains unaddressed.** Apr 28 briefing disposition is hold-posture (no CTO-direct on Stanbic); the structural fix is not on the path.

**Open leverage question:** which intra-group path lands this on the Domestic Switching backlog?
- Direct peer [[Emeka Awagu]] (CTO) → [[Babatunde Okufi]] (CBDO)
- Dotted-line via [[Felix Ike]] (Group CTO)
- Direct up through [[Dennis Ajalie]] (CEO, TeamApt)
- Business-owner pressure via [[Solomon Amadi]] (Payments Business owner, Moniepoint MFB — the bank-side customer)

## Concurrent Operational Tracks

The RC91 pattern does not exist in isolation. Several concurrent tracks interact with bank-integration health:

### DCIR/ACS/DD Credential Remediation

Following an [[Access Bank]] pen-test, 5 CRITICAL vulnerabilities were identified across [[DCIR]], ACS, and [[Direct Debit]] (see [[DCIR Security Vulnerabilities]]). [[Abdulgafar Obeitor]] committed to closing all by April 8, 2026; partial remediation completed.

**Bank-by-bank remediation state:**
- **UBA** — DCIR 2FA production deployment Apr 18–19 weekend
- **FCMB** — MFA enrollment for VPN access; ACS connector replacement
- **Access Bank** — pen-test closed Apr; JAR-scan re-opened Apr 17
- **Zenith** — CISO acknowledged
- **Fidelity** — Hashing-algorithm disable request (MD5/SHA-1 on server 10.20.1.98) under internal review by Emeka Joseph; Funds Transfer Credentials update awaiting Chidi Akinmoyewa confirmation; **TDSD-6753 + TDSD-6754 Apr 28 INITIAL REVIEW filings now formalize Jira tracking**

### Harness CI/CD Migration

TDSD-6479. CTO-approved Apr 12. MANCo confirmed 100% migration complete; pending CTO approval for P1 workloads. CBN AML flag applies.

### Settlement & Reconciliation

- Stanbic settlement validation thread
- Union Bank recurring settlement batch failures: weekend/holiday ₦20M limit, [[TDSD-6276]]
- Stanbic settlement account reconciliation engagement Apr 16
- NIBSS-flagged ATS timeout outstanding

### TMS Protocol Migration

Structural fix separate from RC91 but addresses a closely-adjacent failure mode (RC68/RC91 from HA Proxy readiness probe failures). [[Solomon Amadi]] committed Apr 6 to HTTP protocol migration.

## Operational Posture

### What the Current Operating Model Looks Like

- **Detection:** Automated P1 filing on RC91 threshold breach; Jira TDSD ticket creation; Slack #teamapt-tech-operations post; email escalation to bank Switch Support. Key ops filers: [[Afeez Kazeem]], [[Olamide Ajibulu]], [[Qazim Adedigba]], [[Frances Omelu]].
- **Engagement:** Bank-specific email to dedicated switching-support addresses. Typical loop: file → bank asks reconfirm → ops reconfirms or confirms resolved → TDSD closed or left open.
- **Escalation:** When bank engagement fails or attribution is contested, escalate to NIBSS (if NIBSS-routed), or to the bank's dedicated infrastructure contact.
- **Resolution:** Most cycles are bank-resolved self-healing (fast-cycle profile). Intermediate and long cycles require bank action. Attribution-contested cycles require engineering evidence to close.

### Posture Characteristics

1. **Reactive, not structural** — the playbook is file/engage/await resolution. Root cause investigation happens per-incident.
2. **Attribution-tolerant** — the team has normalized the NIBSS-vs-Moniepoint and bank-vs-Moniepoint attribution standoff.
3. **Jira-documentation-discipline gap** — 2026-04-15 [[Yasir Syed Ali]] raised this explicitly. **Reinforced Apr 27→28 by 16h17m Jira MCP auth-failed window** that prevented status verification on active situations.
4. **Forcing-function absence** — the Stanbic routing-restoration automation gap remains unaddressed despite multiple escalations across Apr 14–28. Behavioral remediation continues to fail; structural leverage has not been applied.

### Capacity Strain Signals

- Apr 28 morning: **5 simultaneous route turn-offs** (highest in brain history) + active Stanbic P1 (4h30m+)
- Concurrent Access Bank tracks (multi-stream)
- Duty Handover structure in use — overnight delegation window (23:00–06:00 WAT) defers Immediate-dispatch P1s to morning triage
- Jira MCP auth-failure recurrence pattern (briefing-2026-04-22 B-tier, briefing-2026-04-28 B3) — visibility infrastructure itself is intermittent

## Cross-Cutting Observations

### 1. RC91 is a Symptom Layer, Not a Failure Class

The 14+ banks participating in the pattern have heterogeneous underlying causes. **Apr 24 update: RC91 now decomposes further into issuer-ATS RC91 vs processor-layer RC91** — same response code, different RCA paths. Stanbic/Access/Wema fall into the issuer category; HabariPay/NIBSS PTSA fall into the processor category. Any "fix the RC91 pattern" initiative must decompose per-route AND per-layer.

### 2. The Fix Stack Is Multi-Layered

Structural fixes span four independent tracks:
- **Routing restoration automation** (Moniepoint, Domestic Switching) — addresses Stanbic-class persistence
- **CoralPay suite turn-off** (business decision, now extended to multi-bank simultaneous turn-offs) — addresses CoralPay-routed sub-pattern
- **DCIR/ACS/DD credential remediation** (security) — addresses audit findings
- **TMS HTTP migration** (Moniepoint infrastructure) — addresses HA Proxy readiness probe failure mode

Each fix moves an independent lever. None is a global RC91 fix.

### 3. Attribution Standoffs Are Structural

Between Moniepoint, NIBSS, and the banks, no party has unilateral ability to produce dispositive evidence. Apr 26→28 carryforwards (Wema bilateral, Access DD silence) confirm the structural pattern: ops-session-to-review paths produce no engineering motion within business-day windows.

### 4. Bank-Specific Integration Maturity Varies Significantly

Each bank integration is operationally distinct — common playbook breaks down per-bank.

## Implications for Leadership Action

1. **The Stanbic automation gap remains the highest-value single structural fix** — and remains unaddressed as of Apr 28. The Apr 28 hold-posture means another day of operational cost without the structural lever being pulled. Apr 19→Apr 28 confirms behavioral remediation is not converging.
2. **Multi-bank turn-off concentration is a new escalation surface** — 5-bank simultaneous turn-off (Apr 28) is a coordination event that warrants leadership-level visibility ([[Oladapo Onayemi]] for SRE, [[Frank Atashili]] / [[Dennis Ajalie]] for biz). Concentration risk is now a first-class signal.
3. **Attribution evidence infrastructure is a second-order investment** with compounding returns — Apr 26-28 added 2 more attribution standoffs (Wema, Access DD) consuming CTO-direct escalation bandwidth.
4. **Per-bank integration maturity needs visibility as a first-class metric.**
5. **Jira/MCP visibility infrastructure is itself fragile** — Apr 27→28 16h17m auth-failed window is a recurrence of the briefing-2026-04-22 pattern. Visibility infrastructure that requires manual re-authentication is a structural single-point-of-failure for incident triage.

## Key References

### Concept & Situation Pages
- [[RC91 Multi-Bank Failure Pattern]] — the core pattern page
- [[Stanbic Bank ATS — Persistent RC91 Pattern]]
- [[Access Bank — Multi-Track Failures]]
- [[Wema Bank — RC91 P1 Apr 17]]
- [[Sterling + Polaris — Routes Degraded]]
- [[CoralPay — FBN Turned Off, Production Deploy Did Not Prevent Recurrence]]
- [[NIBSS Routing Anomaly]]
- [[JULS Card Crisis]]
- [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]
- [[DCIR Security Vulnerabilities]]

### Entities
- Banks: [[Access Bank]], [[Stanbic Bank]], [[Fidelity Bank]], [[Ecobank]], [[UBA]], [[Wema Bank]], [[FCMB]], [[Union Bank]], [[Zenith Bank]], [[Sterling Bank]], [[Keystone Bank]], [[Polaris Bank]]
- Infrastructure: [[NIBSS]], [[CoralPay]], [[HabariPay]], [[ATS]], [[ISW]]
- People (ops): [[Oladapo Onayemi]], [[Afeez Kazeem]], [[Olamide Ajibulu]], [[Qazim Adedigba]], [[Yasir Syed Ali]], [[Frances Omelu]], [[Feyisayo Oyeniran]]
- People (counterparties): [[Moses Ajani]] (NIBSS), [[Adewuyi Mayowa]] (Ecobank), [[Hadiza Abubakar]] (Wema), [[Innocent Nwaokorie]] (Access), [[Babajide Odusanya]] (Stanbic)
- Leverage-path people: [[Babatunde Okufi]], [[Dennis Ajalie]], [[Felix Ike]], [[Solomon Amadi]], [[Emeka Awagu]]

### Concepts
- [[Domestic Switching]] — owning department for routing-restoration automation
- [[Direct Debit]] — the product rail running over NIBSS
- [[Harness]] — CI/CD migration target
- [[DCIR]] — platform under remediation
