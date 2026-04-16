---
type:
  - "source-config"
title: source-config-calendar
created: 2026-04-11
summary: Signal source registration and filtering directives for Google Calendar (GCal MCP).
updated: "2026-04-16T11:53:41Z"
cssclasses:
  - "source-config"
last_processed: "2026-04-16T11:09:00Z"
---

## Connection

- **Connector:** GCal MCP
- **Primary calendar:** emeka.awagu@teamapt.com (owner, Africa/Lagos timezone)
- **Secondary calendars:** eawagu@gmail.com (writer), frank.atashili@teamapt.com (reader)
- **Reference calendar:** Holidays in Nigeria
- **Access patterns:**
  - `gcal_list_events` — delta detection, scan for new/changed events since last_processed
  - `gcal_get_event` — full event detail when flagged
  - `gcal_find_my_free_time` — schedule analysis for overload detection

## Directives

### Signal types ordered by priority

**1. Declined RSVPs on meetings I organized:**
When a direct report or key participant declines a meeting I organized, surface immediately. A single decline is informational. Three or more declines from the same person within 60 days on recurring 1:1s → flag as a pattern (possible capacity issue or disengagement signal).

**2. New invites requiring decision:**
New meeting invites where I haven't responded. Prioritize by sender:
- Dennis / board members / regulatory → surface immediately
- Direct reports → surface in next briefing
- All others → batch in daily digest
- Include: meeting title, organizer, time, whether agenda/doc is attached

**3. Meeting cancellations:**
Meetings I was attending that get cancelled. Surface if:
- The cancellation frees time in the next 24 hours (opportunity signal)
- The meeting was a recurring governance/review meeting (governance gap signal)

**4. Agenda-less meeting detection:**
Meetings within 48 hours that have no description, no attached document, and no agenda link in the body. Flag with suggestion: request agenda or consider declining. Skip this check for known recurring meetings that don't use calendar descriptions (e.g., daily standups).

**5. Back-to-back overload detection:**
Days with less than 15 minutes gap between meetings for 3+ consecutive meetings. Flag as fatigue risk in the morning briefing for that day. Include: which meetings, total meeting hours for the day, suggested meeting to move or decline.

**6. Schedule conflicts:**
Double-bookings or overlapping events. Surface immediately with both events and recommendation on which to prioritize (based on sender tier, meeting recurrence, and participant seniority).

### Lower-priority signals (awareness only, daily digest)

**7. Direct report calendar visibility:**
Frank Atashili's calendar is visible (reader access). Note when Frank has blocked time that conflicts with shared meetings.

**8. Holiday awareness:**
Nigerian public holidays from the Holidays calendar. Surface 2 days before a holiday: remind of upcoming holiday, flag any meetings scheduled on the holiday that may need rescheduling.

### Skip rules

- Accepted events with no changes since last scan
- Tentative responses from others (unless from direct reports)
- Recurring standup/sync meetings with no changes — only surface if cancelled, declined, or rescheduled
- Calendar notification emails (handled by email source, not calendar source)

## Notes

- All times in Africa/Lagos (WAT, UTC+1). No DST changes.
- The observer detection heuristic (recurring meetings where I have no follow-up actions) is deferred to the Improve phase — requires cross-source correlation between calendar events and email/Slack/Jira activity.
- The `gcal_find_meeting_times` tool can be used to suggest alternative times when a conflict is detected.
- Frank Atashili's calendar (reader access) is the only other calendar visible. If more direct report calendars are added, extend the direct report decline pattern detection to include them.
- **2026-04-16 06:23 WAT briefing tick:** Calendar HEALTHY — 13th consecutive tick restored. Two cancellations from Chris Purkis (moniepoint.com) 22:57 UTC Apr 15: "Blocker: Head of Engineering (VP+) Slots" 11:00–12:00 WAT and "Deliberation: Head of Engineering batch interviews" 12:00–12:40 WAT on Fri Apr 17 — frees 1h40min. Today's schedule: Strategy Retreat Day 3 all-day (08:00–18:00 BST), Ravi/Emeka 10:00, Felix/Emeka 11:00 (Felix declined), Ketan sync 11:30 (declined), Juliana Switch 11:30 (declined), DD Weekly Analysis 13:00 (needsAction), Weekly Check-ins DD 13:00 (needsAction), ATPP standup 14:00 (declined), Product-Engineering Sync 18:00, Retreat Dinner 19:00–22:20 BST (Capital Pleasure Boats). Lattice Review all-day (needsAction, 8 pending).
- **2026-04-16 08:09 WAT tick:** Calendar HEALTHY — 14th consecutive tick. Zero event deltas since briefing tick. Today's schedule unchanged.
- **2026-04-16 09:09 WAT tick:** Calendar HEALTHY — 15th consecutive tick. Zero event deltas. D2B standup (08:30–09:30 WAT) occurred — Emeka declined (Strategy Retreat). Strategy Retreat Day 3 in progress.
- **2026-04-16 10:20 WAT tick:** Calendar HEALTHY — 16th consecutive tick. Zero event deltas since last tick. Schedule unchanged. Strategy Retreat Day 3 ongoing. Ravi/Emeka 10:00 WAT window passed (Emeka declined for retreat). Lattice Review event updated at 08:50 UTC (no substantive change).
- **2026-04-16 11:15 WAT tick:** Calendar HEALTHY — 17th consecutive tick. One new invite detected via email (not calendar delta): **Round 2 Panel Interview for Head of Engineering — Akshya Kumar, Tue Apr 21 9:30–10:30 WAT.** Organizer: Oluwatobilola Fasanya. Panel: Emeka Awagu, Chukwudum Ekwueme, Chris Purkis. RSVP: needsAction. Briefing tier — accumulates for next briefing. No other event deltas. Retreat Day 3 ongoing.
- **2026-04-16 12:09 WAT tick:** Calendar HEALTHY — 18th consecutive tick. Zero event deltas since last tick. Schedule unchanged. Retreat Day 3 ongoing. Juliana Switch standup (11:30 WAT) passed — Emeka declined. DD Weekly Analysis and Weekly Check-ins DD both at 13:00 WAT approaching — both needsAction (should decline for Retreat).