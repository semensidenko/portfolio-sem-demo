import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextLink } from "./TextLink";

const description = `
**Що це.** Текстове посилання-дія: жирний текст великими літерами з лінією під ним. Приклад: «Дивитися роботи» на першому екрані.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`children\` | текст посилання | — |
| \`href\` | адреса (наприклад, \`#works\`) | — |
| інші атрибути \`<a>\` | \`target\`, \`rel\`, \`aria-*\` … | — |

**Стани**

- **default** — текст \`ink\` (21:1), під ним лінія \`ink\` товщиною 2px.
- **hover** — лінія зникає й «малюється» знову зліва направо.
- **focus** (Tab) — та сама анімація лінії й контур \`accent\` товщиною 2 з відступом 4.
- Якщо в системі вимкнено анімації, лінія змінюється без руху.

**Токени:** колір \`ink\`, \`accent\` (фокус); текст \`text-label\` + \`font-bold\` + \`uppercase\`; відступ 2 (між текстом і лінією).

**Коли використовувати.** Для другорядної дії поруч із текстом: «Дивитися роботи», «Усі кейси».

**Коли ні.** Для головної дії блоку (там **Button**). Для посилань усередині абзацу (там звичайне підкреслене посилання). Для пунктів меню (там **Nav**).

**Як брати в код**

\`\`\`tsx
import { TextLink } from "@/components/TextLink/TextLink";

<TextLink href="#works">Дивитися роботи</TextLink>
\`\`\`
`;

const meta = {
  title: "Components/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    children: { control: "text" },
    href: { control: "text" },
  },
  args: {
    children: "Дивитися роботи",
    href: "#works",
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
