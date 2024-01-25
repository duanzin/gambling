module.exports = {
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["<rootDir>/tests/*.(test|spec).ts" ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
