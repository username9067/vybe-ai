
"use client";

import { useState } from "react";

const rounds = [
  {
    category: "LIFESTYLE",
    a: "Travel the world for free 🌍",
    b: "Live in your dream house 🏡",
  },
  {
    category: "FUN",
    a: "Never have homework again 📚",
    b: "Never have chores again 🧹",
  },
  {
    category: "SUPERPOWERS",
    a: "Read minds 🧠",
    b: "Become invisible 👻",
  },
  {
    category: "FOOD",
    a: "Eat pizza whenever you want 🍕",
    b: "Eat ice cream whenever you want 🍦",
  },
  {
    category: "MUSIC",
    a: "Meet your favourite singer 🎤",
    b: "Perform on stage with them 🎸",
  },
  {
    category: "ADVENTURE",
    a: "Explore outer space 🚀",
    b: "Explore the deepest ocean 🌊",
  },
  {
    category: "FRIENDSHIP",
    a: "Have one best friend forever 💞",
    b: "Have a huge group of friends 🥳",
  },
  {
    category: "TIME",
    a: "Visit the past ⏳",
    b: "See your future 🔮",
  },
  {
    category: "TECH",
    a: "Have a robot assistant 🤖",
    b: "Have a teleportation machine ✨",
  },
  {
    category: "DREAMS",
    a: "Become famous worldwide 🌟",
    b: "Become incredibly wealthy 💰",
  },
];

