---
role: cto-teamapt
type:
  - "situation"
title: GoSubscribe — Integration Issues Open, Channel Silent
status: developing
created: "2026-04-11T16:43:34Z"
summary: "Channel silence broken 12:12 WAT Apr 20 after 12 days — Akindele Odedoyin flagged mandate_request_notification topic regression on staging (reportedly fixed late last week), tagging Ketan Dhamasana and Lewis Ugwu. Staging-only, not production-impacting. Three original integration issues still open; V2 upgrade work progressing through other channels."
updated: "2026-04-20T12:15:40Z"
cssclasses:
  - "situation"
accountability: Technology Scales Ahead of the Business
---

P0 wrong PIN defect closed Apr 8. Three open integration issues remain: (1) TMS routing config instability, (2) POS charge amount hardcoded at NGN100, (3) enrollment API missing Plan name/merchant name. **Channel silence broken 12:12 WAT Apr 20 after 12 days** — [[Akindele Odedoyin]] flagged a mandate_request_notification topic regression on staging, tagging [[Ketan Dhamasana]] and [[Lewis Ugwu]]: the topic is not receiving messages, blocking end-to-end tests; issue was reportedly fixed late last week and has resurfaced. Staging-only, not production-impacting. Compliance readiness status unknown ([[Ibukun Atoyebi]]'s "We are not yet ready" from Apr 2 still unresolved in review-queue).

**Active work signals (Apr 13–20):** V2 upgrade (Java 21 + vulnerability fixes) targeting [[EcoBank]] and [[Wema Bank]] this week includes GoSubscribe readiness (Direct to Bank standup, 08:04 WAT Apr 13). [[Access Bank]] GoSubscribe POS being prepared for live environment. Yasir Syed Ali chased go-subscribe stability for sprint close-out in-channel 09:50 WAT Apr 20. Work continues outside the dedicated channel and is now resurfacing in-channel as regression noise during active V2 work.

## Sources
slack #go-subscribe-by-teamapt through 12:12 WAT Apr 20; Direct to Bank Daily Standup 2026-04-13 (08:04 WAT)

## Deltas
- 2026-04-13 08:04 WAT — Direct to Bank standup: V2 upgrade (Java 21) targeting EcoBank and Wema this week includes GoSubscribe readiness. Access Bank GoSubscribe POS being prepared for live environment. Work progressing despite channel silence.
- 2026-04-20 12:12 WAT — Channel silence broken after 12 days. [[Akindele Odedoyin]] tagged [[Ketan Dhamasana]] and [[Lewis Ugwu]] in #go-subscribe-by-teamapt: mandate_request_notification topic not receiving messages on staging, blocking E2E tests. Reportedly fixed late last week and now regressed. Staging-only; not production-impacting. Tier: Awareness (staging regression, low CTO-specificity, named engineers already own resolution).
