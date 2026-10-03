"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  from: "bot" | "user";
  text: string;
};

type GeminiTurn = {
  role: "user" | "model";
  parts: { text: string }[];
};

const QUICK_REPLIES = [
  { text: "What services do you offer?", icon: "🦴", bg: "bg-pastel-blue" },
  { text: "Clinic timings?", icon: "🕙", bg: "bg-pastel-yellow" },
  { text: "Where are you located?", icon: "📍", bg: "bg-pastel-mint" },
  { text: "How do I book an appointment?", icon: "📅", bg: "bg-pastel-pink" },
];

const GRAD = { background: "linear-gradient(135deg, #C8102E, #E8538F)" };

function BoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g transform="rotate(-45 20 20)" fill="#ffffff">
        <rect x="9" y="18" width="22" height="4" rx="2" />
        <circle cx="9" cy="17" r="4" />
        <circle cx="9" cy="23" r="4" />
        <circle cx="31" cy="17" r="4" />
        <circle cx="31" cy="23" r="4" />
      </g>
    </svg>
  );
}

function BotAvatar() {
  return (
    <span
      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm"
      style={GRAD}
    >
      <BoneIcon className="w-4 h-4" />
    </span>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! 👋 I'm here to help. Ask me about our services, timings, location, or how to book an appointment.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  // "Need help?" bubble: thori der baad nikalta hai, phir khud chala jata hai
  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), 3500);
    const hide = setTimeout(() => setShowHint(false), 12000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  function toggleOpen() {
    setOpen((o) => !o);
    setShowHint(false);
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { from: "user", text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Build history for Gemini (skip the initial static greeting)
    const history: GeminiTurn[] = messages.slice(1).map((m) => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();

      const botText = res.ok
        ? data.reply
        : "Sorry, something went wrong. Please try again or contact the clinic directly.";

      setMessages((prev) => [...prev, { from: "bot", text: botText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes chat-msg-in {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to { opacity: 1; transform: none; }
        }
        .chat-msg { animation: chat-msg-in 0.3s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .chat-msg { animation: none; }
        }
      `}</style>

      {/* Floating button (upar-neeche tairta hai) */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`relative ${open ? "" : "animate-float"}`}>
          {/* "Need help?" hint bubble */}
          {showHint && !open && (
            <div className="absolute right-[4.25rem] top-1/2 -translate-y-1/2 whitespace-nowrap">
              <div className="animate-fade-in bg-white text-brand-ink text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-lg border border-brand-ink/5">
                Need help? Ask me 👋
              </div>
            </div>
          )}

          <button
            onClick={toggleOpen}
            className={`relative w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
              open ? "" : "animate-pulse-ring"
            }`}
            style={GRAD}
            aria-label={open ? "Close chat" : "Open chat"}
          >
            <span
              className={`absolute text-2xl leading-none transition-all duration-300 ${
                open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              }`}
            >
              ✕
            </span>
            <span
              className={`absolute text-2xl leading-none transition-all duration-300 ${
                open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
              }`}
            >
              💬
            </span>
          </button>

          {/* Notification dot */}
          {showHint && !open && (
            <span className="absolute -top-0.5 -right-0.5 flex w-4 h-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5B83D] opacity-75" />
              <span className="relative inline-flex w-4 h-4 rounded-full bg-[#F5B83D] border-2 border-white" />
            </span>
          )}
        </div>
      </div>

      {/* Chat panel (hamesha mount, class se smooth open/close) */}
      <div
        aria-hidden={!open}
        className={`fixed bottom-24 right-6 z-50 w-[22rem] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-brand-ink/10 flex flex-col overflow-hidden origin-bottom-right transition-all duration-300 ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
        style={{
          visibility: open ? "visible" : "hidden",
          transitionProperty: "opacity, transform, visibility",
          transitionDelay: open ? "0s" : "0s, 0s, 0.3s",
        }}
      >
        {/* Header */}
        <div className="relative overflow-hidden text-white px-4 py-3.5" style={{ background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)" }}>
          <div className="animate-blob absolute -top-8 -right-6 w-28 h-28 bg-white opacity-10 pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <span className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <BoneIcon className="w-6 h-6" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white" />
            </span>
            <div>
              <p className="font-bold text-sm">Clinic Assistant</p>
              <p className="text-white/85 text-xs">Online · Usually replies instantly</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 max-h-[50vh] sm:max-h-80 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-brand-off"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-msg flex items-end gap-2 ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.from === "bot" && <BotAvatar />}
              <div
                className={`max-w-[80%] text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  m.from === "bot"
                    ? "bg-white text-brand-ink shadow-sm rounded-bl-sm"
                    : "text-white shadow-md rounded-br-sm"
                }`}
                style={m.from === "user" ? GRAD : undefined}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg flex items-end gap-2">
              <BotAvatar />
              <div className="bg-white shadow-sm rounded-2xl rounded-bl-sm px-3.5 py-3">
                <span className="inline-flex gap-1.5">
                  <span className="w-2 h-2 bg-brand-red rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-[#E8538F] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-[#F5B83D] rounded-full animate-bounce" />
                </span>
              </div>
            </div>
          )}

          {/* Quick replies - only shown before user has typed anything */}
          {messages.length === 1 && !loading && (
            <div className="flex flex-col items-start gap-2 mt-1">
              {QUICK_REPLIES.map((q, idx) => (
                <button
                  key={q.text}
                  onClick={() => sendMessage(q.text)}
                  className={`chat-msg chip ${q.bg} text-left text-xs font-medium text-brand-ink rounded-full px-4 py-2`}
                  style={{ animationDelay: `${300 + idx * 120}ms` }}
                >
                  {q.icon} {q.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2 border-t border-brand-ink/10 p-3 bg-white"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            tabIndex={open ? 0 : -1}
            className="flex-1 text-sm px-4 py-2.5 rounded-full bg-brand-off border-2 border-transparent focus:outline-none focus:border-brand-red focus:bg-white transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading}
            tabIndex={open ? 0 : -1}
            className="text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
            style={GRAD}
            aria-label="Send"
          >
            →
          </button>
        </form>
      </div>
    </>
  );
}