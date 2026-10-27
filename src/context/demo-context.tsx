"use client";

import React, { createContext, useContext, useState } from "react";

export interface ColdLead {
  id: string;
  name: string;
  phone: string;
  outreachLocation: string;
  dateCollected: string;
  status: "cold_lead" | "promoted_to_guest";
  notes?: string;
}

export interface MemberRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  maritalStatus: "Single" | "Married";
  branch: string;
  source: "bus" | "pcu" | "self";
  pickupStop?: string;
  busRoute?: string;
  checkInStatus: "unmarked" | "present" | "late";
  checkInTime?: string;
  // Stage 1 Believers Class
  classCohort: string;
  classModulesCompleted: number;
  classTotalModules: number;
  classQuizPassed: boolean;
  classStatus: "not_started" | "in_progress" | "completed";
  // Stage 2 Gifting
  giftStatus: "ineligible" | "eligible" | "dispatched" | "received";
  giftDispatchId?: string;
  // Stage 3 Baptism
  baptismStatus: "not_registered" | "scheduled" | "completed";
  baptismCertificateId?: string;
  baptismDate?: string;
  baptismRobeSize?: "S" | "M" | "L" | "XL";
  // Stage 4 Zonal Community
  zone: string;
  zonalCoordinator: string;
  zonalContacted: boolean;
  zonalDaysElapsed: number;
  addedToWhatsApp: boolean;
  invitedToSaturdayCommunity: boolean;
  // Stage 5 COZA Body & Department Placement
  department?: string;
  spiritualMentor?: string;
  // At-risk / Missed service
  consecutiveMisses: number;
}

export type PersonaRole =
  | "bus-captain"
  | "pcu-desk"
  | "member-portal"
  | "zonal-coordinator"
  | "executive-dashboard";

interface DemoContextType {
  currentPersona: PersonaRole;
  setCurrentPersona: (persona: PersonaRole) => void;
  // Online / offline simulation
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  offlineQueueCount: number;
  syncOfflineQueue: () => void;
  // Active member for narrative journey (Brother Samuel)
  activeMember: MemberRecord;
  updateActiveMember: (updates: Partial<MemberRecord>) => void;
  // Roster of other members for realistic table views
  roster: MemberRecord[];
  addMemberToRoster: (member: MemberRecord) => void;
  markAttendance: (id: string, status: "present" | "late" | "unmarked", time?: string) => void;
  // Saturday Outreach Cold Leads (EVA-01 / EVA-02)
  coldLeads: ColdLead[];
  addColdLead: (lead: { name: string; phone: string; outreachLocation: string; notes?: string }) => void;
  promoteColdLead: (id: string) => void;
  // Gift dispatch (GIF-01..04)
  dispatchWelcomeGift: (memberId: string) => void;
  // Baptism booking (BAP-01..04)
  bookBaptismSlot: (date: string, robeSize: "S" | "M" | "L" | "XL") => void;
  // Stage 5 Department placement (BOD-01..03)
  assignMinistryDepartment: (department: string, mentor: string) => void;
  // Funnel stats
  funnelStats: {
    firstTimers: number;
    enrolledClass: number;
    completedClass: number;
    baptized: number;
    communityAssimilated: number;
  };
}

const INITIAL_MEMBER: MemberRecord = {
  id: "samuel-adebayo",
  name: "Brother Samuel Adebayo",
  phone: "+234 803 555 7890",
  email: "samuel.adebayo@example.com",
  address: "Plot 14, Maitama Extension, Abuja",
  maritalStatus: "Single",
  branch: "COZA Global — The Guzape Campus",
  source: "bus",
  pickupStop: "Area 1 Roundabout",
  busRoute: "Bus 4 (Garki / Area 1)",
  checkInStatus: "unmarked",
  // Stage 1
  classCohort: "Cohort 26",
  classModulesCompleted: 3,
  classTotalModules: 4,
  classQuizPassed: false,
  classStatus: "in_progress",
  // Stage 2
  giftStatus: "eligible",
  // Stage 3
  baptismStatus: "scheduled",
  baptismCertificateId: "COZA-BAP-2026-8492",
  baptismDate: "Saturday, Oct 24, 2026",
  // Stage 4
  zone: "Maitama Ext. Zone",
  zonalCoordinator: "Deaconess Sarah",
  zonalContacted: false,
  zonalDaysElapsed: 1,
  addedToWhatsApp: false,
  invitedToSaturdayCommunity: false,
  consecutiveMisses: 0,
};

