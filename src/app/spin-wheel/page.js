
"use client";

import { useState } from "react";

const wheelModes = {
  "Random Fun": [
    { label: "Tell a joke", emoji: "😂" },
    { label: "Dance break", emoji: "💃" },
    { label: "Sing a song", emoji: "🎤" },
    { label: "Draw something", emoji: "🎨" },
    { label: "Tell a story", emoji: "📖" },
    { label: "Do a quiz", emoji: "🧠" },
    { label: "Strike a pose", emoji: "📸" },
    { label: "Pick a new song", emoji: "🎧" },
  ],
  "Party Mode": [
    { label: "Funny impression", emoji: "🎭" },
    { label: "Quick dance", emoji: "💃" },
    { label: "Rapid-fire questions", emoji: "⚡" },
    { label: "Make someone laugh", emoji: "🤣" },
    { label: "Invent a handshake", emoji: "🤝" },
    { label: "Sing a chorus", emoji: "🎤" },
    { label: "Tell an awkward story", emoji: "😅" },
    { label: "Group selfie pose", emoji: "📸" },
  ],
  "Chill Vibes": [
    { label: "Take five deep breaths", emoji: "🌿" },
    { label: "Listen to a calm song", emoji: "🎧" },
    { label: "Write one happy thought", emoji: "💗" },
    { label: "Stretch for a minute", emoji: "🧘" },
    { label: "Enjoy a screen break", emoji: "☁️" },
    { label: "Think of a favourite memory", emoji: "🌅" },
    { label: "Get a glass of water", emoji: "💧" },
    { label: "Look outside for a moment", emoji: "🌙" },
  ],
  "Creative Mode": [
    { label: "Invent a new app", emoji: "💡" },
    { label: "Write a six-word story", emoji: "✍️" },
    { label: "Create a superhero", emoji: "🦸" },
    { label: "Design a dream room", emoji: "🏡" },
    { label: "Make up a new holiday", emoji: "🎉" },
    { label: "Draw with your eyes closed", emoji: "🎨" },
    { label: "Invent a new snack", emoji: "🍿" },
    { label: "Create a movie title", emoji: "🎬" },
  ],
};

const colors = [
  "#d946ef",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#6366f1",
  "#0d9488",
  "#9333ea",
  "#be185d",
];

