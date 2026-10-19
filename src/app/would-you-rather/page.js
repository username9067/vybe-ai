
"use client";

import { useState } from "react";

const decks = {
  Funny: [
    ["Have a laugh track play whenever you enter a room", "Have dramatic music play whenever you leave"],
    ["Only communicate by singing", "Only communicate by rhyming"],
    ["Have spaghetti for hair", "Have popcorn for teeth"],
    ["Accidentally send every text twice", "Always reply to messages three hours late"],
    ["Have a tiny elephant follow you everywhere", "Have 20 ducks follow you everywhere"],
    ["Laugh every time you are nervous", "Hiccup every time you lie"],
    ["Wear clown shoes every day", "Wear a superhero cape every day"],
    ["Have your pet narrate your life", "Have your phone announce your thoughts out loud"],
  ],
  "Mind Benders": [
    ["Know every language", "Be able to talk to animals"],
    ["Visit 100 years in the past", "Visit 100 years in the future"],
    ["Always know when someone is lying", "Always know when someone needs help"],
    ["Remember every book you read", "Remember every conversation you have"],
    ["Explore the deepest ocean", "Explore outer space"],
    ["Pause time for 10 seconds daily", "Rewind time by 10 seconds once a day"],
    ["Discover a new planet", "Discover a cure for one major disease"],
    ["See one day into your future", "Erase one regret from your past"],
  ],
  "Extreme but Safe": [
    ["Dance in public for 60 seconds", "Sing your favourite song in front of a crowd"],
    ["Go a week without social media", "Go a week without streaming entertainment"],
    ["Eat your favourite meal every day for a month", "Never eat that meal again"],
    ["Let your friends choose your outfit", "Let your friends choose your profile picture"],
    ["Give a five-minute speech with no preparation", "Perform a comedy set with no preparation"],
    ["Spend a night camping outdoors with proper gear", "Spend a night in a new city with a planned itinerary"],
    ["Try a new hobby every week", "Master one hobby over a whole year"],
    ["Take a cold shower for a week", "Wake up an hour earlier for a week"],
  ],
  Friendship: [
    ["Have a friend who always tells the truth", "Have a friend who always knows how to cheer you up"],
    ["Plan every adventure with your friends", "Let your friends surprise you every time"],
    ["Have a friend who shares your hobbies", "Have a friend who challenges your opinions"],
    ["Take a dream trip with your best friend", "Attend your dream concert with your best friend"],
    ["Get thoughtful letters from friends", "Get spontaneous calls from friends"],
    ["Have one lifelong best friend", "Have a big group of close friends"],
    ["Always win games against your friends", "Always make your friends laugh"],
    ["Have friends who live next door", "Have friends all over the world"],
  ],
};

const categories = Object.keys(decks);

