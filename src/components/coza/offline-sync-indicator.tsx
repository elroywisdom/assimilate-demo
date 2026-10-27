"use client";

import React from "react";
import { Badge, Button, cn, Icons } from "@/design-system";

export interface OfflineSyncIndicatorProps {
  isOnline: boolean;
  pendingCount: number;
  onSync?: () => void;
  isSyncing?: boolean;
  className?: string;
}

export function OfflineSyncIndicator({
  isOnline,
  pendingCount,
  onSync,
  isSyncing = false,
  className,
}: OfflineSyncIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg border border-kumo-line bg-kumo-base text-xs",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <Badge
          variant={isOnline ? "success" : "warning"}
          appearance="dot"
        >
          {isOnline ? "Online" : "Offline Mode"}
        </Badge>

        <span className="text-kumo-subtle">
          {pendingCount > 0 ? (
            <span>
              <strong className="text-kumo-default font-semibold">{pendingCount}</strong> records queued
            </span>
          ) : (
            "All manifests synced"
          )}
        </span>
      </div>

      {pendingCount > 0 && onSync && (
        <Button
          variant="outline"
          size="xs"
          onClick={onSync}
          loading={isSyncing}
          className="gap-1.5"
        >
          <Icons.ArrowsClockwise className="w-3.5 h-3.5" />
          <span>Sync Now</span>
        </Button>
      )}
    </div>
  );
}
