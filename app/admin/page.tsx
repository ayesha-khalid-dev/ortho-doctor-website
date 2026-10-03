"use client";

import { useState } from "react";

type Status = "confirmed" | "pending" | "cancelled";

type Appointment = {
  id: string;
  patient: string;
  service: string;
  date: string;
  time: string;
  status: Status;
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "1", patient: "Ahmed Raza", service: "Knee Replacement", date: "Sep 10", time: "10:30 AM", status: "confirmed" },
  { id: "2", patient: "Sana Khan", service: "Fracture Care", date: "Sep 10", time: "11:30 AM", status: "pending" },
  { id: "3", patient: "Bilal Mahmood", service: "Sports Injuries", date: "Sep 11", time: "02:00 PM", status: "pending" },
  { id: "4", patient: "Fatima Noor", service: "Spine Care", date: "Sep 11", time: "03:30 PM", status: "confirmed" },
  { id: "5", patient: "Usman Tariq", service: "Joint Replacement", date: "Sep 12", time: "10:00 AM", status: "cancelled" },
];

const WEEK_DAYS = ["Mon 8", "Tue 9", "Wed 10", "Thu 11", "Fri 12", "Sat 13"];
const TIME_SLOTS = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"];

const TABS = [
  { name: "Overview", icon: "📊" },
  { name: "Appointments", icon: "📅" },
  { name: "Manage Slots", icon: "🗓️" },
] as const;

type TabName = (typeof TABS)[number]["name"];

const GRAD = { background: "linear-gradient(90deg, #C8102E, #E8538F)" };

const STATUS_STYLES: Record<Status, { badge: string; dot: string }> = {
  confirmed: { badge: "bg-pastel-mint text-green-800", dot: "bg-green-500" },
  pending: { badge: "bg-pastel-yellow text-yellow-800", dot: "bg-[#F5B83D]" },
  cancelled: { badge: "bg-pastel-coral text-red-800", dot: "bg-brand-red" },
};

