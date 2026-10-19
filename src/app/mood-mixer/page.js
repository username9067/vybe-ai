
"use client";

import { useState } from "react";

const moods = [
  { name: "Stressed", emoji: "😵‍💫" },
  { name: "Low", emoji: "🥺" },
  { name: "Bored", emoji: "🥱" },
  { name: "Restless", emoji: "⚡" },
  { name: "Happy", emoji: "😎" },
  { name: "Overwhelmed", emoji: "🌪️" },
];

const goals = [
  { name: "Relaxed", emoji: "🌿" },
  { name: "Hyped", emoji: "🔥" },
  { name: "Confident", emoji: "👑" },
  { name: "Creative", emoji: "🎨" },
  { name: "Social", emoji: "🦋" },
  { name: "Focused", emoji: "🎯" },
];

const plans = {
  Relaxed: {
    title: "Your Soft Reset",
    emoji: "☁️",
    description: "Slow things down and give yourself room to breathe.",
    activities: [
      "Take five slow, comfortable breaths.",
      "Listen to rain or ocean sounds for five minutes.",
      "Put your phone aside and enjoy a quiet drink.",
    ],
    music: "relaxing ambient music rain ocean",
    challenge: "Spend five minutes doing absolutely nothing productive.",
  },
  Hyped: {
    title: "Your Energy Upgrade",
    emoji: "⚡",
    description: "Bring some movement, music, and momentum into your day.",
    activities: [
      "Play one song that makes you want to move.",
      "Do a two-minute dance break.",
      "Pick one small task and race the timer.",
    ],
    music: "high energy feel good workout playlist",
    challenge: "Move to your favourite song without worrying how you look.",
  },
  Confident: {
    title: "Your Main Character Moment",
    emoji: "👑",
    description: "Reconnect with what makes you uniquely you.",
    activities: [
      "Write down three things you like about yourself.",
      "Wear something that makes you feel good.",
      "Finish one small thing you've been putting off.",
    ],
    music: "confident main character energy playlist",
    challenge: "Do one thing today that your future self will thank you for.",
  },
  Creative: {
    title: "Your Creative Spark",
    emoji: "🎨",
    description: "Give your imagination a little space to play.",
    activities: [
      "Doodle for three minutes without judging it.",
      "Invent a name for a fictional café or brand.",
      "Write down five ideas, even the ridiculous ones.",
    ],
    music: "creative focus indie instrumental playlist",
    challenge: "Make something tiny in ten minutes.",
  },
  Social: {
    title: "Your Connection Boost",
    emoji: "🦋",
    description: "Add a little human connection to your day.",
    activities: [
      "Send someone a message just to say hi.",
      "Share a funny video or a song with a friend.",
      "Ask someone a question you've never asked them.",
    ],
    music: "feel good friendship party playlist",
    challenge: "Make someone smile with a genuine compliment.",
  },
  Focused: {
    title: "Your Focus Flow",
    emoji: "🎯",
    description: "Make the next step feel smaller and more manageable.",
    activities: [
      "Write down the one thing that matters most right now.",
      "Set a timer for ten minutes and begin.",
      "Silence notifications while you work on one task.",
    ],
    music: "lofi deep focus instrumental playlist",
    challenge: "Work on one task for ten minutes without switching.",
  },
};

const moodAdvice = {
  Stressed: "You don't have to solve everything at once.",
  Low: "Start small. A tiny step still counts.",
  Bored: "A little curiosity can change the whole afternoon.",
  Restless: "Give your energy somewhere useful to go.",
  Happy: "Enjoy the good feeling and carry it into something fun.",
  Overwhelmed: "You can choose just one next step. The rest can wait.",
};

