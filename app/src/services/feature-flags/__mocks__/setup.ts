import { MockFeatureFlagManager } from "../MockFeatureFlagManager";
import type { FlagManager } from "../setup";

export const manager: FlagManager = new MockFeatureFlagManager();
