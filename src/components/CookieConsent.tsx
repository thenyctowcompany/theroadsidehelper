"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "trh-cookie-consent";
const TAWK_SRC =
  "https://embed.tawk.to/6823effa7c5b09190cd447fe/1ir662r4n";

type Choice = "accepted" | "rejected";

function loadTawk() {
  if (typeof window === "undefined") return;
  if ((window as unknown as { Tawk_API?: unknown }).Tawk_API) return;
  (window as unknown as { Tawk_API: object }).Tawk_API = {};
  (window as unknown as { Tawk_LoadStart: Date }).Tawk_LoadStart = new Date();
  const s1 = document.createElement("script");
  s1.async = true;
  s1.src = TAWK_SRC;
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  const s0 = document.getElementsByTagName("script")[0];
  s0?.parentNode?.insertBefore(s1, s0);
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (
      typeof window !== "undefined"
        ? (localStorage.getItem(STORAGE_KEY) as Choice | null)
        : null
    );
    setChoice(saved);
    if (saved === "accepted") loadTawk();
  }, []);

  function decide(value: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore quota / private mode errors
    }
    setChoice(value);
    if (value === "accepted") loadTawk();
  }

  if (!mounted || choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[9999] mx-auto max-w-3xl rounded-t-xl border border-slate-200 bg-white p-4 shadow-2xl sm:bottom-4 sm:rounded-xl sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          We use cookies for live chat support and to remember your preferences.
          You can decline non-essential cookies and still use the site fully.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
