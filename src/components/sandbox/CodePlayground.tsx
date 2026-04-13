"use client";
import { useState, useRef } from "react";
import { Play, RotateCcw, Sparkles } from "lucide-react";

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
  simulatedCompletion?: string;
  simulatedOutput?: string;
}

export function CodePlayground({
  initialCode = '// Type your code here\nconsole.log("Hello, AI!");',
  language = "javascript",
  simulatedCompletion,
  simulatedOutput = '> Hello, AI!\n> Program finished.',
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    setTimeout(() => {
      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 800);
  };

  const triggerCompletion = () => {
    if (!simulatedCompletion) return;
    setShowCompletion(true);
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setCode((prev) => prev + simulatedCompletion.slice(i - 2, i));
      if (i >= simulatedCompletion.length) {
        clearInterval(interval);
        setShowCompletion(false);
      }
    }, 30);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      {/* Editor header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-400 ml-2">
            main.{language === "python" ? "py" : language === "typescript" ? "ts" : "js"}
          </span>
        </div>
        <div className="flex gap-2">
          {simulatedCompletion && (
            <button
              onClick={triggerCompletion}
              disabled={showCompletion}
              className="flex items-center gap-1 rounded bg-indigo-600/20 px-2.5 py-1 text-xs text-indigo-300 hover:bg-indigo-600/30 disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3" />
              AI Complete
            </button>
          )}
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1 rounded bg-green-600/20 px-2.5 py-1 text-xs text-green-300 hover:bg-green-600/30 disabled:opacity-50"
          >
            <Play className="h-3 w-3" />
            Run
          </button>
          <button
            onClick={() => { setCode(initialCode); setOutput(""); }}
            className="flex items-center gap-1 rounded bg-gray-600/30 px-2.5 py-1 text-xs text-gray-400 hover:bg-gray-600/50"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Code editor */}
      <div className="bg-gray-900 p-4">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-transparent text-green-300 font-mono text-sm resize-none focus:outline-none min-h-[200px] leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Output panel */}
      {(output || isRunning) && (
        <div className="bg-gray-950 border-t border-gray-700 p-4">
          <p className="text-xs text-gray-500 mb-2">Output:</p>
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
            {isRunning ? (
              <span className="text-yellow-400 animate-pulse">Running...</span>
            ) : (
              output
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
