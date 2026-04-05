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
} from "lucide-react";

const categories = [
  { name: "Writing & Content", icon: PenTool, color: "bg-blue-500", slug: "writing" },
  { name: "Image Generation", icon: Image, color: "bg-purple-500", slug: "image-generation" },
  { name: "Coding & Dev", icon: Code, color: "bg-green-500", slug: "coding" },
  { name: "Data Analysis", icon: BarChart3, color: "bg-orange-500", slug: "data-analysis" },
  { name: "Chatbots & Assistants", icon: MessageSquare, color: "bg-indigo-500", slug: "chatbots" },
  { name: "Audio & Music", icon: Music, color: "bg-pink-500", slug: "audio" },
  { name: "Video & Animation", icon: Video, color: "bg-red-500", slug: "video" },
  { name: "Automation", icon: Bot, color: "bg-teal-500", slug: "automation" },
  { name: "Business Tools", icon: Briefcase, color: "bg-amber-500", slug: "business" },
  { name: "Education", icon: GraduationCap, color: "bg-cyan-500", slug: "education" },
];

const features = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse 100+ curated AI tools organized by category, with real pricing and difficulty ratings.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Step-by-step interactive tutorials with hands-on sandboxes. Learn by doing, not just reading.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Zap,
    title: "Apply",
    description: "Get AI-powered workflow recommendations tailored to your role and goals. One click to your AI toolkit.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
              <Sparkles className="h-4 w-4" />
              Your Interactive AI Tools Learning Hub
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Master AI Tools
              <br />
              <span className="text-indigo-600">in Minutes, Not Months</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Discover the best AI tools, learn through interactive tutorials with virtual scenarios,
              and get personalized workflow recommendations based on your needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-200"
              >
                Explore AI Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Discover &rarr; Learn &rarr; Apply
            </h2>
            <p className="mt-3 text-gray-600">The complete AI tools learning loop</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex rounded-xl ${feature.bg} p-3 mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore by Category
            </h2>
            <p className="mt-3 text-gray-600">
              Find AI tools organized by what you want to accomplish
            </p>
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
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your AI Toolkit?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Tell us your role and goals, and we&apos;ll recommend the perfect combination of AI tools for you.
          </p>
          <Link
            href="/workflows"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-colors"
          >
            Get Personalized Recommendations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
