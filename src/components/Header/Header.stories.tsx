import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { defaultNavItems } from "../Nav/Nav";
import { Header } from "./Header";

const description = `
**Що це.** Шапка сайту: логотип, меню (**Nav**), перемикач мови (**LangSwitch**) і кнопка запиту (**Button**). Прилипає до верху при прокрутці, тож кнопка «Розповісти про проєкт» завжди під рукою.

**Параметри (пропси) і значення за замовчуванням**

| Пропс | Значення | За замовчуванням |
| --- | --- | --- |
| \`logo\` | текст логотипа | «sidenko_design.s» |
| \`items\` | пункти меню | п'ять розділів головної |
| \`activeHref\` | адреса активного пункту | — |
| \`defaultLang\` | \`uk\`, \`en\` | \`uk\` |
| \`onLangChange\` | функція при зміні мови | — |
| \`ctaLabel\` | текст кнопки запиту | «Розповісти про проєкт» |
| \`ctaHref\` | куди веде кнопка | \`#contact\` |
| \`ctaRevealAfterId\` | id кнопки запиту на першому екрані: кнопка шапки з'являється, лише коли ту прокручено вище екрана | — (видна завжди) |
| \`defaultMenuOpen\` | мобільне меню відкрите на старті | \`false\` |

**Як поводиться на різній ширині**

- **комп'ютер** (від \`desk\`, 1100px): шапка висотою \`h-header\` (87px макета) стоїть на сітці першого екрана (\`grid-cols-hero\`) — логотип ліворуч, меню починається над кейсами, перемикач мови біля правого краю, як у старому макеті. Усе масштабується з шириною екрана.
- **кнопка запиту** (від \`desk\`): на головній з'являється в шапці, коли кнопку першого екрана прокручено (\`ctaRevealAfterId\`); на інших сторінках видна завжди.
- **телефон і планшет**: логотип, перемикач мови й бургер. Меню й кнопка запиту — у відкритому мобільному меню.
- **прокрутка**: шапка лишається вгорі (\`sticky\`) на фоні \`canvas\`.
- **завантаження**: шапка з'являється знизу (\`animate-rise\`), якщо анімації не вимкнено.

Стани пунктів, перемикача й кнопки — на сторінках **Nav**, **LangSwitch** і **Button**.

**Токени:** фон \`canvas\`; логотип \`text-label\` + \`font-bold\`, колір \`ink\`; ширина \`max-w-page\`; сітка \`grid-cols-hero\`; відступи 4 (телефон) і 8 (комп'ютер); рух \`animate-rise\`.

**Коли використовувати.** Один раз, на початку кожної сторінки сайту.

**Коли ні.** На сторінці подяки чи в модальних вікнах, де навігація відволікає.

**Як брати в код**

\`\`\`tsx
import { Header } from "@/components/Header/Header";

// головна: кнопка в шапці з'являється після прокрутки першого екрана
<Header ctaRevealAfterId="hero-cta" />
// інші сторінки: кнопка видна завжди
<Header />
\`\`\`

Перевірити телефон: кнопка **Viewport** (іконка монітора) у верхній панелі Storybook. Перевірити комп'ютер: вимкніть Viewport і розгорніть вікно ширше за 1100px.
`;

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: description } },
  },
  argTypes: {
    logo: { control: "text" },
    activeHref: { control: "select", options: [undefined, ...defaultNavItems.map((i) => i.href)] },
    defaultLang: { control: "select", options: ["uk", "en"] },
    ctaLabel: { control: "text" },
    defaultMenuOpen: { control: "boolean" },
    items: { control: false },
    onLangChange: { control: false },
    ctaHref: { control: "text" },
    ctaRevealAfterId: { control: false },
  },
  args: {
    logo: "sidenko_design.s",
    activeHref: "#works",
    defaultLang: "uk",
    ctaLabel: "Розповісти про проєкт",
    ctaHref: "#contact",
    defaultMenuOpen: false,
  },
  render: (args) => <Header key={`${args.defaultMenuOpen}-${args.defaultLang}`} {...args} />,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
