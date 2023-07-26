import { Meta } from "@storybook/react";

import Layout from "src/components/Layout";

const meta: Meta<typeof Layout> = {
  component: Layout,
};
export default meta;

/**
 * Below is an example of using Storybook's `args` feature to render
 * different versions of the same component.
 * @see https://storybook.js.org/docs/react/writing-stories/args
 */
export const Preview1 = {
  args: {
    children: <h1>Page contents go here</h1>,
  },
};


