
"use client";

import { useState } from "react";

const games = {
  "Get to Know You": [
    { q: "What is your perfect way to spend a free day?", a: "Everyone shares their own answer." },
    { q: "Which three words describe your personality?", a: "There are no wrong answers." },
    { q: "What is one skill you would love to learn?", a: "Explain why you chose it." },
    { q: "What is your dream travel destination?", a: "Tell the group what you would do there." },
    { q: "Which fictional world would you love to visit?", a: "Explain your choice." },
    { q: "What small thing instantly improves your day?", a: "Share something that genuinely makes you happy." },
    { q: "What is a hobby you want to try?", a: "Tell everyone what interests you about it." },
    { q: "What is your favourite memory with this group?", a: "Share a memory everyone can enjoy." },
    { q: "If you could master one talent overnight, what would it be?", a: "Anything goes!" },
    { q: "What would your ideal weekend look like?", a: "Describe your dream weekend." },
  ],
  "Funny Questions": [
    { q: "If your life had a ridiculous theme song, what would it be?", a: "Choose a song and explain why." },
    { q: "Which friend would survive longest on a deserted island?", a: "Give a funny but friendly reason." },
    { q: "If you became invisible for an hour, what harmless thing would you do?", a: "Keep it fun and respectful." },
    { q: "What would your personal warning label say?", a: "Make it funny!" },
    { q: "If our group started a band, what would it be called?", a: "Bonus: choose everyone's stage name." },
    { q: "What silly world record could you realistically break?", a: "Invent your own record if you like." },
    { q: "If you had to wear one costume for a week, what would it be?", a: "Explain your fashion choice." },
    { q: "Which everyday object best represents your personality?", a: "Explain the comparison." },
    { q: "If you were a food, what food would you be?", a: "Give the group your best explanation." },
    { q: "What would be the funniest name for a group chat?", a: "Let everyone vote!" },
  ],
  "Friendship Deep Dive": [
    { q: "What quality do you appreciate most in a friend?", a: "Share what makes that quality important." },
    { q: "What is one small gesture that makes you feel appreciated?", a: "Give an example if you want." },
    { q: "What makes a conversation memorable for you?", a: "Everyone can have a different answer." },
    { q: "What is something you admire about your friends?", a: "Share only what feels comfortable." },
    { q: "What does being a good listener mean to you?", a: "Describe what helpful listening looks like." },
    { q: "What is one fun activity you would like this group to try?", a: "Plan a possible group adventure." },
    { q: "What helps you feel included in a group?", a: "Share your thoughts openly." },
    { q: "What is a lesson friendship has taught you?", a: "Keep it as light or meaningful as you like." },
    { q: "What is one thing that makes your friendships unique?", a: "Celebrate what makes your group special." },
    { q: "What is your favourite way to cheer up a friend?", a: "Share a kind or funny idea." },
  ],
  "Would You Rather": [
    { q: "Would you rather go on a spontaneous trip or plan every detail?", a: "Explain your choice." },
    { q: "Would you rather have a movie night or a game night with friends?", a: "Make your case!" },
    { q: "Would you rather be able to read minds or speak every language?", a: "Which would you choose?" },
    { q: "Would you rather live by the beach or in the mountains?", a: "Describe your ideal life." },
    { q: "Would you rather have unlimited concert tickets or unlimited travel tickets?", a: "Pick your adventure." },
    { q: "Would you rather always be 10 minutes early or 10 minutes late?", a: "Defend your answer!" },
    { q: "Would you rather have a shared playlist or a shared photo album with friends?", a: "Tell us why." },
    { q: "Would you rather explore space or the deepest ocean?", a: "Choose your expedition." },
    { q: "Would you rather cook a meal together or order a feast together?", a: "What is on the menu?" },
    { q: "Would you rather have a weekly adventure or a monthly big trip?", a: "Describe your ideal plan." },
  ],
  "Friendship Quiz": [
    { q: "What is the best way to find out a friend's favourite snack?", options: ["Guess without asking", "Ask them", "Choose for them"], a: "Ask them", type: "quiz" },
    { q: "Your friend seems quiet today. What is a thoughtful first step?", options: ["Listen and check in", "Make fun of them", "Ignore them completely"], a: "Listen and check in", type: "quiz" },
    { q: "What helps a group game stay fun for everyone?", options: ["Only one person wins every time", "Everyone gets a chance", "Nobody follows the rules"], a: "Everyone gets a chance", type: "quiz" },
    { q: "Your friend shares good news. What is a kind response?", options: ["Change the subject", "Celebrate with them", "Tell them it doesn't matter"], a: "Celebrate with them", type: "quiz" },
    { q: "What is a good way to handle a disagreement between friends?", options: ["Talk respectfully", "Spread rumours", "Never listen"], a: "Talk respectfully", type: "quiz" },
    { q: "What makes a group plan easier?", options: ["One person decides everything", "Nobody communicates", "Everyone shares preferences"], a: "Everyone shares preferences", type: "quiz" },
    { q: "Which is a good conversation starter?", options: ["What's something you're excited about?", "Why are you so boring?", "You never have anything to say"], a: "What's something you're excited about?", type: "quiz" },
    { q: "What should you do if a friend says they don't want to answer a question?", options: ["Keep pressuring them", "Respect their choice", "Make them feel guilty"], a: "Respect their choice", type: "quiz" },
  ],
};

