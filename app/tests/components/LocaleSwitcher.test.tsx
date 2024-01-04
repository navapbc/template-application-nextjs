import userEvent from "@testing-library/user-event";
import { mockRouter } from "tests/next-router-utils";
import { render, screen } from "tests/react-utils";

import LocaleSwitcher from "src/components/LocaleSwitcher";

describe("LocaleSwitcher", () => {
  it("renders the language selector and updates routes when switching language", async () => {
    // Set the initial url
    await mockRouter.push("/initial-path");

    render(<LocaleSwitcher />);

    // We start in English, so we see the toggle to switch to Spanish
    await userEvent.click(screen.getByRole("button", { name: "Español" }));

    // Ensure the router was updated
    // This is the best we can do for testing given constraints listed below
    expect(mockRouter).toMatchObject({
      asPath: "/es-US/initial-path",
      pathname: "/es-US/initial-path",
    });

    // This won't actually work because the NextIntlProvider relies on middleware that isn't available in tests
    // expect(
    //   await screen.findByRole("button", { name: "English" })
    // ).toBeInTheDocument();
  });
});
