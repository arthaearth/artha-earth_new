import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Burger } from "./Burger";

const meta = {
  title: "Components/Burger",
  component: Burger,
  parameters: {
    docs: {
      description: {
        component:
          "Кнопка мобільного меню (екрани до 1100px). `open` перетворює три смуги на хрестик і керує `aria-expanded`. " +
          "Не показуй на широких екранах, де є повне меню.",
      },
    },
  },
} satisfies Meta<typeof Burger>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Hover: Story = { parameters: { pseudo: { hover: true } } };
export const Focus: Story = { parameters: { pseudo: { focusVisible: true } } };
export const Disabled: Story = { args: { disabled: true } };
export const Open: Story = { args: { open: true } };
