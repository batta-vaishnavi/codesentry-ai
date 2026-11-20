
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReview = async () => {
    setError("");
    setMessage("");
    setReview("");

    if (!code.trim()) {
      setError("Please enter some code before starting the review.");
      return;
    }

    if (code.length > 12000) {
      setError("Code is too long. Maximum allowed length is 12,000 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The code review failed.");
      }

      setReview(data.review || "No review was returned.");
      setMessage("Code review completed successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6ff] text-[#28213c]">
      {/* Navigation */}
      <header className="border-b border-purple-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-xl text-white">
              {"</>"}
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-purple-950">
                CodeSentry <span className="text-purple-600">AI</span>
              </h1>
              <p className="text-xs text-gray-500">
                Intelligent Code Review Assistant
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-sm font-medium text-gray-600 sm:flex">
            <a href="#review" className="transition hover:text-purple-700">
              Code Review
            </a>
            <a href="#features" className="transition hover:text-purple-700">
              Features
            </a>
            <span className="rounded-full bg-purple-50 px-4 py-2 text-purple-700">
              AI Powered
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700">
          <span>✦</span>
          Intelligent code analysis, simplified
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight text-purple-950 sm:text-5xl">
          Write Better Code.
          <br />
          <span className="text-purple-600">Build With Confidence.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
          Your AI-powered coding companion. Detect bugs, identify security
          issues, optimize performance, and improve your code quality.
        </p>
      </section>

      {/* Main Workspace */}
      <section
        id="review"
        className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 lg:grid-cols-5"
      >
        {/* Code Input */}
        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-purple-950">
                Code Workspace
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Paste your code below for intelligent analysis.
              </p>
            </div>

            <span className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700">
              CODE INPUT
            </span>
          </div>

          <label
            htmlFor="language"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Programming Language
          </label>

          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-5 w-full rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          >
            <option>Python</option>
            <option>JavaScript</option>
            <option>TypeScript</option>
            <option>Java</option>
            <option>C++</option>
            <option>C</option>
          </select>

          {/* Code Editor */}
          <div className="overflow-hidden rounded-xl border border-[#302746] bg-[#211b32]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                <span className="h-3 w-3 rounded-full bg-green-400"></span>
              </div>

              <span className="text-xs text-purple-200">
                {language.toLowerCase()} code
              </span>
            </div>

            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
                setMessage("");
              }}
              maxLength={12000}
              placeholder={`# Paste your ${language} code here...\n\n# Example:\ndef greet(name):\n    print("Hello", name)\n\ngreet("Developer")`}
              spellCheck={false}
              className="min-h-[300px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-purple-100 outline-none placeholder:text-purple-300/50"
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>Maximum 12,000 characters</span>
            <span>{code.length.toLocaleString()} / 12,000</span>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              ⚠ {error}
            </p>
          )}

          {/* Review Button */}
          <button
            onClick={handleReview}
            disabled={isLoading}
            className="mt-6 w-full rounded-xl bg-purple-700 px-5 py-4 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Reviewing your code..." : "✦ Review My Code"}
          </button>

          {/* Success Message */}
          {message && (
            <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm leading-6 text-purple-800">
              ✓ {message}
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-purple-950">
                Review Results
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Your code analysis will appear here.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-700">
              ✦
            </div>
          </div>

          {/* Formatted AI Review Output */}
          {review ? (
            <div className="min-h-[340px] max-h-[600px] overflow-y-auto rounded-xl border border-purple-200 bg-[#faf9ff] p-5 text-sm leading-7 text-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-4 mt-6 text-2xl font-bold text-purple-950">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-5 border-b border-purple-100 pb-2 text-xl font-bold text-purple-800">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-4 text-lg font-semibold text-purple-800">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-2 pl-6">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-2 pl-6">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="pl-1">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-purple-950">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-purple-800">{children}</em>
                  ),
                  pre: ({ children }) => (
                    <pre className="my-4 overflow-x-auto rounded-xl border border-purple-900 bg-[#211b32] p-4 text-sm leading-6 text-purple-100">
                      {children}
                    </pre>
                  ),
                  code: ({ children, className }) => (
                    <code
                      className={
                        className
                          ? `${className} font-mono text-purple-100`
                          : "rounded bg-purple-100 px-1.5 py-0.5 font-mono text-purple-900"
                      }
                    >
                      {children}
                    </code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-4 border-l-4 border-purple-400 pl-4 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="my-5 border-purple-200" />,
                  table: ({ children }) => (
                    <div className="my-4 overflow-x-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-purple-200 bg-purple-100 px-3 py-2 font-semibold text-purple-950">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-purple-200 px-3 py-2">
                      {children}
                    </td>
                  ),
                }}
              >
                {review}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex min-h-[340px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-[#faf9ff] px-5 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl text-purple-700">
                {"</>"}
              </div>

              <h4 className="text-lg font-bold text-purple-950">
                Ready to Review?
              </h4>

              <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
                Submit your code to get detailed insights about bugs, security,
                performance, and code quality.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["Bug Detection", "Security", "Optimization"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-purple-200 bg-white px-3 py-2 text-xs text-purple-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="mt-5 text-center text-xs text-gray-400">
            Powered by CodeSentry AI
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-purple-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-purple-950">
              Everything Your Code Needs
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Smart analysis designed to help developers write better software.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {[
              {
                icon: "⌕",
                title: "Bug Detection",
                description: "Identify errors and potential bugs in your code.",
              },
              {
                icon: "♢",
                title: "Security Analysis",
                description: "Discover common security vulnerabilities.",
              },
              {
                icon: "⚡",
                title: "Code Optimization",
                description: "Find ways to improve code performance.",
              },
              {
                icon: "✦",
                title: "Code Explanation",
                description: "Understand complex code with AI assistance.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-purple-100 bg-[#faf9ff] p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-700">
                  {feature.icon}
                </div>

                <h4 className="font-bold text-purple-950">
                  {feature.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-[#f8f6ff] px-6 py-7 text-center">
        <p className="text-sm font-semibold text-purple-800">
          CodeSentry AI
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Intelligent Code Review Assistant · Built with Next.js
        </p>
      </footer>
    </main>
  );
}
