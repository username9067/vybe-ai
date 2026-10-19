
"use client";

import { useState } from "react";

const decks = {
  Truth: [
    "What is the most embarrassing song on your playlist?",
    "What was your first impression of the person on your left?",
    "What is a silly habit you have?",
    "What is the funniest excuse you have ever used?",
    "What is one thing that always makes you laugh?",
    "What is a trend you secretly enjoy?",
    "What is the most unusual food you have tried?",
    "What is one talent you wish you had?",
    "What is the funniest thing that happened to you recently?",
    "If your life were a movie, what would its title be?",
    "What is one thing you are surprisingly good at?",
    "What fictional character would you want as a best friend?",
  ],
  Dare: [
    "Do your best robot dance for 15 seconds.",
    "Speak in a dramatic movie-trailer voice for one turn.",
    "Make your funniest face and hold it for five seconds.",
    "Invent a new handshake with another player.",
    "Sing one line of a song like an opera singer.",
    "Pretend to be a news reporter announcing snack time.",
    "Walk across the room like you are on a fashion runway.",
    "Describe your favourite food like it is a luxury product.",
    "Try to make another player laugh in 20 seconds.",
    "Act like a sleepy cat until your next turn.",
    "Give everyone a creative superhero name.",
    "Do five silly dance moves in a row.",
  ],
  Funny: [
    "What would your warning label say?",
    "If you were a potato, what kind would you be?",
    "Give yourself a ridiculous celebrity name.",
    "Describe your day as if it were a breaking news story.",
    "Invent the worst possible name for a restaurant.",
    "Do your best impression of someone waking up on Monday.",
    "What would be the funniest thing to put in a museum?",
    "Make up a slogan for the person on your right.",
    "Explain how to use a spoon as if it were advanced technology.",
    "Create a new dance move and name it.",
    "What would your pet say about you if it could talk?",
    "Make up a completely useless superpower.",
  ],
  "Extreme but Safe": [
    "Perform a 30-second stand-up comedy routine.",
    "Tell a story using exactly five words.",
    "Make up a song about the room you are in.",
    "Do a dramatic slow-motion entrance.",
    "Try to say a tongue twister three times quickly.",
    "Invent a product and give a 20-second sales pitch.",
    "Act out three emotions and let the group guess them.",
    "Give a motivational speech about getting out of bed.",
    "Do a silent movie scene and let others guess the plot.",
    "Create a handshake involving three moves.",
    "Tell a completely fictional story with a serious face.",
    "Do an impression of a cartoon character.",
  ],
};

const modes = Object.keys(decks);

export default function TruthOrDarePage() {
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [newPlayer, setNewPlayer] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [mode, setMode] = useState("Truth");
  const [card, setCard] = useState("");
  const [usedCards, setUsedCards] = useState([]);
  const [scores, setScores] = useState({});
  const [rounds, setRounds] = useState(0);

  function addPlayer() {
    const name = newPlayer.trim();
    if (!name || players.length >= 12) return;
    setPlayers((previous) => [...previous, name]);
    setNewPlayer("");
  }

  function removePlayer(index) {
    if (players.length <= 2) return;
    setPlayers((previous) => previous.filter((_, i) => i !== index));
    setCurrentPlayer(0);
    setCard("");
  }

  function drawCard() {
    const available = decks[mode].filter(
      (item) => !usedCards.includes(`${mode}:${item}`)
    );
    const pool = available.length ? available : decks[mode];
    const picked = pool[Math.floor(Math.random() * pool.length)];

    setCard(picked);
    setUsedCards((previous) => [...previous, `${mode}:${picked}`]);
  }

  function nextTurn() {
    setCurrentPlayer((previous) => (previous + 1) % players.length);
    setCard("");
  }

  function awardPoint() {
    const player = players[currentPlayer];
    setScores((previous) => ({
      ...previous,
      [player]: (previous[player] || 0) + 1,
    }));
    nextTurn();
    setRounds((previous) => previous + 1);
  }

  function skipTurn() {
    nextTurn();
    setRounds((previous) => previous + 1);
  }

  function resetGame() {
    setCurrentPlayer(0);
    setCard("");
    setUsedCards([]);
    setScores({});
    setRounds(0);
  }

  return (
    <main className="min-h-screen bg-[#100817] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE
        </a>

        <header className="py-10 text-center">
          <div className="text-5xl">🔥</div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            NO BORING TURNS ALLOWED
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Truth <span className="text-fuchsia-400">or Dare</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Pick your players, choose your mode, and let the chaos begin.
            Everyone can pass on any prompt without explanation.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-xl font-bold">👥 Players ({players.length}/12)</h2>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              addPlayer();
            }}
            className="mt-4 flex flex-col gap-3 sm:flex-row"
          >
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
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${
                  index === currentPlayer
                    ? "border-cyan-300 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span>{index === currentPlayer ? "👉" : "🎮"}</span>
                <span className="text-sm font-semibold">{player}</span>
                {players.length > 2 && (
                  <button
                    onClick={() => removePlayer(index)}
                    className="ml-1 text-gray-400 hover:text-red-300"
                    aria-label={`Remove ${player}`}
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-fuchsia-400/20 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-xl font-bold">🎲 Choose your mode</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {modes.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMode(item);
                  setCard("");
                }}
                className={`rounded-2xl border p-4 text-sm font-bold transition ${
                  mode === item
                    ? "border-fuchsia-400 bg-fuchsia-500/15"
                    : "border-white/10 bg-white/[0.03] hover:border-fuchsia-400/50"
                }`}
              >
                {item === "Truth" && "💭 "}
                {item === "Dare" && "🔥 "}
                {item === "Funny" && "😂 "}
                {item === "Extreme but Safe" && "⚡ "}
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#190f23] p-6 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
              CURRENT PLAYER
            </p>
            <h3 className="mt-2 text-2xl font-black">
              {players[currentPlayer]}
            </h3>
            <p className="mt-2 text-sm text-gray-400">Selected mode: {mode}</p>

            <div className="mx-auto mt-6 flex min-h-40 max-w-2xl items-center justify-center rounded-2xl bg-white/[0.04] p-6">
              {card ? (
                <p className="text-xl font-bold leading-relaxed sm:text-2xl">
                  {card}
                </p>
              ) : (
                <div>
                  <div className="text-4xl">🎴</div>
                  <p className="mt-3 text-gray-400">
                    Ready to discover your challenge?
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={drawCard}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-6 py-4 font-black hover:opacity-90 sm:w-auto"
            >
              {card ? "🎲 Draw Another Card" : "✨ Reveal My Prompt"}
            </button>

            {card && (
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={awardPoint}
                  className="rounded-xl bg-cyan-300 px-5 py-3 font-bold text-[#100817] hover:bg-cyan-200"
                >
                  ✓ Completed (+1 point)
                </button>
                <button
                  onClick={skipTurn}
                  className="rounded-xl border border-white/15 px-5 py-3 font-semibold hover:bg-white/5"
                >
                  Pass / Next Turn
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">🏆 Scoreboard</h2>
              <p className="mt-1 text-sm text-gray-400">
                Turns completed: {rounds}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
            >
              Reset Game
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...players]
              .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
              .map((player, index) => (
                <div
                  key={`${player}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="font-semibold">
                    {index === 0 ? "🥇 " : index === 1 ? "🥈 " : index === 2 ? "🥉 " : ""}
                    {player}
                  </span>
                  <span className="font-black text-cyan-300">
                    {scores[player] || 0} pts
                  </span>
                </div>
              ))}
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-gray-500">
          Keep it fun. Respect every player's boundaries. 💜
        </footer>
      </div>
    </main>
  );
}