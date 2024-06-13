import { EvidentlyAdapter } from "./EvidentlyAdapter";
import { MockAdapter } from "./MockAdapter";
import { FeatureFlagAdapter } from "./types";

export const adapter: FeatureFlagAdapter = process.env.FEATURE_FLAGS_PROJECT
  ? new EvidentlyAdapter()
  : new MockAdapter();
