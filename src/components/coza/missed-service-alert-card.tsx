"use client";

import React from "react";
import { Badge, Button, LayerCard, cn, Icons } from "@/design-system";

export interface MissedServiceAlertCardProps {
  memberName: string;
  phone: string;
  consecutiveMisses: number;
  lastAttendedService: string;
  zoneName: string;
  coordinatorName: string;
  onCallMember: () => void;
  className?: string;
}

export function MissedServiceAlertCard({
  memberName,
  phone,
  consecutiveMisses,
  lastAttendedService,
  zoneName,
  coordinatorName,
  onCallMember,
  className,
}: MissedServiceAlertCardProps) {
  return (
    <LayerCard className={cn("overflow-hidden", className)}>
      <LayerCard.Secondary>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Icons.WarningCircle className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-semibold text-kumo-default">
              Absence Flag: {consecutiveMisses} Consecutive Services Missed
            </span>
          </div>
          <Badge variant="error">Care Dispatch Required</Badge>
        </div>
      </LayerCard.Secondary>

      <LayerCard.Primary>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-base text-kumo-default">{memberName}</h4>
              <p className="text-xs text-kumo-subtle mt-0.5">
                Last attended: <span className="text-kumo-default font-medium">{lastAttendedService}</span>
              </p>
            </div>
            <Badge variant="outline">{zoneName}</Badge>
          </div>

          <div className="p-3 rounded-lg border border-kumo-hairline bg-kumo-recessed text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-kumo-subtle">Assigned Coordinator:</span>
              <span className="font-medium text-kumo-default">{coordinatorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-kumo-subtle">Follow-Up Prompt:</span>
              <span className="text-kumo-default italic font-sans">
                &ldquo;My Senior Pastor asked me to reach out and know how you are doing...&rdquo;
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-t border-kumo-hairline">
            <span className="text-xs font-mono text-kumo-subtle text-center sm:text-left">{phone}</span>
            <Button
              variant="primary"
              size="sm"
              onClick={onCallMember}
              className="gap-1.5 w-full sm:w-auto justify-center text-xs"
            >
              <Icons.Phone className="w-3.5 h-3.5" />
              <span>Initiate Care Call</span>
            </Button>
          </div>
        </div>
      </LayerCard.Primary>
    </LayerCard>
  );
}
