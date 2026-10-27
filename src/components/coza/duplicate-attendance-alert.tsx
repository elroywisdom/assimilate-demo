"use client";

import React from "react";
import { Banner, Button, cn } from "@/design-system";

export interface DuplicateAttendanceAlertProps {
  memberName: string;
  originalSource: "Bus Captain" | "PCU Service Desk" | "Self Check-In";
  originalTime: string;
  busRoute?: string;
  onDismiss?: () => void;
  className?: string;
}

export function DuplicateAttendanceAlert({
  memberName,
  originalSource,
  originalTime,
  busRoute,
  onDismiss,
  className,
}: DuplicateAttendanceAlertProps) {
  const descriptionText = `${memberName} was already checked in via ${originalSource}${
    busRoute ? ` (${busRoute})` : ""
  } at ${originalTime}. Duplicate attendance mark prevented.`;

  return (
    <div className={cn("w-full", className)}>
      <Banner
        variant="alert"
        title="Duplicate Check-In Blocked"
        description={descriptionText}
        action={
          onDismiss ? (
            <Button variant="ghost" size="xs" onClick={onDismiss}>
              Dismiss
            </Button>
          ) : undefined
        }
      />
    </div>
  );
}
