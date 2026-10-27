"use client";

import React, { useState } from "react";
import {
  Badge,
  Select,
  cn,
  Icons,
} from "@/design-system";
import { useDemo } from "@/context/demo-context";
import { AssimilationFunnelCard } from "@/components/coza";

export function ExecutiveDashboardView() {
  const { funnelStats, activeMember } = useDemo();
  // In-App Screen Tab: "funnel" | "campuses" | "health"
  const [activeTab, setActiveTab] = useState<"funnel" | "campuses" | "health">("funnel");
  const [selectedBranch, setSelectedBranch] = useState("all");

  const funnelStages = [
    {
      name: "First-Time Guests Recorded",
      count: funnelStats.firstTimers,
      rate: "100%",
      description: "Recaptured via Bus manifests, PCU desk check-ins, and self-arrivals",
    },
    {
      name: "Enrolled in Believers' Class",
      count: funnelStats.enrolledClass,
      rate: `${((funnelStats.enrolledClass / funnelStats.firstTimers) * 100).toFixed(1)}%`,
      description: "Active in 10-day cohort (modular video topics + quizzes)",
    },
    {
      name: "Class Completed & Gift Delivered",
      count: funnelStats.completedClass,
      rate: `${((funnelStats.completedClass / funnelStats.firstTimers) * 100).toFixed(1)}%`,
      description: "100% gift box parity across digital & physical completers",
    },
    {
      name: "Water Baptized & Zonal Assigned",
      count: funnelStats.baptized,
      rate: `${((funnelStats.baptized / funnelStats.firstTimers) * 100).toFixed(1)}%`,
      description: "Digital certificate issued & auto-mapped to nearest residential coordinator",
    },
    {
      name: "Assimilated into Local Community",
      count: funnelStats.communityAssimilated,
      rate: `${((funnelStats.communityAssimilated / funnelStats.firstTimers) * 100).toFixed(1)}%`,
      description: "Added to Zone WhatsApp, welcomed within 48h, plugged into COZA Body",
    },
  ];

  return (
    <div className="max-w-xl mx-auto pb-28 space-y-4">
      {/* Executive Clean Header */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-kumo-line bg-kumo-base shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-kumo-brand/10 border border-kumo-brand/30 flex items-center justify-center shrink-0">
              <Icons.ChartBar className="w-4 h-4 text-kumo-brand" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-kumo-default truncate">Senior Pastor Executive</span>
                <Badge variant="purple" className="text-[10px] py-0 px-1.5 shrink-0">Global</Badge>
              </div>
              <span className="text-[11px] text-kumo-subtle truncate block">
                COZA Assimilation & Evangelism Analytics
              </span>
            </div>
          </div>

          <div className="w-36 shrink-0">
            <Select
              label="Campus"
              value={selectedBranch}
              onValueChange={(val) => setSelectedBranch(val ?? "all")}
            >
              <Select.Option value="all">All Campuses</Select.Option>
              <Select.Option value="guzape">Guzape Campus</Select.Option>
              <Select.Option value="north">North Church</Select.Option>
              <Select.Option value="maraba">Maraba Branch</Select.Option>
              <Select.Option value="lugbe">Lugbe Zone</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: FUNNEL & GLOBAL KPIS                                  */}
      {/* ============================================================ */}
      {activeTab === "funnel" && (
        <div className="space-y-3">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl border border-kumo-line bg-kumo-base space-y-0.5">
              <span className="text-[11px] text-kumo-subtle block font-medium">New Guests (Month)</span>
              <p className="text-xl font-extrabold text-kumo-default font-mono">
                {funnelStats.firstTimers.toLocaleString()}
              </p>
              <span className="text-[10px] text-emerald-400 font-medium">↑ 18.4% vs last mo.</span>
            </div>

            <div className="p-3 rounded-xl border border-kumo-line bg-kumo-base space-y-0.5">
              <span className="text-[11px] text-kumo-subtle block font-medium">48h SLA Compliance</span>
              <p className="text-xl font-extrabold text-emerald-400 font-mono">92.4%</p>
              <span className="text-[10px] text-kumo-subtle">Target: ≥ 90%</span>
            </div>

            <div className="p-3 rounded-xl border border-kumo-line bg-kumo-base space-y-0.5">
              <span className="text-[11px] text-kumo-subtle block font-medium">Gift Parity</span>
              <p className="text-xl font-extrabold text-kumo-default font-mono">100%</p>
              <span className="text-[10px] text-emerald-400 font-medium">0 Discrepancy</span>
            </div>

            <div className="p-3 rounded-xl border border-kumo-line bg-kumo-base space-y-0.5">
              <span className="text-[11px] text-kumo-subtle block font-medium">Community Plugged</span>
              <p className="text-xl font-extrabold text-kumo-default font-mono">
                {funnelStats.communityAssimilated.toLocaleString()}
              </p>
              <span className="text-[10px] text-kumo-brand font-medium">In Cells & Workforce</span>
            </div>
          </div>

          {/* Primary Assimilation Funnel */}
          <AssimilationFunnelCard
            branchName={
              selectedBranch === "all"
                ? "COZA Global — Consolidated Network"
                : selectedBranch.toUpperCase()
            }
            stages={funnelStages}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: CAMPUS-BY-CAMPUS COMPARISON                           */}
      {/* ============================================================ */}
      {activeTab === "campuses" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-kumo-default">Branch Assimilation Health</h3>
                <p className="text-[11px] text-kumo-subtle">Comparative performance across global locations</p>
              </div>
              <Badge variant="purple" className="text-xs font-bold">5 Campuses</Badge>
            </div>

            <div className="space-y-2">
              {[
                {
                  branch: "The Guzape Campus (Global Headquarters)",
                  leads: "14,200 leads",
                  firstTimers: 640,
                  sla: "95% (2.1h avg)",
                  badge: "success" as const,
                },
                {
                  branch: "COZA North Church",
                  leads: "9,800 leads",
                  firstTimers: 380,
                  sla: "91% (4.8h avg)",
                  badge: "success" as const,
                },
                {
                  branch: "COZA Maraba Branch",
                  leads: "11,400 leads",
                  firstTimers: 290,
                  sla: "84% (Attention needed)",
                  badge: "warning" as const,
                },
                {
                  branch: "COZA Lugbe Zone",
                  leads: "3,020 leads",
                  firstTimers: 110,
                  sla: "89% (5.2h avg)",
                  badge: "purple" as const,
                },
                {
                  branch: "COZA London Church",
                  leads: "2,450 leads",
                  firstTimers: 95,
                  sla: "98% (1.4h avg)",
                  badge: "success" as const,
                },
              ].map((b) => (
                <div
                  key={b.branch}
                  className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-kumo-default truncate block">{b.branch}</span>
                    <span className="text-[11px] text-kumo-subtle block">
                      {b.firstTimers} attendees • {b.leads}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <Badge variant={b.badge}>{b.sla}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: RETENTION & EVANGELISM HEALTH                         */}
      {/* ============================================================ */}
      {activeTab === "health" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-kumo-default">Evangelism Nurture & Retention</h3>
                <p className="text-[11px] text-kumo-subtle">Cold contacts automatic reactivation pipeline</p>
              </div>
              <Badge variant="purple" className="text-xs font-bold">38,420 Pool</Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated flex items-center justify-between">
                <div>
                  <span className="font-bold text-kumo-default block">Saturday Field Roadshows</span>
                  <span className="text-[11px] text-kumo-subtle">184 workers active across 14 zones</span>
                </div>
                <Badge variant="outline">+1,240 weekly</Badge>
              </div>

              <div className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated flex items-center justify-between">
                <div>
                  <span className="font-bold text-kumo-default block">Automatic First-Visit Sync</span>
                  <span className="text-[11px] text-kumo-subtle">Auto-links outreach phone to church check-in</span>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated flex items-center justify-between">
                <div>
                  <span className="font-bold text-kumo-default block">Featured Assimilation Journey</span>
                  <span className="text-[11px] text-kumo-subtle">
                    {activeMember.name} (Roadshow → Bus 4 → Guzape Member)
                  </span>
                </div>
                <Badge variant="purple">Fully Assimilated</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* NATIVE APP BOTTOM NAVBAR — SENIOR PASTOR EXECUTIVE          */}
      {/* ============================================================ */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-kumo-base/95 backdrop-blur-xl border-t border-kumo-line py-2 px-4 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            type="button"
            onClick={() => setActiveTab("funnel")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeTab === "funnel"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.ChartBar className="w-5 h-5" weight={activeTab === "funnel" ? "fill" : "regular"} />
            <span className="text-[10px]">Funnel</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("campuses")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeTab === "campuses"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.Buildings className="w-5 h-5" weight={activeTab === "campuses" ? "fill" : "regular"} />
            <span className="text-[10px]">Campuses</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("health")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeTab === "health"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.Heartbeat className="w-5 h-5" weight={activeTab === "health" ? "fill" : "regular"} />
            <span className="text-[10px]">Retention</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
