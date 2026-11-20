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

/**
 * Картка кейса: обкладинка 4:3, при наведенні — плашка з назвою й форматом
 * і кружок зі стрілкою. Уся картка — одне посилання.
 * На сенсорних екранах (без наведення) плашка й кружок видні завжди.
 */
export function CaseCard({ title, format, image, alt, href, sizes, priority = false }: CaseCardProps) {
  return (
    <a
      href={href}
      className="group relative block aspect-cover overflow-hidden rounded-card bg-line focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
      />

      <span className="absolute top-4 left-4 flex flex-col gap-2 rounded-card bg-canvas px-4 py-3 transition-opacity motion-reduce:transition-none pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100">
        <span className="text-body font-bold text-ink">{title}</span>
        <span className="text-caption text-ink-muted">{format}</span>
      </span>

      <span
        aria-hidden="true"
        className="absolute right-4 bottom-4 rounded-control bg-canvas p-4 text-ink transition-opacity motion-reduce:transition-none pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100"
      >
        <ArrowIcon className="size-6 -rotate-45 transition-transform duration-500 motion-reduce:transition-none group-hover:rotate-0 group-focus-visible:rotate-0" />
      </span>
    </a>
  );
}
