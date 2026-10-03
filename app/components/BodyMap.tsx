"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

type Region = {
  id: string;
  title: string;
  text: string;
  problems: string[];
  pts: { x: number; y: number }[];
};

const REGIONS: Region[] = [
  {
    id: "neck",
    title: "Neck",
    text: "Stiffness, pain that spreads to the arms, or strain from long hours at a desk.",
    problems: ["Neck stiffness", "Whiplash", "Disc problems"],
    pts: [{ x: 150, y: 103 }],
  },
  {
    id: "shoulder",
    title: "Shoulder",
    text: "Pain when lifting the arm, stiffness, or injuries from sports and falls.",
    problems: ["Frozen shoulder", "Rotator cuff", "Dislocation"],
    pts: [
      { x: 98, y: 134 },
      { x: 202, y: 134 },
    ],
  },
  {
    id: "back",
    title: "Back & Spine",
    text: "Lower back pain, slip disc, sciatica or aches from poor posture.",
    problems: ["Slip disc", "Sciatica", "Posture pain"],
    pts: [{ x: 150, y: 220 }],
  },
  {
    id: "elbow",
    title: "Elbow",
    text: "Pain when gripping or lifting, common in sports and repetitive work.",
    problems: ["Tennis elbow", "Golfer's elbow", "Fracture"],
    pts: [
      { x: 62, y: 250 },
      { x: 238, y: 250 },
    ],
  },
  {
    id: "wrist",
    title: "Wrist & Hand",
    text: "Numbness, weak grip, or pain after a fall.",
    problems: ["Carpal tunnel", "Wrist fracture", "Arthritis"],
    pts: [
      { x: 44, y: 352 },
      { x: 256, y: 352 },
    ],
  },
  {
    id: "hip",
    title: "Hip",
    text: "Pain while walking, sitting or climbing stairs.",
    problems: ["Hip arthritis", "Fracture", "Hip replacement"],
    pts: [
      { x: 126, y: 322 },
      { x: 174, y: 322 },
    ],
  },
  {
    id: "knee",
    title: "Knee",
    text: "Swelling, clicking, or pain on stairs and while walking.",
    problems: ["Ligament injury", "Arthritis", "Meniscus tear", "Knee replacement"],
    pts: [
      { x: 127, y: 452 },
      { x: 173, y: 452 },
    ],
  },
  {
    id: "ankle",
    title: "Ankle & Foot",
    text: "Sprains, heel pain, or pain when you put weight on your foot.",
    problems: ["Sprain", "Heel pain", "Fracture"],
    pts: [
      { x: 122, y: 572 },
      { x: 178, y: 572 },
    ],
  },
];

const CHIP_COLORS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-peach",
];

const SKIN = "#F6D5CC";

