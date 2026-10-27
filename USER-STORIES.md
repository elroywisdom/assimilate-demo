# Coza Buddy — User Stories & Acceptance Criteria

**Product:** Coza Buddy  
**Version:** 1.0  
**Based on:** PRD v1.0 — Coza Buddy  
**Format:** As a [persona], I want to [action], so that [benefit]  
**Acceptance Criteria:** Given / When / Then  

---

## 1. Authentication & Access Control

### US-01: Member Login (Digital & Physical)

**As a** new convert or returning member,  
**I want to** log in with my phone number, email, or member code,  
**so that** I can access my class progress, attendance, and assimilation journey.

**Acceptance Criteria:**

- **Given** I am on the login screen  
  **When** I enter a valid phone number, email, or member code and password  
  **Then** I am authenticated and redirected to my dashboard

- **Given** I have forgotten my password  
  **When** I select "Forgot password"  
  **Then** I receive an OTP via SMS or email to reset my password

- **Given** I am a first-time user without an account  
  **When** I select "Register"  
  **Then** I am taken to the member registration flow (US-02)

- **Given** I am a field volunteer (bus captain / PCU) with intermittent connectivity  
  **When** I log in while online  
  **Then** my credentials are cached so I can mark attendance offline later

---

### US-02: Member Registration

**As a** first-time guest,  
**I want to** register my personal details,  
**so that** I can be tracked through the assimilation journey.

**Acceptance Criteria:**

- **Given** I am on the registration screen  
  **When** I enter full name, phone number, email (optional), address, marital status, and how I heard about COZA  
  **Then** a member profile is created and a unique member code is generated

- **Given** I am registering via a bus captain before arrival  
  **When** the bus captain submits my details including photo, bus stop, and pickup time  
  **Then** my record is saved in offline mode and synced when connectivity returns

- **Given** I submit invalid or incomplete data  
  **When** I attempt to submit  
  **Then** inline validation errors appear and submission is blocked

---

### US-03: Role-Based Access Control

**As a** system administrator,  
**I want to** assign roles to users (Bus Captain, PCU Member, Zonal Coordinator, COZA Body Leader, Member, Admin/Pastor, Content Producer),  
**so that** users only see features relevant to their responsibilities.

**Acceptance Criteria:**

- **Given** a user has the "Bus Captain" role  
  **When** they log in  
  **Then** they see member registration, bus manifest, and offline attendance marking — but not zonal coordinator dashboards or baptism records

- **Given** a user has the "Zonal Coordinator" role  
  **When** they log in  
  **Then** they see their assigned member list, follow-up tasks, and weekly report submission — but not content production tools

- **Given** a user attempts to access a feature outside their role  
  **When** they navigate to that screen  
  **Then** they receive an "Access denied" message

---

## 2. Unified Believers' Class (Stage 1)

### US-04: Enroll in Believers' Class

**As a** registered member,  
**I want to** be enrolled in the believers' class automatically after registration,  
**so that** I can begin my discipleship journey without manual steps.

**Acceptance Criteria:**

- **Given** I have completed registration  
  **When** my account is activated  
  **Then** I am enrolled in the current cohort with a 10-day completion window

- **Given** I am enrolled  
  **When** I open my dashboard  
  **Then** I see "Believers' Class — Cohort [X]" with progress bar and days remaining

---

### US-05: Consume Digital Class Content (Short Modules)

**As a** digital learner,  
**I want to** watch short video modules (5–15 minutes per topic) with quizzes,  
**so that** I can complete the class within my attention span and schedule.

**Acceptance Criteria:**

- **Given** I am in the class viewer  
  **When** I select a module  
  **Then** I see topics broken into 5–15 minute videos with a "Mark complete" button

- **Given** I finish watching a topic video  
  **When** I take the topic quiz and score ≥ pass threshold  
  **Then** the topic is marked complete and the next topic unlocks

- **Given** I am watching on low bandwidth  
  **When** the video loads  
  **Then** adaptive bitrate streaming adjusts quality automatically

- **Given** the course window is closing (e.g., 2 days remaining)  
  **When** I open the app  
  **Then** I receive a reminder notification to complete before the deadline

---

### US-06: Attend Physical Class (Stamping)

**As a** physical class attendee,  
**I want to** have my attendance stamped per module by the class facilitator,  
**so that** my progress is recorded equivalently to digital learners.

**Acceptance Criteria:**

- **Given** I am attending a physical class session  
  **When** the facilitator selects my member code and marks the module as attended  
  **Then** my physical progress is logged in the system

