
"use client";

import { useState } from "react";

const moods = [
  { name: "Happy", emoji: "😄", color: "from-yellow-500/20 to-pink-500/20", description: "Keep that good energy going!" },
  { name: "Sad", emoji: "🥺", color: "from-blue-500/20 to-indigo-500/20", description: "Be gentle with yourself today." },
  { name: "Bored", emoji: "🥱", color: "from-cyan-500/20 to-purple-500/20", description: "Let's find something interesting!" },
  { name: "Stressed", emoji: "😵‍💫", color: "from-orange-500/20 to-red-500/20", description: "Take a breath and slow things down." },
  { name: "Confident", emoji: "😎", color: "from-fuchsia-500/20 to-purple-500/20", description: "You're ready to own the moment." },
  { name: "Lonely", emoji: "🫂", color: "from-indigo-500/20 to-cyan-500/20", description: "Let's find a little connection." },
  { name: "Adventurous", emoji: "🚀", color: "from-green-500/20 to-cyan-500/20", description: "Time to try something new!" },
  { name: "Sleepy", emoji: "😴", color: "from-purple-500/20 to-blue-500/20", description: "Your energy deserves a reset." },
];

const needs = [
  { name: "Music", emoji: "🎧" },
  { name: "Something fun", emoji: "🎮" },
  { name: "Relaxation", emoji: "🌿" },
  { name: "Connection", emoji: "💬" },
  { name: "Motivation", emoji: "⚡" },
  { name: "A surprise", emoji: "🎲" },
];

const recommendations = {
  Happy: {
    Music: ["Play your favourite feel-good playlist.", "Discover upbeat pop and dance tracks."],
    "Something fun": ["Try a 60-second dance challenge.", "Play a quick trivia game."],
    Relaxation: ["Enjoy a sunny break without your phone.", "Make your favourite drink and savour it."],
    Connection: ["Send a friend a voice note about your day.", "Share a song that makes you smile."],
    Motivation: ["Write down three things you're proud of.", "Use your energy to finish one small goal."],
    "A surprise": ["Try a random creative challenge.", "Discover a genre of music you rarely hear."],
  },
  Sad: {
    Music: ["Try gentle acoustic music.", "Listen to songs that feel comforting to you."],
    "Something fun": ["Watch a favourite comedy clip.", "Draw something silly for five minutes."],
    Relaxation: ["Wrap up in a blanket and take a quiet break.", "Try a gentle breathing exercise."],
    Connection: ["Message someone you trust.", "Ask a friend to chat for a few minutes."],
    Motivation: ["Choose one tiny task, not a whole to-do list.", "Remember a difficult thing you've already got through."],
    "A surprise": ["Explore calming nature sounds.", "Try a new cosy drink or snack."],
  },
  Bored: {
    Music: ["Explore a new music genre.", "Try a decade-themed music playlist."],
    "Something fun": ["Play Would You Rather.", "Complete a five-minute doodle challenge."],
    Relaxation: ["Try a guided visualisation.", "Take a mindful break away from your screen."],
    Connection: ["Start a rapid-fire question game with a friend.", "Call someone you haven't spoken to lately."],
    Motivation: ["Learn five words in a new language.", "Try a ten-minute mini project."],
    "A surprise": ["Let a random number choose your next challenge.", "Try something new from your bucket list."],
  },
  Stressed: {
    Music: ["Listen to soft instrumental music.", "Try gentle rain or ocean sounds."],
    "Something fun": ["Take a screen break and stretch.", "Try a simple, no-pressure puzzle."],
    Relaxation: ["Relax your shoulders and breathe comfortably.", "Write down what's on your mind."],
    Connection: ["Tell someone you could use a listening ear.", "Take a quiet walk with a friend."],
    Motivation: ["Pick the single most important next step.", "Give yourself permission to do one thing at a time."],
    "A surprise": ["Listen to a soundscape with your eyes closed.", "Take a two-minute pause and notice your surroundings."],
  },
  Confident: {
    Music: ["Build a playlist that makes you feel unstoppable.", "Try energetic hip-hop or pop."],
    "Something fun": ["Do a personal best challenge.", "Try a bold new outfit combination."],
    Relaxation: ["Celebrate your progress with a quiet moment.", "Take a walk and enjoy your own company."],
    Connection: ["Give someone a genuine compliment.", "Invite a friend to do something exciting."],
    Motivation: ["Start a goal you've been putting off.", "Write your next big ambition."],
    "A surprise": ["Try an activity you've never done before.", "Share a creative idea with someone."],
  },
  Lonely: {
    Music: ["Listen to music that makes you feel understood.", "Try warm, familiar songs."],
    "Something fun": ["Play an online game with a friend.", "Try a solo creative activity you can share later."],
    Relaxation: ["Make a comforting drink and settle in.", "Spend a few minutes outdoors if you can."],
    Connection: ["Send a simple 'How are you?' message.", "Join a hobby group or friendly community."],
    Motivation: ["Plan one thing to look forward to.", "Do a small act of kindness for yourself."],
    "A surprise": ["Discover a new hobby community.", "Make a playlist for someone you care about."],
  },
  Adventurous: {
    Music: ["Try a new genre from another country.", "Find a high-energy road-trip playlist."],
    "Something fun": ["Try a new recipe or creative challenge.", "Plan a mini adventure close to home."],
    Relaxation: ["Explore a new walking route at an easy pace.", "Try a short outdoor mindfulness break."],
    Connection: ["Invite a friend to try something new.", "Ask someone about their dream adventure."],
    Motivation: ["Take the first step on a bucket-list idea.", "Learn a new skill for ten minutes."],
    "A surprise": ["Choose an unfamiliar activity at random.", "Try a new cuisine or creative hobby."],
  },
  Sleepy: {
    Music: ["Try slow instrumental music.", "Listen to gentle nighttime ambience."],
    "Something fun": ["Try a calm word game.", "Read something light for a few minutes."],
    Relaxation: ["Dim the lights and wind down.", "Put your phone aside and rest comfortably."],
    Connection: ["Send a goodnight message to someone.", "Have a calm, low-key conversation."],
    Motivation: ["Write down one priority for tomorrow.", "Prepare one small thing for the morning."],
    "A surprise": ["Discover a peaceful ambient sound.", "Read an interesting little fact before bed."],
  },
};

