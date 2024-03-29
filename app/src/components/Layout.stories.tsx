import { Meta } from "@storybook/react";
import { defaultLocale } from "src/i18n/config";

import Layout from "./Layout";

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
    locale: defaultLocale,
    children: <h1>Page contents go here</h1>,
  },
};

export const Preview2 = {
  args: {
    ...Preview1.args,
    children: (
      <>
        <h1>Another demo</h1>
        <p>This is an example of another story with a different arg.</p>
      </>
    ),
  },
};
