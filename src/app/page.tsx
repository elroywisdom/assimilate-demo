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
      {/* Top Header with Restored Floating Role Switcher */}
      <header className="sticky top-0 z-40 border-b border-kumo-line bg-kumo-canvas/95 backdrop-blur-md px-3 sm:px-6 py-2.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-kumo-brand text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0">
              CB
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xs sm:text-sm tracking-tight block">COZA BUDDY</span>
            </div>
          </div>

          {/* Restored Floating Role Switcher Pill - At the Top Center */}
          <button
            type="button"
            onClick={() => setRoleModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-kumo-brand text-white text-xs font-bold shadow-md cursor-pointer hover:bg-kumo-brand/90 transition-all border border-white/20 active:scale-95"
          >
            <Icons.ArrowsLeftRight className="w-3.5 h-3.5" />
            <span className="truncate max-w-[170px] sm:max-w-none">
              Role: {currentRoleMeta.label.split(".")[1]?.trim() || currentRoleMeta.label}
            </span>
            <Icons.CaretDown className="w-3 h-3 text-white/80 shrink-0" />
          </button>

          {/* Desktop Persona Switcher Tabs & Theme Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="hidden lg:flex items-center gap-1">
              {personaTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = currentPersona === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCurrentPersona(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-left border transition-all cursor-pointer shrink-0 select-none text-xs",
                      isActive
                        ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default font-semibold"
                        : "border-kumo-hairline bg-kumo-base/70 text-kumo-subtle hover:text-kumo-default hover:bg-kumo-elevated"
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "w-3.5 h-3.5 shrink-0",
                        isActive ? "text-kumo-brand" : "text-kumo-subtle"
                      )}
                    />
                    <span>{tab.label.split(".")[1]?.trim() || tab.label}</span>
                  </button>
                );
              })}
            </div>

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
      </header>

      {/* Main Interactive Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-5 pb-20">
        {/* Dynamic Persona Render */}
        <div className="transition-all">
          {currentPersona === "bus-captain" && <BusCaptainView />}
          {currentPersona === "pcu-desk" && <PcuDeskView />}
          {currentPersona === "member-portal" && <MemberPortalView />}
          {currentPersona === "zonal-coordinator" && <ZonalCoordinatorView />}
          {currentPersona === "executive-dashboard" && <ExecutiveDashboardView />}
        </div>
      </main>

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
