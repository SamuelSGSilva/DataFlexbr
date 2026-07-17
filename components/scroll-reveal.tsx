"use client";

import { useEffect, useRef } from "react";

/**
 * Revela o conteúdo com um efeito de "subir com bounce" sempre que ele
 * entra na viewport. Como remove a classe ao sair, a animação re-dispara
 * toda vez que o usuário rola de volta até o elemento.
 */
export function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        } else {
          // Remove ao sair para que a animação role de novo no próximo scroll
          el.classList.remove("is-visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`df-reveal ${className}`}>
      {children}
    </div>
  );
}
