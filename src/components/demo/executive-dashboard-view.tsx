"use client";

import React, { useState } from "react";
import {
  LayerCard,
  Badge,
  Select,
} from "@/design-system";
import { useDemo } from "@/context/demo-context";
import { AssimilationFunnelCard } from "@/components/coza";

export function ExecutiveDashboardView() {
  const { funnelStats, activeMember } = useDemo();
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
    <div className="space-y-6">
      {/* Narrative Context Card */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-kumo-line bg-kumo-elevated flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="purple" className="text-xs">Act 4: Senior Pastor Executive Command View</Badge>
            <span className="font-semibold text-xs sm:text-sm text-kumo-default">
              Multi-Branch Assimilation & Evangelism Analytics
            </span>
          </div>
          <p className="text-xs text-kumo-subtle leading-relaxed">
            Answers: &ldquo;What are branches doing this week to reach and retain souls? Where is the drop-off?&rdquo;
          </p>
        </div>

        <div className="w-full sm:w-56 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-kumo-hairline">
          <Select
            label="Filter Campus"
            value={selectedBranch}
            onValueChange={(val) => setSelectedBranch(val ?? "all")}
          >
            <Select.Option value="all">All COZA Global Campuses</Select.Option>
            <Select.Option value="guzape">The Guzape Campus</Select.Option>
            <Select.Option value="north">COZA North Church</Select.Option>
            <Select.Option value="maraba">COZA Maraba Branch</Select.Option>
            <Select.Option value="lugbe">COZA Lugbe Zone</Select.Option>
          </Select>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-xl border border-kumo-line bg-kumo-base space-y-1">
          <span className="text-[11px] sm:text-xs text-kumo-subtle block">New Guests (Month)</span>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-default font-mono">
            {funnelStats.firstTimers.toLocaleString()}
          </p>
          <span className="text-[10px] sm:text-[11px] text-emerald-400 font-medium block">↑ 18.4% vs last mo.</span>
        </div>

        <div className="p-3 sm:p-4 rounded-xl border border-kumo-line bg-kumo-base space-y-1">
          <span className="text-[11px] sm:text-xs text-kumo-subtle block">48h SLA Compliance</span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">92.4%</p>
          <span className="text-[10px] sm:text-[11px] text-kumo-subtle block truncate">Target: ≥ 90%</span>
        </div>

        <div className="p-3 sm:p-4 rounded-xl border border-kumo-line bg-kumo-base space-y-1">
          <span className="text-[11px] sm:text-xs text-kumo-subtle block">Gift Complaints</span>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-default font-mono">0</p>
          <span className="text-[10px] sm:text-[11px] text-emerald-400 font-medium block truncate">100% Gift Parity</span>
        </div>

        <div className="p-3 sm:p-4 rounded-xl border border-kumo-line bg-kumo-base space-y-1">
          <span className="text-[11px] sm:text-xs text-kumo-subtle block">Cold Leads Pool</span>
          <p className="text-xl sm:text-2xl font-extrabold text-kumo-default font-mono">38,420</p>
          <span className="text-[10px] sm:text-[11px] text-kumo-subtle block truncate">10.8% arrival rate</span>
        </div>
      </div>

      {/* Primary Assimilation Funnel */}
      <AssimilationFunnelCard
        branchName={
          selectedBranch === "all"
            ? "COZA Global — Consolidated Network (Guzape, North, Maraba, Lugbe)"
            : selectedBranch.toUpperCase()
        }
        stages={funnelStages}
      />

      {/* Branch Strategy & Evangelism Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Comparator */}
        <LayerCard className="p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-kumo-hairline">
            <h3 className="font-bold text-sm text-kumo-default">
              Branch-by-Branch Assimilation Health
            </h3>
            <Badge variant="outline">Weekly Comparison</Badge>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                branch: "The Guzape Campus",
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
                sla: "84% (SLA alert)",
                badge: "warning" as const,
              },
              {
                branch: "COZA Lugbe Zone",
                leads: "3,020 leads",
                firstTimers: 110,
                sla: "89% (5.2h avg)",
                badge: "purple" as const,
              },
            ].map((b) => (
              <div
                key={b.branch}
                className="p-3 rounded-lg border border-kumo-hairline bg-kumo-recessed flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-kumo-default">{b.branch}</span>
                  <p className="text-[11px] text-kumo-subtle">
                    {b.firstTimers} attendees • {b.leads}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={b.badge}>{b.sla}</Badge>
                </div>
              </div>
            ))}
          </div>
        </LayerCard>

        {/* Cold Lead to First-Timer Nurture Pipeline */}
        <LayerCard className="p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-kumo-hairline">
            <h3 className="font-bold text-sm text-kumo-default">
              Cold Leads Pipeline & Outreach Conversion
            </h3>
            <Badge variant="purple">38,420 Cold Contacts</Badge>
          </div>

          <p className="text-xs text-kumo-subtle leading-relaxed">
            Addresses the transcript finding where 20,000–50,000 evangelism contacts sat idle. Contacts are nurtured via SMS/custom atmosphere ringtones and automatically promoted to full member status upon arrival.
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg border border-kumo-hairline bg-kumo-recessed flex items-center justify-between">
              <div>
                <span className="font-semibold text-kumo-default">Saturday Roadshows & Outreach</span>
                <p className="text-[11px] text-kumo-subtle">184 workers deployed across 14 zones</p>
              </div>
              <Badge variant="outline">+1,240 contacts</Badge>
            </div>

            <div className="p-3 rounded-lg border border-kumo-hairline bg-kumo-recessed flex items-center justify-between">
              <div>
                <span className="font-semibold text-kumo-default">Automatic Promotion on First Visit</span>
                <p className="text-[11px] text-kumo-subtle">Auto-links evangelism lead phone to member profile</p>
              </div>
              <Badge variant="success">Auto-Synced</Badge>
            </div>

            <div className="p-3 rounded-lg border border-kumo-hairline bg-kumo-recessed flex items-center justify-between">
              <div>
                <span className="font-semibold text-kumo-default">Latest Promoted Lead</span>
                <p className="text-[11px] text-kumo-subtle">
                  {activeMember.name} (Garki Roadshow → Bus 4 → Guzape Member)
                </p>
              </div>
              <Badge variant="purple">Fully Assimilated</Badge>
            </div>
          </div>
        </LayerCard>
      </div>
    </div>
  );
}
