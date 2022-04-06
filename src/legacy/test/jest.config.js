const baseConfig = require('../../../jest.config.base');

module.exports = {
  ...baseConfig,
  rootDir: '../../..',
  setupFiles: ['<rootDir>/src/legacy/test/jest.setup.js'],
  testMatch: ['<rootDir>/src/legacy/test/**/*.test.js'],
  collectCoverageFrom: ['<rootDir>/src/legacy/src/**/*.js'],
};
