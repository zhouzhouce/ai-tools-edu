"use client";
import { useTranslation, useLocale } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
    >
      <Globe className="h-3.5 w-3.5" />
      {t("lang.toggle")}
    </button>
  );
}
