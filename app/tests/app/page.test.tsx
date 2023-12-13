import { axe } from "jest-axe";
import Controller, { View } from "src/app/[locale]/page";
import { LocalFeatureFlagManager } from "src/services/feature-flags/LocalFeatureFlagManager";
import { cleanup, render, screen } from "tests/react-utils";

describe("Index - Controller", () => {
  it("retrieves feature flags", async () => {
    const featureFlagSpy = jest
      .spyOn(LocalFeatureFlagManager.prototype, "isFeatureEnabled")
      .mockResolvedValue(true);

    const result = await Controller();
    render(result);

    expect(featureFlagSpy).toHaveBeenCalledWith("foo", "anonymous");
    expect(screen.getByText(/Flag is enabled/)).toBeInTheDocument();
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
