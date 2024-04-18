export interface FeatureFlagAdapter {
  isFeatureEnabled(featureName: string, entityId?: string): Promise<boolean>;
}
