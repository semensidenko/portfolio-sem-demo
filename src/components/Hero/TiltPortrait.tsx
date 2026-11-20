"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Портрет першого екрана. На комп'ютері (від `desk`, 1100px) з мишею фото трохи
 * нахиляється в бік курсору. На сенсорних екранах і з вимкненими анімаціями — без нахилу.
 */
export function TiltPortrait({
  image,
  alt,
  className,
  style,
}: {
  image: StaticImageData;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduce.matches) return;
    const wide = window.matchMedia("(min-width: 68.75rem)");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!wide.matches) {
        el.style.transform = "";
        return;
      }
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      el.style.transform = `perspective(900px) rotateY(${nx * 9}deg) rotateX(${-ny * 9}deg)`;
    };
    const reset = () => (el.style.transform = "");

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <figure
      ref={ref}
      style={style}
      className={[
        "relative overflow-hidden rounded-card bg-line transition-transform duration-250 ease-out motion-reduce:transition-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Кадрування як у старому макеті: фото збільшене й зсунуте ліворуч і трохи вниз. */}
      <Image
        src={image}
        alt={alt}
        priority
        sizes="(min-width: 1100px) 17vw, 70vw"
        className="absolute top-1/30 -left-2/9 h-auto w-11/8 max-w-none"
      />
    </figure>
  );
}
