import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./Text";

const meta = {
  title: "Компоненти/Text",
  component: Text,
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          "Типографіка першого екрана: eyebrow, display, lead, body, quote, caption. Текст статичний, тому станів hover/focus/disabled немає. " +
          "Display — Cormorant Garamond курсивом, решта — Manrope. Один display (h1) на сторінку; зміни тег через `as`, а не розмір.",
      },
    },
  },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Eyebrow: Story = { args: { variant: "eyebrow", children: "Давні ведичні знання для сучасного життя" } };
export const Display: Story = { args: { variant: "display", children: "«Сила в спокої»" } };
export const Lead: Story = { args: { variant: "lead", children: "Пізнайте свою природу. Відкрийте власні ресурси." } };
export const Body: Story = { args: { variant: "body", children: "Індивідуальні консультації з Астрології, ведичної нумерології, Васту та Аюрведи." } };
export const Quote: Story = { args: { variant: "quote", children: "Не просто практикувати йогу. Жити в йозі." } };
export const Caption: Story = { args: { variant: "caption", children: "Понад 10 років вивчення ведичних наук" } };
