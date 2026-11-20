import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import aethraOne from "@/assets/cases/aethra-one.webp";
import fwd from "@/assets/cases/fwd.webp";
import nordicFrame from "@/assets/cases/nordic-frame.webp";
import { CaseCard } from "./CaseCard";

const images = { fwd, aethraOne, nordicFrame };

const description = `
**Що це.** Картка кейса: обкладинка 4:3, плашка з назвою й форматом і кружок зі стрілкою. Уся картка — одне посилання на сторінку кейса.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`title\` | назва проєкту | — |
| \`format\` | «Лендінг», «Багатосторінковий сайт» | — |
| \`image\` | обкладинка 4:3, імпорт з \`src/assets\` | — |
| \`alt\` | опис картинки для скрінрідера | — |
| \`href\` | адреса сторінки кейса | — |
| \`sizes\` | яку ширину займе картинка (для швидкого завантаження) | — |
| \`priority\` | завантажити картинку одразу (перший екран) | \`false\` |

**Стани**

- **default на комп'ютері** — лише обкладинка.
- **hover / focus** — обкладинка трохи наближається; з'являються плашка (фон \`canvas\`, назва \`text-body\` жирним \`ink\` 21:1, формат \`text-caption\` \`ink-muted\` 9,59:1) і кружок \`canvas\` зі стрілкою \`ink\`, стрілка вирівнюється. Фокус: контур \`accent\` з відступом 4.
- **сенсорний екран** (немає наведення) — плашка й кружок видні завжди.
- Поки картинка вантажиться, видно фон \`line\`.

**Токени:** кольори \`canvas\`, \`ink\`, \`ink-muted\`, \`line\`, \`accent\`; текст \`text-body\`, \`text-caption\`; пропорція \`aspect-cover\`; радіуси \`rounded-card\` (картка й плашка), \`rounded-control\` (кружок); відступи 2, 3, 4.

**Коли використовувати.** Для прев'ю кейса: у каруселі першого екрана й у розділі «Роботи».

**Коли ні.** Для картинок без переходу на кейс. Не кладіть у картку кнопки чи інші посилання: вся картка вже посилання.

**Як брати в код**

\`\`\`tsx
import { CaseCard } from "@/components/CaseCard/CaseCard";
import nordicFrame from "@/assets/cases/nordic-frame.webp";

<CaseCard
  title="Nordic Frame"
  format="Лендінг"
  image={nordicFrame}
  alt="Nordic Frame — сайт архітектурного бренду"
  href="/cases/nordic-frame"
/>
\`\`\`
`;

const meta = {
  title: "Components/CaseCard",
  component: CaseCard,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  decorators: [
    (Story) => (
      <div className="max-w-page p-4">
        <div className="grid grid-cols-2 gap-4">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    title: { control: "text" },
    format: { control: "select", options: ["Лендінг", "Багатосторінковий сайт"] },
    image: {
      control: "select",
      options: Object.keys(images),
      mapping: images,
    },
    alt: { control: "text" },
    href: { control: "text" },
    sizes: { control: false },
    priority: { control: false },
  },
  args: {
    title: "Nordic Frame",
    format: "Лендінг",
    image: nordicFrame,
    alt: "Nordic Frame — сайт архітектурного бренду",
    href: "#works",
  },
} satisfies Meta<typeof CaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
