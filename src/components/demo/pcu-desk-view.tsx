"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  LayerCard,
  Badge,
  Dialog,
  cn,
  Icons,
} from "@/design-system";
import { useDemo } from "@/context/demo-context";
import {
  DuplicateAttendanceAlert,
  AttendanceRosterItem,
} from "@/components/coza";

export function PcuDeskView() {
  const {
    roster,
    markAttendance,
    addMemberToRoster,
    coldLeads,
    promoteColdLead,
    dispatchWelcomeGift,
    setCurrentPersona,
    activeMember,
  } = useDemo();

  const [activeTab, setActiveTab] = useState<"all" | "reconcile" | "gifts" | "late">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [walkInModalOpen, setWalkInModalOpen] = useState(false);
  const [qrScanSuccess, setQrScanSuccess] = useState<string | null>(null);
  const [manifestBatchSynced, setManifestBatchSynced] = useState(false);
  const [giftModalMember, setGiftModalMember] = useState<{ id: string; name: string; zone: string } | null>(null);

  // New Walk-In State
  const [walkInName, setWalkInName] = useState("");
  const [walkInPhone, setWalkInPhone] = useState("");
  const [walkInZone, setWalkInZone] = useState("Maitama Extension");

  const [duplicateWarningMember, setDuplicateWarningMember] = useState<{
    name: string;
    source: "Bus Captain" | "PCU Service Desk" | "Self Check-In";
    time: string;
    route?: string;
  } | null>(null);

  const busMembers = roster.filter((m) => m.source === "bus");
  const giftEligibleMembers = roster.filter(
    (m) => m.giftStatus === "eligible" || m.giftStatus === "dispatched" || m.classStatus === "completed"
  );

  const totalPresent = roster.filter(
    (m) => m.checkInStatus === "present" || m.checkInStatus === "late"
  ).length;
  const lateCount = roster.filter((m) => m.checkInStatus === "late").length;

  const filteredRoster = roster.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery);

    if (!matchesSearch) return false;
    if (activeTab === "reconcile") return m.source === "bus";
    if (activeTab === "gifts") {
      return m.giftStatus === "eligible" || m.giftStatus === "dispatched" || m.classStatus === "completed";
    }
    if (activeTab === "late") return m.checkInStatus === "late" || m.checkInStatus === "unmarked";
    return true;
  });

  const handlePcuMarkAttempt = (id: string) => {
    const member = roster.find((m) => m.id === id);
    if (!member) return;

    // Check for duplicate check-in collision
    if (member.checkInStatus === "present" && member.source === "bus") {
      setDuplicateWarningMember({
        name: member.name,
        source: "Bus Captain",
        time: member.checkInTime || "08:35 AM",
        route: member.busRoute || "Bus 4 (Garki / Area 1)",
      });
      return;
    }

    markAttendance(id, "present", "09:05 AM");
    setDuplicateWarningMember(null);
  };

  const handleSimulateQrScan = () => {
    const targetMember = roster.find((m) => m.name.includes("Samuel Adebayo")) || roster[0];
    if (targetMember) {
      if (targetMember.checkInStatus === "present" && targetMember.source === "bus") {
        setDuplicateWarningMember({
          name: targetMember.name,
          source: "Bus Captain",
          time: targetMember.checkInTime || "08:35 AM",
          route: targetMember.busRoute || "Bus 4 (Garki / Area 1)",
        });
      } else {
        markAttendance(targetMember.id, "present", "09:12 AM");
        setQrScanSuccess(
          `QR Code COZA-${targetMember.id.slice(0, 5).toUpperCase()} Scanned: Verified attendance for ${targetMember.name}`
        );
        setTimeout(() => setQrScanSuccess(null), 4000);
      }
    }
  };

  const handleReconcileBusBatch = () => {
    busMembers.forEach((m) => {
      markAttendance(m.id, "present", "08:45 AM");
    });
    setManifestBatchSynced(true);
    setTimeout(() => setManifestBatchSynced(false), 5000);
  };

  const handleCreateWalkIn = () => {
    if (!walkInName) return;
    const newGuest = {
      id: `walkin-${Date.now()}`,
      name: walkInName,
      phone: walkInPhone || "+234 812 000 0000",
      address: "Guzape Foyer Walk-In",
      maritalStatus: "Single" as const,
      branch: "COZA Global — The Guzape Campus",
      source: "pcu" as const,
      checkInStatus: "present" as const,
      checkInTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      classCohort: "Cohort 26",
      classModulesCompleted: 0,
      classTotalModules: 4,
      classQuizPassed: false,
      classStatus: "not_started" as const,
      giftStatus: "ineligible" as const,
      baptismStatus: "not_registered" as const,
      zone: walkInZone,
      zonalCoordinator: "Deaconess Sarah",
      zonalContacted: false,
      zonalDaysElapsed: 0,
      addedToWhatsApp: false,
      invitedToSaturdayCommunity: false,
      consecutiveMisses: 0,
    };

    addMemberToRoster(newGuest);
    setWalkInName("");
    setWalkInPhone("");
    setWalkInModalOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-6xl mx-auto">
      {/* Top Narrative Context Header */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-kumo-line bg-kumo-elevated flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="purple" className="text-xs">Act 1B: PCU Foyer Command Desk</Badge>
            <span className="font-semibold text-xs sm:text-sm text-kumo-default">
              Desk 2 • Guzape Campus Main Entrance
            </span>
          </div>
          <p className="text-xs text-kumo-subtle leading-relaxed">
            High-speed foyer reconciliation: batch-verifies incoming transit manifests, prevents duplicate check-ins, promotes Saturday roadshow leads, and dispatches welcome packs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-center shrink-0">
          <Button
            variant="outline"
            size="xs"
            onClick={handleSimulateQrScan}
            className="text-xs flex-1 sm:flex-none justify-center gap-1.5"
            aria-label="Simulate QR Scan"
          >
            <Icons.QrCode className="w-3.5 h-3.5 text-kumo-brand" />
            <span>Simulate QR Pass Scan</span>
          </Button>

          <Dialog.Root open={walkInModalOpen} onOpenChange={setWalkInModalOpen}>
            <Dialog.Trigger
              render={(p) => (
                <Button
                  {...p}
                  variant="primary"
                  size="sm"
                  className="gap-1.5 flex-1 sm:flex-none justify-center text-xs"
                >
                  <Icons.UserPlus className="w-3.5 h-3.5" />
                  <span>+ Walk-In Guest</span>
                </Button>
              )}
            />
            <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
              <Dialog.Title className="text-base font-bold text-kumo-default">
                Register Physical Foyer Walk-In
              </Dialog.Title>
              <Dialog.Description className="text-xs text-kumo-subtle">
                Captured at PCU Service Desk for first-time visitors with no smartphone.
              </Dialog.Description>

              <div className="space-y-3">
                <Input
                  label="Full Name"
                  placeholder="e.g. Sister Grace Obi"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  aria-label="Full name of walk in guest"
                />

                <Input
                  label="Phone Number"
                  placeholder="+234 800 000 0000"
                  value={walkInPhone}
                  onChange={(e) => setWalkInPhone(e.target.value)}
                  aria-label="Phone number of walk in guest"
                />

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-kumo-subtle block">Residential Zone</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {["Maitama Extension", "Garki Zone 3", "Wuse 2 Hub", "Guzape Hills"].map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => setWalkInZone(z)}
                        className={cn(
                          "py-1.5 px-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer",
                          walkInZone === z
                            ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default font-semibold"
                            : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                        )}
                      >
                        {z}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Dialog.Close render={(p) => <Button {...p} variant="outline" size="sm">Cancel</Button>} />
                <Button variant="primary" size="sm" onClick={handleCreateWalkIn}>
                  Check In & Issue Physical Badge
                </Button>
              </div>
            </Dialog>
          </Dialog.Root>
        </div>
      </div>

      {/* Live Foyer Attendance Reconciler Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-kumo-subtle font-medium">Total In Sanctuary</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-default font-mono">
            {1420 + totalPresent}
          </p>
          <span className="text-[10px] text-emerald-400 font-medium">● Live 1st Service Influx</span>
        </div>

        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-kumo-subtle font-medium">Bus 4 Transit Manifest</span>
            <Badge variant="blue" className="text-[10px] py-0">Garki</Badge>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-brand font-mono">
            {busMembers.filter((m) => m.checkInStatus === "present").length} / {busMembers.length}
          </p>
          <span className="text-[10px] text-kumo-subtle">Transit Arrivals Reconciled</span>
        </div>

        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-kumo-subtle font-medium">Welcome Gift Desk</span>
            <Badge variant="purple" className="text-[10px] py-0">Parity</Badge>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-default font-mono">
            {giftEligibleMembers.length} Ready
          </p>
          <span className="text-[10px] text-kumo-subtle">Boxes Prepared in Lounge</span>
        </div>

        <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-kumo-subtle font-medium">Late Check-In Queue</span>
            <Badge variant="orange" className="text-[10px] py-0">Active</Badge>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">
            {lateCount + 14}
          </p>
          <span className="text-[10px] text-amber-400 font-medium">Sermon Window Check-in</span>
        </div>
      </div>

      {/* Notifications / Feedback */}
      {qrScanSuccess && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Icons.CheckCircle weight="fill" className="w-4 h-4 shrink-0" />
            <span>{qrScanSuccess}</span>
          </div>
          <Button variant="ghost" size="xs" onClick={() => setQrScanSuccess(null)}>
            Dismiss
          </Button>
        </div>
      )}

      {manifestBatchSynced && (
        <div className="p-3.5 rounded-xl border border-kumo-brand/30 bg-kumo-brand/10 text-kumo-brand text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Icons.Bus className="w-4 h-4 shrink-0" />
            <span>Bus 4 Transit Manifest Reconciled: All 18 passengers synced to Sanctuary Attendance.</span>
          </div>
          <Button variant="ghost" size="xs" onClick={() => setManifestBatchSynced(false)}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Duplicate Attendance Conflict Handling */}
      {duplicateWarningMember && (
        <div className="space-y-2">
          <DuplicateAttendanceAlert
            memberName={duplicateWarningMember.name}
            originalSource={duplicateWarningMember.source}
            originalTime={duplicateWarningMember.time}
            busRoute={duplicateWarningMember.route}
            onDismiss={() => setDuplicateWarningMember(null)}
          />
          <div className="p-3 rounded-xl bg-kumo-elevated border border-kumo-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
            <span className="text-kumo-subtle">
              System verified: Attendance was already logged via <strong>{duplicateWarningMember.source}</strong> at {duplicateWarningMember.time}.
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => {
                  alert(`Printed Foyer Name Badge for ${duplicateWarningMember.name}. No duplicate record created.`);
                  setDuplicateWarningMember(null);
                }}
              >
                Print Foyer Badge Only
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setDuplicateWarningMember(null)}
              >
                Acknowledge & Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2-Column High-Throughput Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* LEFT COLUMN: Fast Influx & Reconciliation Stations (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Station 1: Incoming Bus Manifest Batch Reconciler */}
          <LayerCard className="p-4 space-y-3 border border-kumo-line">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.Bus className="w-4 h-4 text-kumo-brand" />
                <span className="text-xs font-bold text-kumo-default">Incoming Bus Manifest</span>
              </div>
              <Badge variant="blue">PRD BUS-04</Badge>
            </div>

            <div className="p-3 rounded-xl bg-kumo-recessed border border-kumo-hairline space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Route:</span>
                <span className="font-semibold text-kumo-default">Bus 4 • Garki / Area 1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Captain:</span>
                <span className="text-kumo-default">Bro. Stephen (Transit Marshal)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Status:</span>
                <span className="font-medium text-emerald-400">Arrived at Foyer (08:42 AM)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Boarded Passengers:</span>
                <span className="font-bold text-kumo-default font-mono">18 Souls</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleReconcileBusBatch}
              className="w-full justify-center gap-1.5 text-xs"
            >
              <Icons.CheckCircle className="w-4 h-4" />
              <span>Bulk-Reconcile Bus 4 to Sanctuary</span>
            </Button>
          </LayerCard>

          {/* Station 2: Saturday Evangelism Lead Direct Converter (PRD EVA-02) */}
          <LayerCard className="p-4 space-y-3 border border-kumo-line">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.Users className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-kumo-default">Saturday Roadshow Leads</span>
              </div>
              <Badge variant="purple">PRD EVA-02</Badge>
            </div>
            <p className="text-[11px] text-kumo-subtle">
              Street outreach contacts collected yesterday. Click to promote immediately upon foyer arrival:
            </p>

            <div className="space-y-2">
              {coldLeads.slice(0, 3).map((lead) => (
                <div
                  key={lead.id}
                  className="p-2.5 rounded-xl border border-kumo-hairline bg-kumo-base flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-kumo-default truncate">{lead.name}</div>
                    <div className="text-[10px] text-kumo-subtle truncate">
                      {lead.outreachLocation} • {lead.phone}
                    </div>
                  </div>

                  {lead.status === "promoted_to_guest" ? (
                    <Badge variant="green" className="text-[10px] shrink-0">Promoted ✓</Badge>
                  ) : (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => promoteColdLead(lead.id)}
                      className="text-[10px] shrink-0 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                    >
                      Promote to Guest
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </LayerCard>

          {/* Quick Simulation Helper */}
          <div className="p-3.5 rounded-xl border border-kumo-hairline bg-kumo-base text-xs space-y-2">
            <span className="font-semibold text-kumo-default block">Foyer Staff Quick Actions</span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => setSearchQuery("Samuel Adebayo")}
                className="justify-center text-xs"
              >
                Find &ldquo;Samuel Adebayo&rdquo;
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("gifts");
                }}
                className="justify-center text-xs text-kumo-brand"
              >
                View Gift Desk Queue
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Foyer Queue & Roster (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <LayerCard className="p-3.5 sm:p-5 space-y-4">
            {/* Triage Tabs & Search Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
                    activeTab === "all"
                      ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                      : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
                  )}
                >
                  All Foyer ({roster.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reconcile")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
                    activeTab === "reconcile"
                      ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                      : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
                  )}
                >
                  Bus 4 Manifest ({busMembers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("gifts")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
                    activeTab === "gifts"
                      ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                      : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
                  )}
                >
                  Welcome Gift Desk ({giftEligibleMembers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("late")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
                    activeTab === "late"
                      ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                      : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
                  )}
                >
                  Late Queue
                </button>
              </div>
            </div>

            {/* Accessible Search Input */}
            <Input
              placeholder="Search attendee by name, phone, or stop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search by attendee name or phone number"
            />

            {/* Member Roster List */}
            <div className="space-y-2 sm:space-y-2.5">
              {filteredRoster.map((member) => (
                <div key={member.id} className="space-y-1">
                  <AttendanceRosterItem
                    id={member.id}
                    name={member.name}
                    phone={member.phone}
                    source={member.source}
                    pickupStop={member.pickupStop}
                    status={member.checkInStatus}
                    checkInTime={member.checkInTime}
                    onMarkPresent={() => handlePcuMarkAttempt(member.id)}
                    onMarkLate={(id) => markAttendance(id, "late", "10:15 AM")}
                  />

                  {/* Gift Desk Actions if in Gifts Tab or Eligible */}
                  {(activeTab === "gifts" || member.giftStatus === "eligible") && (
                    <div className="ml-4 p-2.5 rounded-xl bg-kumo-elevated border border-kumo-hairline flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Icons.Gift className="w-4 h-4 text-purple-400" />
                        <span className="text-kumo-default">
                          {member.giftStatus === "dispatched"
                            ? `Welcome Pack Dispatched (${member.giftDispatchId || "Box #419"})`
                            : "Eligible for Welcome Box Parity Pack"}
                        </span>
                      </div>

                      {member.giftStatus !== "dispatched" && (
                        <Button
                          variant="primary"
                          size="xs"
                          onClick={() => setGiftModalMember({ id: member.id, name: member.name, zone: member.zone })}
                          className="gap-1 text-xs"
                        >
                          <Icons.Package className="w-3.5 h-3.5" />
                          <span>Dispatch Welcome Pack</span>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {filteredRoster.length === 0 && (
                <div className="p-8 text-center border border-dashed border-kumo-line rounded-xl space-y-1">
                  <Icons.UserFocus className="w-8 h-8 text-kumo-subtle mx-auto" />
                  <p className="text-xs text-kumo-subtle">No attendee records found for this filter.</p>
                </div>
              )}
            </div>

            {/* Transition prompt to Believers Class */}
            <div className="pt-3 sm:pt-4 border-t border-kumo-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 text-xs">
              <span className="text-kumo-subtle text-center sm:text-left">
                Attendance reconciled. Seamlessly switch to Believers&apos; Class learning module.
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPersona("member-portal")}
                className="gap-1.5 w-full sm:w-auto justify-center"
              >
                <span>Proceed to Believers&apos; Class</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </LayerCard>
        </div>
      </div>

      {/* Welcome Gift Box Unboxing / Dispatch Dialog */}
      <Dialog.Root open={Boolean(giftModalMember)} onOpenChange={(open) => !open && setGiftModalMember(null)}>
        <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
          <Dialog.Title className="text-base font-bold text-kumo-default flex items-center gap-2">
            <Icons.Gift className="w-5 h-5 text-purple-400" />
            <span>Dispatch Unified Welcome Pack</span>
          </Dialog.Title>
          <Dialog.Description className="text-xs text-kumo-subtle">
            Guarantees 100% gift parity for {giftModalMember?.name}. Resolves historic digital vs physical gift disparities.
          </Dialog.Description>

          <div className="p-3.5 rounded-xl bg-kumo-recessed border border-kumo-hairline space-y-2.5 text-xs">
            <span className="font-bold text-kumo-default block">Official Welcome Box Contents:</span>
            <ul className="space-y-1.5 text-kumo-subtle">
              <li className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Personalized Welcome Letter signed by Rev. Biodun & Pastor Modele Fatoyinbo</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Consecrated Holy Communion Vial & Anointing Oil</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Premium COZA Hardcover Journal & Laser-Engraved Pen</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Foundations of Dominion Discipleship Guidebook</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-kumo-subtle">Destination / Zone Hub:</span>
            <span className="font-semibold text-kumo-default">{giftModalMember?.zone || activeMember.zone}</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Dialog.Close render={(p) => <Button {...p} variant="outline" size="sm">Cancel</Button>} />
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (giftModalMember) {
                  dispatchWelcomeGift(giftModalMember.id);
                  setGiftModalMember(null);
                }
              }}
              className="gap-1.5"
            >
              <Icons.Check className="w-4 h-4" />
              <span>Confirm Physical Handover</span>
            </Button>
          </div>
        </Dialog>
      </Dialog.Root>
    </div>
  );
}
