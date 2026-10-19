
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const experiences = {
  Bored: {
    emoji: "🥱",
    title: "Bored? Let's fix that.",
    description: "Your next little adventure starts right here.",
    songs: [
      ["Uptown Funk", "Mark Ronson ft. Bruno Mars"],
      ["Levitating", "Dua Lipa"],
      ["Can't Stop the Feeling!", "Justin Timberlake"],
    ],
    activities: [
      ["⚡", "30-Second Challenge", "Name 5 movies, foods or countries in 30 seconds."],
      ["🎭", "Emoji Story", "Create a funny story using 5 random emojis."],
      ["🕵️", "Mystery Mission", "Find something nearby that starts with V."],
    ],
  },
  "Low energy": {
    emoji: "🔋",
    title: "Running on low battery?",
    description: "Let's find a little spark without forcing the vibe.",
    songs: [
      ["Sunroof", "Nicky Youre & dazy"],
      ["Golden Hour", "JVKE"],
      ["Ilahi", "Arijit Singh"],
    ],
    activities: [
      ["🌤️", "Tiny Reset", "Stretch gently, breathe and drink some water."],
      ["🎨", "Colour Hunt", "Find 3 things in your favourite colour."],
      ["🌱", "One Small Win", "Finish one tiny task in 2 minutes."],
    ],
  },
  Sad: {
    emoji: "💜",
    title: "A little gentleness, please.",
    description: "You don't have to force happiness. Take this moment at your pace.",
    songs: [
      ["Here Comes the Sun", "The Beatles"],
      ["Love You Zindagi", "Jasleen Royal"],
      ["Count on Me", "Bruno Mars"],
    ],
    activities: [
      ["🫶", "Kindness Check", "Think of something kind you'd say to a friend. Say it to yourself too."],
      ["☁️", "Cloud Break", "Imagine your favourite peaceful place for a minute."],
      ["💌", "Reach Out", "If you feel like it, say hello to someone you trust."],
    ],
  },
  Stressed: {
    emoji: "🫠",
    title: "Pause. Breathe. Reset.",
    description: "One small moment of calm. No pressure to do everything at once.",
    songs: [
      ["Weightless", "Marconi Union"],
      ["Kasoor", "Prateek Kuhad"],
      ["Agar Tum Saath Ho", "Alka Yagnik & Arijit Singh"],
    ],
    activities: [
      ["🌬️", "Slow Breathing", "Breathe gently in for 4 counts and out for 6. Stop if uncomfortable."],
      ["📝", "Brain Unload", "Write down one thing taking up space in your mind."],
      ["🧘", "Unclench", "Relax your shoulders, jaw and hands."],
    ],
  },
  Excited: {
    emoji: "🥳",
    title: "That energy? Let's GO!",
    description: "Turn the excitement into a moment worth remembering.",
    songs: [
      ["APT.", "ROSÉ & Bruno Mars"],
      ["Kala Chashma", "Amar Arshi, Badshah & Neha Kakkar"],
      ["Levitating", "Dua Lipa"],
    ],
    activities: [
      ["💃", "Dance Break", "Dance to your favourite track."],
      ["📸", "Photo Mission", "Take a creative photo of something ordinary."],
      ["🎤", "One-Line Karaoke", "Sing the next line of a song you know."],
    ],
  },
  Calm: {
    emoji: "😌",
    title: "Stay in your peaceful era.",
    description: "Soft sounds, easy activities and space to just be.",
    songs: [
      ["Ocean Eyes", "Billie Eilish"],
      ["Iktara", "Kavita Seth & Amit Trivedi"],
      ["A Sky Full of Stars", "Coldplay"],
    ],
    activities: [
      ["🌿", "Mindful Minute", "Notice 5 things you can see and 3 things you can hear."],
      ["☕", "Little Comfort", "Enjoy a favourite drink without multitasking."],
      ["📖", "Mini Escape", "Read a page, doodle or imagine your dream destination."],
    ],
  },
};

