# Coza Buddy — Product Requirements Document (PRD)

**Product:** Coza Buddy  
**Organization:** COZA Global (Church of All Nations)  
**Author:** Principal Product Manager  
**Date:** Thursday, October 15, 2026  
**Status:** Draft v1.0  
**Source Material:** COZA Assimilation Flow Transcript (Sep 21, 2026), COZA Assimilation Redesign Meeting Notes, COZA Business Process Redesign documents  

---

## 1. Executive Summary

Coza Buddy is a unified digital assimilation and follow-up platform for COZA Global that digitizes the end-to-end journey of a person from first-time guest to fully assimilated church member. The platform harmonizes physical and digital believers' classes, tracks attendance across multiple entry points (self-arrival, bus ministry, late arrival), manages water baptism and certification, assigns members to zonal follow-up coordinators, and tracks evangelism contacts from cold lead to assimilation.

The core problem: today, assimilation is fragmented, paper-based, and inconsistent across zones. Physical and digital class content differ, gifts are unequal between channels, attendance is lost when phones are offline, zonal coordinators don't reliably follow up, and evangelism contacts (cold leads) sit unused with no path into the membership system.

**Vision:** One platform where every person who walks into — or watches — COZA is welcomed, discipled, followed up, and assimilated into a local community, regardless of whether they arrived physically or digitally, with or without a smartphone.

---

## 2. Problem Statement

| Problem | Impact |
|---------|--------|
| **Fragmented class experience** | Physical believers' class content is more holistic than digital Coza Connect content; digital vs. physical learners get different curricula. |
| **Unequal gifting** | Digital completers get gift boxes; physical card-stamp completers get branded towels/tools — creating perceived disparity and complaints. |
| **Attendance leakage** | Bus captains and PCU members mark attendance on paper manifests; data is delayed or lost entirely when phones are offline or people arrive late. |
| **No zonal follow-up accountability** | Names sent to zonal coordinators often receive no call or follow-up for months; no system feedback loop exists. |
| **Evangelism contacts go cold** | 20,000–50,000 evangelism contact numbers collected per branch are never tracked to church arrival or assimilation. |
| **Members fall through the cracks** | After Sunday service, no one follows up until the next Sunday; new members jump straight to COZA Body without orientation to church vision, structure, or pastors. |
| **No centralized leadership visibility** | Pastors and leaders cannot see which evangelism strategies work across branches, or which zones are under-performing on follow-up. |

---

## 3. Goals & Success Metrics

### 3.1 Goals

1. **Unified curriculum:** Deliver identical believers' class content to physical and digital attendees.
2. **100% attendance capture:** Enable attendance marking online and offline, across all entry points (self, bus, PCU, late).
3. **Equitable gifting:** Same completion gift for digital and physical class graduates.
4. **Guaranteed follow-up:** Every new member is assigned to a zonal coordinator and COZA Body leader with tracked follow-up.
5. **Evangelism-to-assimilation pipeline:** Cold evangelism contacts are categorized, nurtured, and tracked into the assimilation system upon first visit.
6. **Leadership visibility:** Central dashboard for pastors/leaders to view branch-level assimilation, evangelism, and follow-up performance.

### 3.2 Success Metrics (North Star & KPIs)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Time-to-first-follow-up** | ≤ 48 hours after first attendance | System timestamp: first attendance → first coordinator/body leader contact |
| **Class completion rate (digital)** | ≥ 70% within 10-day window | Digital course analytics: started vs. completed |
| **Class completion rate (physical)** | ≥ 80% | Physical attendance stamps vs. enrollments |
| **Attendance data latency** | ≤ 24 hours from service to system | Manifest upload vs. service date |
| **Zonal follow-up coverage** | ≥ 90% of new members contacted within 7 days | Coordinator activity reports vs. new member roster |
| **Evangelism contact conversion** | ≥ 10% of cold contacts attend first service | Cold leads logged vs. first-time attendance matched |
| **Gift parity sentiment** | Zero gift disparity complaints | Member feedback / support tickets |
| **Platform adoption** | 100% of branches using within 6 months of rollout | Branch activation count |

---

## 4. User Personas

### 4.1 New Convert / First-Time Guest (Digital)
- **Who:** Someone who gives their life to Christ or visits COZA for the first time and prefers to engage via smartphone/app.
- **Needs:** Welcoming onboarding, short digestible video lessons, clear progression, same certificate/gift as physical attendees, reminder to finish within the course window.
- **Pain points:** Long videos feel overwhelming; unclear what happens after class; no human welcome in digital experience.