export default function VoteBattlePage() {
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [newPlayer, setNewPlayer] = useState("");
  const [roundIndex, setRoundIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  const round = rounds[roundIndex];
  const currentVotes = votes[roundIndex] || {};
  const voteCount = Object.keys(currentVotes).length;
  const finished = roundIndex >= rounds.length;

  function addPlayer() {
    const name = newPlayer.trim();
    if (!name || players.length >= 8) return;
    if (players.some((player) => player.toLowerCase() === name.toLowerCase())) {
      return;
    }
    setPlayers((previous) => [...previous, name]);
    setNewPlayer("");
  }

  function castVote(player, choice) {
    if (revealed || currentVotes[player]) return;

    setVotes((previous) => ({
      ...previous,
      [roundIndex]: {
        ...(previous[roundIndex] || {}),
        [player]: choice,
      },
    }));
  }

  function revealVotes() {
    if (voteCount !== players.length || revealed) return;

    const tally = { A: 0, B: 0 };
    Object.values(currentVotes).forEach((choice) => {
      tally[choice] += 1;
    });

    const points = {};
    players.forEach((player) => {
      points[player] = (scores[player] || 0) + 1;
    });

    // Give a bonus point to players who chose the majority option.
    const majority = tally.A === tally.B ? null : tally.A > tally.B ? "A" : "B";

    if (majority) {
      players.forEach((player) => {
        if (currentVotes[player] === majority) points[player] += 1;
      });
    }

    setScores(points);
    setRevealed(true);
  }

  function nextRound() {
    setRoundIndex((previous) => previous + 1);
    setRevealed(false);
  }

  function restartGame() {
    setRoundIndex(0);
    setVotes({});
    setRevealed(false);
    setScores({});
    setGameStarted(false);
  }

  const sortedScores = [...players].sort(
    (a, b) => (scores[b] || 0) - (scores[a] || 0)
  );

  return (
    <main className="min-h-screen bg-[#100817] text-white px-5 py-10">
      <div className="max-w-3xl mx-auto">
        <a
          href="/"
          className="inline-block text-fuchsia-300 hover:text-cyan-300 mb-8"
        >
          ← Back to VYBE
        </a>

        <header className="text-center mb-10">
          <p className="text-cyan-300 text-sm font-bold tracking-[0.3em]">
            PICK A SIDE. OWN YOUR CHOICE.
          </p>
          <h1 className="text-4xl sm:text-6xl font-black mt-4">
            VOTE <span className="text-fuchsia-400">BATTLE.</span>
          </h1>
          <p className="text-gray-400 mt-4">
            The group has to choose. No sitting on the fence!
          </p>
        </header>

        {!gameStarted ? (
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Who's playing?</h2>
            <p className="text-gray-400 mt-2 mb-5">
              Add up to 8 players. Pass the device around to vote.
            </p>

            <div className="space-y-3">
              {players.map((player, index) => (
                <div
                  key={player}
                  className="flex items-center justify-between rounded-xl bg-white/[0.05] border border-white/10 p-4"
                >
                  <span>{index + 1}. {player}</span>
                  {players.length > 2 && (
                    <button
                      onClick={() =>
                        setPlayers((previous) =>
                          previous.filter((name) => name !== player)
                        )
                      }
                      className="text-rose-300 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form
              className="flex gap-2 mt-5"
              onSubmit={(event) => {
                event.preventDefault();
                addPlayer();
              }}
            >
              <input
                value={newPlayer}
                onChange={(event) => setNewPlayer(event.target.value)}
                maxLength={24}
                placeholder="Enter player name"
                className="min-w-0 flex-1 rounded-xl bg-black/20 border border-white/10 p-3 outline-none focus:border-fuchsia-400"
              />
              <button
                type="submit"
                disabled={!newPlayer.trim() || players.length >= 8}
                className="rounded-xl px-5 bg-white/10 hover:bg-white/20 disabled:opacity-30"
              >
                Add
              </button>
            </form>

            <button
              onClick={() => setGameStarted(true)}
              disabled={players.length < 2}
              className="w-full mt-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold disabled:opacity-30"
            >
              Start the Battle ⚔️
            </button>
          </section>
        ) : finished ? (
          <section className="rounded-3xl border border-fuchsia-400/20 bg-white/[0.04] p-6 sm:p-8 text-center">
            <div className="text-6xl">🏆</div>
            <h2 className="text-3xl font-black mt-4">BATTLE COMPLETE!</h2>
            <p className="text-gray-400 mt-2">Here's your final leaderboard.</p>

            <div className="space-y-3 mt-7 text-left">
              {sortedScores.map((player, index) => (
                <div
                  key={player}
                  className="flex justify-between items-center rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span>{["🥇", "🥈", "🥉"][index] || "✨"} {player}</span>
                  <span className="font-bold text-cyan-300">
                    {scores[player] || 0} pts
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={restartGame}
              className="w-full mt-7 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold"
            >
              Play Again ↻
            </button>
          </section>
        ) : (
          <>
            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>ROUND {roundIndex + 1} OF {rounds.length}</span>
              <span>{voteCount}/{players.length} votes</span>
            </div>

            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400"
                style={{
                  width: `${((roundIndex + 1) / rounds.length) * 100}%`,
                }}
              />
            </div>

            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8">
              <p className="text-cyan-300 text-sm font-bold tracking-widest">
                {round.category}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black mt-3">
                WOULD YOU RATHER...
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mt-7">
                {[
                  { key: "A", text: round.a, color: "fuchsia" },
                  { key: "B", text: round.b, color: "cyan" },
                ].map((option) => (
                  <div
                    key={option.key}
                    className={`rounded-2xl border p-5 ${
                      revealed && currentVotes
                        ? "border-white/10"
                        : "border-white/10"
                    } ${
                      revealed
                        ? option.key === "A"
                          ? "bg-fuchsia-500/10"
                          : "bg-cyan-500/10"
                        : "bg-black/10"
                    }`}
                  >
                    <p className="text-sm text-gray-400 font-bold">
                      OPTION {option.key}
                    </p>
                    <p className="text-xl font-bold mt-3">{option.text}</p>

                    {revealed && (
                      <p className="text-sm mt-4 text-gray-300">
                        {Object.values(currentVotes).filter(
                          (choice) => choice === option.key
                        ).length}{" "}
                        vote(s)
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {!revealed ? (
                <div className="mt-8">
                  <h3 className="font-bold text-lg">Who's voting now?</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Each player picks one option. Votes lock after selection.
                  </p>

                  <div className="space-y-4 mt-5">
                    {players.map((player) => (
                      <div
                        key={player}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="flex justify-between gap-3 items-center">
                          <span className="font-semibold">{player}</span>
                          {currentVotes[player] && (
                            <span className="text-emerald-300 text-sm">
                              Vote locked ✓
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <button
                            onClick={() => castVote(player, "A")}
                            disabled={Boolean(currentVotes[player])}
                            className={`rounded-lg border p-3 disabled:opacity-50 ${
                              currentVotes[player] === "A"
                                ? "border-fuchsia-400 bg-fuchsia-500/20"
                                : "border-white/10 hover:border-fuchsia-400/50"
                            }`}
                          >
                            A
                          </button>
                          <button
                            onClick={() => castVote(player, "B")}
                            disabled={Boolean(currentVotes[player])}
                            className={`rounded-lg border p-3 disabled:opacity-50 ${
                              currentVotes[player] === "B"
                                ? "border-cyan-300 bg-cyan-400/20"
                                : "border-white/10 hover:border-cyan-300/50"
                            }`}
                          >
                            B
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={revealVotes}
                    disabled={voteCount !== players.length}
                    className="w-full mt-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold disabled:opacity-30"
                  >
                    Reveal Votes 🔥
                  </button>
                </div>
              ) : (
                <div className="mt-7">
                  <p className="text-center text-2xl font-black">
                    {Object.values(currentVotes).filter((vote) => vote === "A").length ===
                    Object.values(currentVotes).filter((vote) => vote === "B").length
                      ? "IT'S A TIE! 🤝"
                      : "THE GROUP HAS SPOKEN! 🎉"}
                  </p>
                  <p className="text-center text-gray-400 mt-2">
                    Majority voters earn a bonus point. Everyone earns a participation point.
                  </p>

                  <h3 className="font-bold mt-7 mb-3">Leaderboard</h3>
                  <div className="space-y-2">
                    {sortedScores.map((player, index) => (
                      <div
                        key={player}
                        className="flex justify-between rounded-xl bg-white/[0.04] p-3"
                      >
                        <span>{index + 1}. {player}</span>
                        <span className="text-cyan-300 font-bold">
                          {scores[player] || 0} pts
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={nextRound}
                    className="w-full mt-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 py-4 font-bold"
                  >
                    {roundIndex === rounds.length - 1
                      ? "Final Results 🏆"
                      : "Next Round →"}
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        <p className="text-center text-gray-500 text-xs mt-7">
          Local pass-the-device game. Votes aren't sent to a server.
        </p>
      </div>
    </main>
  );
}
