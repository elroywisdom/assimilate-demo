"use client";

import React from "react";
import {
  Button,
  Badge,
  cn,
  Icons,
} from "@/design-system";
import { PersonaRole } from "@/context/demo-context";

interface RoleOption {
  id: PersonaRole;
  title: string;
  subtitle: string;
  actor: string;
  description: string;
  badge: string;
  badgeColor: "purple" | "blue" | "green" | "orange";
  icon: React.ElementType;
  accentColor: string;
}

const ROLES: RoleOption[] = [
  {
    id: "member-portal",
    title: "Church Member / Disciple",
    subtitle: "Discipleship & Video Learning Hub",
    actor: "Brother Samuel Adebayo (New Believer)",
    description:
      "Watch modular video lessons by Pastor Biodun, take quiz assessments, book water baptism immersion, and claim your welcome gift box.",
    badge: "Member Mobile PWA",
    badgeColor: "purple",
    icon: Icons.GraduationCap,
    accentColor: "border-purple-500/40 hover:border-purple-500",
  },
  {
    id: "bus-captain",
    title: "Bus Captain & Transit Marshal",
    subtitle: "Sunday Transit & Route Mobilization",
    actor: "Brother Stephen (Bus 4 Garki Route)",
    description:
      "Offline passenger boarding, real-time seat occupancy counter (30 seats), quick convert registration, and bus stop manifest.",
    badge: "Field Transit App",
    badgeColor: "blue",
    icon: Icons.Bus,
    accentColor: "border-blue-500/40 hover:border-blue-500",
  },
  {
    id: "pcu-desk",
    title: "PCU Service Desk & Foyer Host",
    subtitle: "Sanctuary Arrival & Reconciliation",
    actor: "Sister Funke (Foyer Desk 2)",
    description:
      "Batch-reconcile incoming bus manifests, simulate QR pass check-ins, detect duplicate entries, and dispatch physical welcome boxes.",
    badge: "Foyer Check-In Desk",
    badgeColor: "green",
    icon: Icons.IdentificationCard,
    accentColor: "border-emerald-500/40 hover:border-emerald-500",
  },
  {
    id: "zonal-coordinator",
    title: "Zonal Coordinator & Pastoral Care",
    subtitle: "Community & 48-Hour SLA Follow-Up",
    actor: "Deaconess Sarah (Maitama Extension)",
    description:
      "48-hour SLA countdown queue, pre-scripted WhatsApp pastoral welcome, Saturday street outreach logging, and Stage 5 ministry placement.",
    badge: "Pastoral CRM Cockpit",
    badgeColor: "orange",
    icon: Icons.UsersThree,
    accentColor: "border-amber-500/40 hover:border-amber-500",
  },
  {
    id: "executive-dashboard",
    title: "Senior Pastor & Leadership",
    subtitle: "Global Funnel & Multi-Campus Analytics",
    actor: "Rev. Biodun Fatoyinbo & Executive Pastors",
    description:
      "Global assimilation funnel (1,421 souls), branch performance comparisons (Guzape, North Church, Lugbe), and weekly reports.",
    badge: "Executive Intelligence",
    badgeColor: "purple",
    icon: Icons.ChartBar,
    accentColor: "border-purple-500/40 hover:border-purple-500",
  },
];

interface RoleSelectionGatewayProps {
  onSelectRole: (role: PersonaRole) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export function RoleSelectionGateway({
  onSelectRole,
  onClose,
  isModal = false,
}: RoleSelectionGatewayProps) {
  return (
    <div
      className={cn(
        "space-y-4 max-w-2xl mx-auto",
        isModal ? "p-0" : "p-4 sm:p-6"
      )}
    >
      {/* Brand Header */}
      <div className="text-center space-y-2 pb-2">
        <div className="w-12 h-12 rounded-2xl bg-kumo-brand text-white flex items-center justify-center font-black text-base shadow-lg mx-auto">
          CB
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-kumo-default tracking-tight">
            COZA BUDDY
          </h2>
          <p className="text-xs sm:text-sm text-kumo-subtle max-w-md mx-auto mt-1">
            Church Assimilation Platform • Select your role to experience the live application from your perspective.
          </p>
        </div>
      </div>

      {/* Role Selection Grid */}
      <div className="space-y-2.5">
        {ROLES.map((role) => {
          const IconComponent = role.icon;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id)}
              className={cn(
                "w-full text-left p-3.5 sm:p-4 rounded-2xl border bg-kumo-elevated hover:bg-kumo-base transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs select-none group",
                role.accentColor
              )}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-kumo-recessed text-kumo-brand flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-5 h-5 text-kumo-brand" />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-kumo-default group-hover:text-kumo-brand transition-colors">
                      {role.title}
                    </span>
                    <Badge variant={role.badgeColor} className="text-[10px] py-0 px-1.5">
                      {role.badge}
                    </Badge>
                  </div>
                  <div className="text-[11px] font-medium text-kumo-subtle">
                    {role.actor}
                  </div>
                  <p className="text-xs text-kumo-subtle leading-relaxed line-clamp-2">
                    {role.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 text-xs font-semibold text-kumo-brand group-hover:translate-x-1 transition-transform">
                <span>Open App</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {isModal && onClose && (
        <div className="pt-2 flex justify-center">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs text-kumo-subtle">
            Cancel & Keep Current View
          </Button>
        </div>
      )}
    </div>
  );
}
