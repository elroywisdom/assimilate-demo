"use client";

import React, { useState } from "react";
import { Badge, Button, LayerCard, cn, Icons } from "@/design-system";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TopicQuizCardProps {
  moduleTitle: string;
  topicTitle: string;
  questions: QuizQuestion[];
  onPassed: () => void;
  className?: string;
}

export function TopicQuizCard({
  moduleTitle,
  topicTitle,
  questions,
  onPassed,
  className,
}: TopicQuizCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
    setIsSubmitted(true);

    if (percentage >= 70) {
      onPassed();
    }
  };

  const isPassed = score !== null && score >= 70;
  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <LayerCard className={cn("overflow-hidden", className)}>
      <LayerCard.Secondary>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-kumo-default">
              Module Assessment Quiz
            </span>
            <Badge variant="outline">70% Pass Mark</Badge>
          </div>

          {isSubmitted && (
            <Badge variant={isPassed ? "success" : "error"} appearance="dot">
              {isPassed ? `Passed (${score}%)` : `Try Again (${score}%)`}
            </Badge>
          )}
        </div>
      </LayerCard.Secondary>

      <LayerCard.Primary>
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-base text-kumo-default">{topicTitle}</h4>
            <p className="text-xs text-kumo-subtle">{moduleTitle}</p>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              return (
                <div key={q.id} className="space-y-2">
                  <p className="text-xs font-semibold text-kumo-default">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIndex) => {
                      const isOptionSelected = selected === optIndex;
                      const isCorrect = q.correctIndex === optIndex;

                      let itemStyle = "border-kumo-hairline bg-kumo-recessed text-kumo-default hover:bg-kumo-elevated";
                      if (isOptionSelected) {
                        itemStyle = "border-kumo-line bg-kumo-elevated ring ring-kumo-brand/40 text-kumo-default";
                      }
                      if (isSubmitted && isCorrect) {
                        itemStyle = "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
                      } else if (isSubmitted && isOptionSelected && !isCorrect) {
                        itemStyle = "border-rose-500/40 bg-rose-500/10 text-rose-400";
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelect(q.id, optIndex)}
                          className={cn(
                            "w-full text-left px-3.5 py-2.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer",
                            itemStyle
                          )}
                        >
                          <span>{opt}</span>
                          {isSubmitted && isCorrect && (
                            <Icons.CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-kumo-hairline">
            <span className="text-xs text-kumo-subtle">
              {Object.keys(selectedAnswers).length} of {questions.length} answered
            </span>

            {!isSubmitted ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={!allAnswered}
              >
                Submit Quiz
              </Button>
            ) : isPassed ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 font-medium">Topic Completed</span>
                <Button variant="secondary" size="sm">
                  Next Topic
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSubmitted(false);
                  setScore(null);
                }}
              >
                Retake Quiz
              </Button>
            )}
          </div>
        </div>
      </LayerCard.Primary>
    </LayerCard>
  );
}
