"use client";
import { useState, useCallback } from "react";
import { Play, RotateCcw, Trash2, Eye } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

interface SimulatedResponse {
  keywords: string[];
  response: string;
}

interface PromptPlaygroundProps {
  template?: string;
  expectedOutput?: string;
  hints?: { hint: string }[];
  simulatedResponses?: SimulatedResponse[];
}

const defaultResponses: SimulatedResponse[] = [
  {
    keywords: ["summarize", "summary", "bullet"],
    response:
      "Here's a concise summary in 3 bullet points:\n\n- **Key Point 1**: The main argument centers around the transformative impact of the subject.\n- **Key Point 2**: Supporting evidence shows significant improvements in efficiency and outcomes.\n- **Key Point 3**: Future implications suggest continued growth and adoption across industries.",
  },
  {
    keywords: ["write", "product", "description", "marketing", "copy"],
    response:
      "**Introducing NoteGenius AI** - Your thoughts, amplified.\n\nTired of messy, incomplete notes? NoteGenius AI transforms the way students capture knowledge. Our AI-powered notebook doesn't just record — it understands, organizes, and enhances your notes in real-time.\n\n**Key Features:**\n- Smart auto-completion fills in gaps you missed\n- Instant summaries of lengthy lectures\n- AI-powered study guides generated from your notes\n\nJoin 50,000+ students already learning smarter. **Try NoteGenius AI free for 14 days.**",
  },
  {
    keywords: ["code", "function", "program", "react", "component"],
    response:
      '```typescript\nimport React, { useState, useMemo } from "react";\n\ninterface User {\n  name: string;\n  email: string;\n  role: string;\n}\n\nexport function UserTable({ users }: { users: User[] }) {\n  const [search, setSearch] = useState("");\n  const [sortBy, setSortBy] = useState<keyof User>("name");\n\n  const filtered = useMemo(\n    () => users.filter(u =>\n      u.name.toLowerCase().includes(search.toLowerCase())\n    ).sort((a, b) => a[sortBy].localeCompare(b[sortBy])),\n    [users, search, sortBy]\n  );\n\n  return (\n    <div>\n      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />\n      <table>...</table>\n    </div>\n  );\n}\n```',
  },
];

export function PromptPlayground({
  template = "",
  expectedOutput,
  hints,
  simulatedResponses,
}: PromptPlaygroundProps) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState(template);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const responses = simulatedResponses || defaultResponses;

  const runPrompt = useCallback(() => {
    setIsRunning(true);
    setOutput("");

    // Simulate typing effect
    const promptLower = prompt.toLowerCase();
    const match = responses.find((r) =>
      r.keywords.some((kw) => promptLower.includes(kw))
    );
    const responseText =
      match?.response ||
      "I'd be happy to help with that! Based on your prompt, here's my response:\n\nThe key aspects to consider are clarity, specificity, and context. A well-structured prompt leads to better AI outputs.\n\nWould you like me to elaborate on any specific aspect?";

    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setOutput(responseText.slice(0, i));
      if (i >= responseText.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 10);
  }, [prompt, responses]);

  return (
    <div className="space-y-4">
      {/* Prompt input */}
      <div className="rounded-xl bg-gray-900 p-5">
        <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
          {t("tutorial.promptPlayground")}
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-gray-800 text-gray-100 rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
          rows={4}
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={runPrompt}
            disabled={isRunning || !prompt.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            {t("tutorial.runPrompt")}
          </button>
          <button
            onClick={() => { setPrompt(template); setOutput(""); }}
            className="flex items-center gap-1.5 rounded-lg bg-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("tutorial.retry")}
          </button>
          <button
            onClick={() => { setPrompt(""); setOutput(""); }}
            className="flex items-center gap-1.5 rounded-lg bg-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t("tutorial.clear")}
          </button>
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="rounded-xl bg-white border border-gray-200 p-5">
          <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
            {t("tutorial.simulatedResponse")}
          </p>
          <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
            {output}
            {isRunning && <span className="animate-pulse">|</span>}
          </div>
        </div>
      )}

      {/* Expected output */}
      {expectedOutput && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-4">
          <p className="text-xs font-medium text-green-600 mb-1">
            {t("tutorial.expectedOutput")}
          </p>
          <p className="text-sm text-green-700">{expectedOutput}</p>
        </div>
      )}

      {/* Hints */}
      {hints && hints.length > 0 && (
        <details className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <summary className="text-sm font-medium text-amber-700 cursor-pointer">
            {t("tutorial.needHint")}
          </summary>
          <ul className="mt-2 space-y-1">
            {hints.map((h, i) => (
              <li key={i} className="text-sm text-amber-600">
                {h.hint}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Show example button */}
      {!showExample && (
        <button
          onClick={() => {
            setShowExample(true);
            if (template) {
              setPrompt(template);
              setTimeout(() => runPrompt(), 100);
            }
          }}
          className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Eye className="h-3.5 w-3.5" />
          {t("tutorial.showExample")}
        </button>
      )}
    </div>
  );
}
