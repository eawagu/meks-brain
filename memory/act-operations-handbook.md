---
title: ACT Operations Handbook
type:
  - "source"
created: 2026-04-11
updated: 2026-04-11
cssclasses:
  - "source"
source_path: ACT Operations Handbook.md
summary: Operations handbook for the ACT (Acquirer Card Transaction) platform covering onboarding, fee collection, user management, and file validation responsibilities.
---

## Summary
ACT is a card transaction management application used primarily by acquirers. The Operations Team's role is concentrated at onboarding and administration stages, with acquirers self-managing day-to-day operations after setup. Manual fee collection is a current limitation pending automation.

## Key Points
- ACT is designed for acquirer-side users to manage card transaction processing; Operations involvement is minimal after onboarding
- Acquirer onboarding requires KYC check before access; Operations reviews and approves/escalates
- System setup post-KYC: Issuer Setup, Issuer Admin User Creation, Billing Contract Configuration, Input Filter Setup (BIN, input/output types)
- Fee reconciliation is currently manual — ACT does not support automated payment reconciliation; planned for future release
- Delegated User Management: once Acquirer Admin is created, they manage their own users
- Input File Validation: "require file validation" toggle ON during handholding period — TeamApt admin validates uploaded files; toggle OFF after handholding ends
- Support escalations route to SRE Team

## Entities Mentioned
- [[TeamApt]] — platform operator
- [[SRE Team]] — escalation path for errors

## Concepts
- [[Acquirer Onboarding]] — KYC-gated process for card transaction platform access
- [[ACT Platform]] — Acquirer Card Transaction management system
- [[Fee Collection Management]] — manual reconciliation pending automation
- [[Input File Validation]] — handholding-period control for new acquirers
