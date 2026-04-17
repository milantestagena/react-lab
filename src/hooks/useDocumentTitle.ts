import { useEffect, useRef } from "react";

export function useDocumentTitle(title: string): void {
  // Prazan string kao inicijalna vrednost — document nije dostupan na serveru,
  // pa ne smemo čitati document.title ovde (tokom rendera).
  const originalTitle = useRef<string>("");

  useEffect(() => {
    // Ovo se izvršava samo u browseru. Pri prvom mountu hvatamo stvarni naslov,
    // zatim ga čuvamo u refu za cleanup.
    if (!originalTitle.current) {
      originalTitle.current = document.title;
    }
    const prevTitle = originalTitle.current;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
