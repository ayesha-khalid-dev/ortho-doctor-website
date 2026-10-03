"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SERVICES } from "../lib/services-data";

const STEPS = ["Service", "Date & Time", "Your Details", "Confirmation"];

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

const MORNING = TIME_SLOTS.slice(0, 6);
const AFTERNOON = TIME_SLOTS.slice(6);

const PASTELS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-yellow",
  "bg-pastel-lavender",
  "bg-pastel-peach",
];

const GRAD = { background: "linear-gradient(90deg, #C8102E, #E8538F)" };

const inputClass =
  "mt-1 w-full rounded-xl border-2 border-transparent bg-brand-off px-4 py-3 text-sm focus:outline-none focus:border-brand-red focus:bg-white transition-colors";

const CONFETTI = [
  { cls: "top-4 left-[12%] w-3 h-3 bg-pastel-pink animate-float" },
  { cls: "top-10 right-[14%] w-4 h-4 bg-pastel-yellow animate-float-slow" },
  { cls: "top-24 left-[6%] w-2.5 h-2.5 bg-pastel-blue animate-float-delay" },
  { cls: "top-28 right-[8%] w-3 h-3 bg-pastel-mint animate-float" },
  { cls: "bottom-24 left-[10%] w-3.5 h-3.5 bg-pastel-lavender animate-float-slow" },
  { cls: "bottom-16 right-[12%] w-3 h-3 bg-pastel-peach animate-float-delay" },
];

