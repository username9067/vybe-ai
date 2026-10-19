
"use client";

import { useState, useEffect } from "react";

const games = {
  "Random Challenges": [
    { q: "Invent a new holiday and explain how everyone celebrates it.", a: "Be creative! There is no wrong answer.", type: "creative" },
    { q: "Describe your dream holiday using only five words.", a: "Try to make every word count!", type: "creative" },
    { q: "Create a superhero whose power is completely useless.", a: "Give your superhero a name and a funny power.", type: "creative" },
    { q: "Tell a mini-story that includes a pizza, a dinosaur, and a spaceship.", a: "Your story must include all three!", type: "creative" },
    { q: "Name five things you would take to a deserted island.", a: "You have 10 seconds!", type: "quick" },
    { q: "Invent a new flavour of ice cream.", a: "Give it a name and describe the taste.", type: "creative" },
    { q: "Come up with the funniest name for a pet dragon.", a: "The sillier, the better!", type: "creative" },
    { q: "Describe your day as if it were a movie trailer.", a: "Make it dramatic!", type: "creative" },
    { q: "Name three things that can make you smile instantly.", a: "Any three genuine answers work.", type: "quick" },
    { q: "Design a restaurant where every dish is a surprise.", a: "Describe its name and signature dish.", type: "creative" },
    { q: "If animals could talk, which would be the rudest?", a: "Explain your choice!", type: "creative" },
    { q: "Invent a sport that has never existed before.", a: "Explain the rules in a few sentences.", type: "creative" },
  ],
  "Riddle Room": [
    { q: "What has keys but cannot open locks?", a: "A piano.", type: "riddle" },
    { q: "What gets wetter the more it dries?", a: "A towel.", type: "riddle" },
    { q: "What has a face and two hands but no arms or legs?", a: "A clock.", type: "riddle" },
    { q: "What has a neck but no head?", a: "A bottle.", type: "riddle" },
    { q: "What goes up but never comes down?", a: "Your age.", type: "riddle" },
    { q: "What has many teeth but cannot bite?", a: "A comb.", type: "riddle" },
    { q: "What can travel around the world while staying in one corner?", a: "A postage stamp.", type: "riddle" },
    { q: "What has one eye but cannot see?", a: "A needle.", type: "riddle" },
    { q: "What has cities but no houses, forests but no trees, and rivers but no water?", a: "A map.", type: "riddle" },
    { q: "What breaks the moment you say its name?", a: "Silence.", type: "riddle" },
    { q: "The more you take, the more you leave behind. What are they?", a: "Footsteps.", type: "riddle" },
    { q: "What has hands but cannot clap?", a: "A clock.", type: "riddle" },
  ],
  "Quick Quiz": [
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], a: "Mars", type: "quiz" },
    { q: "How many sides does a hexagon have?", options: ["Five", "Six", "Seven", "Eight"], a: "Six", type: "quiz" },
    { q: "Which animal is the largest mammal on Earth?", options: ["Elephant", "Giraffe", "Blue whale", "Shark"], a: "Blue whale", type: "quiz" },
    { q: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Bangkok", "Tokyo"], a: "Tokyo", type: "quiz" },
    { q: "How many minutes are there in two hours?", options: ["100", "110", "120", "140"], a: "120", type: "quiz" },
    { q: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon dioxide", "Helium", "Hydrogen"], a: "Carbon dioxide", type: "quiz" },
    { q: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], a: "Pacific", type: "quiz" },
    { q: "How many colours are traditionally named in a rainbow?", options: ["Five", "Six", "Seven", "Eight"], a: "Seven", type: "quiz" },
    { q: "Which instrument has black and white keys?", options: ["Flute", "Piano", "Drum", "Violin"], a: "Piano", type: "quiz" },
    { q: "What is 12 × 8?", options: ["86", "92", "96", "108"], a: "96", type: "quiz" },
    { q: "Which is the fastest land animal?", options: ["Lion", "Horse", "Cheetah", "Leopard"], a: "Cheetah", type: "quiz" },
    { q: "Which shape has three sides?", options: ["Square", "Triangle", "Pentagon", "Circle"], a: "Triangle", type: "quiz" },
  ],
  "Would You Rather": [
    { q: "Would you rather be able to fly or become invisible?", a: "Choose one and explain why!", type: "choice" },
    { q: "Would you rather explore space or the deep ocean?", a: "There is no wrong answer!", type: "choice" },
    { q: "Would you rather have unlimited pizza or unlimited ice cream?", a: "Pick your favourite!", type: "choice" },
    { q: "Would you rather talk to animals or speak every language?", a: "Which power would you use more?", type: "choice" },
    { q: "Would you rather live in a treehouse or on a houseboat?", a: "Describe your dream home!", type: "choice" },
    { q: "Would you rather travel 100 years into the past or 100 years into the future?", a: "What would you hope to discover?", type: "choice" },
    { q: "Would you rather always sing instead of speaking or always dance when walking?", a: "Choose your new everyday life!", type: "choice" },
    { q: "Would you rather have a pet dragon or a friendly dinosaur?", a: "What would you name your pet?", type: "choice" },
    { q: "Would you rather be famous for your art or for inventing something amazing?", a: "Tell us why!", type: "choice" },
    { q: "Would you rather never have homework again or have a four-day school week?", a: "Make your case!", type: "choice" },
    { q: "Would you rather visit every country or every planet we can reach?", a: "Where would you start?", type: "choice" },
    { q: "Would you rather control the weather or talk to your future self?", a: "How would you use your power?", type: "choice" },
  ],
  "Creative Mode": [
    { q: "Create a story title using these three words: moon, chocolate, and mystery.", a: "Bonus: tell the story in three sentences.", type: "creative" },
    { q: "Imagine you are designing a brand-new amusement park. What is its main attraction?", a: "Give the park a name too!", type: "creative" },
    { q: "Invent a gadget that solves one everyday problem.", a: "Explain how it works.", type: "creative" },
    { q: "Create a new emoji and explain what it means.", a: "Describe what it looks like.", type: "creative" },
    { q: "Imagine you can open a shop that sells impossible things. What do you sell?", a: "Name three products.", type: "creative" },
    { q: "Make up a fictional planet with three unusual rules.", a: "Describe what life is like there.", type: "creative" },
    { q: "Invent a new board game using only paper and a pencil.", a: "Explain how to win.", type: "creative" },
    { q: "If your shoes could talk, what stories would they tell?", a: "Make it funny or dramatic.", type: "creative" },
    { q: "Design your own dream café. What makes it special?", a: "Give it a name and a signature drink.", type: "creative" },
    { q: "Write a slogan for a company that sells clouds in jars.", a: "Make it catchy!", type: "creative" },
  ],
  "Beat the Timer": [
    { q: "Name 5 fruits before the timer runs out!", a: "Say five different fruits.", type: "timed" },
    { q: "Name 5 countries in 15 seconds!", a: "Any five real countries.", type: "timed" },
    { q: "Name 5 animals that live in water!", a: "Any five water-dwelling animals.", type: "timed" },
    { q: "Name 5 movie genres in 15 seconds!", a: "For example: comedy, drama, action.", type: "timed" },
    { q: "Name 5 things you can find in a kitchen!", a: "Any five kitchen items.", type: "timed" },
    { q: "Name 5 sports in 15 seconds!", a: "Any five sports.", type: "timed" },
    { q: "Name 5 things that are round!", a: "Any five round objects.", type: "timed" },
    { q: "Name 5 musical instruments before time runs out!", a: "Any five instruments.", type: "timed" },
    { q: "Name 5 things you might pack for a holiday!", a: "Any five sensible items.", type: "timed" },
    { q: "Name 5 things that make a sound!", a: "Any five sound-producing things.", type: "timed" },
  ],
};

