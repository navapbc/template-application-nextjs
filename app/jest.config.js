// See https://nextjs.org/docs/testing
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest.setup.js',
    '<rootDir>/tests/jest-i18n.ts',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
