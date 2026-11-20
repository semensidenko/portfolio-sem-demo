import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Змінні шрифтів сайт ставить на <html> у layout, а Storybook layout не бачить,
  // тому кожну історію обгортаємо тими самими класами.
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-sans text-ink antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
