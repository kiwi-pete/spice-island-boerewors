"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PinGate() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Incorrect PIN.");
        setPin("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-charcoal text-cream px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-xs bg-cream/5 border border-cream/10 rounded-xl p-8 flex flex-col items-center gap-5"
      >
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-cream">
            Spice Island Admin
          </h1>
          <p className="text-sm text-cream/60 mt-1">Enter your PIN to continue</p>
        </div>

        <input
          autoFocus
          type="password"
          inputMode="numeric"
          autoComplete="off"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
          className="w-full text-center tracking-[0.5em] text-2xl bg-cream text-charcoal rounded-md py-3 px-4 outline-none focus:ring-2 focus:ring-paprika"
        />

        {error && <p className="text-sm text-paprika-light text-center">{error}</p>}

        <button
          type="submit"
          disabled={busy || pin.length === 0}
          className="w-full bg-paprika hover:bg-paprika-light disabled:opacity-50 text-cream font-semibold py-3 rounded-md transition-colors"
        >
          {busy ? "Checking…" : "Unlock"}
        </button>
      </form>
    </main>
  );
}
