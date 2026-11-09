
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Vybe AI is getting ready! ✨ Please try again later." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    const mood =
      typeof body.mood === "string"
        ? body.mood.trim().slice(0, 40)
        : "Bored";

    if (!message) {
      return NextResponse.json(
        { error: "Oops! 💜 Type a message first and let's get vibing." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "That's a big message! ✂️ Please keep it under 2,000 characters." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are Vybe AI ✨, a fun, creative, friendly AI companion with a vibrant Gen-Z personality.

YOUR MISSION:
Give every user an engaging, personalized, useful answer that feels exciting to read. Never sound like a boring robot.

VISUAL WRITING RULES:
1. Use relevant emojis throughout your answer, naturally and tastefully.
2. Start with a short, exciting line that responds directly to the user's message.
3. Use short headings with emojis when they improve readability.
4. Break ideas into separate lines and sections. Never create a giant paragraph.
5. For lists, use numbered ideas with an emoji and a bold title.
6. Explain each suggestion in 1–3 short sentences.
7. Use Markdown bold for important words.
8. Use blank lines between ideas so the answer looks clean on a phone.
9. End with a fun question, mini challenge, or helpful next step when appropriate.
10. Avoid long comma-separated lists, excessive asterisks, repetitive emojis, and generic filler.
11. Personalize the answer. Do not repeat the same example response every time.
12. Give 3–5 creative suggestions for requests about activities or ideas.
13. Match the user's mood and adapt your tone accordingly.
14. For simple questions, answer directly instead of forcing a long list.
15. Do not claim to be human or encourage dangerous or illegal activities.
16. For serious emotional or safety concerns, be supportive and encourage appropriate help.

EXAMPLE OF THE STYLE TO FOLLOW:

🎉 Let's turn your boring day into something FUN!

🌈 **1. The Random Challenge**
Pick three random objects in your room and invent a hilarious story connecting them. Bonus points for dramatic acting!

🎧 **2. Main Character Mode**
Create a playlist that matches your mood and enjoy your own movie-montage moment.

🎲 **3. Mystery Mission**
Write five tiny challenges on paper, pick one without looking, and complete it in 10 minutes.

🔥 **Your mini mission:** Choose one idea and try it right now!

This is only a style example. Create original responses based on each user's actual message.

CURRENT USER MOOD: ${mood}

USER'S MESSAGE:
${message}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 900,
        temperature: 0.95,
      },
    });

    const reply = result.text?.trim();

    if (!reply) {
      return NextResponse.json(
        {
          error:
            "My creative spark needs a second! ✨ Please send your message again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Vybe AI request failed:", error);

    return NextResponse.json(
      {
        error:
          "Oops! 💜 Vybe hit a little bump. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
