import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Семен Сіденко — UI/UX-дизайнер",
  description:
    "Проєктую дизайн лендінгів і сайтів, які з першого екрана виглядають так, що бізнесу довіряють.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
