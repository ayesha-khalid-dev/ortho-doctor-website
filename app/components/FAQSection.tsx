"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Do I need a referral to book an appointment?",
    a: "No, you can book directly with us — no referral required for a first consultation.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Please bring any previous medical records, X-rays or scans, and a list of current medications.",
  },
  {
    q: "Do you accept walk-in patients?",
    a: "We recommend booking in advance to avoid wait times, but urgent cases are accommodated where possible.",
  },
  {
    q: "Is online/video consultation available?",
    a: "Yes, video consultations can be arranged for follow-ups — contact us to schedule one.",
  },
];

const COLORS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-yellow",
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-brand-off py-20 px-6">
      <div className="animate-blob absolute -top-20 -left-20 w-72 h-72 bg-pastel-peach opacity-60 pointer-events-none" />
      <div className="animate-blob absolute -bottom-24 -right-20 w-80 h-80 bg-pastel-lavender opacity-60 pointer-events-none" />

      {/* Floating question marks */}
      <span
        aria-hidden="true"
        className="animate-float absolute top-[14%] left-[8%] text-7xl font-extrabold text-brand-red/10 select-none"
      >
        ?
      </span>
      <span
        aria-hidden="true"
        className="animate-float-slow absolute bottom-[12%] right-[8%] text-8xl font-extrabold text-brand-red/10 select-none"
      >
        ?
      </span>

      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block bg-pastel-yellow text-brand-ink font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
              FAQs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-4">
              Common Questions
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 100}>
                <div
                  className={`rounded-2xl overflow-hidden transition-shadow duration-300 ${
                    isOpen ? "shadow-xl" : "shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center gap-4 text-left px-5 py-4 ${
                      COLORS[i % COLORS.length]
                    }`}
                  >
                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-sm font-bold text-brand-red shrink-0">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-semibold text-brand-ink text-sm">
                      {item.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-red text-xl shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 bg-white"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-brand-muted text-sm px-6 py-5 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}