@AGENTS.md

# Сайт-портфоліо Семена Сіденка

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт, тому перед кожним пушем питай мене.

## Токени

Єдине джерело значень: блоки `@theme` і `@theme inline` у [src/app/globals.css](src/app/globals.css). Перегляд: Storybook, сторінка `Foundations/Tokens` ([src/design-system/Tokens.mdx](src/design-system/Tokens.mdx)). Стандартні кольори, розміри тексту, радіуси, пропорції й шрифти Tailwind скинуто.

- Кольори: `canvas`, `surface`, `line`, `accent`, `ink`, `ink-muted`, `danger`.
- Шрифти: `font-sans` (Inter, увесь текст), `font-display` (Urbanist, лише латинське слово «design.»). Підключення в [src/app/fonts.ts](src/app/fonts.ts).
- Текст: `text-caption`, `text-compact` (15px, вузький телефон), `text-small` (16px, плашка картки), `text-meta` (17px, роль), `text-body`, `text-label` (з `uppercase`; для дій ще `font-bold`), `text-lead`, `text-heading`, `text-display`. Жирність: `font-normal`, `font-medium`, `font-bold`.
- Радіуси: `rounded-control` (таблетка: кнопки, поля, перемикач), `rounded-card` (прямі кути: картки, картинки), `rounded-tag` (14px: плашка на картці кейса).
- Пропорції: `aspect-cover` (обкладинка кейса), `aspect-portrait` (портрет 229:299), `aspect-hero` (перший екран без шапки, разом із шапкою 1920×960).
- Рух: криві `ease-spring`, `ease-soft`, `ease-glide`; анімації `animate-rise` (поява знизу, затримка — змінна `--delay`), `animate-letter` (друк літери), `animate-squash` («крапля» перемикача). Анімації — лише з `motion-safe:`, переходи — з `motion-reduce:transition-none`.
- Утиліти розкладки в `globals.css`: `grid-cols-hero` (колонки першого екрана), `scrollbar-none`.
- Відступи: кроки 2, 3, 4, 6, 8 (8, 12, 16, 24, 32 px); точні значення старого макета (наприклад, 14 = 56px меню, 7.5 = 30px полів) — лише там, де потрібна ідентичність, з коментарем.
- Розміри: `size-cta` (кружок 70px), `h-header` (шапка 87px).
- Брейкпоінти: `phone:` (від 481px), `desk:` (від 1100px). Від 1100px кореневий шрифт = ширина / 120, тож усе в rem масштабується, як у старому макеті.
- Ширина сторінки: `max-w-page`.

## Компоненти

Кожен компонент лежить у `src/components/<Назва>/` разом з історією `<Назва>.stories.tsx`. Повний опис — на сторінці Docs у Storybook.

- **Button** ([src/components/Button/Button.tsx](src/components/Button/Button.tsx)) — текст великими літерами й кружок зі стрілкою. Варіанти `primary` / `secondary`, розміри `md` / `lg`, `disabled` через `aria-disabled` з поясненням `disabledReason`, `href` робить посилання. Storybook: `Components/Button`.
- **FormField** ([src/components/FormField/FormField.tsx](src/components/FormField/FormField.tsx)) — текстове поле з підписом над ним. Стани: default, hover, focus, заповнене, помилка (`error` + `errorMessage`), `disabled`. Storybook: `Components/FormField`.
- **Header** ([src/components/Header/Header.tsx](src/components/Header/Header.tsx)) — шапка сайту: логотип (`logo`, зараз «Семен Сіденко»), Nav, LangSwitch і Button «Розповісти про проєкт». Прилипає до верху (`sticky`). Від `xl` (1280px) в один рядок, вужче — бургер, кнопка запиту в мобільному меню. Storybook: `Components/Header`.
- **Nav** ([src/components/Nav/Nav.tsx](src/components/Nav/Nav.tsx)) — меню з п'яти пунктів (Роботи, Пакети, Процес, Про мене, Контакти), активний через `activeHref`. Повертає бургер і `<nav>` без обгортки: потрібен батьківський flex-контейнер з `flex-wrap`. Storybook: `Components/Nav`.
- **LangSwitch** ([src/components/LangSwitch/LangSwitch.tsx](src/components/LangSwitch/LangSwitch.tsx)) — перемикач UA/EN з «бульбашкою», кнопки з `aria-pressed`. Лише повідомляє про вибір через `onChange`, перекладу ще немає. Storybook: `Components/LangSwitch`.
- **Hero** ([src/components/Hero/Hero.tsx](src/components/Hero/Hero.tsx)) — перший екран головної: портрет, ім'я й роль, TextLink, заголовок h1 з текстом і Button, CaseCarousel, велике слово «design.». Від `2xl` (1536px) один ряд у пропорціях старого макета (утиліта `grid-cols-hero` у `globals.css`), вужче — дві колонки. Стоїть на головній у [src/app/page.tsx](src/app/page.tsx). Анімації як у старому макеті: поява блоків, друк слова й хвиля літер (`DisplayWord.tsx`), нахил фото за мишею (`TiltPortrait.tsx`). Storybook: `Components/Hero`.
- **TextLink** ([src/components/TextLink/TextLink.tsx](src/components/TextLink/TextLink.tsx)) — посилання-дія великими літерами з лінією, що «малюється» при наведенні («Дивитися роботи»). Storybook: `Components/TextLink`.
- **CaseCard** ([src/components/CaseCard/CaseCard.tsx](src/components/CaseCard/CaseCard.tsx)) — картка кейса 4:3, уся картка — посилання; плашка з назвою й форматом і кружок зі стрілкою з'являються при наведенні (на сенсорних екранах видні завжди). Storybook: `Components/CaseCard`.
- **CaseCarousel** ([src/components/CaseCarousel/CaseCarousel.tsx](src/components/CaseCarousel/CaseCarousel.tsx)) — карусель CaseCard: дві картки від `xl`, одна вужче; свайп, трекпад, крапки. Без автопрокрутки. Storybook: `Components/CaseCarousel`.

Спільне: стрілка — [src/components/icons/ArrowIcon.tsx](src/components/icons/ArrowIcon.tsx); дані кейсів — [src/content/cases.ts](src/content/cases.ts); картинки — `src/assets` (імпортуються в код).

## Правила

- У компонентах і історіях лише класи з токенів: без hex і rgb, без стандартних класів Tailwind поза системою (`text-sm`, `bg-white`), без значень у квадратних дужках, без відступів поза набором.
- Межа поля форми й кнопки без заливки: `ink-muted`, не `line`.
- Компоненти й токени переглядаємо лише в Storybook (`npm run storybook`), тимчасових сторінок на сайті не робимо.
- Одна історія на компонент з Controls і сторінка docs.

## Посилання

- План сайту: [docs/plan.md](docs/plan.md)
- Токени: [src/app/globals.css](src/app/globals.css)
