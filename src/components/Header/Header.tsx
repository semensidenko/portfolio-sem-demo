import { Button } from "../Button/Button";
import { LangSwitch } from "../LangSwitch/LangSwitch";
import type { Lang } from "../LangSwitch/LangSwitch";
import { Nav, defaultNavItems } from "../Nav/Nav";
import type { NavItem } from "../Nav/Nav";
import { HeaderCta } from "./HeaderCta";

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
  /**
   * id кнопки запиту на першому екрані. Якщо задано, кнопка в шапці (комп'ютер)
   * з'являється, лише коли ту кнопку прокручено вище екрана. Без нього видна завжди.
   */
  ctaRevealAfterId?: string;
  /** Чи відкрите мобільне меню на старті (для перегляду в Storybook). */
  defaultMenuOpen?: boolean;
}

/**
 * Шапка сайту: логотип, меню, перемикач мови й кнопка «Розповісти про проєкт».
 * Прилипає до верху при прокрутці. Від `desk` (1100px) стоїть на сітці першого екрана:
 * меню починається над кейсами, перемикач — біля правого краю, як у старому макеті.
 * На телефоні меню ховається в бургер, а кнопка запиту переїжджає в низ відкритого меню.
 * При завантаженні з'являється знизу (`animate-rise`), якщо анімації не вимкнено.
 */
export function Header({
  logo = "sidenko_design.s",
  items = defaultNavItems,
  activeHref,
  defaultLang = "uk",
  onLangChange,
  ctaLabel = "Розповісти про проєкт",
  ctaHref = "#contact",
  ctaRevealAfterId,
  defaultMenuOpen = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-canvas motion-safe:animate-rise">
      <div className="mx-auto flex max-w-page flex-wrap items-center gap-3 px-4 pt-4 pb-5 desk:grid desk:h-header desk:grid-cols-hero desk:items-start desk:gap-x-0 desk:px-7.5 desk:pb-0">
        <a
          href="#top"
          className="mr-auto text-label font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent desk:col-span-5 desk:col-start-1 desk:row-start-1 desk:mt-2 desk:mr-0 desk:justify-self-start"
        >
          {logo}
        </a>

        {/* До desk обгортка «прозора» (contents), і її діти стоять у рядку шапки напряму. */}
        <div className="contents desk:col-start-7 desk:row-start-1 desk:flex desk:items-start desk:gap-8">
          <Nav
            items={items}
            activeHref={activeHref}
            defaultOpen={defaultMenuOpen}
            mobileFooter={<Button href={ctaHref}>{ctaLabel}</Button>}
            className="desk:mt-4"
          />

          <LangSwitch defaultValue={defaultLang} onChange={onLangChange} className="order-1 desk:order-none desk:ml-auto" />

          <HeaderCta label={ctaLabel} href={ctaHref} revealAfterId={ctaRevealAfterId} />
        </div>
      </div>
    </header>
  );
}
