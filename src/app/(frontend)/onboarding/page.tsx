"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { useTranslation } from "@/i18n/LanguageContext";
import {
  Briefcase, Code, Palette, GraduationCap, Megaphone,
  Lightbulb, BarChart3, Bot, ArrowRight, ArrowLeft, Rocket,
  PenTool, Image, Search, Zap, BookOpen, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  { value: "student", icon: GraduationCap, color: "bg-blue-100 text-blue-700" },
  { value: "developer", icon: Code, color: "bg-green-100 text-green-700" },
  { value: "designer", icon: Palette, color: "bg-purple-100 text-purple-700" },
  { value: "marketer", icon: Megaphone, color: "bg-orange-100 text-orange-700" },
  { value: "entrepreneur", icon: Lightbulb, color: "bg-amber-100 text-amber-700" },
  { value: "educator", icon: BookOpen, color: "bg-cyan-100 text-cyan-700" },
  { value: "data-analyst", icon: BarChart3, color: "bg-pink-100 text-pink-700" },
  { value: "content-creator", icon: PenTool, color: "bg-indigo-100 text-indigo-700" },
  { value: "researcher", icon: Search, color: "bg-teal-100 text-teal-700" },
  { value: "product-manager", icon: Briefcase, color: "bg-slate-100 text-slate-700" },
];

const goals = [
  { value: "writing", icon: PenTool },
  { value: "coding", icon: Code },
  { value: "design", icon: Image },
  { value: "data-analysis", icon: BarChart3 },
  { value: "content-creation", icon: Megaphone },
  { value: "automation", icon: Bot },
  { value: "research", icon: Search },
  { value: "learning", icon: BookOpen },
  { value: "marketing", icon: Zap },
  { value: "business", icon: Briefcase },
];

const timeBudgets = [
  { value: "15min", icon: Clock, label: "15 min/week" },
  { value: "30min", icon: Clock, label: "30 min/week" },
  { value: "1h", icon: Clock, label: "1 hour/week" },
  { value: "2h+", icon: Rocket, label: "2+ hours/week" },
];

const roleLabels: Record<string, Record<string, string>> = {
  en: { student: "Student", developer: "Developer", designer: "Designer", marketer: "Marketer", entrepreneur: "Entrepreneur", educator: "Educator", "data-analyst": "Data Analyst", "content-creator": "Content Creator", researcher: "Researcher", "product-manager": "Product Manager" },
  zh: { student: "学生", developer: "开发者", designer: "设计师", marketer: "营销人", entrepreneur: "创业者", educator: "教育者", "data-analyst": "数据分析师", "content-creator": "内容创作者", researcher: "研究人员", "product-manager": "产品经理" },
};

const goalLabels: Record<string, Record<string, string>> = {
  en: { writing: "Writing", coding: "Coding", design: "Design", "data-analysis": "Data Analysis", "content-creation": "Content Creation", automation: "Automation", research: "Research", learning: "Learning", marketing: "Marketing", business: "Business" },
  zh: { writing: "写作", coding: "编程", design: "设计", "data-analysis": "数据分析", "content-creation": "内容创作", automation: "自动化", research: "研究", learning: "学习", marketing: "营销", business: "商业" },
};

const expLabels: Record<string, Record<string, string>> = {
  en: { beginner: "Never used AI tools", intermediate: "Used a few AI tools", advanced: "Regular AI user" },
  zh: { beginner: "从未使用过AI工具", intermediate: "用过几个AI工具", advanced: "经常使用AI工具" },
};