### 4.2 New Convert / First-Time Guest (Physical)
- **Who:** Walks into a COZA branch, may not own a smartphone or have data.
- **Needs:** Simple card/manual registration, class attendance stamping, same curriculum and gift as digital peers, baptism option, assignment to a local zone/community.
- **Pain points:** Paper manifests lost; feels like a "second-class" gift vs. digital completers; no follow-up after first visit.

### 4.3 Bus Captain
- **Who:** Volunteer who picks up members via church bus, registers first-time guests before arrival.
- **Needs:** Offline-first member registration (photo, name, address, marital status, phone, bus stop), attendance marking without data, auto-sync when connectivity returns.
- **Pain points:** Phone battery/data issues; double data entry (paper then app); no way to mark late arrivals.

### 4.4 PCU Member (Pastoral Care Unit / Attendance Officer)
- **Who:** Church volunteer who marks attendance at the service desk.
- **Needs:** Search member by name/code and tick attendance; override for late arrivals; view zone-level attendance totals; reconcile bus captain vs. PCU counts.
- **Pain points:** Duplicate marking; no visibility into who was marked by bus captain vs. PCU.

### 4.5 Zonal Coordinator
- **Who:** Volunteer leader responsible for a geographic zone; receives new member assignments based on baptism/address data.
- **Needs:** Auto-assigned member list from their zone, follow-up task list, WhatsApp group onboarding, evangelism event invitations, weekly report submission, flagging members who miss 2+ services.
- **Pain points:** No system-assigned members; no visibility into who they should follow up; reports ignored; no feedback on whether follow-up happened.

### 4.6 COZA Body Leader (Stage 5)
- **Who:** Church leader assigned to a member for spiritual growth and pastoral care.
- **Needs:** Member profile with spiritual journey stage, chat/prayer request channel, meeting scheduling, growth tracking notes.
- **Pain points:** No structured cadence; members don't know who their body leader is; no record of spiritual check-ins.

### 4.7 Church Administrator / Pastor
- **Who:** Branch or global leadership.
- **Needs:** Dashboard showing assimilation funnel per branch, evangelism gallery/reports, zonal performance, gift inventory, course content management, FAQ management.
- **Pain points:** No centralized view; cannot compare evangelism strategy effectiveness across branches.

### 4.8 Content Creator / Course Producer
- **Who:** Records and uploads believers' class videos.
- **Needs:** Video upload module (5–15 min topics), quiz attachment, module sequencing, course window settings (e.g., 10-day close).
- **Pain points:** Current Coza Connect videos are not aligned with physical curriculum; long videos hurt completion.

---

## 5. Core Functional Requirements

### 5.1 Authentication & Access Control

| ID | Requirement | Priority |
|----|-------------|----------|
| AUTH-01 | Role-based login: Bus Captain, PCU Member, Zonal Coordinator, COZA Body Leader, Member, Admin/Pastor, Content Producer. | P0 |
| AUTH-02 | Members can sign in with phone number, email, or member code; support password reset. | P0 |
| AUTH-03 | Offline credentials cached for field roles (bus captain, PCU) to mark attendance without connectivity. | P0 |
| AUTH-04 | Session timeout and re-authentication for sensitive actions (baptism records, gift dispatch). | P1 |

### 5.2 Unified Believers' Class (Stage 1)

| ID | Requirement | Priority |
|----|-------------|----------|
| CLASS-01 | Single curriculum for both physical and digital believers' classes (vision of COZA, graces in the house, senior pastors, speaking in tongues, church structure, FAQs). | P0 |
| CLASS-02 | Digital content broken into short modules: 4–5 modules, 3 topics per module, 5–15 minutes per topic. | P0 |
| CLASS-03 | Digital course has a closing date (e.g., 10 days from start) to create urgency; auto-reminders before close. | P1 |
| CLASS-04 | Welcome/onboarding experience with welcome message, values, and "someone to talk to" touchpoint (Coursera-style course intro). | P1 |
| CLASS-05 | Quiz/assessment after each module or at course completion; pass threshold configurable. | P1 |
| CLASS-06 | Progress tracking: completed topics, modules, quizzes, overall completion percentage. | P0 |
| CLASS-07 | Content producer can upload/replace videos, attach quizzes, reorder modules, publish/unpublish course versions. | P0 |

### 5.3 Attendance Tracking (All Entry Points)

