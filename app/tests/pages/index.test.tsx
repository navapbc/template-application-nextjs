import { axe } from "jest-axe";
import { GetServerSidePropsContext } from "next";
import Index, { getServerSideProps } from "src/pages/index";
import { LocalFeatureFlagManager } from "src/services/feature-flags/LocalFeatureFlagManager";
import { render, screen } from "tests/react-utils";

describe("Index", () => {
  // Demonstration of rendering translated text, and asserting the presence of a dynamic value.
  // You can delete this test for your own project.
  it("renders link to Next.js docs", () => {
    render(<Index isFooEnabled={true} />);

    const link = screen.getByRole("link", { name: /next\.js/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://nextjs.org/docs");
  });

  it("passes accessibility scan", async () => {
    const { container } = render(<Index isFooEnabled={true} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("conditionally displays content based on feature flag values", () => {
    const { container } = render(<Index isFooEnabled={true} />);
    expect(container).toHaveTextContent("Flag is enabled");
  });

  it("retrieves feature flags", async () => {
    const featureName = "foo";
    const userId = "anonymous";
    const featureFlagSpy = jest
      .spyOn(LocalFeatureFlagManager.prototype, "isFeatureEnabled")
      .mockResolvedValue(true);
    await getServerSideProps({
      req: { cookies: {} },
      res: {},
    } as unknown as GetServerSidePropsContext);
    expect(featureFlagSpy).toHaveBeenCalledWith(featureName, userId);
  });
});