const challenges = [
  { question: "Name 5 movies in 15 seconds!", answer: "Think of your favourite Bollywood or Hollywood films." },
  { question: "Invent a brand-new pizza flavour!", answer: "What about mango, paneer and spicy honey?" },
  { question: "Name 5 countries in 10 seconds!", answer: "Try India, Japan, Brazil, France and Canada." },
  { question: "Do your funniest celebrity impression!", answer: "Pick a celebrity and copy their voice or signature expression." },
  { question: "Create a 5-second dance move!", answer: "Make it ridiculous. The sillier, the better." },
  { question: "Describe your best friend using only 3 emojis!", answer: "Choose emojis that capture their personality." },
  { question: "Say 3 words that rhyme with 'light'!", answer: "Try bright, night and flight." },
  { question: "Invent a name for your own imaginary country!", answer: "Bonus: invent its national anthem." },
  { question: "Name 5 things you'd take to a deserted island!", answer: "There are no wrong answers. Get creative." },
  { question: "Speak like a robot for 20 seconds!", answer: "Use a robotic voice and stiff movements." },
  { question: "Invent a new holiday and explain how to celebrate it!", answer: "The sillier the traditions, the better." },
  { question: "Name 3 songs with a colour in the title!", answer: "Examples include Yellow and Blue." },
];

const settingActivities = {
  Solo: [
    ["🎧", "Personal Soundtrack", "Put on your headphones and enjoy a song you love."],
    ["✨", "Main Character Moment", "Do one little thing that makes your day feel special."],
    ["🎨", "Creative Break", "Draw, write or create something for five minutes."],
  ],
  "With friends": [
    ["😂", "Laugh Challenge", "Everyone tries to make the group laugh in 30 seconds."],
    ["🎤", "Guess the Song", "Hum a song and let your friends guess the title."],
    ["📸", "Friendship Mission", "Take a funny group photo or invent a group pose."],
  ],
  Party: [
    ["💃", "Dance-Off", "Take turns showing your best dance move."],
    ["🎵", "DJ Challenge", "Each person picks a song for the next party track."],
    ["⚡", "Rapid Fire", "Ask everyone three funny questions in 15 seconds."],
  ],
  "On the go": [
    ["🎶", "Travel Soundtrack", "Choose a song that matches the scenery."],
    ["👀", "Spot It", "Find three interesting things around you."],
    ["📷", "Memory Snap", "Capture one moment from your journey."],
  ],
  Studying: [
    ["⏱️", "Focus Sprint", "Choose one small task and work on it for 10 minutes."],
    ["🧠", "Brain Break", "Step away from your screen and name five things you remember learning."],
    ["🌿", "Reset Moment", "Stretch gently before returning to your work."],
  ],
};

function getYouTubeSearch(song, artist) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${song} ${artist} official audio`
  )}`;
}

