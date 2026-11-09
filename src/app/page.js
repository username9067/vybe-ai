
"use client";

import { useState } from "react";

export default function Home() {
  const [mood, setMood] = useState("Bored");

  const moods = [
    ["😴", "Bored"],
    ["⚡", "Low energy"],
    ["😔", "Sad"],
    ["😵‍💫", "Stressed"],
    ["🥳", "Excited"],
    ["😌", "Calm"],
  ];

  // COMPLETE VYBE FEATURE COLLECTION
  const moments = [
    {
      emoji: "🤖",
      title: "Meet Your AI Friend",
      text: "Chat with Vybe AI for personalized ideas, mini adventures and fun challenges.",
      color: "from-fuchsia-500 via-purple-600 to-cyan-500",
      tag: "YOUR PERSONAL AI",
      href: "/ai-friend",
    },
    {
      emoji: "🎉",
      title: "Party Mode",
      text: "Kill the awkward silence. Start the fun.",
      color: "from-fuchsia-500 to-purple-600",
      tag: "FOR THE SQUAD",
      href: "/party",
    },
    {
      emoji: "🚗",
      title: "Road Trip Mode",
      text: "Windows down. Music up. Memories on.",
      color: "from-cyan-400 to-blue-600",
      tag: "ON THE MOVE",
      href: "/roadtrip",
    },
    {
      emoji: "🎧",
      title: "Boredom Buster",
      text: "Find your next song, game or mini adventure.",
      color: "from-orange-400 to-pink-600",
      tag: "BEAT THE MEH",
      href: "/boredom-buster",
    },
    {
      emoji: "🌈",
      title: "Mood Reset",
      text: "Try a fresh activity at your own pace.",
      color: "from-lime-400 to-emerald-600",
      tag: "A FRESH START",
      href: "/mood-reset",
    },
    {
      emoji: "🫶",
      title: "Friend Zone",
      text: "Icebreakers, silly games and unforgettable laughs.",
      color: "from-pink-400 to-rose-600",
      tag: "BETTER TOGETHER",
      href: "/friend-zone",
    },
    {
      emoji: "🌙",
      title: "Chill Mode",
      text: "Soft sounds and gentle moments. No pressure.",
      color: "from-indigo-400 to-violet-700",
      tag: "TAKE A BREATHER",
      href: "/chill-mode",
    },
    {
      emoji: "🎁",
      title: "Daily Drop",
      text: "One vibe, one quote and one little challenge every day.",
      color: "from-purple-500 to-pink-500",
      tag: "YOUR DAILY DOSE",
      href: "/daily-drop",
    },
    {
      emoji: "🎨",
      title: "Mood Mixer",
      text: "Mix your mood with fresh ideas and discover a different vibe.",
      color: "from-blue-500 to-fuchsia-600",
      tag: "MIX YOUR VIBE",
      href: "/mood-mixer",
    },
    {
      emoji: "🔥",
      title: "Truth or Dare",
      text: "Take on unexpected questions, hilarious dares and bold challenges.",
      color: "from-orange-500 to-red-600",
      tag: "DARE TO PLAY",
      href: "/truth-or-dare",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: "🎭",
      title: "Name your vibe",
      text: "Start with how you feel and where you want to go next.",
      color: "text-fuchsia-300",
    },
    {
      number: "02",
      icon: "🎶",
      title: "Jump into it",
      text: "Try a song, play a challenge or explore something new.",
      color: "text-cyan-300",
    },
    {
      number: "03",
      icon: "💫",
      title: "Find your next",
      text: "Check in and choose another experience if you feel like it.",
      color: "text-orange-300",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#10091d] text-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-[#10091d]/90 px-5 py-4 backdrop-blur-xl md:px-14">
        <a href="#start" className="shrink-0 text-2xl font-black tracking-tight">
          <span className="text-fuchsia-400">✳</span> VYBE
          <span className="text-cyan-300">AI</span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="/ai-friend"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 px-3 py-2.5 text-xs font-bold text-white sm:px-4 sm:text-sm"
          >
            ✨ AI Friend
          </a>

          <a
            href="#moments"
            className="rounded-full bg-white/10 px-3 py-2.5 text-xs font-bold transition hover:bg-white/20 sm:px-5 sm:text-sm"
          >
            Explore vibes <span className="text-cyan-300">↗</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="start"
        className="relative isolate overflow-hidden px-5 pb-24 pt-20 text-center md:pb-32 md:pt-28"
      >
        <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-[110px]" />
        <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-64 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[100px]" />

        <div className="mx-auto max-w-4xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold tracking-widest text-fuchsia-200">
            <span className="animate-pulse">✦</span>
            YOUR MOOD HAS A PLAY BUTTON
            <span>✦</span>
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl md:text-8xl">
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
            Let&apos;s find your next song, game or little adventure.
          </p>

          {/* MOOD SELECTOR */}
          <div className="mx-auto mt-12 max-w-xl rounded-[28px] border border-white/15 bg-[#1c1230]/90 p-5 text-left shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl sm:p-8">

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black tracking-[0.2em] text-cyan-300">
                VYBE CHECK ✦ 01
              </p>

              <span className="rounded-full bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">
                Your moment
              </span>
            </div>

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
                  className={`group flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-2 text-xs font-semibold transition duration-200 hover:-translate-y-1 sm:text-sm ${
                    mood === name
                      ? "scale-[1.02] border-fuchsia-300 bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/10 shadow-lg shadow-fuchsia-500/10"
                      : "border-white/10 bg-white/[0.04] hover:border-cyan-300/50 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="text-3xl transition group-hover:scale-110">
                    {emoji}
                  </span>

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
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-5 py-4 font-black text-white shadow-lg shadow-fuchsia-900/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              LET&apos;S VYBE <span className="ml-2">⚡ ↗</span>
            </button>

            <p className="mt-4 text-center text-xs text-purple-100/50">
              A song. A game. A little change of pace.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-purple-100/60">
            <span>🎵 Music to match your mood</span>
            <span>🎮 Games to break the routine</span>
            <span>✨ New ways to spend a moment</span>
          </div>

          <a
            href="/ai-friend"
            className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-fuchsia-300/30 bg-white/[0.05] px-6 py-3 font-bold transition hover:border-cyan-300/50 hover:bg-white/10"
          >
            <span className="text-xl">🤖</span>
            Need ideas? Chat with your AI Friend
            <span className="text-cyan-300">↗</span>
          </a>
        </div>
      </section>

      {/* HOW VYBE WORKS */}
      <section className="border-y border-white/10 bg-[#160e25] px-5 py-20 md:px-14">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-xs font-black tracking-[0.25em] text-cyan-300">
              THE VYBE LOOP
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
              Less scrolling.
              <span className="text-fuchsia-300"> More living.</span>
            </h2>

            <p className="mt-4 text-sm text-purple-100/60 sm:text-base">
              Three little steps. Your next moment starts here.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition hover:border-fuchsia-300/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-black ${item.color}`}>
                    STEP {item.number}
                  </span>
                  <span className="text-3xl">{item.icon}</span>
                </div>

                <h3 className="mt-7 text-xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-purple-100/60">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ALL VYBE FEATURES */}
      <section id="moments" className="px-5 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <p className="text-xs font-black tracking-[0.25em] text-fuchsia-300">
              EXPLORE THE VYBE UNIVERSE
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
              One app.
              <span className="text-cyan-300"> Every vibe.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-purple-100/60 sm:text-base">
              From chaotic group chats to quiet nights in, there&apos;s a VYBE
              for that.
            </p>

            <div className="mt-5 inline-flex rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold text-fuchsia-200">
              ✨ 10 WAYS TO FIND YOUR VYBE
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moments.map((item) => (
              <a
                key={item.title}
                href={item.href}
                aria-label={`Open ${item.title}`}
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-[#1a1229] transition duration-300 hover:-translate-y-2 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <div
                  className={`relative flex h-44 flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br ${item.color}`}
                >
                  <div className="absolute -right-6 -top-10 h-36 w-36 rounded-full border border-white/20" />
                  <div className="absolute -bottom-16 -left-4 h-36 w-36 rounded-full border border-white/20" />

                  <span className="relative text-6xl transition duration-300 group-hover:scale-125">
                    {item.emoji}
                  </span>

                  <span className="relative rounded-full border border-white/30 bg-black/10 px-3 py-1 text-[9px] font-black tracking-[0.2em]">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-purple-100/60">
                    {item.text}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
                    Open feature <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE CREATOR */}
      <section
        id="about"
        className="relative overflow-hidden border-y border-white/10 bg-[#160e25] px-5 py-20 md:px-14 md:py-28"
      >
        <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-white/10 bg-[#1c1230]/80 p-7 shadow-2xl shadow-fuchsia-950/20 backdrop-blur-xl sm:p-12">

            <p className="text-xs font-black tracking-[0.25em] text-cyan-300">
              THE MIND BEHIND VYBE
            </p>

            <div className="mt-7 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 text-5xl shadow-lg shadow-fuchsia-900/20">
                🚀
              </div>

              <div>
                <h2 className="text-3xl font-black sm:text-4xl">
                  Meet Raghav Gulati
                </h2>

                <p className="mt-2 font-bold text-fuchsia-300">
                  Founder & Creator of VYBE AI
                </p>

                <p className="mt-4 text-sm leading-7 text-purple-100/70">
                  A young creator passionate about technology, creativity
                  and building ideas that make a difference.
                </p>
              </div>
            </div>

            <div className="mt-8 h-px bg-white/10" />

            <p className="mt-8 text-base leading-8 text-purple-100/80 sm:text-lg">
              I believe technology should make everyday life more exciting.
              VYBE AI was created to turn ordinary moments into extraordinary
              experiences through creativity, artificial intelligence and
              entertainment.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold text-fuchsia-200">
                ✨ BUILT WITH CREATIVITY
              </span>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold text-cyan-200">
                🤖 POWERED BY AI
              </span>
            </div>

            <p className="mt-8 text-sm font-bold text-purple-200/60">
              An idea brought to life by Raghav Gulati.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="relative isolate overflow-hidden border-t border-white/10 px-5 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-fuchsia-700/20 via-purple-600/20 to-cyan-500/20 blur-3xl" />

        <span className="text-5xl text-fuchsia-300">✳</span>

        <h2 className="mt-6 text-4xl font-black sm:text-5xl md:text-6xl">
          Don&apos;t just scroll.
          <br />
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            Change the vibe.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-purple-100/60">
          Your next song, game or good little moment is waiting.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#start"
            className="inline-block rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 font-black text-white shadow-xl shadow-fuchsia-900/20 transition hover:scale-105"
          >
            FIND MY VYBE ↑
          </a>

          <a
            href="/ai-friend"
            className="inline-block rounded-full border border-white/20 bg-white/10 px-8 py-4 font-black text-white transition hover:scale-105 hover:bg-white/15"
          >
            ✨ CHAT WITH AI
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-8 text-center sm:flex-row sm:px-14 sm:text-left">

        <a href="#start" className="text-xl font-black">
          <span className="text-fuchsia-400">✳</span> VYBE
          <span className="text-cyan-300">AI</span>
        </a>

        <p className="text-xs text-purple-100/50">
          Made for the way you feel.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-purple-100/50">
          <a href="/privacy" className="transition hover:text-cyan-300">
            Privacy
          </a>

          <a href="/terms" className="transition hover:text-cyan-300">
            Terms
          </a>
        </div>

        <p className="text-xs text-purple-100/40">
          © 2026 VYBE AI
        </p>
      </footer>

    </main>
  );
}