const INITIAL_ROSTER: MemberRecord[] = [
  INITIAL_MEMBER,
  {
    id: "grace-bamidele",
    name: "Sister Grace Bamidele",
    phone: "+234 812 444 5566",
    address: "Lugbe Federal Housing, Abuja",
    maritalStatus: "Married",
    branch: "COZA Lugbe Zone",
    source: "pcu",
    checkInStatus: "unmarked",
    classCohort: "Cohort 26",
    classModulesCompleted: 4,
    classTotalModules: 4,
    classQuizPassed: true,
    classStatus: "completed",
    giftStatus: "dispatched",
    baptismStatus: "completed",
    baptismCertificateId: "COZA-BAP-2026-8104",
    baptismDate: "Saturday, Oct 17, 2026",
    zone: "Lugbe Zone 2",
    zonalCoordinator: "Bro. Tunde Alabi",
    zonalContacted: true,
    zonalDaysElapsed: 3,
    addedToWhatsApp: true,
    invitedToSaturdayCommunity: true,
    consecutiveMisses: 0,
  },
  {
    id: "joshua-martins",
    name: "Brother Joshua Martins",
    phone: "+234 802 334 9911",
    address: "Kubwa Pipeline Road, Abuja",
    maritalStatus: "Single",
    branch: "COZA North Church",
    source: "self",
    checkInStatus: "unmarked",
    classCohort: "Cohort 25",
    classModulesCompleted: 1,
    classTotalModules: 4,
    classQuizPassed: false,
    classStatus: "in_progress",
    giftStatus: "ineligible",
    baptismStatus: "not_registered",
    zone: "North Church Zone B",
    zonalCoordinator: "Elder Felix O.",
    zonalContacted: false,
    zonalDaysElapsed: 9,
    addedToWhatsApp: false,
    invitedToSaturdayCommunity: false,
    consecutiveMisses: 2,
  },
];

