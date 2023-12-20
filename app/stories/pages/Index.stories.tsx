import { Meta } from "@storybook/react";
import { View } from "src/app/[locale]/view";

const meta: Meta<typeof View> = {
  title: "Pages/Home",
  component: View,
  args: {
    isFooEnabled: false,
  },
};
export default meta;

export const Preview = {};
