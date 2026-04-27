---
title: Direct to Bank Daily Stand Up 2026-04-27 0825 Gemini Notes
type:
  - "source"
cssclasses:
  - "source"
source_path: " Direct to Bank : Daily stand up – 2026/04/27 08:25 WAT – Notes by Gemini"
drive_file_id: 1R-0jNgEXPxMN46fJYhMx6IMeqpA9-nrF6Lb66Vn4RzQ
drive_view_url: "https://docs.google.com/document/d/1R-0jNgEXPxMN46fJYhMx6IMeqpA9-nrF6Lb66Vn4RzQ/edit"
created: "2026-04-27T08:17:42Z"
updated: "2026-04-27T08:17:42Z"
summary: Apr 27 2026 Direct to Bank daily standup — service upgrade prioritization for 3 banks (Zenith/Parex/Union) addressing security vulnerabilities + ghost subscribers; Zenith Bank pilot delayed by static-scan requirements with VPN-IP whitelisting mitigation strategy aligned; sprint planning kicked off; Stanbic close to production credentials; Abdulgafar/Babajide own next-step deployment plan and DD card-registration-to-account discussion.
---

## Summary
[[TeamApt Limited]] Direct to Bank daily standup on April 27, 2026 (08:25 WAT). Engineering prioritized service upgrades for 3 banks ([[Zenith Bank]], [[Parex Bank]], [[Union Bank]]) addressing security vulnerabilities and ghost-subscriber issues. [[Zenith Bank]] pilot delayed by new static-vulnerability-scan requirements; mitigation: whitelist specific VPN IP addresses to unblock pilot while remediation continues. Engineering sprint planning underway; release jars (bank integration services) ready for deployment. [[Stanbic Bank]] reportedly close to obtaining production credentials.

## Decisions Aligned
- **Zenith Bank Pilot mitigation strategy**: Team aligned on proposing whitelist of specific user VPN IP addresses to unblock pilot while vulnerability resolution continues.

## Next Steps (Action Items)
- [[Abdulgafar Obeitor]] — Get Zenith Bank static-scan results from engineering today.
- [[Abdulgafar Obeitor]] — Report Zenith Bank vulnerability meeting outcome to [[Tunde Okufi]].
- [[Babajide Ojoboorun]] — Run gradual ghost-subscriber deployment plan with respective bank project-delivery persons.
- [[Babajide Ojoboorun]] — Schedule deployment meeting to present ghost-subscriber deployment plan.
- [[Abdulgafar Obeitor]] — Discuss DD card-registration-to-account change with engineering today/tomorrow.
- The group — Update project timelines today to reflect current realities.

## Key Points
- **Service upgrade prioritization**: Week's primary focus = upgrading services across banks for vulnerability resolution, ghost subscribers, bank-specific issues. Initial deploy: Zenith → Parex → Union, then others.
- **Zenith Bank pilot blocker**: Bank's deployment team requested rescan with static vulnerability scan after prior remediation; new findings introduced. Session today to discuss results, review critical blockers and temporary mitigations.
- **VPN-IP whitelisting mitigation**: [[Abdulgafar Obeitor]] to propose whitelist of specific users' VPN IPs to allow pilot access while remaining issues are resolved before opening service to general internet usage. [[Tunde Okufi]] requested outcome update so adjustments don't wait until next week.
- **Interbank Transfer API + Stanbic credential pursuit**: Engineering working on UBA interbank transfer API and Stanbic. [[Stanbic Bank]] reportedly close to production credentials (needed for production-environment testing).
- **Deployment & sprint planning**: [[Nancy Muorah]] confirmed deployment focus; release jars prepared for bank integration services with bank-raised fixes. Security team (Leman) rescanning some jars before deploy/share with SR team. Sprint planning kicked off this week with continued "pay with money point" cleanup work.
- **Ghost subscriber deployment plan**: Ghost-subscriber services ready for bank deployment via SR-team-arranged phased plan. [[Abdulgafar Obeitor]] advised [[Opeyemi Animashaun]] to align with bank project-delivery personnel.
- **Deployment scope**: Deployment package addresses all bank-raised issues + internal team issues (not limited to ghost subscribers). Services target banks that provided security reports: [[Zenith Bank]], [[Parex Bank]], [[Union Bank]], [[Access Bank]].
- **DD card-registration change**: [[Tunde Okufi]] asked whether ghost-subscriber jars include the card-registration-to-accounts conversion discussed last week. [[Abdulgafar Obeitor]] confirmed the change is NOT in the ghost-subscriber jars — it lives on the DD component. Engineering discussion needed today/tomorrow; expected to occur outside the bank side.
- **Timeline updates**: [[Khadijat Musa]] reminded SR team to update project timelines today to reflect current realities.

## Connections
- Connects to [[DCIR Security Vulnerabilities]] — Access Bank pen-test 5 CRITICAL findings cluster, service-upgrade deployment in this meeting addresses partial remediation across banks.
- Connects to [[DCIR/ACS/DD — Credential Remediation and Harness Migration Blocked]] credential-remediation theme.
- The Apr 27 morning ADD-4579 through ADD-4583 closures by [[Bukola Taiwo]] (AES/GCM encryption + 4 CRLF Injection vulnerability fixes on Access bank integration / DD Core / DD management Lib / DD management Service) are part of the security-cleanup batch this meeting frames as ready-for-deployment.

## Entities Mentioned
[[Abdulgafar Obeitor]], [[Babajide Ojoboorun]], [[Tunde Okufi]], [[Nancy Muorah]], [[Khadijat Musa]], [[Opeyemi Animashaun]], [[Emeka Awagu]], [[Zenith Bank]], [[Parex Bank]], [[Union Bank]], [[Access Bank]], [[Stanbic Bank]], [[TeamApt Limited]]

## Concepts
[[Direct to Bank]], [[DCIR Security Vulnerabilities]], [[Direct Debit]], [[Ghost Subscribers]]
