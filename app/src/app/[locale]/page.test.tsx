import { axe } from "jest-axe";
import { render, screen } from "tests/react-utils";

import { View } from "./view";

describe("Index - View", () => {
  // Demonstration of rendering translated text, and asserting the presence of a dynamic value.
  // You can delete this test for your own project.
  it("renders link to Next.js docs", () => {
    render(<View />);

    const link = screen.getByRole("link", { name: /next\.js/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://nextjs.org/docs");
    expect(screen.getByText(/\$1,234/)).toBeInTheDocument();
  });

  it("passes accessibility scan", async () => {
    const { container } = render(<View />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
