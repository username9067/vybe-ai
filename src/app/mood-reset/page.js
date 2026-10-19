
"use client";

import { useEffect, useState } from "react";

const moods = [
  { name: "Stressed", emoji: "😵‍💫", color: "from-violet-500 to-indigo-500", message: "You don't have to solve everything right now." },
  { name: "Low", emoji: "🌧️", color: "from-blue-500 to-cyan-500", message: "Take things one small step at a time." },
  { name: "Anxious", emoji: "🫧", color: "from-sky-400 to-teal-400", message: "Bring your attention back to this moment." },
  { name: "Overwhelmed", emoji: "🌊", color: "from-indigo-500 to-blue-500", message: "One thing at a time is enough." },
  { name: "Restless", emoji: "⚡", color: "from-amber-400 to-orange-500", message: "A gentle pause can help you reset." },
  { name: "Okay", emoji: "🌿", color: "from-emerald-400 to-teal-500", message: "Give yourself a moment to appreciate today." },
];

const activities = [
  {
    title: "The 5-4-3-2-1 Reset",
    emoji: "🌎",
    duration: "2 minutes",
    description: "Bring your attention to the world around you.",
    steps: [
      "Notice 5 things you can see.",
      "Notice 4 things you can feel.",
      "Notice 3 things you can hear.",
      "Notice 2 things you can smell.",
      "Notice 1 thing you can taste, or one thing you appreciate.",
    ],
  },
  {
    title: "Unclench & Unwind",
    emoji: "🧘",
    duration: "1 minute",
    description: "Release some tension from your body.",
    steps: [
      "Let your shoulders drop naturally.",
      "Unclench your jaw and relax your hands.",
      "Stretch your fingers gently.",
      "Roll your shoulders slowly if comfortable.",
      "Notice how your body feels now.",
    ],
  },
  {
    title: "Thought Unload",
    emoji: "📝",
    duration: "3 minutes",
    description: "Give your thoughts somewhere to go.",
    steps: [
      "Name one thing taking up your attention.",
      "Write down what is bothering you, if you wish.",
      "Separate what you can control from what you cannot.",
      "Choose one tiny next step, or decide to pause.",
      "Remind yourself that you don't need every answer today.",
    ],
  },
  {
    title: "Tiny Joy Hunt",
    emoji: "🌼",
    duration: "2 minutes",
    description: "Look for a small, pleasant moment.",
    steps: [
      "Look around for a colour you love.",
      "Think of a song that lifts your mood.",
      "Remember a moment that made you smile.",
      "Notice one comfortable thing around you.",
      "Choose one small thing you would enjoy doing next.",
    ],
  },
];

const affirmations = [
  "I can take this one moment at a time.",
  "Rest is allowed. I don't have to earn it.",
  "I can begin again without getting everything perfect.",
  "My feelings are real, and they can change.",
  "Small steps still count as progress.",
  "I can be kind to myself while I figure things out.",
  "I am allowed to pause before responding.",
  "Today does not have to be perfect to have good moments.",
  "I can focus on the next manageable step.",
  "I deserve the same kindness I offer others.",
];

