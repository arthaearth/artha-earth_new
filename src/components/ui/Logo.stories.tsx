import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    docs: {
      description: {
        component:
          "Логотип ARTHA ⟲ EARTH: спіраль замінює «&». Посилання на початок сторінки. " +
          "Не змінюй кольори й не розтягуй: розмір задають токени `text-logo`.",
      },
    },
  },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Hover: Story = { parameters: { pseudo: { hover: true } } };
export const Focus: Story = { parameters: { pseudo: { focusVisible: true } } };
