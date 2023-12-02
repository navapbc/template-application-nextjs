import userEvent from "@testing-library/user-event";
import { render, screen } from "tests/test-utils";

import Header from "src/components/Header";

describe("Header", () => {
  it("toggles the mobile nav menu", async () => {
    render(<Header />);

    const menuButton = screen.getByRole("button", { name: "Menu" });

    expect(menuButton).toBeInTheDocument();

    await userEvent.click(menuButton);

    const closeButton = screen.getByRole("button", { name: /close/i });

    expect(closeButton).toBeInTheDocument();
  });
});
