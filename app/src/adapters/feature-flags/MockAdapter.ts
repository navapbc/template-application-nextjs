import { FeatureFlagAdapter } from "./types";

/**
 * Mocks feature flag responses based on environment variables.
 * Only intended for local development or testing.
 */
export class MockAdapter implements FeatureFlagAdapter {
  async isFeatureEnabled(featureName: string, entityId?: string) {
    const envVarName = `NEXT_PUBLIC_FEATURE_${featureName}`;
    const isEnabled = process.env[envVarName]?.toLowerCase() === "true";

    if (process.env.NODE_ENV !== "test") {
      console.warn("Using mock feature flag adapter", {
        envVarName,
        featureName,
        isEnabled,
        entityId,
      });
    }

    return Promise.resolve(isEnabled);
  }
}
