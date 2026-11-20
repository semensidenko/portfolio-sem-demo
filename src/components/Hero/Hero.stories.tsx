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
| \`body\` | текст під заголовком | текст зі старого макета |
| \`ctaLabel\` / \`ctaHref\` | кнопка запиту | «Розповісти про проєкт» / \`#contact\` |
| \`word\` | велике слово (лише латиниця) | «design.» |
| \`portrait\` | портрет з \`src/assets\` | \`portrait.png\` |
| \`cases\` | кейси для каруселі | три кейси з \`src/content/cases.ts\` |

**Як поводиться на різній ширині**

- **від \`2xl\` (1536px)** — один ряд у пропорціях старого макета 1920px: портрет, ім'я, пітч, дві картки кейсів. Колонки задає утиліта \`grid-cols-hero\` у \`globals.css\`; пітч не вужчий за 20rem, щоб кнопка вміщалася.
- **планшет** (від \`md\`) — портрет і ім'я в ряд (1 : 2), нижче пітч і карусель на всю ширину.
- **телефон** — портрет і ім'я в ряд (1 : 1), нижче пітч і карусель.
- Велике слово займає ширину екрана й обрізається праворуч, як у старому макеті. Воно декоративне (\`aria-hidden\`).

**Токени:** кольори \`ink\`, \`ink-muted\`, \`line\` (фон під портретом); текст \`text-heading\` (ім'я й заголовок), \`text-body\`, \`text-display\` + \`font-display\` (слово); пропорція \`aspect-portrait\`; радіус \`rounded-card\`; ширина \`max-w-page\`; відступи 2, 3, 4, 6, 8.

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

Перевірити ширини: кнопка **Viewport** у верхній панелі Storybook; для одного ряду розгорніть вікно ширше за 1536px.
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
    word: { control: "text" },
    portrait: { control: false },
    cases: { control: false },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
