"use client";

import React, { useState } from "react";
import {
  Button,
  Badge,
  Dialog,
  cn,
  Icons,
} from "@/design-system";
import { useDemo } from "@/context/demo-context";
import {
  TopicQuizCard,
  DigitalBaptismCertificateCard,
  GiftBoxDispatchCard,
  DepartmentPlacementCard,
} from "@/components/coza";

interface LessonData {
  id: string;
  youtubeId: string;
  moduleTitle: string;
  topicTitle: string;
  topicNumber: number;
  totalTopics: number;
  durationMinutes: number;
  speakerName: string;
  scriptureRef: string;
  scriptureText: string;
  upNextTopic: string;
  pdfNotesSize: string;
}

const LESSONS: LessonData[] = [
  {
    id: "lesson-1",
    youtubeId: "LZEW-cf4Plg",
    moduleTitle: "Module 1",
    topicTitle: "Foundations of Faith & Divine Nature",
    topicNumber: 1,
    totalTopics: 3,
    durationMinutes: 14,
    speakerName: "Pastor Biodun Fatoyinbo",
    scriptureRef: "2 Corinthians 5:17 · NKJV",
    scriptureText: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.",
    upNextTopic: "The Believer's Authority · Topic 2",
    pdfNotesSize: "1.4 MB",
  },
  {
    id: "lesson-2",
    youtubeId: "3IXGc7GVhRM",
    moduleTitle: "Module 1",
    topicTitle: "Understanding Speaking in Tongues",
    topicNumber: 2,
    totalTopics: 3,
    durationMinutes: 12,
    speakerName: "Pastor Biodun Fatoyinbo",
    scriptureRef: "1 Corinthians 14:2 · NKJV",
    scriptureText: "For he who speaks in a tongue does not speak to men but to God, for no one understands him; however, in the spirit he speaks mysteries.",
    upNextTopic: "The life of prayer · Topic 3",
    pdfNotesSize: "1.2 MB",
  },
  {
    id: "lesson-3",
    youtubeId: "Qk7OIe9ck5s",
    moduleTitle: "Module 1",
    topicTitle: "Spiritual Gifts & Church Vision",
    topicNumber: 3,
    totalTopics: 3,
    durationMinutes: 16,
    speakerName: "Pastor Biodun Fatoyinbo",
    scriptureRef: "Ephesians 4:11-12 · NKJV",
    scriptureText: "And He Himself gave some to be apostles, some prophets, some evangelists, and some pastors and teachers, for the equipping of the saints.",
    upNextTopic: "Course Assessment & Water Baptism",
    pdfNotesSize: "1.8 MB",
  },
];

