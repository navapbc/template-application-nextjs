import { MockAdapter } from "../MockAdapter";
import type { FlagManager } from "../setup";

export const manager: FlagManager = new MockAdapter();
