import { MockAdapter } from "./MockAdapter";

const mockAdapter = new MockAdapter();

describe("MockAdapter", () => {
  describe("isFeatureEnabled", () => {
    it("returns true when env var is set to true", async () => {
      process.env.NEXT_PUBLIC_FEATURE_baz = "true";

      const isEnabled = await mockAdapter.isFeatureEnabled("baz");

      expect(isEnabled).toBe(true);
    });

    it("returns true when env var is set to TRUE", async () => {
      process.env.NEXT_PUBLIC_FEATURE_baz = "TRUE";

      const isEnabled = await mockAdapter.isFeatureEnabled("baz");

      expect(isEnabled).toBe(true);
    });

    it("returns false when env var is set to false", async () => {
      process.env.NEXT_PUBLIC_FEATURE_baz = "false";

      const isEnabled = await mockAdapter.isFeatureEnabled("baz");

      expect(isEnabled).toBe(false);
    });

    it("returns false when an env var is not set", async () => {
      delete process.env.NEXT_PUBLIC_FEATURE_baz;
      const isEnabled = await mockAdapter.isFeatureEnabled("baz");

      expect(isEnabled).toBe(false);
    });
  });
});
