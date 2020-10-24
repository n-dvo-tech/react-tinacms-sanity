module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/src/.*\\.test\\.tsx?",
  collectCoverageFrom: [
    "src/**/*.js",
    "!node_modules/**/*.js",
    "!src/**/*.test.js",
    "!src/**/mock/**/*",
  ],
};
