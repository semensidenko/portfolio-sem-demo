import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { heroCases } from "@/content/cases";
import { CaseCarousel } from "./CaseCarousel";

const description = `
**Що це.** Карусель кейсів на першому екрані: картки **CaseCard** в один ряд, крапки для перемикання внизу ліворуч.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`cases\` | список карток (ті самі пропси, що в **CaseCard**) | — |
| \`label\` | назва каруселі для скрінрідера | «Кейси» |

**Як поводиться**

- **комп'ютер** (від \`xl\`, 1280px) — видно дві картки, **телефон і планшет** — одну.
- Гортається свайпом, трекпадом, колесом із Shift і крапками; картки «примагнічуються» до краю.
- **Крапки** — по одній на кожне положення каруселі. Активна — повна й більша, інші напівпрозорі (наведення: повні). Кожна крапка — кнопка з зоною натискання 24px, назвою «Показати кейс N» і \`aria-current\` для активної. Фокус: контур \`accent\`.
- Сама не прокручується: автопрокрутка заважає читати й потребувала б кнопки паузи.
- Якщо в системі вимкнено анімації, перехід по крапці миттєвий.

**Токени:** кольори \`canvas\` (крапки), \`accent\` (фокус); радіус \`rounded-control\`; відступи 2 (крапки й проміжок між картками 2 + 2).

**Коли використовувати.** На першому екрані, щоб показати 2–4 кейси в обмеженому місці.

**Коли ні.** Для повного списку робіт (там сітка карток). Для одного кейса.

**Як брати в код**

\`\`\`tsx
import { CaseCarousel } from "@/components/CaseCarousel/CaseCarousel";
import { heroCases } from "@/content/cases";

<CaseCarousel cases={heroCases} />
\`\`\`

Перевірити телефон: кнопка **Viewport** (іконка монітора) у верхній панелі Storybook.
`;

const meta = {
  title: "Components/CaseCarousel",
  component: CaseCarousel,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  decorators: [
    (Story) => (
      <div className="max-w-page p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: "text" },
    cases: { control: false },
  },
  args: {
    cases: heroCases,
    label: "Кейси",
  },
} satisfies Meta<typeof CaseCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
