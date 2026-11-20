import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Nav, defaultNavItems } from "./Nav";

const description = `
**Що це.** Головне меню сайту: п'ять розділів головної (Роботи, Пакети, Процес, Про мене, Контакти). На комп'ютері, від ширини \`xl\` (1280px), — рядок пунктів. Вужче — кнопка-бургер у кружку, а пункти випадають списком на всю ширину.

Компонент повертає кнопку-бургер і \`<nav>\` поруч, без обгортки: їх розставляє батьківський flex-контейнер з \`flex-wrap\`. У шапці це робить **Header**, тут — обгортка історії.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`items\` | список \`{ label, href }\` | п'ять розділів головної |
| \`activeHref\` | адреса активного пункту | — |
| \`defaultOpen\` | мобільне меню відкрите на старті | \`false\` |
| \`mobileFooter\` | що показати внизу мобільного меню (кнопку запиту) | — |

**Стани**

- **пункт** — \`text-label\` великими літерами (на телефоні \`text-lead\`), колір \`ink\` (21:1).
- **hover** — підкреслення.
- **активний** — постійне підкреслення й \`aria-current="location"\`.
- **focus** (Tab) — контур \`accent\` товщиною 2 з відступом 4.
- **бургер** — кружок із межею \`ink-muted\`, наведення: фон \`surface\`. Має \`aria-expanded\` і \`aria-controls\`, назву «Відкрити меню» / «Закрити меню». Відкрите меню показує хрестик.
- **мобільне меню відкрите** — пункти списком, між ними лінії \`line\`. Закривається хрестиком, клавішею Escape або вибором пункту.

**Токени:** кольори \`ink\`, \`ink-muted\`, \`line\`, \`surface\`, \`accent\`; текст \`text-label\`, \`text-lead\`; радіус \`rounded-control\`; відступи 2, 3, 4, 6, 8.

**Коли використовувати.** Лише в шапці сайту, через **Header**.

**Коли ні.** Для посилань у тексті чи підвалі (там звичайні посилання). Не більше п'яти-шести пунктів: інакше рядок не вміститься.

**Як брати в код**

\`\`\`tsx
import { Nav } from "@/components/Nav/Nav";

<div className="flex flex-wrap items-center gap-4">
  <Nav activeHref="#works" />
</div>
\`\`\`

Перевірити, як меню виглядає на телефоні: кнопка **Viewport** (іконка монітора) у верхній панелі Storybook.
`;

const meta = {
  title: "Components/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-wrap items-center justify-end gap-4 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeHref: { control: "select", options: [undefined, ...defaultNavItems.map((i) => i.href)] },
    defaultOpen: { control: "boolean" },
    items: { control: false },
    mobileFooter: { control: false },
  },
  args: {
    activeHref: "#works",
    defaultOpen: false,
  },
  render: (args) => <Nav key={String(args.defaultOpen)} {...args} />,
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