- **Given** I complete all physical modules + quiz  
  **When** the facilitator confirms completion  
  **Then** my class status is marked complete and I am eligible for checkout

---

### US-07: Content Producer — Upload & Manage Class Content

**As a** content producer,  
**I want to** upload videos, attach quizzes, sequence modules, and publish course versions,  
**so that** the believers' class curriculum is consistent across physical and digital channels.

**Acceptance Criteria:**

- **Given** I am in the content management screen  
  **When** I upload a video (5–15 min), attach a quiz, and assign it to a module  
  **Then** the content is saved as a draft

- **Given** I have finalized a course version  
  **When** I publish it  
  **Then** all enrolled members see the new content; previous versions are archived

- **Given** I attempt to publish content outside the core curriculum  
  **When** I submit  
  **Then** an admin review is required before publication

---

## 3. Attendance Tracking (All Entry Points)

### US-08: Bus Captain — Register Member & Mark Attendance

**As a** bus captain,  
**I want to** register new members on the bus and mark their attendance, even without data connectivity,  
**so that** no guest is missed and attendance data reaches PCU before or at arrival.

**Acceptance Criteria:**

- **Given** I am on the bus with a new guest  
  **When** I enter their photo, name, phone, address, marital status, job status, bus stop, and pickup time  
  **Then** a member record is created and stored locally

- **Given** I have intermittent or no data  
  **When** I mark members as present on the manifest  
  **Then** the records are queued for sync and upload automatically when connectivity returns

- **Given** I arrive at church  
  **When** I sync the manifest  
  **Then** PCU receives the data before the service begins

---

### US-09: PCU Member — Mark Attendance at Service Desk

**As a** PCU member,  
**I want to** search for members by name or code and mark their attendance at the service desk,  
**so that** all attendees are counted regardless of how they arrived.

**Acceptance Criteria:**

- **Given** a member arrives at the service desk  
  **When** I search by name or member code and tick "Present"  
  **Then** attendance is recorded with timestamp and source = PCU

- **Given** a member arrives late  
  **When** I mark their attendance  
  **Then** the check-in time is recorded as "late" separately from on-time

- **Given** a member was already marked by a bus captain  
  **When** I attempt to mark them again  
  **Then** the system prevents duplicate counting and shows "Already marked"

---

### US-10: Self Check-In (Smartphone Owner)

**As a** member with a smartphone,  
**I want to** confirm my attendance via push notification when I am at church,  
**so that** I can self-check-in without depending on a volunteer.

**Acceptance Criteria:**

- **Given** I am within geofence of a COZA branch during service hours  
  **When** I receive a push notification: "Are you in church today?"  
  **Then** I can tap "Yes" to self-mark attendance

- **Given** I self-check-in  
  **When** the record is saved  
  **Then** source = Self, and it is deduplicated against bus captain / PCU marks

---

### US-11: Zone-Level Attendance Dashboard

**As a** zonal coordinator or pastor,  
**I want to** see attendance totals per service by source (bus / PCU / self) and by branch,  
**so that** I can track zone health and identify trends.

**Acceptance Criteria:**

- **Given** I am on the attendance dashboard  
  **When** I select a branch and date range  
  **Then** I see total attendance, breakdown by source, and trend over time

- **Given** a member misses 2+ consecutive services  
  **When** the system evaluates attendance  
  **Then** the member is auto-flagged for follow-up (see US-19)

---

## 4. Equitable Completion & Gifting (Stage 2)

### US-12: Class Completion Eligibility

**As a** member who completed the believers' class,  
**I want to** know that I am eligible for the completion gift,  
**so that** I am recognized the same whether I attended digitally or physically.

**Acceptance Criteria:**

- **Given** I have completed all class modules + quiz  
  **When** I view my profile  
  **Then** my status shows "Class Complete — Eligible for Gift"

- **Given** I completed digitally and another member completed physically  
  **When** we both reach checkout  
  **Then** we are offered the same gift box (no channel-based disparity)

---

### US-13: Gift Dispatch Tracking

**As a** zonal coordinator,  
**I want to** record when a gift box is handed to a member,  
**so that** gift delivery is tracked and members don't fall through the cracks.

**Acceptance Criteria:**

- **Given** a member is eligible for a gift  
  **When** I mark the gift as dispatched in the system  
  **Then** the gift record shows status = Dispatched with date and coordinator

- **Given** a member receives their gift  
  **When** I confirm receipt  
  **Then** the gift record shows status = Received

---

## 5. Water Baptism (Stage 3)

### US-14: Baptism Registration

**As a** new convert,  
**I want to** register for water baptism after completing the class,  
**so that** I can take this step in my faith journey.

