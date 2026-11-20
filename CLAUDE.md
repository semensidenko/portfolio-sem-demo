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
- Текст: `text-caption`, `text-body`, `text-label` (з `uppercase`; для дій ще `font-bold`), `text-lead`, `text-heading`, `text-display`. Жирність: `font-normal`, `font-medium`, `font-bold`.
- Радіуси: `rounded-control` (таблетка: кнопки, поля, перемикач), `rounded-card` (прямі кути: картки, картинки).
- Пропорції: `aspect-cover` (обкладинка кейса), `aspect-portrait` (портрет).
- Відступи: лише кроки 2, 3, 4, 6, 8 (8, 12, 16, 24, 32 px).
- Ширина сторінки: `max-w-page`.

## Компоненти

Кожен компонент лежить у `src/components/<Назва>/` разом з історією `<Назва>.stories.tsx`. Повний опис — на сторінці Docs у Storybook.

- **Button** ([src/components/Button/Button.tsx](src/components/Button/Button.tsx)) — текст великими літерами й кружок зі стрілкою. Варіанти `primary` / `secondary`, розміри `md` / `lg`, `disabled` через `aria-disabled` з поясненням `disabledReason`, `href` робить посилання. Storybook: `Components/Button`.
- **FormField** ([src/components/FormField/FormField.tsx](src/components/FormField/FormField.tsx)) — текстове поле з підписом над ним. Стани: default, hover, focus, заповнене, помилка (`error` + `errorMessage`), `disabled`. Storybook: `Components/FormField`.

## Правила

- У компонентах і історіях лише класи з токенів: без hex і rgb, без стандартних класів Tailwind поза системою (`text-sm`, `bg-white`), без значень у квадратних дужках, без відступів поза набором.
- Межа поля форми й кнопки без заливки: `ink-muted`, не `line`.
- Компоненти й токени переглядаємо лише в Storybook (`npm run storybook`), тимчасових сторінок на сайті не робимо.
- Одна історія на компонент з Controls і сторінка docs.

## Посилання

- План сайту: [docs/plan.md](docs/plan.md)
- Токени: [src/app/globals.css](src/app/globals.css)