export default function WouldYouRatherPage() {
  const [category, setCategory] = useState("Funny");
  const [currentPair, setCurrentPair] = useState(null);
  const [usedPairs, setUsedPairs] = useState([]);
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [newPlayer, setNewPlayer] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [votes, setVotes] = useState({});
  const [rounds, setRounds] = useState(0);

  function addPlayer(event) {
    event.preventDefault();
    const name = newPlayer.trim();

    if (!name || players.length >= 12) return;

    setPlayers((previous) => [...previous, name]);
    setNewPlayer("");
  }

  function drawPair() {
    const available = decks[category].filter(
      (pair) => !usedPairs.includes(`${category}:${pair[0]}`)
    );
    const pool = available.length ? available : decks[category];
    const pair = pool[Math.floor(Math.random() * pool.length)];

    setCurrentPair(pair);
    setUsedPairs((previous) => [...previous, `${category}:${pair[0]}`]);
    setVotes({});
  }

  function chooseOption(option) {
    setVotes((previous) => ({
      ...previous,
      [players[currentPlayer]]: option,
    }));
  }

  function nextPlayer() {
    setCurrentPlayer((previous) => (previous + 1) % players.length);
  }

  function nextRound() {
    setRounds((previous) => previous + 1);
    setCurrentPair(null);
    setVotes({});
    setCurrentPlayer(0);
  }

  function resetGame() {
    setCurrentPair(null);
    setUsedPairs([]);
    setVotes({});
    setCurrentPlayer(0);
    setRounds(0);
  }

  const voteCounts = currentPair
    ? [
        players.filter((player) => votes[player] === currentPair[0]).length,
        players.filter((player) => votes[player] === currentPair[1]).length,
      ]
    : [0, 0];

  return (
    <main className="min-h-screen bg-[#100817] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE
        </a>

        <header className="py-10 text-center">
          <div className="text-5xl">🤔</div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            THERE ARE NO EASY ANSWERS
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Would You <span className="text-fuchsia-400">Rather?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Two choices. One decision. Defend your answer.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">👥 Players ({players.length}/12)</h2>
            <span className="text-sm text-gray-400">Round {rounds + 1}</span>
          </div>

          <form onSubmit={addPlayer} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={newPlayer}
              onChange={(event) => setNewPlayer(event.target.value)}
              placeholder="Enter a player name"
              maxLength={24}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#190f23] px-4 py-3 outline-none focus:border-fuchsia-400"
            />
            <button
              type="submit"
              disabled={!newPlayer.trim() || players.length >= 12}
              className="rounded-xl bg-fuchsia-500 px-5 py-3 font-bold hover:bg-fuchsia-400 disabled:opacity-40"
            >
              + Add Player
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {players.map((player, index) => (
              <div
                key={`${player}-${index}`}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  currentPlayer === index
                    ? "border-cyan-300 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {currentPlayer === index ? "👉 " : "🎮 "}
                {player}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-fuchsia-400/20 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-xl font-bold">Choose your category</h2>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                  setCurrentPair(null);
                  setVotes({});
                }}
                className={`rounded-xl border p-3 text-sm font-bold transition ${
                  category === item
                    ? "border-fuchsia-400 bg-fuchsia-500/15"
                    : "border-white/10 hover:border-fuchsia-400/50"
                }`}
              >
                {item === "Funny" && "😂 "}
                {item === "Mind Benders" && "🧠 "}
                {item === "Extreme but Safe" && "⚡ "}
                {item === "Friendship" && "💖 "}
                {item}
              </button>
            ))}
          </div>

          {!currentPair ? (
            <div className="mt-6 rounded-2xl bg-[#190f23] p-8 text-center">
              <div className="text-5xl">🎲</div>
              <p className="mt-4 text-gray-400">Ready for a difficult decision?</p>
              <button
                onClick={drawPair}
                className="mt-5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-6 py-4 font-black hover:opacity-90"
              >
                Generate My Dilemma ✨
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => chooseOption(currentPair[0])}
                  className={`min-h-48 rounded-2xl border p-6 text-left transition ${
                    votes[players[currentPlayer]] === currentPair[0]
                      ? "border-cyan-300 bg-cyan-300/10"
                      : "border-white/10 bg-[#190f23] hover:border-cyan-300/50"
                  }`}
                >
                  <span className="text-xs font-bold tracking-widest text-cyan-300">OPTION A</span>
                  <p className="mt-4 text-xl font-black">{currentPair[0]}</p>
                </button>

                <button
                  onClick={() => chooseOption(currentPair[1])}
                  className={`min-h-48 rounded-2xl border p-6 text-left transition ${
                    votes[players[currentPlayer]] === currentPair[1]
                      ? "border-fuchsia-400 bg-fuchsia-500/10"
                      : "border-white/10 bg-[#190f23] hover:border-fuchsia-400/50"
                  }`}
                >
                  <span className="text-xs font-bold tracking-widest text-fuchsia-300">OPTION B</span>
                  <p className="mt-4 text-xl font-black">{currentPair[1]}</p>
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#190f23] p-5">
                <p className="text-sm text-gray-400">
                  Current voter: <strong className="text-white">{players[currentPlayer]}</strong>
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Votes: Option A — {voteCounts[0]} · Option B — {voteCounts[1]}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={nextPlayer}
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold hover:bg-white/5"
                  >
                    Next Voter →
                  </button>
                  <button
                    onClick={nextRound}
                    className="rounded-xl bg-cyan-300 px-4 py-3 text-sm font-black text-[#100817] hover:bg-cyan-200"
                  >
                    Next Dilemma 🎲
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Each player can change their vote before the next dilemma.
                </p>
              </div>
            </>
          )}
        </section>

        <div className="mt-6 text-center">
          <button
            onClick={resetGame}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
          >
            Reset Game
          </button>
        </div>

        <footer className="py-10 text-center text-sm text-gray-500">
          Pick your side. Defend your vibe. 💜
        </footer>
      </div>
    </main>
  );
}