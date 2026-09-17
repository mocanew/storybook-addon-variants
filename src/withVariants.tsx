import { useMemo } from "react";
import type { DecoratorFunction, Renderer } from "storybook/internal/types";
import { getCombinations } from "./getCombinations";

const gridStyle = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 30,
  listStyle: "none",
  margin: 0,
  padding: 0,
} as const;

type DecFn = DecoratorFunction<Renderer>;
type StoryParams = Parameters<DecFn>;
type StoryFnType = StoryParams[0];
type ContextType = StoryParams[1];

interface CombinationGridProps {
  StoryFn: StoryFnType;
  context: ContextType;
}

function CombinationGrid({ StoryFn, context }: CombinationGridProps) {
  const combinations = useMemo(
    () => getCombinations(context.argTypes),
    [context.argTypes]
  );

  if (combinations.length === 0) {
    return StoryFn();
  }

  return (
    <ul style={gridStyle}>
      {combinations.map((combination, index) => (
        <li key={index} title={JSON.stringify(combination, null, 2)}>
          {StoryFn({
            args: {
              ...context.args,
              ...combination,
            },
          })}
        </li>
      ))}
    </ul>
  );
}

export const withVariants: DecFn = (StoryFn, context) => {
  const { globals, parameters } = context;
  const shouldShowVariants =
    globals.variantsAddon === "shown" || parameters.variants?.enable === true;

  if (shouldShowVariants) {
    return <CombinationGrid StoryFn={StoryFn} context={context} />;
  }

  return StoryFn();
};