export default function SpinWheelPage() {
  const [mode, setMode] = useState("Random Fun");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [spinCount, setSpinCount] = useState(0);

  const items = wheelModes[mode];
  const segmentAngle = 360 / items.length;

  function spinWheel() {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const winnerIndex = Math.floor(Math.random() * items.length);
    const extraTurns = 360 * (5 + Math.floor(Math.random() * 3));
    const targetAngle = 360 - (winnerIndex * segmentAngle + segmentAngle / 2);
    const newRotation = rotation + extraTurns + targetAngle;

    setRotation(newRotation);

    window.setTimeout(() => {
      setResult(items[winnerIndex]);
      setSpinning(false);
      setSpinCount((previous) => previous + 1);
    }, 3200);
  }

  function changeMode(nextMode) {
    if (spinning) return;
    setMode(nextMode);
    setResult(null);
    setRotation(0);
    setCompleted([]);
  }

  function markComplete() {
    if (!result) return;
    setCompleted((previous) =>
      previous.includes(result.label)
        ? previous
        : [...previous, result.label]
    );
  }

  return (
    <main className="min-h-screen bg-[#100817] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-fuchsia-300 hover:text-cyan-300">
          ← Back to VYBE
        </a>

        <header className="py-10 text-center">
          <div className="text-5xl">🎡</div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            LET FATE PICK YOUR NEXT MOVE
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Spin the <span className="text-fuchsia-400">Wheel</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Can't decide what to do? Give the wheel control.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-center text-xl font-bold">Choose your wheel</h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Object.keys(wheelModes).map((item) => (
              <button
                key={item}
                onClick={() => changeMode(item)}
                disabled={spinning}
                className={`rounded-xl border p-3 text-sm font-bold transition disabled:opacity-50 ${
                  mode === item
                    ? "border-fuchsia-400 bg-fuchsia-500/15"
                    : "border-white/10 hover:border-fuchsia-400/50"
                }`}
              >
                {item === "Random Fun" && "🎲 "}
                {item === "Party Mode" && "🎉 "}
                {item === "Chill Vibes" && "🌿 "}
                {item === "Creative Mode" && "🎨 "}
                {item}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <div className="relative mx-auto aspect-square w-full max-w-[360px]">
              <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 text-4xl drop-shadow-lg">
                ▼
              </div>

              <div
                className="absolute inset-2 overflow-hidden rounded-full border-4 border-white/80 shadow-[0_0_45px_rgba(217,70,239,0.22)]"
                style={{
                  background: `conic-gradient(${items
                    .map((item, index) => {
                      const start = index * segmentAngle;
                      const end = (index + 1) * segmentAngle;
                      return `${colors[index]} ${start}deg ${end}deg`;
                    })
                    .join(", ")})`,
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning
                    ? "transform 3.2s cubic-bezier(0.12, 0.72, 0.12, 1)"
                    : "none",
                }}
              >
                {items.map((item, index) => {
                  const angle = index * segmentAngle + segmentAngle / 2;

                  return (
                    <div
                      key={item.label}
                      className="absolute left-1/2 top-1/2 flex w-[44%] -translate-y-1/2 items-center gap-1 text-white"
                      style={{
                        transform: `rotate(${angle}deg) translateX(8%)`,
                        transformOrigin: "0% 50%",
                      }}
                    >
                      <span className="text-base sm:text-xl">{item.emoji}</span>
                      <span className="max-w-[80px] text-[9px] font-black leading-tight drop-shadow sm:text-xs">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#160b20] text-2xl shadow-lg">
                ✦
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={spinWheel}
              disabled={spinning}
              className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-10 py-4 text-lg font-black shadow-lg transition hover:scale-105 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {spinning ? "🌀 Spinning..." : "🎡 SPIN THE WHEEL"}
            </button>
            <p className="mt-3 text-sm text-gray-500">
              Spins completed: {spinCount}
            </p>
          </div>

          {result && (
            <div className="mt-8 rounded-2xl border border-fuchsia-400/30 bg-[#1b1025] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                THE WHEEL HAS SPOKEN
              </p>
              <div className="mt-3 text-5xl">{result.emoji}</div>
              <h3 className="mt-3 text-2xl font-black text-fuchsia-300">
                {result.label}
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Your next VYBE mission starts now.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  onClick={markComplete}
                  className="rounded-xl bg-cyan-300 px-5 py-3 font-bold text-[#100817] hover:bg-cyan-200"
                >
                  {completed.includes(result.label)
                    ? "✓ Mission completed"
                    : "✓ I did it"}
                </button>
                <button
                  onClick={spinWheel}
                  className="rounded-xl border border-white/15 px-5 py-3 font-bold hover:bg-white/5"
                >
                  Spin Again ↻
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">🏆 Your missions</h2>
              <p className="mt-1 text-sm text-gray-400">
                Complete challenges to build your list.
              </p>
            </div>
            <span className="rounded-xl bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-300">
              {completed.length} completed
            </span>
          </div>

          {completed.length === 0 ? (
            <p className="mt-5 rounded-xl border border-dashed border-white/15 p-5 text-center text-sm text-gray-500">
              Your completed missions will appear here.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {completed.map((mission) => (
                <li
                  key={mission}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm"
                >
                  <span className="mr-2 text-cyan-300">✓</span>
                  {mission}
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="py-10 text-center text-sm text-gray-500">
          Stop overthinking. Start spinning. 💜
        </footer>
      </div>
    </main>
  );
}