export default function BodyMap() {
  const [activeId, setActiveId] = useState("knee");
  const active = REGIONS.find((r) => r.id === activeId) ?? REGIONS[0];

  return (
    <section className="bg-brand-off py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-brand-red font-semibold tracking-widest uppercase text-xs">
              Interactive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mt-3">
              Where Does It Hurt?
            </h2>
            <p className="text-brand-muted mt-3 max-w-xl mx-auto">
              Tap a glowing spot on the body to see how we can help.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* ---------- Body figure ---------- */}
          <Reveal>
            <div className="relative flex justify-center">
              <div className="animate-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pastel-lavender opacity-80 pointer-events-none" />

              <svg
                viewBox="0 0 300 620"
                className="relative w-full max-w-[300px]"
                role="img"
                aria-label="Human body with clickable pain points"
              >
                {/* Arms */}
                <g stroke={SKIN} strokeLinecap="round" fill="none">
                  <line x1="92" y1="135" x2="62" y2="250" strokeWidth="26" />
                  <line x1="62" y1="250" x2="42" y2="350" strokeWidth="22" />
                  <line x1="208" y1="135" x2="238" y2="250" strokeWidth="26" />
                  <line x1="238" y1="250" x2="258" y2="350" strokeWidth="22" />
                </g>
                <circle cx="40" cy="368" r="14" fill={SKIN} />
                <circle cx="260" cy="368" r="14" fill={SKIN} />

                {/* Legs */}
                <rect x="108" y="335" width="38" height="120" rx="19" fill={SKIN} />
                <rect x="154" y="335" width="38" height="120" rx="19" fill={SKIN} />
                <rect x="110" y="448" width="34" height="124" rx="17" fill={SKIN} />
                <rect x="156" y="448" width="34" height="124" rx="17" fill={SKIN} />
                <ellipse cx="120" cy="590" rx="26" ry="12" fill={SKIN} />
                <ellipse cx="180" cy="590" rx="26" ry="12" fill={SKIN} />

                {/* Torso + pelvis */}
                <path
                  d="M100 122 Q150 108 200 122 Q214 130 210 160 L198 300 Q150 318 102 300 L90 160 Q86 130 100 122 Z"
                  fill={SKIN}
                />
                <rect x="102" y="286" width="96" height="64" rx="30" fill={SKIN} />

                {/* Neck + head */}
                <rect x="138" y="90" width="24" height="30" rx="10" fill={SKIN} />
                <circle cx="150" cy="60" r="34" fill={SKIN} />
                <circle cx="138" cy="58" r="3" fill="#4a3a3a" />
                <circle cx="162" cy="58" r="3" fill="#4a3a3a" />
                <path
                  d="M141 72 Q150 80 159 72"
                  stroke="#4a3a3a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Hotspots */}
                {REGIONS.flatMap((r) =>
                  r.pts.map((p, i) => {
                    const isActive = r.id === activeId;
                    return (
                      <g
                        key={`${r.id}-${i}`}
                        role="button"
                        tabIndex={0}
                        aria-label={r.title}
                        className="cursor-pointer outline-none"
                        onMouseEnter={() => setActiveId(r.id)}
                        onFocus={() => setActiveId(r.id)}
                        onClick={() => setActiveId(r.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setActiveId(r.id);
                        }}
                      >
                        <circle cx={p.x} cy={p.y} r="22" fill="transparent" />
                        {isActive && (
                          <circle cx={p.x} cy={p.y} r="20" fill="#C8102E" opacity="0.15" />
                        )}
                        <circle cx={p.x} cy={p.y} r="9" fill="#C8102E" opacity="0.45">
                          <animate
                            attributeName="r"
                            values="9;22;9"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.5;0;0.5"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isActive ? 10 : 7}
                          fill="#C8102E"
                          stroke="#fff"
                          strokeWidth="3"
                        />
                      </g>
                    );
                  })
                )}
              </svg>
            </div>
          </Reveal>

          {/* ---------- Info panel ---------- */}
          <Reveal delay={150}>
            <div>
              <div
                key={active.id}
                className="animate-fade-in bg-white rounded-3xl shadow-lg p-8"
              >
                <span className="inline-block bg-pastel-pink text-brand-red text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Selected area
                </span>
                <h3 className="text-2xl font-bold text-brand-ink mt-4">
                  {active.title}
                </h3>
                <p className="text-brand-muted mt-3">{active.text}</p>

                <p className="text-xs font-bold tracking-widest uppercase text-brand-ink mt-6">
                  Common problems
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {active.problems.map((p, i) => (
                    <span
                      key={p}
                      className={`${CHIP_COLORS[i % CHIP_COLORS.length]} text-brand-ink text-sm font-medium px-4 py-1.5 rounded-full`}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-8">
                  <Link
                    href="/booking"
                    className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                  >
                    Book a Consultation
                  </Link>
                  <Link
                    href="/services"
                    className="border border-brand-ink/20 hover:border-brand-red hover:text-brand-red text-brand-ink px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                  >
                    View Services
                  </Link>
                </div>

                <p className="text-xs text-brand-muted mt-6">
                  This is general information, not a diagnosis. Book a
                  consultation for proper advice.
                </p>
              </div>

              {/* Tabs (mobile pe aasani ke liye) */}
              <div className="flex flex-wrap gap-2 mt-6">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveId(r.id)}
                    className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
                      r.id === activeId
                        ? "bg-brand-red text-white"
                        : "bg-pastel-lavender text-brand-ink hover:bg-pastel-pink"
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}