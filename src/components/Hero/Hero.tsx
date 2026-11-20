import type { CSSProperties } from "react";
import type { StaticImageData } from "next/image";
import portraitImage from "@/assets/portrait.png";
import { heroCases } from "@/content/cases";
import { Button } from "../Button/Button";
import { CaseCarousel } from "../CaseCarousel/CaseCarousel";
import type { CaseCardProps } from "../CaseCard/CaseCard";
import { TextLink } from "../TextLink/TextLink";
import { DisplayWord } from "./DisplayWord";
import { TiltPortrait } from "./TiltPortrait";

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
  /** Текст під заголовком. Перенос рядка — символ `\n`. */
  body?: string;
  /** Текст кнопки запиту. */
  ctaLabel?: string;
  /** Куди веде кнопка запиту. */
  ctaHref?: string;
  /** id обгортки кнопки запиту: за ним шапка знає, коли показати свою кнопку. */
  ctaId?: string;
  /** Велике слово внизу екрана (латиницею: у шрифті Urbanist немає кирилиці). */
  word?: string;
  /** Портрет. */
  portrait?: StaticImageData;
  /** Кейси в каруселі. */
  cases?: CaseCardProps[];
}

/** Затримка появи блоку (змінна --delay для `animate-rise`), як у старому макеті. */
const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

/**
 * Перший екран головної: портрет, ім'я й роль, посилання на роботи, заголовок з текстом
 * і кнопкою запиту, карусель кейсів і велике слово «design.».
 * Від `desk` (1100px) — як старий макет: один ряд, увесь екран масштабується з шириною,
 * разом із шапкою має пропорцію 1920×960, слово обрізане знизу. Вужче — дві колонки, слово під ними.
 */
export function Hero({
  name = "Семен Сіденко",
  roleStrong = "UI/UX-дизайнер, 2+",
  roleRest = "років досвіду",
  worksLabel = "Дивитися роботи",
  title = "Дизайн сайтів для бізнесу",
  body = "Проєктую дизайн лендінгів та сайтів для бізнесу, де вигляд визначає довіру клієнтів:\nТак ваш бренд переконує вже з першого екрана.",
  ctaLabel = "Розповісти про проєкт",
  ctaHref = "#contact",
  ctaId = "hero-cta",
  word = "design.",
  portrait = portraitImage,
  cases = heroCases,
}: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pb-2 desk:aspect-hero desk:pb-0">
      <div className="mx-auto max-w-page px-4 desk:px-7.5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 desk:grid-cols-hero desk:gap-x-0">
          <TiltPortrait
            image={portrait}
            alt={name}
            style={delay(0.1)}
            className="aspect-portrait motion-safe:animate-rise desk:col-start-1 desk:row-start-1 desk:aspect-auto"
          />

          <div
            style={delay(0.22)}
            className="flex flex-col items-start gap-4 motion-safe:animate-rise desk:col-start-3 desk:gap-6 desk:row-start-1"
          >
            <div className="flex flex-col">
              <h2 className="text-lead font-bold text-ink phone:text-heading">{name}</h2>
              <p className="text-compact text-ink phone:text-meta desk:whitespace-nowrap">
                <strong className="font-bold">{roleStrong}</strong> {roleRest}
              </p>
            </div>
            <TextLink href="#works" size="adaptive">
              {worksLabel}
            </TextLink>
          </div>

          <div
            style={delay(0.34)}
            className="col-span-2 flex flex-col justify-between gap-6 motion-safe:animate-rise desk:col-span-1 desk:col-start-5 desk:row-start-1"
          >
            <div className="flex flex-col gap-3">
              <h1 className="text-heading text-ink">{title}</h1>
              <p className="text-body whitespace-pre-line text-ink-muted desk:text-justify">{body}</p>
            </div>
            <div id={ctaId}>
              <Button href={ctaHref} size="lg">
                {ctaLabel}
              </Button>
            </div>
          </div>

          <div
            style={delay(0.46)}
            className="col-span-2 motion-safe:animate-rise desk:col-span-1 desk:col-start-7 desk:row-start-1"
          >
            <CaseCarousel
              cases={cases.map((c, i) => ({ ...c, priority: i < 2, sizes: "(min-width: 1100px) 21vw, 100vw" }))}
            />
          </div>
        </div>
      </div>

      <DisplayWord word={word} className="mt-2 pl-2 desk:absolute desk:top-5/12 desk:left-2.75 desk:mt-0 desk:pl-0" />
    </section>
  );
}
