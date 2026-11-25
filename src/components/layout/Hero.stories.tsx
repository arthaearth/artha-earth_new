import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./Hero";
import { SiteHeader } from "./SiteHeader";

const meta = {
  title: "Макети/Перший екран",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
    docs: {
      description: {
        component:
          "Перший екран, зібраний з компонентів системи: SiteHeader (Logo, NavLink, LangSwitcher, Button, Burger, Divider) і Hero (Text, Button, Divider) + декор (янтра, золотий пил).",
      },
    },
  },
  decorators: [(Story) => <><SiteHeader /><Story /></>],
} satisfies Meta<typeof Hero>;
export default meta;
export const Desktop: StoryObj<typeof meta> = {};
export const Mobile: StoryObj<typeof meta> = { globals: { viewport: { value: "mobile1" } } };
