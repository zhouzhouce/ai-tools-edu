"use client";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/LanguageContext";
import { Lock, Share2 } from "lucide-react";

interface BadgeCardProps {
  name: string;
  nameZh?: string;
  description: string;
  descriptionZh?: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned?: boolean;
  earnedAt?: string;
  onShare?: () => void;
}

const rarityConfig = {
  common: { border: "ring-gray-200", bg: "bg-gray-50", glow: "", label: "common" },
  rare: { border: "ring-blue-300", bg: "bg-blue-50", glow: "shadow-blue-100", label: "rare" },
  epic: { border: "ring-purple-300", bg: "bg-purple-50", glow: "shadow-purple-100 shadow-lg", label: "epic" },
  legendary: { border: "ring-amber-400", bg: "bg-gradient-to-br from-amber-50 to-orange-50", glow: "shadow-amber-200 shadow-xl", label: "legendary" },
};

export function BadgeCard({
  name,
  nameZh,
  description,
  descriptionZh,
  icon,
  rarity,
  earned = false,
  earnedAt,
  onShare,
}: BadgeCardProps) {
  const { t, locale } = useTranslation();
  const config = rarityConfig[rarity];
  const displayName = locale === "zh" && nameZh ? nameZh : name;
  const displayDesc = locale === "zh" && descriptionZh ? descriptionZh : description;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 ring-1 transition-all",
        earned ? `${config.bg} ${config.border} ${config.glow}` : "bg-gray-50 ring-gray-100 opacity-60",
      )}
    >
      {!earned && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-50/50 backdrop-blur-[1px]">
          <Lock className="h-6 w-6 text-gray-300" />
        </div>
      )}

      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 text-sm">{displayName}</h3>
      <p className="text-xs text-gray-500 mt-1">{displayDesc}</p>

      <div className="flex items-center justify-between mt-3">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            rarity === "common" && "bg-gray-100 text-gray-600",
            rarity === "rare" && "bg-blue-100 text-blue-600",
            rarity === "epic" && "bg-purple-100 text-purple-600",
            rarity === "legendary" && "bg-amber-100 text-amber-700",
          )}
        >
          {t(`badges.${config.label}`)}
        </span>

        {earned && onShare && (
          <button
            onClick={onShare}
            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
          >
            <Share2 className="h-3 w-3" />
            {t("badges.share")}
          </button>
        )}
      </div>

      {earned && earnedAt && (
        <p className="text-xs text-gray-400 mt-2">
          {t("badges.earnedOn")} {new Date(earnedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
