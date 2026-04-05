import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { Workflow, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const difficultyConfig: Record<string, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "bg-emerald-100 text-emerald-700" },
  intermediate: { label: "Intermediate", className: "bg-amber-100 text-amber-700" },
  advanced: { label: "Advanced", className: "bg-red-100 text-red-700" },
};

export default async function WorkflowsPage() {
  const payload = await getPayload({ config });

  const workflowsResult = await payload.find({
    collection: "workflows",
    where: { status: { equals: "published" } },
    limit: 50,
    depth: 1,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Workflow className="h-8 w-8 text-indigo-600" />
          AI Workflow Recommendations
        </h1>
        <p className="mt-2 text-gray-600">
          Curated AI tool combinations for your specific role and goals.
          One-click to see your ideal AI toolkit.
        </p>
      </div>

      {/* AI recommendation CTA */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
        <div className="flex items-start gap-4">
          <Zap className="h-8 w-8 shrink-0" />
          <div>
            <h2 className="text-xl font-bold mb-2">Get Personalized Recommendations</h2>
            <p className="text-indigo-100 mb-4">
              Tell us about your role and what you want to achieve. Our AI will build
              a custom toolkit recommendation just for you.
            </p>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur px-4 py-2 text-sm font-medium cursor-not-allowed opacity-75">
              Coming in Phase 3
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {workflowsResult.docs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {workflowsResult.docs.map((wf) => {
            const diffInfo = difficultyConfig[wf.difficulty] || difficultyConfig.beginner;
            const toolsList = Array.isArray(wf.tools)
              ? wf.tools.map((t) =>
                  typeof t === "object" && t !== null ? (t as { name: string }).name : ""
                ).filter(Boolean)
              : [];

            return (
              <div
                key={wf.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", diffInfo.className)}>
                    {diffInfo.label}
                  </span>
                  {wf.estimatedSetupMinutes && (
                    <span className="text-xs text-gray-400">{wf.estimatedSetupMinutes} min setup</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{wf.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{wf.description}</p>
                {toolsList.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {toolsList.map((name, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
                {wf.targetRoles && Array.isArray(wf.targetRoles) && wf.targetRoles.length > 0 && (
                  <div className="mt-3 text-xs text-gray-400">
                    For: {wf.targetRoles.join(", ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
          <Workflow className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No workflows yet</p>
          <p className="text-gray-400 text-sm">
            Workflow recommendations will appear here once added via the{" "}
            <a href="/admin" className="text-indigo-600 hover:underline">admin panel</a>.
          </p>
        </div>
      )}
    </div>
  );
}
