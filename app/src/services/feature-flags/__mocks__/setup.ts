import { LocalFeatureFlagManager } from "../LocalFeatureFlagManager";
import type { FlagManager } from "../setup";

export const manager: FlagManager = new LocalFeatureFlagManager();
