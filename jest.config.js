module.exports = {
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testEnvironment: "jsdom"
};