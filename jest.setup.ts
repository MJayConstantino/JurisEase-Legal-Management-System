import "@testing-library/jest-dom"; // Adds custom matchers for DOM testing

jest.mock("next/router", () => ({
    useRouter: () => ({
        route: "/",
        pathname: "/",
        query: {},
        asPath: "/",
    }),
}));
