
"use client";

import { useState } from "react";

export default function AIFriendPage() {
  const [mood, setMood] = useState("Bored");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hey! ✨ I'm your Vybe AI friend. Tell me how you're feeling or what you want to do, and let's find your next vibe!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const moods = [
    "Bored",
    "Low energy",
    "Sad",
    "Stressed",
    "Excited",
    "Calm",
  ];

  async function sendMessage(event) {
    event.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: userMessage },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          mood,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.reply },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error.message ||
            "Oops! I couldn't connect right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#10091d] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-fuchsia-300"
        >
          ← Back to Vybe AI
        </a>

        <header className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 text-3xl shadow-lg shadow-fuchsia-950/30">
            ✨
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            Your personal AI companion
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Meet Your <span className="text-fuchsia-400">Vybe</span>
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/60 sm:text-base">
            Need ideas, a mini adventure, a conversation starter, or just a
            fresh vibe? Tell me what's on your mind.
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <p className="mb-3 text-sm font-semibold text-white/80">
              How are you feeling?
            </p>
            <div className="flex flex-wrap gap-2">
              {moods.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMood(item)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    mood === item
                      ? "border-fuchsia-400 bg-fuchsia-500/20 text-white"
                      : "border-white/10 bg-white/5 text-white/65 hover:border-white/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div
            className="flex min-h-80 flex-col gap-4 p-4 sm:p-6"
            aria-live="polite"
          >
            {messages.map((item, index) => (
              <div
                key={`${index}-${item.role}`}
                className={`flex ${
                  item.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 sm:text-base ${
                    item.role === "user"
                      ? "rounded-br-sm bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                      : "rounded-bl-sm border border-white/10 bg-white/[0.07] text-white/90"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="self-start rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-cyan-200">
                Vybe is thinking...
              </div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="border-t border-white/10 p-4 sm:p-5"
          >
            <label htmlFor="vybe-message" className="sr-only">
              Your message
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id="vybe-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="I'm bored at home. Give me something fun to do..."
                maxLength={2000}
                rows={2}
                className="min-w-0 flex-1 resize-y rounded-2xl border border-white/10 bg-[#171026] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-fuchsia-400"
              />
              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 px-4 py-3 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "..." : "Send ↗"}
              </button>
            </div>
            <p className="mt-3 text-xs text-white/35">
              Vybe AI can make mistakes. Avoid sharing passwords or sensitive
              personal information.
            </p>
          </form>
        </section>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {[
            "Give me a fun challenge",
            "Plan a mini adventure",
            "Help me reset my mood",
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setMessage(suggestion)}
              className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-cyan-300/50 hover:text-cyan-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
