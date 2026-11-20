"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Велике слово першого екрана («design.»). Декоративне (`aria-hidden`).
 * - Літери з'являються по черзі, ніби слово друкують (`animate-letter`).
 * - З мишею літери біля курсору піднімаються хвилею.
 * З вимкненими анімаціями слово видно одразу й без хвилі.
 */
export function DisplayWord({ word, className }: { word: string; className?: string }) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduce.matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    const reset = () => letters.forEach((l) => (l.style.top = ""));

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = root.getBoundingClientRect();
      const size = parseFloat(getComputedStyle(root).fontSize);
      const inside = e.clientY > rect.top + size * 0.15 && e.clientY < rect.bottom;
      letters.forEach((letter) => {
        const r = letter.getBoundingClientRect();
        const distance = Math.abs(e.clientX - (r.left + r.width / 2)) / (size * 0.55);
        const lift = inside ? Math.max(0, 1 - distance) : 0;
        letter.style.top = lift ? `${-lift * lift * size * 0.07}px` : "";
      });
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <p
      ref={rootRef}
      aria-hidden="true"
      className={["font-display text-display whitespace-nowrap text-ink select-none", className]
        .filter(Boolean)
        .join(" ")}
    >
      {Array.from(word).map((char, i) => (
        <span
          key={i}
          data-letter
          style={{ "--delay": `${0.35 + i * 0.22}s` } as CSSProperties}
          className="relative transition-all duration-180 ease-out motion-safe:animate-letter motion-reduce:transition-none"
        >
          {char}
        </span>
      ))}
    </p>
  );
}
