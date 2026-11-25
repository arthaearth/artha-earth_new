import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Компоненти/Button",
  component: Button,
  args: { children: "Записатися на консультацію", href: "#contacts" },
  parameters: {
    docs: {
      description: {
        component:
          "Основна дія. **solid** (золота заливка) — одна головна дія на екран; **outline** — другорядна (межа з `ink-muted`, ≥ 3:1). " +
          "Це посилання (`href`) або кнопка. Не став два solid поруч і не ховай головну дію в outline. " +
          "Стани: default, hover, focus (кільце `accent-soft`), disabled.",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { withArrow: true } };
export const Hover: Story = { args: { withArrow: true }, parameters: { pseudo: { hover: true } } };
export const Focus: Story = { args: { withArrow: true }, parameters: { pseudo: { focusVisible: true } } };
export const Disabled: Story = { args: { withArrow: true, disabled: true } };

export const OutlineDefault: Story = { args: { variant: "outline", children: "Мій підхід" } };
export const OutlineHover: Story = { args: { variant: "outline", children: "Мій підхід" }, parameters: { pseudo: { hover: true } } };
export const OutlineFocus: Story = { args: { variant: "outline", children: "Мій підхід" }, parameters: { pseudo: { focusVisible: true } } };
export const OutlineDisabled: Story = { args: { variant: "outline", children: "Мій підхід", disabled: true } };

export const Small: Story = { args: { variant: "outline", size: "sm", children: "Записатися" } };
export const AsButton: Story = { args: { href: undefined, children: "Надіслати", onClick: () => {} } as never };