const INITIAL_COLD_LEADS: ColdLead[] = [
  {
    id: "lead-wuse-01",
    name: "Brother Chinedu Okafor",
    phone: "+234 814 999 1234",
    outreachLocation: "Wuse 2 Street Roadshow",
    dateCollected: "Saturday, Oct 24, 2026",
    status: "cold_lead",
    notes: "Approached by evangelism team during plaza outreach; requested prayer for career transition.",
  },
  {
    id: "lead-banex-02",
    name: "Sister Deborah Danjuma",
    phone: "+234 809 333 4455",
    outreachLocation: "Banex Plaza Activation",
    dateCollected: "Saturday, Oct 24, 2026",
    status: "cold_lead",
    notes: "First time contact; wants to join the choir.",
  },
  {
    id: "lead-maitama-03",
    name: "Brother Michael Adeleke",
    phone: "+234 803 777 8899",
    outreachLocation: "Maitama Farmers Market Hub",
    dateCollected: "Saturday, Oct 24, 2026",
    status: "cold_lead",
    notes: "Looking for a home church in Abuja after relocating from Lagos.",
  },
];

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentPersona, setCurrentPersona] = useState<PersonaRole>("bus-captain");
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState(1);
  const [activeMember, setActiveMember] = useState<MemberRecord>(INITIAL_MEMBER);
  const [roster, setRoster] = useState<MemberRecord[]>(INITIAL_ROSTER);
  const [coldLeads, setColdLeads] = useState<ColdLead[]>(INITIAL_COLD_LEADS);

  const updateActiveMember = (updates: Partial<MemberRecord>) => {
    setActiveMember((prev) => {
      const updated = { ...prev, ...updates };
      setRoster((r) => r.map((m) => (m.id === updated.id ? updated : m)));
      return updated;
    });
  };

  const addMemberToRoster = (member: MemberRecord) => {
    setRoster((prev) => [member, ...prev]);
  };

  const markAttendance = (id: string, status: "present" | "late" | "unmarked", time?: string) => {
    const recordedTime = status === "unmarked" ? undefined : time || "08:35 AM";
    setRoster((prev) =>
      prev.map((m) => (m.id === id ? { ...m, checkInStatus: status, checkInTime: recordedTime } : m))
    );
    if (activeMember.id === id) {
      setActiveMember((prev) => ({ ...prev, checkInStatus: status, checkInTime: recordedTime }));
    }
  };

  const syncOfflineQueue = () => {
    setOfflineQueueCount(0);
  };

  const addColdLead = (lead: { name: string; phone: string; outreachLocation: string; notes?: string }) => {
    const newLead: ColdLead = {
      id: `lead-${Date.now()}`,
      name: lead.name,
      phone: lead.phone,
      outreachLocation: lead.outreachLocation,
      dateCollected: "Saturday, Oct 24, 2026",
      status: "cold_lead",
      notes: lead.notes,
    };
    setColdLeads((prev) => [newLead, ...prev]);
  };

  const promoteColdLead = (id: string) => {
    const lead = coldLeads.find((l) => l.id === id);
    if (!lead) return;

    // 1. Mark as promoted in cold lead database
    setColdLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "promoted_to_guest" } : l))
    );

    // 2. Automatically create first-time guest record in PCU Foyer Attendance
    const promotedGuest: MemberRecord = {
      id: `promoted-${id}`,
      name: lead.name,
      phone: lead.phone,
      address: `Captured at ${lead.outreachLocation}`,
      maritalStatus: "Single",
      branch: "COZA Global — The Guzape Campus",
      source: "pcu",
      checkInStatus: "present",
      checkInTime: "08:52 AM",
      classCohort: "Cohort 26",
      classModulesCompleted: 0,
      classTotalModules: 4,
      classQuizPassed: false,
      classStatus: "not_started",
      giftStatus: "ineligible",
      baptismStatus: "not_registered",
      zone: "Maitama Ext. Zone",
      zonalCoordinator: "Deaconess Sarah",
      zonalContacted: false,
      zonalDaysElapsed: 0,
      addedToWhatsApp: false,
      invitedToSaturdayCommunity: false,
      consecutiveMisses: 0,
    };

    addMemberToRoster(promotedGuest);
  };

  const dispatchWelcomeGift = (memberId: string) => {
    const dispatchId = `COZA-GIFT-${Math.floor(1000 + Math.random() * 9000)}`;
    setRoster((prev) =>
      prev.map((m) =>
        m.id === memberId ? { ...m, giftStatus: "dispatched", giftDispatchId: dispatchId } : m
      )
    );
    if (activeMember.id === memberId) {
      setActiveMember((prev) => ({
        ...prev,
        giftStatus: "dispatched",
        giftDispatchId: dispatchId,
      }));
    }
  };

  const bookBaptismSlot = (date: string, robeSize: "S" | "M" | "L" | "XL") => {
    const certId = `COZA-BAP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    updateActiveMember({
      baptismStatus: "completed",
      baptismDate: date,
      baptismRobeSize: robeSize,
      baptismCertificateId: certId,
    });
  };

  const assignMinistryDepartment = (department: string, mentor: string) => {
    updateActiveMember({
      department,
      spiritualMentor: mentor,
    });
  };

  const funnelStats = {
    firstTimers: 1420 + (activeMember.checkInStatus !== "unmarked" ? 1 : 0),
    enrolledClass: 1080 + (activeMember.classStatus !== "not_started" ? 1 : 0),
    completedClass: 810 + (activeMember.classStatus === "completed" ? 1 : 0),
    baptized: 675 + (activeMember.baptismStatus === "completed" ? 1 : 0),
    communityAssimilated: 530 + (activeMember.addedToWhatsApp ? 1 : 0),
  };

  return (
    <DemoContext.Provider
      value={{
        currentPersona,
        setCurrentPersona,
        isOffline,
        setIsOffline,
        offlineQueueCount,
        syncOfflineQueue,
        activeMember,
        updateActiveMember,
        roster,
        addMemberToRoster,
        markAttendance,
        coldLeads,
        addColdLead,
        promoteColdLead,
        dispatchWelcomeGift,
        bookBaptismSlot,
        assignMinistryDepartment,
        funnelStats,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
