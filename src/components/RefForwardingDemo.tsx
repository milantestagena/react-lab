"use client";

import { useRef } from "react";
import CustomInput from "./CustomInput";

export default function RefForwardingDemo() {
  // Ref je kreiran u roditelju — CustomInput ne zna ništa o tome.
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    inputRef.current?.focus();
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-700 dark:text-zinc-300">
        Laboratorija 03 — Ref Forwarding
      </h2>

      {/* ref prop prolazi kroz CustomInput do <input> DOM čvora */}
      <CustomInput
        ref={inputRef}
        label="Ime i prezime"
        placeholder="Fokusiraj me dugmetom ispod..."
        type="text"
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