function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full capitalize ${s.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ name }: { name: string }) {
  return (
    <span
      className="w-9 h-9 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: "linear-gradient(135deg, #C8102E, #E8538F)" }}
    >
      {initials(name)}
    </span>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<TabName>("Overview");
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [blockedSlots, setBlockedSlots] = useState<Record<string, boolean>>({});

  function updateStatus(id: string, status: Status) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  function toggleSlot(day: string, time: string) {
    const key = `${day}-${time}`;
    setBlockedSlots((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const todayCount = appointments.filter((a) => a.date === "Sep 10").length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const cancelledCount = appointments.filter((a) => a.status === "cancelled").length;
  const blockedCount = Object.values(blockedSlots).filter(Boolean).length;
  const total = appointments.length;

  const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100);

  const STATS = [
    { icon: "📅", label: "Today", value: todayCount, sub: "Appointments", bg: "bg-pastel-blue", valueClass: "text-brand-ink" },
    { icon: "📈", label: "This Week", value: total, sub: "Total Bookings", bg: "bg-pastel-mint", valueClass: "text-brand-ink" },
    { icon: "⏳", label: "Pending", value: pendingCount, sub: "Need Confirmation", bg: "bg-pastel-yellow", valueClass: "text-brand-red" },
    { icon: "🚫", label: "Blocked Slots", value: blockedCount, sub: "This Week", bg: "bg-pastel-pink", valueClass: "text-brand-ink" },
  ];

  return (
    <main className="relative overflow-hidden flex-1 bg-brand-off px-6 py-12">
      <div className="animate-blob absolute -top-24 -right-24 w-96 h-96 bg-pastel-lavender opacity-60 pointer-events-none" />
      <div className="animate-blob absolute bottom-0 -left-24 w-80 h-80 bg-pastel-peach opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header banner */}
        <div
          className="animate-fade-in relative overflow-hidden rounded-3xl p-8 text-white mb-8"
          style={{ background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)" }}
        >
          <div className="animate-blob absolute -top-16 -left-10 w-56 h-56 bg-white opacity-10 pointer-events-none" />
          <div className="animate-blob absolute -bottom-20 right-20 w-64 h-64 bg-white opacity-10 pointer-events-none" />
          <div className="relative flex items-center gap-5">
            <span className="animate-float w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-lg shrink-0">
              🩺
            </span>
            <div>
              <span className="text-white/80 font-semibold tracking-widest uppercase text-xs">
                Admin Panel
              </span>
              <h1 className="text-3xl font-bold mt-1">Clinic Dashboard</h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-full p-1.5 w-fit shadow-md">
          {TABS.map((t) => (
            <button
              key={t.name}
              onClick={() => setTab(t.name)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                tab === t.name
                  ? "text-white shadow-md"
                  : "text-brand-ink hover:text-brand-red"
              }`}
              style={tab === t.name ? GRAD : undefined}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.name}
            </button>
          ))}
        </div>

        <div key={tab} className="animate-fade-in">
          {/* Overview */}
          {tab === "Overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className={`group lift-card ${s.bg} rounded-3xl p-6`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-brand-ink/70 text-xs uppercase tracking-widest font-semibold">
                        {s.label}
                      </p>
                      <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        {s.icon}
                      </span>
                    </div>
                    <p className={`text-4xl font-extrabold mt-3 ${s.valueClass}`}>
                      {s.value}
                    </p>
                    <p className="text-brand-ink/70 text-xs mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status breakdown */}
                <div className="bg-white rounded-3xl shadow-md p-6">
                  <h2 className="font-bold text-brand-ink">Appointment Status</h2>
                  <div className="flex h-4 w-full rounded-full overflow-hidden bg-brand-off mt-5">
                    <div
                      className="bg-green-400 transition-all duration-500"
                      style={{ width: `${pct(confirmedCount)}%` }}
                    />
                    <div
                      className="bg-[#F5B83D] transition-all duration-500"
                      style={{ width: `${pct(pendingCount)}%` }}
                    />
                    <div
                      className="bg-[#E8538F] transition-all duration-500"
                      style={{ width: `${pct(cancelledCount)}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-brand-ink">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                      Confirmed <b>{confirmedCount}</b>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#F5B83D]" />
                      Pending <b>{pendingCount}</b>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#E8538F]" />
                      Cancelled <b>{cancelledCount}</b>
                    </span>
                  </div>
                </div>

                {/* Recent appointments */}
                <div className="bg-white rounded-3xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-brand-ink">Recent Appointments</h2>
                    <button
                      onClick={() => setTab("Appointments")}
                      className="text-xs font-semibold text-brand-red hover:underline"
                    >
                      View all →
                    </button>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {appointments.slice(0, 4).map((a) => (
                      <li key={a.id} className="flex items-center gap-3">
                        <Avatar name={a.patient} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-brand-ink truncate">
                            {a.patient}
                          </p>
                          <p className="text-xs text-brand-muted truncate">
                            {a.service} · {a.date}, {a.time}
                          </p>
                        </div>
                        <StatusBadge status={a.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Appointments */}
          {tab === "Appointments" && (
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-pastel-lavender/60 text-left text-brand-ink text-xs uppercase tracking-widest">
                      <th className="px-5 py-4">Patient</th>
                      <th className="px-5 py-4">Service</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Time</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr
                        key={a.id}
                        className="border-t border-brand-ink/5 hover:bg-brand-off transition-colors"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar name={a.patient} />
                            <span className="font-semibold text-brand-ink whitespace-nowrap">
                              {a.patient}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-brand-muted whitespace-nowrap">
                          {a.service}
                        </td>
                        <td className="px-5 py-3 text-brand-muted whitespace-nowrap">
                          {a.date}
                        </td>
                        <td className="px-5 py-3 text-brand-muted whitespace-nowrap">
                          {a.time}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={a.status} />
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(a.id, "confirmed")}
                              disabled={a.status === "confirmed"}
                              className="text-xs font-semibold bg-pastel-mint text-green-800 px-3 py-1.5 rounded-full transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateStatus(a.id, "cancelled")}
                              disabled={a.status === "cancelled"}
                              className="text-xs font-semibold bg-pastel-coral text-red-800 px-3 py-1.5 rounded-full transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Manage Slots */}
          {tab === "Manage Slots" && (
            <div className="bg-white rounded-3xl shadow-md p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className="text-brand-muted text-sm">
                  Click a slot to block/unblock it for booking.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-pastel-mint" /> Open
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-pastel-coral" /> Blocked
                  </span>
                  <button
                    onClick={() => setBlockedSlots({})}
                    disabled={blockedCount === 0}
                    className="font-semibold bg-pastel-lavender text-brand-ink px-3 py-1.5 rounded-full transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  >
                    Unblock all ({blockedCount})
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-brand-muted text-xs uppercase p-2"></th>
                      {WEEK_DAYS.map((d) => (
                        <th
                          key={d}
                          className="text-center text-brand-ink text-xs font-bold p-2"
                        >
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIME_SLOTS.map((time) => (
                      <tr key={time}>
                        <td className="text-brand-muted text-xs font-medium p-2 whitespace-nowrap">
                          {time}
                        </td>
                        {WEEK_DAYS.map((day) => {
                          const key = `${day}-${time}`;
                          const isBlocked = blockedSlots[key];
                          return (
                            <td key={key} className="p-1">
                              <button
                                onClick={() => toggleSlot(day, time)}
                                className={`w-full h-10 min-w-[64px] rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                                  isBlocked
                                    ? "bg-pastel-coral text-red-700"
                                    : "bg-pastel-mint/70 text-brand-ink hover:bg-pastel-mint"
                                }`}
                              >
                                {isBlocked ? "🚫 Blocked" : "Open"}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}