import Link from "next/link";
import {
  PenTool,
  Image,
  Code,
  BarChart3,
  MessageSquare,
  Music,
  Video,
  Bot,
  Briefcase,
  GraduationCap,
  Cpu,
  Blocks,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  "pen-tool": PenTool,
  image: Image,
  code: Code,
  "bar-chart-3": BarChart3,
  "message-square": MessageSquare,
  music: Music,
  video: Video,
  bot: Bot,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  cpu: Cpu,
  blocks: Blocks,
};

interface Category {
  slug: string;
  name: string;
  icon: string;
  color: string;
}

interface CategorySidebarProps {
  categories: Category[];
  activeSlug?: string;
}

export function CategorySidebar({ categories, activeSlug }: CategorySidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-20 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
        <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Categories
        </h3>
        <nav className="space-y-1">
          <Link
            href="/explore"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              !activeSlug
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            All Tools
          </Link>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Bot;
            return (
              <Link
                key={cat.slug}
                href={`/explore/${cat.slug}`}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  activeSlug === cat.slug
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {cat.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
