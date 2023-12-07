import { FeatureFlagManager } from "./FeatureFlagManager";
import { LocalFeatureFlagManager } from "./LocalFeatureFlagManager";

export interface FlagManager {
  isFeatureEnabled(feature: string, userId?: string): Promise<boolean>;
}

export const manager: FlagManager = process.env.FEATURE_FLAG_PROJECT
  ? new FeatureFlagManager()
  : new LocalFeatureFlagManager();