export function MemberPortalView() {
  const {
    activeMember,
    updateActiveMember,
    bookBaptismSlot,
    assignMinistryDepartment,
    setCurrentPersona,
  } = useDemo();

  // Mobile Screen Mode: "home" | "player" | "baptism" | "gift" | "placement"
  const [mobileScreen, setMobileScreen] = useState<"home" | "player" | "baptism" | "gift" | "placement">("home");
  const [activeBottomNav, setActiveBottomNav] = useState<"home" | "learn" | "baptism" | "placement">("home");
  const [activeTab, setActiveTab] = useState<"overview" | "scripture" | "curriculum">("overview");
  const [activeLessonIndex, setActiveLessonIndex] = useState(1); // default to Topic 2 as in screenshot
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [lowDataMode, setLowDataMode] = useState(true);
  const [selectedRobeSize, setSelectedRobeSize] = useState<"S" | "M" | "L" | "XL">(activeMember.baptismRobeSize || "M");
  const [baptismSlot] = useState("Saturday, Oct 31, 2026 • 09:00 AM (Guzape Pool)");

  const currentLesson = LESSONS[activeLessonIndex] || LESSONS[0];

  const handleTopicComplete = () => {
    updateActiveMember({
      classModulesCompleted: 4,
      classStatus: "completed",
      giftStatus: "eligible",
    });
  };

  const handleQuizPass = () => {
    updateActiveMember({
      classQuizPassed: true,
      classStatus: "completed",
      giftStatus: "eligible",
      baptismStatus: "completed",
    });
    setQuizModalOpen(false);
    setMobileScreen("baptism");
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-28">
      {/* Clean Member Portal Header */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-kumo-line bg-kumo-elevated flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-extrabold text-sm sm:text-base text-kumo-default">Believers&apos; Class Portal</h2>
            <Badge variant="purple" className="text-[10px] py-0 px-1.5">Cohort 26</Badge>
          </div>
          <span className="text-[11px] text-kumo-subtle block">
            Student: {activeMember.name} • 10-Day Assimilation Path
          </span>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-kumo-recessed border border-kumo-hairline text-xs overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileScreen("home");
              setActiveBottomNav("home");
            }}
            className={cn(
              "px-2.5 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap text-xs",
              mobileScreen === "home"
                ? "bg-kumo-base text-kumo-default shadow-xs"
                : "text-kumo-subtle hover:text-kumo-default"
            )}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileScreen("player");
              setActiveBottomNav("learn");
            }}
            className={cn(
              "px-2.5 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap text-xs",
              mobileScreen === "player"
                ? "bg-kumo-base text-kumo-default shadow-xs"
                : "text-kumo-subtle hover:text-kumo-default"
            )}
          >
            Video Lesson
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileScreen("baptism");
              setActiveBottomNav("baptism");
            }}
            className={cn(
              "px-2.5 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap text-xs",
              mobileScreen === "baptism"
                ? "bg-kumo-base text-kumo-default shadow-xs"
                : "text-kumo-subtle hover:text-kumo-default"
            )}
          >
            Baptism
          </button>
          <button
            type="button"
            onClick={() => setMobileScreen("gift")}
            className={cn(
              "px-2.5 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap text-xs",
              mobileScreen === "gift"
                ? "bg-kumo-base text-kumo-default shadow-xs"
                : "text-kumo-subtle hover:text-kumo-default"
            )}
          >
            Welcome Gift
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileScreen("placement");
              setActiveBottomNav("placement");
            }}
            className={cn(
              "px-2.5 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap text-xs",
              mobileScreen === "placement"
                ? "bg-kumo-base text-kumo-default shadow-xs"
                : "text-kumo-subtle hover:text-kumo-default"
            )}
          >
            Placement
          </button>
        </div>
      </div>

      {/* Main Mobile Experience Container (Centered on desktop, full-width on mobile) */}
      <div className="max-w-md mx-auto bg-kumo-base border border-kumo-line rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[680px]">
        
        {/* ============================================================ */}
        {/* SCREEN 1: SCR-MEM-04 — Member Home Dashboard                */}
        {/* ============================================================ */}
        {mobileScreen === "home" && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="p-4 sm:p-5 space-y-4">
              
              {/* Top Greeting Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-kumo-subtle block">Welcome,</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-kumo-default tracking-tight">
                    {activeMember.name}
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-kumo-brand mt-0.5 font-medium">
                    <Icons.MapPin className="w-3.5 h-3.5" weight="fill" />
                    <span>COZA Guzape</span>
                  </div>
                </div>

                {/* Member Avatar */}
                <div className="relative w-11 h-11 rounded-full ring-2 ring-kumo-brand/30 bg-kumo-elevated flex items-center justify-center font-bold text-sm text-kumo-brand shadow-sm">
                  {activeMember.name.split(" ").map(n => n[0]).join("")}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-kumo-base" />
                </div>
              </div>

              {/* Assimilation Progress Card */}
              <div className="p-4 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-kumo-default">Your assimilation</h3>
                  <span className="text-xs font-mono font-semibold text-kumo-subtle">01 / 05</span>
                </div>

                {/* Vertical Timeline Steps */}
                <div className="space-y-2.5 pt-1">
                  {/* Step 1: Believers' Class (Active) */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-kumo-brand text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      1
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-kumo-default">Believers&apos; Class</span>
                        <span className="text-[10px] font-semibold text-kumo-brand">Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-kumo-recessed rounded-full overflow-hidden">
                          <div className="h-full bg-kumo-brand rounded-full w-[65%]" />
                        </div>
                        <span className="text-[10px] font-mono text-kumo-brand font-semibold">65%</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Gift Box */}
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-kumo-recessed border border-kumo-hairline text-kumo-subtle flex items-center justify-center text-xs font-medium shrink-0">
                      2
                    </div>
                    <span className="text-xs text-kumo-subtle">Gift Box</span>
                  </div>

                  {/* Step 3: Water Baptism */}
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-kumo-recessed border border-kumo-hairline text-kumo-subtle flex items-center justify-center text-xs font-medium shrink-0">
                      3
                    </div>
                    <span className="text-xs text-kumo-subtle">Water Baptism</span>
                  </div>

                  {/* Step 4: Zonal Community */}
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-kumo-recessed border border-kumo-hairline text-kumo-subtle flex items-center justify-center text-xs font-medium shrink-0">
                      4
                    </div>
                    <span className="text-xs text-kumo-subtle">Zonal Community</span>
                  </div>

                  {/* Step 5: COZA Body */}
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-kumo-recessed border border-kumo-hairline text-kumo-subtle flex items-center justify-center text-xs font-medium shrink-0">
                      5
                    </div>
                    <span className="text-xs text-kumo-subtle">COZA Body</span>
                  </div>
                </div>
              </div>

              {/* Believers' Class Cohort 12 Hero Card */}
              <div className="p-4 rounded-xl border border-kumo-line bg-kumo-elevated space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-kumo-default">Believers&apos; Class Cohort 12</span>
                  <Badge variant="warning" className="text-[10px] py-0 px-2 font-semibold">4 days left</Badge>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-kumo-subtle uppercase tracking-wider block">
                    KEEP GROWING IN FAITH
                  </span>
                  <h4 className="text-base font-extrabold text-kumo-default mt-0.5">
                    Module 2: Graces in the House
                  </h4>
                </div>

                <Button
                  variant="primary"
                  size="base"
                  onClick={() => {
                    setMobileScreen("player");
                    setActiveBottomNav("learn");
                  }}
                  className="w-full justify-center gap-2 font-semibold shadow-md cursor-pointer"
                >
                  <Icons.Play className="w-4 h-4" weight="fill" />
                  <span>Continue Lesson (12 min)</span>
                </Button>
              </div>

              {/* Bottom Quick Hub Cards (2 Columns) */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Assigned Zone Card */}
                <div className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-kumo-brand">
                      <Icons.Users className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">Assigned Zone</span>
                    </div>
                    <h5 className="font-bold text-xs text-kumo-default">{activeMember.zone}</h5>
                    <p className="text-[11px] text-kumo-subtle leading-tight">
                      {activeMember.zonalCoordinator}<br />
                      <span className="text-[10px]">Your coordinator</span>
                    </p>
                  </div>

                  <a
                    href="#whatsapp"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Connecting to ${activeMember.zone} WhatsApp community...`);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-kumo-brand hover:underline pt-1"
                  >
                    <Icons.ChatCircleDots className="w-3.5 h-3.5" />
                    <span>WhatsApp ↗</span>
                  </a>
                </div>

                {/* Up Next Card */}
                <div className="p-3 rounded-xl border border-kumo-hairline bg-kumo-elevated space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-kumo-brand">
                      <Icons.Calendar className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">Up next</span>
                    </div>
                    <h5 className="font-bold text-xs text-kumo-default">Next Community Hangout</h5>
                    <p className="text-[11px] font-semibold text-kumo-brand">
                      Sat, 24 Oct · 4 PM
                    </p>
                    <p className="text-[10px] text-kumo-subtle">Garki Zone 3 Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 2: SCR-MEM-05 — Believers' Class Video Player         */}
        {/* ============================================================ */}
        {mobileScreen === "player" && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 pb-4">
              
              {/* Top Navigation Bar with Back Arrow */}
              <div className="px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-kumo-hairline">
                <button
                  type="button"
                  onClick={() => {
                    setMobileScreen("home");
                    setActiveBottomNav("home");
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-kumo-default hover:bg-kumo-elevated cursor-pointer"
                  aria-label="Back to Home Dashboard"
                >
                  <Icons.ArrowLeft className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <h3 className="font-bold text-sm text-kumo-default">
                    {currentLesson.moduleTitle} • Topic {currentLesson.topicNumber} of {currentLesson.totalTopics}
                  </h3>
                </div>

                <Badge variant="purple" className="text-[10px] py-0.5 px-2 font-mono font-semibold">
                  60%
                </Badge>
              </div>

              {/* Responsive 16:9 Video Player */}
              <div className="px-4">
                <div className="relative aspect-video w-full rounded-xl bg-black border border-kumo-line overflow-hidden shadow-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentLesson.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={currentLesson.topicTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0"
                  />
                </div>
              </div>

              {/* Low Data Mode / Adaptive Playback Indicator */}
              <div className="px-4 flex items-center justify-between text-[11px] text-kumo-subtle">
                <div className="flex items-center gap-1.5">
                  <Icons.CellSignalFull className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Low-data mode · 360p adaptive playback</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLowDataMode(!lowDataMode)}
                  className="p-1 rounded text-kumo-subtle hover:text-kumo-default cursor-pointer"
                  title="Playback Settings"
                >
                  <Icons.Sliders className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Segmented Tabs (Overview | Scripture Notes | Curriculum) */}
              <div className="px-4 border-b border-kumo-hairline">
                <div className="flex items-center gap-6 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={cn(
                      "py-2 font-semibold relative cursor-pointer transition-colors",
                      activeTab === "overview"
                        ? "text-kumo-brand"
                        : "text-kumo-subtle hover:text-kumo-default"
                    )}
                  >
                    Overview
                    {activeTab === "overview" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kumo-brand rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("scripture")}
                    className={cn(
                      "py-2 font-semibold relative cursor-pointer transition-colors",
                      activeTab === "scripture"
                        ? "text-kumo-brand"
                        : "text-kumo-subtle hover:text-kumo-default"
                    )}
                  >
                    Scripture Notes
                    {activeTab === "scripture" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kumo-brand rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("curriculum")}
                    className={cn(
                      "py-2 font-semibold relative cursor-pointer transition-colors",
                      activeTab === "curriculum"
                        ? "text-kumo-brand"
                        : "text-kumo-subtle hover:text-kumo-default"
                    )}
                  >
                    Curriculum ({LESSONS.length})
                    {activeTab === "curriculum" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kumo-brand rounded-full" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tab Content 1: Overview */}
              {activeTab === "overview" && (
                <div className="px-4 space-y-3.5">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-kumo-default tracking-tight">
                      {currentLesson.topicTitle}
                    </h2>
                    <p className="text-xs text-kumo-subtle mt-0.5">{currentLesson.speakerName}</p>
                  </div>

                  {/* Download PDF Notes Chip */}
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${currentLesson.topicTitle} PDF Notes (${currentLesson.pdfNotesSize})...`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-kumo-elevated border border-kumo-hairline text-xs font-medium text-kumo-default hover:bg-kumo-recessed transition-all cursor-pointer"
                  >
                    <Icons.FilePdf className="w-4 h-4 text-kumo-brand" weight="fill" />
                    <span>PDF lesson notes · {currentLesson.pdfNotesSize}</span>
                  </button>

                  {/* Scripture Callout Blockquote with Purple Left Border */}
                  <div className="p-3.5 rounded-r-xl border-l-4 border-kumo-brand bg-kumo-elevated/70 space-y-1.5">
                    <p className="text-xs text-kumo-default italic leading-relaxed">
                      &ldquo;{currentLesson.scriptureText}&rdquo;
                    </p>
                    <span className="text-[11px] font-semibold text-kumo-brand block">
                      {currentLesson.scriptureRef}
                    </span>
                  </div>

                  {/* Up Next Preview */}
                  <div className="text-xs text-kumo-subtle pt-1">
                    <span>Up next: </span>
                    <strong className="text-kumo-default font-medium">{currentLesson.upNextTopic}</strong>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Scripture Notes */}
              {activeTab === "scripture" && (
                <div className="px-4 space-y-2.5 text-xs text-kumo-default">
                  <div className="p-3 rounded-lg bg-kumo-elevated border border-kumo-hairline space-y-1">
                    <span className="font-bold text-kumo-brand">1 Corinthians 14:1-4</span>
                    <p className="text-kumo-subtle">Pursue love, and desire spiritual gifts, but especially that you may prophesy...</p>
                  </div>
                  <div className="p-3 rounded-lg bg-kumo-elevated border border-kumo-hairline space-y-1">
                    <span className="font-bold text-kumo-brand">Acts 2:4</span>
                    <p className="text-kumo-subtle">And they were all filled with the Holy Spirit and began to speak with other tongues...</p>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Curriculum Playlist */}
              {activeTab === "curriculum" && (
                <div className="px-4 space-y-2">
                  {LESSONS.map((l, idx) => {
                    const isSelected = idx === activeLessonIndex;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setActiveLessonIndex(idx)}
                        className={cn(
                          "w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer",
                          isSelected
                            ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand shadow-xs"
                            : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:bg-kumo-elevated hover:text-kumo-default"
                        )}
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-kumo-default block">
                            Topic {l.topicNumber}: {l.topicTitle}
                          </span>
                          <span className="text-[11px] text-kumo-subtle">
                            {l.speakerName} • {l.durationMinutes} min
                          </span>
                        </div>
                        {isSelected ? (
                          <Badge variant="purple" className="text-[10px]">Playing</Badge>
                        ) : (
                          <Icons.Play className="w-3.5 h-3.5 text-kumo-subtle" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Full-Width Purple Action Button */}
            <div className="p-4 border-t border-kumo-line bg-kumo-base">
              <Button
                variant="primary"
                size="base"
                onClick={() => {
                  handleTopicComplete();
                  setQuizModalOpen(true);
                }}
                className="w-full justify-center py-3 font-bold text-sm shadow-lg cursor-pointer"
              >
                Complete Topic & Take Quiz
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 3: Water Baptism Booking & Digital Certificate        */}
        {/* ============================================================ */}
        {mobileScreen === "baptism" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-kumo-hairline">
              <button
                type="button"
                onClick={() => setMobileScreen("home")}
                className="text-xs text-kumo-brand font-medium flex items-center gap-1 cursor-pointer"
              >
                <Icons.ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span className="text-xs font-bold text-kumo-default">Water Baptism (PRD BAP-01)</span>
              <Badge variant={activeMember.baptismStatus === "completed" ? "success" : "purple"}>
                {activeMember.baptismStatus === "completed" ? "Baptized ✓" : "Immersion Slot"}
              </Badge>
            </div>

            {/* Baptism Booking Card if not completed or scheduling */}
            <div className="p-4 rounded-xl border border-kumo-line bg-kumo-elevated space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-kumo-default uppercase tracking-wider">
                  Water Immersion Ceremony Slot
                </span>
                <Badge variant="blue" className="text-[10px]">Guzape Pool Deck</Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-kumo-subtle block">Immersion Session:</span>
                  <div className="font-semibold text-kumo-default mt-0.5 p-2 rounded-lg bg-kumo-recessed border border-kumo-hairline">
                    {baptismSlot}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-kumo-subtle block mb-1">Select White Baptism Robe Size:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(["S", "M", "L", "XL"] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedRobeSize(size)}
                        className={cn(
                          "py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                          selectedRobeSize === size
                            ? "bg-kumo-brand text-white border-kumo-brand shadow-xs"
                            : "bg-kumo-base border-kumo-hairline text-kumo-subtle hover:text-kumo-default"
                        )}
                      >
                        Size {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-kumo-recessed border border-kumo-hairline space-y-1 text-[11px] text-kumo-subtle">
                  <div className="font-semibold text-kumo-default">Immersion Preparation Checklist:</div>
                  <div className="flex items-center gap-1.5">
                    <Icons.Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Bring clean change of clothes & towel</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icons.Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Orientation prayer with pastoral ministers at 08:30 AM</span>
                  </div>
                </div>
              </div>

              {activeMember.baptismStatus !== "completed" && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => bookBaptismSlot(baptismSlot.split("•")[0].trim(), selectedRobeSize)}
                  className="w-full justify-center text-xs"
                >
                  <Icons.ShieldCheck className="w-4 h-4 mr-1" />
                  <span>Confirm Baptism Booking & Generate Certificate</span>
                </Button>
              )}
            </div>

            {/* Verified Digital Certificate Card */}
            {activeMember.baptismStatus === "completed" && (
              <DigitalBaptismCertificateCard
                memberName={activeMember.name}
                certificateId={activeMember.baptismCertificateId || "COZA-BAP-2026-8492"}
                baptismDate={activeMember.baptismDate || "Saturday, Oct 31, 2026"}
                location="Guzape Campus Main Pool Deck"
                ministerName="Pastor Wole Soetan"
                zoneAssigned={activeMember.zone}
                onDownload={() => alert("Downloading PDF Certificate with gold seal...")}
                onReissue={() => alert("Reissue request submitted to church administration.")}
              />
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileScreen("gift")}
              className="w-full justify-center text-xs"
            >
              <span>Proceed to Welcome Gift Box Dispatch</span>
              <Icons.ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 4: Gift Box Parity Dispatch & Unboxing                */}
        {/* ============================================================ */}
        {mobileScreen === "gift" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-kumo-hairline">
              <button
                type="button"
                onClick={() => setMobileScreen("home")}
                className="text-xs text-kumo-brand font-medium flex items-center gap-1 cursor-pointer"
              >
                <Icons.ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span className="text-xs font-bold text-kumo-default">Welcome Gift Box</span>
              <Badge variant="purple">Parity 100%</Badge>
            </div>

            <GiftBoxDispatchCard
              memberName={activeMember.name}
              completionChannel="Digital Course"
              completionDate="Sunday, Oct 25, 2026"
              status={activeMember.giftStatus === "ineligible" ? "eligible" : activeMember.giftStatus}
              coordinatorName={activeMember.zonalCoordinator}
              zoneName={activeMember.zone}
              onDispatch={() => updateActiveMember({ giftStatus: "dispatched", giftDispatchId: "COZA-GIFT-8821" })}
              onConfirmReceipt={() => updateActiveMember({ giftStatus: "received" })}
            />

            {/* Unboxing Preview Card (PRD GIF-01..04 Parity) */}
            <div className="p-3.5 rounded-xl border border-kumo-line bg-kumo-elevated space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-kumo-default">Inside Your Welcome Box:</span>
                <span className="text-[10px] font-mono text-kumo-brand">#COZA-GIFT-8821</span>
              </div>
              <ul className="space-y-1.5 text-kumo-subtle">
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Rev. Biodun & Pastor Modele Fatoyinbo Welcome Letter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Consecrated Holy Communion Vial & Anointing Oil</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>COZA Gold-Trim Journal & Laser Pen</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Kingdom Foundations Book</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setMobileScreen("placement")}
              className="w-full justify-center text-xs"
            >
              <span>Continue to Stage 5: Ministry Placement</span>
              <Icons.ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 5: Stage 5 — Ministry Placement & Mentor Selection    */}
        {/* ============================================================ */}
        {mobileScreen === "placement" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-kumo-hairline">
              <button
                type="button"
                onClick={() => setMobileScreen("home")}
                className="text-xs text-kumo-brand font-medium flex items-center gap-1 cursor-pointer"
              >
                <Icons.ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span className="text-xs font-bold text-kumo-default">Stage 5: COZA Body</span>
              <Badge variant="purple">Placement</Badge>
            </div>

            <DepartmentPlacementCard
              memberName={activeMember.name}
              currentDepartment={activeMember.department}
              currentMentor={activeMember.spiritualMentor}
              onSelectPlacement={(dept, mentor) => {
                assignMinistryDepartment(dept, mentor);
              }}
            />

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPersona("zonal-coordinator")}
              className="w-full justify-center text-xs"
            >
              <span>Open Zonal Coordinator View</span>
              <Icons.ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Quiz Modal / Assessment Drawer */}
      <Dialog.Root open={quizModalOpen} onOpenChange={setQuizModalOpen}>
        <Dialog size="base" className="p-4 sm:p-6 bg-kumo-base border border-kumo-line rounded-2xl space-y-4 max-w-lg w-[calc(100vw-2rem)] sm:w-full">
          <TopicQuizCard
            moduleTitle="Believers' Foundation Assessment"
            topicTitle="Course Understanding & Vision Quiz"
            questions={[
              {
                id: "q1",
                question: "According to the video teachings by Pastor Biodun, what is the primary spiritual foundation for every believer?",
                options: [
                  "Walking in the new creation reality and the guidance of the Holy Spirit",
                  "Philosophical theological debate",
                  "Passive observer status without discipleship",
                ],
                correctIndex: 0,
              },
              {
                id: "q2",
                question: "What happens immediately upon completing the modular video lessons and passing the quiz?",
                options: [
                  "You must wait one year before joining community",
                  "You become eligible for the COZA welcome gift box, water baptism, and zonal onboarding",
                  "You are required to re-register as a first-timer",
                ],
                correctIndex: 1,
              },
            ]}
            onPassed={handleQuizPass}
          />
        </Dialog>
      </Dialog.Root>

      {/* Bottom Transition Prompt */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-kumo-line bg-kumo-base flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 text-xs">
        <span className="text-kumo-subtle text-center sm:text-left">
          Member baptism & gifting confirmed. Auto-mapped to Maitama Extension Zone.
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentPersona("zonal-coordinator")}
          className="gap-1.5 w-full sm:w-auto justify-center"
        >
          <span>Open Zonal Coordinator View</span>
          <Icons.ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
      {/* ============================================================ */}
      {/* NATIVE APP BOTTOM NAVBAR — MEMBER PORTAL (BELIEVERS CLASS)   */}
      {/* ============================================================ */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-kumo-base/95 backdrop-blur-xl border-t border-kumo-line py-2 px-4 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            type="button"
            onClick={() => {
              setActiveBottomNav("home");
              setMobileScreen("home");
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              mobileScreen === "home"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.House className="w-5 h-5" weight={mobileScreen === "home" ? "fill" : "regular"} />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveBottomNav("learn");
              setMobileScreen("player");
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              mobileScreen === "player"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.BookOpen className="w-5 h-5" weight={mobileScreen === "player" ? "fill" : "regular"} />
            <span className="text-[10px]">Academy</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveBottomNav("baptism");
              setMobileScreen("baptism");
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              mobileScreen === "baptism"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.ShieldCheck className="w-5 h-5" weight={mobileScreen === "baptism" ? "fill" : "regular"} />
            <span className="text-[10px]">Baptism</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveBottomNav("placement");
              setMobileScreen("placement");
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all cursor-pointer py-1 px-3 rounded-xl active:scale-95",
              mobileScreen === "placement"
                ? "text-kumo-brand font-bold"
                : "text-kumo-subtle hover:text-kumo-default font-medium"
            )}
          >
            <Icons.UsersThree className="w-5 h-5" weight={mobileScreen === "placement" ? "fill" : "regular"} />
            <span className="text-[10px]">Placement</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

