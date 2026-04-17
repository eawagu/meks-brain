---
role: cto-teamapt
type:
  - "situation"
title: Ecobank — RC91 on NUS Nodes
status: developing
created: "2026-04-13T02:15:48Z"
summary: "Day 4 of the pattern. Apr 16 21:04 WAT 'treat as urgent' cycle RESOLVED 22:01 WAT via Slack thread (1h7min after resurface). Calibration signal: 22:14 WAT tick dispatched a false-positive Immediate alert because email-only visibility missed the 22:01 Slack resolution (13-minute miss). No new signals since resolution (~7h silence at 06:09 WAT Apr 17)."
updated: "2026-04-17T08:38:10Z"
cssclasses:
  - "situation"
accountability: Technology Reliability and Security
---

[[NIBSS]] ([[Moses Ajani]], PTSA Operations) reported [[Ecobank]] card transactions routed to [[TeamApt / Moniepoint]] NUS nodes being declined with RC91. Email sent 03:04 WAT Apr 13 to [[Qazim Adedigba]], aptpaytechnicalsupport, [[Mustapha Ajibade]], [[Saheed Yusuf]], Innocent Nwaokorie, [[Daniel Armstrong]]. Attached: ECOB.xlsx with sample declined transactions.

This is the same NIBSS contact who attributed [[Stanbic Bank]] RC91 to Moniepoint timeout on Apr 12 ("no response from your end within the timeout period"). Ecobank being affected on NUS nodes with the same RC91 pattern strengthens the Moniepoint-side processing latency hypothesis. However, the [[Commitment — Stanbic RC91 Internal Processing Latency Investigation]] fulfilled Apr 15 with [[Oladapo Onayemi]]'s finding pointing to bank-side CBA instability + Moniepoint routing-restoration gap, so the NIBSS-timeout framing is now a contested frame rather than the working hypothesis.

**Apr 16 — new ATS RC91 cycle, escalation-then-resolution:** [[Olamide Ajibulu]] filed standard ATS RC91 at 18:54 WAT. Escalation ladder: gentle reminder 19:23 WAT, third follow-up 21:04 WAT with explicit *"failure still persists. Please treat this as urgent."* No Ecobank email response across the full thread. At **22:01 WAT** a Slack reply in the incident thread confirmed bank-resolved — approximately 1h7min after the 'urgent' email. Total cycle duration measured from 18:54 filing: ~3h7min. Concurrent Ecobank-side signals (monitoring portal 502 at 19:31 WAT, Core Banking maintenance inquiry at 20:32 WAT) were unacknowledged by email but implicitly cleared when transactions returned.

**22:14 WAT tick artifact (calibration signal):** The 22:14 WAT Apr 16 tick dispatched an Immediate alert to CTO on this same cycle — 13 minutes AFTER the 22:01 Slack resolution. Root cause: the tick checked only the email thread, which was still silent; it did not read the Slack incident thread where the resolution reply landed. This is a false-positive Immediate — structural visibility gap between email-escalation and Slack-resolution channels. The gap is noted today as an awareness signal and fed to the Improve phase for calibration (a `capture_note` MISS was not needed because the signal surfaced via this situation's delta line rather than a user-reported miss).

Part of the [[RC91 Multi-Bank Failure Pattern]] — now 14+ banks affected over 14+ days. If 48h silence holds (target: 22:01 WAT Apr 18), transition status to `stable`; earlier retire if the next Duty Handover confirms no Ecobank activity overnight.

## Sources
Email, 03:04 WAT Apr 13, Moses Ajani via aptpaytechnicalsupport; email Olamide Ajibulu → Ecobank thread (18:54, 19:23, 21:04 WAT Apr 16); email Olamide Ajibulu → Ecobank, 19:31 WAT Apr 16 (portal 502); email Olamide Ajibulu → AllENG-ITServicedesk, 20:32 WAT Apr 16 (maintenance inquiry); slack #teamapt-tech-operations Apr 16 22:01 WAT (resolution reply in the P1 thread)

## Deltas
- [2026-04-13 03:04 WAT] — NIBSS reports Ecobank card transactions on NUS nodes declined with RC91; requests investigation.
- [2026-04-16 18:54 WAT] — New ATS RC91 cycle filed by Olamide Ajibulu. Intermittent failures. Follow-up at 19:23 WAT, no response.
- [2026-04-16 19:31 WAT] — Ecobank monitoring portal down (502). Infrastructure instability concurrent with active RC91.
- [2026-04-16 20:32 WAT] — Olamide emails Ecobank AllENG-ITServicedesk asking for confirmation that Ecobank Core Banking planned maintenance has completed. No response.
- [2026-04-16 21:04 WAT] — Olamide's third follow-up on the RC91 thread: "failure still persists. Please treat this as urgent." Incident now 2h10min unresolved with zero Ecobank email response across the full thread. Immediate alert dispatched to CTO at 22:14 WAT tick.
- [2026-04-16 22:01 WAT] — RESOLVED via Slack reply in the P1 incident thread (bank-resolved). ~1h7min after the 'urgent' email; ~3h7min total from 18:54 filing. Email thread never explicitly closed.
- [2026-04-17 06:09 WAT] — Tick calibration note: the 22:14 WAT Apr 16 Immediate dispatch was a false-positive (fired 13 minutes after the 22:01 Slack resolution because the email-only visibility path missed the Slack close). ~7h silence on this cycle since resolution. No new signals overnight. Status kept `developing` pending 48h silence verification.