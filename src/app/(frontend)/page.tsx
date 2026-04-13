"use client";
import Link from "next/link";
import {
  Sparkles,
  Search,
  BookOpen,
  Zap,
  ArrowRight,
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
  Rocket,
  Wrench,
  Terminal,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const categories = [
  { slug: "writing", icon: PenTool, color: "bg-blue-500" },
  { slug: "image-generation", icon: Image, color: "bg-purple-500" },
  { slug: "coding", icon: Code, color: "bg-green-500" },
  { slug: "data-analysis", icon: BarChart3, color: "bg-orange-500" },
  { slug: "chatbots", icon: MessageSquare, color: "bg-indigo-500" },
  { slug: "audio", icon: Music, color: "bg-pink-500" },
  { slug: "video", icon: Video, color: "bg-red-500" },
  { slug: "automation", icon: Bot, color: "bg-teal-500" },
  { slug: "business", icon: Briefcase, color: "bg-amber-500" },
  { slug: "education", icon: GraduationCap, color: "bg-cyan-500" },
];

const difficultyTiers = [
  { tier: "starter", icon: Rocket, color: "from-emerald-500 to-green-600", textColor: "text-emerald-600", bgLight: "bg-emerald-50" },
  { tier: "builder", icon: Wrench, color: "from-orange-500 to-amber-600", textColor: "text-orange-600", bgLight: "bg-orange-50" },
  { tier: "developer", icon: Terminal, color: "from-purple-500 to-indigo-600", textColor: "text-purple-600", bgLight: "bg-purple-50" },
];

export default function HomePage() {
  const { t } = useTranslation();

  const features = [
    { icon: Search, title: t("home.discover.title"), description: t("home.discover.desc"), color: "text-blue-600", bg: "bg-blue-50" },
    { icon: BookOpen, title: t("home.learn.title"), description: t("home.learn.desc"), color: "text-green-600", bg: "bg-green-50" },
    { icon: Zap, title: t("home.apply.title"), description: t("home.apply.desc"), color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
              <Sparkles className="h-4 w-4" />
              {t("home.badge")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("home.title1")}
              <br />
              <span className="text-indigo-600">{t("home.title2")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              {t("home.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/explore" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                {t("home.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/learn" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-colors">
                {t("home.ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("home.howItWorks")}</h2>
            <p className="mt-3 text-gray-600">{t("home.howItWorksSubtitle")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                <div className={`inline-flex rounded-xl ${feature.bg} p-3 mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difficulty Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("home.difficulty.title")}</h2>
            <p className="mt-3 text-gray-600">{t("home.difficulty.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {difficultyTiers.map((tier) => (
              <Link
                key={tier.tier}
                href={`/explore?tier=${tier.tier}`}
                className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${tier.color}`} />
                <div className={`inline-flex rounded-xl ${tier.bgLight} p-3 mb-4`}>
                  <tier.icon className={`h-7 w-7 ${tier.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t(`common.${tier.tier}`)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`home.difficulty.${tier.tier}`)}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                  {t("home.cta")} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("home.categories.title")}</h2>
            <p className="mt-3 text-gray-600">{t("home.categories.subtitle")}</p>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/explore/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-indigo-200 transition-all"
              >
                <div className={`rounded-xl ${cat.color} p-3`}>
                  <cat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 text-center transition-colors">
                  {t(`categories.${cat.slug}`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t("home.cta2.title")}</h2>
          <p className="text-indigo-100 mb-8 text-lg">{t("home.cta2.subtitle")}</p>
          <Link href="/workflows" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-colors">
            {t("home.cta2.button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
