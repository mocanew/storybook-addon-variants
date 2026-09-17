import { defineMain } from "@storybook/react-vite/node";

const config = defineMain({
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [import.meta.resolve("./local-preset.ts")],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
});

export default config;