function ExperienceContent() {
  const searchParams = useSearchParams();
  const requestedMood = searchParams.get("mood") || "Bored";
  const mood = experiences[requestedMood] ? requestedMood : "Bored";
  const experience = experiences[mood];

  const [completed, setCompleted] = useState([]);
  const [gameNumber, setGameNumber] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  // Personalised VYBE settings
  const [desiredMood, setDesiredMood] = useState("Excited");
  const [setting, setSetting] = useState("Solo");
  const [planCreated, setPlanCreated] = useState(false);
  const [planNumber, setPlanNumber] = useState(0);

  function toggleActivity(index) {
    setCompleted((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  function nextChallenge() {
    setGameNumber((previous) => {
      const options = challenges
        .map((_, index) => index)
        .filter((index) => index !== previous);

      return options[Math.floor(Math.random() * options.length)];
    });

    setHintVisible(false);
  }

  function createPlan() {
    setPlanNumber((previous) => previous + 1);
    setPlanCreated(true);
  }

  const personalisedExperience = experiences[desiredMood];
  const personalisedActivities = settingActivities[setting];
  const recommendedSong =
    personalisedExperience.songs[
      planNumber % personalisedExperience.songs.length
    ];
  const recommendedActivity =
    personalisedActivities[planNumber % personalisedActivities.length];

  return (
    <main className="min-h-screen overflow-hidden bg-[#10091d] text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-14">
        <a href="/" className="text-2xl font-black">
          <span className="text-fuchsia-400">✳</span> VYBE
          <span className="text-cyan-300">AI</span>
        </a>
        <a href="/" className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10">
          ← Home
        </a>
      </nav>

      <section className="relative px-5 pb-12 pt-16 md:px-14 md:pt-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold tracking-widest text-fuchsia-200">
            YOUR PERSONAL VYBE ✦
          </div>

          <h1 className="mt-7 text-4xl font-black leading-tight sm:text-6xl">
            {experience.emoji} {experience.title}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-purple-100/70">
            {experience.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {Object.keys(experiences).map((item) => (
              <a
                key={item}
                href={`/experience?mood=${encodeURIComponent(item)}`}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  item === mood
                    ? "border-fuchsia-300 bg-fuchsia-500/20 text-white"
                    : "border-white/10 bg-white/5 text-purple-100/70 hover:border-cyan-300/50"
                }`}
              >
                {experiences[item].emoji} {item}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Personalised VYBE planner */}
      <section className="px-5 py-8 md:px-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 via-fuchsia-500/10 to-purple-500/10 p-6 sm:p-9">
          <p className="text-xs font-black tracking-[0.2em] text-cyan-300">
            ✨ YOUR VYBE, YOUR WAY
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            How do you WANT to feel?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-purple-100/60">
            Your current mood is just the starting point. Choose the vibe
            you want and what you're doing, and we'll create a little plan.
          </p>

          <div className="mt-7">
            <p className="mb-3 text-sm font-bold">1. Choose your desired mood</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(experiences).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setDesiredMood(item);
                    setPlanCreated(false);
                  }}
                  className={`rounded-full border px-4 py-3 text-sm font-bold transition ${
                    desiredMood === item
                      ? "border-fuchsia-300 bg-fuchsia-500/20"
                      : "border-white/10 bg-white/5 hover:border-fuchsia-300/50"
                  }`}
                >
                  {experiences[item].emoji} {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-sm font-bold">2. Where's your VYBE happening?</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(settingActivities).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSetting(item);
                    setPlanCreated(false);
                  }}
                  className={`rounded-2xl border p-4 text-left font-bold transition ${
                    setting === item
                      ? "border-cyan-300 bg-cyan-400/10"
                      : "border-white/10 bg-white/5 hover:border-cyan-300/50"
                  }`}
                >
                  {item === "Solo" && "🎧 "}
                  {item === "With friends" && "🫂 "}
                  {item === "Party" && "🎉 "}
                  {item === "On the go" && "🚗 "}
                  {item === "Studying" && "📚 "}
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={createPlan}
            className="mt-7 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-4 font-black text-white transition hover:scale-[1.01] sm:w-auto"
          >
            Create my VYBE ✨
          </button>

          {planCreated && (
            <div className="mt-7 rounded-2xl border border-white/10 bg-[#10091d]/70 p-5 sm:p-7">
              <p className="text-xs font-black tracking-widest text-fuchsia-300">
                YOUR PERSONAL PLAN
              </p>
              <h3 className="mt-3 text-2xl font-black">
                {personalisedExperience.emoji} A little more {desiredMood.toLowerCase()}
              </h3>
              <p className="mt-2 text-sm leading-6 text-purple-100/70">
                Made for you when you're {setting.toLowerCase()}.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-bold text-cyan-300">🎵 Your song</p>
                  <p className="mt-2 font-black">{recommendedSong[0]}</p>
                  <p className="mt-1 text-sm text-purple-100/60">{recommendedSong[1]}</p>
                  <a
                    href={getYouTubeSearch(recommendedSong[0], recommendedSong[1])}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-bold text-cyan-300 hover:underline"
                  >
                    Listen on YouTube ↗
                  </a>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-bold text-fuchsia-300">✨ Your activity</p>
                  <p className="mt-2 font-black">{recommendedActivity[0]} {recommendedActivity[1]}</p>
                  <p className="mt-2 text-sm leading-6 text-purple-100/70">
                    {recommendedActivity[2]}
                  </p>
                </div>
              </div>

              <button
                onClick={createPlan}
                className="mt-5 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                Give me another plan ↻
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Existing music and activities */}
      <section className="px-5 py-8 md:px-14">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-xs font-black tracking-[0.2em] text-cyan-300">
              🎵 YOUR SOUNDTRACK
            </p>
            <h2 className="mt-3 text-2xl font-black">Songs for your vibe</h2>
            <p className="mt-2 text-sm text-purple-100/60">
              Open YouTube to listen. No music API required.
            </p>

            <div className="mt-6 space-y-3">
              {experience.songs.map(([song, artist]) => (
                <a
                  key={song}
                  href={getYouTubeSearch(song, artist)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1b122b] p-4 transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-700 text-lg">
                    ▶
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{song}</span>
                    <span className="mt-1 block text-sm text-purple-100/50">{artist}</span>
                  </span>
                  <span className="text-cyan-300">↗</span>
                </a>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-xs font-black tracking-[0.2em] text-fuchsia-300">
              ✨ YOUR NEXT MOVE
            </p>
            <h2 className="mt-3 text-2xl font-black">Tiny activities, big vibes</h2>
            <p className="mt-2 text-sm text-purple-100/60">
              Choose one. Mark it complete when you're done.
            </p>

            <div className="mt-6 space-y-3">
              {experience.activities.map(([emoji, title, description], index) => {
                const isDone = completed.includes(index);

                return (
                  <button
                    key={title}
                    onClick={() => toggleActivity(index)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      isDone
                        ? "border-emerald-400/40 bg-emerald-400/10"
                        : "border-white/10 bg-[#1b122b] hover:border-fuchsia-300/40"
                    }`}
                  >
                    <span className="text-2xl">{emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold">{title}</span>
                      <span className="mt-1 block text-sm leading-6 text-purple-100/60">
                        {description}
                      </span>
                      {isDone && (
                        <span className="mt-2 block text-xs font-bold text-emerald-300">
                          ✓ COMPLETED
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* Existing random challenge game */}
      <section className="px-5 py-12 md:px-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/15 via-purple-500/10 to-cyan-400/10 p-6 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-cyan-300">
                🎮 QUICK PLAY
              </p>
              <h2 className="mt-3 text-2xl font-black">The VYBE challenge</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-purple-100/60">
                A quick brain break. No download, no sign-up, just play.
              </p>
            </div>

            <button
              onClick={() => setShowGame((previous) => !previous)}
              className="shrink-0 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-4 font-black transition hover:scale-[1.02]"
            >
              {showGame ? "Hide challenge ↑" : "Give me a challenge ⚡"}
            </button>
          </div>

          {showGame && (
            <div className="mt-7 rounded-2xl border border-white/10 bg-[#10091d]/70 p-6">
              <p className="text-xs font-bold tracking-widest text-fuchsia-300">
                RANDOM CHALLENGE ✦
              </p>
              <h3 className="mt-3 text-xl font-bold">
                {challenges[gameNumber].question}
              </h3>

              {hintVisible && (
                <p className="mt-4 rounded-xl bg-white/5 p-4 text-sm leading-6 text-purple-100/70">
                  💡 {challenges[gameNumber].answer}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setHintVisible((previous) => !previous)}
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
                >
                  {hintVisible ? "Hide hint" : "Reveal a hint"}
                </button>

                <button
                  onClick={nextChallenge}
                  className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 py-3 text-sm font-black transition hover:scale-[1.02]"
                >
                  Next random challenge ↗
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-20 pt-8 text-center">
        <p className="text-3xl">✳</p>
        <h2 className="mt-4 text-3xl font-black sm:text-4xl">
          How's your VYBE now?
        </h2>
        <p className="mt-3 text-sm text-purple-100/60">
          Pick another mood or head back home whenever you like.
        </p>
        <a
          href="/"
          className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-black text-[#10091d] transition hover:bg-cyan-200"
        >
          Back to VYBE AI ↑
        </a>
      </section>

      <footer className="border-t border-white/10 px-5 py-7 text-center text-xs text-purple-100/40">
        VYBE AI · Made for the way you feel. Not a substitute for professional mental health support.
      </footer>
    </main>
  );
}

export default function ExperiencePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#10091d] text-white">
          <p className="text-lg font-bold">Getting your VYBE ready... ✨</p>
        </main>
      }
    >
      <ExperienceContent />
    </Suspense>
  );
}