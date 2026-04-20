---
title: Union Bank — RC91 P1 Apr 20
type:
  - "situation"
cssclasses:
  - "situation"
status: developing
accountability: operational-reliability
role: cto-teamapt
created: "2026-04-20T06:17:08Z"
updated: "2026-04-20T06:17:08Z"
summary: "New Union Bank RC91 cycle filed 01:17 WAT Apr 20 via email by Olamide Ajibulu — 3 TeamApt outreach messages (01:17, 01:51, 06:53 WAT), bank silent throughout. 5h52m active at 07:09 WAT Skim tick; exceeds typical 14m–2h10m envelope. 6th Union Bank cycle in 9 days. MISSED by 06:09 briefing sweep; surfaced at 07:09 WAT."
---

[[Union Bank]] RC91 cycle opened 01:17 WAT Apr 20 via email from [[Olamide Ajibulu]] to Union Bank (itechannels@unionbankng.com; CC aptpaytechnicalsupport@teamapt.com) with subject "Union Bank| RC91 | 20260420": *"Please be informed that Union Bank transactions are failing with RC 91. Kindly investigate this issue."* Filing occurred during the overnight delegation window (23:00–06:00 WAT), so Immediate-tier dispatch is deferred to the first in-window tick per config-heartbeat rule.

**3 TeamApt outreach messages, zero bank response:**
1. 01:17 WAT — Olamide initial filing to itechannels@unionbankng.com
2. 01:51 WAT — Olamide "Gentle reminder"
3. 06:53 WAT — Olamide "Please share an update"

At 07:09 WAT (Skim tick), cycle is **5h52m active** with zero bank response across 3 outreach messages. No TDSD ticket filed — email-only track, same pattern as Stanbic Bank. Thread ID: 19da83fdefd2e946.

**Anomaly framing.** [[Union Bank]] RC91 cycles historically resolve in 14m–2h10m. This cycle at 5h52m without bank response is **outside the established envelope** — exceeds config-salience trigger #2 (Active P1 with no resolution signal for >2 hours is anomalous and likely stuck). Pattern compares unfavorably to the Apr 19 Union Bank cycle (02:40–04:50 WAT, 2h10m — already the longest on record for Union Bank).

**6th Union Bank RC91 cycle in 9 days** (Apr 12, 15, 16×2, 19, 20). Trajectory:
- Apr 12 — isolated
- Apr 15 — isolated
- Apr 16 — two cycles in one day (pattern established)
- Apr 19 — overnight 5-bank wave cycle (2h10m, bank-resolved)
- Apr 20 — overnight cycle **NOT YET bank-resolved** (5h52m active at tick)

The 8-day trajectory now shows escalating frequency + longest-ever duration on a single cycle. Pattern significance high.

**Process failure flag: overnight briefing sweep gap.** briefing-2026-04-20 A2 stated "Overnight delegation window (23:00–06:00 WAT) — no new RC91 P1s beyond Stanbic cycle 31" — this was **false**. The 01:17 WAT Union Bank email and 01:51 WAT reminder were both in the email sweep window for the 06:09 WAT briefing tick but were not surfaced. Calibration: record as MISS tuple via `capture_note` MISS: prefix to route to config-salience Tuning Log.

## Sources
email [[Olamide Ajibulu]] 01:17 WAT Apr 20 (thread 19da83fdefd2e946); email [[Olamide Ajibulu]] 01:51 WAT Apr 20; email [[Olamide Ajibulu]] 06:53 WAT Apr 20; heartbeat Skim tick 07:09 WAT Apr 20

## Deltas
- [2026-04-20 07:09 WAT] — Situation created from Skim tick discovery. 5h52m active, zero bank response across 3 outreach messages. Immediate-tier DM dispatched. MISS: note captured for briefing sweep gap.
