import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const difficultyConfig: Record<string, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "bg-emerald-100 text-emerald-700" },
  intermediate: { label: "Intermediate", className: "bg-amber-100 text-amber-700" },
  advanced: { label: "Advanced", className: "bg-red-100 text-red-700" },
};

export default async function LearnPage() {
  const payload = await getPayload({ config });

  const tutorialsResult = await payload.find({
    collection: "tutorials",
    where: { status: { equals: "published" } },
    limit: 50,
    depth: 1,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          Learn AI Tools
        </h1>
        <p className="mt-2 text-gray-600">
          Step-by-step interactive tutorials to master AI tools quickly
        </p>
      </div>

      {tutorialsResult.docs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {tutorialsResult.docs.map((tut) => {
            const toolName =
              typeof tut.tool === "object" && tut.tool !== null
                ? (tut.tool as { name: string }).name
                : "AI Tool";
            const diffInfo = difficultyConfig[tut.difficulty] || difficultyConfig.beginner;
            const stepCount = tut.steps ? tut.steps.length : 0;

            return (
              <Link
                key={tut.id}
                href={`/learn/${tut.slug}`}
                className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-indigo-200 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", diffInfo.className)}>
                    {diffInfo.label}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    {tut.estimatedMinutes} min
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {tut.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{tut.description}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{toolName} &middot; {stepCount} steps</span>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No tutorials yet</p>
          <p className="text-gray-400 text-sm">
            Tutorials will appear here once added via the{" "}
            <a href="/admin" className="text-indigo-600 hover:underline">admin panel</a>.
          </p>
        </div>
      )}
    </div>
  );
}
