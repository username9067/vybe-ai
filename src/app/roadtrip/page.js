
"use client";

import { useState } from "react";

const games = {
  "Guess the Song": [
    { q: "Which song has the words 'Let it go' and is famous from Frozen?", a: "Let It Go" },
    { q: "Which song begins with 'Hello, it's me'?", a: "Hello — Adele" },
    { q: "Which song is famous for the line 'Baby shark, doo doo doo'?", a: "Baby Shark" },
    { q: "Which Queen song has the words 'Is this the real life?'", a: "Bohemian Rhapsody" },
    { q: "Which song has the title 'Shape of You'?", a: "Shape of You — Ed Sheeran" },
    { q: "Which song is known for 'We don't talk about Bruno'?", a: "We Don't Talk About Bruno" },
    { q: "Which song includes the words 'I'm a Barbie girl'?", a: "Barbie Girl — Aqua" },
    { q: "Which song is associated with the movie Titanic?", a: "My Heart Will Go On" },
  ],
  "Rapid Fire": [
    { q: "Name 5 things you pack for a road trip!", a: "Any 5 sensible travel items" },
    { q: "Name 3 things you see on a highway!", a: "Any 3 correct answers" },
    { q: "Name 4 ice cream flavours in 5 seconds!", a: "Any 4 flavours" },
    { q: "Name 3 countries you want to visit!", a: "Any 3 countries" },
    { q: "Name 5 movie characters!", a: "Any 5 characters" },
    { q: "Name 4 fruits without stopping!", a: "Any 4 fruits" },
    { q: "Name 3 things that make you laugh!", a: "Any 3 answers" },
    { q: "Name 5 songs with a colour in the title!", a: "Any 5 valid songs" },
  ],
  "Would You Rather": [
    { q: "Would you rather explore a jungle or relax on a beach?", a: "Explain your choice!" },
    { q: "Would you rather travel into the past or the future?", a: "Explain your choice!" },
    { q: "Would you rather have unlimited snacks or unlimited music?", a: "Explain your choice!" },
    { q: "Would you rather take a road trip in the mountains or beside the sea?", a: "Explain your choice!" },
    { q: "Would you rather be able to fly or become invisible?", a: "Explain your choice!" },
    { q: "Would you rather sing every sentence or dance everywhere?", a: "Explain your choice!" },
    { q: "Would you rather visit space or the deep ocean?", a: "Explain your choice!" },
    { q: "Would you rather have a pet dragon or a pet dinosaur?", a: "Explain your choice!" },
  ],
  "Road Trip Challenges": [
    { q: "Tell the group your funniest travel memory!", a: "Share a real or invented funny story" },
    { q: "Give everyone a fun nickname for this trip!", a: "Make sure everyone is comfortable with theirs" },
    { q: "Describe your dream holiday in 10 seconds!", a: "Be creative!" },
    { q: "Invent a name for your travel group!", a: "The group votes on the best one" },
    { q: "Give a movie-style title to today's trip!", a: "Make it dramatic!" },
    { q: "Say three nice things about another player!", a: "Keep it kind and positive" },
    { q: "Create a slogan for your road trip!", a: "Everyone can vote on it" },
    { q: "Tell a story using the words pizza, moon, and elephant!", a: "Use all three words" },
  ],
};

const categories = Object.keys(games);

