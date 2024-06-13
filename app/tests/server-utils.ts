export function mockFeatureFlag(featureName: string, isEnabled: boolean) {
  process.env[`NEXT_PUBLIC_FEATURE_${featureName}`] = isEnabled.toString();
}
