"use client";

import { useEffect } from "react";

/** Adiciona `.is-visible` aos elementos `[data-reveal]` quando entram na tela. */
export function useScrollReveal() {
  useEffect(() => {
    // Segurança: se a hidratação falhar e o React recriar o <html>, a classe `js` se perde.
    document.documentElement.classList.add("js");
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function ScrollReveal() {
  useScrollReveal();
  return null;
}
