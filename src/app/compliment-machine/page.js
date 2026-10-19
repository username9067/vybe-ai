
"use client";

import { useState } from "react";

const complimentStyles = {
  Hype: [
    "You're not entering your era. You're defining it. 🔥",
    "Your energy deserves its own spotlight.",
    "You're proof that confidence can change the whole room.",
    "Main character energy. No audition required.",
    "You're doing better than your doubts want you to believe.",
  ],
  Funny: [
    "You're a limited edition. The factory cannot recreate this chaos. 😂",
    "Your vibe has more plot twists than a Netflix series.",
    "You're the reason the group chat is never boring.",
    "You're 90% iconic and 10% looking for your phone.",
    "If being unforgettable were a sport, you'd need a bigger trophy.",
  ],
  Wholesome: [
    "You make ordinary moments feel a little more special. 💗",
    "Your presence can make someone feel less alone.",
    "You deserve the same kindness you give everyone else.",
    "There is something lovely about the way you keep going.",
    "You don't have to be perfect to be deeply appreciated.",
  ],
  Confidence: [
    "You are allowed to take up space and be proud of who you are.",
    "You have survived every difficult day you've faced so far.",
    "Your potential is bigger than one bad day.",
    "You don't need everyone's approval to believe in yourself.",
    "You are becoming someone your past self would admire.",
  ],
  Friendship: [
    "You're the friend people remember long after the day ends. 🫶",
    "You bring a special kind of fun to the people around you.",
    "Life is better with someone like you in the group.",
    "You know how to make memories out of little things.",
    "Your friendship is a gift, not a small thing.",
  ],
};

const styles = Object.keys(complimentStyles);

export default function ComplimentMachinePage() {
  const [style, setStyle] = useState("Hype");
  const [name, setName] = useState("");
  const [compliment, setCompliment] = useState("");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  function generateCompliment() {
    const options = complimentStyles[style].filter(
      (item) => item !== compliment
    );
    const next =
      options[Math.floor(Math.random() * options.length)] ||
      complimentStyles[style][0];

    const message = name.trim()
      ? `${name.trim()}, ${next.charAt(0).toLowerCase()}${next.slice(1)}`
      : next;

    setCompliment(message);
    setHistory((previous) => [message, ...previous].slice(0, 5));
    setCopied(false);
  }

  async function copyCompliment() {
    try {
      await navigator.clipboard.writeText(compliment);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function shareCompliment() {
    const text = `${compliment}\n\nMade with VYBE AI ✨`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "A little VYBE", text });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#100817] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-fuchsia-300 transition hover:text-white"
        >
          <span>←</span> Back to VYBE
        </a>

        <header className="mb-9 mt-8 text-center">
          <div className="mb-4 inline-block rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
            ✨ YOUR DAILY DOSE OF AWESOME
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Compliment{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              Machine
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Need a confidence boost? Want to hype up a friend? Let the good
            vibes begin.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-fuchsia-950/20 sm:p-8">
          <label className="mb-3 block text-sm font-semibold text-gray-300">
            CHOOSE YOUR COMPLIMENT VYBE
          </label>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {styles.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setStyle(item);
                  setCompliment("");
                  setCopied(false);
                }}
                className={`rounded-2xl border px-3 py-4 text-sm font-bold transition ${
                  style === item
                    ? "border-fuchsia-400 bg-fuchsia-500/20 text-white"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-fuchsia-300/50 hover:text-white"
                }`}
              >
                {item === "Hype" && "🔥 "}
                {item === "Funny" && "😂 "}
                {item === "Wholesome" && "💗 "}
                {item === "Confidence" && "👑 "}
                {item === "Friendship" && "🫶 "}
                {item}
              </button>
            ))}
          </div>

          <label className="mb-2 block text-sm font-semibold text-gray-300">
            WHO'S GETTING THE LOVE? (OPTIONAL)
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={35}
            placeholder="Enter a name..."
            className="mb-6 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-gray-600 focus:border-fuchsia-400"
          />

          <button
            onClick={generateCompliment}
            className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 px-6 py-4 font-black transition hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]"
          >
            ✨ Generate My Compliment
          </button>

          {compliment && (
            <div className="mt-6 rounded-3xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 p-6 text-center sm:p-8">
              <div className="text-4xl">💌</div>
              <p className="mt-4 text-xl font-bold leading-relaxed sm:text-2xl">
                {compliment}
              </p>
              <p className="mt-4 text-xs tracking-widest text-gray-500">
                A LITTLE REMINDER FROM VYBE AI
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={copyCompliment}
                  className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
                <button
                  onClick={shareCompliment}
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-950 transition hover:bg-fuchsia-100"
                >
                  ↗ Share the Love
                </button>
                <button
                  onClick={generateCompliment}
                  className="rounded-xl border border-fuchsia-400/40 px-5 py-3 text-sm font-semibold text-fuchsia-200 transition hover:bg-fuchsia-500/10"
                >
                  🔄 Another One
                </button>
              </div>
            </div>
          )}
        </section>

        {history.length > 0 && (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Your recent good vibes 💫</h2>
              <button
                onClick={() => setHistory([])}
                className="text-sm text-gray-500 hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-gray-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-xs text-gray-600">
          Be kind to yourself. Pass the good vibes along. 💜
        </p>
      </div>
    </main>
  );
}
