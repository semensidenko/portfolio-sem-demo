"use client";

import { useEffect, useId, useState } from "react";
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
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      )}
    </svg>
  );
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/**
 * Головне меню сайту. На комп'ютері (від ширини `xl`, 1280px) — рядок пунктів великими літерами.
 * На телефоні й планшеті — кнопка-бургер у кружку, а пункти випадають списком на всю ширину.
 *
 * Компонент повертає кнопку-бургер і `<nav>` поруч, без обгортки: їх розставляє
 * батьківський flex-контейнер з `flex-wrap` (див. Header).
 */
export function Nav({ items = defaultNavItems, activeHref, defaultOpen = false, mobileFooter }: NavProps) {
  const [open, setOpen] = useState(defaultOpen);
  const navId = useId();

  // Escape закриває мобільне меню.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        onClick={() => setOpen((v) => !v)}
        className={`order-2 cursor-pointer rounded-control border border-ink-muted p-3 text-ink transition-colors motion-reduce:transition-none hover:bg-surface xl:hidden ${focusRing}`}
      >
        <BurgerIcon open={open} />
      </button>

      <nav
        id={navId}
        aria-label="Основна навігація"
        className={`${open ? "order-3 basis-full" : "hidden"} xl:order-none xl:block xl:basis-auto`}
      >
        <ul className="flex flex-col xl:flex-row xl:gap-8">
          {items.map((item) => {
            const active = item.href === activeHref;
            return (
              <li key={item.href} className="border-t border-line xl:border-0">
                <a
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-lead uppercase text-ink decoration-2 underline-offset-4 hover:underline xl:py-0 xl:text-label ${
                    active ? "underline" : ""
                  } ${focusRing}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        {mobileFooter && <div className="border-t border-line pt-6 pb-2 xl:hidden">{mobileFooter}</div>}
      </nav>
    </>
  );
}
