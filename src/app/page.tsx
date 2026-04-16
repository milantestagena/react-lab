import Counter from "@/components/Counter";

// Ovo je Server Component (nema 'use client') — renderuje se na serveru,
// HTML stiže do browsera već spreman. Nema JS overhead za ovu komponentu.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 p-8 dark:bg-zinc-950">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        React Lab
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Faza 1 — Osnove i Next.js mentalitet
      </p>

      {/* Counter je Client Component — Next.js ga "hidrira" u browseru */}
      <Counter initialValue={0} step={1} />
      <Counter initialValue={10} step={5} />
    </main>
  );
}
