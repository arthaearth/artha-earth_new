import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artha & Earth",
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
