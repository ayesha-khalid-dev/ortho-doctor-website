"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EyeTrackingCharacter from "../components/EyeTrackingCharacter";
import PostLoginAnimation from "../components/PostLoginAnimation";

const inputClass =
  "mt-1 w-full rounded-xl border-2 border-transparent bg-brand-off px-4 py-3 text-sm focus:outline-none focus:border-brand-red focus:bg-white transition-colors";

const PERKS = [
  { icon: "📅", text: "Easy booking", bg: "bg-pastel-blue" },
  { icon: "📋", text: "Your appointments", bg: "bg-pastel-mint" },
  { icon: "🔒", text: "Secure login", bg: "bg-pastel-yellow" },
];

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showAnimation, setShowAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        // Account created — switch to login so they can sign in
        setMode("login");
        setForm({ ...form, password: "" });
        setError("Account created! Please log in.");
        setLoading(false);
        return;
      }

      // Login succeeded
      setShowAnimation(true);
    } catch {
      setError("Could not connect to the server. Please try again.");
      setLoading(false);
    }
  }

  function switchMode(next: "login" | "signup") {
    setMode(next);
    setError("");
  }

  if (showAnimation) {
    return (
      <PostLoginAnimation onComplete={() => router.push("/dashboard")} />
    );
  }

  return (
    <main className="relative overflow-hidden flex-1 flex items-center justify-center bg-brand-off px-6 py-16">
      {/* Background blobs aur "+" */}
      <div className="animate-blob absolute -top-24 -left-24 w-96 h-96 bg-pastel-pink opacity-70 pointer-events-none" />
      <div className="animate-blob absolute -bottom-28 -right-24 w-[26rem] h-[26rem] bg-pastel-blue opacity-70 pointer-events-none" />
      <div className="animate-blob absolute top-1/2 left-1/3 w-52 h-52 bg-pastel-yellow opacity-50 pointer-events-none" />
      <span
        aria-hidden="true"
        className="animate-float absolute top-[14%] right-[12%] text-3xl font-bold text-brand-red/30 select-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="animate-float-slow absolute bottom-[16%] left-[8%] text-2xl font-bold text-brand-red/30 select-none"
      >
        +
      </span>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Eye-tracking character */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="relative">
            <div className="animate-blob absolute inset-0 -m-6 bg-pastel-lavender opacity-80 pointer-events-none" />
            <div className="relative">
              <EyeTrackingCharacter />
            </div>
          </div>
          <p className="text-brand-ink font-semibold text-lg mt-8 text-center max-w-xs">
            {mode === "login"
              ? "Welcome back — let's get you signed in."
              : "Let's get you set up."}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {PERKS.map((p) => (
              <span
                key={p.text}
                className={`chip ${p.bg} text-brand-ink text-xs font-medium px-3.5 py-1.5 rounded-full`}
              >
                {p.icon} {p.text}
              </span>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="animate-fade-in relative overflow-hidden bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <span
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ background: "linear-gradient(90deg, #C8102E, #E8538F)" }}
          />

          <h1 className="text-2xl font-bold text-brand-ink">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-brand-muted text-sm mt-1 mb-6">
            {mode === "login"
              ? "Log in to manage your appointments."
              : "Sign up to book and track your visits."}
          </p>

          {/* Tabs */}
          <div className="flex mb-6 bg-brand-off rounded-full p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  mode === m
                    ? "text-white shadow-md"
                    : "text-brand-ink hover:text-brand-red"
                }`}
                style={
                  mode === m
                    ? { background: "linear-gradient(90deg, #C8102E, #E8538F)" }
                    : undefined
                }
              >
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {error && (
            <p
              className={`text-sm mb-4 px-4 py-2.5 rounded-xl ${
                error.includes("created")
                  ? "bg-pastel-mint text-brand-ink"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium text-brand-ink">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-brand-ink">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-ink">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className={`${inputClass} pr-16`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 bottom-3 text-xs font-semibold text-brand-red hover:text-brand-red-dark"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <Link
                href="/forgot-password"
                className="text-xs text-brand-red hover:underline self-end"
              >
                Forgot password?
              </Link>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              style={{ background: "linear-gradient(90deg, #C8102E, #E8538F)" }}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs text-brand-muted mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="text-brand-red font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-brand-red font-medium hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}