export default function OnboardingPage() {
  const { t, locale } = useTranslation();
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profileRole, setProfileRole] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [scenario, setScenario] = useState("");
  const [weeklyTimeBudget, setWeeklyTimeBudget] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleGoal = (g: string) =>
    setSelectedGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const canProceed =
    (step === 0 && profileRole) ||
    (step === 1 && selectedGoals.length > 0) ||
    (step === 2 && experienceLevel) ||
    step === 3 ||
    (step === 4 && weeklyTimeBudget);

  const finish = async () => {
    if (!user) return;
    setSaving(true);
    await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        profileRole,
        goals: selectedGoals,
        experienceLevel,
        scenario: scenario || undefined,
        weeklyTimeBudget,
        completedOnboarding: true,
      }),
    });
    await refreshUser();
    router.push("/dashboard");
  };

  const steps = [
    // Step 0: Role
    <div key="role" className="grid grid-cols-2 gap-3">
      {roles.map((r) => (
        <button
          key={r.value}
          onClick={() => setProfileRole(r.value)}
          className={cn(
            "flex items-center gap-3 rounded-xl p-4 text-left transition-all ring-1",
            profileRole === r.value
              ? "ring-2 ring-indigo-500 bg-indigo-50"
              : "ring-gray-100 bg-white hover:ring-indigo-200"
          )}
        >
          <div className={cn("rounded-lg p-2", r.color)}>
            <r.icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {roleLabels[locale]?.[r.value] || r.value}
          </span>
        </button>
      ))}
    </div>,
    // Step 1: Goals
    <div key="goals" className="grid grid-cols-2 gap-3">
      {goals.map((g) => (
        <button
          key={g.value}
          onClick={() => toggleGoal(g.value)}
          className={cn(
            "flex items-center gap-3 rounded-xl p-4 text-left transition-all ring-1",
            selectedGoals.includes(g.value)
              ? "ring-2 ring-indigo-500 bg-indigo-50"
              : "ring-gray-100 bg-white hover:ring-indigo-200"
          )}
        >
          <g.icon className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">
            {goalLabels[locale]?.[g.value] || g.value}
          </span>
        </button>
      ))}
    </div>,
    // Step 2: Experience
    <div key="exp" className="space-y-3">
      {(["beginner", "intermediate", "advanced"] as const).map((level) => (
        <button
          key={level}
          onClick={() => setExperienceLevel(level)}
          className={cn(
            "w-full flex items-center gap-4 rounded-xl p-5 text-left transition-all ring-1",
            experienceLevel === level
              ? "ring-2 ring-indigo-500 bg-indigo-50"
              : "ring-gray-100 bg-white hover:ring-indigo-200"
          )}
        >
          <div className="flex-1">
            <p className="font-medium text-gray-900">{t(`common.${level}`)}</p>
            <p className="text-sm text-gray-500">{expLabels[locale]?.[level]}</p>
          </div>
        </button>
      ))}
    </div>,
    // Step 3: Scenario
    <div key="scenario">
      <textarea
        value={scenario}
        onChange={(e) => setScenario(e.target.value)}
        placeholder={t("onboarding.step4.placeholder")}
        className="w-full rounded-xl border border-gray-200 p-4 text-sm h-32 resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
      />
    </div>,
    // Step 4: Time budget
    <div key="time" className="grid grid-cols-2 gap-3">
      {timeBudgets.map((tb) => (
        <button
          key={tb.value}
          onClick={() => setWeeklyTimeBudget(tb.value)}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl p-6 transition-all ring-1",
            weeklyTimeBudget === tb.value
              ? "ring-2 ring-indigo-500 bg-indigo-50"
              : "ring-gray-100 bg-white hover:ring-indigo-200"
          )}
        >
          <tb.icon className="h-6 w-6 text-indigo-500" />
          <span className="text-sm font-medium text-gray-900">{tb.label}</span>
        </button>
      ))}
    </div>,
  ];

  const stepTitles = [
    { title: t("onboarding.step1.title"), subtitle: t("onboarding.step1.subtitle") },
    { title: t("onboarding.step2.title"), subtitle: t("onboarding.step2.subtitle") },
    { title: t("onboarding.step3.title"), subtitle: t("onboarding.step3.subtitle") },
    { title: t("onboarding.step4.title"), subtitle: t("onboarding.step4.subtitle") },
    { title: t("onboarding.step5.title"), subtitle: t("onboarding.step5.subtitle") },
  ];

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
        {t("onboarding.title")}
      </h1>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-2 rounded-full transition-all",
              i === step ? "w-8 bg-indigo-600" : i < step ? "w-2 bg-indigo-400" : "w-2 bg-gray-200"
            )}
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{stepTitles[step].title}</h2>
        <p className="text-sm text-gray-500 mt-1">{stepTitles[step].subtitle}</p>
      </div>

      {steps[step]}

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("onboarding.back")}
        </button>
        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {t("onboarding.next")}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={finish}
            disabled={saving || !canProceed}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "..." : t("onboarding.finish")}
            <Rocket className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
