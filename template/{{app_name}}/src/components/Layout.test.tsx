import { axe } from "jest-axe";
import { render, screen } from "tests/react-utils";

import Layout from "./Layout";

describe("Layout", () => {
  it("renders children in main section", () => {
    render(
      <Layout locale="en-US">
        <h1>child</h1>
      </Layout>,
    );

    const header = screen.getByRole("heading", { name: /child/i, level: 1 });

    expect(header).toBeInTheDocument();
  });

  it("passes accessibility scan", async () => {
    const { container } = render(
      <Layout locale="en-US">
        <h1>child</h1>
      </Layout>,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
