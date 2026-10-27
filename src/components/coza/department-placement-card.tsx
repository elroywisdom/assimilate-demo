"use client";

import React, { useState } from "react";
import {
  Button,
  LayerCard,
  Badge,
  cn,
  Icons,
} from "@/design-system";

interface DepartmentOption {
  id: string;
  name: string;
  category: string;
  leadMentor: string;
  description: string;
  nextTraining: string;
  badgeColor: "purple" | "blue" | "green" | "orange";
}

const DEPARTMENTS: DepartmentOption[] = [
  {
    id: "gratitude",
    name: "The Gratitude & Choir",
    category: "Music & Worship Ministry",
    leadMentor: "Bro. David & Pst. Segun",
    description: "Vocalists, instrumentalists, praise leaders setting the atmosphere of supernatural worship.",
    nextTraining: "Thursday, 06:00 PM (Sanctuary)",
    badgeColor: "purple",
  },
  {
    id: "protocol",
    name: "Protocol & Sanctuary Keepers",
    category: "Executive Operations",
    leadMentor: "Elder Kingsley",
    description: "Pastoral care, guest dignitary escort, and sacred excellence in sanctuary order.",
    nextTraining: "Saturday, 08:30 AM (Executive Hall)",
    badgeColor: "green",
  },
  {
    id: "media",
    name: "Media, Sound & Broadcast",
    category: "Creative & Engineering",
    leadMentor: "Bro. Tobi Ade",
    description: "Multi-camera live television broadcast, audio mastering, stage lighting, and digital graphics.",
    nextTraining: "Friday, 05:30 PM (Control Booth)",
    badgeColor: "blue",
  },
  {
    id: "pcu-care",
    name: "PCU & Guest Care Hospitality",
    category: "Congregational Assimilation",
    leadMentor: "Sister Funke",
    description: "First-timer reception, welcome gift distribution, and pastoral follow-up desks.",
    nextTraining: "Saturday, 09:30 AM (PCU Lounge)",
    badgeColor: "orange",
  },
  {
    id: "ekids",
    name: "e-Kids Children Church",
    category: "NextGen Discipleship",
    leadMentor: "Deaconess Sarah",
    description: "Nurturing children in scripture foundation, creative arts, and joyful bible discovery.",
    nextTraining: "Sunday, 07:30 AM (e-Kids Complex)",
    badgeColor: "purple",
  },
  {
    id: "logistics",
    name: "Bus Ministry & Route Logistics",
    category: "Outreach & Transit",
    leadMentor: "Bro. Stephen",
    description: "Free Sunday transit fleet, bus captain route coordination, and neighborhood mobilization.",
    nextTraining: "Saturday, 04:00 PM (Bus Depot)",
    badgeColor: "blue",
  },
];

interface DepartmentPlacementCardProps {
  memberName: string;
  currentDepartment?: string;
  currentMentor?: string;
  onSelectPlacement: (departmentName: string, mentorName: string) => void;
  className?: string;
}

export function DepartmentPlacementCard({
  memberName,
  currentDepartment,
  currentMentor,
  onSelectPlacement,
  className,
}: DepartmentPlacementCardProps) {
  const [selectedId, setSelectedId] = useState<string>(
    DEPARTMENTS.find((d) => d.name === currentDepartment)?.id || "gratitude"
  );
  const [confirmed, setConfirmed] = useState(Boolean(currentDepartment));

  const activeDept = DEPARTMENTS.find((d) => d.id === selectedId) || DEPARTMENTS[0];

  const handleConfirm = () => {
    onSelectPlacement(activeDept.name, activeDept.leadMentor);
    setConfirmed(true);
  };

  return (
    <LayerCard className={cn("p-4 sm:p-5 border border-kumo-line space-y-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-kumo-default tracking-wide uppercase">
              Stage 5: COZA Body & Department Placement
            </span>
            <Badge variant="purple">PRD BOD-01</Badge>
          </div>
          <p className="text-xs text-kumo-subtle mt-0.5">
            Having completed Believers&apos; Class and Water Baptism, {memberName} is placed into active ministry with a dedicated Spiritual Mentor.
          </p>
        </div>
      </div>

      {confirmed && currentDepartment ? (
        <div className="p-4 rounded-xl border border-kumo-line bg-kumo-elevated space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-kumo-default">Assigned Ministry Unit</span>
            <Badge variant="green">Placement Active</Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-kumo-brand/15 text-kumo-brand flex items-center justify-center font-bold text-base shrink-0">
              <Icons.ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="font-bold text-sm text-kumo-default">{currentDepartment}</div>
              <div className="text-xs text-kumo-subtle">
                Spiritual Mentor: <span className="font-semibold text-kumo-default">{currentMentor || activeDept.leadMentor}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-kumo-hairline text-xs">
            <div className="flex items-center gap-2 text-kumo-subtle">
              <Icons.Clock className="w-4 h-4 text-kumo-brand shrink-0" />
              <span>Orientation: {activeDept.nextTraining}</span>
            </div>
            <div className="flex items-center gap-2 text-kumo-subtle">
              <Icons.ChatCircleText className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>1-on-1 Mentor Check-in: Scheduled Weekly</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="xs"
            onClick={() => setConfirmed(false)}
            className="text-xs text-kumo-brand"
          >
            Change Department Preference
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedId === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedId(dept.id)}
                  className={cn(
                    "text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2",
                    isSelected
                      ? "border-kumo-brand bg-kumo-elevated ring-1 ring-kumo-brand shadow-xs"
                      : "border-kumo-hairline bg-kumo-base hover:border-kumo-line hover:bg-kumo-elevated"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-bold text-xs text-kumo-default">{dept.name}</span>
                      <Badge variant={dept.badgeColor} className="text-[10px] py-0 px-1.5">
                        {dept.category.split(" ")[0]}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-kumo-subtle leading-snug">
                      {dept.description}
                    </p>
                  </div>
                  <div className="text-[10px] text-kumo-inactive flex items-center justify-between pt-1 border-t border-kumo-hairline">
                    <span>Mentor: {dept.leadMentor}</span>
                    <span className="font-medium text-kumo-brand">Select</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="text-xs text-kumo-subtle">
              Selected: <span className="font-semibold text-kumo-default">{activeDept.name}</span> (Mentor: {activeDept.leadMentor})
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirm}
              className="gap-1.5 text-xs"
            >
              <Icons.CheckCircle className="w-4 h-4" />
              <span>Confirm Placement</span>
            </Button>
          </div>
        </div>
      )}
    </LayerCard>
  );
}
