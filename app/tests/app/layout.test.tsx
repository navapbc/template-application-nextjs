import { axe } from "jest-axe";
import Layout from "src/app/[locale]/layout";
import { render, screen } from "tests/test-utils";

describe("Layout", () => {
  beforeEach(() => {
    // Testing Library appends the component contents to a <div>
    // which is problematic for Layout since that causes an error
    // to be logged about <html> being a descendant of <div>.
    // https://github.com/testing-library/react-testing-library/issues/1250
    // For now we hide the error message.
    jest.spyOn(console, "error").mockImplementation((e) => {
      if (
        e instanceof Error &&
        typeof e.message === "string" &&
        e.message.includes("validateDOMNesting")
      ) {
        console.warn(e);
      }
    });
  });

  it("renders children in main section", () => {
    render(
      <Layout params={{ locale: "en-US" }}>
        <h1>child</h1>
      </Layout>
    );

    const header = screen.getByRole("heading", { name: /child/i, level: 1 });

    expect(header).toBeInTheDocument();
  });

  it("passes accessibility scan", async () => {
    const { container } = render(
      <Layout params={{ locale: "en-US" }}>
        <h1>child</h1>
      </Layout>
    );
    const results = await axe(container, {
      rules: {
        // <title> gets rendered by Next.js when using generateMetadata, which happens outside of the component
        "document-title": { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
