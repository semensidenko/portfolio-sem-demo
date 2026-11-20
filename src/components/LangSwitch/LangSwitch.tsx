"use client";

import { useState } from "react";

export type Lang = "uk" | "en";

export interface LangSwitchProps {
  /** Обрана мова, якщо перемикачем керує батьківський компонент. */
  value?: Lang;
  /** Мова за замовчуванням, якщо перемикач сам пам'ятає вибір. */
  defaultValue?: Lang;
  /** Викликається, коли людина обирає іншу мову. */
  onChange?: (lang: Lang) => void;
  className?: string;
}

const options: { lang: Lang; short: string; name: string }[] = [
  { lang: "uk", short: "UA", name: "Українська" },
  { lang: "en", short: "EN", name: "English" },
];

/**
 * Перемикач мови UA/EN: таблетка, у якій чорна «бульбашка» перетікає на обрану мову.
 * Дві кнопки з `aria-pressed`, тож скрінрідер чує, яка мова зараз увімкнена.
 */
export function LangSwitch({ value, defaultValue = "uk", onChange, className }: LangSwitchProps) {
  const [inner, setInner] = useState<Lang>(defaultValue);
  const current = value ?? inner;

  function choose(lang: Lang) {
    if (lang === current) return;
    if (value === undefined) setInner(lang);
    onChange?.(lang);
  }

  return (
    <div
      role="group"
      aria-label="Мова сайту"
      className={["relative inline-grid grid-cols-2 rounded-control border border-ink-muted", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1/2 rounded-control bg-accent transition-transform motion-reduce:transition-none ${
          current === "en" ? "translate-x-full" : ""
        }`}
      />
      {options.map(({ lang, short, name }) => {
        const active = lang === current;
        return (
          <button
            key={lang}
            type="button"
            lang={lang}
            aria-pressed={active}
            onClick={() => choose(lang)}
            className={`relative rounded-control px-4 py-3 text-label uppercase transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              active ? "cursor-default text-canvas" : "cursor-pointer text-ink hover:bg-surface"
            }`}
          >
            {short}
            {/* Повна назва лише для скрінрідера; видимий «UA»/«EN» лишається частиною назви кнопки. */}
            <span className="sr-only"> ({name})</span>
          </button>
        );
      })}
    </div>
  );
}
