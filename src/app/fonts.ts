import { Inter, Urbanist } from "next/font/google";

/** Основний шрифт сайту: увесь текст інтерфейсу. Має кирилицю. */
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Шрифт великого слова «design.».
 * Кирилиці в Urbanist немає, тому лише для латинських слів.
 */
export const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

/** Класи зі змінними шрифтів для <html> (сайт) і обгортки історій (Storybook). */
export const fontVariables = `${inter.variable} ${urbanist.variable}`;