const categories = Object.keys(games);

export default function FriendZonePage() {
  const [category, setCategory] = useState("Get to Know You");
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [newPlayer, setNewPlayer] = useState("");
  const [scores, setScores] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [challenge, setChallenge] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [played, setPlayed] = useState(0);
  const [used, setUsed] = useState([]);

  function chooseCategory(nextCategory) {
    setCategory(nextCategory);
    setChallenge(null);
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswered(false);
  }

  function nextQuestion() {
    const options = games[category];
    const available = options.filter((item) => !used.includes(item.q));
    const pool = available.length ? available : options;
    const next = pool[Math.floor(Math.random() * pool.length)];

    setChallenge(next);
    setUsed((old) => available.length ? [...old, next.q] : [next.q]);
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswered(false);
    setPlayed((count) => count + 1);
  }

  function addPlayer() {
    const name = newPlayer.trim();
    if (!name || players.length >= 12) return;
    setPlayers((old) => [...old, name]);
    setNewPlayer("");
  }

  function awardPoint() {
    const player = players[currentPlayer];
    setScores((old) => ({ ...old, [player]: (old[player] || 0) + 1 }));
    nextPlayer();
  }

  function nextPlayer() {
    setCurrentPlayer((index) => (index + 1) % players.length);
    setChallenge(null);
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswered(false);
  }

  function removePlayer(index) {
    if (players.length <= 2) return;
    const removed = players[index];
    const remaining = players.filter((_, i) => i !== index);
    setPlayers(remaining);
    setScores((old) => {
      const next = { ...old };
      delete next[removed];
      return next;
    });
    setCurrentPlayer(0);
    setChallenge(null);
    setAnswered(false);
    setShowAnswer(false);
  }

  function resetGame() {
    setScores({});
    setCurrentPlayer(0);
    setChallenge(null);
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswered(false);
    setPlayed(0);
    setUsed([]);
  }

  function checkQuizAnswer(option) {
    if (answered) return;
    setSelectedAnswer(option);
    setAnswered(true);
    if (option === challenge.a) {
      const player = players[currentPlayer];
      setScores((old) => ({ ...old, [player]: (old[player] || 0) + 1 }));
    }
  }

  return (
    <main className="min-h-screen bg-[#160d20] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE AI
        </a>

        <header className="py-10 text-center sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-pink-400/30 bg-pink-400/10 px-4 py-2 text-sm text-pink-200">
            💖 GOOD FRIENDS, GREAT VIBES
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            FRIEND <span className="bg-gradient-to-r from-pink-400 to-cyan-300 bg-clip-text text-transparent">ZONE</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
            Get closer, laugh harder, and discover something new about your favourite people.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <p className="text-xs text-white/45">QUESTIONS PLAYED</p>
              <p className="mt-1 text-2xl font-black text-pink-200">{played}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <p className="text-xs text-white/45">PLAYERS</p>
              <p className="mt-1 text-2xl font-black text-cyan-200">{players.length}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <h2 className="text-2xl font-bold">Pick your game</h2>
            <p className="mt-2 text-sm text-white/50">Choose a category to change the questions.</p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((item, index) => (
                <button
                  key={item}
                  onClick={() => chooseCategory(item)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    category === item
                      ? "border-pink-400/50 bg-pink-400/10"
                      : "border-white/10 bg-black/10 hover:border-white/25"
                  }`}
                >
                  <span className="text-2xl">
                    {["💬", "😂", "💗", "🤔", "🧠"][index]}
                  </span>
                  <p className="mt-3 text-sm font-bold">{item}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-pink-300/15 bg-gradient-to-br from-pink-500/10 to-violet-500/10 p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
                {category}
              </p>

              {challenge ? (
                <>
                  <h3 className="mt-5 text-2xl font-bold leading-snug sm:text-3xl">
                    {challenge.q}
                  </h3>

                  {challenge.type === "quiz" && (
                    <div className="mt-5 grid gap-3">
                      {challenge.options.map((option) => {
                        const correct = answered && option === challenge.a;
                        const wrong = answered && option === selectedAnswer && option !== challenge.a;
                        return (
                          <button
                            key={option}
                            onClick={() => checkQuizAnswer(option)}
                            disabled={answered}
                            className={`rounded-xl border p-4 text-left font-semibold transition ${
                              correct ? "border-emerald-400 bg-emerald-400/10 text-emerald-200" :
                              wrong ? "border-rose-400 bg-rose-400/10 text-rose-200" :
                              "border-white/10 bg-black/10 hover:border-pink-300/40"
                            }`}
                          >
                            {option}{correct ? " ✓" : ""}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {answered && challenge.type === "quiz" && (
                    <p className={`mt-4 font-semibold ${selectedAnswer === challenge.a ? "text-emerald-300" : "text-rose-300"}`}>
                      {selectedAnswer === challenge.a ? "Correct! One point earned! 🎉" : `The correct answer is: ${challenge.a}`}
                    </p>
                  )}

                  {challenge.type !== "quiz" && (
                    <>
                      <button
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
                      >
                        {showAnswer ? "Hide prompt" : "💡 Reveal conversation prompt"}
                      </button>
                      {showAnswer && (
                        <div className="mt-4 rounded-2xl bg-black/20 p-4 text-sm leading-6 text-white/75">
                          {challenge.a}
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="text-5xl">💞</div>
                  <h3 className="mt-4 text-xl font-bold">Ready to connect?</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Generate a question, take turns answering, and earn points for quiz answers or group-approved challenges.
                  </p>
                </div>
              )}

              <button
                onClick={nextQuestion}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-4 font-bold transition hover:brightness-110"
              >
                {challenge ? "🎲 Next question" : "✨ Start playing"}
              </button>

              {challenge && challenge.type !== "quiz" && (
                <button
                  onClick={awardPoint}
                  className="mt-3 w-full rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-5 py-3 font-bold text-cyan-100 hover:bg-cyan-300/20"
                >
                  🏆 Award point & next player
                </button>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">CURRENT PLAYER</p>
              <h2 className="mt-2 text-2xl font-black">{players[currentPlayer]}</h2>
              <p className="mt-2 text-sm text-white/50">
                Take your turn, share an answer, and keep the good vibes going.
              </p>

              <div className="mt-5 space-y-2">
                {players.map((player, index) => (
                  <div
                    key={`${player}-${index}`}
                    className={`flex items-center gap-3 rounded-xl border p-3 ${
                      index === currentPlayer
                        ? "border-pink-400/40 bg-pink-400/10"
                        : "border-white/5 bg-black/10"
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{player}</span>
                    <span className="text-sm font-black text-cyan-200">{scores[player] || 0}</span>
                    {players.length > 2 && (
                      <button
                        onClick={() => removePlayer(index)}
                        aria-label={`Remove ${player}`}
                        className="text-white/40 hover:text-rose-300"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={newPlayer}
                  onChange={(event) => setNewPlayer(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addPlayer();
                  }}
                  maxLength={24}
                  placeholder="Friend's name"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm outline-none focus:border-pink-400"
                />
                <button
                  onClick={addPlayer}
                  disabled={!newPlayer.trim() || players.length >= 12}
                  className="rounded-xl bg-white/10 px-4 font-bold hover:bg-white/20 disabled:opacity-40"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-xs text-white/35">2–12 players · Add a name to join.</p>

              <button
                onClick={nextPlayer}
                className="mt-4 w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/5"
              >
                Skip turn →
              </button>
            </section>

            <section className="rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 to-pink-400/10 p-5">
              <div className="text-3xl">🌟</div>
              <h3 className="mt-3 text-xl font-bold">Friendship rule</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Everyone gets to pass on any question. Keep answers kind, respect privacy, and make sure the game stays fun for everyone.
              </p>
              <button
                onClick={resetGame}
                className="mt-5 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10"
              >
                ↻ Reset game & scores
              </button>
            </section>
          </aside>
        </div>

        <footer className="py-10 text-center text-sm text-white/30">
          Good friends. Great questions. Better VYBES. 💖
        </footer>
      </div>
    </main>
  );
}