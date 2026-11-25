import type { Preview } from "@storybook/nextjs-vite";
import "../src/fonts";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: { options: { canvas: { name: "canvas", value: "var(--color-canvas)" } } },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "error" },
  },
  initialGlobals: { backgrounds: { value: "canvas" } },
  tags: ["autodocs"],
};

export default preview;