export default function RoadTripPage() {
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [newPlayer, setNewPlayer] = useState("");
  const [scores, setScores] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [category, setCategory] = useState("Guess the Song");
  const [challenge, setChallenge] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [round, setRound] = useState(0);

  function addPlayer() {
    const name = newPlayer.trim();
    if (!name || players.length >= 12) return;
    setPlayers([...players, name]);
    setNewPlayer("");
  }

  function removePlayer(index) {
    if (players.length <= 2) return;
    setPlayers(players.filter((_, i) => i !== index));
    setCurrentPlayer(0);
    setChallenge(null);
    setShowAnswer(false);
  }

  function nextChallenge() {
    const options = games[category];
    let next = options[Math.floor(Math.random() * options.length)];

    if (options.length > 1 && challenge?.q === next.q) {
      next = options[(options.findIndex((item) => item.q === next.q) + 1) % options.length];
    }

    setChallenge(next);
    setShowAnswer(false);
    setRound(round + 1);
  }

  function nextPlayer() {
    setCurrentPlayer((currentPlayer + 1) % players.length);
    setChallenge(null);
    setShowAnswer(false);
  }

  function awardPoint() {
    const name = players[currentPlayer];
    setScores((old) => ({ ...old, [name]: (old[name] || 0) + 1 }));
    nextPlayer();
  }

  function resetGame() {
    setScores({});
    setCurrentPlayer(0);
    setChallenge(null);
    setShowAnswer(false);
    setRound(0);
  }

  const youtubeUrl = "https://www.youtube.com/results?search_query=" +
    encodeURIComponent("best road trip songs playlist");

  return (
    <main className="min-h-screen bg-[#160d20] text-white px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE AI
        </a>

        <header className="py-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
            🚗 THE ROAD TRIP EDITION
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            ROAD TRIP <span className="text-fuchsia-400">VYBE</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Big laughs, music battles, and unforgettable memories. Your journey just got more fun.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-white/50">ROUND {round + (challenge ? 0 : 1)}</p>
                <h2 className="mt-1 text-2xl font-bold">Let the games begin!</h2>
              </div>
              <span className="rounded-full bg-cyan-300/10 px-3 py-2 text-sm text-cyan-200">
                🎯 {players.length} players
              </span>
            </div>

            <label className="mt-6 block text-sm font-semibold text-white/70">
              Choose your game
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setChallenge(null);
                    setShowAnswer(false);
                  }}
                  className={`rounded-2xl border p-3 text-left text-sm font-semibold transition ${
                    category === item
                      ? "border-fuchsia-400 bg-fuchsia-400/15 text-fuchsia-200"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/5 p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                {challenge ? category : "YOUR NEXT CHALLENGE"}
              </p>

              {challenge ? (
                <>
                  <h3 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">
                    {challenge.q}
                  </h3>
                  {showAnswer && (
                    <div className="mt-4 rounded-2xl bg-black/20 p-4 text-sm text-white/80">
                      <span className="font-bold text-fuchsia-200">Answer / hint: </span>
                      {challenge.a}
                    </div>
                  )}
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="mt-4 text-sm text-cyan-200 underline underline-offset-4"
                  >
                    {showAnswer ? "Hide answer / hint" : "Show answer / hint"}
                  </button>
                </>
              ) : (
                <>
                  <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                    Ready for some road trip fun?
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Pick a category, generate a challenge, and let the group decide who wins the point.
                  </p>
                </>
              )}

              <button
                onClick={nextChallenge}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-4 font-bold shadow-lg shadow-fuchsia-950/30 transition hover:brightness-110"
              >
                {challenge ? "🎲 Next challenge" : "✨ Generate challenge"}
              </button>

              {challenge && (
                <button
                  onClick={awardPoint}
                  className="mt-3 w-full rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 font-bold text-cyan-100 transition hover:bg-cyan-300/20"
                >
                  🏆 Award point & next player
                </button>
              )}
            </div>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-semibold transition hover:bg-white/[0.08]"
            >
              <span className="text-2xl">🎵</span>
              <span>Open Road Trip Playlist on YouTube ↗</span>
            </a>
          </section>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <p className="text-sm text-white/50">UP NEXT</p>
              <h2 className="mt-2 text-2xl font-black">
                {players[currentPlayer] || "Player"}
              </h2>
              <p className="mt-2 text-sm text-white/50">
                It&apos;s your turn! Give it your best shot.
              </p>

              <div className="mt-5 space-y-2">
                {players.map((player, index) => (
                  <div
                    key={`${player}-${index}`}
                    className={`flex items-center gap-3 rounded-xl border p-3 ${
                      index === currentPlayer
                        ? "border-fuchsia-400/40 bg-fuchsia-400/10"
                        : "border-white/5 bg-black/10"
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">{player}</span>
                    <span className="font-black text-cyan-200">{scores[player] || 0} pts</span>
                    {players.length > 2 && (
                      <button
                        onClick={() => removePlayer(index)}
                        aria-label={`Remove ${player}`}
                        className="text-white/40 hover:text-red-300"
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
                  placeholder="Add a player..."
                  maxLength={24}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm outline-none focus:border-fuchsia-400"
                />
                <button
                  onClick={addPlayer}
                  disabled={!newPlayer.trim() || players.length >= 12}
                  className="rounded-xl bg-white/10 px-4 font-bold transition hover:bg-white/20 disabled:opacity-40"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-xs text-white/35">2–12 players · Scores reset when the page refreshes.</p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 p-5 sm:p-6">
              <div className="text-3xl">🏁</div>
              <h2 className="mt-3 text-xl font-bold">Trip scoreboard</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Every correct answer or completed challenge can earn a point. Highest score wins the road trip crown!
              </p>
              <button
                onClick={resetGame}
                className="mt-5 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 hover:bg-white/10"
              >
                ↻ Reset scores & game
              </button>
            </section>

            <p className="px-2 text-xs leading-5 text-white/35">
              Safety first: the driver must focus on the road. A passenger should operate the game and handle music or phone controls. Never use a phone while driving.
            </p>
          </aside>
        </div>

        <footer className="py-10 text-center text-sm text-white/30">
          Made for the journey, powered by VYBE AI ✨
        </footer>
      </div>
    </main>
  );
}