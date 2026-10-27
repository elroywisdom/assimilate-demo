"use client";

import React from "react";
import { Badge, Button, LayerCard, cn, Icons } from "@/design-system";

export interface DigitalBaptismCertificateCardProps {
  memberName: string;
  certificateId: string;
  baptismDate: string;
  location: string;
  ministerName: string;
  zoneAssigned: string;
  onDownload?: () => void;
  onReissue?: () => void;
  className?: string;
}

export function DigitalBaptismCertificateCard({
  memberName,
  certificateId,
  baptismDate,
  location,
  ministerName,
  zoneAssigned,
  onDownload,
  onReissue,
  className,
}: DigitalBaptismCertificateCardProps) {
  return (
    <LayerCard className={cn("overflow-hidden", className)}>
      <LayerCard.Secondary>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Icons.Drop className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-kumo-default">
              Water Baptism Certificate
            </span>
          </div>
          <Badge variant="success" appearance="dot">
            Verified Record
          </Badge>
        </div>
      </LayerCard.Secondary>

      <LayerCard.Primary>
        <div className="space-y-4">
          {/* Certificate Header Banner */}
          <div className="p-4 rounded-xl border border-kumo-line bg-kumo-elevated space-y-2 text-center">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-kumo-subtle">
              Commonwealth of Zion Assembly
            </span>
            <h3 className="text-lg font-bold text-kumo-default tracking-tight">
              Certificate of Water Baptism
            </h3>
            <p className="text-sm font-semibold text-kumo-brand">{memberName}</p>
            <p className="text-[11px] text-kumo-subtle max-w-sm mx-auto">
              Having confessed faith in Jesus Christ and followed Him in the waters of baptism in accordance with the New Testament.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-kumo-recessed border border-kumo-hairline">
              <span className="text-kumo-subtle block text-[10px]">Date & Location</span>
              <span className="font-medium text-kumo-default text-xs">{baptismDate}</span>
              <span className="text-kumo-subtle block text-[11px] truncate">{location}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-kumo-recessed border border-kumo-hairline">
              <span className="text-kumo-subtle block text-[10px]">Officiating Minister</span>
              <span className="font-medium text-kumo-default text-xs">{ministerName}</span>
              <span className="text-kumo-subtle block text-[11px]">Auto-Mapped: {zoneAssigned}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-t border-kumo-hairline">
            <span className="font-mono text-xs text-kumo-subtle text-center sm:text-left">{certificateId}</span>
            <div className="flex items-center gap-2 justify-end">
              {onReissue && (
                <Button variant="ghost" size="xs" onClick={onReissue} className="text-xs">
                  Re-Issue
                </Button>
              )}
              {onDownload && (
                <Button variant="outline" size="sm" onClick={onDownload} className="gap-1.5 text-xs flex-1 sm:flex-none justify-center">
                  <Icons.DownloadSimple className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </LayerCard.Primary>
    </LayerCard>
  );
}
