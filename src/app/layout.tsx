import type { Metadata } from "next";
import "../fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artha & Earth — Сила в спокої",
  description:
    "Індивідуальні консультації з Джйотіш, ведичної нумерології, Васту та Аюрведи.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
