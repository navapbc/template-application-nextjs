import { ComponentMeta, ComponentStory } from "@storybook/react";

import ReactUSWDSHello from "../../src/pages/react-uswds-hello";

export default {
  title: "Pages",
  component: ReactUSWDSHello,
} as ComponentMeta<typeof ReactUSWDSHello>;

const Template: ComponentStory<typeof ReactUSWDSHello> = () => (
  <ReactUSWDSHello />
);

export const Home = Template.bind({});