export default function MoodMatch() {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedNeed, setSelectedNeed] = useState("");
  const [results, setResults] = useState([]);
  const [saved, setSaved] = useState([]);
  const [round, setRound] = useState(0);

  function findMatch() {
    if (!selectedMood || !selectedNeed) return;

    const options = recommendations[selectedMood][selectedNeed];
    const first = (round + 0) % options.length;
    const second = (round + 1) % options.length;

    setResults([options[first], options[second]]);
    setRound((previous) => previous + 1);
  }

  function reset() {
    setSelectedMood("");
    setSelectedNeed("");
    setResults([]);
    setRound(0);
  }

  return (
    <main className="min-h-screen bg-[#100817] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE
        </a>

        <header className="py-10 text-center">
          <div className="text-5xl">💖</div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            YOUR FEELING, YOUR EXPERIENCE
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Mood <span className="text-fuchsia-400">Match</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us how you feel and what you need. Let's find your next vibe.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-xl font-bold">01. How are you feeling?</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => {
                  setSelectedMood(mood.name);
                  setResults([]);
                }}
                className={`rounded-2xl border bg-gradient-to-br p-4 text-left transition ${mood.color} ${
                  selectedMood === mood.name
                    ? "border-fuchsia-400 ring-1 ring-fuchsia-400"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="mt-3 block font-bold">{mood.name}</span>
                <span className="mt-1 block text-xs text-gray-300">{mood.description}</span>
              </button>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-bold">02. What do you need right now?</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {needs.map((need) => (
              <button
                key={need.name}
                onClick={() => {
                  setSelectedNeed(need.name);
                  setResults([]);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  selectedNeed === need.name
                    ? "border-cyan-300 bg-cyan-400/10"
                    : "border-white/10 bg-white/[0.03] hover:border-cyan-300/50"
                }`}
              >
                <span className="mr-2 text-xl">{need.emoji}</span>
                <span className="font-semibold">{need.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={findMatch}
            disabled={!selectedMood || !selectedNeed}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-6 py-4 font-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            ✨ Find My Mood Match
          </button>

          {results.length > 0 && (
            <div className="mt-8 rounded-2xl border border-fuchsia-400/30 bg-[#1b1025] p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                YOUR PERSONAL MATCH
              </p>
              <h3 className="mt-2 text-2xl font-black">
                {moods.find((mood) => mood.name === selectedMood)?.emoji} Your {selectedMood} VYBE
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Pick whichever idea feels right. There's no wrong choice.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {results.map((result, index) => (
                  <div key={`${result}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-bold text-fuchsia-300">IDEA {index + 1}</p>
                    <p className="mt-2 font-semibold">{result}</p>
                    <button
                      onClick={() =>
                        setSaved((previous) =>
                          previous.includes(result)
                            ? previous.filter((item) => item !== result)
                            : [...previous, result]
                        )
                      }
                      className="mt-4 text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      {saved.includes(result) ? "♥ Saved idea" : "♡ Save idea"}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={findMatch}
                className="mt-5 rounded-xl border border-fuchsia-400/40 px-5 py-3 text-sm font-bold hover:bg-fuchsia-500/10"
              >
                🔄 Give me another match
              </button>
            </div>
          )}
        </section>

        {saved.length > 0 && (
          <section className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6">
            <h2 className="text-xl font-bold">♡ Your saved ideas</h2>
            <ul className="mt-4 space-y-3">
              {saved.map((idea) => (
                <li key={idea} className="flex items-start justify-between gap-3 rounded-xl bg-white/[0.04] p-4">
                  <span className="text-sm text-gray-200">{idea}</span>
                  <button
                    onClick={() => setSaved((previous) => previous.filter((item) => item !== idea))}
                    className="text-sm text-gray-400 hover:text-red-300"
                    aria-label={`Remove ${idea}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={reset}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
          >
            Start over
          </button>
        </div>

        <footer className="py-10 text-center text-sm text-gray-500">
          Your mood is a moment. Your next vibe is waiting. 💜
        </footer>
      </div>
    </main>
  );
}