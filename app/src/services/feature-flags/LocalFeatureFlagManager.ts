export class LocalFeatureFlagManager {
  async isFeatureEnabled(featureName: string, userId: string) {
    // Note: feature flag env variables should be prefixed with "FEATURE_" or "NEXT_PUBLIC_FEATURE_"
    // "FEATURE_" is used for server-side feature flags
    // "NEXT_PUBLIC_FEATURE_" is used for client-side feature flags
    // Having env var either unset or "false" will disable the feature flag
    const isEnabled =
      (process.env[`FEATURE_${featureName}`] &&
        process.env[`FEATURE_${featureName}`]?.toLowerCase() !== "false") ||
      (process.env[`NEXT_PUBLIC_FEATURE_${featureName}`] &&
        process.env[`NEXT_PUBLIC_FEATURE_${featureName}`]?.toLowerCase() !==
          "false");

    console.log("Using mock feature flag manager", {
      featureName,
      userId,
      isEnabled,
    });

    return Promise.resolve(isEnabled);
  }
}
