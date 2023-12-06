import { manager } from "./setup";

export function isFeatureEnabled(feature: string, userId: string) {
  return manager.isFeatureEnabled(feature, userId);
}
