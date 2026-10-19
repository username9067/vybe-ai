
"use client";

import { useState } from "react";

const games = {
  "Funny Challenges": [
    { question: "Speak like a robot for 20 seconds!", points: 10 },
    { question: "Do your funniest celebrity impression!", points: 10 },
    { question: "Dance without music for 15 seconds!", points: 15 },
    { question: "Sell an ordinary pen like it's a luxury product!", points: 15 },
    { question: "Tell a story using only five words!", points: 10 },
    { question: "Make your best cartoon character impression!", points: 10 },
    { question: "Pretend you're a news reporter covering a snack emergency!", points: 15 },
    { question: "Invent a new dance move and name it!", points: 15 },
  ],
  "Rapid Fire": [
    { question: "Name 5 Bollywood movies in 10 seconds!", points: 10 },
    { question: "Name 5 things you'd pack for a deserted island!", points: 10 },
    { question: "Name 3 songs with a colour in the title!", points: 10 },
    { question: "Name 5 ice cream flavours in 8 seconds!", points: 10 },
    { question: "Name 5 countries starting with different letters!", points: 15 },
    { question: "Name 5 things you should never bring to a wedding!", points: 15 },
    { question: "Name 4 superheroes in 7 seconds!", points: 10 },
    { question: "Name 5 things that make you laugh!", points: 10 },
  ],
  "Would You Rather": [
    { question: "Would you rather sing everything you say or dance everywhere you go?", points: 10 },
    { question: "Would you rather travel to the past or the future?", points: 10 },
    { question: "Would you rather give up pizza or chocolate for a year?", points: 10 },
    { question: "Would you rather be famous for comedy or music?", points: 10 },
    { question: "Would you rather have a rewind button or a pause button for life?", points: 15 },
    { question: "Would you rather live by the beach or in the mountains?", points: 10 },
    { question: "Would you rather always arrive 10 minutes early or 10 minutes late?", points: 10 },
    { question: "Would you rather swap lives with your best friend for a day or your favourite celebrity?", points: 15 },
  ],
  "Truth or Dare": [
    { question: "Truth: What's the funniest thing you've done by accident?", points: 10 },
    { question: "Dare: Give everyone in the room a silly nickname!", points: 10 },
    { question: "Truth: What's your most unusual food combination?", points: 10 },
    { question: "Dare: Give a dramatic acceptance speech for winning an imaginary award!", points: 15 },
    { question: "Truth: What's a song you secretly love?", points: 10 },
    { question: "Dare: Describe your day like a movie trailer!", points: 15 },
    { question: "Truth: What's your most embarrassing harmless habit?", points: 10 },
    { question: "Dare: Act like a cat until your next turn!", points: 15 },
  ],
};

const categories = Object.keys(games);

