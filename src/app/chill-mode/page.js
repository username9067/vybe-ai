
"use client";

import { useState } from "react";

const vibes = [
  { name: "Peaceful", emoji: "🌿", message: "You don't need to solve everything right now. Just be here." },
  { name: "Sleepy", emoji: "🌙", message: "Let the day go. You have permission to rest." },
  { name: "Dreamy", emoji: "☁️", message: "Let your thoughts wander somewhere beautiful." },
  { name: "Cozy", emoji: "🧸", message: "Get comfortable. This moment belongs to you." },
  { name: "Night Owl", emoji: "🌌", message: "Slow music, soft lights, and absolutely no rush." },
];

const sounds = [
  { name: "Rain Sounds", emoji: "🌧️", description: "Rain against a window", url: "https://www.youtube.com/results?search_query=rain+sounds+for+relaxation" },
  { name: "Ocean Waves", emoji: "🌊", description: "Gentle waves on a beach", url: "https://www.youtube.com/results?search_query=gentle+ocean+waves+relaxing" },
  { name: "Lo-fi Beats", emoji: "🎧", description: "Soft beats for a quiet moment", url: "https://www.youtube.com/results?search_query=chill+lofi+beats" },
  { name: "Forest Sounds", emoji: "🌲", description: "Birds, wind, and nature", url: "https://www.youtube.com/results?search_query=peaceful+forest+nature+sounds" },
  { name: "Sleep Music", emoji: "✨", description: "Slow music for bedtime", url: "https://www.youtube.com/results?search_query=calming+sleep+music" },
  { name: "Café Ambience", emoji: "☕", description: "A quiet café atmosphere", url: "https://www.youtube.com/results?search_query=cozy+cafe+ambience" },
];

const activities = [
  {
    name: "Just Breathe",
    emoji: "🌬️",
    description: "Take a few gentle breaths. No need to force or hold your breath.",
    steps: ["Relax your shoulders.", "Breathe in gently.", "Breathe out slowly.", "Repeat at your own comfortable pace."],
  },
  {
    name: "Tiny Gratitude",
    emoji: "💗",
    description: "Notice one small thing that made today a little better.",
    steps: ["Think of one person you appreciate.", "Remember one small happy moment.", "Name one thing you enjoyed today."],
  },
  {
    name: "Mind Unload",
    emoji: "📝",
    description: "Put your thoughts into words without judging them.",
    steps: ["Write whatever is on your mind.", "Don't worry about spelling or order.", "Choose one thing that can wait until tomorrow."],
  },
  {
    name: "Sensory Reset",
    emoji: "🍃",
    description: "Bring your attention back to the room around you.",
    steps: ["Notice five things you can see.", "Notice four things you can feel.", "Listen for three sounds.", "Notice two scents and one taste, if available."],
  },
];

export default function ChillMode() {
  const [selectedVibe, setSelectedVibe] = useState(vibes[0]);
  const [activeActivity, setActiveActivity] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  return (
    <main className="min-h-screen bg-[#100817] text-white px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE
        </a>

        <header className="py-10 text-center">
          <div className="mb-4 text-5xl">🌙</div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            YOUR PERSONAL ESCAPE
          </p>
          <h1 className="text-4xl font-black sm:text-6xl">
            Chill <span className="text-fuchsia-400">Mode</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            No pressure. No rush. Just a little space for yourself.
          </p>
        </header>

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-xl font-bold">What kind of chill are you feeling?</h2>
          <p className="mt-2 text-sm text-gray-400">Pick the vibe that feels right.</p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {vibes.map((vibe) => (
              <button
                key={vibe.name}
                onClick={() => setSelectedVibe(vibe)}
                className={`rounded-2xl border p-4 text-center transition ${
                  selectedVibe.name === vibe.name
                    ? "border-fuchsia-400 bg-fuchsia-500/15"
                    : "border-white/10 bg-white/[0.03] hover:border-fuchsia-400/50"
                }`}
              >
                <span className="block text-3xl">{vibe.emoji}</span>
                <span className="mt-2 block text-sm font-semibold">{vibe.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-[#21132d] p-5">
            <p className="text-xs uppercase tracking-widest text-cyan-300">A LITTLE REMINDER</p>
            <p className="mt-2 text-lg">{selectedVibe.message}</p>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Set the atmosphere 🎧</h2>
            <p className="mt-2 text-sm text-gray-400">
              Choose a sound and open its YouTube results.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sounds.map((sound) => (
              <a
                key={sound.name}
                href={sound.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-white/[0.07]"
              >
                <span className="text-3xl">{sound.emoji}</span>
                <h3 className="mt-4 font-bold group-hover:text-cyan-300">{sound.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{sound.description}</p>
                <p className="mt-4 text-xs font-semibold text-fuchsia-300">EXPLORE SOUNDS ↗</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold">Your little reset 🍃</h2>
          <p className="mt-2 text-sm text-gray-400">
            Choose one small activity. You can take it at your own pace.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {activities.map((activity) => (
              <div key={activity.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activity.emoji}</span>
                  <div>
                    <h3 className="font-bold">{activity.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">{activity.description}</p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setActiveActivity(activeActivity === activity.name ? null : activity.name)
                  }
                  className="mt-5 rounded-xl border border-fuchsia-400/40 px-4 py-2 text-sm font-semibold text-fuchsia-200 hover:bg-fuchsia-500/10"
                >
                  {activeActivity === activity.name ? "Close activity" : "Start activity"}
                </button>

                {activeActivity === activity.name && (
                  <ol className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    {activity.steps.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm text-gray-300">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-xs text-fuchsia-200">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() =>
                          setCompleted((previous) =>
                            previous.includes(activity.name)
                              ? previous
                              : [...previous, activity.name]
                          )
                        }
                        className="mt-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-[#100817] hover:bg-cyan-200"
                      >
                        {completed.includes(activity.name) ? "✓ Completed" : "I did this"}
                      </button>
                    </li>
                  </ol>
                )}
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Little resets completed: {completed.length} / {activities.length}
          </p>
        </section>

        <section className="rounded-3xl border border-fuchsia-400/20 bg-fuchsia-500/[0.06] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">A space just for you 💌</h2>
          <p className="mt-2 text-sm text-gray-400">
            Write a thought, a reminder, or anything you want to get out of your head.
            This note stays in this page session and is not saved to an account.
          </p>

          <button
            onClick={() => setShowNote(!showNote)}
            className="mt-5 rounded-xl bg-fuchsia-500 px-5 py-3 font-bold hover:bg-fuchsia-400"
          >
            {showNote ? "Close my notes" : "Open my notes"}
          </button>

          {showNote && (
            <div className="mt-5">
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Let your thoughts flow..."
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-[#160d20] p-4 text-white outline-none placeholder:text-gray-500 focus:border-fuchsia-400"
              />
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => setNote("")}
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
                >
                  Clear note
                </button>
                <span className="self-center text-xs text-gray-500">
                  {note.length} characters · not saved
                </span>
              </div>
            </div>
          )}
        </section>

        <footer className="py-10 text-center text-sm text-gray-500">
          Take what you need. Leave the rest. 💜
        </footer>
      </div>
    </main>
  );
}