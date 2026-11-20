"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export const defaultNavItems: NavItem[] = [
  { label: "Роботи", href: "#works" },
  { label: "Пакети", href: "#packages" },
  { label: "Процес", href: "#process" },
  { label: "Про мене", href: "#about" },
  { label: "Контакти", href: "#contact" },
];

export interface NavProps {
  /** Пункти меню. За замовчуванням п'ять розділів головної. */
  items?: NavItem[];
  /** Адреса активного пункту: він підкреслений і має `aria-current`. */
  activeHref?: string;
  /** Чи відкрите мобільне меню на старті (для перегляду в Storybook). */
  defaultOpen?: boolean;
  /** Що показати внизу відкритого мобільного меню (наприклад, кнопку запиту). */
  mobileFooter?: ReactNode;
  /** Додаткові класи для `<nav>` (наприклад, вертикальне вирівнювання в шапці). */
  className?: string;
}

/** Три лінії, які при відкритті плавно складаються в хрестик (як у старому макеті). */
function BurgerIcon({ open }: { open: boolean }) {
  const line =
    "transform-fill origin-center transition duration-250 motion-reduce:transition-none";
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <rect x="2" y="5" width="20" height="2" className={`${line} ${open ? "translate-y-1.5 rotate-45" : ""}`} />
      <rect x="2" y="11" width="20" height="2" className={`${line} ${open ? "opacity-0" : ""}`} />
      <rect x="2" y="17" width="20" height="2" className={`${line} ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
    </svg>
  );
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/**
 * Головне меню сайту. На комп'ютері (від `desk`, 1100px) — рядок пунктів великими літерами з проміжком 56px макета.
 * На телефоні й планшеті — кнопка-бургер у кружку, а пункти випадають списком на всю ширину.
 *
 * Компонент повертає кнопку-бургер і `<nav>` поруч, без обгортки: їх розставляє
 * батьківський flex-контейнер з `flex-wrap` (див. Header).
 */
export function Nav({ items = defaultNavItems, activeHref, defaultOpen = false, mobileFooter, className }: NavProps) {
  const [open, setOpen] = useState(defaultOpen);
  const navId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape закриває мобільне меню й повертає фокус на бургер.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Коли вікно розширюється до комп'ютерного розміру, мобільне меню закривається.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 68.75rem)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        onClick={() => setOpen((v) => !v)}
        className={`order-2 cursor-pointer rounded-control border border-ink bg-canvas p-3 text-ink desk:hidden ${focusRing}`}
      >
        <BurgerIcon open={open} />
      </button>

      <nav
        id={navId}
        aria-label="Основна навігація"
        className={`${open ? "order-3 basis-full" : "hidden"} desk:order-none desk:block desk:basis-auto ${className ?? ""}`}
      >
        <ul className="flex flex-col desk:flex-row desk:gap-14">
          {items.map((item) => {
            const active = item.href === activeHref;
            return (
              <li key={item.href} className="border-t border-line desk:border-0">
                <a
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-lead uppercase text-ink decoration-1 underline-offset-3 desk:py-0 desk:text-label ${
                    active ? "underline" : ""
                  } ${focusRing}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        {mobileFooter && <div className="border-t border-line pt-6 pb-2 desk:hidden">{mobileFooter}</div>}
      </nav>
    </>
  );
}
