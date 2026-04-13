"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, MousePointer2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalkthroughStep {
  title: string;
  description: string;
  highlight?: { x: number; y: number; width: number; height: number };
  action?: string;
}

interface VisualWalkthroughProps {
  toolName: string;
  steps: WalkthroughStep[];
}

export function VisualWalkthrough({ toolName, steps }: VisualWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = steps[currentStep];

  const markComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Simulated UI */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 h-64 flex items-center justify-center">
        {/* Simulated tool interface */}
        <div className="bg-white rounded-lg shadow-lg w-4/5 h-4/5 p-4 relative">
          <div className="flex items-center gap-2 mb-3 border-b pb-2">
            <div className="h-3 w-3 rounded-full bg-red-300" />
            <div className="h-3 w-3 rounded-full bg-yellow-300" />
            <div className="h-3 w-3 rounded-full bg-green-300" />
            <span className="text-xs text-gray-400 ml-2">{toolName}</span>
          </div>

          {/* Highlight area */}
          {step?.highlight && (
            <div
              className="absolute border-2 border-indigo-500 rounded-lg animate-pulse bg-indigo-50/30"
              style={{
                left: `${step.highlight.x}%`,
                top: `${step.highlight.y}%`,
                width: `${step.highlight.width}%`,
                height: `${step.highlight.height}%`,
              }}
            >
              <MousePointer2 className="absolute -bottom-6 -right-6 h-5 w-5 text-indigo-600 animate-bounce" />
            </div>
          )}

          {/* Placeholder content */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-8 bg-indigo-100 rounded w-1/3 mt-4" />
          </div>
        </div>
      </div>

      {/* Step info panel */}
      <div className="p-5 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            Step {currentStep + 1}/{steps.length}
          </span>
          {step?.action && (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {step.action}
            </span>
          )}
        </div>
        <h4 className="font-semibold text-gray-900">{step?.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{step?.description}</p>

        {/* Progress */}
        <div className="flex gap-1 mt-4 mb-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                completedSteps.has(i)
                  ? "bg-green-400"
                  : i === currentStep
                    ? "bg-indigo-500"
                    : "bg-gray-200"
              )}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            onClick={markComplete}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Done <CheckCircle2 className="h-4 w-4" />
              </>
            ) : (
              <>
                Got it <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
