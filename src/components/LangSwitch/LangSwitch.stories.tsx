import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LangSwitch } from "./LangSwitch";

const description = `
**Що це.** Перемикач мови сайту UA/EN у шапці: таблетка, у якій чорна «бульбашка» перетікає на обрану мову.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`defaultValue\` | \`uk\`, \`en\` — мова на старті, далі перемикач пам'ятає вибір сам | \`uk\` |
| \`value\` | \`uk\`, \`en\` — якщо мовою керує батьківський компонент | — |
| \`onChange\` | функція, яку викликають з новою мовою | — |
| \`className\` | додаткові класи розміщення (наприклад, \`order-1\`) | — |

**Стани**

- **обрана мова** — «бульбашка» \`accent\`, текст \`canvas\` (21:1). Має \`aria-pressed="true"\`.
- **необрана мова** — текст \`ink\` (21:1). Наведення: фон \`surface\` (текст \`ink\`, 19,09:1).
- **focus** (з клавіатури, Tab) — контур \`accent\` товщиною 2 навколо пункту.
- **перехід** — «бульбашка» плавно переїжджає; якщо в системі вимкнено анімації, перескакує одразу.

Межа таблетки \`ink-muted\` (9,59:1 до \`canvas\`).

**Токени:** кольори \`accent\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`surface\`; текст \`text-label\` + \`uppercase\`; радіус \`rounded-control\`; відступи 3 і 4.

**Коли використовувати.** Один раз, у шапці сайту.

**Коли ні.** Для інших виборів з двох варіантів (там потрібні перемикачі форми). Для більше ніж двох мов.

**Важливо.** Перемикач лише повідомляє про вибір через \`onChange\`. Самі англійські тексти й перемикання сторінок додамо окремо.

**Як брати в код**

\`\`\`tsx
import { LangSwitch } from "@/components/LangSwitch/LangSwitch";

<LangSwitch defaultValue="uk" onChange={(lang) => console.log(lang)} />
\`\`\`
`;

const meta = {
  title: "Components/LangSwitch",
  component: LangSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    defaultValue: { control: "select", options: ["uk", "en"] },
    value: { control: false },
    onChange: { control: false },
    className: { control: false },
  },
  args: {
    defaultValue: "uk",
  },
  // key перемальовує перемикач, коли мову змінюють у Controls.
  render: (args) => <LangSwitch key={args.defaultValue} {...args} />,
} satisfies Meta<typeof LangSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
