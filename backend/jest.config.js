module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  maxWorkers: 1,
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
};
