import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  slug: string;
  name: string;
  tagline: string;
  categorySlug: string;
  pricing: "free" | "freemium" | "paid" | "enterprise";
  difficulty: "beginner" | "intermediate" | "advanced";
  trending?: boolean;
  logoUrl?: string;
}

const pricingConfig = {
  free: { label: "Free", className: "bg-green-100 text-green-700" },
  freemium: { label: "Freemium", className: "bg-blue-100 text-blue-700" },
  paid: { label: "Paid", className: "bg-orange-100 text-orange-700" },
  enterprise: { label: "Enterprise", className: "bg-purple-100 text-purple-700" },
};

const difficultyConfig = {
  beginner: { label: "Beginner", className: "bg-emerald-100 text-emerald-700" },
  intermediate: { label: "Intermediate", className: "bg-amber-100 text-amber-700" },
  advanced: { label: "Advanced", className: "bg-red-100 text-red-700" },
};

export function ToolCard({
  slug,
  name,
  tagline,
  categorySlug,
  pricing,
  difficulty,
  trending,
  logoUrl,
}: ToolCardProps) {
  const pricingInfo = pricingConfig[pricing];
  const difficultyInfo = difficultyConfig[difficulty];

  return (
    <Link
      href={`/explore/${categorySlug}/${slug}`}
      className="group relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-indigo-200 transition-all"
    >
      {trending && (
        <div className="absolute -top-2 -right-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-0.5 text-xs font-semibold text-white">
          Trending
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg font-bold text-gray-500">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={name} className="h-8 w-8 rounded-lg object-contain" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">{tagline}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0" />
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", pricingInfo.className)}>
          {pricingInfo.label}
        </span>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", difficultyInfo.className)}>
          {difficultyInfo.label}
        </span>
      </div>
    </Link>
  );
}
