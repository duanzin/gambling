module.exports = {
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testMatch: ["<rootDir>/tests/**/*.(test|spec).ts" ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
