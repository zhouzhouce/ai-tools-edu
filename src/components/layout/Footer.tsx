"use client";
import { Sparkles } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>AI Tools Edu</span>
          </div>
          <p className="text-sm text-gray-400">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
