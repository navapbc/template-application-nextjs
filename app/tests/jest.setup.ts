import "@testing-library/jest-dom";

import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Use the mock feature flag adapter for all tests
process.env.FEATURE_FLAGS_PROJECT = "";
