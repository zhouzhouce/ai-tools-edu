"use client";
import Link from "next/link";
import {
  Sparkles,
  Search,
  BookOpen,
  Workflow,
  LayoutDashboard,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <span>
            AI Tools <span className="text-indigo-600">Edu</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/explore"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Search className="h-4 w-4" />
            {t("nav.explore")}
          </Link>
          <Link
            href="/learn"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            {t("nav.learn")}
          </Link>
          <Link
            href="/workflows"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Workflow className="h-4 w-4" />
            {t("nav.workflows")}
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            {t("nav.dashboard")}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/admin"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t("nav.admin")}
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/explore"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {t("nav.getStarted")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
