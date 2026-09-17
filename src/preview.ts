import type { ProjectAnnotations, Renderer } from "storybook/internal/types";
import { withVariants } from "./withVariants";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withVariants],
  initialGlobals: {
    variantsAddon: "hidden",
  },
  globalTypes: {
    variantsAddon: {
      name: "Variants",
      description: "Show / Hide Variants",
      toolbar: {
        icon: "component",
        items: [
          {
            title: "Variants Shown",
            value: "shown",
          },
          {
            title: "Variants Hidden",
            value: "hidden",
          },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
