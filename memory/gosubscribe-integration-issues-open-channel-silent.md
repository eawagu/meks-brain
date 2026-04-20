---
role: cto-teamapt
type:
  - "situation"
title: GoSubscribe — Integration Issues Open, Channel Silent
status: developing
created: "2026-04-11T16:43:34Z"
summary: "Channel silence broken 12:12 WAT Apr 20 after 12 days — Akindele Odedoyin flagged mandate_request_notification topic regression on staging (reportedly fixed late last week), tagging Ketan Dhamasana and Lewis Ugwu. Staging-only, not production-impacting. Three original integration issues still open; V2 upgrade work progressing through other channels."
updated: "2026-04-20T13:16:15Z"
cssclasses:
  - "situation"
accountability: Technology Scales Ahead of the Business
---

P0 wrong PIN defect closed Apr 8. Three open integration issues remain: (1) TMS routing config instability, (2) POS charge amount hardcoded at NGN100, (3) enrollment API missing Plan name/merchant name.

**Channel silence broken 12:12 WAT Apr 20 after 12 days** — [[Akindele Odedoyin]] flagged a mandate_request_notification topic regression on staging, tagging [[Ketan Dhamasana]] (`U0818PKFKQR`) and [[Lewis Ugwu]] (`U080T6P9KEZ`): the topic is not receiving messages, blocking end-to-end tests; issue was reportedly fixed late last week but has returned. Staging-only, not production-impacting. Named engineers own resolution.

**Follow-on 13:45 WAT Apr 20** — [[Yasir Syed Ali]] in-channel to [[Abdulgafar Obeitor]] (CCs [[Ketan Dhamasana]], [[Daniel Ojinaka]], [[Ravi Veluguleti]], [[Kevin Ngeno]], [[Khadijat Musa]]): *"we need to complete the sanity testing for POS Go Subscribe this week and also give a demo to Dennis. It's important that we maintain a stable environment during this period. As discussed with @Ketan Dhamasana, this may impact your ongoing bank tasks related to vulnerabilities. Kindly help in managing priorities and ensuring minimal disruption."* Separately same tick Yasir asks Ketan + [[Wycliffe Ochieng']] to keep the environment stable so testing completes — "otherwise pos go subscribe project will remain hanging."

**Reading:** this week's scope explicitly includes sanity testing + Dennis demo, with acknowledged priority contention against bank vulnerability work. The staging regression Akindele flagged at 12:12 WAT is the immediate blocker to sanity testing. User-level accountability is ownership of priority decisions if the two tracks collide on the same resources (Ketan Dhamasana spans both). No CTO ask yet — named engineers own the staging regression + priority allocation conversation. Awareness-tier.

## Sources
slack #go-subscribe-by-teamapt messages 12:12 WAT (Akindele), 13:45 WAT (Yasir — two messages: Abdulgafar ask + Ketan/Wycliffe stability ask) Apr 20

## Deltas
- 2026-04-20 12:12 WAT — Akindele flagged staging mandate_request_notification regression; named Ketan + Lewis. First channel activity in 12 days.
- 2026-04-20 13:45 WAT — Yasir's POS Go Subscribe sanity-testing + Dennis demo ask to Abdulgafar, with explicit priority contention against ongoing bank vulnerability tasks (CCs Ketan, Daniel, Ravi, Kevin, Khadijat). Second Yasir message same minute asks Ketan + Wycliffe to maintain stable environment. Staging stability surfaced as the blocker for this week's scope.
- 2026-04-20 14:09 WAT — tick observation: no ack yet from Abdulgafar or Ketan/Lewis on Akindele's staging regression post; Awareness-tier holds.