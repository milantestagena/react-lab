import { useEffect, useRef } from "react";

export function useDocumentTitle(title: string): void {
  // Pamtimo originalni naslov koji je bio PRE nego što je komponenta montirana.
  // useRef jer ne želimo da ova vrednost izazove re-render — samo je čuvamo.
  const originalTitle = useRef<string>(document.title);

  useEffect(() => {
    document.title = title;

    // Cleanup: pokreće se kada se komponenta DEMONTIRA (ili pre sledećeg efekta).
    // Vraćamo naslov na ono što je bilo pre — kao da naša komponenta nikad nije ni bila tu.
    return () => {
      document.title = originalTitle.current;
    };
  }, [title]);
}
