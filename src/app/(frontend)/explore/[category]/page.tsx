import { getPayload } from "payload";
import config from "@payload-config";
import { ToolCard } from "@/components/explore/ToolCard";
import { CategorySidebar } from "@/components/explore/CategorySidebar";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const payload = await getPayload({ config });

  const [categoriesResult, currentCategory] = await Promise.all([
    payload.find({
      collection: "categories",
      sort: "order",
      limit: 50,
      where: { parent: { exists: false } },
    }),
    payload.find({
      collection: "categories",
      where: { slug: { equals: categorySlug } },
      limit: 1,
    }),
  ]);

  if (currentCategory.docs.length === 0) {
    notFound();
  }

  const cat = currentCategory.docs[0];

  const toolsResult = await payload.find({
    collection: "tools",
    where: {
      and: [
        { status: { equals: "published" } },
        { categories: { equals: cat.id } },
      ],
    },
    sort: "-trendingScore",
    limit: 100,
  });

  const categories = categoriesResult.docs.map((c) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon || "bot",
    color: c.color || "#6366f1",
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <CategorySidebar categories={categories} activeSlug={categorySlug} />

        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{cat.name}</h1>
            {cat.description && (
              <p className="mt-1 text-gray-500">{cat.description}</p>
            )}
            <span className="text-sm text-gray-400">
              {toolsResult.totalDocs} tools
            </span>
          </div>

          {toolsResult.docs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {toolsResult.docs.map((tool) => (
                <ToolCard
                  key={tool.id}
                  slug={tool.slug}
                  name={tool.name}
                  tagline={tool.tagline}
                  categorySlug={categorySlug}
                  pricing={tool.pricing as "free" | "freemium" | "paid" | "enterprise"}
                  difficulty={tool.difficulty as "beginner" | "intermediate" | "advanced"}
                  trending={tool.trending || false}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <p className="text-gray-500">No tools in this category yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
