"use client";

import React, { useState } from "react";
import { Badge, Button, LayerCard, cn, Icons } from "@/design-system";

export interface CourseLesson {
  id: string;
  youtubeId: string;
  moduleNumber: number;
  moduleTitle: string;
  topicNumber: number;
  topicTitle: string;
  durationMinutes: number;
  speakerName: string;
}

export interface ModularVideoPlayerCardProps {
  moduleNumber?: number;
  moduleTitle?: string;
  topicNumber?: number;
  topicTitle?: string;
  durationMinutes?: number;
  speakerName?: string;
  youtubeId?: string;
  lessons?: CourseLesson[];
  activeLessonId?: string;
  onSelectLesson?: (lesson: CourseLesson) => void;
  isCompleted: boolean;
  onComplete: () => void;
  className?: string;
}

export const DEFAULT_COURSE_LESSONS: CourseLesson[] = [
  {
    id: "lesson-1",
    youtubeId: "LZEW-cf4Plg",
    moduleNumber: 1,
    moduleTitle: "The New Creation Realities",
    topicNumber: 1,
    topicTitle: "Foundations of Faith & Divine Nature",
    durationMinutes: 14,
    speakerName: "Senior Pastor Biodun Fatoyinbo",
  },
  {
    id: "lesson-2",
    youtubeId: "3IXGc7GVhRM",
    moduleNumber: 2,
    moduleTitle: "The Believer's Authority",
    topicNumber: 1,
    topicTitle: "Walking in Dominion & The Holy Spirit",
    durationMinutes: 18,
    speakerName: "Senior Pastor Biodun Fatoyinbo",
  },
  {
    id: "lesson-3",
    youtubeId: "Qk7OIe9ck5s",
    moduleNumber: 3,
    moduleTitle: "Structure & Church Vision",
    topicNumber: 1,
    topicTitle: "Spiritual Gifts & The COZA Mandate",
    durationMinutes: 16,
    speakerName: "Senior Pastor Biodun Fatoyinbo",
  },
];

export function ModularVideoPlayerCard({
  moduleNumber = 1,
  moduleTitle = "The New Creation Realities",
  topicNumber = 1,
  topicTitle = "Foundations of Faith & Divine Nature",
  durationMinutes = 14,
  speakerName = "Senior Pastor Biodun Fatoyinbo",
  youtubeId = "LZEW-cf4Plg",
  lessons = DEFAULT_COURSE_LESSONS,
  activeLessonId,
  onSelectLesson,
  isCompleted,
  onComplete,
  className,
}: ModularVideoPlayerCardProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    activeLessonId || lessons[0]?.id || "lesson-1"
  );
  const [isPlaying, setIsPlaying] = useState(true);

  const activeLesson = lessons.find((l) => l.id === selectedLessonId) || {
    id: "custom",
    youtubeId,
    moduleNumber,
    moduleTitle,
    topicNumber,
    topicTitle,
    durationMinutes,
    speakerName,
  };

  const handleLessonChange = (lesson: CourseLesson) => {
    setSelectedLessonId(lesson.id);
    setIsPlaying(true);
    if (onSelectLesson) {
      onSelectLesson(lesson);
    }
  };

  return (
    <LayerCard className={cn("overflow-hidden", className)}>
      <LayerCard.Secondary>
        <div className="flex items-center justify-between w-full flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="purple">Module {activeLesson.moduleNumber}</Badge>
            <span className="text-sm font-semibold text-kumo-default truncate">
              {activeLesson.moduleTitle}
            </span>
          </div>
          <span className="text-xs text-kumo-subtle shrink-0">
            {activeLesson.durationMinutes} mins
          </span>
        </div>
      </LayerCard.Secondary>

      <LayerCard.Primary>
        <div className="space-y-4">
          {/* Playlist Lesson Switcher */}
          {lessons.length > 1 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-kumo-subtle uppercase tracking-wider block">
                Course Video Lessons (Select to Watch)
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {lessons.map((lesson, idx) => {
                  const isCurrent = lesson.id === activeLesson.id;
                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => handleLessonChange(lesson)}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all cursor-pointer shrink-0",
                        isCurrent
                          ? "bg-kumo-elevated border-kumo-brand ring-1 ring-kumo-brand text-kumo-default font-semibold shadow-xs"
                          : "border-kumo-hairline bg-kumo-recessed text-kumo-subtle hover:text-kumo-default hover:bg-kumo-elevated"
                      )}
                    >
                      <Icons.VideoCamera
                        className={cn(
                          "w-3.5 h-3.5 shrink-0",
                          isCurrent ? "text-kumo-brand" : "text-kumo-subtle"
                        )}
                      />
                      <span>Video {idx + 1}: {lesson.topicTitle.split("&")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Embedded YouTube Player */}
          <div className="relative aspect-video w-full rounded-lg bg-black border border-kumo-hairline overflow-hidden shadow-inner group">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={activeLesson.topicTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${activeLesson.youtubeId}/hqdefault.jpg)`,
                }}
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                <button
                  type="button"
                  className="z-10 w-14 h-14 rounded-full bg-kumo-brand text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Play Lesson Video"
                >
                  <Icons.Play className="w-6 h-6 ml-0.5" weight="fill" />
                </button>
                <span className="z-10 text-xs text-white/90 font-medium mt-2">
                  Click to Stream Video Lesson
                </span>
              </div>
            )}
          </div>

          {/* Topic Info & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="space-y-0.5">
              <h4 className="font-semibold text-sm text-kumo-default">
                Topic {activeLesson.topicNumber}: {activeLesson.topicTitle}
              </h4>
              <p className="text-xs text-kumo-subtle">
                Speaker: <strong className="text-kumo-default font-medium">{activeLesson.speakerName}</strong> • {activeLesson.durationMinutes} mins
              </p>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-center justify-end">
              {isCompleted ? (
                <Badge variant="success" appearance="dot" className="text-xs">
                  Course Completed
                </Badge>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onComplete}
                  className="gap-1.5 w-full sm:w-auto justify-center text-xs"
                >
                  <Icons.CheckCircle className="w-4 h-4" />
                  <span>Mark Lesson Complete</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </LayerCard.Primary>
    </LayerCard>
  );
}

