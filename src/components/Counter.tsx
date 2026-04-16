"use client";

import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type CounterProps = {
  initialValue?: number;
  step?: number;
};

export default function Counter({ initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  // useEffect sa praznim [] — pokreće se samo jednom (mount)
  useEffect(() => {
    console.log("[Counter] Komponenta montirana (mount)");

    return () => {
      console.log("[Counter] Komponenta demontirana (unmount / cleanup)");
    };
  }, []);

  // Custom hook preuzima odgovornost za document.title
  useDocumentTitle(`Brojač: ${count}`);

  useEffect(() => {
    console.log(`[Counter] count se promenio → ${count}`);
  }, [count]);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-700 dark:text-zinc-300">
        Laboratorija 01 — Counter
      </h2>

      <span className="tabular-nums text-7xl font-bold text-zinc-900 dark:text-zinc-50">
        {count}
      </span>

      <div className="flex gap-3">
        <button
          onClick={decrement}
          className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          − {step}
        </button>
        <button
          onClick={reset}
          className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          + {step}
        </button>
      </div>

    </div>
  );
}