export default function PartyPage() {
  const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2"]);
  const [newName, setNewName] = useState("");
  const [category, setCategory] = useState("Funny Challenges");
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [usedChallenges, setUsedChallenges] = useState([]);
  const [scores, setScores] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [message, setMessage] = useState("");

  function addPlayer(event) {
    event.preventDefault();
    const name = newName.trim();

    if (!name) return;

    if (playerNames.length >= 12) {
      setMessage("Party limit reached: 12 players maximum.");
      return;
    }

    if (playerNames.some((player) => player.toLowerCase() === name.toLowerCase())) {
      setMessage("That player name is already in use.");
      return;
    }

    setPlayerNames((previous) => [...previous, name]);
    setNewName("");
    setMessage("");
  }

  function removePlayer(index) {
    if (playerNames.length <= 2) {
      setMessage("Keep at least 2 players to play.");
      return;
    }

    const updatedPlayers = playerNames.filter((_, i) => i !== index);
    const updatedScores = { ...scores };
    delete updatedScores[playerNames[index]];

    setPlayerNames(updatedPlayers);
    setScores(updatedScores);
    setCurrentPlayer((previous) => {
      if (index < previous) return previous - 1;
      return Math.min(previous, updatedPlayers.length - 1);
    });
    setCurrentChallenge(null);
    setUsedChallenges([]);
    setMessage("");
  }

  function drawChallenge() {
    const pool = games[category];
    let available = pool
      .map((challenge, index) => ({ ...challenge, index }))
      .filter((challenge) => !usedChallenges.includes(challenge.index));

    if (available.length === 0) {
      setUsedChallenges([]);
      available = pool.map((challenge, index) => ({ ...challenge, index }));
    }

    const selected = available[Math.floor(Math.random() * available.length)];

    setCurrentChallenge(selected);
    setUsedChallenges((previous) =>
      available.length === pool.length
        ? [selected.index]
        : [...previous, selected.index]
    );
    setMessage("");
  }

  function awardPoints() {
    if (!currentChallenge) return;

    const name = playerNames[currentPlayer];

    setScores((previous) => ({
      ...previous,
      [name]: (previous[name] || 0) + currentChallenge.points,
    }));

    setMessage(`${name} earned ${currentChallenge.points} points! 🎉`);
    setCurrentChallenge(null);
    setCurrentPlayer((previous) => (previous + 1) % playerNames.length);
  }

  function skipChallenge() {
    setCurrentChallenge(null);
    setMessage("Challenge skipped. No points awarded.");
    setCurrentPlayer((previous) => (previous + 1) % playerNames.length);
  }

  function changeCategory(value) {
    setCategory(value);
    setCurrentChallenge(null);
    setUsedChallenges([]);
    setMessage("");
  }

  function resetGame() {
    setScores({});
    setCurrentPlayer(0);
    setCurrentChallenge(null);
    setUsedChallenges([]);
    setMessage("New game started! Scores have been reset.");
  }

  const leaderboard = [...playerNames].sort(
    (a, b) => (scores[b] || 0) - (scores[a] || 0)
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#10091d] text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-10">
        <a href="/" className="text-2xl font-black">
          <span className="text-fuchsia-400">✳</span> VYBE
          <span className="text-cyan-300">AI</span>
        </a>
        <a href="/" className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          ← Home
        </a>
      </nav>

      <section className="relative px-5 pb-10 pt-14 sm:px-10 sm:pt-20">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold tracking-widest text-fuchsia-200">
            🎉 THE PARTY STARTS HERE
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight sm:text-7xl">
            Less scrolling.
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              More LOLs.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-purple-100/70">
            Gather your crew, pick your game and let VYBE bring the chaos.
            No sign-up, no downloads, just good times.
          </p>
        </div>
      </section>

      <section className="px-5 py-6 sm:px-10">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.3fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-xs font-black tracking-widest text-cyan-300">
              👥 YOUR CREW
            </p>
            <h2 className="mt-3 text-2xl font-black">Who's playing?</h2>
            <p className="mt-2 text-sm text-purple-100/60">
              Add 2–12 players. Use nicknames if you like.
            </p>

            <form onSubmit={addPlayer} className="mt-5 flex gap-2">
              <input
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                maxLength={24}
                placeholder="Enter a player name"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#1b122b] px-3 py-3 text-sm outline-none focus:border-fuchsia-300"
              />
              <button className="rounded-xl bg-fuchsia-500 px-4 py-3 font-black hover:bg-fuchsia-400">
                Add
              </button>
            </form>

            <div className="mt-5 space-y-2">
              {playerNames.map((name, index) => (
                <div
                  key={name}
                  className={`flex items-center gap-3 rounded-xl border p-3 ${
                    index === currentPlayer
                      ? "border-cyan-300/40 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-700 font-black">
                    {name.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold">{name}</span>
                  {index === currentPlayer && (
                    <span className="text-xs font-bold text-cyan-300">UP NEXT</span>
                  )}
                  <button
                    onClick={() => removePlayer(index)}
                    aria-label={`Remove ${name}`}
                    className="rounded-lg px-2 py-1 text-sm text-purple-100/50 hover:bg-white/10 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="text-xs font-black tracking-widest text-fuchsia-300">
                🏆 LEADERBOARD
              </p>
              <div className="mt-3 space-y-2">
                {leaderboard.map((name, index) => (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <span className="text-purple-100/80">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🎮"} {name}
                    </span>
                    <span className="font-black text-cyan-300">
                      {scores[name] || 0} pts
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={resetGame}
                className="mt-5 rounded-xl border border-white/15 px-4 py-2 text-sm font-bold hover:bg-white/10"
              >
                Reset scores ↻
              </button>
            </div>
          </article>

          <article className="rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-cyan-400/10 p-6 sm:p-8">
            <p className="text-xs font-black tracking-widest text-fuchsia-300">
              ⚡ PICK YOUR CHAOS
            </p>
            <h2 className="mt-3 text-2xl font-black">Choose a game</h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => changeCategory(item)}
                  className={`min-h-20 rounded-2xl border p-3 text-left text-sm font-bold transition ${
                    category === item
                      ? "border-fuchsia-300 bg-fuchsia-500/20"
                      : "border-white/10 bg-[#1b122b] hover:border-cyan-300/40"
                  }`}
                >
                  {item === "Funny Challenges" && "🤣 "}
                  {item === "Rapid Fire" && "⚡ "}
                  {item === "Would You Rather" && "🤔 "}
                  {item === "Truth or Dare" && "🎲 "}
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-[#10091d]/70 p-5 sm:p-7">
              <p className="text-xs font-black tracking-widest text-cyan-300">
                {category.toUpperCase()} ✦
              </p>

              {currentChallenge ? (
                <>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-black leading-relaxed sm:text-2xl">
                      {currentChallenge.question}
                    </h3>
                    <span className="shrink-0 rounded-full bg-fuchsia-500/20 px-3 py-1 text-xs font-black text-fuchsia-200">
                      {currentChallenge.points} pts
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-purple-100/60">
                    {category === "Would You Rather"
                      ? "Everyone shares their choice. Award points to the player who gives the funniest or most convincing explanation."
                      : "Complete the challenge to earn points. You can always skip if you don't want to do it."}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={awardPoints}
                      className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 py-3 font-black"
                    >
                      Award points ✓
                    </button>
                    <button
                      onClick={skipChallenge}
                      className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold hover:bg-white/10"
                    >
                      Skip ↗
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="py-5 text-center">
                    <p className="text-5xl">🎲</p>
                    <h3 className="mt-4 text-xl font-black">Ready for the next challenge?</h3>
                    <p className="mt-2 text-sm text-purple-100/60">
                      {playerNames[currentPlayer]} is up next.
                    </p>
                  </div>
                  <button
                    onClick={drawChallenge}
                    className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 py-4 font-black transition hover:scale-[1.01]"
                  >
                    Give me a challenge ⚡
                  </button>
                </>
              )}

              {message && (
                <p aria-live="polite" className="mt-4 rounded-xl bg-white/5 p-3 text-sm font-bold text-cyan-200">
                  {message}
                </p>
              )}
            </div>
          </article>
        </div>
      </section>

      <footer className="mt-12 border-t border-white/10 px-5 py-7 text-center text-xs text-purple-100/40">
        VYBE AI · Made for unforgettable moments.
      </footer>
    </main>
  );
}