"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { CaseCard } from "../CaseCard/CaseCard";
import type { CaseCardProps } from "../CaseCard/CaseCard";

export interface CaseCarouselProps {
  /** Кейси для показу. */
  cases: CaseCardProps[];
  /** Назва каруселі для скрінрідера. */
  label?: string;
  /** Автозміна кейсів, мс. 0 — вимкнено. */
  autoplayMs?: number;
}

const SWIPE_PX = 50;
const DURATION_MS = 600; // як у старому макеті
const CLONES = 2; // найбільше карток в одному кадрі — для безкінечної прокрутки

/** Крива ease-glide (cubic-bezier(0.65, 0, 0.35, 1)) для JS-анімації прокрутки. */
function glide(t: number) {
  const [x1, y1, x2, y2] = [0.65, 0, 0.35, 1];
  const bez = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bez(x1, x2, mid) < t) lo = mid;
    else hi = mid;
  }
  return bez(y1, y2, (lo + hi) / 2);
}

/**
 * Карусель кейсів, як у старому макеті: від `desk` (1100px) видно дві картки, вужче — одну.
 * Крок — одна картка, прокрутка безкінечна вперед (після останнього кейса знову перший).
 * Автозміна кожні `autoplayMs`: пауза при наведенні, фокусі, прихованій вкладці або кнопкою паузи;
 * вимкнено, якщо в системі вимкнено анімації. Гортається свайпом, мишею, трекпадом і крапками.
 */
export function CaseCarousel({ cases, label = "Кейси", autoplayMs = 5000 }: CaseCarouselProps) {
  const count = cases.length;
  const items = [...cases, ...cases.slice(0, Math.min(CLONES, count))];

  const trackRef = useRef<HTMLDivElement>(null);
  const rawRef = useRef(0); // положення з урахуванням клонів: 0..count
  const animRef = useRef<number | null>(null);
  const settleRef = useRef<number | null>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [nudges, setNudges] = useState(0);

  const step = () => (trackRef.current?.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setScroll = useCallback((left: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.scrollSnapType = "none";
    track.scrollLeft = left;
  }, []);

  /** Якщо стоїмо на клоні першого кейса — непомітно перестрибуємо на справжній. */
  const normalize = useCallback(() => {
    const track = trackRef.current;
    const width = step();
    if (!track || !width) return;
    const raw = Math.round(track.scrollLeft / width);
    if (raw >= count) setScroll((raw - count) * width);
    track.style.scrollSnapType = "";
  }, [count, setScroll]);

  const animateTo = useCallback(
    (raw: number) => {
      const track = trackRef.current;
      const width = step();
      if (!track || !width) return;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      const from = track.scrollLeft;
      const to = raw * width;
      if (reduceMotion()) {
        setScroll(to);
        normalize();
        return;
      }
      const start = performance.now();
      track.style.scrollSnapType = "none";
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        track.scrollLeft = from + (to - from) * glide(t);
        if (t < 1) animRef.current = requestAnimationFrame(tick);
        else {
          animRef.current = null;
          normalize();
        }
      };
      animRef.current = requestAnimationFrame(tick);
    },
    [normalize, setScroll],
  );

  const next = useCallback(() => animateTo(rawRef.current + 1), [animateTo]);
  const prev = useCallback(() => {
    if (rawRef.current === 0) {
      setScroll(count * step());
      rawRef.current = count;
    }
    animateTo(rawRef.current - 1);
  }, [animateTo, count, setScroll]);

  // Положення з прокрутки; після рідної прокрутки (свайп, трекпад) — вирівнювання з клона.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const width = step();
      if (!width) return;
      rawRef.current = Math.round(track.scrollLeft / width);
      setCurrent(rawRef.current % count);
      if (settleRef.current) window.clearTimeout(settleRef.current);
      settleRef.current = window.setTimeout(() => {
        if (!animRef.current && !drag.current) normalize();
      }, 150);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count, normalize]);

  // Автозміна.
  const paused = hovered || userPaused;
  useEffect(() => {
    if (!autoplayMs || paused || count < 2 || reduceMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) next();
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, paused, count, next, nudges]);

  function manual(action: () => void) {
    action();
    setNudges((n) => n + 1); // таймер автозміни починається спочатку
  }

  // Перетягування мишею.
  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    drag.current = { x: e.clientX, scroll: trackRef.current.scrollLeft, moved: false };
    trackRef.current.style.scrollSnapType = "none";
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || !trackRef.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    trackRef.current.scrollLeft = d.scroll - dx;
  }

  function endDrag(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const dx = e.clientX - d.x;
    rawRef.current = Math.round(d.scroll / (step() || 1));
    suppressClick.current = d.moved;
    if (dx <= -SWIPE_PX) manual(next);
    else if (dx >= SWIPE_PX) manual(prev);
    else animateTo(rawRef.current);
  }

  const autoplayOn = Boolean(autoplayMs) && count > 1;

  return (
    <div
      role="region"
      aria-roledescription="карусель"
      aria-label={label}
      className="relative"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        className="scrollbar-none -mx-1.5 flex snap-x snap-mandatory overflow-x-auto pointer-fine:cursor-grab desk:-mx-2.5"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // Після перетягування не переходимо за посиланням картки.
          if (suppressClick.current) {
            e.preventDefault();
            suppressClick.current = false;
          }
        }}
      >
        {items.map((item, i) => {
          const clone = i >= count;
          return (
            <div
              key={item.href + i}
              aria-hidden={clone || undefined}
              inert={clone || undefined}
              className="w-full shrink-0 snap-start px-1.5 desk:w-1/2 desk:px-2.5"
            >
              <CaseCard {...item} />
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="absolute bottom-1.5 left-2.5 flex items-center desk:bottom-2.25 desk:left-3.25">
          {cases.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Показати кейс ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              onClick={() => manual(() => animateTo(i))}
              className="cursor-pointer rounded-control px-1 py-2 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span
                className={`block size-2.5 rounded-control bg-canvas transition duration-200 motion-reduce:transition-none ${
                  i === current ? "scale-130" : "opacity-50"
                }`}
              />
            </button>
          ))}
          {autoplayOn && (
            <button
              type="button"
              aria-label={userPaused ? "Увімкнути автозміну кейсів" : "Зупинити автозміну кейсів"}
              aria-pressed={userPaused}
              onClick={() => setUserPaused((v) => !v)}
              className="ml-1 cursor-pointer rounded-control px-1 py-2 text-canvas opacity-50 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <svg aria-hidden="true" viewBox="0 0 10 10" fill="currentColor" className="size-2.5">
                {userPaused ? <path d="M2 1l7 4-7 4z" /> : <path d="M1.5 1h2.5v8H1.5zM6 1h2.5v8H6z" />}
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