export default function MoodResetPage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState("Breathe in");
  const [seconds, setSeconds] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");

  useEffect(() => {
    if (!breathing) return;

    const timer = setInterval(() => {
      setSeconds((current) => {
        if (current > 1) return current - 1;

        setPhase((oldPhase) => {
          if (oldPhase === "Breathe in") return "Breathe out";
          setCycles((count) => count + 1);
          return "Breathe in";
        });

        return 4;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathing]);

  function startBreathing() {
    setPhase("Breathe in");
    setSeconds(4);
    setCycles(0);
    setBreathing(true);
  }

  function stopBreathing() {
    setBreathing(false);
    setPhase("Breathe in");
    setSeconds(4);
  }

  function openActivity(activity) {
    setActiveActivity(activity);
    setStepIndex(0);
  }

  function nextStep() {
    if (stepIndex < activeActivity.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setActiveActivity(null);
      setStepIndex(0);
    }
  }

  return (
    <main className="min-h-screen bg-[#160d20] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE AI
        </a>

        <header className="py-10 text-center sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
            🌿 YOUR MOMENT OF CALM
          </div>
          <h1 className="text-4xl font-black sm:text-6xl">
            MOOD <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">RESET</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
            Pause the noise. Take a breath. Give yourself a little space to reset.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <p className="text-sm font-semibold text-cyan-200">01 / CHECK IN</p>
          <h2 className="mt-2 text-2xl font-bold">How are you feeling right now?</h2>
          <p className="mt-2 text-sm text-white/50">No right or wrong answer. Just notice how you feel.</p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`rounded-2xl border p-4 text-left transition ${
                  selectedMood === mood.name
                    ? "border-cyan-300/60 bg-cyan-300/10"
                    : "border-white/10 bg-black/10 hover:border-white/25"
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <p className="mt-2 font-bold">{mood.name}</p>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4">
              <p className="font-semibold text-cyan-100">
                {moods.find((mood) => mood.name === selectedMood).message}
              </p>
              <p className="mt-2 text-sm text-white/50">
                Would you like to try a reset activity below?
              </p>
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 p-5 sm:p-7">
            <p className="text-sm font-semibold text-fuchsia-200">02 / BREATHE</p>
            <h2 className="mt-2 text-2xl font-bold">Take a breathing break</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Follow a gentle four-second inhale and four-second exhale. Keep your breathing comfortable; return to normal if you feel dizzy or uncomfortable.
            </p>

            <div className="flex flex-col items-center py-6">
              <div className={`flex h-44 w-44 items-center justify-center rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 transition-all duration-1000 ${
                breathing && phase === "Breathe in" ? "scale-110" : "scale-90"
              }`}>
                <div className="text-center">
                  <p className="text-lg font-bold">{breathing ? phase : "Ready?"}</p>
                  <p className="mt-1 text-4xl font-black text-fuchsia-200">
                    {breathing ? seconds : "🌸"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/50">
                {breathing ? `Cycles completed: ${cycles}` : "Follow your own comfortable pace."}
              </p>
            </div>

            <button
              onClick={breathing ? stopBreathing : startBreathing}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-4 font-bold transition hover:brightness-110"
            >
              {breathing ? "Stop breathing exercise" : "Start breathing exercise"}
            </button>
          </div>

          <div className="rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 to-teal-400/5 p-5 sm:p-7">
            <p className="text-sm font-semibold text-cyan-200">03 / RESET YOUR MIND</p>
            <h2 className="mt-2 text-2xl font-bold">A little reminder for you</h2>
            <p className="mt-3 min-h-[100px] text-xl font-semibold leading-8">
              “{affirmations[affirmationIndex]}”
            </p>
            <p className="mt-2 text-sm text-white/45">
              Keep the words that feel helpful. Leave the rest.
            </p>
            <button
              onClick={() => setAffirmationIndex((index) => (index + 1) % affirmations.length)}
              className="mt-6 w-full rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-5 py-4 font-bold text-cyan-100 transition hover:bg-cyan-300/20"
            >
              ✨ Give me another reminder
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <p className="text-sm font-semibold text-emerald-200">04 / SMALL ACTIVITIES</p>
          <h2 className="mt-2 text-2xl font-bold">Choose your reset</h2>
          <p className="mt-2 text-sm text-white/50">
            Small, simple activities. Go at your own pace.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {activities.map((activity) => (
              <button
                key={activity.title}
                onClick={() => openActivity(activity)}
                className="rounded-2xl border border-white/10 bg-black/10 p-5 text-left transition hover:border-emerald-300/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-3xl">{activity.emoji}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                    {activity.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-bold">{activity.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{activity.description}</p>
                <p className="mt-4 text-sm font-semibold text-emerald-200">Start activity →</p>
              </button>
            ))}
          </div>
        </section>

        {activeActivity && (
          <div className="mt-6 rounded-3xl border border-emerald-300/25 bg-emerald-300/5 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-200">
                  GUIDED ACTIVITY · STEP {stepIndex + 1} OF {activeActivity.steps.length}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{activeActivity.title}</h2>
              </div>
              <button
                onClick={() => setActiveActivity(null)}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-white/60 hover:bg-white/5"
              >
                Close
              </button>
            </div>
            <p className="mt-6 text-xl leading-8">{activeActivity.steps[stepIndex]}</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-300 transition-all"
                style={{ width: `${((stepIndex + 1) / activeActivity.steps.length) * 100}%` }}
              />
            </div>
            <button
              onClick={nextStep}
              className="mt-6 w-full rounded-2xl bg-emerald-300 px-5 py-4 font-bold text-[#14251e] transition hover:brightness-110 sm:w-auto"
            >
              {stepIndex === activeActivity.steps.length - 1 ? "✓ Finish activity" : "Next step →"}
            </button>
          </div>
        )}

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <p className="text-sm font-semibold text-amber-200">05 / YOUR NOTE</p>
          <h2 className="mt-2 text-2xl font-bold">What would help you right now?</h2>
          <p className="mt-2 text-sm leading-6 text-white/50">
            Write a private note for yourself. It stays on this page and is not saved after a refresh.
          </p>
          <textarea
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            maxLength={500}
            placeholder="Maybe I need a break, a glass of water, a walk, or a chat with someone..."
            className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 outline-none placeholder:text-white/30 focus:border-amber-300/40"
          />
          <p className="mt-2 text-right text-xs text-white/35">{checkIn.length}/500</p>
        </section>

        <footer className="py-10 text-center text-sm text-white/30">
          Take what helps. Leave what doesn't. 💜
        </footer>
      </div>
    </main>
  );
}