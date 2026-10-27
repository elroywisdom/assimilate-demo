"use client";

import React from "react";
import { Badge, LayerCard, cn } from "@/design-system";

export interface FunnelStage {
  name: string;
  count: number;
  rate: string;
  description: string;
}

export interface AssimilationFunnelCardProps {
  branchName: string;
  stages: FunnelStage[];
  className?: string;
}

export function AssimilationFunnelCard({
  branchName,
  stages,
  className,
}: AssimilationFunnelCardProps) {
  const maxCount = stages.length > 0 ? stages[0].count : 1;

  return (
    <LayerCard className={cn("overflow-hidden", className)}>
      <LayerCard.Secondary>
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-sm font-semibold text-kumo-default">
              End-to-End Assimilation Funnel
            </h3>
            <p className="text-xs text-kumo-subtle">{branchName}</p>
          </div>
          <Badge variant="purple">Live Funnel Analytics</Badge>
        </div>
      </LayerCard.Secondary>

      <LayerCard.Primary>
        <div className="space-y-4">
          <p className="text-xs text-kumo-subtle leading-relaxed">
            Tracks member conversion and retention drop-offs from first-time guest arrival to COZA Body spiritual discipleship.
          </p>

          <div className="space-y-3">
            {stages.map((stage, index) => {
              const widthPercent = Math.max(12, Math.round((stage.count / maxCount) * 100));

              return (
                <div key={stage.name} className="space-y-1">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-xs">
                    <span className="font-semibold text-kumo-default truncate">
                      {index + 1}. {stage.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0 self-end xs:self-auto">
                      <span className="font-mono text-kumo-subtle text-[11px] sm:text-xs">{stage.rate}</span>
                      <span className="font-mono font-bold text-kumo-default text-xs sm:text-sm">{stage.count.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="h-2.5 rounded-full bg-kumo-recessed overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-kumo-brand-hover to-kumo-brand rounded-full transition-all"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>

                  <span className="text-[10px] text-kumo-subtle block">{stage.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </LayerCard.Primary>
    </LayerCard>
  );
}
