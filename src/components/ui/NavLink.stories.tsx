import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavLink } from "./NavLink";

const meta = {
  title: "Components/NavLink",
  component: NavLink,
  args: { href: "#about", children: "Про мене" },
  parameters: {
    docs: {
      description: {
        component:
          "Пункт головного меню. Верхній регістр, `text-nav`. Поточна сторінка — `current` (підкреслення accent). " +
          "Не використовуй для дій, що не змінюють адресу: для них є Button.",
      },
    },
  },
} satisfies Meta<typeof NavLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Hover: Story = { parameters: { pseudo: { hover: true } } };
export const Focus: Story = { parameters: { pseudo: { focusVisible: true } } };
export const Disabled: Story = { args: { disabled: true } };
export const Current: Story = { args: { current: true } };
