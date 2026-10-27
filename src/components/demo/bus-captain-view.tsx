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

  // In-App Screen Tab: "passengers" | "stops" | "register" | "sync"
  const [activeTab, setActiveTab] = useState<"passengers" | "stops" | "register" | "sync">("passengers");
  const [filterTab, setFilterTab] = useState<"all" | "boarded" | "waiting">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredSuccessMsg, setRegisteredSuccessMsg] = useState<string | null>(null);

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
    if (!newName.trim()) return;
    const newRecord = {
      id: `member-${Date.now()}`,
      name: newName.trim(),
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
    setRegisteredSuccessMsg(`Boarded ${newName.trim()} at ${newStop}`);
    setNewName("");
    setNewPhone("");
    setTimeout(() => {
      setRegisteredSuccessMsg(null);
      setActiveTab("passengers");
    }, 1500);
  };

  const handleBoardAllAtStop = (stopName: string) => {
    busMembers
      .filter((m) => m.pickupStop === stopName && m.checkInStatus !== "present")
      .forEach((m) => {
        markAttendance(m.id, "present", "08:40 AM");
      });
  };

  return (
    <div className="max-w-xl mx-auto pb-28 space-y-4">
      {/* Sleek Mobile Bus Command Header */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-kumo-line bg-kumo-base shadow-xs space-y-3">
        {/* Top Header: Route & Live Indicators */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-kumo-brand/10 border border-kumo-brand/30 flex items-center justify-center shrink-0">
              <Icons.Bus className="w-4 h-4 text-kumo-brand" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-kumo-default truncate">
                  Bus 4 • Garki Route
                </span>
                <Badge variant="purple" className="text-[10px] py-0 px-1.5 shrink-0">Route 04</Badge>
              </div>
              <span className="text-[11px] text-kumo-subtle truncate block">
                Area 1 → Guzape Campus
              </span>
            </div>
          </div>

          {/* Compact Right: Occupancy & Offline Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-2 py-1 rounded-lg bg-kumo-elevated border border-kumo-hairline font-mono text-[11px] font-bold text-kumo-default">
              {boardedCount}/{totalBusCapacity} Seats
            </span>
            <button
              type="button"
              onClick={() => setIsOffline(!isOffline)}
              className={cn(
                "px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1",
                isOffline
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", isOffline ? "bg-amber-400" : "bg-emerald-400 animate-pulse")} />
              <span>{isOffline ? "Offline" : "Online"}</span>
            </button>
          </div>
        </div>

        {/* Compact Queued Indicator if offline records exist */}
        {offlineQueueCount > 0 && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            <span className="text-[11px]">{offlineQueueCount} record queued offline</span>
            <Button variant="ghost" size="xs" onClick={syncOfflineQueue} className="text-xs h-6 text-amber-300 hover:text-white">
              Sync Now
            </Button>
          </div>
        )}
      </div>

      {/* TAB 1: PASSENGERS SCREEN */}
      {activeTab === "passengers" && (
        <div className="space-y-3">
          {/* Search & Filter Tabs */}
          <div className="space-y-2">
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
                All ({busMembers.length})
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
                Waiting at Stops ({waitingCount})
              </button>
            </div>
          </div>

          {/* Passenger Roster List */}
          <div className="space-y-2">
            {filteredMembers.map((member) => {
              const isBoarded = member.checkInStatus === "present";

              return (
                <div
                  key={member.id}
                  className={cn(
                    "p-3 rounded-xl border transition-all flex items-center justify-between gap-3 shadow-xs",
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

                  {/* Right Action */}
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
                        className="gap-1.5 text-xs font-bold py-1.5 px-3 shadow-xs cursor-pointer"
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
                <p className="text-xs text-kumo-subtle">No passengers matching your query.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ROUTE STOPS SCREEN */}
      {activeTab === "stops" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-kumo-default">Route 04 Stops Progress</h3>
              <p className="text-[11px] text-kumo-subtle">Garki Area 1 → Guzape Campus</p>
            </div>
            <Badge variant="purple" className="text-xs font-mono">ETA: 14 mins</Badge>
          </div>

          <div className="space-y-2.5">
            {PRESET_BUS_STOPS.map((stop, idx) => {
              const stopMembers = busMembers.filter((m) => m.pickupStop === stop);
              const stopBoarded = stopMembers.filter((m) => m.checkInStatus === "present").length;
              const stopWaiting = stopMembers.filter((m) => m.checkInStatus !== "present").length;

              return (
                <div key={stop} className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-kumo-brand/10 text-kumo-brand border border-kumo-brand/20 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-kumo-default block">{stop}</span>
                        <span className="text-[10px] text-kumo-subtle">
                          {stopBoarded} boarded • {stopWaiting} waiting
                        </span>
                      </div>
                    </div>

                    {stopWaiting > 0 ? (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleBoardAllAtStop(stop)}
                        className="text-xs gap-1 font-semibold"
                      >
                        <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Board All ({stopWaiting})</span>
                      </Button>
                    ) : (
                      <Badge variant="success" className="text-[10px] py-0.5">Cleared</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DEDICATED INLINE PASSENGER REGISTRATION */}
      {activeTab === "register" && (
        <div className="p-4 sm:p-5 rounded-2xl border border-kumo-line bg-kumo-base space-y-4">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-kumo-default">Register Transit Passenger</h3>
            <p className="text-xs text-kumo-subtle">Quick intake for first-timers and new converts at bus stops.</p>
          </div>

          {registeredSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <Icons.CheckCircle className="w-4 h-4 shrink-0" />
              <span>{registeredSuccessMsg}</span>
            </div>
          )}

          <div className="space-y-3">
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

            <Input
              label="Full Name"
              placeholder="e.g. Sister Patricia Bello"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              aria-label="Passenger Full Name"
            />

            <Input
              label="Phone Number"
              placeholder="+234 800 000 0000"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              aria-label="Passenger Phone Number"
            />

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-kumo-subtle block">
                Pickup Stop
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_BUS_STOPS.map((stop) => (
                  <button
                    key={stop}
                    type="button"
                    onClick={() => setNewStop(stop)}
                    className={cn(
                      "py-1.5 px-2 rounded-lg border text-left text-[11px] truncate transition-all cursor-pointer",
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

            <Button
              variant="primary"
              size="base"
              onClick={handleRegister}
              disabled={!newName.trim()}
              className="w-full justify-center gap-2 font-bold text-xs py-2.5 mt-2 cursor-pointer shadow-md"
            >
              <Icons.UserPlus className="w-4 h-4" />
              <span>Save & Board Passenger</span>
            </Button>
          </div>
        </div>
      )}

      {/* TAB 4: SYNC & FOYER ARRIVAL */}
      {activeTab === "sync" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <h3 className="font-bold text-sm text-kumo-default">Bus Transit & Network Status</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-kumo-elevated border border-kumo-hairline">
                <span className="text-kumo-subtle block text-[11px]">Occupancy</span>
                <span className="text-lg font-bold font-mono text-kumo-default">
                  {boardedCount}/{totalBusCapacity}
                </span>
                <span className="text-[10px] text-emerald-400 block">
                  {Math.round((boardedCount / totalBusCapacity) * 100)}% Capacity
                </span>
              </div>

              <div className="p-3 rounded-xl bg-kumo-elevated border border-kumo-hairline">
                <span className="text-kumo-subtle block text-[11px]">Network State</span>
                <span className={cn("text-base font-bold", isOffline ? "text-amber-400" : "text-emerald-400")}>
                  {isOffline ? "Offline Mode" : "Online Sync"}
                </span>
                <span className="text-[10px] text-kumo-subtle block">
                  {offlineQueueCount} queued items
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-kumo-elevated border border-kumo-hairline">
              <div>
                <span className="font-semibold text-xs text-kumo-default block">Toggle Offline Simulation</span>
                <span className="text-[10px] text-kumo-subtle">Simulates network drop on transit routes</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOffline(!isOffline)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                  isOffline
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                )}
              >
                {isOffline ? "Go Online" : "Go Offline"}
              </button>
            </div>

            {offlineQueueCount > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={syncOfflineQueue}
                className="w-full justify-center gap-1.5 text-xs font-bold py-2"
              >
                <Icons.ArrowsClockwise className="w-3.5 h-3.5" />
                <span>Sync Offline Queue ({offlineQueueCount} records)</span>
              </Button>
            )}
          </div>

          {/* Transition Prompt to PCU */}
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-2">
            <div className="flex items-center gap-2">
              <Icons.CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs text-kumo-default">Arrived at Guzape Foyer</span>
            </div>
            <p className="text-xs text-kumo-subtle">
              Bus 4 passengers are now ready for reception at the PCU Foyer Service Desk.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPersona("pcu-desk")}
              className="w-full justify-center gap-1.5 text-xs font-semibold"
            >
              <span>Switch to PCU Foyer Desk</span>
              <Icons.ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* NATIVE APP BOTTOM NAVBAR — BUS CAPTAIN                       */}
      {/* ============================================================ */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-kumo-base/95 backdrop-blur-xl border-t border-kumo-line py-2 px-4 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            type="button"
            onClick={() => setActiveTab("passengers")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeTab === "passengers"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.Users className="w-5 h-5" weight={activeTab === "passengers" ? "fill" : "regular"} />
            <span className="text-[10px]">Passengers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("stops")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeTab === "stops"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.MapPin className="w-5 h-5" weight={activeTab === "stops" ? "fill" : "regular"} />
            <span className="text-[10px]">Stops</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeTab === "register"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.UserPlus className="w-5 h-5" weight={activeTab === "register" ? "fill" : "regular"} />
            <span className="text-[10px]">Register</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sync")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95 relative",
              activeTab === "sync"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.Bus className="w-5 h-5" weight={activeTab === "sync" ? "fill" : "regular"} />
            <span className="text-[10px]">Transit</span>
            {offlineQueueCount > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}

