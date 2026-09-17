import { defineConfig, type Options } from "tsup";

const NODE_TARGET = "node20.19";

export default defineConfig(async () => {
  const packageJson = (
    await import("./package.json", { with: { type: "json" } })
  ).default;
  const {
    bundler: { previewEntries, nodeEntries },
  } = packageJson;

  const commonConfig: Options = {
    clean: false,
    external: ["react", "react-dom", "@storybook/icons"],
    format: ["esm"],
    splitting: true,
    treeshake: true,
  };

  return [
    {
      ...commonConfig,
      dts: true,
      entry: previewEntries,
      platform: "browser",
      target: "esnext",
    },
    {
      ...commonConfig,
      entry: nodeEntries,
      platform: "node",
      target: NODE_TARGET,
    },
  ];
});
