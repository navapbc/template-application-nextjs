import { FeatureFlagAdapter } from "./types";

export class LocalFeatureFlagManager implements FeatureFlagAdapter {
  async isFeatureEnabled(featureName: string, entityId?: string) {
    const isEnabled =
      process.env[`NEXT_PUBLIC_FEATURE_${featureName}`]?.toLowerCase() ===
      "true";

    console.warn("Using mock feature flag manager", {
      featureName,
      isEnabled,
      entityId,
    });

    return Promise.resolve(isEnabled);
  }
}
