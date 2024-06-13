import { Evidently } from "@aws-sdk/client-evidently";

import { EvidentlyAdapter } from "./EvidentlyAdapter";

function getMockClient(flagValue: boolean) {
  return {
    evaluateFeature: jest.fn().mockResolvedValue({
      value: {
        boolValue: flagValue,
      },
      reason: "test-reason",
    }),
  } as unknown as Evidently;
}

describe("EvidentlyAdapter", () => {
  beforeAll(() => {
    // Disable logging in test output
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("isFeatureEnabled", () => {
    it("falls back to false if the feature flag evaluation fails", async () => {
      const client = getMockClient(true);
      client.evaluateFeature = jest
        .fn()
        .mockRejectedValue(new Error("test-error"));
      const adapter = new EvidentlyAdapter();

      const result = await adapter.isFeatureEnabled("test-feature");

      expect(result).toBe(false);
    });

    it.each([true, false])(
      "returns the boolean value of the feature flag evaluation",
      async (flagValue) => {
        const adapter = new EvidentlyAdapter(getMockClient(flagValue));

        const result = await adapter.isFeatureEnabled(
          "test-feature",
          "test-entity-id"
        );

        expect(result).toBe(flagValue);
      }
    );
  });
});
