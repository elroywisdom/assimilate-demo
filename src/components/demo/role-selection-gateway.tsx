"use client";

import React from "react";
import {
  Badge,
  cn,
  Icons,
  CozaLogo,
} from "@/design-system";
import { PersonaRole } from "@/context/demo-context";

interface RoleOption {
  id: PersonaRole;
  title: string;
  tagline: string;
  icon: React.ElementType;
}

const ROLES: RoleOption[] = [
  {
    id: "member-portal",
    title: "Church Member",
    tagline: "Believers Academy & Spiritual Passport",
    icon: Icons.GraduationCap,
  },
  {
    id: "bus-captain",
    title: "Bus Captain",
    tagline: "Transit Roster & Mobile Boarding",
    icon: Icons.Bus,
  },
  {
    id: "pcu-desk",
    title: "PCU Service Desk",
    tagline: "Foyer Check-In & Manifest Sync",
    icon: Icons.IdentificationCard,
  },
  {
    id: "zonal-coordinator",
    title: "Zonal Coordinator",
    tagline: "48h Care Queue & Fellowship Cells",
    icon: Icons.UsersThree,
  },
  {
    id: "executive-dashboard",
    title: "Senior Pastor",
    tagline: "Global Funnel & Multi-Campus Analytics",
    icon: Icons.ChartBar,
  },
];

interface RoleSelectionGatewayProps {
  onSelectRole: (role: PersonaRole) => void;
  onClose?: () => void;
  isModal?: boolean;
  currentRole?: PersonaRole;
}

export function RoleSelectionGateway({
  onSelectRole,
  onClose,
  isModal = false,
  currentRole,
}: RoleSelectionGatewayProps) {
  return (
    <div className={cn("space-y-3 max-w-md mx-auto", isModal ? "p-0" : "p-4")}>
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-1 border-b border-kumo-hairline">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-kumo-elevated border border-kumo-line flex items-center justify-center p-1 shrink-0">
            <CozaLogo size={18} className="text-kumo-brand" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-kumo-default">Switch Role</h3>
            <p className="text-[11px] text-kumo-subtle">Select perspective to explore</p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-kumo-recessed hover:bg-kumo-elevated flex items-center justify-center text-kumo-subtle hover:text-kumo-default transition-all cursor-pointer"
            aria-label="Close"
          >
            <Icons.X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Minimalist Role List */}
      <div className="space-y-1.5 pt-1">
        {ROLES.map((role) => {
          const IconComponent = role.icon;
          const isActive = currentRole === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id)}
              className={cn(
                "w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none active:scale-[0.98]",
                isActive
                  ? "border-kumo-brand bg-kumo-elevated ring-1 ring-kumo-brand/50 shadow-xs"
                  : "border-kumo-hairline bg-kumo-base hover:bg-kumo-elevated hover:border-kumo-line"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isActive
                      ? "bg-kumo-brand text-white"
                      : "bg-kumo-recessed text-kumo-subtle"
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "font-bold text-xs sm:text-sm truncate",
                        isActive ? "text-kumo-brand" : "text-kumo-default"
                      )}
                    >
                      {role.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-kumo-subtle truncate block">
                    {role.tagline}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                {isActive ? (
                  <div className="w-5 h-5 rounded-full bg-kumo-brand/10 text-kumo-brand flex items-center justify-center">
                    <Icons.Check className="w-3.5 h-3.5" weight="bold" />
                  </div>
                ) : (
                  <Icons.CaretRight className="w-4 h-4 text-kumo-subtle/50" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
