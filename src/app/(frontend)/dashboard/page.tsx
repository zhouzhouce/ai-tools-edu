import {
  LayoutDashboard,
  BookOpen,
  Bookmark,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-indigo-600" />
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600">Track your AI learning progress</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {[
          { label: "Tutorials Completed", value: "0", icon: BookOpen, color: "text-green-600", bg: "bg-green-50" },
          { label: "Tools Bookmarked", value: "0", icon: Bookmark, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Learning Streak", value: "0 days", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl ${stat.bg} p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Get Started</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/explore"
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
          >
            <span className="font-medium text-gray-700 group-hover:text-indigo-600">
              Browse AI Tools
            </span>
            <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500" />
          </Link>
          <Link
            href="/learn"
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
          >
            <span className="font-medium text-gray-700 group-hover:text-indigo-600">
              Start a Tutorial
            </span>
            <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500" />
          </Link>
          <Link
            href="/workflows"
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
          >
            <span className="font-medium text-gray-700 group-hover:text-indigo-600">
              View Workflow Recommendations
            </span>
            <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500" />
          </Link>
          <div className="flex items-center justify-between rounded-xl border border-dashed border-gray-200 p-4 opacity-60">
            <span className="font-medium text-gray-400">
              User Profile & Onboarding (Phase 2)
            </span>
          </div>
        </div>
      </div>

      {/* Placeholder for recent activity */}
      <div className="rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
        <p className="text-gray-400">
          Your learning activity will appear here as you complete tutorials
        </p>
      </div>
    </div>
  );
}
