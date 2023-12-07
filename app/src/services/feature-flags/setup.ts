import { FeatureFlagManager } from "./FeatureFlagManager";
import { MockFeatureFlagManager } from "./MockFeatureFlagManager";

export interface FlagManager {
  isFeatureEnabled(feature: string, userId: string): Promise<boolean>;
}

export const manager: FlagManager = process.env.FEATURE_FLAG_PROJECT
  ? new FeatureFlagManager()
  : new MockFeatureFlagManager();
