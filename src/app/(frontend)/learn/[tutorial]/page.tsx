"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Lightbulb,
  AlertTriangle,
  Info,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

interface TutorialStep {
  blockType: string;
  title?: string;
  content?: unknown;
  videoUrl?: string;
  caption?: string;
  type?: string;
  instructions?: unknown;
  promptTemplate?: string;
  expectedOutput?: string;
  hints?: { hint: string }[];
  quizQuestions?: unknown;
  // tip step
  content_type?: string;
}

interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description?: string;
  estimatedMinutes: number;
  difficulty: string;
  steps: TutorialStep[];
  tool: { name: string; slug: string } | string;
  learningObjectives?: { objective: string }[];
}

export default function TutorialPage() {
  const params = useParams();
  const tutorialSlug = params.tutorial as string;
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tutorials?where[slug][equals]=${tutorialSlug}&depth=1&limit=1`)
      .then((r) => r.json())
      .then((data) => {
        if (data.docs && data.docs.length > 0) {
          setTutorial(data.docs[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tutorialSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-400">Loading tutorial...</div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">Tutorial not found</p>
        <Link href="/learn" className="mt-4 text-indigo-600 hover:underline inline-block">
          Back to tutorials
        </Link>
      </div>
    );
  }

  const steps = tutorial.steps || [];
  const step = steps[currentStep];
  const totalSteps = steps.length;
  const toolName = typeof tutorial.tool === "object" ? tutorial.tool.name : "AI Tool";

  const markComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    if (!step) return null;

    switch (step.blockType) {
      case "textStep":
        return (
          <div className="prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h2>
            <div className="text-gray-600 leading-relaxed">
              {/* Rich text content would be rendered here with a Lexical renderer */}
              <p className="text-gray-500 italic">
                [Rich text content - configure Lexical renderer for production]
              </p>
            </div>
          </div>
        );

      case "videoStep":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h2>
            <div className="aspect-video rounded-xl bg-gray-900 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Play className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Video: {step.videoUrl}</p>
              </div>
            </div>
            {step.caption && <p className="mt-3 text-sm text-gray-500">{step.caption}</p>}
          </div>
        );

      case "interactiveStep":
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h2>
            {step.type === "prompt" && (
              <div className="space-y-4">
                <div className="rounded-xl bg-gray-900 p-6">
                  <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Prompt Playground
                  </p>
                  <textarea
                    className="w-full bg-gray-800 text-gray-100 rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    defaultValue={step.promptTemplate || ""}
                    placeholder="Type your prompt here..."
                  />
                  <button className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                    Run Prompt
                  </button>
                </div>
                {step.expectedOutput && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                    <p className="text-xs font-medium text-green-600 mb-1">Expected Output Pattern:</p>
                    <p className="text-sm text-green-700">{step.expectedOutput}</p>
                  </div>
                )}
                {step.hints && step.hints.length > 0 && (
                  <details className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <summary className="text-sm font-medium text-amber-700 cursor-pointer">
                      Need a hint?
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {step.hints.map((h, i) => (
                        <li key={i} className="text-sm text-amber-600">
                          {h.hint}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            )}
            {step.type === "sandbox" && (
              <div className="rounded-xl bg-gray-100 border border-gray-200 p-8 text-center">
                <p className="text-gray-500">
                  Interactive code sandbox will be available in Phase 2
                </p>
              </div>
            )}
            {step.type === "quiz" && (
              <div className="rounded-xl bg-gray-100 border border-gray-200 p-8 text-center">
                <p className="text-gray-500">
                  Quiz component will be available in Phase 2
                </p>
              </div>
            )}
          </div>
        );

      case "tipStep":
        const tipConfig = {
          tip: { icon: Lightbulb, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
          warning: { icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
          info: { icon: Info, bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
        };
        const tipType = (step as { type?: string }).type as "tip" | "warning" | "info" || "info";
        const cfg = tipConfig[tipType] || tipConfig.info;
        const TipIcon = cfg.icon;
        return (
          <div className={cn("rounded-xl border p-6", cfg.bg, cfg.border)}>
            <div className="flex items-start gap-3">
              <TipIcon className={cn("h-5 w-5 mt-0.5 shrink-0", cfg.text)} />
              <div className={cn("text-sm", cfg.text)}>
                <p className="italic">[Tip content - configure Lexical renderer]</p>
              </div>
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500">Unknown step type</p>;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Tutorials
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{tutorial.title}</h1>
        <p className="mt-1 text-gray-500">
          {toolName} &middot; {tutorial.estimatedMinutes} min &middot;{" "}
          {tutorial.difficulty}
        </p>
      </div>

      {/* Learning objectives */}
      {tutorial.learningObjectives && tutorial.learningObjectives.length > 0 && (
        <div className="mb-6 rounded-xl bg-indigo-50 border border-indigo-100 p-4">
          <h3 className="text-sm font-semibold text-indigo-700 mb-2">What you&apos;ll learn:</h3>
          <ul className="space-y-1">
            {tutorial.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-indigo-600">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                {obj.objective}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-8">
        {/* Step sidebar */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-20 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Steps
            </h3>
            <nav className="space-y-1">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={cn(
                    "flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-left transition-colors",
                    i === currentStep
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {completedSteps.has(i) ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0" />
                  )}
                  <span className="truncate">{s.title || `Step ${i + 1}`}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{completedSteps.size}/{totalSteps} completed</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${(completedSteps.size / Math.max(totalSteps, 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 min-h-[300px]">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              onClick={markComplete}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  Complete Tutorial
                  <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Mark Complete & Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
