"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const INFO = [
  { icon: "📍", label: "Address", value: "[Clinic Address], Sahiwal", bg: "bg-pastel-blue" },
  { icon: "📞", label: "Phone", value: "[Phone Number]", bg: "bg-pastel-pink" },
  { icon: "🕐", label: "Timings", value: "Mon–Sat, 10AM–6PM", bg: "bg-pastel-yellow" },
  { icon: "✉️", label: "Email", value: "[Email Address]", bg: "bg-pastel-mint" },
];

const inputClass =
  "mt-1 w-full rounded-xl border-2 border-transparent bg-brand-off px-4 py-3 text-sm focus:outline-none focus:border-brand-red focus:bg-white transition-colors";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 px-6">
      <div className="animate-blob absolute -top-24 -right-24 w-80 h-80 bg-pastel-lavender opacity-60 pointer-events-none" />
      <div className="animate-blob absolute -bottom-28 -left-24 w-96 h-96 bg-pastel-mint opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-4">
              Visit Our Clinic
            </h2>
            <p className="text-brand-muted mt-4 max-w-xl mx-auto">
              Have a question or want to schedule a visit? Reach out or find
              us at the clinic.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* ---------- Info + Map ---------- */}
          <Reveal className="h-full">
            <div className="flex flex-col gap-6 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INFO.map((item) => (
                  <div
                    key={item.label}
                    className={`group lift-card ${item.bg} rounded-2xl p-5`}
                  >
                    <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      {item.icon}
                    </span>
                    <p className="text-sm font-bold text-brand-ink mt-3">
                      {item.label}
                    </p>
                    <p className="text-brand-ink/70 text-xs mt-1">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative flex-1 rounded-3xl overflow-hidden border-4 border-white shadow-xl min-h-[260px]">
                <iframe
                  title="Clinic Location"
                  className="w-full h-full min-h-[260px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Sahiwal,Pakistan&output=embed"
                />
                <span className="pointer-events-none absolute top-3 left-3 bg-white rounded-full shadow-md px-4 py-1.5 text-xs font-semibold text-brand-ink">
                  📍 Find us here
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---------- Contact Form ---------- */}
          <Reveal delay={150} className="h-full">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-brand-ink/5 p-8 flex flex-col gap-4 h-full"
            >
              <span
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: "linear-gradient(90deg, #C8102E, #E8538F)",
                }}
              />
              <div>
                <h3 className="text-xl font-bold text-brand-ink">
                  Send us a message
                </h3>
                <p className="text-brand-muted text-sm mt-1">
                  We&apos;ll get back to you as soon as we can.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-brand-ink">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className={inputClass}
                  onChange={() => setSent(false)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-ink">
                  Phone / Email
                </label>
                <input
                  type="text"
                  placeholder="How can we reach you"
                  className={inputClass}
                  onChange={() => setSent(false)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-ink">
                  Message
                </label>
                <textarea
                  placeholder="Tell us briefly what you need"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  onChange={() => setSent(false)}
                />
              </div>

              {sent && (
                <p className="text-sm px-4 py-3 rounded-xl bg-pastel-mint text-brand-ink">
                  ✅ Thank you! Your message has been received.
                </p>
              )}

              <button
                type="submit"
                className="mt-2 text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(90deg, #C8102E, #E8538F)",
                }}
              >
                Send Message <span className="inline-block animate-arrow">→</span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}