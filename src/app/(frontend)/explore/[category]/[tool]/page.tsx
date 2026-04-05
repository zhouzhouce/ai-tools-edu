import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ category: string; tool: string }>;
}

const pricingConfig: Record<string, { label: string; className: string }> = {
  free: { label: "Free", className: "bg-green-100 text-green-700" },
  freemium: { label: "Freemium", className: "bg-blue-100 text-blue-700" },
  paid: { label: "Paid", className: "bg-orange-100 text-orange-700" },
  enterprise: { label: "Enterprise", className: "bg-purple-100 text-purple-700" },
};

const difficultyConfig: Record<string, { label: string; className: string }> = {
  beginner: { label: "Beginner Friendly", className: "bg-emerald-100 text-emerald-700" },
  intermediate: { label: "Intermediate", className: "bg-amber-100 text-amber-700" },
  advanced: { label: "Advanced", className: "bg-red-100 text-red-700" },
};

export default async function ToolDetailPage({ params }: Props) {
  const { category: categorySlug, tool: toolSlug } = await params;
  const payload = await getPayload({ config });

  const toolsResult = await payload.find({
    collection: "tools",
    where: { slug: { equals: toolSlug } },
    limit: 1,
    depth: 2,
  });

  if (toolsResult.docs.length === 0) {
    notFound();
  }

  const tool = toolsResult.docs[0];
  const pricingInfo = pricingConfig[tool.pricing] || pricingConfig.free;
  const difficultyInfo = difficultyConfig[tool.difficulty] || difficultyConfig.beginner;

  // Fetch tutorials for this tool
  const tutorialsResult = await payload.find({
    collection: "tutorials",
    where: {
      and: [
        { tool: { equals: tool.id } },
        { status: { equals: "published" } },
      ],
    },
    limit: 10,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href={`/explore/${categorySlug}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to category
      </Link>

      {/* Header */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 mb-6">
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-2xl font-bold text-indigo-600">
            {tool.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
              {tool.trending && (
                <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-0.5 text-xs font-semibold text-white">
                  Trending
                </span>
              )}
            </div>
            <p className="mt-2 text-lg text-gray-600">{tool.tagline}</p>
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className={cn("rounded-full px-3 py-1 text-sm font-medium", pricingInfo.className)}>
                {pricingInfo.label}
              </span>
              <span className={cn("rounded-full px-3 py-1 text-sm font-medium", difficultyInfo.className)}>
                {difficultyInfo.label}
              </span>
              {tool.pricingDetails && (
                <span className="text-sm text-gray-500">{tool.pricingDetails}</span>
              )}
            </div>
          </div>
        </div>

        {tool.websiteUrl && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pros */}
        {tool.pros && tool.pros.length > 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Strengths
            </h2>
            <ul className="space-y-2">
              {tool.pros.map((p: { text: string }, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cons */}
        {tool.cons && tool.cons.length > 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <XCircle className="h-5 w-5 text-red-400" />
              Limitations
            </h2>
            <ul className="space-y-2">
              {tool.cons.map((c: { text: string }, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                  {c.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tutorials */}
      {tutorialsResult.docs.length > 0 && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            Tutorials
          </h2>
          <div className="space-y-3">
            {tutorialsResult.docs.map((tut) => (
              <Link
                key={tut.id}
                href={`/learn/${tut.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
              >
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {tut.title}
                  </h3>
                  {tut.description && (
                    <p className="mt-0.5 text-sm text-gray-500">{tut.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 shrink-0 ml-4">
                  <Clock className="h-4 w-4" />
                  {tut.estimatedMinutes} min
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Alternatives */}
      {tool.alternatives && Array.isArray(tool.alternatives) && tool.alternatives.length > 0 && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Similar Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {tool.alternatives.map((alt) => {
              if (typeof alt === "object" && alt !== null && "slug" in alt) {
                return (
                  <Link
                    key={alt.id}
                    href={`/explore/${categorySlug}/${alt.slug}`}
                    className="rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {alt.name}
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
