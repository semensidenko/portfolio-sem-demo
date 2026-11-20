import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Текст посилання. Великими літерами його робить сам компонент. */
  children: ReactNode;
  /** Куди веде посилання (наприклад, `#works`). */
  href: string;
}

/**
 * Текстове посилання-дія: жирний текст великими літерами з лінією під ним.
 * При наведенні чи фокусі лінія зникає й «малюється» знову зліва направо.
 * Приклад: «Дивитися роботи» на першому екрані.
 */
export function TextLink({ children, href, className, ...rest }: TextLinkProps) {
  return (
    <a
      href={href}
      className={[
        "group relative inline-block pb-2 text-label font-bold uppercase text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
      {/* Лінія в спокої: зникає при наведенні */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 bg-ink transition-opacity motion-reduce:transition-none group-hover:opacity-0 group-focus-visible:opacity-0"
      />
      {/* Лінія, що малюється зліва направо */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-ink transition-transform duration-500 motion-reduce:transition-none group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </a>
  );
}
