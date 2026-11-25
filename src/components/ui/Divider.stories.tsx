import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "./Divider";

const meta = {
  title: "Компоненти/Divider",
  component: Divider,
  decorators: [(Story) => <div className="w-96"><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          "Декоративна золота лінія з токена `line`. Не інтерактивна, тож станів немає, і для екранних читачів прихована. " +
          "Не використовуй як межу поля чи кнопки: там `ink-muted`.",
      },
    },
  },
} satisfies Meta<typeof Divider>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
