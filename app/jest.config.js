// See https://nextjs.org/docs/testing
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/tests/jest.setup.ts",
    "<rootDir>/tests/jest-i18n.ts",
  ],
  testEnvironment: "jsdom",
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    // Force uuid to resolve with the CJS entry point ↴
    // See https://github.com/uuidjs/uuid/issues/451
    // This can be removed when @aws-sdk uses uuid v9+ ↴
    // https://github.com/aws/aws-sdk-js-v3/issues/3964
    uuid: require.resolve("uuid"),
  },
};

module.exports = createJestConfig(customJestConfig);
