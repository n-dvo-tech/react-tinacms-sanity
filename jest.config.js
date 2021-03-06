/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  roots: ["<rootDir>"],
  collectCoverage: true,
  testPathIgnorePatterns: ["/node_modules/", "/lib/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  verbose: true,
  testURL: "https://example.com/",
  name: "react-tinacms-sanity",
  displayName: "react-tinacms-sanity",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // coverageThreshold: {
  //   global: {
  //     statements: 95,
  //     branches: 95,
  //     functions: 95,
  //     lines: 95,
  //   },
  // },
  testRegex: "/.*\\.test\\.[t|j]s*(x)?$",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.[t]s$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.[t|j]s*(x)",
    "!src/index.ts",
    "!src/**/*.test.*(t|j)s*(x)",
    "!src/**/mock*(s)/**/*.*(t|j)s",
    "!src/**/types*(s)/**/*.*(t|j)s",
    "!src/polyfills/**/*.js",
  ],
  setupFilesAfterEnv: [".//utils/jest/setup.js"],
  // coverageProvider: "v8",
};
