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
      setTimeout(() => setViewMode("app"), 0);
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

            {/* Quick Action Controls: Theme & Role Gateway */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant="secondary"
                size="xs"
                onClick={() => setRoleModalOpen(true)}
                className="gap-1 font-semibold text-xs md:hidden"
              >
                <Icons.Users className="w-3.5 h-3.5 text-kumo-brand" />
                <span>Switch Role</span>
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

          {/* Desktop Persona Switcher Tabs */}
          <div className="hidden md:flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => setRoleModalOpen(true)}
              className="gap-1.5 shrink-0 font-bold text-xs mr-1"
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
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-left border transition-all cursor-pointer shrink-0 select-none",
                    isActive
                      ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default shadow-xs font-semibold"
                      : "border-kumo-hairline bg-kumo-base/70 text-kumo-subtle hover:text-kumo-default hover:bg-kumo-elevated"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-3.5 h-3.5 shrink-0",
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
      </header>

      {/* Main Interactive Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-5 space-y-4">
        {/* Dynamic Persona Render */}
        <div className="transition-all">
          {currentPersona === "bus-captain" && <BusCaptainView />}
          {currentPersona === "pcu-desk" && <PcuDeskView />}
          {currentPersona === "member-portal" && <MemberPortalView />}
          {currentPersona === "zonal-coordinator" && <ZonalCoordinatorView />}
          {currentPersona === "executive-dashboard" && <ExecutiveDashboardView />}
        </div>
      </main>

      {/* Mobile Native Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Role Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-kumo-line bg-kumo-base/95 backdrop-blur-xl px-2 py-2 shadow-2xl flex items-center justify-around safe-area-bottom"
      >
        {personaTabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentPersona === tab.id;
          const shortName =
            tab.id === "bus-captain"
              ? "Bus"
              : tab.id === "pcu-desk"
              ? "PCU Desk"
              : tab.id === "member-portal"
              ? "Believers"
              : tab.id === "zonal-coordinator"
              ? "Zonal"
              : "Pastor";

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCurrentPersona(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer relative",
                isActive
                  ? "text-kumo-brand font-bold"
                  : "text-kumo-subtle hover:text-kumo-default"
              )}
            >
              {isActive && (
                <span className="absolute -top-2 w-7 h-1 rounded-full bg-kumo-brand" />
              )}
              <IconComponent
                className={cn(
                  "w-5 h-5 mb-0.5 transition-transform",
                  isActive ? "text-kumo-brand scale-110" : "text-kumo-subtle"
                )}
              />
              <span className="text-[10px] tracking-tight leading-none">{shortName}</span>
            </button>
          );
        })}
      </nav>

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
