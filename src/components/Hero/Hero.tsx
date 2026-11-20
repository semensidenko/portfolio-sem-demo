import Image from "next/image";
import type { StaticImageData } from "next/image";
import portraitImage from "@/assets/portrait.png";
import { heroCases } from "@/content/cases";
import { Button } from "../Button/Button";
import { CaseCarousel } from "../CaseCarousel/CaseCarousel";
import type { CaseCardProps } from "../CaseCard/CaseCard";
import { TextLink } from "../TextLink/TextLink";

export interface HeroProps {
  /** Ім'я під портретом. */
  name?: string;
  /** Жирна частина підпису: роль і досвід. */
  roleStrong?: string;
  /** Звичайна частина підпису після жирної. */
  roleRest?: string;
  /** Текст посилання на роботи. */
  worksLabel?: string;
  /** Головний заголовок сторінки (h1). */
  title?: string;
  /** Текст під заголовком. */
  body?: string;
  /** Текст кнопки запиту. */
  ctaLabel?: string;
  /** Куди веде кнопка запиту. */
  ctaHref?: string;
  /** Велике слово внизу екрана (латиницею: у шрифті Urbanist немає кирилиці). */
  word?: string;
  /** Портрет. */
  portrait?: StaticImageData;
  /** Кейси в каруселі. */
  cases?: CaseCardProps[];
}

/**
 * Перший екран головної: портрет, ім'я й роль, посилання на роботи, заголовок з текстом
 * і кнопкою запиту, карусель кейсів і велике слово «design.».
 * Від `2xl` (1536px) — в один ряд у пропорціях старого макета, вужче — у дві колонки.
 */
export function Hero({
  name = "Семен Сіденко",
  roleStrong = "UI/UX-дизайнер, 2+",
  roleRest = "років досвіду",
  worksLabel = "Дивитися роботи",
  title = "Дизайн сайтів для бізнесу",
  body = "Проєктую дизайн лендінгів та сайтів для бізнесу, де вигляд визначає довіру клієнтів. Так ваш бренд переконує вже з першого екрана.",
  ctaLabel = "Розповісти про проєкт",
  ctaHref = "#contact",
  word = "design.",
  portrait = portraitImage,
  cases = heroCases,
}: HeroProps) {
  return (
    <section id="top" className="overflow-hidden">
      <div className="mx-auto max-w-page px-4 pt-2 xl:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 2xl:grid-cols-hero 2xl:gap-x-0">
          <figure className="relative aspect-portrait overflow-hidden rounded-card bg-line 2xl:col-start-1 2xl:row-start-1 2xl:aspect-auto">
            <Image
              src={portrait}
              alt={name}
              fill
              priority
              sizes="(min-width: 1536px) 15vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover object-top"
            />
          </figure>

          <div className="flex flex-col items-start gap-6 md:col-span-2 2xl:col-span-1 2xl:col-start-3 2xl:row-start-1">
            <div className="flex flex-col gap-2">
              <h2 className="text-heading text-ink">{name}</h2>
              <p className="text-body text-ink">
                <strong className="font-bold">{roleStrong}</strong> {roleRest}
              </p>
            </div>
            <TextLink href="#works">{worksLabel}</TextLink>
          </div>

          <div className="col-span-2 flex flex-col justify-between gap-6 md:col-span-3 2xl:col-span-1 2xl:col-start-5 2xl:row-start-1">
            <div className="flex flex-col gap-3">
              <h1 className="text-heading text-ink">{title}</h1>
              <p className="text-body text-ink-muted">{body}</p>
            </div>
            <div>
              <Button href={ctaHref}>{ctaLabel}</Button>
            </div>
          </div>

          <div className="col-span-2 md:col-span-3 2xl:col-span-1 2xl:col-start-7 2xl:row-start-1">
            <CaseCarousel cases={cases.map((c, i) => ({ ...c, priority: i < 2, sizes: "(min-width: 1536px) 22vw, 100vw" }))} />
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-6 pl-2 font-display text-display whitespace-nowrap text-ink select-none"
      >
        {word}
      </p>
    </section>
  );
}
