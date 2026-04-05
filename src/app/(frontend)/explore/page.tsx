import { getPayload } from "payload";
import config from "@payload-config";
import { ToolCard } from "@/components/explore/ToolCard";
import { CategorySidebar } from "@/components/explore/CategorySidebar";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const payload = await getPayload({ config });

  const [categoriesResult, toolsResult] = await Promise.all([
    payload.find({
      collection: "categories",
      sort: "order",
      limit: 50,
      where: { parent: { exists: false } },
    }),
    payload.find({
      collection: "tools",
      where: { status: { equals: "published" } },
      sort: "-trendingScore",
      limit: 100,
    }),
  ]);

  const categories = categoriesResult.docs.map((c) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon || "bot",
    color: c.color || "#6366f1",
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search AI tools..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <CategorySidebar categories={categories} />

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">All AI Tools</h1>
            <span className="text-sm text-gray-500">
              {toolsResult.totalDocs} tools
            </span>
          </div>

          {toolsResult.docs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {toolsResult.docs.map((tool) => {
                const firstCategory =
                  Array.isArray(tool.categories) && tool.categories.length > 0
                    ? typeof tool.categories[0] === "object"
                      ? (tool.categories[0] as { slug: string }).slug
                      : "tools"
                    : "tools";

                return (
                  <ToolCard
                    key={tool.id}
                    slug={tool.slug}
                    name={tool.name}
                    tagline={tool.tagline}
                    categorySlug={firstCategory}
                    pricing={tool.pricing as "free" | "freemium" | "paid" | "enterprise"}
                    difficulty={tool.difficulty as "beginner" | "intermediate" | "advanced"}
                    trending={tool.trending || false}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg mb-2">No tools yet</p>
              <p className="text-gray-400 text-sm">
                Go to <a href="/admin" className="text-indigo-600 hover:underline">/admin</a> to add your first AI tools, or run the seed script.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
