
"use client";

import { useState } from "react";

const categories = {
  "Deep Questions": [
    "What is something you wish more people understood about you?",
    "If you could relive one ordinary day, which would it be?",
    "What version of yourself are you trying to become?",
    "What is a memory that instantly makes you smile?",
    "What would you do if you knew you couldn't fail?",
    "What is something you have outgrown?",
    "What does your ideal life look like in five years?",
    "What is one thing you want to do just for yourself?",
  ],
  "Funny Questions": [
    "If your life had a blooper reel, what would be in it?",
    "What is the weirdest food combination you secretly enjoy?",
    "If animals could talk, which species would be the rudest?",
    "What would your totally useless superpower be?",
    "If your phone could expose one harmless secret, what would it reveal?",
    "Which fictional character would be the worst roommate?",
    "What would you name your autobiography if it had to be ridiculous?",
    "If you had to wear one outfit forever, what would it be?",
  ],
  "Midnight Challenges": [
    "Write a six-word story about your day.",
    "Make a playlist with a title that describes your current life.",
    "Draw your mood without lifting your pen.",
    "Send someone a genuine compliment.",
    "Invent a new holiday and explain how to celebrate it.",
    "Take a photo of something ordinary that looks beautiful.",
    "Describe your day using only three emojis.",
    "Write a message to your future self.",
  ],
  "What If": [
    "What if you could teleport anywhere for one hour?",
    "What if you woke up tomorrow with a completely new talent?",
    "What if you could hear the soundtrack of your life?",
    "What if you could spend one day inside your favourite movie?",
    "What if you could ask your future self one question?",
    "What if money and time were no obstacles for one year?",
    "What if you could instantly master any language?",
    "What if you could create one new rule for the whole world?",
  ],
};

const vibes = [
  {
    name: "The Dreamer",
    emoji: "🌙",
    description: "Soft, reflective, and a little mysterious.",
    mission: "Write down one dream you don't want to give up on.",
    search: "dreamy late night chill music",
    prompt: "What would your perfect life feel like, not just look like?",
  },
  {
    name: "The Rebel",
    emoji: "⚡",
    description: "Bold energy. Break your usual routine.",
    mission: "Do one small thing differently tomorrow.",
    search: "confident main character energy playlist",
    prompt: "What would you try if you stopped worrying about being judged?",
  },
  {
    name: "The Romantic",
    emoji: "💗",
    description: "Little details, big feelings, soft moments.",
    mission: "Write down five tiny things you find beautiful.",
    search: "romantic late night playlist",
    prompt: "What little thing makes you feel most appreciated?",
  },
  {
    name: "The Main Character",
    emoji: "🎬",
    description: "Your life deserves its own soundtrack.",
    mission: "Pick a song and imagine the opening scene of your movie.",
    search: "main character soundtrack playlist",
    prompt: "What would the title of this chapter of your life be?",
  },
  {
    name: "The Explorer",
    emoji: "🌌",
    description: "Curious, spontaneous, ready for something new.",
    mission: "Find one place, hobby, or skill you'd love to explore.",
    search: "adventure cinematic music playlist",
    prompt: "What experience do you want to have at least once in your life?",
  },
];

