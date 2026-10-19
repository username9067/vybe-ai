
"use client";

import { useState } from "react";

const starterIdeas = [
  { text: "Watch a sunrise 🌅", category: "Adventure" },
  { text: "Learn a new dance move 💃", category: "Fun" },
  { text: "Try a food I've never tasted 🍜", category: "Adventure" },
  { text: "Have a no-phone evening 📵", category: "Self-care" },
  { text: "Make a playlist for my life 🎧", category: "Creative" },
  { text: "Tell someone why I appreciate them 💌", category: "Connection" },
  { text: "Learn five words in a new language 🌍", category: "Learning" },
  { text: "Create something with my own hands 🎨", category: "Creative" },
];

const categories = ["All", "Adventure", "Fun", "Self-care", "Creative", "Connection", "Learning"];

export default function BucketListPage() {
  const [items, setItems] = useState([]);
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [filter, setFilter] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);
  const [copied, setCopied] = useState(false);

  const completedCount = items.filter((item) => item.done).length;
  const visibleItems = items.filter(
    (item) =>
      (filter === "All" || item.category === filter) &&
      (showCompleted || !item.done)
  );

  function addItem(text, itemCategory = category) {
    const cleanText = text.trim();
    if (!cleanText) return;

    setItems((previous) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        text: cleanText,
        category: itemCategory,
        done: false,
      },
      ...previous,
    ]);
    setIdea("");
    setCopied(false);
  }

  function addStarter(item) {
    if (
      items.some(
        (existing) =>
          existing.text.toLowerCase() === item.text.toLowerCase()
      )
    ) {
      return;
    }
    addItem(item.text, item.category);
  }

  function toggleItem(id) {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function deleteItem(id) {
    setItems((previous) => previous.filter((item) => item.id !== id));
  }

  async function shareList() {
    const text = [
      "✨ MY VYBE BUCKET LIST ✨",
      "",
      ...items.map(
        (item) => `${item.done ? "✅" : "⬜"} ${item.text} — ${item.category}`
      ),
      "",
      `${completedCount} of ${items.length} dreams completed!`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      window.prompt("Copy your bucket list:", text);
    }
  }

  return (
    <main className="min-h-screen bg-[#100817] text-white px-5 py-10">
      <div className="max-w-3xl mx-auto">
        <a
          href="/"
          className="inline-block text-fuchsia-300 hover:text-cyan-300 mb-8"
        >
          ← Back to VYBE
        </a>

        <header className="text-center mb-10">
          <p className="text-cyan-300 font-bold tracking-[0.3em] text-sm">
            DREAM IT. PLAN IT. DO IT.
          </p>
          <h1 className="text-4xl sm:text-6xl font-black mt-4">
            VYBE <span className="text-fuchsia-400">BUCKET LIST.</span>
          </h1>
          <p className="text-gray-400 mt-4">
            Your life, your adventures, your list.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm">YOUR PROGRESS</p>
              <h2 className="text-3xl font-black mt-1">
                {completedCount} / {items.length}
              </h2>
              <p className="text-gray-400 text-sm mt-1">experiences completed</p>
            </div>
            <div className="text-5xl">🌈</div>
          </div>

          <div className="h-3 rounded-full bg-white/10 overflow-hidden mt-5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 transition-all duration-500"
              style={{
                width: `${items.length ? (completedCount / items.length) * 100 : 0}%`,
              }}
            />
          </div>

          {items.length > 0 && completedCount === items.length && (
            <p className="text-emerald-300 font-semibold mt-4">
              🎉 You've completed every item on your list!
            </p>
          )}
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Add a dream ✨</h2>
          <p className="text-gray-400 mt-2 mb-5">
            Big dream or tiny adventure — it belongs here.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              addItem(idea);
            }}
          >
            <input
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              maxLength={120}
              placeholder="e.g. Take a spontaneous weekend trip..."
              className="w-full rounded-xl border border-white/10 bg-black/20 p-4 outline-none focus:border-fuchsia-400"
            />

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-[#21132c] p-3"
              >
                {categories.filter((value) => value !== "All").map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!idea.trim()}
                className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-3 font-bold disabled:opacity-30"
              >
                + Add to my list
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Need inspiration?</h2>
          <p className="text-gray-400 mt-2 mb-5">
            Add one of these mini adventures to your list.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {starterIdeas.map((item) => {
              const alreadyAdded = items.some(
                (existing) =>
                  existing.text.toLowerCase() === item.text.toLowerCase()
              );

              return (
                <button
                  key={item.text}
                  onClick={() => addStarter(item)}
                  disabled={alreadyAdded}
                  className="flex items-center justify-between gap-3 text-left rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-fuchsia-400/50 disabled:opacity-40"
                >
                  <span>
                    <span className="block">{item.text}</span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {item.category}
                    </span>
                  </span>
                  <span>{alreadyAdded ? "✓" : "+"}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold">My adventures</h2>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(event) => setShowCompleted(event.target.checked)}
                className="accent-fuchsia-500"
              />
              Show completed
            </label>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 mb-3">
            {categories.map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                  filter === value
                    ? "border-fuchsia-400 bg-fuchsia-500/20 text-white"
                    : "border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {visibleItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center">
              <p className="text-4xl">🗺️</p>
              <p className="font-semibold mt-3">Your next adventure starts here.</p>
              <p className="text-sm text-gray-400 mt-2">
                Add a dream above or pick an idea to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex items-center gap-3"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-label={item.done ? "Mark as incomplete" : "Mark as completed"}
                    className={`w-7 h-7 shrink-0 rounded-lg border flex items-center justify-center ${
                      item.done
                        ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                        : "border-white/20 hover:border-fuchsia-400"
                    }`}
                  >
                    {item.done ? "✓" : ""}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`break-words ${item.done ? "line-through text-gray-500" : "text-gray-100"}`}>
                      {item.text}
                    </p>
                    <p className="text-xs text-cyan-300 mt-1">{item.category}</p>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    aria-label="Delete item"
                    className="text-gray-500 hover:text-rose-300 px-2"
                  >
                    ✕
                  </button>
                </article>
              ))}
            </div>
          )}

          <button
            onClick={shareList}
            disabled={items.length === 0}
            className="w-full mt-5 rounded-xl border border-fuchsia-400/30 py-4 font-bold hover:bg-fuchsia-500/10 disabled:opacity-30"
          >
            {copied ? "Bucket list copied! ✓" : "Share my bucket list ↗"}
          </button>
        </section>

        <p className="text-center text-gray-500 text-xs mt-8">
          Your dreams deserve a little space. Start with one.
        </p>
      </div>
    </main>
  );
}
