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

  // In-App Screen Tab: "desk" | "manifest" | "walkin" | "gifts"
  const [activeScreen, setActiveScreen] = useState<"desk" | "manifest" | "walkin" | "gifts">("desk");
  const [activeTab, setActiveTab] = useState<"all" | "late">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [qrScanSuccess, setQrScanSuccess] = useState<string | null>(null);
  const [manifestBatchSynced, setManifestBatchSynced] = useState(false);
  const [giftModalMember, setGiftModalMember] = useState<{ id: string; name: string; zone: string } | null>(null);
  const [walkInSuccessMsg, setWalkInSuccessMsg] = useState<string | null>(null);

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

  const filteredRoster = roster.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery);

    if (!matchesSearch) return false;
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
    if (!walkInName.trim()) return;
    const newGuest = {
      id: `walkin-${Date.now()}`,
      name: walkInName.trim(),
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
    setWalkInSuccessMsg(`Checked in ${walkInName.trim()} • Badge Issued`);
    setWalkInName("");
    setWalkInPhone("");
    setTimeout(() => {
      setWalkInSuccessMsg(null);
      setActiveScreen("desk");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto pb-28 space-y-4">
      {/* Clean Foyer Header */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-kumo-line bg-kumo-base shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-kumo-brand/10 border border-kumo-brand/30 flex items-center justify-center shrink-0">
              <Icons.IdentificationCard className="w-4 h-4 text-kumo-brand" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-kumo-default truncate">PCU Foyer Desk</span>
                <Badge variant="purple" className="text-[10px] py-0 px-1.5 shrink-0">Desk 02</Badge>
              </div>
              <span className="text-[11px] text-kumo-subtle truncate block">
                Guzape Campus Entrance • {1420 + totalPresent} In Sanctuary
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="xs"
            onClick={handleSimulateQrScan}
            className="text-xs shrink-0 gap-1 font-semibold"
            aria-label="Simulate QR Scan"
          >
            <Icons.QrCode className="w-3.5 h-3.5 text-kumo-brand" />
            <span>Scan Pass</span>
          </Button>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {qrScanSuccess && (
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-between shadow-xs">
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
        <div className="p-3 rounded-xl border border-kumo-brand/30 bg-kumo-brand/10 text-kumo-brand text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Icons.Bus className="w-4 h-4 shrink-0" />
            <span>Bus 4 Transit Manifest Reconciled: 18 passengers synced to Sanctuary.</span>
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
              Already checked in via <strong>{duplicateWarningMember.source}</strong> at {duplicateWarningMember.time}.
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => setDuplicateWarningMember(null)}
              >
                Print Badge Only
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setDuplicateWarningMember(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 1: DESK CHECK-IN QUEUE                                   */}
      {/* ============================================================ */}
      {activeScreen === "desk" && (
        <div className="space-y-3">
          {/* Search & Filter */}
          <div className="space-y-2">
            <Input
              placeholder="Search attendee by name, phone, or stop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search attendee"
            />

            <div className="flex items-center gap-1.5 text-xs">
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
                All Attendees ({roster.length})
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
                Late Arrivals
              </button>
            </div>
          </div>

          {/* Attendee Roster List */}
          <div className="space-y-2">
            {filteredRoster.map((member) => (
              <AttendanceRosterItem
                key={member.id}
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
            ))}

            {filteredRoster.length === 0 && (
              <div className="p-8 text-center border border-dashed border-kumo-line rounded-xl space-y-1">
                <Icons.UserFocus className="w-8 h-8 text-kumo-subtle mx-auto" />
                <p className="text-xs text-kumo-subtle">No attendee records found for this filter.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: INCOMING BUS MANIFESTS                                */}
      {/* ============================================================ */}
      {activeScreen === "manifest" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.Bus className="w-4 h-4 text-kumo-brand" />
                <span className="text-xs font-bold text-kumo-default">Incoming Bus Manifests</span>
              </div>
              <Badge variant="blue">Bus 4 • Garki</Badge>
            </div>

            <div className="p-3 rounded-xl bg-kumo-recessed border border-kumo-hairline space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Route:</span>
                <span className="font-semibold text-kumo-default">Bus 4 • Garki / Area 1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Transit Captain:</span>
                <span className="text-kumo-default">Bro. Stephen (Marshal)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Status:</span>
                <span className="font-medium text-emerald-400">Arrived at Foyer (08:42 AM)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-kumo-subtle">Boarded Souls:</span>
                <span className="font-bold text-kumo-default font-mono">18 Passengers</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleReconcileBusBatch}
              className="w-full justify-center gap-1.5 text-xs font-bold py-2.5 cursor-pointer shadow-sm"
            >
              <Icons.CheckCircle className="w-4 h-4" />
              <span>Bulk-Reconcile Bus 4 to Sanctuary</span>
            </Button>
          </div>

          {/* Saturday Outreach Roadshow Contacts */}
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-kumo-default">Saturday Roadshow Leads</span>
              <Badge variant="purple" className="text-[10px]">Outreach</Badge>
            </div>
            <div className="space-y-2">
              {coldLeads.slice(0, 3).map((lead) => (
                <div
                  key={lead.id}
                  className="p-2.5 rounded-xl border border-kumo-hairline bg-kumo-elevated flex items-center justify-between gap-2 text-xs"
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
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: DEDICATED INLINE WALK-IN INTAKE                       */}
      {/* ============================================================ */}
      {activeScreen === "walkin" && (
        <div className="p-4 sm:p-5 rounded-2xl border border-kumo-line bg-kumo-base space-y-4">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-kumo-default">Register Foyer Walk-In Guest</h3>
            <p className="text-xs text-kumo-subtle">Fast intake for first-time visitors walking into Guzape Foyer.</p>
          </div>

          {walkInSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <Icons.CheckCircle className="w-4 h-4 shrink-0" />
              <span>{walkInSuccessMsg}</span>
            </div>
          )}

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

            <div className="space-y-1.5">
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

            <Button
              variant="primary"
              size="base"
              onClick={handleCreateWalkIn}
              disabled={!walkInName.trim()}
              className="w-full justify-center gap-2 font-bold text-xs py-2.5 mt-2 cursor-pointer shadow-md"
            >
              <Icons.UserPlus className="w-4 h-4" />
              <span>Check In & Issue Physical Badge</span>
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: WELCOME GIFT DESK & DISPATCH                          */}
      {/* ============================================================ */}
      {activeScreen === "gifts" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-kumo-default">Welcome Gift Lounge</h3>
                <p className="text-[11px] text-kumo-subtle">VIP Unified Welcome Pack Parity Dispatch</p>
              </div>
              <Badge variant="purple" className="text-xs font-bold">{giftEligibleMembers.length} Ready</Badge>
            </div>

            <div className="space-y-2">
              {giftEligibleMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-bold text-kumo-default truncate block">{member.name}</span>
                    <span className="text-[11px] text-kumo-subtle block">{member.zone || "Maitama Zone"}</span>
                  </div>

                  <div>
                    {member.giftStatus === "dispatched" ? (
                      <Badge variant="success" className="text-[10px] py-0.5">Dispatched ✓</Badge>
                    ) : (
                      <Button
                        variant="primary"
                        size="xs"
                        onClick={() => setGiftModalMember({ id: member.id, name: member.name, zone: member.zone })}
                        className="gap-1 text-xs font-bold"
                      >
                        <Icons.Package className="w-3.5 h-3.5" />
                        <span>Dispatch Pack</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transition Prompt to Believers Class */}
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-2">
            <div className="flex items-center gap-2">
              <Icons.GraduationCap className="w-4 h-4 text-kumo-brand" />
              <span className="font-bold text-xs text-kumo-default">Believers&apos; Class Academy</span>
            </div>
            <p className="text-xs text-kumo-subtle">
              First-timers are enrolled into the modular video discipleship class.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPersona("member-portal")}
              className="w-full justify-center gap-1.5 text-xs font-semibold"
            >
              <span>Switch to Believers&apos; Class</span>
              <Icons.ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Welcome Gift Box Unboxing / Dispatch Dialog */}
      <Dialog.Root open={Boolean(giftModalMember)} onOpenChange={(open) => !open && setGiftModalMember(null)}>
        <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
          <Dialog.Title className="text-base font-bold text-kumo-default flex items-center gap-2">
            <Icons.Gift className="w-5 h-5 text-purple-400" />
            <span>Dispatch Unified Welcome Pack</span>
          </Dialog.Title>

          <div className="p-3.5 rounded-xl bg-kumo-recessed border border-kumo-hairline space-y-2 text-xs">
            <span className="font-bold text-kumo-default block">Official Welcome Box Contents:</span>
            <ul className="space-y-1.5 text-kumo-subtle">
              <li className="flex items-center gap-2">
                <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Personalized Welcome Letter signed by Pastor Biodun & Pastor Modele</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Consecrated Holy Communion Vial & Anointing Oil</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Premium COZA Hardcover Journal & Laser Pen</span>
              </li>
            </ul>
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
              <span>Confirm Handover</span>
            </Button>
          </div>
        </Dialog>
      </Dialog.Root>

      {/* ============================================================ */}
      {/* NATIVE APP BOTTOM NAVBAR — PCU FOYER DESK                   */}
      {/* ============================================================ */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-kumo-base/95 backdrop-blur-xl border-t border-kumo-line py-2 px-4 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            type="button"
            onClick={() => setActiveScreen("desk")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "desk"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.IdentificationCard className="w-5 h-5" weight={activeScreen === "desk" ? "fill" : "regular"} />
            <span className="text-[10px]">Desk</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen("manifest")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "manifest"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.Bus className="w-5 h-5" weight={activeScreen === "manifest" ? "fill" : "regular"} />
            <span className="text-[10px]">Manifests</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen("walkin")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "walkin"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.UserPlus className="w-5 h-5" weight={activeScreen === "walkin" ? "fill" : "regular"} />
            <span className="text-[10px]">Walk-In</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen("gifts")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "gifts"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.Gift className="w-5 h-5" weight={activeScreen === "gifts" ? "fill" : "regular"} />
            <span className="text-[10px]">Gifts</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