export default function AfterDarkPage() {
  const [category, setCategory] = useState("Deep Questions");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  function generateQuestion() {
    const available = categories[category].filter(
      (question) => !usedQuestions.includes(`${category}:${question}`)
    );

    const pool = available.length > 0 ? available : categories[category];
    const question = pool[Math.floor(Math.random() * pool.length)];

    setCurrentQuestion(question);
    setUsedQuestions((previous) => {
      const next = [...previous, `${category}:${question}`];
      return next.length > 30 ? next.slice(-30) : next;
    });
    setCopiedPrompt(false);
  }

  function chooseCategory(nextCategory) {
    setCategory(nextCategory);
    setCurrentQuestion("");
    setCopiedPrompt(false);
  }

  async function copyPrompt() {
    if (!currentQuestion) return;

    try {
      await navigator.clipboard.writeText(currentQuestion);
      setCopiedPrompt(true);
    } catch {
      setCopiedPrompt(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0714] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE
        </a>

        <header className="py-12 text-center">
          <div className="text-5xl">🌌</div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            THE WORLD AFTER HOURS
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            VYBE <span className="text-fuchsia-400">After Dark</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            For the late-night thinkers, dreamers, and people who are not quite ready to sleep.
          </p>
        </header>

        <section className="rounded-3xl border border-fuchsia-400/20 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
            THE MIDNIGHT QUESTION MACHINE
          </p>
          <h2 className="mt-2 text-2xl font-black">Let's get interesting. 💭</h2>
          <p className="mt-2 text-sm text-gray-400">
            Choose a category and generate a question or challenge.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {Object.keys(categories).map((item) => (
              <button
                key={item}
                onClick={() => chooseCategory(item)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "border-fuchsia-400 bg-fuchsia-500/15 text-white"
                    : "border-white/10 text-gray-400 hover:border-fuchsia-400/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#170d22] p-6 text-center">
            {currentQuestion ? (
              <>
                <span className="text-3xl">✦</span>
                <p className="mt-4 max-w-2xl text-xl font-bold sm:text-2xl">
                  {currentQuestion}
                </p>
                <button
                  onClick={copyPrompt}
                  className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                >
                  {copiedPrompt ? "Copied!" : "Copy question"}
                </button>
              </>
            ) : (
              <>
                <span className="text-4xl">🔮</span>
                <p className="mt-4 text-gray-400">
                  Your next late-night thought is waiting...
                </p>
              </>
            )}
          </div>

          <button
            onClick={generateQuestion}
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-5 py-4 font-black hover:opacity-90"
          >
            ✨ Generate {category === "Midnight Challenges" ? "Challenge" : "Question"}
          </button>
        </section>

        <section className="mt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
            PICK YOUR STORYLINE
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            Tonight, you're the main character. 🎬
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Choose a persona to unlock your own mini mission and journal prompt.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vibes.map((vibe) => (
              <button
                key={vibe.name}
                onClick={() => setSelectedVibe(vibe)}
                className={`rounded-2xl border p-5 text-left transition ${
                  selectedVibe?.name === vibe.name
                    ? "border-fuchsia-400 bg-fuchsia-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-fuchsia-400/50"
                }`}
              >
                <span className="text-3xl">{vibe.emoji}</span>
                <h3 className="mt-3 font-bold">{vibe.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{vibe.description}</p>
              </button>
            ))}
          </div>
        </section>

        {selectedVibe && (
          <section className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              YOUR TONIGHT VYBE
            </p>
            <h2 className="mt-2 text-2xl font-black">
              {selectedVibe.emoji} {selectedVibe.name}
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm font-bold text-fuchsia-300">YOUR MINI MISSION</p>
                <p className="mt-2 text-gray-200">{selectedVibe.mission}</p>
                <button
                  onClick={() =>
                    setCompletedMissions((previous) =>
                      previous.includes(selectedVibe.name)
                        ? previous
                        : [...previous, selectedVibe.name]
                    )
                  }
                  className="mt-4 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-[#0d0714] hover:bg-cyan-200"
                >
                  {completedMissions.includes(selectedVibe.name)
                    ? "✓ Mission completed"
                    : "I did it"}
                </button>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm font-bold text-fuchsia-300">JOURNAL PROMPT</p>
                <p className="mt-2 text-gray-200">{selectedVibe.prompt}</p>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedVibe.search)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/5"
                >
                  🎧 Find your soundtrack ↗
                </a>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-400">
              Missions completed: {completedMissions.length} / {vibes.length}
            </p>
          </section>
        )}

        <footer className="py-10 text-center text-sm text-gray-500">
          The night is yours. Make it a good one. 💜
        </footer>
      </div>
    </main>
  );
}