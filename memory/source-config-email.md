---
type:
  - "source-config"
title: source-config-email
created: 2026-04-11
summary: "Gmail signal-source configuration: Layer 1 To:me always surface, Layer 2 keyword filtering; last_processed 2026-04-20T10:09:00Z. 11:09 WAT Full tick: narrow per-keyword query approach VALIDATED (token-budget workaround from 10:09 limitation note works for most queries). Layer 1 To:me surfaced 10 threads — zero operational incidents; two CTO-approval candidates accumulating (TISD-480 ArgoCD CVE, TDSD-6203 ISO Managers re-approval). Bank-name issuer query still oversized — deferred to sub-bucketing."
updated: "2026-04-20T10:17:46Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-20T10:09:00Z"
---

## Connection

Gmail MCP. Profile: eawagu@gmail.com.

## Directives

### Priority model
- **Layer 1 — Always surface:** messages where the user is in To: (not only CC/BCC). No keyword gate.
- **Layer 2 — Keyword surface:** any recipient field matching primary keywords below.

### Keyword rules (Layer 2)
- Operational: RC91, RC05, P1, outage, CBN, NIBSS, PTSA, CoralPay, NUS.
- Issuer names: Stanbic, Ecobank, Sterling, Polaris, Wema, FCMB, Keystone, Access, UBA, Fidelity, Union.
- Governance: board, audit, PCI, compliance, regulator.
- Process: duty handover, weekly status report, RCA.

### Skip rules
- Marketing/newsletter senders — skip.
- Automated status emails without operational keywords — discard unless matches active-situation entity.

### Query execution pattern (post 10:09 limitation note)
Use narrow per-keyword buckets with `newer_than:Nh` to stay inside Gmail MCP token budget:
- Layer 1 pass: `to:me newer_than:Nh`.
- Operational keywords pass: `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:Nh`.
- Governance/process pass: group tight synonyms only.
- Issuer bucket (Stanbic/Ecobank/Sterling/Polaris/Wema/FCMB/Keystone/Access/UBA/Fidelity/Union) still exceeds budget when OR'd together — split into sub-buckets (3–4 issuers per query) when needed, or scope by active-situation entity (e.g., `(Ecobank OR "Adewuyi Mayowa") newer_than:1d`).

### Known limitation — Gmail MCP response size (captured 2026-04-20 10:09 WAT, validated 11:09 WAT)
Gmail `search_threads` returns full-thread bodies that exceed context-window budget on broad queries (`newer_than:1d` returned 335k chars; 11-issuer OR-query returned 139k chars). Narrow per-keyword queries with `pageSize:10-15` stay within budget reliably. Per-tick heartbeat should default to the execution pattern above. Fallback options remaining for future revision: (a) switch to `get_thread` on metadata-only snippets from smaller `list_threads`-style pagination, (b) delegate to sub-agent for filtered-content projection on oversized queries.

## Notes

Tick 2026-04-20 11:09 WAT Full-level. **Narrow per-keyword approach validated.** Executed four narrow queries in parallel:

- **Layer 1 `to:me newer_than:2h`** → 10 threads returned:
  - 10:06 WAT — Chris Purkis (Moniepoint) "Updated invitation: Blocker: Head of Engineering (VP+) Slots @ Fri Apr 24 11am-12pm WAT" — 4-day-out interview slot. Awareness.
  - 09:47 WAT — gemini-notes@google.com "Notes: Cards and Account: All Hands Apr 20, 2026" — Gemini transcript produced. Route to ingress when Drive auth restored.
  - 09:43 WAT — Chris Purkis "Invitation: Blocker - Head of Engineering @ Thu Apr 23 3:30pm-4:30pm WAT" — 3-day-out interview slot. Awareness.
  - 09:31 WAT — jira@teamapt.atlassian.net "TISD-480 TeamApt Infrastructure Service Desk" — **CTO approval request** for ArgoCD CVE remediation. Briefing-tier Decision candidate.
  - 09:18 WAT — jira@teamapt.atlassian.net "TDSD-6203 TeamApt-Service-Desk" — **second approval request** (first was 2026-03-23); ISO Managers change. Briefing-tier Decision candidate.
  - 09:31 WAT — Microsoft Teams notification from Precious Okiemen (Teams @mention for integration checklist) — awareness, no action.
  - 09:11 WAT — gemini-notes@google.com "Notes: Direct to Bank Daily stand up Apr 20" — Gemini transcript. Route to ingress when Drive auth restored.
  - 09:08 WAT — notifications@app.bamboohr.com "Time Off Requested: Ravi Kiran Veluguleti" — HR approval pending. Awareness.
  - 08:44 WAT — Tracy Ojaigho "Invitation: Cards Team Str, Systems & Roadmap @ Tue Apr 21 1pm-2pm WAT" — next-day meeting invite. Awareness (priority signal #2 fires but carries light weight given Tuesday not today).
  - 08:18 WAT — Glory Alioha "Re: TSA Integration to NIBSS on Collections" — routine project comms, awareness.

- **Operational keywords `(RC91 OR RC05 OR P1 OR outage OR NIBSS OR compromised) newer_than:2h`** → 1 thread: TSA Integration to NIBSS 08:18 WAT (same as Layer 1 entry above — routine project comms, not incident). Zero operational incidents in past 2h.

- **Bank-name bucket `(Stanbic OR Ecobank OR Sterling OR Polaris OR Wema OR FCMB OR Keystone OR Access OR UBA OR Fidelity OR Union) newer_than:2h`** → EXCEEDED token budget (139,516 chars). Sub-bucketing required for exhaustive issuer sweep. Confidence on issuer-thread delta carried via TDSD sweep which showed all known active issuer tracks account for (Union TDSD-6632 completed 09:47 WAT; Keystone TDSD-6633/6615 INITIAL REVIEW carryforward; Monnify TDSD-6637 review comment).

- **Ecobank narrow `(Ecobank OR "Adewuyi Mayowa") newer_than:1d`** → Apr 19 thread last activity 17:31 WAT (Afeez Kazeem follow-up). No new messages in past ~17h. Wait-state carries forward unchanged. Mayowa silent since 15:29 WAT Apr 19; 24h response heuristic hits 17:24 WAT today (~6h15m from tick).

Two CTO-approval candidates accumulating for next briefing tick (2026-04-21 06:00 WAT):
1. **TISD-480** ArgoCD CVE remediation — Fri Apr 17 window MISSED, needs replan.
2. **TDSD-6203** ISO Managers change — 34-day pending, 2nd approval email.

No Immediate triggers this tick. TDSD-6630 NIBSS DD user-deferred to Apr 21 (no re-dispatch).
