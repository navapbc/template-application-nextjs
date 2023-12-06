export class MockFeatureFlagManager {
  async isFeatureEnabled(featureName: string, userId: string) {
    console.log(
      `Using mock feature flag manager for feature ${featureName}, user ${userId}`
    );
    return Promise.resolve(false);
  }
}
