"use client";

import { useReducer } from "react";

// ─── State ────────────────────────────────────────────────────────────────────

type CounterState = {
  count: number;
  history: number[];
};

const initialState: CounterState = {
  count: 0,
  history: [],
};

// ─── Actions (Discriminated Union) ────────────────────────────────────────────
//
// Svaka akcija je poseban tip sa obaveznim `type` poljem.
// TypeScript koristi `type` kao "diskriminator" — zna tačno koji oblik
// akcija ima unutar switch grane. Nema potrebe za type assertion-ima.

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set_value"; payload: number };

// ─── Reducer ─────────────────────────────────────────────────────────────────
//
// Čista funkcija (pure function): isti input → uvek isti output.
// Ne menja prosleđeni state (nema mutacije) — vraća NOV objekat.
// Nema side effect-a: nema fetch-a, nema console.log-a, nema DOM pristupa.

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
        history: [...state.history, state.count],
      };

    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, state.count],
      };

    case "reset":
      return initialState;

    case "set_value":
      // TypeScript zna da `action.payload` postoji SAMO ovde.
      // U ostalim granama — ne bi ni kompajlirao.
      return {
        count: action.payload,
        history: [...state.history, state.count],
      };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CounterWithReducer() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-700 dark:text-zinc-300">
        Laboratorija 04 — useReducer
      </h2>

      <span className="tabular-nums text-7xl font-bold text-zinc-900 dark:text-zinc-50">
        {state.count}
      </span>

      {/* Akcije bez payload-a */}
      <div className="flex gap-3">
        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          −1
        </button>
        <button
          onClick={() => dispatch({ type: "reset" })}
          className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          +1
        </button>
      </div>

      {/* Akcija sa payload-om */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Postavi na:</span>
        {[10, 25, 50, 100].map((val) => (
          <button
            key={val}
            onClick={() => dispatch({ type: "set_value", payload: val })}
            className="rounded-lg border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
          >
            {val}
          </button>
        ))}
      </div>

      {/* Istorija promena */}
      {state.history.length > 0 && (
        <div className="w-full rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
          <p className="mb-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            Istorija
          </p>
          <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {state.history.join(" → ")} →{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {state.count}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
