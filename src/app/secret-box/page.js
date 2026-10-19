
"use client";

import { useState } from "react";

const prompts = [
  "Something I wish people understood about me is…",
  "A memory that still makes me smile is…",
  "Something I've never said out loud is…",
  "If I could start over with one thing, it would be…",
  "One thing I'm proud of but rarely talk about is…",
  "My most random thought today is…",
  "Something I want to do but keep postponing is…",
  "If nobody judged me, I would…",
];

const categories = [
  { name: "Secret Thought", emoji: "🤫" },
  { name: "Happy Memory", emoji: "💖" },
  { name: "Unsent Message", emoji: "💌" },
  { name: "Dream & Goals", emoji: "🌙" },
];

export default function SecretBoxPage() {
  const [category, setCategory] = useState(categories[0].name);
  const [thought, setThought] = useState("");
  const [entries, setEntries] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  function getPrompt() {
    const choices = prompts.filter((item) => item !== prompt);
    const next = choices[Math.floor(Math.random() * choices.length)];
    setPrompt(next);
    setRevealed(false);
  }

  function addEntry() {
    const text = thought.trim();
    if (!text) return;

    setEntries((previous) => [
      {
        id: Date.now(),
        category,
        text,
        date: new Date().toLocaleDateString(),
      },
      ...previous,
    ]);

    setThought("");
    setRevealed(false);
    setCopied(false);
  }

  async function copyEntry(entry) {
    try {
      await navigator.clipboard.writeText(entry.text);
      setCopied(entry.id);
    } catch {
      window.prompt("Copy your thought:", entry.text);
    }
  }

  function deleteEntry(id) {
    setEntries((previous) => previous.filter((entry) => entry.id !== id));
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-[#100817] text-white px-5 py-10">
      <div className="max-w-2xl mx-auto">
        <a
          href="/"
          className="inline-block text-fuchsia-300 hover:text-cyan-300 mb-8"
        >
          ← Back to VYBE
        </a>

        <header className="text-center mb-10">
          <p className="text-cyan-300 font-bold tracking-[0.3em] text-sm">
            JUST YOU AND YOUR THOUGHTS
          </p>
          <h1 className="text-4xl sm:text-6xl font-black mt-4">
            SECRET <span className="text-fuchsia-400">BOX.</span>
          </h1>
          <p className="text-gray-400 mt-4">
            No perfect words needed. Just get it out.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">What's on your mind?</h2>
          <p className="text-gray-400 mt-2">
            Choose a vibe for your thought.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {categories.map((item) => (
              <button
                key={item.name}
                onClick={() => setCategory(item.name)}
                className={`rounded-xl border p-3 text-sm transition ${
                  category === item.name
                    ? "border-fuchsia-400 bg-fuchsia-500/15"
                    : "border-white/10 hover:bg-white/[0.06]"
                }`}
              >
                <span className="block text-2xl mb-2">{item.emoji}</span>
                {item.name}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4">
            <p className="text-cyan-200 text-sm font-bold">
              NEED A LITTLE INSPIRATION?
            </p>
            {prompt ? (
              <p className="mt-2 text-gray-200">{prompt}</p>
            ) : (
              <p className="mt-2 text-gray-400">
                Get a random prompt to help you begin.
              </p>
            )}
            <button
              onClick={getPrompt}
              className="mt-3 text-cyan-300 hover:text-white font-semibold"
            >
              ✨ Give me a prompt
            </button>
          </div>

          <textarea
            value={thought}
            onChange={(event) => setThought(event.target.value)}
            placeholder="Write whatever you need to get off your chest..."
            maxLength={2000}
            rows={6}
            className="w-full mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-white placeholder:text-gray-500 outline-none focus:border-fuchsia-400 resize-y"
          />

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Your words don't need to be perfect.</span>
            <span>{thought.length}/2000</span>
          </div>

          <button
            onClick={addEntry}
            disabled={!thought.trim()}
            className="w-full mt-5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold disabled:opacity-30"
          >
            Place it in my Secret Box 💌
          </button>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold">Your little collection</h2>
            <span className="text-sm text-gray-400">
              {entries.length} {entries.length === 1 ? "thought" : "thoughts"}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="text-center rounded-2xl border border-dashed border-white/15 p-8">
              <div className="text-4xl">📮</div>
              <p className="text-gray-300 mt-3">Your box is waiting.</p>
              <p className="text-sm text-gray-500 mt-1">
                Add a thought above and it will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-fuchsia-300 text-sm font-semibold">
                      {categories.find((item) => item.name === entry.category)?.emoji}{" "}
                      {entry.category}
                    </span>
                    <span className="text-xs text-gray-500">{entry.date}</span>
                  </div>

                  {revealed === entry.id ? (
                    <p className="whitespace-pre-wrap leading-7 mt-4 text-gray-200">
                      {entry.text}
                    </p>
                  ) : (
                    <button
                      onClick={() => setRevealed(entry.id)}
                      className="w-full mt-4 rounded-xl border border-white/10 bg-black/20 py-5 text-gray-300 hover:border-fuchsia-400/50"
                    >
                      🔒 Tap to reveal your thought
                    </button>
                  )}

                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    {revealed === entry.id && (
                      <button
                        onClick={() => copyEntry(entry)}
                        className="text-cyan-300 hover:text-white"
                      >
                        {copied === entry.id ? "Copied ✓" : "Copy thought"}
                      </button>
                    )}
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-rose-300 hover:text-rose-200"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="text-center text-gray-500 text-xs mt-8">
          This demo keeps thoughts in temporary page memory. Avoid entering highly
          sensitive information on a shared device.
        </p>
      </div>
    </main>
  );
}