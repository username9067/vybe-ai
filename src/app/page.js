"use client";

import { useState } from "react";

const features = [
  { title: "Party Mode", emoji: "🎉", description: "Get the whole squad playing.", route: "/party", category: "Games", color: "from-fuchsia-500 to-purple-600" },
  { title: "Road Trip Mode", emoji: "🚗", description: "Games and fun for the journey.", route: "/roadtrip", category: "Games", color: "from-cyan-400 to-blue-600" },
  { title: "Boredom Buster", emoji: "🎧", description: "Find something fun to do next.", route: "/boredom-buster", category: "Games", color: "from-orange-400 to-pink-600" },
  { title: "Mood Reset", emoji: "🌈", description: "Refresh your mood and energy.", route: "/mood-reset", category: "Mood", color: "from-lime-400 to-emerald-600" },
  { title: "Friend Zone", emoji: "🫶", description: "Questions and games for friends.", route: "/friend-zone", category: "Social", color: "from-pink-400 to-rose-600" },
  { title: "Chill Mode", emoji: "🌙", description: "Slow down and relax.", route: "/chill-mode", category: "Mood", color: "from-indigo-400 to-violet-700" },
  { title: "Secret Box", emoji: "🤫", description: "Explore secrets and confessions.", route: "/secret-box", category: "Social", color: "from-violet-500 to-fuchsia-600" },
  { title: "Vote Battle", emoji: "⚔️", description: "Put two choices head-to-head.", route: "/vote-battle", category: "Games", color: "from-rose-500 to-orange-500" },
  { title: "Spin the Wheel", emoji: "🎡", description: "Let the wheel decide your next move.", route: "/spin-wheel", category: "Games", color: "from-amber-400 to-pink-500" },
  { title: "Truth or Dare", emoji: "🔥", description: "Make your next hangout unpredictable.", route: "/truth-or-dare", category: "Games", color: "from-red-500 to-fuchsia-600" },
  { title: "Would You Rather", emoji: "🤔", description: "Choose between two wild options.", route: "/would-you-rather", category: "Games", color: "from-blue-500 to-violet-600" },
  { title: "VYBE Quiz", emoji: "🧩", description: "Discover your personality vibe.", route: "/vibe-quiz", category: "Mood", color: "from-cyan-400 to-indigo-600" },
  { title: "Mood Match", emoji: "💞", description: "Explore how your vibes compare.", route: "/mood-match", category: "Mood", color: "from-pink-400 to-purple-600" },
  { title: "Mood Mixer", emoji: "🎨", description: "Mix moods and find a new vibe.", route: "/mood-mixer", category: "Mood", color: "from-orange-400 to-fuchsia-600" },
  { title: "Daily Drop", emoji: "🎁", description: "Find a little surprise for today.", route: "/daily-drop", category: "Daily", color: "from-emerald-400 to-cyan-600" },
  { title: "After Dark", emoji: "🌃", description: "Explore late-night entertainment.", route: "/after-dark", category: "Social", color: "from-slate-600 to-purple-700" },
  { title: "Compliment Machine", emoji: "💖", description: "Spread a little kindness.", route: "/compliment-machine", category: "Social", color: "from-pink-400 to-red-500" },
  { title: "Bucket List", emoji: "✨", description: "Collect adventures to experience.", route: "/bucket-list", category: "Lifestyle", color: "from-yellow-400 to-orange-500" },
  { title: "Personalized Experience", emoji: "⚡", description: "Start with the mood you choose.", route: "/experience", category: "Mood", color: "from-fuchsia-500 to-cyan-500" },
];

const categories = ["All", "Games", "Mood", "Social", "Daily", "Lifestyle"];

