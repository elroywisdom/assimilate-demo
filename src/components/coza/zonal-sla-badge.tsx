"use client";

import React from "react";
import { Badge, cn } from "@/design-system";

export interface ZonalSlaBadgeProps {
  daysElapsed: number;
  isContacted: boolean;
  className?: string;
}

export function ZonalSlaBadge({
  daysElapsed,
  isContacted,
  className,
}: ZonalSlaBadgeProps) {
  if (isContacted) {
    return (
      <Badge variant="success" appearance="dot" className={className}>
        Contacted within SLA
      </Badge>
    );
  }

  if (daysElapsed >= 14) {
    return (
      <Badge variant="error" className={cn("animate-pulse", className)}>
        Escalated to Supervisor ({daysElapsed}d overdue)
      </Badge>
    );
  }

  if (daysElapsed >= 7) {
    return (
      <Badge variant="error" appearance="dot" className={className}>
        Overdue ({daysElapsed}d without call)
      </Badge>
    );
  }

  if (daysElapsed >= 3) {
    return (
      <Badge variant="warning" appearance="dot" className={className}>
        {daysElapsed}d Elapsed (Pending Call)
      </Badge>
    );
  }

  return (
    <Badge variant="neutral" appearance="dot" className={className}>
      Within 48h Window ({daysElapsed}d)
    </Badge>
  );
}
