import { adapter } from "./setup";

/**
 * Check if a feature flag is enabled
 * @param featureName - Name of the flag
 * @param entityId - Optional id (e.g. user id) to use for phased rollouts
 */
export function isFeatureEnabled(featureName: string, entityId?: string) {
  return adapter.isFeatureEnabled(featureName, entityId);
}
