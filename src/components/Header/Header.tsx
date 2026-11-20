import { Button } from "../Button/Button";
import { LangSwitch } from "../LangSwitch/LangSwitch";
import type { Lang } from "../LangSwitch/LangSwitch";
import { Nav, defaultNavItems } from "../Nav/Nav";
import type { NavItem } from "../Nav/Nav";

export interface HeaderProps {
  /** Текст логотипа. */
  logo?: string;
  /** Пункти меню. */
  items?: NavItem[];
  /** Адреса активного пункту меню. */
  activeHref?: string;
  /** Мова перемикача за замовчуванням. */
  defaultLang?: Lang;
  /** Викликається при зміні мови. */
  onLangChange?: (lang: Lang) => void;
  /** Текст кнопки запиту. */
  ctaLabel?: string;
  /** Куди веде кнопка запиту. */
  ctaHref?: string;
  /** Чи відкрите мобільне меню на старті (для перегляду в Storybook). */
  defaultMenuOpen?: boolean;
}

/**
 * Шапка сайту: логотип, меню, перемикач мови й кнопка «Розповісти про проєкт».
 * Прилипає до верху при прокрутці, тож кнопка запиту завжди під рукою.
 * На телефоні меню ховається в бургер, а кнопка запиту переїжджає в низ відкритого меню.
 */
export function Header({
  logo = "Семен Сіденко",
  items = defaultNavItems,
  activeHref,
  defaultLang = "uk",
  onLangChange,
  ctaLabel = "Розповісти про проєкт",
  ctaHref = "#contact",
  defaultMenuOpen = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-canvas">
      <div className="mx-auto flex max-w-page flex-wrap items-center gap-4 px-4 py-4 xl:gap-8 xl:px-8">
        <a
          href="#top"
          className="mr-auto text-label font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {logo}
        </a>

        <Nav
          items={items}
          activeHref={activeHref}
          defaultOpen={defaultMenuOpen}
          mobileFooter={<Button href={ctaHref}>{ctaLabel}</Button>}
        />

        <LangSwitch defaultValue={defaultLang} onChange={onLangChange} className="order-1 xl:order-none" />

        <div className="hidden xl:block">
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      </div>
    </header>
  );
}
