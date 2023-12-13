export class LocalFeatureFlagManager {
  async isFeatureEnabled(featureName: string, userId: string) {
    console.log("Using mock feature flag manager", { featureName, userId });
    return Promise.resolve(false);
  }
}