function getNextDays(count: number) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });

  const days = useMemo(() => getNextDays(7), []);

  // Mock: mark a few random slots as unavailable per date so it feels real
  const unavailableSlots = useMemo(() => {
    const map: Record<string, string[]> = {};
    days.forEach((d) => {
      const key = d.toDateString();
      const shuffled = [...TIME_SLOTS].sort(() => 0.5 - Math.random());
      map[key] = shuffled.slice(0, 3);
    });
    return map;
  }, [days]);

  function canProceed() {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) return form.name.trim() && form.phone.trim();
    return true;
  }

  function handleNext() {
    if (step === 2) {
      // TODO: send booking to backend once API is ready
      setStep(3);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function resetBooking() {
    setStep(0);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", phone: "", email: "", notes: "" });
  }

  const service = SERVICES.find((s) => s.slug === selectedService);

  const prettyDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  function renderSlots(list: string[]) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
        {list.map((time) => {
          const isUnavailable = selectedDate
            ? unavailableSlots[selectedDate]?.includes(time)
            : false;
          const isSelected = selectedTime === time;
          return (
            <button
              key={time}
              disabled={isUnavailable}
              onClick={() => setSelectedTime(time)}
              className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isUnavailable
                  ? "bg-brand-off text-brand-muted/40 line-through cursor-not-allowed"
                  : isSelected
                  ? "text-white shadow-md scale-105"
                  : "bg-pastel-blue/70 text-brand-ink hover:scale-105 hover:shadow-md"
              }`}
              style={isSelected && !isUnavailable ? GRAD : undefined}
            >
              {time}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <main className="relative overflow-hidden flex-1 bg-brand-off px-6 py-16">
      {/* Background blobs */}
      <div className="animate-blob absolute -top-24 -left-24 w-96 h-96 bg-pastel-pink opacity-60 pointer-events-none" />
      <div className="animate-blob absolute -bottom-28 -right-24 w-[26rem] h-[26rem] bg-pastel-blue opacity-60 pointer-events-none" />
      <span
        aria-hidden="true"
        className="animate-float absolute top-[12%] right-[12%] text-3xl font-bold text-brand-red/30 select-none"
      >
        +
      </span>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
            Book an Appointment
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-ink mt-5">
            Schedule Your{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #C8102E, #E8538F)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Visit
            </span>
          </h1>
        </div>

        {/* Stepper */}
        {step < 3 && (
          <div className="flex items-center justify-center mb-10">
            {STEPS.slice(0, 3).map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <div key={label} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        done || current
                          ? "text-white"
                          : "bg-white text-brand-muted border border-brand-ink/15"
                      } ${current ? "animate-pulse-ring" : ""}`}
                      style={done || current ? GRAD : undefined}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden sm:inline ${
                        i <= step ? "text-brand-ink" : "text-brand-muted"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <span className="mx-3 w-8 sm:w-14 h-1 rounded-full bg-brand-ink/10 overflow-hidden">
                      <span
                        className="block h-full rounded-full transition-all duration-500"
                        style={{
                          ...GRAD,
                          width: i < step ? "100%" : "0%",
                        }}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <span className="absolute top-0 left-0 right-0 h-1.5" style={GRAD} />

          {/* Summary strip (step 1 and 2) */}
          {(step === 1 || step === 2) && service && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-pastel-lavender text-brand-ink text-xs font-semibold px-3 py-1.5 rounded-full">
                {service.icon} {service.title}
              </span>
              {step === 2 && selectedDate && (
                <span className="bg-pastel-blue text-brand-ink text-xs font-semibold px-3 py-1.5 rounded-full">
                  📅 {prettyDate}
                </span>
              )}
              {step === 2 && selectedTime && (
                <span className="bg-pastel-mint text-brand-ink text-xs font-semibold px-3 py-1.5 rounded-full">
                  🕙 {selectedTime}
                </span>
              )}
            </div>
          )}

          <div key={step} className="animate-fade-in">
            {/* Step 0: Service */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-brand-ink mb-1">
                  Select a Service
                </h2>
                <p className="text-brand-muted text-sm mb-6">
                  What would you like to be seen for?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((s, i) => {
                    const selected = selectedService === s.slug;
                    return (
                      <button
                        key={s.slug}
                        onClick={() => setSelectedService(s.slug)}
                        className={`group lift-card relative text-left rounded-2xl p-4 flex items-center gap-4 ${
                          PASTELS[i % PASTELS.length]
                        } ${
                          selected
                            ? "ring-2 ring-brand-red shadow-lg"
                            : "ring-2 ring-transparent"
                        }`}
                      >
                        <span className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                          {s.icon}
                        </span>
                        <p className="font-semibold text-brand-ink text-sm">
                          {s.title}
                        </p>
                        {selected && (
                          <span
                            className="absolute top-3 right-3 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                            style={GRAD}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-brand-ink mb-1">
                  Choose Date &amp; Time
                </h2>
                <p className="text-brand-muted text-sm mb-6">
                  Crossed-out times are already taken.
                </p>

                <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
                  {days.map((d) => {
                    const key = d.toDateString();
                    const label = d.toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                    const month = d.toLocaleDateString("en-US", {
                      month: "short",
                    });
                    const dayNum = d.getDate();
                    const selected = selectedDate === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedDate(key);
                          setSelectedTime(null);
                        }}
                        className={`shrink-0 w-[72px] py-3 rounded-2xl text-center transition-all ${
                          selected
                            ? "text-white shadow-lg scale-105"
                            : "bg-pastel-lavender/70 text-brand-ink hover:scale-105 hover:shadow-md"
                        }`}
                        style={selected ? GRAD : undefined}
                      >
                        <p className="text-xs opacity-80">{label}</p>
                        <p className="text-xl font-bold mt-0.5">{dayNum}</p>
                        <p className="text-[10px] opacity-70">{month}</p>
                      </button>
                    );
                  })}
                </div>

                {selectedDate ? (
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-brand-ink mb-3">
                        ☀️ Morning
                      </p>
                      {renderSlots(MORNING)}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-brand-ink mb-3">
                        🌤️ Afternoon
                      </p>
                      {renderSlots(AFTERNOON)}
                    </div>
                  </div>
                ) : (
                  <p className="text-brand-muted text-sm text-center py-6">
                    Pick a date to see available times.
                  </p>
                )}
              </div>
            )}

            {/* Step 2: Patient Details */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-bold text-brand-ink mb-1">
                    Your Details
                  </h2>
                  <p className="text-brand-muted text-sm">
                    So we can reach you about your visit.
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-ink">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-ink">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="03xx-xxxxxxx"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-ink">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-ink">
                    Notes (optional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Briefly describe your concern"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="relative text-center py-6">
                {CONFETTI.map((c, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`absolute rounded-full ${c.cls}`}
                  />
                ))}

                <div
                  className="animate-pulse-ring relative w-20 h-20 rounded-full text-white flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg"
                  style={GRAD}
                >
                  ✓
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mb-2">
                  Appointment Requested
                </h2>
                <p className="text-brand-muted text-sm mb-8">
                  We&apos;ve received your booking request. Our team will
                  confirm shortly.
                </p>

                <div className="relative bg-brand-off rounded-3xl p-6 text-left max-w-sm mx-auto space-y-3">
                  {[
                    { icon: "🦴", label: "Service", value: service?.title, bg: "bg-pastel-lavender" },
                    { icon: "📅", label: "Date", value: prettyDate, bg: "bg-pastel-blue" },
                    { icon: "🕙", label: "Time", value: selectedTime, bg: "bg-pastel-mint" },
                    { icon: "👤", label: "Name", value: form.name, bg: "bg-pastel-pink" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-xl ${row.bg} flex items-center justify-center text-base shrink-0`}
                      >
                        {row.icon}
                      </span>
                      <p className="text-sm">
                        <span className="text-brand-muted">{row.label}:</span>{" "}
                        <span className="font-semibold text-brand-ink">
                          {row.value}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link
                    href="/"
                    className="text-white px-7 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105"
                    style={GRAD}
                  >
                    ← Back to Home
                  </Link>
                  <button
                    onClick={resetBooking}
                    className="border border-brand-ink/20 hover:border-brand-red hover:text-brand-red text-brand-ink px-7 py-2.5 rounded-full text-sm font-medium transition-colors"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {step < 3 && (
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-6 py-2.5 rounded-full text-sm font-medium text-brand-ink hover:text-brand-red transition-colors disabled:opacity-0"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="text-white px-8 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                style={GRAD}
              >
                {step === 2 ? "Confirm Booking" : "Continue →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}