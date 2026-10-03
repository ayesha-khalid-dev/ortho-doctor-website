"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setSent(true);
      setLoading(false);
    } catch {
      setError("Could not connect to the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center bg-brand-off px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10">
        <h1 className="text-2xl font-bold text-brand-ink">Forgot password?</h1>
        <p className="text-sm text-brand-muted mt-2 mb-6">
          Enter your email and we&apos;ll send you a link to reset your
          password.
        </p>

        {sent ? (
          <p className="text-sm mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700">
            If an account exists with this email, a reset link has been sent.
          </p>
        ) : (
          <>
            {error && (
              <p className="text-sm mb-4 px-4 py-2 rounded-lg bg-red-50 text-red-600">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-brand-ink">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-brand-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                {loading ? "Please wait..." : "Send reset link"}
              </button>
            </form>
          </>
        )}

        <p className="text-center text-xs text-brand-muted mt-6">
          <Link href="/login" className="text-brand-red font-medium">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}