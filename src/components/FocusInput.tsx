"use client";

import { useRef } from "react";

export default function FocusInput() {
  // useRef<HTMLInputElement>(null) — React kreira objekat { current: null }
  // i "zakači" ga za DOM čvor tek nakon što se komponenta montira.
  // Tip HTMLInputElement govori TypeScript-u šta se nalazi u .current.
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    // .current može biti null pre mount-a, pa proveravamo
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-700 dark:text-zinc-300">
        Laboratorija 02 — FocusInput
      </h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Klikni dugme da me fokusiraš..."
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
      />

      <button
        onClick={handleFocus}
        className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Fokusiraj input
      </button>
    </div>
  );
}
