import { axe } from "jest-axe";
import { cleanup, render, screen } from "tests/react-utils";
import { mockFeatureFlag } from "tests/server-utils";

import Controller from "./page";
import { View } from "./view";

describe("Index - Controller", () => {
  describe("local feature flags", () => {
    it("renders correctly based on local feature flag is unset", async () => {
      const result = await Controller();
      render(result);

      expect(await screen.findByText(/flag is disabled/i)).toBeInTheDocument();
    });

    it("renders correctly based on local feature flag is true", async () => {
      mockFeatureFlag("foo", true);

      const result = await Controller();
      render(result);

      expect(await screen.findByText(/flag is enabled/i)).toBeInTheDocument();
    });

    it("renders correctly based on local feature flag is false", async () => {
      mockFeatureFlag("foo", false);

      const result = await Controller();
      render(result);

      expect(await screen.findByText(/flag is disabled/i)).toBeInTheDocument();
    });
  });
});

describe("Index - View", () => {
  // Demonstration of rendering translated text, and asserting the presence of a dynamic value.
  // You can delete this test for your own project.
  it("renders link to Next.js docs", () => {
    render(<View isFooEnabled={false} />);

    const link = screen.getByRole("link", { name: /next\.js/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://nextjs.org/docs");
    expect(screen.getByText(/\$1,234/)).toBeInTheDocument();
  });

  it("passes accessibility scan", async () => {
    const { container } = render(<View isFooEnabled={false} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("conditionally displays content based on feature flag values", () => {
    const enabledFlagTextMatcher = /Flag is enabled/;

    render(<View isFooEnabled />);
    expect(screen.getByText(enabledFlagTextMatcher)).toBeInTheDocument();

    cleanup();

    render(<View isFooEnabled={false} />);
    expect(screen.queryByText(enabledFlagTextMatcher)).not.toBeInTheDocument();
  });
});
