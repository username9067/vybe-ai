
"use client";

import { useState } from "react";

const questions = [
  {
    question: "Your perfect Friday night?",
    options: [
      { text: "Being the life of the party 🎉", type: "social" },
      { text: "A spontaneous adventure ⚡", type: "chaos" },
      { text: "A cozy night with my people 🧸", type: "soft" },
      { text: "Doing something iconic ✨", type: "main" },
    ],
  },
  {
    question: "Pick your natural superpower.",
    options: [
      { text: "Making everyone feel welcome 💖", type: "social" },
      { text: "Turning anything into an adventure 🌀", type: "chaos" },
      { text: "Understanding people's feelings 🌙", type: "soft" },
      { text: "Making an entrance everywhere 👑", type: "main" },
    ],
  },
  {
    question: "Your friends would describe you as…",
    options: [
      { text: "The social butterfly 🦋", type: "social" },
      { text: "The unpredictable one 🎲", type: "chaos" },
      { text: "The comfort person ☁️", type: "soft" },
      { text: "The iconic one 💅", type: "main" },
    ],
  },
  {
    question: "Choose your ultimate aesthetic.",
    options: [
      { text: "Neon lights and dance floors 🌈", type: "social" },
      { text: "Messy hair and wild plans 🛹", type: "chaos" },
      { text: "Rain, books and warm drinks ☕", type: "soft" },
      { text: "Bold outfits and big energy 💎", type: "main" },
    ],
  },
  {
    question: "When life gets boring, you…",
    options: [
      { text: "Call everyone for a hangout 📱", type: "social" },
      { text: "Do something completely random 🎯", type: "chaos" },
      { text: "Find a little moment of peace 🌷", type: "soft" },
      { text: "Create a new goal and own it 🚀", type: "main" },
    ],
  },
  {
    question: "Pick a motto for your life.",
    options: [
      { text: "Life is better together 💕", type: "social" },
      { text: "Why not? Let's find out! 🔥", type: "chaos" },
      { text: "Protect your peace 🕊️", type: "soft" },
      { text: "I was born to stand out 👑", type: "main" },
    ],
  },
];

const results = {
  social: {
    name: "The Social Butterfly",
    emoji: "🦋",
    color: "from-pink-500 to-purple-500",
    tagline: "Your energy brings people together.",
    description:
      "You're the connector, the conversation starter and the person who makes ordinary moments memorable. Your superpower is making people feel included.",
    strengths: ["Magnetic energy", "Big-hearted", "Fun to be around"],
    mission: "Message a friend and plan a spontaneous hangout.",
  },
  chaos: {
    name: "The Chaos Magnet",
    emoji: "⚡",
    color: "from-orange-500 to-pink-500",
    tagline: "Boring is simply not in your vocabulary.",
    description:
      "You're spontaneous, curious and always ready for the unexpected. Your best stories usually start with the words, 'Okay, hear me out…'",
    strengths: ["Fearless curiosity", "Creative thinker", "Adventure-ready"],
    mission: "Try one new thing today without overthinking it.",
  },
  soft: {
    name: "The Soft Soul",
    emoji: "🌙",
    color: "from-indigo-500 to-cyan-500",
    tagline: "A calm heart in a noisy world.",
    description:
      "You're thoughtful, caring and tuned into the little things. You bring comfort to others and know that not every moment needs to be loud to matter.",
    strengths: ["Deep empathy", "Thoughtful energy", "Peaceful presence"],
    mission: "Take 10 minutes just for yourself today.",
  },
  main: {
    name: "The Main Character",
    emoji: "👑",
    color: "from-fuchsia-500 to-amber-400",
    tagline: "Your life deserves its own soundtrack.",
    description:
      "Bold, expressive and full of potential, you like to make things happen. You bring ambition and personality wherever you go. This is your story—make it yours.",
    strengths: ["Confident energy", "Big dreams", "Memorable presence"],
    mission: "Do one thing today your future self will thank you for.",
  },
};

export default function VibeQuizPage() {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  function chooseAnswer(type) {
    const updated = { ...answers, [current]: type };
    setAnswers(updated);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const scores = { social: 0, chaos: 0, soft: 0, main: 0 };
      Object.values(updated).forEach((answer) => {
        scores[answer] += 1;
      });

      const winner = Object.keys(scores).reduce((best, type) =>
        scores[type] > scores[best] ? type : best
      );

      setResult(results[winner]);
    }
  }

  function restartQuiz() {
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setCopied(false);
  }

  async function shareResult() {
    const text = `My VYBE personality is ${result.name} ${result.emoji}\n${result.tagline}\nDiscover your VYBE!`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      window.prompt("Copy your VYBE result:", text);
    }
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
            VYBE PERSONALITY LAB
          </p>
          <h1 className="text-4xl sm:text-6xl font-black mt-4">
            WHAT&apos;S YOUR{" "}
            <span className="text-fuchsia-400">VYBE?</span>
          </h1>
          <p className="text-gray-400 mt-4">
            Six questions. Four personalities. One very YOU result.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-9 shadow-2xl">
          {!result ? (
            <>
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>QUESTION {current + 1} OF {questions.length}</span>
                <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
              </div>

              <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 transition-all duration-300"
                  style={{
                    width: `${((current + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-7">
                {questions[current].question}
              </h2>

              <div className="grid gap-3">
                {questions[current].options.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => chooseAnswer(option.type)}
                    className="text-left p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-fuchsia-500/15 hover:border-fuchsia-400 transition-all"
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-7">
                <button
                  onClick={() => setCurrent(Math.max(0, current - 1))}
                  disabled={current === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                >
                  ← Previous
                </button>
                <button
                  onClick={restartQuiz}
                  className="text-gray-400 hover:text-fuchsia-300"
                >
                  Start over
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-cyan-300 text-sm tracking-[0.25em] font-bold">
                YOUR VYBE IS...
              </p>

              <div
                className={`mx-auto mt-6 w-32 h-32 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center text-6xl shadow-xl`}
              >
                {result.emoji}
              </div>

              <h2 className="text-3xl sm:text-4xl font-black mt-7">
                {result.name}
              </h2>
              <p className="text-fuchsia-300 font-semibold mt-3">
                {result.tagline}
              </p>
              <p className="text-gray-300 leading-7 mt-6">
                {result.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-3 mt-7">
                {result.strengths.map((strength) => (
                  <div
                    key={strength}
                    className="rounded-xl bg-white/[0.06] border border-white/10 p-3 text-sm"
                  >
                    ✨ {strength}
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/20 p-5 text-left">
                <p className="text-fuchsia-300 font-bold">YOUR VYBE MISSION</p>
                <p className="mt-2 text-gray-200">{result.mission}</p>
              </div>

              <button
                onClick={shareResult}
                className="w-full mt-7 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 font-bold py-4"
              >
                {copied ? "Result copied! ✓" : "Share my VYBE ✨"}
              </button>

              <button
                onClick={restartQuiz}
                className="mt-4 text-cyan-300 hover:text-white"
              >
                ↻ Take the quiz again
              </button>
            </div>
          )}
        </section>

        <p className="text-center text-gray-500 text-xs mt-7">
          Just for fun — your VYBE is whatever you make it.
        </p>
      </div>
    </main>
  );
}