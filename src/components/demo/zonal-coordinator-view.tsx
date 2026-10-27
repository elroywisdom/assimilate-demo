"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  LayerCard,
  Badge,
  Checkbox,
  Dialog,
  cn,
  Icons,
} from "@/design-system";
import { useDemo } from "@/context/demo-context";
import {
  MissedServiceAlertCard,
  DepartmentPlacementCard,
} from "@/components/coza";

interface ZonalMember {
  id: string;
  name: string;
  phone: string;
  address: string;
  hoursElapsed: number;
  contacted: boolean;
  addedToWhatsApp: boolean;
  invitedToSaturday: boolean;
  notes?: string;
  department?: string;
  mentor?: string;
}

export function ZonalCoordinatorView() {
  const {
    activeMember,
    updateActiveMember,
    roster,
    coldLeads,
    addColdLead,
    assignMinistryDepartment,
    setCurrentPersona,
  } = useDemo();

  const [activeZone] = useState("Maitama Extension");
  const [activeFilter, setActiveFilter] = useState<"all" | "sla" | "saturday" | "absence">("all");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [callLogModalOpen, setCallLogModalOpen] = useState(false);
  const [callOutcome, setCallOutcome] = useState("Warmly welcomed; excited for water baptism and Saturday community");
  const [prayerRequest, setPrayerRequest] = useState("Career breakthrough in civil service");

  // Saturday Outreach Contact logger
  const [streetName, setStreetName] = useState("");
  const [streetPhone, setStreetPhone] = useState("");
  const [streetLocation, setStreetLocation] = useState("Maitama Farmers Market Hub");
  const [outreachSuccess, setOutreachSuccess] = useState(false);

  // Zone souls list
  const [zoneMembers, setZoneMembers] = useState<ZonalMember[]>([
    {
      id: "samuel-adebayo",
      name: activeMember.name,
      phone: activeMember.phone,
      address: activeMember.address,
      hoursElapsed: 18,
      contacted: activeMember.zonalContacted,
      addedToWhatsApp: activeMember.addedToWhatsApp,
      invitedToSaturday: activeMember.invitedToSaturdayCommunity,
      notes: "Newly baptized soul from Bus 4 Garki route. Eager to volunteer in choir.",
      department: activeMember.department,
      mentor: activeMember.spiritualMentor,
    },
    {
      id: "blessing-udoh",
      name: "Sister Blessing Udoh",
      phone: "+234 802 111 2233",
      address: "Maitama Shopping Complex Hub",
      hoursElapsed: 36,
      contacted: true,
      addedToWhatsApp: true,
      invitedToSaturday: false,
      notes: "Interested in e-Kids Children Church volunteering.",
      department: "e-Kids Children Church",
      mentor: "Deaconess Sarah",
    },
    {
      id: "emmanuel-kalu",
      name: "Brother Emmanuel Kalu",
      phone: "+234 813 444 9900",
      address: "Ministers Hill, Maitama",
      hoursElapsed: 52, // Overdue SLA (>48h)
      contacted: false,
      addedToWhatsApp: false,
      invitedToSaturday: false,
      notes: "First timer from Sunday 2nd service; needs follow-up.",
    },
  ]);

  const [selectedSoulId, setSelectedSoulId] = useState<string>("samuel-adebayo");
  const selectedSoul = zoneMembers.find((m) => m.id === selectedSoulId) || zoneMembers[0];

  const atRiskMember = roster.find((m) => m.consecutiveMisses >= 2);

  const toggleChecklist = (
    memberId: string,
    field: "contacted" | "addedToWhatsApp" | "invitedToSaturday"
  ) => {
    setZoneMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextVal = !m[field];
          if (memberId === activeMember.id || m.name === activeMember.name) {
            updateActiveMember({
              ...(field === "contacted" && { zonalContacted: nextVal }),
              ...(field === "addedToWhatsApp" && { addedToWhatsApp: nextVal }),
              ...(field === "invitedToSaturday" && { invitedToSaturdayCommunity: nextVal }),
            });
          }
          return { ...m, [field]: nextVal };
        }
        return m;
      })
    );
  };

  const handleSendWhatsAppSimulation = () => {
    toggleChecklist(selectedSoul.id, "contacted");
    toggleChecklist(selectedSoul.id, "addedToWhatsApp");
    setWhatsAppModalOpen(false);
  };

  const handleSaveCallOutcome = () => {
    setZoneMembers((prev) =>
      prev.map((m) =>
        m.id === selectedSoul.id
          ? {
              ...m,
              contacted: true,
              notes: `${m.notes || ""} [Call Log]: ${callOutcome} | Prayer: ${prayerRequest}`,
            }
          : m
      )
    );
    if (selectedSoul.id === activeMember.id) {
      updateActiveMember({ zonalContacted: true });
    }
    setCallLogModalOpen(false);
  };

  const handleAddOutreachLead = () => {
    if (!streetName || !streetPhone) return;
    addColdLead({
      name: streetName,
      phone: streetPhone,
      outreachLocation: streetLocation,
      notes: "Captured during Saturday neighborhood street roadshow.",
    });
    setOutreachSuccess(true);
    setStreetName("");
    setStreetPhone("");
    setTimeout(() => setOutreachSuccess(false), 4000);
  };

  const filteredMembers = zoneMembers.filter((m) => {
    if (activeFilter === "sla") return !m.contacted;
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-5 max-w-6xl mx-auto">
      {/* Top Narrative Context Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-kumo-line bg-kumo-elevated flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="purple" className="text-xs">Act 3: Zonal Community & Pastoral Care</Badge>
            <span className="font-semibold text-xs sm:text-sm text-kumo-default">
              Deaconess Sarah • {activeZone} Coordinator
            </span>
          </div>
          <p className="text-xs text-kumo-subtle leading-relaxed">
            Guarantees pastoral accountability via automated 48-hour SLA queues, pre-scripted WhatsApp pastoral welcomes, Saturday community hangouts, and Stage 5 COZA Body placement.
          </p>
        </div>

        <Dialog.Root open={reportModalOpen} onOpenChange={setReportModalOpen}>
          <Dialog.Trigger
            render={(p) => (
              <Button {...p} variant="primary" size="sm" className="gap-1.5 shrink-0 w-full sm:w-auto justify-center text-xs">
                <Icons.FileText className="w-4 h-4" />
                <span>Submit Weekly Report</span>
              </Button>
            )}
          />
          <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
            <Dialog.Title className="text-base font-bold text-kumo-default">
              Saturday Evangelism & Zonal Report
            </Dialog.Title>
            <Dialog.Description className="text-xs text-kumo-subtle">
              {activeZone} • Submitted weekly to Branch Pastor
            </Dialog.Description>

            <div className="p-3.5 sm:p-4 rounded-xl bg-kumo-recessed border border-kumo-hairline space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Assigned Souls Contacted:</span>
                <span className="font-semibold text-kumo-default">2 of 3 (67%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Saturday Outreach Contacts:</span>
                <span className="font-semibold text-kumo-default">{coldLeads.length} New Leads Logged</span>
              </div>
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Workers Deployed on Field:</span>
                <span className="font-semibold text-kumo-default">14 Evangelism Workers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Members Flagged for Absence:</span>
                <span className="font-semibold text-rose-400">1 Member (Care Call Dispatched)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close render={(p) => <Button {...p} variant="outline" size="sm">Cancel</Button>} />
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setReportSubmitted(true);
                  setReportModalOpen(false);
                }}
              >
                Submit Report to Leadership
              </Button>
            </div>
          </Dialog>
        </Dialog.Root>
      </div>

      {reportSubmitted && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <Icons.CheckCircle weight="fill" className="w-4 h-4 shrink-0" />
            <span>Weekly report successfully transmitted to Central Branch Administration.</span>
          </div>
          <Button variant="ghost" size="xs" onClick={() => setReportSubmitted(false)}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Pastoral SLA Health Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <span className="text-[11px] text-kumo-subtle block font-medium">Zone Active Souls</span>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-default font-mono">
            {zoneMembers.length} Souls
          </p>
          <span className="text-[10px] text-kumo-brand font-medium">Maitama Ext. Zone</span>
        </div>

        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <span className="text-[11px] text-kumo-subtle block font-medium">48-Hour SLA Compliance</span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
            67%
          </p>
          <span className="text-[10px] text-kumo-subtle">Target: ≥ 90% (PRD ZON-01)</span>
        </div>

        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <span className="text-[11px] text-kumo-subtle block font-medium">Overdue Attention (&gt;48h)</span>
          <p className="text-xl sm:text-2xl font-extrabold text-rose-400 font-mono">
            1 Soul
          </p>
          <span className="text-[10px] text-rose-400 font-medium">Auto-Escalation Flagged</span>
        </div>

        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <span className="text-[11px] text-kumo-subtle block font-medium">Saturday Street Leads</span>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-default font-mono">
            {coldLeads.length} Leads
          </p>
          <span className="text-[10px] text-kumo-brand font-medium">Ready for Sunday Influx</span>
        </div>
      </div>

      {/* Dual-Column Pastoral Command Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* LEFT COLUMN: Soul Priority Queue & Navigation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <LayerCard className="p-3.5 sm:p-4 space-y-3 border border-kumo-line">
            <div className="flex items-center justify-between pb-2 border-b border-kumo-hairline">
              <span className="text-xs font-bold text-kumo-default">Pastoral Triage Queue</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all",
                    activeFilter === "all"
                      ? "bg-kumo-elevated text-kumo-default font-bold shadow-xs"
                      : "text-kumo-subtle hover:text-kumo-default"
                  )}
                >
                  All ({zoneMembers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("sla")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all",
                    activeFilter === "sla"
                      ? "bg-kumo-elevated text-rose-400 font-bold shadow-xs"
                      : "text-kumo-subtle hover:text-kumo-default"
                  )}
                >
                  Needs Call
                </button>
              </div>
            </div>

            {/* List of Member Cards */}
            <div className="space-y-2">
              {filteredMembers.map((member) => {
                const isSelected = member.id === selectedSoulId;
                const isOverdue = member.hoursElapsed > 48 && !member.contacted;

                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setSelectedSoulId(member.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col space-y-2",
                      isSelected
                        ? "border-kumo-brand bg-kumo-elevated ring-1 ring-kumo-brand shadow-xs"
                        : "border-kumo-hairline bg-kumo-base hover:bg-kumo-elevated"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-kumo-default">{member.name}</div>
                        <div className="text-[11px] text-kumo-subtle truncate max-w-[200px]">{member.address}</div>
                      </div>

                      <Badge
                        variant={member.contacted ? "success" : isOverdue ? "error" : "warning"}
                        className="text-[10px] shrink-0"
                      >
                        {member.contacted
                          ? "Contacted ✓"
                          : isOverdue
                          ? `Overdue (${member.hoursElapsed}h)`
                          : `${member.hoursElapsed}h / 48h`}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-kumo-hairline text-kumo-inactive">
                      <span>{member.phone}</span>
                      <span className="text-kumo-brand font-medium">Inspect Profile →</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </LayerCard>

          {/* Saturday Roadshow Lead Logger (PRD EVA-01) */}
          <LayerCard className="p-4 space-y-3 border border-kumo-line">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.UserPlus className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-kumo-default">Log Saturday Street Lead</span>
              </div>
              <Badge variant="purple">EVA-01</Badge>
            </div>

            <p className="text-[11px] text-kumo-subtle">
              Street outreach contact collection. Saved leads auto-reconcile when they walk into church on Sunday.
            </p>

            <div className="space-y-2.5">
              <Input
                placeholder="Full Name (e.g. Sister Mercy)"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                aria-label="Street lead full name"
              />
              <Input
                placeholder="Phone (+234 800 000 0000)"
                value={streetPhone}
                onChange={(e) => setStreetPhone(e.target.value)}
                aria-label="Street lead phone number"
              />
              <Input
                placeholder="Location (e.g. Maitama Farmers Market)"
                value={streetLocation}
                onChange={(e) => setStreetLocation(e.target.value)}
                aria-label="Street lead outreach location"
              />

              <Button
                variant="primary"
                size="sm"
                onClick={handleAddOutreachLead}
                className="w-full justify-center text-xs gap-1.5"
              >
                <Icons.Check className="w-4 h-4" />
                <span>Save Evangelism Contact</span>
              </Button>
            </div>

            {outreachSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
                <Icons.CheckCircle weight="fill" className="w-4 h-4 shrink-0" />
                <span>Contact recorded in Central Evangelism Database.</span>
              </div>
            )}
          </LayerCard>

          {/* Absence Watchlist Alert */}
          {atRiskMember && (
            <MissedServiceAlertCard
              memberName={atRiskMember.name}
              phone={atRiskMember.phone}
              consecutiveMisses={atRiskMember.consecutiveMisses}
              lastAttendedService="Sunday 1st Service, 2 Weeks Ago"
              zoneName={atRiskMember.zone}
              coordinatorName={atRiskMember.zonalCoordinator}
              onCallMember={() => alert(`Care call initiated for ${atRiskMember.name}`)}
            />
          )}
        </div>

        {/* RIGHT COLUMN: Active Soul Care Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <LayerCard className="p-4 sm:p-5 space-y-4 border border-kumo-line">
            {/* Header with Selected Member Identity */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-kumo-hairline">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-base text-kumo-default">{selectedSoul.name}</h3>
                  <Badge variant="blue" className="text-xs">{activeZone}</Badge>
                </div>
                <div className="text-xs text-kumo-subtle mt-0.5">
                  Phone: <strong className="text-kumo-default">{selectedSoul.phone}</strong> • {selectedSoul.address}
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setWhatsAppModalOpen(true)}
                  className="gap-1.5 text-xs text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                >
                  <Icons.ChatCircleDots className="w-4 h-4" />
                  <span>WhatsApp Welcome</span>
                </Button>

                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setCallLogModalOpen(true)}
                  className="gap-1.5 text-xs text-kumo-brand"
                >
                  <Icons.Phone className="w-4 h-4" />
                  <span>Log Call</span>
                </Button>
              </div>
            </div>

            {/* Discipleship Milestones Pipeline */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-kumo-default uppercase tracking-wide">
                Spiritual Assimilation Milestones
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-1">
                  <span className="text-[10px] text-kumo-subtle block">1. Transit</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Icons.Check className="w-3.5 h-3.5" /> Bus 4 Boarded
                  </span>
                </div>
                <div className="p-2.5 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-1">
                  <span className="text-[10px] text-kumo-subtle block">2. Foyer Check-in</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Icons.Check className="w-3.5 h-3.5" /> Present 08:35
                  </span>
                </div>
                <div className="p-2.5 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-1">
                  <span className="text-[10px] text-kumo-subtle block">3. Believers&apos; Class</span>
                  <span className="font-semibold text-kumo-brand flex items-center gap-1">
                    <Icons.Sparkle className="w-3.5 h-3.5" /> 3 of 4 Done
                  </span>
                </div>
                <div className="p-2.5 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-1">
                  <span className="text-[10px] text-kumo-subtle block">4. Water Baptism</span>
                  <span className="font-semibold text-purple-400 flex items-center gap-1">
                    <Icons.ShieldCheck className="w-3.5 h-3.5" /> Scheduled
                  </span>
                </div>
              </div>
            </div>

            {/* Pastoral Checklist */}
            <div className="p-3.5 rounded-xl bg-kumo-recessed border border-kumo-hairline space-y-2.5 text-xs">
              <span className="font-semibold text-kumo-default block">Pastoral Care Responsibilities:</span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={selectedSoul.contacted}
                    onCheckedChange={() => toggleChecklist(selectedSoul.id, "contacted")}
                  />
                  <span className={cn(selectedSoul.contacted ? "text-kumo-default line-through" : "text-kumo-default")}>
                    Conduct 48-Hour Pastoral Welcome Call
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={selectedSoul.addedToWhatsApp}
                    onCheckedChange={() => toggleChecklist(selectedSoul.id, "addedToWhatsApp")}
                  />
                  <span className={cn(selectedSoul.addedToWhatsApp ? "text-kumo-default line-through" : "text-kumo-default")}>
                    Add to Maitama Extension Zone WhatsApp Community Hub
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={selectedSoul.invitedToSaturday}
                    onCheckedChange={() => toggleChecklist(selectedSoul.id, "invitedToSaturday")}
                  />
                  <span className={cn(selectedSoul.invitedToSaturday ? "text-kumo-default line-through" : "text-kumo-default")}>
                    Invite to Saturday Neighborhood Fellowship (Topic: Kingdom Marketplace Dominion)
                  </span>
                </label>
              </div>
            </div>

            {/* Pastoral Notes & Prayer */}
            {selectedSoul.notes && (
              <div className="p-3 rounded-xl border border-kumo-hairline bg-kumo-base text-xs space-y-1">
                <span className="font-semibold text-kumo-subtle block">Pastoral Record Notes:</span>
                <p className="text-kumo-default leading-relaxed italic">{selectedSoul.notes}</p>
              </div>
            )}

            {/* Stage 5: Department Placement Card */}
            <DepartmentPlacementCard
              memberName={selectedSoul.name}
              currentDepartment={selectedSoul.department || activeMember.department}
              currentMentor={selectedSoul.mentor || activeMember.spiritualMentor}
              onSelectPlacement={(dept, mentor) => {
                assignMinistryDepartment(dept, mentor);
                setZoneMembers((prev) =>
                  prev.map((m) =>
                    m.id === selectedSoul.id ? { ...m, department: dept, mentor } : m
                  )
                );
              }}
            />

            {/* Navigation Transition */}
            <div className="pt-3 border-t border-kumo-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
              <span className="text-kumo-subtle text-center sm:text-left">
                Zonal care active. Senior Pastors can monitor global church assimilation health.
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPersona("executive-dashboard")}
                className="gap-1.5 w-full sm:w-auto justify-center"
              >
                <span>View Senior Pastor Analytics</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </LayerCard>
        </div>
      </div>

      {/* WhatsApp Welcome Message Modal */}
      <Dialog.Root open={whatsAppModalOpen} onOpenChange={setWhatsAppModalOpen}>
        <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
          <Dialog.Title className="text-base font-bold text-kumo-default flex items-center gap-2">
            <Icons.ChatCircleDots className="w-5 h-5 text-emerald-400" />
            <span>Official Pastoral Welcome Script</span>
          </Dialog.Title>
          <Dialog.Description className="text-xs text-kumo-subtle">
            Pre-approved message template for new souls assigned to {activeZone}.
          </Dialog.Description>

          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-kumo-default space-y-2 leading-relaxed">
            <p>
              &ldquo;Good day <strong>{selectedSoul.name}</strong>! This is Deaconess Sarah from COZA Maitama Extension Zone.
            </p>
            <p>
              The Senior Pastor, Rev. Biodun Fatoyinbo, Pastor Modele, and our entire church family were delighted to have you in service today! We celebrate the supernatural hand of God upon your life.
            </p>
            <p>
              I am reaching out to personally welcome you, share this week&apos;s devotionals, and check if you have any prayer requests we can bring before the Lord together. We also warmly invite you to our Saturday Community Hangout at Maitama Farmers Market at 10:00 AM.
            </p>
            <p>
              God bless you richly!&rdquo;
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Dialog.Close render={(p) => <Button {...p} variant="outline" size="sm">Cancel</Button>} />
            <Button
              variant="primary"
              size="sm"
              onClick={handleSendWhatsAppSimulation}
              className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
            >
              <Icons.Check className="w-4 h-4" />
              <span>Simulate Send & Check Off SLA</span>
            </Button>
          </div>
        </Dialog>
      </Dialog.Root>

      {/* Call Outcome Log Modal */}
      <Dialog.Root open={callLogModalOpen} onOpenChange={setCallLogModalOpen}>
        <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
          <Dialog.Title className="text-base font-bold text-kumo-default">
            Log Pastoral Call Outcome
          </Dialog.Title>
          <Dialog.Description className="text-xs text-kumo-subtle">
            Document prayer needs and spiritual welfare for {selectedSoul.name}.
          </Dialog.Description>

          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-kumo-subtle block">Call Status:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {[
                  "Warmly welcomed; excited for baptism",
                  "Requested pastoral counseling",
                  "Invited to Saturday Fellowship",
                  "Needs follow-up visit",
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setCallOutcome(status)}
                    className={cn(
                      "p-2 rounded-lg border text-left text-xs transition-all cursor-pointer",
                      callOutcome === status
                        ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default font-semibold"
                        : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Specific Prayer Request"
              placeholder="e.g. Job interview on Thursday, housing stability"
              value={prayerRequest}
              onChange={(e) => setPrayerRequest(e.target.value)}
              aria-label="Pastoral prayer request"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Dialog.Close render={(p) => <Button {...p} variant="outline" size="sm">Cancel</Button>} />
            <Button variant="primary" size="sm" onClick={handleSaveCallOutcome}>
              Save to Pastoral Record
            </Button>
          </div>
        </Dialog>
      </Dialog.Root>
    </div>
  );
}
