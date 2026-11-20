import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowIcon } from "../icons/ArrowIcon";

export interface CaseCardProps {
  /** Назва проєкту: «Nordic Frame». */
  title: string;
  /** Формат: «Лендінг» чи «Багатосторінковий сайт». */
  format: string;
  /** Обкладинка 4:3, імпортована з `src/assets`. */
  image: StaticImageData;
  /** Опис картинки для скрінрідера: «Nordic Frame — сайт архітектурного бренду». */
  alt: string;
  /** Куди веде картка: сторінка кейса. */
  href: string;
  /** Підказка браузеру, яку ширину займе картинка (атрибут `sizes`). */
  sizes?: string;
  /** Завантажити картинку одразу (для першого екрана). */
  priority?: boolean;
}

// Як у старому макеті: на пристроях з мишею плашка й кружок з'являються при наведенні
// або фокусі; на сенсорних екранах кружок видно завжди, а плашки немає.
const reveal =
  "pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100";

/**
 * Картка кейса: обкладинка 4:3, при наведенні — плашка з назвою й форматом
 * і кружок зі стрілкою. Уся картка — одне посилання.
 */
export function CaseCard({ title, format, image, alt, href, sizes, priority = false }: CaseCardProps) {
  return (
    <a
      href={href}
      draggable={false}
      className="group relative block aspect-cover overflow-hidden rounded-card bg-line select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="object-cover transition-transform duration-600 motion-reduce:transition-none group-hover:scale-107"
      />

      <span
        className={`absolute top-4.25 left-4.25 flex flex-col items-start gap-0.5 rounded-tag bg-canvas px-3.5 py-2 transition pointer-coarse:hidden duration-250 motion-reduce:transition-none pointer-fine:-translate-y-1.5 pointer-fine:group-hover:translate-y-0 pointer-fine:group-focus-visible:translate-y-0 ${reveal}`}
      >
        <span className="text-small text-ink">{title}</span>
        <span className="text-caption text-ink-muted">{format}</span>
      </span>

      <span
        aria-hidden="true"
        className={`absolute right-2.5 bottom-2.5 flex size-11 items-center justify-center rounded-control bg-canvas text-ink transition phone:right-4.25 phone:bottom-3.25 phone:size-cta duration-250 motion-reduce:transition-none pointer-fine:scale-60 pointer-fine:group-hover:scale-100 pointer-fine:group-focus-visible:scale-100 ${reveal}`}
      >
        <ArrowIcon className="size-6 -rotate-45 transition-transform duration-600 motion-reduce:transition-none group-hover:rotate-0 group-focus-visible:rotate-0" />
      </span>
    </a>
  );
}
