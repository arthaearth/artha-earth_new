import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LangButton, LangSwitcher } from "./LangSwitcher";

const meta = {
  title: "Компоненти/LangSwitcher",
  component: LangSwitcher,
  args: { languages: ["UA", "RU", "EN"], value: "UA" },
  parameters: {
    docs: {
      description: {
        component:
          "Перемикач мови UA · RU · EN. Активна мова має `aria-pressed` і золоте підкреслення. " +
          "Показуй усі три мови одразу, не ховай їх у випадаючий список.",
      },
    },
  },
} satisfies Meta<typeof LangSwitcher>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const state = (label: string, args: object, pseudo?: object): StoryObj => ({
  render: () => (
    <LangButton {...args}>{label}</LangButton>
  ),
  parameters: pseudo ? { pseudo } : {},
});
export const ButtonDefault = state("RU", {});
export const ButtonHover = state("RU", {}, { hover: true });
export const ButtonFocus = state("RU", {}, { focusVisible: true });
export const ButtonDisabled = state("RU", { disabled: true });
export const ButtonActive = state("UA", { active: true });
