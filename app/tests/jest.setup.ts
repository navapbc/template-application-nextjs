import "@testing-library/jest-dom";

import './next-router-utils'

import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
