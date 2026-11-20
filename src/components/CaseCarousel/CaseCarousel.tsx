"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaseCard } from "../CaseCard/CaseCard";
import type { CaseCardProps } from "../CaseCard/CaseCard";

export interface CaseCarouselProps {
  /** Кейси для показу. */
  cases: CaseCardProps[];
  /** Назва каруселі для скрінрідера. */
  label?: string;
}

/**
 * Карусель кейсів: на комп'ютері (від `xl`) видно дві картки, вужче — одну.
 * Гортається свайпом, трекпадом, колесом із Shift і крапками внизу ліворуч.
 * Сама не прокручується: автопрокрутка заважає читати й потребує кнопки паузи.
 */
export function CaseCarousel({ cases, label = "Кейси" }: CaseCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(cases.length);
  const [current, setCurrent] = useState(0);

  // Скільки положень у каруселі й яке зараз: рахуємо з ширини картки й прокрутки.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.offsetWidth;
    const perView = Math.max(1, Math.round(track.clientWidth / step));
    setPages(Math.max(1, cases.length - perView + 1));
    setCurrent(Math.round(track.scrollLeft / step));
  }, [cases.length]);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", measure);
    };
  }, [measure]);

  function goTo(index: number) {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: index * first.offsetWidth, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div role="region" aria-roledescription="карусель" aria-label={label} className="relative">
      <div ref={trackRef} className="scrollbar-none -mx-2 flex snap-x snap-mandatory overflow-x-auto">
        {cases.map((item, i) => (
          <div key={item.href + i} className="w-full shrink-0 snap-start px-2 xl:w-1/2">
            <CaseCard {...item} />
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="absolute bottom-2 left-2 flex">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Показати кейс ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              onClick={() => goTo(i)}
              className="group/dot cursor-pointer rounded-control p-2 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span
                className={`block size-2 rounded-control bg-canvas transition motion-reduce:transition-none ${
                  i === current ? "scale-150" : "opacity-50 group-hover/dot:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
