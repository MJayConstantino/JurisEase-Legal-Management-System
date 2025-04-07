import "@testing-library/jest-dom";
import dotenv from "dotenv";
import path from "path";

// Load the .env.test file for all tests
dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));
