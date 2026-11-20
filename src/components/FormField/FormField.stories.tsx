import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const description = `
**Що це.** Текстове поле з підписом над ним. Для форми запиту на проєкт: «Як до вас звертатися», «Email або Telegram».

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`label\` | підпис над полем (обов'язковий) | — |
| \`type\` | \`text\`, \`email\`, \`tel\` тощо | \`text\` |
| \`defaultValue\` | початкове значення; непорожнє — стан «заповнене» | — |
| \`placeholder\` | підказка в порожньому полі | — |
| \`error\` | поле з помилкою | \`false\` |
| \`errorMessage\` | текст помилки під полем | — |
| \`disabled\` | недоступне | \`false\` |
| \`name\`, \`required\`, \`autoComplete\`, \`onChange\` … | звичайні атрибути \`<input>\` | — |

**Стани**

- **default** — фон \`canvas\`, межа \`ink-muted\` (9,59:1 до \`canvas\`), підказка \`ink-muted\` (9,59:1), підпис \`ink\` (21:1).
- **hover** — межа \`ink\` (21:1).
- **focus** — контур \`accent\` товщиною 2 з відступом 2 від поля (21:1). Показується і при кліку, і з клавіатури.
- **заповнене** — значення текстом \`ink\` (21:1).
- **помилка** — межа \`danger\`, контур фокусу \`danger\`, під полем іконка й текст \`danger\` (\`text-caption\`, 5,62:1). Поле отримує \`aria-invalid\`, текст помилки зв'язаний з полем через \`aria-describedby\`.
- **disabled** — фон \`surface\`, межа \`line\`, текст і підпис \`ink-muted\` (8,72:1 на \`surface\`). Не редагується й не потрапляє у фокус (атрибут \`disabled\`). Помилка в цьому стані не показується.

**Токени:** кольори \`canvas\`, \`surface\`, \`line\`, \`ink\`, \`ink-muted\`, \`accent\`, \`danger\`; текст \`text-body\` (підпис і значення), \`text-caption\` (помилка); радіус \`rounded-control\`; відступи 2 (між підписом, полем і помилкою), 3 і 6 (всередині поля).

**Коли використовувати.** Для коротких текстових відповідей у формі: ім'я, email, Telegram, телефон. Підпис завжди над полем.

**Коли ні.** Для довгого тексту (потрібне багаторядкове поле), для вибору з кількох варіантів («лендінг, сайт або не знаю» — це перемикачі), для пошуку. Не використовуйте \`placeholder\` замість підпису. Не показуйте помилку, поки людина ще не закінчила вводити.

**Як брати в код**

\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField label="Як до вас звертатися" name="name" autoComplete="name" required />
<FormField
  label="Email або Telegram"
  name="contact"
  placeholder="name@mail.com або @nickname"
  error={!contactValid}
  errorMessage="Вкажіть email або нік у Telegram"
/>
\`\`\`
`;

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    defaultValue: { control: "text", description: "Значення поля. Непорожнє — стан «заповнене»." },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "select", options: ["text", "email", "tel"] },
  },
  args: {
    label: "Email або Telegram",
    defaultValue: "",
    placeholder: "name@mail.com або @nickname",
    error: false,
    errorMessage: "Вкажіть email або нік у Telegram",
    disabled: false,
    type: "text",
  },
  // key змушує поле перемалюватися, коли значення змінюють у Controls (стан «заповнене»).
  render: (args) => <FormField key={args.defaultValue} {...args} />,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
