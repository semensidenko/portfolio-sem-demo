import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./Hero";

const description = `
**Що це.** Перший екран головної: портрет, ім'я й роль, посилання «Дивитися роботи» (**TextLink**), заголовок сторінки з текстом і кнопкою запиту (**Button**), карусель кейсів (**CaseCarousel**) і велике слово «design.». Шапка (**Header**) стоїть над ним окремо.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`name\` | ім'я під портретом | «Семен Сіденко» |
| \`roleStrong\` / \`roleRest\` | жирна й звичайна частини підпису | «UI/UX-дизайнер, 2+» / «років досвіду» |
| \`worksLabel\` | текст посилання на роботи | «Дивитися роботи» |
| \`title\` | заголовок сторінки (h1) | «Дизайн сайтів для бізнесу» |
| \`body\` | текст під заголовком; перенос рядка — \`\\n\` | текст зі старого макета |
| \`ctaLabel\` / \`ctaHref\` | кнопка запиту (велика, \`lg\`) | «Розповісти про проєкт» / \`#contact\` |
| \`ctaId\` | id обгортки кнопки запиту — його передають у \`Header ctaRevealAfterId\` | \`hero-cta\` |
| \`word\` | велике слово (лише латиниця) | «design.» |
| \`portrait\` | портрет з \`src/assets\` | \`portrait.png\` |
| \`cases\` | кейси для каруселі | три кейси з \`src/content/cases.ts\` |

**Як поводиться на різній ширині**

- **від \`desk\` (1100px)** — як старий макет 1920×960: один ряд (портрет, ім'я, пітч, дві картки), колонки з утиліти \`grid-cols-hero\`, і весь екран пропорційно масштабується з шириною (кореневий розмір шрифту = ширина / 120). Блок має пропорцію \`aspect-hero\`, тож разом із шапкою займає рівно 1920×960, а слово «design.» обрізане знизу й праворуч. Текст пітча вирівняний по ширині.
- **телефон і планшет** — портрет і ім'я з роллю в ряд (1 : 1), нижче пітч і карусель на всю ширину, під ними слово (36% ширини екрана).
- **вузький телефон** (до 480px) — ім'я 20px (\`text-lead\` жирним), роль і «Дивитися роботи» 15px (\`text-compact\`), кружок кнопки 56px, як у старому макеті.
- **портрет** — пропорція 229:299 і кадрування фото як у старому макеті.
- Слово декоративне (\`aria-hidden\`).

**Анімації** (як у старому макеті; з вимкненими анімаціями в системі їх немає)

- **поява** — портрет, ім'я, пітч і карусель по черзі піднімаються знизу (\`animate-rise\`, затримки 0,1 / 0,22 / 0,34 / 0,46 с; шапка — одразу).
- **друк слова** — літери «design.» з'являються по одній (\`animate-letter\`, з 0,35 с, крок 0,22 с).
- **хвиля** (лише миша) — літери біля курсору піднімаються.
- **нахил фото** (лише миша, від \`desk\`) — портрет трохи нахиляється в бік курсору.

Слово й портрет — внутрішні частини Hero: \`DisplayWord.tsx\` і \`TiltPortrait.tsx\` у тій самій теці.

**Токени:** кольори \`ink\`, \`ink-muted\`, \`line\` (фон під портретом); текст \`text-heading\` (ім'я й заголовок), \`text-body\`, \`text-display\` + \`font-display\` (слово); пропорції \`aspect-portrait\`, \`aspect-hero\`; радіус \`rounded-card\`; ширина \`max-w-page\`; відступи 2, 3, 4, 6, 8; рух \`animate-rise\`, \`animate-letter\`.

**Коли використовувати.** Один раз, першим блоком головної під шапкою.

**Коли ні.** На інших сторінках (кейси, «Про мене»): там свій заголовний блок.

**Як брати в код**

\`\`\`tsx
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";

<Header />
<main>
  <Hero />
</main>
\`\`\`

Перевірити ширини: кнопка **Viewport** у верхній панелі Storybook; для одного ряду розгорніть вікно ширше за 1100px.
`;

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: description } },
  },
  argTypes: {
    name: { control: "text" },
    roleStrong: { control: "text" },
    roleRest: { control: "text" },
    worksLabel: { control: "text" },
    title: { control: "text" },
    body: { control: "text" },
    ctaLabel: { control: "text" },
    ctaHref: { control: "text" },
    ctaId: { control: false },
    word: { control: "text" },
    portrait: { control: false },
    cases: { control: false },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
