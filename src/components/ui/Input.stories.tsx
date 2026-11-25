import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta = {
  title: "Компоненти/Input",
  component: Input,
  args: { label: "Ім'я", placeholder: "Як до вас звертатися" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          "Поле форми запису. Межа — `ink-muted` (контраст ≥ 3:1), а не `line`: `line` лише для декоративних ліній. " +
          "Завжди з видимою міткою; підказку передавай через `hint`, не замість мітки.",
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Hover: Story = { parameters: { pseudo: { hover: true } } };
export const Focus: Story = { parameters: { pseudo: { focusVisible: true } } };
export const Disabled: Story = { args: { disabled: true } };
export const WithHint: Story = { args: { label: "Telegram або email", hint: "Так я зв'яжуся з вами після запису." } };
