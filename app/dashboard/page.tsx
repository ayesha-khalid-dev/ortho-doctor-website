"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reveal from "../components/Reveal";

const TIPS = [
  "Short daily walks keep your joints flexible and your muscles strong.",
  "Sit with your back supported and your feet flat on the floor to ease back strain.",
  "Warm up for a few minutes before exercise to lower the chance of sprains.",
  "Calcium and vitamin D from food and sunlight help keep bones strong.",
  "Take a stretch break every hour if you sit at a desk for long periods.",
];

const STATS = [
  { icon: "📅", label: "Upcoming", value: 0, bg: "bg-pastel-blue" },
  { icon: "🗂️", label: "Past Visits", value: 0, bg: "bg-pastel-pink" },
  { icon: "📄", label: "Saved Reports", value: 0, bg: "bg-pastel-mint" },
];

const ACTIONS = [
  { icon: "📅", title: "Book Appointment", text: "Pick a service and time.", href: "/booking", bg: "bg-pastel-lavender" },
  { icon: "🦴", title: "Our Services", text: "See what we treat.", href: "/services", bg: "bg-pastel-peach" },
  { icon: "📍", title: "Contact Clinic", text: "Timings and directions.", href: "/contact", bg: "bg-pastel-yellow" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [tip, setTip] = useState(TIPS[0]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setEmail(data?.user?.email ?? null))
      .catch(() => {});
    setTip(TIPS[new Date().getDate() % TIPS.length]);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <main className="relative overflow-hidden flex-1 bg-brand-off px-6 py-12">
      <div className="animate-blob absolute -top-24 -right-24 w-96 h-96 bg-pastel-lavender opacity-60 pointer-events-none" />
      <div className="animate-blob absolute bottom-0 -left-24 w-80 h-80 bg-pastel-mint opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ---------- Welcome banner ---------- */}
        <div
          className="animate-fade-in relative overflow-hidden rounded-3xl p-8 text-white"
          style={{
            background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)",
          }}
        >
          <div className="animate-blob absolute -top-16 -left-10 w-56 h-56 bg-white opacity-10 pointer-events-none" />
          <div className="animate-blob absolute -bottom-20 right-24 w-64 h-64 bg-white opacity-10 pointer-events-none" />
          <span
            aria-hidden="true"
            className="animate-float absolute top-6 right-[38%] text-2xl font-bold text-white/40 select-none"
          >
            +
          </span>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <span className="animate-float w-16 h-16 rounded-2xl bg-white text-brand-red flex items-center justify-center text-2xl font-extrabold shadow-lg shrink-0">
                {email ? email[0].toUpperCase() : "👋"}
              </span>
              <div>
                <span className="text-white/80 font-semibold tracking-widest uppercase text-xs">
                  Patient Dashboard
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-1">
                  Welcome back 👋
                </h1>
                <p className="text-white/90 text-sm mt-1 truncate max-w-xs md:max-w-md">
                  {email ?? "Here's an overview of your appointments."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="bg-white text-brand-red hover:bg-brand-off px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Book Appointment{" "}
                <span className="inline-block animate-arrow">→</span>
              </Link>
              <button
                onClick={handleLogout}
                className="border border-white/60 hover:bg-white/15 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div
                className={`group lift-card ${s.bg} rounded-3xl p-5 flex items-center gap-4`}
              >
                <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {s.icon}
                </span>
                <div>
                  <p className="text-3xl font-extrabold text-brand-red leading-none">
                    {s.value}
                  </p>
                  <p className="text-sm font-medium text-brand-ink mt-1">
                    {s.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Appointments ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Reveal className="h-full">
            <div className="bg-white rounded-3xl shadow-md p-7 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center text-lg">
                  📅
                </span>
                <h2 className="font-bold text-brand-ink">
                  Upcoming Appointments
                </h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <span className="animate-float text-5xl">🗓️</span>
                <p className="text-brand-muted text-sm mt-4">
                  You have no upcoming appointments.
                </p>
              </div>
              <Link
                href="/booking"
                className="text-center text-white px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(90deg, #C8102E, #E8538F)",
                }}
              >
                Book an Appointment →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="bg-white rounded-3xl shadow-md p-7 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-pastel-pink flex items-center justify-center text-lg">
                  🗂️
                </span>
                <h2 className="font-bold text-brand-ink">Past Visits</h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <span className="animate-float-slow text-5xl">📁</span>
                <p className="text-brand-muted text-sm mt-4">
                  No past visit history yet.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- Quick actions ---------- */}
        <Reveal>
          <h2 className="text-xl font-bold text-brand-ink mt-12 mb-5">
            Quick Actions
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {ACTIONS.map((a, i) => (
            <Reveal key={a.title} delay={i * 100} className="h-full">
              <Link
                href={a.href}
                className={`group lift-card ${a.bg} rounded-3xl p-6 block h-full`}
              >
                <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {a.icon}
                </span>
                <p className="font-bold text-brand-ink mt-4">{a.title}</p>
                <p className="text-brand-ink/70 text-sm mt-1">{a.text}</p>
                <span className="inline-block mt-4 text-brand-red text-sm font-semibold transition-transform duration-300 group-hover:translate-x-2">
                  Go →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ---------- Care tip ---------- */}
        <Reveal>
          <div className="relative overflow-hidden bg-pastel-yellow rounded-3xl p-6 mt-8 flex items-start gap-4">
            <span className="animate-float w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shrink-0">
              💡
            </span>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-ink">
                Care tip of the day
              </p>
              <p className="text-brand-ink/80 text-sm mt-1.5 leading-relaxed">
                {tip}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}