**Acceptance Criteria:**

- **Given** I have completed the believers' class  
  **When** I reach the checkout flow  
  **Then** I am offered baptism registration (compulsory for new converts)

- **Given** I am an existing member previously baptized elsewhere  
  **When** I reach checkout  
  **Then** baptism is marked optional; I can skip or re-baptize

- **Given** I submit baptism registration  
  **When** I select date and location preference  
  **Then** a baptism slot is booked and a digital certificate template is queued

---

### US-15: Baptism Certificate Issuance

**As a** baptized member,  
**I want to** receive a digital baptism certificate,  
**so that** I have proof of my baptism.

**Acceptance Criteria:**

- **Given** my baptism is recorded as completed  
  **When** I view my profile  
  **Then** I can download or view my digital baptism certificate

- **Given** I lose my certificate  
  **When** I request a reprint  
  **Then** an admin can reissue the certificate

---

## 6. Zonal Follow-Up & Community (Stage 4 — Community)

### US-17: Zonal Auto-Assignment

**As a** new member,  
**I want to** be automatically assigned to a zonal coordinator based on where I live,  
**so that** someone near me follows up with me.

**Acceptance Criteria:**

- **Given** I complete baptism or class completion  
  **When** my address is geocoded  
  **Then** I am assigned to the zonal coordinator for my zone

- **Given** I move to a new zone  
  **When** my address is updated  
  **Then** I am reassigned to the new zone's coordinator

---

### US-18: Zonal Coordinator Dashboard

**As a** zonal coordinator,  
**I want to** see my assigned members, follow-up status, and last contact date,  
**so that** I can prioritize who needs follow-up.

**Acceptance Criteria:**

- **Given** I log in as a zonal coordinator  
  **When** I open my dashboard  
  **Then** I see a list of members in my zone with status: Not Contacted / Contacted / Followed Up

- **Given** a member has not been contacted within 7 days  
  **When** the system evaluates SLA  
  **Then** the member is flagged for follow-up

- **Given** a member has not been contacted within 14 days  
  **When** the flag remains unresolved  
  **Then** the issue is escalated to the zone supervisor

---

### US-19: Weekly Evangelism / Follow-Up Report

**As a** zonal coordinator,  
**I want to** submit a weekly report on members contacted, attended, and missed,  
**so that** leadership has visibility into follow-up effectiveness.

**Acceptance Criteria:**

- **Given** it is Saturday after evangelism  
  **When** I submit my weekly report with counts of members contacted, attended, and missed  
  **Then** the report is saved and visible to branch leadership

- **Given** I fail to submit for two consecutive weeks  
  **When** the system evaluates  
  **Then** an alert is sent to the zone supervisor

---

### US-20: Community / Hangout Event Creation

**As a** zonal coordinator,  
**I want to** create community events (hangouts, roadshows, follow-ups — not just evangelism),  
**so that** members feel welcomed into a community, not just an evangelism program.

**Acceptance Criteria:**

- **Given** I am creating an event  
  **When** I enter event type (hangout / roadshow / follow-up), date, location, and invite members  
  **Then** the event is created and members receive notifications

- **Given** an event is completed  
  **When** I upload photos  
  **Then** the photos are added to the zone's community gallery

---

## 7. Evangelism Contact Management (Cold Leads)

### US-21: Log Evangelism Contact

**As an** evangelism volunteer,  
**I want to** log cold contacts collected during evangelism (name, phone, source, location),  
**so that** they can be nurtured toward first visit and assimilation.

**Acceptance Criteria:**

- **Given** I collect a contact during evangelism  
  **When** I enter their details in the cold-lead platform  
  **Then** the contact is saved with status = Cold Lead

- **Given** I collect 20,000+ contacts in a branch  
  **When** I view the dashboard  
  **Then** I can see total contacts, source breakdown, and conversion trends

---

### US-22: Cold Lead to First-Time Visitor Conversion

**As a** follow-up volunteer,  
**I want to** see which cold leads have attended their first service,  
**so that** I can prioritize warm leads for assimilation.

**Acceptance Criteria:**

- **Given** a cold lead attends their first service and registers  
  **When** their phone number matches an existing cold-lead record  
  **Then** the contact is auto-promoted: Cold Lead → First-Time Visitor → Member

- **Given** a cold lead has not attended after 30 days  
  **When** the system evaluates  
  **Then** they remain in the cold-lead pool for nurturing (robocall/SMS future)

---

### US-23: Evangelism Gallery & Leader Dashboard

