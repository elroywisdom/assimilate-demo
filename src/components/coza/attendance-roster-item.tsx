"use client";

import React from "react";
import { Badge, Button, cn, Icons } from "@/design-system";

export interface AttendanceRosterItemProps {
  id: string;
  name: string;
  phone: string;
  source: "bus" | "pcu" | "self";
  pickupStop?: string;
  status: "unmarked" | "present" | "late";
  checkInTime?: string;
  onMarkPresent: (id: string) => void;
  onMarkLate: (id: string) => void;
  className?: string;
}

export function AttendanceRosterItem({
  id,
  name,
  phone,
  source,
  pickupStop,
  status,
  checkInTime,
  onMarkPresent,
  onMarkLate,
  className,
}: AttendanceRosterItemProps) {
  const isCheckedIn = status === "present" || status === "late";

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-lg border transition-all",
        isCheckedIn
          ? "border-kumo-line bg-kumo-base"
          : "border-kumo-hairline bg-kumo-recessed/60 hover:bg-kumo-base",
        className
      )}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <div
          className={cn(
            "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold border shrink-0",
            isCheckedIn
              ? "bg-kumo-elevated border-kumo-line text-kumo-default"
              : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
          )}
        >
          {name.charAt(0)}
        </div>

        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="font-semibold text-xs sm:text-sm text-kumo-default">{name}</span>
            <Badge
              variant={source === "bus" ? "purple" : source === "pcu" ? "info" : "neutral"}
              className="text-[10px] sm:text-xs"
            >
              {source === "bus" ? "Bus Ministry" : source === "pcu" ? "PCU Desk" : "Self Arrival"}
            </Badge>

            {status === "present" && (
              <Badge variant="success" appearance="dot" className="text-[10px] sm:text-xs">
                Present {checkInTime ? `• ${checkInTime}` : ""}
              </Badge>
            )}
            {status === "late" && (
              <Badge variant="warning" appearance="dot" className="text-[10px] sm:text-xs">
                Late Check-In {checkInTime ? `• ${checkInTime}` : ""}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-kumo-subtle flex-wrap">
            <span className="font-mono">{phone}</span>
            {pickupStop && <span>• Stop: {pickupStop}</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        {status === "unmarked" ? (
          <>
            <Button
              variant="outline"
              size="xs"
              onClick={() => onMarkLate(id)}
              className="text-xs"
            >
              Mark Late
            </Button>
            <Button
              variant="primary"
              size="xs"
              onClick={() => onMarkPresent(id)}
              className="gap-1.5 text-xs"
            >
              <Icons.Check className="w-3.5 h-3.5" />
              <span>Present</span>
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs text-kumo-subtle">Recorded</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onMarkLate(id)}
              className="text-xs"
            >
              Change
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