| ID | Requirement | Priority |
|----|-------------|----------|
| ATT-01 | Bus captain can register a new member before arrival: photo, first name, last name, address, marital status, job status, phone number, email, bus stop, pickup time. | P0 |
| ATT-02 | Bus captain can mark attendance for registered members on the bus manifest, offline-capable; auto-sync on reconnect. | P0 |
| ATT-03 | PCU member can search and mark attendance by name or member code at the service desk, including late arrivals. | P0 |
| ATT-04 | Self-arriving member with smartphone receives push notification to confirm attendance ("You are in church today?"). | P1 |
| ATT-05 | Attendance records deduplicated across bus captain, PCU, and self-check-in for the same service. | P0 |
| ATT-06 | Zone-level attendance dashboard: total per service, by source (bus/PCU/self), by branch, trend over time. | P1 |
| ATT-07 | Flag members who miss 2+ consecutive services for automatic follow-up assignment. | P0 |

### 5.4 Water Baptism (Stage 3)

| ID | Requirement | Priority |
|----|-------------|----------|
| BAP-01 | Baptism registration open to all members (new converts compulsory; existing members optional if previously baptized elsewhere). | P0 |
| BAP-02 | Capture baptism data: date, location, zone, address for zonal mapping. | P0 |
| BAP-03 | Generate and issue digital baptism certificate; option to reprint. | P1 |
| BAP-04 | Baptism completion triggers automatic assignment to zonal coordinator based on member's address/location. | P0 |

### 5.5 Equitable Completion & Gifting (Stage 2)

| ID | Requirement | Priority |
|----|-------------|----------|
| GIFT-01 | Same completion gift (gift box equivalent) for digital and physical believers' class graduates; no channel-based disparity. | P0 |
| GIFT-02 | Gift dispatch tracked in system: gift type, dispatch date, recipient, zone, coordinator confirmation of receipt. | P1 |
| GIFT-03 | Member can view gift eligibility and status in profile. | P2 |

### 5.6 Zonal Follow-Up & Community (Stage 4 — renamed "Community")

| ID | Requirement | Priority |
|----|-------------|----------|
| ZON-01 | Auto-assign new members to zonal coordinator using baptism/address data. | P0 |
| ZON-02 | Coordinator dashboard: assigned members, follow-up status, last contact date, next action. | P0 |
| ZON-03 | Coordinator onboards member to zone WhatsApp group; welcome them on first evangelism/service visit. | P1 |
| ZON-04 | Weekly evangelism report submission per coordinator: members contacted, attended, missed, reason. | P0 |
| ZON-05 | System flags members not followed up within 7 days; escalates to zone supervisor after 14 days. | P0 |
| ZON-06 | Community/hangout event creation (not just evangelism): roadshows, socials, follow-up events with photo gallery. | P1 |

### 5.7 Evangelism Contact Management (Cold Leads)

| ID | Requirement | Priority |
|----|-------------|----------|
| EVA-01 | Separate cold-lead platform for evangelism contacts (names, phone numbers, source, location, date collected). | P0 |
| EVA-02 | Categorize contacts: cold lead → first-time visitor → assimilated member (auto-promotion when they attend and register). | P0 |
| EVA-03 | Track evangelism outreach: blasts, robocalls (future), roadshows, activations; link effort to attendance outcomes. | P1 |
| EVA-04 | Gallery of evangelism activities per branch: pictures, videos, worker counts, contacts collected. | P1 |
| EVA-05 | Leader dashboard: compare evangelism strategy effectiveness across branches (contacts vs. attendees vs. assimilated). | P1 |

### 5.8 COZA Body / Spiritual Mentorship (Stage 5)

| ID | Requirement | Priority |
|----|-------------|----------|
| BOD-01 | Assign COZA Body leader to member after assimilation; leader can view member's spiritual journey stage. | P1 |
| BOD-02 | Member can request chat/prayer with body leader via app; leader can initiate check-ins. | P2 |
| BOD-03 | Leader records spiritual growth notes and meeting history. | P2 |

### 5.9 Church Information & FAQs

| ID | Requirement | Priority |
|----|-------------|----------|
| FAQ-01 | Central FAQ repository: service times, branches (Abuja and outside Abuja), church vision, pastors, how processes work. | P1 |
| FAQ-02 | FAQs integrated into believers' class curriculum as a topic. | P1 |

### 5.10 Leadership Dashboard & Analytics

