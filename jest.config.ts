import nextJest from "next/jest";
import type { Config } from "jest";

// Create a Jest configuration with Next.js-specific settings
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  clearMocks: true,
  projects: [
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/tests/frontend/**/*.test.{ts,tsx}"], // Match frontend test files
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      transform: {
        "^.+\\.[tj]sx?$": [
          "ts-jest",
          { tsconfig: "<rootDir>/tsconfig.test.json" }, // Use test-specific TypeScript config
        ],
      },
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/tests/backend/**/*.test.{ts,tsx}"], // Match backend test files
      transform: {
        "^.+\\.[tj]sx?$": "ts-jest",
      },
    },
  ],
};

export default createJestConfig(customJestConfig);