**As a** pastor or branch leader,  
**I want to** see evangelism activity per branch — contacts collected, workers deployed, photos, and conversion rates,  
**so that** I can compare which evangelism strategies work across branches.

**Acceptance Criteria:**

- **Given** I am on the leadership dashboard  
  **When** I select a branch and date range  
  **Then** I see contacts collected, first-time visitors from those contacts, assimilation rate, and photo gallery

- **Given** I want to compare branches  
  **When** I view the comparison view  
  **Then** I see branch-by-branch evangelism performance metrics

---

## 8. COZA Body / Spiritual Mentorship (Stage 5)

### US-24: COZA Body Leader Assignment

**As a** assimilated member,  
**I want to** be assigned a COZA Body Leader for spiritual growth,  
**so that** I have someone to talk to and pray with.

**Acceptance Criteria:**

- **Given** I am marked as Assimilated  
  **When** the system assigns a body leader  
  **Then** I am notified of my body leader's name and contact

- **Given** I want to talk to my body leader  
  **When** I open the app  
  **Then** I can initiate a chat or prayer request

---

### US-25: Body Leader Growth Tracking

**As a** COZA Body Leader,  
**I want to** record spiritual check-ins and growth notes for my members,  
**so that** I can track their discipleship progress over time.

**Acceptance Criteria:**

- **Given** I meet with a member  
  **When** I log a check-in note with date and spiritual growth observations  
  **Then** the note is saved to the member's profile

- **Given** I view my member list  
  **When** I filter by last check-in date  
  **Then** I can see which members are overdue for a check-in

---

## 9. Church Information & FAQs

### US-26: Access Church FAQs

**As a** member or guest,  
**I want to** find answers to common questions (service times, branches, church vision, pastors),  
**so that** I understand how COZA operates.

**Acceptance Criteria:**

- **Given** I open the FAQ section  
  **When** I search or browse categories  
  **Then** I see answers to: service times, branch locations (Abuja and outside Abuja), church vision, pastors, class processes

- **Given** FAQs are part of the believers' class curriculum  
  **When** I am in the class  
  **Then** I see the FAQ topic as a module

---

## 10. Leadership Dashboard & Analytics

### US-27: Assimilation Funnel Dashboard

**As a** pastor or global leader,  
**I want to** see the assimilation funnel per branch (Guest → Class → Baptism → Community → Body),  
**so that** I can identify where members drop off.

**Acceptance Criteria:**

- **Given** I am on the leadership dashboard  
  **When** I view the funnel report  
  **Then** I see conversion rates at each stage with branch comparison

- **Given** I need to export data  
  **When** I click Export  
  **Then** I receive a CSV or PDF report

---

### US-28: Evangelism Strategy Comparison

**As a** global leader,  
**I want to** compare evangelism strategies across branches,  
**so that** I can learn from what works and replicate it.

**Acceptance Criteria:**

- **Given** I am on the strategy comparison screen  
  **When** I select multiple branches  
  **Then** I see contacts collected vs. attendees vs. assimilated for each branch

---

## 11. Edge Case Stories

### US-29: Offline Attendance Sync

**As a** bus captain with no data,  
**When** I mark attendance offline  
**Then** the data is stored locally and syncs automatically when connectivity returns, without data loss.

### US-30: Duplicate Attendance Prevention

**As a** PCU member,  
**When** I attempt to mark a member who was already marked by a bus captain  
**Then** the system blocks the duplicate and shows "Already marked by Bus Captain."

### US-31: Unresponsive Coordinator Escalation

**As a** zone supervisor,  
**When** a zonal coordinator has not contacted assigned members within 14 days  
**Then** the members are auto-reassigned to an active coordinator.

### US-32: Course Window Expiry

**As a** digital learner,  
**When** my 10-day course window expires before I complete  
**Then** I am notified and offered re-enrollment in the next cohort with progress retained where possible.

---

## Story Mapping (Suggested Sprint Order)

| Sprint | Theme | Stories |
|--------|-------|---------|
| **Sprint 1** | Foundation | US-01, US-02, US-03, US-04, US-08, US-09 |
| **Sprint 2** | Class Experience | US-05, US-06, US-07 |
| **Sprint 3** | Completion & Baptism | US-12, US-13, US-14, US-15 |
| **Sprint 4** | Zonal Follow-Up | US-17, US-18, US-19, US-20 |
| **Sprint 5** | Evangelism & Leads | US-21, US-22, US-23 |
| **Sprint 6** | Body Mentorship & Leadership | US-24, US-25, US-26, US-27, US-28 |
| **Sprint 7** | Edge Cases & Polish | US-10, US-11, US-29, US-30, US-31, US-32 |
