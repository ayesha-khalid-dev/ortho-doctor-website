"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setDone(true);
      setLoading(false);
      setTimeout(() => router.push("/login"), 2500);
    } catch {
      setError("Could not connect to the server. Please try again.");
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <>
        <h1 className="text-2xl font-bold text-brand-ink">Invalid link</h1>
        <p className="text-sm text-brand-muted mt-2 mb-6">
          This reset link is missing or broken. Please request a new one.
        </p>
        <Link
          href="/forgot-password"
          className="text-brand-red font-medium text-sm"
        >
          Request a new link
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-brand-ink">Set a new password</h1>
      <p className="text-sm text-brand-muted mt-2 mb-6">
        Choose a new password for your account.
      </p>

      {done ? (
        <p className="text-sm mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700">
          Password updated! Redirecting to login...
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
                New password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-brand-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-ink">
                Confirm password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-brand-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              {loading ? "Please wait..." : "Update password"}
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex-1 flex items-center justify-center bg-brand-off px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10">
        <Suspense fallback={<p className="text-sm text-brand-muted">Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}