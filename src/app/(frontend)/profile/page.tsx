"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useTranslation } from "@/i18n/LanguageContext";
import { BadgeCard } from "@/components/badges/BadgeCard";
import { User, Trophy, Clock, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Badge {
  id: string;
  name: string;
  nameZh?: string;
  description: string;
  descriptionZh?: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface UserBadge {
  badge: Badge;
  earnedAt: string;
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([]);

  useEffect(() => {
    // Fetch all badges
    fetch("/api/badges?limit=50")
      .then((r) => r.json())
      .then((data) => setBadges(data.docs || []))
      .catch(() => {});

    // Fetch user's earned badges
    if (user) {
      fetch(`/api/user-badges?where[user][equals]=${user.id}&depth=1&limit=50`, { credentials: "include" })
        .then((r) => r.json())
        .then((data) => setEarnedBadges(data.docs || []))
        .catch(() => {});
    }
  }, [user]);

  const earnedBadgeIds = new Set(earnedBadges.map((eb) => (typeof eb.badge === "object" ? eb.badge.id : eb.badge)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t("dashboard.title")}
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-8">
        <User className="h-8 w-8 text-indigo-600" />
        {t("profile.title")}
      </h1>

      {/* User info card */}
      {user && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
              {(user.displayName || user.email).charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.displayName || user.email}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.profileRole && (
                <span className="inline-block mt-1 rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600">
                  {user.profileRole}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Badges showcase */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-amber-500" />
          {t("profile.badges")}
          <span className="text-sm font-normal text-gray-400">
            {earnedBadges.length}/{badges.length} {t("badges.earned")}
          </span>
        </h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {badges.map((badge) => {
            const earned = earnedBadgeIds.has(badge.id);
            const earnedData = earnedBadges.find(
              (eb) => (typeof eb.badge === "object" ? eb.badge.id : eb.badge) === badge.id
            );
            return (
              <BadgeCard
                key={badge.id}
                name={badge.name}
                nameZh={badge.nameZh}
                description={badge.description}
                descriptionZh={badge.descriptionZh}
                icon={badge.icon}
                rarity={badge.rarity}
                earned={earned}
                earnedAt={earnedData?.earnedAt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