export default function MoodMixerPage() {
  const [currentMood, setCurrentMood] = useState("");
  const [targetMood, setTargetMood] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [copied, setCopied] = useState(false);

  const plan = plans[targetMood];

  function createMix() {
    if (!currentMood || !targetMood) return;
    setCompleted([]);
    setCopied(false);
    setShowPlan(true);
  }

  function toggleActivity(activity) {
    setCompleted((previous) =>
      previous.includes(activity)
        ? previous.filter((item) => item !== activity)
        : [...previous, activity]
    );
  }

  async function shareMix() {
    const text = [
      `✨ MY VYBE MOOD MIXER ✨`,
      `Feeling: ${currentMood}`,
      `Moving towards: ${targetMood}`,
      `${plan.emoji} ${plan.title}`,
      plan.description,
      "",
      ...plan.activities.map((activity) => `• ${activity}`),
      "",
      `Today's mini-challenge: ${plan.challenge}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      window.prompt("Copy your Mood Mix:", text);
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
            PERSONALISE YOUR ENERGY
          </p>
          <h1 className="text-4xl sm:text-6xl font-black mt-4">
            MOOD <span className="text-fuchsia-400">MIXER.</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Where are you right now, and where do you want your vibe to go?
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            01. How are you feeling right now?
          </h2>
          <p className="text-gray-400 mt-2 mb-5">
            No right or wrong answer.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => {
                  setCurrentMood(mood.name);
                  setShowPlan(false);
                }}
                className={`rounded-2xl border p-4 transition ${
                  currentMood === mood.name
                    ? "border-fuchsia-400 bg-fuchsia-500/20"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
                }`}
              >
                <span className="text-3xl block">{mood.emoji}</span>
                <span className="block mt-2 font-semibold">{mood.name}</span>
              </button>
            ))}
          </div>

          <div className="my-8 border-t border-white/10" />

          <h2 className="text-2xl font-bold">
            02. How do you WANT to feel?
          </h2>
          <p className="text-gray-400 mt-2 mb-5">
            Pick your destination vibe.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {goals.map((goal) => (
              <button
                key={goal.name}
                onClick={() => {
                  setTargetMood(goal.name);
                  setShowPlan(false);
                }}
                className={`rounded-2xl border p-4 transition ${
                  targetMood === goal.name
                    ? "border-cyan-300 bg-cyan-400/15"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
                }`}
              >
                <span className="text-3xl block">{goal.emoji}</span>
                <span className="block mt-2 font-semibold">{goal.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={createMix}
            disabled={!currentMood || !targetMood}
            className="w-full mt-8 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold text-lg hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Mix My VYBE ✨
          </button>
        </section>

        {showPlan && plan && (
          <section className="mt-7 rounded-3xl border border-fuchsia-400/20 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-cyan-300 text-sm tracking-widest font-bold">
              YOUR PERSONAL VYBE MIX
            </p>

            <div className="flex gap-4 items-center mt-4">
              <div className="text-5xl">{plan.emoji}</div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black">
                  {plan.title}
                </h2>
                <p className="text-gray-400 mt-1">
                  {currentMood} → {targetMood}
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-7 mt-5">
              {moodAdvice[currentMood]} {plan.description}
            </p>

            <h3 className="text-xl font-bold mt-7 mb-4">
              Your three-step vibe plan
            </h3>

            <div className="space-y-3">
              {plan.activities.map((activity, index) => (
                <button
                  key={activity}
                  onClick={() => toggleActivity(activity)}
                  className={`w-full flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                    completed.includes(activity)
                      ? "border-emerald-400/40 bg-emerald-500/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                  }`}
                >
                  <span className="text-lg">
                    {completed.includes(activity) ? "✅" : `${index + 1}.`}
                  </span>
                  <span className={completed.includes(activity) ? "text-emerald-200" : ""}>
                    {activity}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/20 p-5">
              <p className="text-fuchsia-300 font-bold">🎯 MINI-CHALLENGE</p>
              <p className="mt-2 text-gray-200">{plan.challenge}</p>
            </div>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(plan.music)}`}
              target="_blank"
              rel="noreferrer"
              className="block text-center mt-5 rounded-xl border border-cyan-300/30 py-4 text-cyan-200 hover:bg-cyan-300/10"
            >
              ▶ Find your soundtrack on YouTube
            </a>

            <button
              onClick={shareMix}
              className="w-full mt-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold"
            >
              {copied ? "Mood Mix copied! ✓" : "Share my Mood Mix ↗"}
            </button>

            <p className="text-gray-500 text-sm text-center mt-4">
              {completed.length} of {plan.activities.length} activities completed
            </p>

            <button
              onClick={() => {
                setShowPlan(false);
                setCompleted([]);
              }}
              className="block mx-auto mt-5 text-gray-400 hover:text-white"
            >
              ↻ Create another mix
            </button>
          </section>
        )}

        <p className="text-center text-gray-500 text-xs mt-7">
          Your mood isn't a problem to fix. This is just a fun way to explore your vibe.
        </p>
      </div>
    </main>
  );
}