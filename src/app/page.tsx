"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Dialog,
  cn,
  Icons,
} from "@/design-system";
import { DemoProvider, useDemo, PersonaRole } from "@/context/demo-context";
import {
  BusCaptainView,
  PcuDeskView,
  MemberPortalView,
  ZonalCoordinatorView,
  ExecutiveDashboardView,
  RoleSelectionGateway,
} from "@/components/demo";

function DemoLayoutInner() {
  const { currentPersona, setCurrentPersona, activeMember } = useDemo();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"app" | "presentation">("presentation");

  // Parse URL query parameter ?role=... or ?mode=...
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role")?.toLowerCase();

    if (roleParam === "member" || roleParam === "member-portal") {
      setCurrentPersona("member-portal");
    } else if (roleParam === "bus" || roleParam === "bus-captain") {
      setCurrentPersona("bus-captain");
    } else if (roleParam === "pcu" || roleParam === "pcu-desk") {
      setCurrentPersona("pcu-desk");
    } else if (roleParam === "zonal" || roleParam === "zonal-coordinator") {
      setCurrentPersona("zonal-coordinator");
    } else if (
      roleParam === "pastor" ||
      roleParam === "executive" ||
      roleParam === "executive-dashboard"
    ) {
      setCurrentPersona("executive-dashboard");
    }

    if (params.get("mode") === "app") {
      setViewMode("app");
    }
  }, [setCurrentPersona]);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-mode", nextMode ? "dark" : "light");
    }
  };

  const personaTabs = [
    {
      id: "bus-captain" as PersonaRole,
      label: "1. Bus Captain",
      icon: Icons.Bus,
      subtitle: "Offline Transit Capture",
      roleKey: "bus-captain",
    },
    {
      id: "pcu-desk" as PersonaRole,
      label: "2. PCU Desk",
      icon: Icons.IdentificationCard,
      subtitle: "Reconcile & Dedup",
      roleKey: "pcu",
    },
    {
      id: "member-portal" as PersonaRole,
      label: "3. Believers Class",
      icon: Icons.GraduationCap,
      subtitle: "Modular Videos & Gifting",
      roleKey: "member",
    },
    {
      id: "zonal-coordinator" as PersonaRole,
      label: "4. Zonal Team",
      icon: Icons.UsersThree,
      subtitle: "48h SLA & Community",
      roleKey: "zonal",
    },
    {
      id: "executive-dashboard" as PersonaRole,
      label: "5. Senior Pastor",
      icon: Icons.ChartBar,
      subtitle: "Global Funnel & Campuses",
      roleKey: "pastor",
    },
  ];

  const currentRoleMeta = personaTabs.find((p) => p.id === currentPersona) || personaTabs[2];

  return (
    <div className="min-h-screen bg-kumo-canvas text-kumo-default selection:bg-kumo-brand selection:text-white pb-28">
      {/* Interactive Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-kumo-line bg-kumo-canvas/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-3">
          {/* Brand & Persona Identifier */}
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-kumo-brand text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0">
                CB
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm tracking-tight truncate">COZA BUDDY</span>
                  <Badge variant="purple" className="text-[9px] py-0 px-1.5 shrink-0">
                    {viewMode === "app" ? "Live App" : "Demo"}
                  </Badge>
                </div>
                <div className="text-[10px] sm:text-[11px] text-kumo-subtle truncate max-w-[200px] sm:max-w-xs">
                  {currentRoleMeta.label} • {activeMember.name}
                </div>
              </div>
            </div>

            {/* Quick Action Controls: App/Demo View Mode, Theme */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* View Mode Switcher (App vs Presentation) */}
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setViewMode(viewMode === "app" ? "presentation" : "app")}
                className="text-xs text-kumo-subtle"
                aria-label="Toggle App vs Presentation View"
              >
                {viewMode === "app" ? (
                  <span className="text-[11px] font-semibold text-kumo-brand flex items-center gap-1">
                    <Icons.Presentation className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Show Demo Tools</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <Icons.DeviceMobile className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Pure App Mode</span>
                  </span>
                )}
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="xs"
                onClick={toggleTheme}
                className="text-xs shrink-0"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? (
                  <Icons.Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Icons.Moon className="w-4 h-4 text-kumo-brand" />
                )}
              </Button>
            </div>
          </div>

          {/* Persona Switcher Tabs on Desktop / Horizontal on Tablet */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 -mx-1 px-1 touch-pan-x">
              {/* Switch Role Button (Opens Gateway Modal) */}
              <Button
                variant="secondary"
                size="xs"
                onClick={() => setRoleModalOpen(true)}
                className="gap-1.5 shrink-0 font-bold text-xs"
              >
                <Icons.Users className="w-3.5 h-3.5 text-kumo-brand" />
                <span>Choose Role</span>
              </Button>

              {personaTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = currentPersona === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCurrentPersona(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-1.5 rounded-lg text-left border transition-all cursor-pointer shrink-0 select-none",
                      isActive
                        ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default shadow-xs font-semibold"
                        : "border-kumo-hairline bg-kumo-base/70 text-kumo-subtle hover:text-kumo-default hover:bg-kumo-elevated"
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0",
                        isActive ? "text-kumo-brand" : "text-kumo-subtle"
                      )}
                    />
                    <span className="text-xs whitespace-nowrap leading-tight">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 space-y-4 sm:space-y-6">

        {/* Guided Storyline Navigator Banner (visible in presentation mode) */}
        {viewMode === "presentation" && (
          <div className="p-3 sm:p-3.5 rounded-2xl border border-kumo-line bg-kumo-elevated/80 backdrop-blur-sm shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-kumo-default block">
                  Interactive Journey • Brother Samuel Adebayo
                </span>
                <span className="text-[11px] text-kumo-subtle truncate block">
                  Tap any persona to experience the assimilation workflow across church teams.
                </span>
              </div>
            </div>

            {/* Connected 5-Step Storyline Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                {
                  id: "bus-captain" as PersonaRole,
                  step: "1",
                  label: "Bus Transit",
                  status: activeMember.checkInStatus === "unmarked" ? "Boarding" : "Boarded ✓",
                },
                {
                  id: "pcu-desk" as PersonaRole,
                  step: "2",
                  label: "Foyer Desk",
                  status: "Reconcile",
                },
                {
                  id: "member-portal" as PersonaRole,
                  step: "3",
                  label: "Believers' Class",
                  status: `${activeMember.classModulesCompleted}/4 Modules`,
                },
                {
                  id: "zonal-coordinator" as PersonaRole,
                  step: "4",
                  label: "Pastoral Care",
                  status: activeMember.zonalContacted ? "Welcomed ✓" : "48h SLA",
                },
                {
                  id: "executive-dashboard" as PersonaRole,
                  step: "5",
                  label: "Senior Pastor",
                  status: "Global Funnel",
                },
              ].map((st) => {
                const isCurrent = currentPersona === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setCurrentPersona(st.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-left transition-all cursor-pointer shrink-0 select-none",
                      isCurrent
                        ? "border-kumo-brand bg-kumo-base ring-1 ring-kumo-brand text-kumo-default shadow-xs"
                        : "border-kumo-hairline bg-kumo-base/50 text-kumo-subtle hover:text-kumo-default hover:bg-kumo-elevated"
                    )}
                  >
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold font-mono",
                        isCurrent ? "bg-kumo-brand text-white" : "bg-kumo-recessed text-kumo-subtle"
                      )}
                    >
                      {st.step}
                    </span>
                    <div className="leading-tight">
                      <span className="font-semibold text-[11px] block">{st.label}</span>
                      <span className="text-[9px] text-kumo-inactive block">{st.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Persona Render */}
        <div className="transition-all">
          {currentPersona === "bus-captain" && <BusCaptainView />}
          {currentPersona === "pcu-desk" && <PcuDeskView />}
          {currentPersona === "member-portal" && <MemberPortalView />}
          {currentPersona === "zonal-coordinator" && <ZonalCoordinatorView />}
          {currentPersona === "executive-dashboard" && <ExecutiveDashboardView />}
        </div>
      </main>

      {/* Floating Role Switcher Pill for Mobile Experience */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <button
          type="button"
          onClick={() => setRoleModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-kumo-brand text-white text-xs font-bold shadow-2xl cursor-pointer hover:bg-kumo-brand/90 transition-all border border-white/10"
        >
          <Icons.ArrowsLeftRight className="w-3.5 h-3.5" />
          <span>Role: {currentRoleMeta.label.split(".")[1]?.trim() || currentRoleMeta.label}</span>
        </button>
      </div>

      {/* Role Selection Gateway Modal */}
      <Dialog.Root open={roleModalOpen} onOpenChange={setRoleModalOpen}>
        <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-3xl space-y-4 max-w-xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[85vh] overflow-y-auto">
          <RoleSelectionGateway
            onSelectRole={(role) => {
              setCurrentPersona(role);
              setRoleModalOpen(false);
            }}
            onClose={() => setRoleModalOpen(false)}
            isModal={true}
          />
        </Dialog>
      </Dialog.Root>
    </div>
  );
}

export default function Home() {
  return (
    <DemoProvider>
      <DemoLayoutInner />
    </DemoProvider>
  );
}