| ID | Requirement | Priority |
|----|-------------|----------|
| DASH-01 | Global/branch dashboard: assimilation funnel (guest → class → baptism → community → body), evangelism performance, zonal follow-up SLA compliance. | P0 |
| DASH-02 | Pastor view: "What is [branch] doing this week to reach souls?" — recent evangelism gallery, reports, contact counts. | P1 |
| DASH-03 | Exportable reports (CSV/PDF) for attendance, baptisms, gifts, follow-up. | P2 |

---

## 6. Edge Cases & Exception Handling

| Scenario | Handling |
|----------|----------|
| **Phone off / no data** | Bus captain records on paper or offline app mode; syncs automatically when connectivity restored. PCU can manually backfill attendance. |
| **Member arrives late** | PCU marks late attendance; system records check-in time separately from on-time. |
| **Duplicate attendance** | Unique member ID + service ID + source prevents double counting; PCU can void erroneous marks with reason. |
| **Member without smartphone** | Physical registration via bus captain/PCU; receives same class, gift, baptism, and zonal assignment as digital members. |
| **Previously baptized member** | Baptism marked optional; no re-baptism required; still eligible for class and zonal assignment. |
| **Zonal coordinator unresponsive** | 7-day no-contact auto-flag; 14-day escalation to zone supervisor; reassignment if coordinator inactive 30 days. |
| **Course window expires** | Member notified before close; option to re-enroll in next cohort; progress retained where possible. |
| **Evangelism contact already in member system** | De-duplication by phone number; cold-lead record linked to member profile upon first attendance. |
| **Gift dispute (box vs. towel)** | Harmonized single gift type; support ticket path for legacy complaints; admin override for gift re-dispatch. |
| **Coordinator leaves church zone** | Members auto-reassigned to new coordinator; follow-up history preserved. |
| **Content mismatch between branches** | Central content management; branch admins cannot deviate from core curriculum; localized FAQs only. |

---

## 7. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Platform** | Mobile-responsive web app (PWA) + native Android/iOS (MVP: PWA). Works on low-end Android devices common among congregation. |
| **Connectivity** | Offline-first for field roles; sync queue with conflict resolution; data persists locally when offline. |
| **Performance** | Attendance mark < 2 seconds; dashboard load < 3 seconds; video adaptive bitrate for low bandwidth. |
| **Security** | Role-based access control; audit log for attendance changes, baptism records, gift dispatch; PII encrypted at rest and in transit. |
| **Scalability** | Support 50,000+ evangelism contacts per branch; 10,000+ active members; multi-branch (Abuja + satellite branches). |
| **Accessibility** | Simple UI for low-digital-literacy volunteers; large touch targets; optional voice/IVR follow-up (future). |

---

## 8. Out of Scope (MVP)

- Robocall / voice broadcast integration (noted as future consideration; MTN pricing discussions mentioned).
- Live video streaming of church services.
- E-commerce / tithing and offerings.
- Full church management (membership beyond assimilation, payroll, event scheduling beyond community events).
- Integration with existing Coza Connect app beyond content alignment (may be a separate app or sub-domain).

---

## 9. Roadmap Phases (Suggested)

| Phase | Focus | Key Deliverables |
|-------|-------|-----------------|
| **Phase 1** | Foundation | Auth, roles, unified class curriculum (digital + physical), attendance tracking (bus captain + PCU), offline mode. |
| **Phase 2** | Assimilation | Baptism tracking + certificates, gift parity, zonal auto-assignment, coordinator dashboard, weekly reports. |
| **Phase 3** | Community & Evangelism | COZA Body mentorship, cold-lead management, evangelism gallery, leadership dashboard, FAQs. |
| **Phase 4** | Optimization | Robocalls/IVR, advanced analytics, native mobile apps, multi-language support. |

---

## 10. Open Questions for Stakeholders

1. What is the preferred name/acronym for the "evangelism team" stage (currently discussed as "Community")?
2. Which branch should be the pilot for Phase 1 (Maraba, North Church, Lugwell, Guagalada)?
3. Who owns content production and video recording for the believers' class?
4. What is the target gift box contents and budget per member?
5. Is there an existing member database to migrate, or does Coza Buddy start from zero?
6. What is the rollout timeline and training plan for bus captains and PCU volunteers?

---

## 11. Appendix: Source References

- COZA Assimilation Flow Transcript (Mon, Sep 21, 2026) — attendees: Collins Ozoadibe, El-roy Wisdom, Precious Onuoha
- COZA Assimilation Redesign — Meeting Notes
- COZA Business Process Redesign — Formatted document
- Existing platforms referenced: Coza Connect app, Coza Global app, CTS app, PCU processes
