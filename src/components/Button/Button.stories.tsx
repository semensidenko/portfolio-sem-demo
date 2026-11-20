import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const description = `
**Що це.** Кнопка сайту: текст великими літерами й кружок зі стрілкою праворуч. Для дій («Розповісти про проєкт», «Надіслати») і для переходів, які виглядають як дія.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`children\` | текст кнопки | — |
| \`variant\` | \`primary\` (основна), \`secondary\` (другорядна) | \`primary\` |
| \`size\` | \`md\` (звичайна), \`lg\` (велика) | \`md\` |
| \`disabled\` | недоступна (через \`aria-disabled\`, фокус лишається) | \`false\` |
| \`disabledReason\` | пояснення під недоступною кнопкою | — |
| \`href\` | адреса; якщо задано, рендериться посилання \`<a>\` | — |
| \`type\` | \`button\`, \`submit\`, \`reset\` (лише без \`href\`) | \`button\` |

**Варіанти**

- \`primary\` (основна): текст \`ink\` (21:1 на \`canvas\`), кружок із заливкою \`accent\`, стрілка \`canvas\` (21:1).
- \`secondary\` (другорядна): текст \`ink\` (21:1), кружок без заливки з межею \`ink-muted\` (9,59:1 до \`canvas\`), стрілка \`ink\`.
- \`md\`: кружок 56px (\`size-14\`). \`lg\`: кружок 70px (\`size-cta\`), на вузькому телефоні (до 480px) — 56px, як у старому макеті. Між текстом і кружком відступ 4. Від 1100px усе масштабується з шириною екрана.

**Стани**

- **default** — як у варіантах вище. Стрілка нахилена вгору-праворуч.
- **hover** — кружок плавно збільшується (108%, як у старому макеті), стрілка вирівнюється. Кольори не змінюються: \`primary\` — стрілка \`canvas\` на \`accent\` (21:1); \`secondary\` — фон кружка \`surface\`, стрілка \`ink\` (19,09:1). Текст \`ink\` (21:1). З вимкненими анімаціями зміни миттєві.
- **focus** (з клавіатури, Tab) — контур \`accent\` товщиною 2 з відступом 4 навколо тексту й кружка, на фоні \`canvas\` 21:1. Стрілка вирівнюється.
- **disabled** — текст \`ink-muted\` (9,59:1); \`primary\`: кружок \`line\`, стрілка \`ink-muted\`; \`secondary\`: межа кружка \`line\`, стрілка \`ink-muted\`. Стрілка не рухається. Курсор «заборонено». Кнопка лишається у фокусі (атрибут \`aria-disabled\`, не \`disabled\`), клік і Enter нічого не роблять. Якщо задано \`disabledReason\`, під кнопкою з'являється пояснення (\`text-caption\`, \`ink-muted\`, 9,59:1), зв'язане з кнопкою через \`aria-describedby\`.

**Токени:** кольори \`accent\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`surface\`, \`line\`; текст \`text-label\` + \`font-bold\` + \`uppercase\`, пояснення \`text-caption\`; радіус \`rounded-control\` (кружок і контур фокусу); відступи 2, 4, 6.

**Коли використовувати.** \`primary\` — одна головна дія в блоці: «Розповісти про проєкт», «Надіслати». \`secondary\` — поруч для другорядної дії. \`lg\` — перший екран і шапка, \`md\` — решта.

**Коли ні.** Для пунктів меню й посилань у тексті (там звичайне посилання). Не ставте дві \`primary\` поруч. Не робіть кнопку недоступною без \`disabledReason\`: людина має розуміти, що зробити, щоб вона запрацювала.

**Як брати в код**

\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button href="#contact" size="lg">Розповісти про проєкт</Button>
<Button variant="secondary" href="#works">Дивитися роботи</Button>
<Button type="submit" disabled={!isValid} disabledReason="Вкажіть ім'я та контакт, щоб надіслати запит">
  Надіслати
</Button>
\`\`\`
`;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["md", "lg"] },
    disabled: { control: "boolean" },
    disabledReason: { control: "text" },
    children: { control: "text" },
    href: { control: "text" },
    type: { control: "select", options: ["button", "submit", "reset"] },
  },
  args: {
    children: "Розповісти про проєкт",
    variant: "primary",
    size: "md",
    disabled: false,
    disabledReason: "Вкажіть ім'я та контакт, щоб надіслати запит",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
