
"use client";

import { useEffect, useState } from "react";

const drops = [
  {
    vibe: "MAIN CHARACTER ENERGY",
    emoji: "👑",
    color: "from-fuchsia-500 to-purple-600",
    quote: "Stop waiting for the perfect moment. Make this moment yours.",
    challenge: "Do one thing you've been putting off for too long.",
    bonus: "Play your favourite song and take a 5-minute main-character walk.",
  },
  {
    vibe: "SOFT LIFE MODE",
    emoji: "☁️",
    color: "from-sky-400 to-indigo-500",
    quote: "You are allowed to grow at your own pace.",
    challenge: "Take 10 minutes away from your screen and enjoy a quiet moment.",
    bonus: "Make a cozy drink, stretch gently, and take three slow breaths.",
  },
  {
    vibe: "CHAOS BUT CUTE",
    emoji: "⚡",
    color: "from-orange-400 to-pink-500",
    quote: "A little spontaneity can turn an ordinary day into a story.",
    challenge: "Try something new today, even if it's something tiny.",
    bonus: "Pick a song at random and dance like nobody is watching.",
  },
  {
    vibe: "SOCIAL BUTTERFLY",
    emoji: "🦋",
    color: "from-pink-400 to-rose-600",
    quote: "Sometimes, one small message can make someone's whole day.",
    challenge: "Reach out to someone you haven't spoken to in a while.",
    bonus: "Send someone a genuine compliment with no reason needed.",
  },
  {
    vibe: "CREATIVE SPARK",
    emoji: "🎨",
    color: "from-violet-500 to-cyan-500",
    quote: "Your ideas don't need permission to exist.",
    challenge: "Create something in 10 minutes: a doodle, playlist, poem, or idea.",
    bonus: "Write down three ideas you'd love to try someday.",
  },
  {
    vibe: "RESET & RISE",
    emoji: "🌅",
    color: "from-amber-400 to-orange-600",
    quote: "You can begin again without explaining yourself to anyone.",
    challenge: "Clear one small space around you and give yourself a fresh start.",
    bonus: "Write down one thing you're ready to leave behind and one thing to welcome.",
  },
  {
    vibe: "GOOD VIBES ONLY",
    emoji: "🌈",
    color: "from-emerald-400 to-teal-600",
    quote: "Look for the little things that make life feel good.",
    challenge: "Notice three small things today that make you smile.",
    bonus: "Make a mini playlist of three songs that instantly lift your mood.",
  },
];

function getTodayIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  return day % drops.length;
}

export default function DailyDropPage() {
  const [todayIndex, setTodayIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTodayIndex(getTodayIndex());
  }, []);

  const today = drops[todayIndex];

  async function shareDrop() {
    const message =
      `✨ VYBE DAILY DROP ✨\n\n${today.emoji} ${today.vibe}\n` +
      `“${today.quote}”\n\nToday's challenge: ${today.challenge}\n\nYour turn!`;

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      window.prompt("Copy your Daily Drop:", message);
    }
  }

  return (
    <main className="min-h-screen bg-[#100817] px-5 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-8 inline-block text-fuchsia-300 hover:text-cyan-300"
        >
          ← Back to VYBE
        </a>

        <header className="mb-10 text-center">
          <p className="text-sm font-bold tracking-[0.3em] text-cyan-300">
            YOUR DAILY DOSE OF VYBE
          </p>
          <h1 className="mt-4 text-5xl font-black sm:text-6xl">
            DAILY <span className="text-fuchsia-400">DROP.</span>
          </h1>
          <p className="mt-4 text-gray-400">
            One vibe. One quote. One little challenge.
          </p>
        </header>

        <section
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${today.color} p-7 shadow-2xl sm:p-10`}
        >
          <div className="absolute -right-8 -top-8 text-9xl opacity-15">
            {today.emoji}
          </div>

          <div className="relative">
            <p className="text-sm font-bold tracking-widest text-white/80">
              TODAY'S VIBE
            </p>
            <div className="mt-5 text-6xl">{today.emoji}</div>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              {today.vibe}
            </h2>
            <p className="mt-6 text-lg leading-relaxed sm:text-xl">
              “{today.quote}”
            </p>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-bold tracking-widest text-cyan-300">
            🎯 TODAY'S MINI CHALLENGE
          </p>
          <h3 className="mt-4 text-2xl font-bold">
            Your mission, should you choose to accept it…
          </h3>
          <p className="mt-3 leading-7 text-gray-300">{today.challenge}</p>

          <button
            onClick={() => setCompleted(!completed)}
            className={`mt-6 w-full rounded-xl py-4 font-bold transition ${
              completed
                ? "border border-emerald-400 bg-emerald-500/20 text-emerald-300"
                : "bg-white text-[#160d20] hover:bg-cyan-200"
            }`}
          >
            {completed ? "✓ Challenge completed!" : "I did it! ✓"}
          </button>

          {completed && (
            <p className="mt-4 text-center text-emerald-300">
              Look at you showing up for yourself. ✨
            </p>
          )}
        </section>

        <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-bold tracking-widest text-fuchsia-300">
            ✨ BONUS DROP
          </p>
          <h3 className="mt-3 text-xl font-bold">Want a little extra?</h3>

          {showBonus ? (
            <p className="mt-4 leading-7 text-gray-300">{today.bonus}</p>
          ) : (
            <button
              onClick={() => setShowBonus(true)}
              className="mt-4 rounded-xl border border-fuchsia-400/40 px-5 py-3 hover:bg-fuchsia-500/10"
            >
              Reveal my bonus ✨
            </button>
          )}
        </section>

        <button
          onClick={shareDrop}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold hover:opacity-90"
        >
          {copied ? "Copied! Share it with your friends ✓" : "Share today's drop ↗"}
        </button>

        <p className="mt-7 text-center text-xs text-gray-500">
          A small daily reminder to live life your way. 💜
        </p>
      </div>
    </main>
  );
}
