"use client";

import { useId } from "react";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { ArrowIcon } from "../icons/ArrowIcon";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> {
  /** Текст кнопки. Пишеться звичайно, великими літерами його робить сам компонент. */
  children: ReactNode;
  /** `primary` — основна дія (кружок із заливкою `accent`); `secondary` — другорядна (кружок без заливки, межа `ink-muted`). */
  variant?: ButtonVariant;
  /** `md` — звичайна (форма, картки); `lg` — велика (перший екран, шапка). */
  size?: ButtonSize;
  /**
   * Кнопка недоступна. Робиться через `aria-disabled`, а не атрибут `disabled`:
   * кнопка лишається у фокусі з клавіатури, але натискання нічого не робить.
   */
  disabled?: boolean;
  /**
   * Пояснення, чому кнопка недоступна. Показується під кнопкою лише в стані `disabled`
   * і зв'язується з нею через `aria-describedby`.
   */
  disabledReason?: string;
  /** Якщо задано, кнопка стає посиланням `<a>` (наприклад, `#contact`). Без нього це `<button>`. */
  href?: string;
}

const base =
  "group inline-flex items-center gap-4 rounded-control text-label font-bold uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

// Кружок, як у старому макеті: md — 56px; lg — 70px (size-cta), на вузькому телефоні 56px.
const circleSizes: Record<ButtonSize, string> = {
  md: "size-14",
  lg: "size-14 phone:size-cta",
};

const states: Record<ButtonVariant, { enabled: { label: string; circle: string }; disabled: { label: string; circle: string } }> = {
  primary: {
    enabled: {
      label: "cursor-pointer text-ink",
      circle: "border-accent bg-accent text-canvas group-hover:scale-108",
    },
    disabled: {
      label: "cursor-not-allowed text-ink-muted",
      circle: "border-line bg-line text-ink-muted",
    },
  },
  secondary: {
    enabled: {
      label: "cursor-pointer text-ink",
      circle: "border-ink-muted text-ink group-hover:scale-108 group-hover:bg-surface",
    },
    disabled: {
      label: "cursor-not-allowed text-ink-muted",
      circle: "border-line text-ink-muted",
    },
  },
};

function Arrow({ animated }: { animated: boolean }) {
  return (
    <ArrowIcon
      className={`size-6 -rotate-45 ${
        animated
          ? "transition-transform motion-reduce:transition-none group-hover:rotate-0 group-focus-visible:rotate-0"
          : ""
      }`}
    />
  );
}

/**
 * Кнопка сайту: текст великими літерами й кружок зі стрілкою праворуч.
 * Для дій («Розповісти про проєкт», «Надіслати») і переходів, що виглядають як дія
 * (тоді передається `href` і рендериться посилання).
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  disabledReason,
  href,
  className,
  type = "button",
  onClick,
  "aria-describedby": describedBy,
  ...rest
}: ButtonProps) {
  const reasonId = useId();
  const showReason = disabled && Boolean(disabledReason);
  const ariaDescribedBy =
    [describedBy, showReason ? reasonId : undefined].filter(Boolean).join(" ") || undefined;

  const look = disabled ? states[variant].disabled : states[variant].enabled;
  const classes = [base, look.label, className].filter(Boolean).join(" ");

  const content = (
    <>
      <span>{children}</span>
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-control border transition duration-200 motion-reduce:transition-none ${circleSizes[size]} ${look.circle}`}
      >
        <Arrow animated={!disabled} />
      </span>
    </>
  );

  // Недоступна кнопка лишається у фокусі, тому клік і Enter гасимо тут.
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  const control =
    href !== undefined ? (
      disabled ? (
        // Посилання без адреси не потрапляє у фокус, тому додаємо role і tabIndex.
        <a role="link" tabIndex={0} aria-disabled="true" aria-describedby={ariaDescribedBy} className={classes}>
          {content}
        </a>
      ) : (
        <a href={href} aria-describedby={ariaDescribedBy} className={classes}>
          {content}
        </a>
      )
    ) : (
      <button
        type={type}
        aria-disabled={disabled || undefined}
        aria-describedby={ariaDescribedBy}
        className={classes}
        onClick={handleClick}
        {...rest}
      >
        {content}
      </button>
    );

  if (!showReason) return control;

  return (
    <span className="inline-flex flex-col items-start gap-2">
      {control}
      <span id={reasonId} className="text-caption text-ink-muted">
        {disabledReason}
      </span>
    </span>
  );
}
