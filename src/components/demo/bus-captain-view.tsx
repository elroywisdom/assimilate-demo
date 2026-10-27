"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Badge,
  Dialog,
  cn,
  Icons,
} from "@/design-system";
import { useDemo } from "@/context/demo-context";
import {
  OfflineSyncIndicator,
} from "@/components/coza";

const PRESET_BUS_STOPS = [
  "Area 1 Roundabout",
  "Garki Old Market",
  "Apo Bridge",
  "Federal Housing Junction",
];

export function BusCaptainView() {
  const {
    isOffline,
    setIsOffline,
    offlineQueueCount,
    syncOfflineQueue,
    roster,
    markAttendance,
    addMemberToRoster,
    setCurrentPersona,
  } = useDemo();

  const [registerOpen, setRegisterOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<"all" | "boarded" | "waiting">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Quick Registration Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStop, setNewStop] = useState("Area 1 Roundabout");
  const [newCategory, setNewCategory] = useState<"First-Time Guest" | "New Convert">("First-Time Guest");

  const busMembers = roster.filter((m) => m.source === "bus");
  const boardedCount = busMembers.filter((m) => m.checkInStatus === "present").length;
  const waitingCount = busMembers.filter((m) => m.checkInStatus !== "present").length;
  const totalBusCapacity = 30;

  const filteredMembers = busMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      (m.pickupStop && m.pickupStop.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterTab === "boarded") return m.checkInStatus === "present";
    if (filterTab === "waiting") return m.checkInStatus !== "present";
    return true;
  });

  const handleRegister = () => {
    if (!newName) return;
    const newRecord = {
      id: `member-${Date.now()}`,
      name: newName,
      phone: newPhone || "+234 800 000 0000",
      address: "Garki District, Abuja",
      maritalStatus: "Single" as const,
      branch: "COZA Global — The Guzape Campus",
      source: "bus" as const,
      pickupStop: newStop,
      busRoute: "Bus 4 (Garki / Area 1)",
      checkInStatus: "present" as const,
      checkInTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      classCohort: "Cohort 26",
      classModulesCompleted: 0,
      classTotalModules: 4,
      classQuizPassed: false,
      classStatus: "not_started" as const,
      giftStatus: "ineligible" as const,
      baptismStatus: "not_registered" as const,
      zone: "Garki Zone",
      zonalCoordinator: "Bro. Collins",
      zonalContacted: false,
      zonalDaysElapsed: 0,
      addedToWhatsApp: false,
      invitedToSaturdayCommunity: false,
      consecutiveMisses: 0,
    };

    addMemberToRoster(newRecord);
    setNewName("");
    setNewPhone("");
    setRegisterOpen(false);
  };

  const handleBoardAllAtStop = (stopName: string) => {
    busMembers
      .filter((m) => m.pickupStop === stopName && m.checkInStatus !== "present")
      .forEach((m) => {
        markAttendance(m.id, "present", "08:40 AM");
      });
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-2xl mx-auto">
      {/* Top Mobile Operations Card */}
      <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base shadow-sm space-y-3.5">
        
        {/* Header Row: Route + Capacity */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-base text-kumo-default tracking-tight">
                Bus 4: Garki / Area 1
              </span>
              <Badge variant="purple" className="text-[10px] py-0 px-1.5">Route 04</Badge>
            </div>
            <p className="text-xs text-kumo-subtle mt-0.5">
              Pickup stops: Area 1 → Garki Market → Apo Bridge → Guzape
            </p>
          </div>

          {/* Quick Offline Simulation Toggle */}
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsOffline(!isOffline)}
            className="text-[11px] shrink-0"
          >
            {isOffline ? "Restore Online" : "Simulate Offline"}
          </Button>
        </div>

        {/* Bus Capacity Visual Meter */}
        <div className="p-3 rounded-xl bg-kumo-elevated border border-kumo-hairline space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-kumo-subtle flex items-center gap-1">
              <Icons.Users className="w-3.5 h-3.5 text-kumo-brand" />
              <span>Seat Occupancy</span>
            </span>
            <span className="font-mono font-bold text-kumo-default">
              {boardedCount} / {totalBusCapacity} Seats ({Math.round((boardedCount / totalBusCapacity) * 100)}%)
            </span>
          </div>

          <div className="h-2 rounded-full bg-kumo-recessed overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-kumo-brand-hover to-kumo-brand rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.round((boardedCount / totalBusCapacity) * 100))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-kumo-subtle pt-0.5">
            <span className="text-emerald-400 font-medium">● {boardedCount} Boarded on Transit</span>
            <span className="text-amber-400 font-medium">○ {waitingCount} Waiting at Stops</span>
          </div>
        </div>

        {/* Offline Sync State Bar */}
        <OfflineSyncIndicator
          isOnline={!isOffline}
          pendingCount={offlineQueueCount}
          onSync={syncOfflineQueue}
        />

        {/* Primary Mobile Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Dialog.Root open={registerOpen} onOpenChange={setRegisterOpen}>
            <Dialog.Trigger
              render={(p) => (
                <Button
                  {...p}
                  variant="primary"
                  size="base"
                  className="w-full justify-center gap-1.5 py-2.5 font-bold text-xs shadow-md cursor-pointer"
                >
                  <Icons.UserPlus className="w-4 h-4" />
                  <span>+ Quick Register</span>
                </Button>
              )}
            />
            <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
              <Dialog.Title className="text-base font-bold text-kumo-default">
                Quick Transit Convert & Guest Registration
              </Dialog.Title>
              <Dialog.Description className="text-xs text-kumo-subtle">
                Captured instantly on transit. Works 100% offline.
              </Dialog.Description>

              <div className="space-y-3">
                {/* Convert vs Guest Pill Selector */}
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-kumo-subtle block">Attendee Type</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setNewCategory("First-Time Guest")}
                      className={cn(
                        "py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer",
                        newCategory === "First-Time Guest"
                          ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                          : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                      )}
                    >
                      First-Time Guest
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewCategory("New Convert")}
                      className={cn(
                        "py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer",
                        newCategory === "New Convert"
                          ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                          : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                      )}
                    >
                      New Convert
                    </button>
                  </div>
                </div>

                <Input
                  label="Full Name"
                  placeholder="e.g. Sister Patricia Bello"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />

                <Input
                  label="Phone Number"
                  placeholder="+234 800 000 0000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />

                {/* Preset Bus Stop One-Tap Chips */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-kumo-subtle block">
                    Pickup Bus Stop (Tap to Select)
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {PRESET_BUS_STOPS.map((stop) => (
                      <button
                        key={stop}
                        type="button"
                        onClick={() => setNewStop(stop)}
                        className={cn(
                          "py-1.5 px-2.5 rounded-lg border text-left text-[11px] truncate transition-all cursor-pointer",
                          newStop === stop
                            ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default font-semibold"
                            : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                        )}
                      >
                        {stop}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Dialog.Close render={(p) => <Button {...p} variant="outline" size="sm">Cancel</Button>} />
                <Button variant="primary" size="sm" onClick={handleRegister}>
                  Save & Board Passenger
                </Button>
              </div>
            </Dialog>
          </Dialog.Root>

          <Button
            variant="outline"
            size="base"
            onClick={() => handleBoardAllAtStop("Area 1 Roundabout")}
            className="w-full justify-center gap-1.5 py-2.5 text-xs font-semibold"
          >
            <Icons.CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Board All at Area 1</span>
          </Button>
        </div>
      </div>

      {/* Search & Filter Tabs for Passenger Triage */}
      <div className="space-y-2.5">
        <Input
          placeholder="Search passenger name, phone, or stop..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search passenger name, phone, or stop"
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
              filterTab === "all"
                ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
            )}
          >
            All Guests ({busMembers.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("boarded")}
            className={cn(
              "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
              filterTab === "boarded"
                ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
            )}
          >
            Boarded ({boardedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("waiting")}
            className={cn(
              "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
              filterTab === "waiting"
                ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
            )}
          >
            At Stops ({waitingCount})
          </button>
        </div>
      </div>

      {/* Passenger List with High-Touch Boarding Action */}
      <div className="space-y-2.5">
        {filteredMembers.map((member) => {
          const isBoarded = member.checkInStatus === "present";

          return (
            <div
              key={member.id}
              className={cn(
                "p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 shadow-xs",
                isBoarded
                  ? "border-kumo-line bg-kumo-base"
                  : "border-kumo-hairline bg-kumo-elevated/70"
              )}
            >
              {/* Left Info */}
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0",
                    isBoarded
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-kumo-recessed text-kumo-subtle border border-kumo-hairline"
                  )}
                >
                  {isBoarded ? (
                    <Icons.Check className="w-4 h-4" weight="bold" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-xs sm:text-sm text-kumo-default truncate">
                      {member.name}
                    </span>
                    <Badge variant={isBoarded ? "success" : "neutral"} className="text-[10px] py-0 px-1.5">
                      {isBoarded ? `Boarded ${member.checkInTime || ""}` : "Waiting"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-kumo-subtle flex-wrap">
                    <span className="flex items-center gap-1">
                      <Icons.MapPin className="w-3 h-3 text-kumo-brand shrink-0" />
                      <span className="truncate">{member.pickupStop || "Area 1"}</span>
                    </span>
                    <span className="font-mono">{member.phone}</span>
                  </div>
                </div>
              </div>

              {/* Right Big Tap Boarding Toggle */}
              <div className="shrink-0">
                {isBoarded ? (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => markAttendance(member.id, "unmarked")}
                    className="text-[11px] text-kumo-subtle"
                  >
                    Undo
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      markAttendance(
                        member.id,
                        "present",
                        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      )
                    }
                    className="gap-1.5 text-xs font-bold py-2 px-3 shadow-sm cursor-pointer"
                  >
                    <Icons.Check className="w-3.5 h-3.5" weight="bold" />
                    <span>Board</span>
                  </Button>
                )}
              </div>
            </div>
          );
        })}

        {filteredMembers.length === 0 && (
          <div className="p-8 text-center border border-dashed border-kumo-line rounded-xl space-y-2">
            <Icons.Users className="w-8 h-8 text-kumo-subtle mx-auto" />
            <p className="text-xs text-kumo-subtle">No passengers matching your query or filter.</p>
          </div>
        )}
      </div>

      {/* Transit Completion Prompt to PCU */}
      <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
        <span className="text-kumo-subtle text-center sm:text-left">
          Bus arrived at Guzape Foyer. Syncs roster to foyer check-in desk.
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentPersona("pcu-desk")}
          className="gap-1.5 w-full sm:w-auto justify-center"
        >
          <span>Proceed to PCU Foyer Desk</span>
          <Icons.ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

