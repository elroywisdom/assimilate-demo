"use client";

import React from "react";
import { Badge, Button, LayerCard, cn, Icons } from "@/design-system";

export interface GiftBoxDispatchCardProps {
  memberName: string;
  completionChannel: "Digital Course" | "Physical Stamping Card";
  completionDate: string;
  status: "eligible" | "dispatched" | "received";
  coordinatorName: string;
  zoneName: string;
  onDispatch: () => void;
  onConfirmReceipt: () => void;
  className?: string;
}

export function GiftBoxDispatchCard({
  memberName,
  completionChannel,
  completionDate,
  status,
  coordinatorName,
  zoneName,
  onDispatch,
  onConfirmReceipt,
  className,
}: GiftBoxDispatchCardProps) {
  return (
    <LayerCard className={cn("overflow-hidden", className)}>
      <LayerCard.Secondary>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Icons.Gift className="w-4 h-4 text-kumo-brand" />
            <span className="text-sm font-semibold text-kumo-default">
              Equitable Completion Gift Box
            </span>
          </div>

          <Badge
            variant={
              status === "received"
                ? "success"
                : status === "dispatched"
                ? "warning"
                : "primary"
            }
            appearance={status === "received" ? "dot" : "filled"}
          >
            {status === "received"
              ? "Received by Member"
              : status === "dispatched"
              ? "In Transit / Dispatched"
              : "Eligible for Gift Box"}
          </Badge>
        </div>
      </LayerCard.Secondary>

      <LayerCard.Primary>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-base text-kumo-default">{memberName}</h4>
              <p className="text-xs text-kumo-subtle mt-0.5">
                Completed via: <strong className="text-kumo-default font-medium">{completionChannel}</strong> on {completionDate}
              </p>
            </div>
            <Badge variant="outline">{zoneName}</Badge>
          </div>

          <div className="p-3 rounded-lg border border-kumo-hairline bg-kumo-recessed text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-kumo-subtle">Assigned Coordinator:</span>
              <span className="font-medium text-kumo-default">{coordinatorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-kumo-subtle">Gift Type:</span>
              <span className="font-medium text-kumo-default">Standard COZA Branded Welcome Box</span>
            </div>
            <div className="flex justify-between">
              <span className="text-kumo-subtle">Disparity Status:</span>
              <span className="text-emerald-400 font-medium">Harmonized 100% (No Gift Disparity)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-t border-kumo-hairline">
            <span className="text-xs text-kumo-subtle text-center sm:text-left">Handover Tracking</span>

            {status === "eligible" && (
              <Button variant="primary" size="sm" onClick={onDispatch} className="w-full sm:w-auto justify-center text-xs">
                Dispatch Gift Box
              </Button>
            )}

            {status === "dispatched" && (
              <Button variant="primary" size="sm" onClick={onConfirmReceipt} className="w-full sm:w-auto justify-center text-xs">
                Confirm Handover Receipt
              </Button>
            )}

            {status === "received" && (
              <span className="text-xs text-emerald-400 font-medium flex items-center justify-center sm:justify-end gap-1.5">
                <Icons.CheckCircle weight="fill" className="w-4 h-4" />
                <span>Handover Complete</span>
              </span>
            )}
          </div>
        </div>
      </LayerCard.Primary>
    </LayerCard>
  );
}
