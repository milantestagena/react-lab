"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

export default function UserList() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController kreira "signal" koji možemo poslati fetch-u.
    // Kada pozovemo abort(), fetch će odbaciti odgovor i baciti AbortError.
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal } // <-- signal vezuje fetch za controller
        );

        if (!response.ok) {
          throw new Error(`HTTP greška: ${response.status}`);
        }

        const users: User[] = await response.json();
        setData(users);
      } catch (err) {
        // AbortError nije "pravi" error — ignorišemo ga svjesno.
        // Bez ovog check-a, demontiranje komponente bi triggerovalo setError.
        if (err instanceof Error && err.name === "AbortError") return;

        setError(err instanceof Error ? err.message : "Nepoznata greška");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Cleanup funkcija: React je poziva kada se komponenta demontira
    // ILI prije sljedećeg pokretanja effect-a (ako zavisnosti promijene).
    return () => controller.abort();
  }, []); // <-- prazan niz = effect se pokreće samo jednom, pri mountu

  if (loading) {
    return <p className="text-sm text-zinc-500">Učitavanje korisnika...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">Greška: {error}</p>;
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        Korisnici
      </h2>
      <ul className="space-y-1">
        {data.map((user) => (
          <li
            key={user.id}
            className="text-sm text-zinc-700 dark:text-zinc-300"
          >
            {user.id}. {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