const categories = Object.keys(games);

const categoryInfo = {
  "Random Challenges": { icon: "🎲", color: "from-fuchsia-500 to-violet-500", desc: "Surprise yourself with something fun." },
  "Riddle Room": { icon: "🧩", color: "from-cyan-400 to-blue-500", desc: "Test your brain with clever riddles." },
  "Quick Quiz": { icon: "⚡", color: "from-amber-400 to-orange-500", desc: "Answer questions and earn points." },
  "Would You Rather": { icon: "🤔", color: "from-pink-500 to-rose-500", desc: "Make impossible choices." },
  "Creative Mode": { icon: "🎨", color: "from-violet-500 to-indigo-500", desc: "Let your imagination run wild." },
  "Beat the Timer": { icon: "⏱️", color: "from-emerald-400 to-teal-500", desc: "Can you beat the clock?" },
};

export default function BoredomBusterPage() {
  const [category, setCategory] = useState("Random Challenges");
  const [challenge, setChallenge] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timeLeft <= 0) setTimerActive(false);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((time) => time - 1), 1000);
    return () => clearTimeout(timer);
  }, [timerActive, timeLeft]);

  function pickCategory(nextCategory) {
    setCategory(nextCategory);
    setChallenge(null);
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswered(false);
    setTimerActive(false);
    setTimeLeft(15);
  }

  function nextChallenge() {
    const options = games[category];
    const available = options.filter((item) => !usedQuestions.includes(item.q));
    const pool = available.length ? available : options;
    const next = pool[Math.floor(Math.random() * pool.length)];

    setChallenge(next);
    setUsedQuestions((old) => old.includes(next.q) && available.length === 0 ? [next.q] : [...old, next.q]);
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswered(false);
    setPlayed((count) => count + 1);
    setTimeLeft(15);
    setTimerActive(next.type === "timed");
  }

  function checkAnswer(option) {
    if (answered) return;
    setSelectedAnswer(option);
    setAnswered(true);
    if (option === challenge.a) setScore((points) => points + 1);
    setTimerActive(false);
  }

  function startTimer() {
    setTimeLeft(15);
    setTimerActive(true);
  }

  return (
    <main className="min-h-screen bg-[#160d20] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="text-sm text-fuchsia-300 transition hover:text-cyan-300">
          ← Back to VYBE AI
        </a>

        <header className="py-10 text-center sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
            ✨ YOUR CURE FOR BOREDOM
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            BOREDOM <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">BUSTER</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            No scrolling. No boredom. Just games, surprises, brain teasers, and a little friendly competition.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <span className="text-xs text-white/45">YOUR SCORE</span>
              <p className="mt-1 text-2xl font-black text-cyan-200">{score}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <span className="text-xs text-white/45">CHALLENGES PLAYED</span>
              <p className="mt-1 text-2xl font-black text-fuchsia-200">{played}</p>
            </div>
          </div>
        </header>

        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Choose your vibe</h2>
            <p className="mt-1 text-sm text-white/50">Pick a game and let the fun begin.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((item) => {
              const info = categoryInfo[item];
              return (
                <button
                  key={item}
                  onClick={() => pickCategory(item)}
                  className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 ${
                    category === item
                      ? "border-fuchsia-400/60 bg-fuchsia-400/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  <span className="text-3xl">{info.icon}</span>
                  <h3 className="mt-3 text-sm font-bold leading-snug">{item}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/45">{info.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                  {categoryInfo[category].icon} {category}
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Ready for your next challenge?
                </h2>
              </div>
              {challenge && (
                <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-white/60">
                  Challenge #{played}
                </span>
              )}
            </div>

            <div className="mt-6 min-h-[240px] rounded-3xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/5 to-cyan-400/10 p-5 sm:p-8">
              {challenge ? (
                <>
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/60">
                    {challenge.type === "riddle" ? "🧠 BRAIN TEASER" :
                      challenge.type === "quiz" ? "⚡ QUICK QUIZ" :
                      challenge.type === "timed" ? "⏱️ BEAT THE TIMER" :
                      challenge.type === "choice" ? "🤔 MAKE YOUR CHOICE" : "✨ YOUR CHALLENGE"}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold leading-snug sm:text-3xl">
                    {challenge.q}
                  </h3>

                  {challenge.type === "quiz" && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {challenge.options.map((option) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = answered && option === challenge.a;
                        const isWrong = answered && isSelected && option !== challenge.a;
                        return (
                          <button
                            key={option}
                            onClick={() => checkAnswer(option)}
                            disabled={answered}
                            className={`rounded-xl border p-4 text-left font-semibold transition ${
                              isCorrect ? "border-emerald-400 bg-emerald-400/15 text-emerald-200" :
                              isWrong ? "border-rose-400 bg-rose-400/15 text-rose-200" :
                              "border-white/10 bg-black/10 hover:border-fuchsia-300/50 disabled:cursor-default"
                            }`}
                          >
                            {option}
                            {isCorrect && " ✓"}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {answered && challenge.type === "quiz" && (
                    <p className={`mt-4 font-semibold ${selectedAnswer === challenge.a ? "text-emerald-300" : "text-rose-300"}`}>
                      {selectedAnswer === challenge.a ? "Correct! +1 point 🎉" : `Not quite! The answer is ${challenge.a}.`}
                    </p>
                  )}

                  {category === "Beat the Timer" && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">TIME LEFT</span>
                        <span className={`text-2xl font-black ${timeLeft <= 5 ? "text-rose-300" : "text-cyan-200"}`}>
                          {timeLeft}s
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${timeLeft <= 5 ? "bg-rose-400" : "bg-cyan-300"}`}
                          style={{ width: `${(timeLeft / 15) * 100}%` }}
                        />
                      </div>
                      {!timerActive && timeLeft > 0 && (
                        <button onClick={startTimer} className="mt-4 rounded-xl bg-cyan-300/15 px-4 py-2 font-bold text-cyan-200 hover:bg-cyan-300/25">
                          ▶ Start timer
                        </button>
                      )}
                      {timeLeft === 0 && (
                        <p className="mt-4 font-bold text-rose-300">⏰ Time's up! Try another challenge.</p>
                      )}
                    </div>
                  )}

                  {challenge.type !== "quiz" && (
                    <>
                      <button
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                      >
                        {showAnswer ? "Hide hint / answer" : "💡 Reveal hint / answer"}
                      </button>
                      {showAnswer && (
                        <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4 text-white/80">
                          <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">Hint / answer</p>
                          <p className="mt-2 leading-6">{challenge.a}</p>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                  <span className="text-5xl">{categoryInfo[category].icon}</span>
                  <h3 className="mt-4 text-xl font-bold">Your next adventure awaits!</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
                    Generate a challenge, think fast, get creative, and see how many points you can collect.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={nextChallenge}
                className={`flex-1 rounded-2xl bg-gradient-to-r ${categoryInfo[category].color} px-5 py-4 font-bold shadow-lg transition hover:brightness-110`}
              >
                {challenge ? "🎲 Next challenge" : "✨ Generate my challenge"}
              </button>
              <button
                onClick={() => {
                  setChallenge(null);
                  setShowAnswer(false);
                  setSelectedAnswer("");
                  setAnswered(false);
                  setTimerActive(false);
                  setTimeLeft(15);
                }}
                className="rounded-2xl border border-white/10 px-5 py-4 font-semibold text-white/65 transition hover:bg-white/5"
              >
                Skip / clear
              </button>
            </div>
          </div>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-3xl">🏆</div>
              <h3 className="mt-3 text-xl font-black">Your progress</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Play quizzes to earn points and keep challenging yourself.
              </p>
              <div className="mt-5 rounded-2xl bg-black/15 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Points earned</span>
                  <span className="text-xl font-black text-cyan-200">{score}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-white/60">Played</span>
                  <span className="font-bold">{played}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-white/60">Quiz accuracy</span>
                  <span className="font-bold">
                    {played > 0 ? `${Math.round((score / played) * 100)}%` : "—"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setScore(0);
                  setPlayed(0);
                  setUsedQuestions([]);
                  setChallenge(null);
                  setShowAnswer(false);
                  setSelectedAnswer("");
                  setAnswered(false);
                  setTimerActive(false);
                  setTimeLeft(15);
                }}
                className="mt-4 w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/60 hover:bg-white/5"
              >
                ↻ Reset progress
              </button>
            </section>

            <section className="rounded-3xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 p-5">
              <div className="text-3xl">💡</div>
              <h3 className="mt-3 text-lg font-bold">VYBE tip</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Switch between categories whenever you want. Try a riddle, then a quiz, then something creative!
              </p>
            </section>
          </aside>
        </section>

        <footer className="py-10 text-center text-sm text-white/30">
          A little fun goes a long way. Made with ✨ by VYBE AI
        </footer>
      </div>
    </main>
  );
}