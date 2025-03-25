import nextJest from "next/jest";
import type { Config } from "jest";

// Create a Jest configuration with Next.js-specific settings
const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  clearMocks: true,
  projects: [
    {
      displayName: "frontend",
      testEnvironment: "jsdom", // Simulate browser environment
      testMatch: ["<rootDir>/tests/frontend/**/*.test.{ts,tsx}"], // Match frontend test files
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // React Testing Library setup
      transform: {
        "^.+\\.[tj]sx?$": "ts-jest", // Use ts-jest to transform TypeScript and JSX
      },
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1", // Resolve alias paths like `@/components/...`
      },
    },
    {
      displayName: "backend",
      testEnvironment: "node", // Simulate Node.js environment for backend tests
      testMatch: ["<rootDir>/tests/backend/**/*.test.{ts,tsx}"], // Match backend test files
      transform: {
        "^.+\\.[tj]sx?$": "ts-jest", // Use ts-jest to transform TypeScript files
      },
    },
  ],
};

// Export the configuration
export default createJestConfig(customJestConfig);
