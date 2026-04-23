---
role: cto-teamapt
type:
  - "situation"
title: NIBSS DD — Downtime P1 Apr 20
status: retired
created: "2026-04-20T05:23:14Z"
summary: "RETIRED 2026-04-23 ~12:09 WAT tick after TDSD-6630 Completed at 11:30:22 WAT by Kabir Yusuf without closure RCA comment — silent-recovery-without-RCA pattern exactly matches retired Apr 14 NIBSS DD precedent. Final comment silence 78h04m from 05:27 WAT Apr 20 to 11:30 WAT Apr 23. Briefing-2026-04-23 D2 retire-or-hold question answered by system-level closure; user's D2 disposition is now advisory only (retirement already stamped). Third NIBSS DD ticket in 9 days to silent-recover: Apr 14 (47h → retired), Apr 20 TDSD-6630 (78h → Completed by Kabir Yusuf, this retirement), Apr 22 TDSD-6683 (2h25m explicit close). Pattern: product closes tickets without RCA when bank-side resolves."
updated: "2026-04-23T11:16:48Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] Direct Debit downtime P1 raised via [[TDSD-6630]] at 2026-04-20 05:18 WAT by [[Frances Omelu]], Medium priority, Work in progress through Apr 20–Apr 23 morning. **Retired 2026-04-23 ~12:09 WAT tick after TDSD-6630 transitioned to Completed at 11:30:22 WAT by [[Kabir Yusuf]] (assignee) with no closure RCA comment.** Final comment silence: **78h04m** from 05:27 WAT Apr 20 to 11:30 WAT Apr 23. No commit from bank, no human-authored closure — implicit resolution via ticket state change.

**Exact structural parallel to retired Apr 14 NIBSS DD precedent.** The prior [[NIBSS DD — Pending Mandate P1 Active]] situation (filed 07:05 WAT Apr 14, retired 06:23 WAT Apr 16 after 47h silent-recovery-without-closure). TDSD-6630 replayed the same behavioral pattern at 78h. The third NIBSS DD cycle in this 9-day window — [[TDSD-6683]] Apr 22 P2, 2h25m, explicit Slack + Jira closure — is the outlier shape; the dominant NIBSS DD pattern on this product surface is close-without-RCA.

**Connectivity-layer hypothesis ruled out (briefing-2026-04-23 D2 basis).** [[NIBSS PTSA — VPN Flapping Apr 22]] leased-line transition held stable 10h47m overnight → 16h at retirement tick. Unchanged TDSD-6630 behavior post-transition confirmed ticket-specific silence, not connectivity-blocked silence. Retirement now crystallizes this conclusion: the DD-mandate-layer silent-recovery pattern is independent of the connectivity layer.

**User triage note.** briefing-2026-04-23 D2 retire-or-hold-or-redispatch three-option ask is **answered by the system at 11:30 WAT** — Kabir Yusuf closed the ticket. D2's disposition (when user triages) becomes advisory: the retirement has happened. If user selects option 3 (re-dispatch via Oladapo), that becomes an after-the-fact signal-chase rather than a pattern-breaker (the pattern already completed).

**What survives retirement (entity-page compounding).** The silent-recovery-without-RCA pattern on NIBSS DD now has 2 of 3 recent cycles (66%) matching. Compounds on [[NIBSS]] entity under the "NIBSS DD closes P1s without RCA" recurring observation. Feeds [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]]'s historic "silent recovery without human closure" concern.

## Sources
jira TDSD-6630 (reporter Frances Omelu, assignee Kabir Yusuf at closure; comments 4757564 05:23 WAT + 4757577 05:27 WAT Apr 20; Completed 11:30:22 WAT Apr 23 with zero closure comment); slack #teamapt-tech-operations NIBSS DD P2 thread 10:40-13:05 WAT Apr 22 (adjacent cycle); jira TDSD-6683 Completed 15:01 WAT Apr 22 (Apr 22 P2 formal close); slack #teamapt-tech-operations NIBSS PTSA thread 1776872974.244299 16:35-19:17 WAT Apr 22 (connectivity-layer observations); overnight Slack sweep 22:00 WAT Apr 22 → 06:10 WAT Apr 23 zero-PTSA-signals; briefing-2026-04-23 D2 (the surfaced retire-or-hold ask that was answered by system)

## Deltas
- 2026-04-20 05:18 WAT — TDSD-6630 filed by Frances Omelu during overnight delegation window.
- 2026-04-20 05:23 WAT — Frances Omelu internal comment on mandate count dynamics.
- 2026-04-20 05:27 WAT — Frances Omelu public comment: escalated to NIBSS. Comment-clock starts here.
- 2026-04-20 06:09 WAT — surfaced as B1 in briefing-2026-04-20.
- 2026-04-20 08:18 WAT — last any-update (metadata-only) before the long silent window.
- 2026-04-20 08:47 WAT — user overrode B1 triage: deferred to 2026-04-21 briefing, no action, no commitment.
- 2026-04-20 09:09–17:09 WAT — 4 ticks, silence compounded (~3h42m → ~11h42m comment silence). No re-dispatch (triage-deferred).
- 2026-04-21 — briefing-2026-04-21 never fired (structural gap, captured in briefing-2026-04-22 B5).
- 2026-04-22 06:45 WAT — briefing-2026-04-22 did not re-raise as Immediate (original triage-deferral still held).
- 2026-04-22 13:05 WAT — Apr 22 P2 cycle (TDSD-6683) resolved in-channel 2h25m (parallel but independent cycle).
- 2026-04-22 14:15–20:00 WAT — 4 ticks across retirement-bar oscillation (deferred ↔ reverted-to-hold) as NIBSS PTSA VPN flap cycles + leased-line transition unfolded. TDSD-6630 itself unchanged through the entire day.
- 2026-04-22 19:17 WAT — [[NIBSS PTSA — VPN Flapping Apr 22]] spawned separately to track connectivity-layer pattern.
- 2026-04-23 06:10 WAT — Briefing tick: retire-or-hold surfaced as briefing-2026-04-23 D2. Comment silence ~72h43m. Connectivity-layer hypothesis ruled out by overnight stability. Decision deferred to user-triage.
- 2026-04-23 11:30 WAT — **TDSD-6630 Completed by Kabir Yusuf (assignee).** No closure RCA comment. Comment silence at closure: 78h04m.
- 2026-04-23 ~12:09 WAT — **Retired.** System-level closure pre-empted user-triage decision on D2. Retirement now canonical; D2 user disposition records triage posture but does not change situation state. Factors: source=jira, ticket_completed_silent_recovery_without_rca, assignee_closure_kabir_yusuf, comment_silence_78h04m_at_close, exact_apr14_precedent_match, connectivity_layer_hypothesis_already_ruled_out_by_prior_tick, briefing_d2_structural_preempt.