export default function Home() {
  const [mood, setMood] = useState("Bored");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const moods = [
    ["😴", "Bored"],
    ["⚡", "Low energy"],
    ["😔", "Sad"],
    ["😵‍💫", "Stressed"],
    ["🥳", "Excited"],
    ["😌", "Calm"],
  ];

  const filteredFeatures = features.filter((feature) => {
    const matchesCategory =
      category === "All" || feature.category === category;

    const matchesSearch =
      feature.title.toLowerCase().includes(search.toLowerCase()) ||
      feature.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[#10091d] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#10091d]/90 px-5 py-4 backdrop-blur-xl md:px-14">
        <a href="#start" className="text-2xl font-black tracking-tight">
          <span className="text-fuchsia-400">✳</span> VYBE
          <span className="text-cyan-300">AI</span>
        </a>

        <a
          href="#features"
          className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold transition hover:bg-white/20"
        >
          Explore features <span className="text-cyan-300">↗</span>
        </a>
      </nav>

      {/* Hero */}
      <section
        id="start"
        className="relative isolate overflow-hidden px-5 pb-20 pt-20 text-center md:pb-28 md:pt-28"
      >
        <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-[110px]" />
        <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[110px]" />

        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold tracking-widest text-fuchsia-200">
            ✦ YOUR MOOD HAS A PLAY BUTTON ✦
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-8xl">
            Your mood.
            <br />
            Your rules.
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              Your VYBE.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-purple-100/70 md:text-lg">
            Bored? Restless? Ready to party?
            <br />
            Find your next game, challenge or little adventure.
          </p>

          {/* Mood selector */}
          <div className="mx-auto mt-12 max-w-xl rounded-[28px] border border-white/15 bg-[#1c1230]/90 p-5 text-left shadow-2xl shadow-fuchsia-950/30 sm:p-8">
            <p className="text-xs font-black tracking-[0.2em] text-cyan-300">
              VYBE CHECK ✦ 01
            </p>

            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
              What&apos;s your vibe right now?
            </h2>

            <p className="mt-2 text-sm text-purple-100/60">
              No overthinking. Pick what feels right.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {moods.map(([emoji, name]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setMood(name)}
                  aria-pressed={mood === name}
                  className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-2 text-xs font-semibold transition hover:-translate-y-1 sm:text-sm ${
                    mood === name
                      ? "border-fuchsia-300 bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/10 shadow-lg"
                      : "border-white/10 bg-white/[0.04] hover:border-cyan-300/50"
                  }`}
                >
                  <span className="text-3xl">{emoji}</span>
                  <span>{name}</span>

                  {mood === name && (
                    <span className="text-[9px] font-black tracking-widest text-cyan-300">
                      SELECTED ✓
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href = `/experience?mood=${encodeURIComponent(mood)}`;
              }}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-5 py-4 font-black shadow-lg transition hover:-translate-y-0.5 hover:brightness-110"
            >
              LET&apos;S VYBE ⚡ →
            </button>
          </div>
        </div>
      </section>

      {/* Brand message */}
      <section className="border-y border-white/10 bg-[#160e25] px-5 py-16 md:px-14">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black tracking-[0.25em] text-cyan-300">
            THE VYBE LOOP
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Less scrolling.{" "}
            <span className="text-fuchsia-300">More living.</span>
          </h2>

          <p className="mt-4 text-sm text-purple-100/60">
            Choose a vibe and jump straight into the fun.
          </p>
        </div>
      </section>

      {/* Feature collection */}
      <section
        id="features"
        className="px-5 py-20 md:px-14 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-black tracking-[0.25em] text-fuchsia-300">
              THE VYBE COLLECTION
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
              All your vibes.{" "}
              <span className="text-cyan-300">One place.</span>
            </h2>

            <p className="mt-4 text-sm text-purple-100/60">
              Explore all 19 features and find your next favourite.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mb-6 max-w-xl">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search features..."
              aria-label="Search features"
              className="w-full rounded-2xl border border-white/15 bg-[#1c1230] px-5 py-4 text-white outline-none placeholder:text-purple-100/40 focus:border-cyan-300"
            />
          </div>

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  category === item
                    ? "border-fuchsia-300 bg-fuchsia-500/20 text-white"
                    : "border-white/10 bg-white/[0.04] text-purple-100/70 hover:border-cyan-300/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFeatures.map((feature) => (
              <a
                key={feature.route}
                href={feature.route}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#1a1229] transition duration-300 hover:-translate-y-2 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <div
                  className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${feature.color}`}
                >
                  <div className="absolute -right-5 -top-10 h-32 w-32 rounded-full border border-white/20" />
                  <div className="absolute -bottom-12 -left-4 h-32 w-32 rounded-full border border-white/20" />

                  <span className="relative text-6xl transition duration-300 group-hover:scale-125">
                    {feature.emoji}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-extrabold">
                      {feature.title}
                    </h3>
                    <span className="text-cyan-300">↗</span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-purple-100/60">
                    {feature.description}
                  </p>

                  <span className="mt-4 inline-block rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-fuchsia-200">
                    {feature.category}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {filteredFeatures.length === 0 && (
            <p className="py-12 text-center text-purple-100/60">
              No features found. Try another search.
            </p>
          )}
        </div>
      </section>

      {/* Final call to action */}
      <section className="border-t border-white/10 px-5 py-20 text-center">
        <span className="text-5xl text-fuchsia-300">✳</span>

        <h2 className="mt-6 text-4xl font-black sm:text-5xl">
          Don&apos;t just scroll.
          <br />
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            Change the vibe.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-purple-100/60">
          Your next game, challenge or good little moment is waiting.
        </p>

        <a
          href="#start"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 font-black shadow-xl transition hover:scale-105"
        >
          FIND MY VYBE ↑
        </a>
      </section>

      {/* Footer with creator credit */}
      <footer className="border-t border-white/10 px-6 py-10 md:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <a href="#start" className="text-xl font-black">
            <span className="text-fuchsia-400">✳</span> VYBE
            <span className="text-cyan-300">AI</span>
          </a>

          <div className="text-center">
            <p className="text-sm text-purple-100/60">
              Made for the way you feel.
            </p>
            <p className="mt-2 text-sm text-purple-100/50">
              Created with <span className="text-pink-400">♥</span> by{" "}
              <span className="font-bold text-white">Raghav Gulati</span>
            </p>
          </div>

          <p className="text-xs text-purple-100/40">
            © 2026 VYBE AI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}