"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Badge,
  cn,
  Icons,
} from "@/design-system";
import { useDemo } from "@/context/demo-context";
import { MissedServiceAlertCard } from "@/components/coza";

interface ZonalMember {
  id: string;
  name: string;
  phone: string;
  address: string;
  hoursElapsed: number;
  contacted: boolean;
  addedToWhatsApp: boolean;
  invitedToSaturday: boolean;
  notes?: string;
  department?: string;
  mentor?: string;
}

export function ZonalCoordinatorView() {
  const {
    activeMember,
    updateActiveMember,
    roster,
    coldLeads,
    addColdLead,
    setCurrentPersona,
  } = useDemo();

  // In-App Screen Tab: "queue" | "outreach" | "fellowships" | "report"
  const [activeScreen, setActiveScreen] = useState<"queue" | "outreach" | "fellowships" | "report">("queue");
  const [activeZone] = useState("Maitama Extension");
  const [activeFilter, setActiveFilter] = useState<"all" | "sla">("all");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [whatsAppSuccess, setWhatsAppSuccess] = useState<string | null>(null);
  const [callLogSuccess, setCallLogSuccess] = useState<string | null>(null);
  const [callOutcome, setCallOutcome] = useState("Warmly welcomed; excited for baptism");
  const [prayerRequest, setPrayerRequest] = useState("Career breakthrough in civil service");

  // Saturday Outreach Contact logger
  const [streetName, setStreetName] = useState("");
  const [streetPhone, setStreetPhone] = useState("");
  const [streetLocation, setStreetLocation] = useState("Maitama Farmers Market Hub");
  const [outreachSuccess, setOutreachSuccess] = useState(false);

  // Zone souls list
  const [zoneMembers, setZoneMembers] = useState<ZonalMember[]>([
    {
      id: "samuel-adebayo",
      name: activeMember.name,
      phone: activeMember.phone,
      address: activeMember.address,
      hoursElapsed: 18,
      contacted: activeMember.zonalContacted,
      addedToWhatsApp: activeMember.addedToWhatsApp,
      invitedToSaturday: activeMember.invitedToSaturdayCommunity,
      notes: "Newly baptized soul from Bus 4 Garki route. Eager to volunteer in choir.",
      department: activeMember.department,
      mentor: activeMember.spiritualMentor,
    },
    {
      id: "blessing-udoh",
      name: "Sister Blessing Udoh",
      phone: "+234 802 111 2233",
      address: "Maitama Shopping Complex Hub",
      hoursElapsed: 36,
      contacted: true,
      addedToWhatsApp: true,
      invitedToSaturday: false,
      notes: "Interested in e-Kids Children Church volunteering.",
      department: "e-Kids Children Church",
      mentor: "Deaconess Sarah",
    },
    {
      id: "emmanuel-kalu",
      name: "Brother Emmanuel Kalu",
      phone: "+234 813 444 9900",
      address: "Ministers Hill, Maitama",
      hoursElapsed: 52,
      contacted: false,
      addedToWhatsApp: false,
      invitedToSaturday: false,
      notes: "First timer from Sunday 2nd service; needs follow-up.",
    },
  ]);

  const [selectedSoulId, setSelectedSoulId] = useState<string>("samuel-adebayo");
  const selectedSoul = zoneMembers.find((m) => m.id === selectedSoulId) || zoneMembers[0];

  const atRiskMember = roster.find((m) => m.consecutiveMisses >= 2);

  const toggleChecklist = (
    memberId: string,
    field: "contacted" | "addedToWhatsApp" | "invitedToSaturday"
  ) => {
    setZoneMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextVal = !m[field];
          if (memberId === activeMember.id || m.name === activeMember.name) {
            updateActiveMember({
              ...(field === "contacted" && { zonalContacted: nextVal }),
              ...(field === "addedToWhatsApp" && { addedToWhatsApp: nextVal }),
              ...(field === "invitedToSaturday" && { invitedToSaturdayCommunity: nextVal }),
            });
          }
          return { ...m, [field]: nextVal };
        }
        return m;
      })
    );
  };

  const handleSendWhatsAppSimulation = () => {
    toggleChecklist(selectedSoul.id, "contacted");
    toggleChecklist(selectedSoul.id, "addedToWhatsApp");
    setWhatsAppSuccess(`Welcome message transmitted via WhatsApp to ${selectedSoul.name}`);
    setTimeout(() => setWhatsAppSuccess(null), 3500);
  };

  const handleSaveCallOutcome = () => {
    setZoneMembers((prev) =>
      prev.map((m) =>
        m.id === selectedSoul.id
          ? {
              ...m,
              contacted: true,
              notes: `${m.notes || ""} [Call Log]: ${callOutcome} | Prayer: ${prayerRequest}`,
            }
          : m
      )
    );
    if (selectedSoul.id === activeMember.id) {
      updateActiveMember({ zonalContacted: true });
    }
    setCallLogSuccess(`Saved call log and prayer request for ${selectedSoul.name}`);
    setTimeout(() => setCallLogSuccess(null), 3500);
  };

  const handleAddOutreachLead = () => {
    if (!streetName || !streetPhone) return;
    addColdLead({
      name: streetName,
      phone: streetPhone,
      outreachLocation: streetLocation,
      notes: "Captured during Saturday neighborhood street roadshow.",
    });
    setOutreachSuccess(true);
    setStreetName("");
    setStreetPhone("");
    setTimeout(() => setOutreachSuccess(false), 3500);
  };

  const filteredMembers = zoneMembers.filter((m) => {
    if (activeFilter === "sla") return !m.contacted;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto pb-28 space-y-4">
      {/* Clean Zonal Header */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-kumo-line bg-kumo-base shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-kumo-brand/10 border border-kumo-brand/30 flex items-center justify-center shrink-0">
              <Icons.UsersThree className="w-4 h-4 text-kumo-brand" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-kumo-default truncate">Zonal Pastoral Care</span>
                <Badge variant="purple" className="text-[10px] py-0 px-1.5 shrink-0">{activeZone}</Badge>
              </div>
              <span className="text-[11px] text-kumo-subtle truncate block">
                Coordinator: Deaconess Sarah • 48h SLA Care
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="px-2 py-1 rounded-lg bg-kumo-elevated border border-kumo-hairline font-mono text-[11px] font-bold text-emerald-400">
              67% SLA
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {whatsAppSuccess && (
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2 shadow-xs">
          <Icons.CheckCircle weight="fill" className="w-4 h-4 shrink-0" />
          <span>{whatsAppSuccess}</span>
        </div>
      )}

      {callLogSuccess && (
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2 shadow-xs">
          <Icons.CheckCircle weight="fill" className="w-4 h-4 shrink-0" />
          <span>{callLogSuccess}</span>
        </div>
      )}

      {reportSubmitted && (
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <Icons.CheckCircle weight="fill" className="w-4 h-4 shrink-0" />
            <span>Weekly pastoral report sent to Central Branch.</span>
          </div>
          <Button variant="ghost" size="xs" onClick={() => setReportSubmitted(false)}>
            Dismiss
          </Button>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 1: 48H SLA SOUL CARE QUEUE                              */}
      {/* ============================================================ */}
      {activeScreen === "queue" && (
        <div className="space-y-3">
          {/* Filter Pills */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
                  activeFilter === "all"
                    ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                    : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
                )}
              >
                All Assigned ({zoneMembers.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("sla")}
                className={cn(
                  "px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer whitespace-nowrap",
                  activeFilter === "sla"
                    ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default"
                    : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
                )}
              >
                Needs Call
              </button>
            </div>
            <span className="text-[11px] text-kumo-subtle">48h SLA Window</span>
          </div>

          {/* Member Soul Cards with Direct Action */}
          <div className="space-y-2.5">
            {filteredMembers.map((member) => {
              const isOverdue = member.hoursElapsed > 48 && !member.contacted;

              return (
                <div
                  key={member.id}
                  className="p-3.5 rounded-xl border border-kumo-line bg-kumo-base space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-kumo-default">{member.name}</span>
                        <Badge
                          variant={member.contacted ? "success" : isOverdue ? "error" : "warning"}
                          className="text-[10px] py-0 px-1.5"
                        >
                          {member.contacted
                            ? "Welcomed ✓"
                            : isOverdue
                            ? `Overdue (${member.hoursElapsed}h)`
                            : `${member.hoursElapsed}h / 48h`}
                        </Badge>
                      </div>
                      <span className="text-[11px] text-kumo-subtle block">{member.phone} • {member.address}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => {
                        setSelectedSoulId(member.id);
                        setActiveScreen("outreach");
                      }}
                      className="text-xs shrink-0 gap-1 font-semibold"
                    >
                      <Icons.ChatCircleDots className="w-3.5 h-3.5 text-kumo-brand" />
                      <span>Reach Out</span>
                    </Button>
                  </div>

                  {/* 3-Point Checklist */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-kumo-hairline text-[11px]">
                    <button
                      type="button"
                      onClick={() => toggleChecklist(member.id, "contacted")}
                      className={cn(
                        "p-1.5 rounded-lg border text-center transition-all cursor-pointer font-medium truncate",
                        member.contacted
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                      )}
                    >
                      {member.contacted ? "✓ Welcomed" : "○ Call"}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleChecklist(member.id, "addedToWhatsApp")}
                      className={cn(
                        "p-1.5 rounded-lg border text-center transition-all cursor-pointer font-medium truncate",
                        member.addedToWhatsApp
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                      )}
                    >
                      {member.addedToWhatsApp ? "✓ WhatsApp" : "○ WhatsApp"}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleChecklist(member.id, "invitedToSaturday")}
                      className={cn(
                        "p-1.5 rounded-lg border text-center transition-all cursor-pointer font-medium truncate",
                        member.invitedToSaturday
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                      )}
                    >
                      {member.invitedToSaturday ? "✓ Fellowship" : "○ Fellowship"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Absence Watchlist Alert */}
          {atRiskMember && (
            <MissedServiceAlertCard
              memberName={atRiskMember.name}
              phone={atRiskMember.phone}
              consecutiveMisses={atRiskMember.consecutiveMisses}
              lastAttendedService="Sunday 1st Service, 2 Weeks Ago"
              zoneName={atRiskMember.zone}
              coordinatorName={atRiskMember.zonalCoordinator}
              onCallMember={() => alert(`Care call initiated for ${atRiskMember.name}`)}
            />
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: OUTREACH & PASTORAL CALL LOGGER                      */}
      {/* ============================================================ */}
      {activeScreen === "outreach" && (
        <div className="space-y-3">
          {/* Target Soul Card */}
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-kumo-subtle block">Outreach Recipient</span>
                <span className="font-bold text-sm sm:text-base text-kumo-default">{selectedSoul.name}</span>
              </div>
              <Badge variant="purple" className="text-xs">{selectedSoul.phone}</Badge>
            </div>

            {/* Quick WhatsApp Action */}
            <div className="p-3 rounded-xl bg-kumo-elevated border border-kumo-hairline space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-kumo-default">WhatsApp Welcome Template</span>
                <Badge variant="green" className="text-[10px]">1-Tap</Badge>
              </div>
              <p className="text-[11px] text-kumo-subtle italic bg-kumo-recessed p-2.5 rounded-lg border border-kumo-hairline">
                &ldquo;Dear {selectedSoul.name.split(" ")[1] || selectedSoul.name}, welcome to COZA! We are thrilled to host you. Your coordinator Deaconess Sarah is available for any prayers or questions.&rdquo;
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendWhatsAppSimulation}
                className="w-full justify-center gap-1.5 text-xs font-bold py-2"
              >
                <Icons.ChatCircleDots className="w-4 h-4" />
                <span>Transmit Official WhatsApp Welcome</span>
              </Button>
            </div>

            {/* Pastoral Call Logger */}
            <div className="space-y-2.5 pt-2 border-t border-kumo-hairline">
              <span className="text-xs font-bold text-kumo-default block">Pastoral Call Outcome</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "Warmly welcomed; excited for baptism",
                  "Requested pastoral counseling",
                  "Invited to Saturday Fellowship",
                  "Needs follow-up visit",
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setCallOutcome(status)}
                    className={cn(
                      "p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer truncate",
                      callOutcome === status
                        ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default font-semibold"
                        : "bg-kumo-recessed border-kumo-hairline text-kumo-subtle"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <Input
                label="Prayer Request"
                placeholder="e.g. Job interview on Thursday, family peace"
                value={prayerRequest}
                onChange={(e) => setPrayerRequest(e.target.value)}
                aria-label="Pastoral prayer request"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveCallOutcome}
                className="w-full justify-center gap-1.5 text-xs font-semibold py-2"
              >
                <Icons.Check className="w-3.5 h-3.5" />
                <span>Save Pastoral Call Notes</span>
              </Button>
            </div>
          </div>

          {/* Saturday Street Soul Logger */}
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <span className="text-xs font-bold text-kumo-default block">Log Saturday Street Soul</span>
            <div className="space-y-2">
              <Input
                placeholder="Full Name (e.g. Sister Mercy)"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                aria-label="Street soul full name"
              />
              <Input
                placeholder="Phone (+234 800 000 0000)"
                value={streetPhone}
                onChange={(e) => setStreetPhone(e.target.value)}
                aria-label="Street soul phone number"
              />
              <Input
                placeholder="Location (e.g. Maitama Farmers Market)"
                value={streetLocation}
                onChange={(e) => setStreetLocation(e.target.value)}
                aria-label="Street soul location"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddOutreachLead}
                disabled={!streetName.trim() || !streetPhone.trim()}
                className="w-full justify-center text-xs font-bold py-2"
              >
                <Icons.Plus className="w-3.5 h-3.5" />
                <span>Save Outreach Contact</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: HOUSE FELLOWSHIPS & CENTERS                          */}
      {/* ============================================================ */}
      {activeScreen === "fellowships" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-kumo-default">House Fellowship Cell Centers</h3>
                <p className="text-[11px] text-kumo-subtle">Maitama Extension Pastoral Zones</p>
              </div>
              <Badge variant="purple" className="text-xs font-bold">3 Centers</Badge>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  name: "Maitama Farmers Market Hub",
                  host: "Elder & Deaconess Johnson",
                  address: "Plot 42, Aguiyi Ironsi Way",
                  time: "Tuesdays 6:00 PM",
                  membersCount: 14,
                },
                {
                  name: "Ministers Hill Sanctuary Cell",
                  host: "Bro. Collins & Sis. Esther",
                  address: "No. 8 Rhine Street, Maitama",
                  time: "Tuesdays 6:00 PM",
                  membersCount: 9,
                },
                {
                  name: "Guzape View Fellowship Hub",
                  host: "Pastor & Mrs. Adebayo",
                  address: "12 Asokoro Ext., Guzape Hills",
                  time: "Saturdays 5:00 PM",
                  membersCount: 19,
                },
              ].map((cell) => (
                <div
                  key={cell.name}
                  className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-kumo-default">{cell.name}</span>
                    <Badge variant="blue" className="text-[10px]">{cell.membersCount} Souls</Badge>
                  </div>
                  <span className="text-[11px] text-kumo-subtle block">Host: {cell.host}</span>
                  <div className="flex items-center justify-between text-[10px] text-kumo-inactive pt-1 border-t border-kumo-hairline">
                    <span>{cell.address}</span>
                    <span className="text-kumo-brand font-medium">{cell.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: WEEKLY REPORT & ANALYTICS                             */}
      {/* ============================================================ */}
      {activeScreen === "report" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-3">
            <h3 className="font-bold text-sm text-kumo-default">Weekly Zonal Pastoral Summary</h3>

            <div className="p-3.5 rounded-xl bg-kumo-recessed border border-kumo-hairline space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Assigned Souls Contacted:</span>
                <span className="font-semibold text-kumo-default">2 of 3 (67%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Saturday Street Leads:</span>
                <span className="font-semibold text-kumo-default">{coldLeads.length} Logged</span>
              </div>
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Active Cell Fellowship Hosts:</span>
                <span className="font-semibold text-kumo-default">3 Operating Centers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-kumo-subtle">Absence Retention Alerts:</span>
                <span className="font-semibold text-rose-400">1 Soul Flagged</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="base"
              onClick={() => setReportSubmitted(true)}
              className="w-full justify-center gap-1.5 text-xs font-bold py-2.5 shadow-md"
            >
              <Icons.FileText className="w-4 h-4" />
              <span>Submit Weekly Report to Leadership</span>
            </Button>
          </div>

          {/* Transition Prompt to Senior Pastor */}
          <div className="p-4 rounded-2xl border border-kumo-line bg-kumo-base space-y-2">
            <div className="flex items-center gap-2">
              <Icons.ChartBar className="w-4 h-4 text-kumo-brand" />
              <span className="font-bold text-xs text-kumo-default">Senior Pastor Global Overview</span>
            </div>
            <p className="text-xs text-kumo-subtle">
              Review campus-level assimilation performance and retention conversion rates.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPersona("executive-dashboard")}
              className="w-full justify-center gap-1.5 text-xs font-semibold"
            >
              <span>Switch to Senior Pastor Dashboard</span>
              <Icons.ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* NATIVE APP BOTTOM NAVBAR — ZONAL COORDINATOR                 */}
      {/* ============================================================ */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-kumo-base/95 backdrop-blur-xl border-t border-kumo-line py-2 px-4 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            type="button"
            onClick={() => setActiveScreen("queue")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "queue"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.Clock className="w-5 h-5" weight={activeScreen === "queue" ? "fill" : "regular"} />
            <span className="text-[10px]">48h Queue</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen("outreach")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "outreach"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.ChatCircleDots className="w-5 h-5" weight={activeScreen === "outreach" ? "fill" : "regular"} />
            <span className="text-[10px]">Outreach</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen("fellowships")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "fellowships"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.House className="w-5 h-5" weight={activeScreen === "fellowships" ? "fill" : "regular"} />
            <span className="text-[10px]">Cells</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen("report")}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              activeScreen === "report"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.FileText className="w-5 h-5" weight={activeScreen === "report" ? "fill" : "regular"} />
            <span className="text-[10px]">Report</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
