import { useEffect, useRef } from "react";

export function useDocumentTitle(title: string): void {
  // Pamtimo originalni naslov koji je bio PRE nego što je komponenta montirana.
  // useRef jer ne želimo da ova vrednost izazove re-render — samo je čuvamo.
  const originalTitle = useRef<string>(document.title);

  useEffect(() => {
    // Kopiramo .current u lokalnu varijablu — React garantuje da će ova vrednost
    // biti ista u cleanup-u, čak i ako se ref promeni u međuvremenu.
    const prevTitle = originalTitle.current;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
