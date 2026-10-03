import { NextRequest, NextResponse } from "next/server";
import { SERVICES } from "../../lib/services-data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.5-flash-lite",
];

const ATTEMPTS_PER_MODEL = 2;
const RETRYABLE_STATUS = [429, 500, 503, 504];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type GeminiPart = {
  text?: string;
  thought?: boolean;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
};

function buildSystemPrompt() {
  const servicesList = SERVICES.map(
    (s) => `- ${s.title}: ${s.shortDescription}`
  ).join("\n");

  return `You are the customer support assistant for an orthopedic doctor's clinic website (Dr. Agha Khan, based in Sahiwal, Pakistan).

Clinic information you know:
Services offered:
${servicesList}

Clinic timings: Monday–Saturday, 10:00 AM – 6:00 PM
Location: Sahiwal, Pakistan
Booking: Patients can book appointments using the "Book Now" button on the website, which requires creating an account.

Rules you MUST follow:
1. Only answer questions related to this clinic: its services, doctor, timings, location, booking process, or general orthopedic topics relevant to deciding whether to visit.
2. If the person asks something unrelated to this clinic or orthopedic care (general knowledge, coding, other topics), politely decline and redirect them back to how you can help with the clinic.
3. Do not give specific medical diagnoses or treatment advice — encourage them to book a consultation for that.
4. Keep replies short, friendly, and conversational (2-4 sentences max).
5. If you don't know something specific (like exact fees), say so and suggest contacting the clinic directly or booking a consultation.`;
}

async function callGemini(model: string, body: string) {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY as string,
      },
      body,
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Chat is not configured." },
        { status: 500 }
      );
    }

    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const contents = [
      ...(Array.isArray(history) ? history : []),
      { role: "user", parts: [{ text: message }] },
    ];

    const body = JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemPrompt() }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.6,
      },
    });

    let data: GeminiResponse | null = null;

    outer: for (const model of MODELS) {
      for (let attempt = 1; attempt <= ATTEMPTS_PER_MODEL; attempt++) {
        const res = await callGemini(model, body);

        if (res.ok) {
          data = (await res.json()) as GeminiResponse;
          console.log(`Gemini OK with model: ${model}`);
          break outer;
        }

        const errText = await res.text();

        console.error(
          `Gemini error [${model}] attempt ${attempt} status ${res.status}:`,
          errText
        );

        if (RETRYABLE_STATUS.includes(res.status)) {
          if (attempt < ATTEMPTS_PER_MODEL) {
            await sleep(800 * attempt);
          }
          continue;
        }

        break;
      }
    }

    if (!data) {
      return NextResponse.json(
        { error: "Sorry, I couldn't process that. Please try again." },
        { status: 502 }
      );
    }

    const parts = data?.candidates?.[0]?.content?.parts;

    const reply =
      (Array.isArray(parts)
        ? parts
            .filter(
              (p: GeminiPart) =>
                typeof p.text === "string" && !p.thought
            )
            .map((p: GeminiPart) => p.text)
            .join("")
            .trim()
        : "") || "Sorry, I couldn't understand that. Could you rephrase?";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("Chat error:", err);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}