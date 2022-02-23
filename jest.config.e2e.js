const baseConfig = require('./jest.config.base');
const parserPath = '<rootDir>/src/api/parser/jest.config.e2e.js';

let projects = [
  '<rootDir>/src/api/sso/jest.config.e2e.js',
  '<rootDir>/src/api/parser/jest.config.e2e.js',
];

if (process.env.e2e_all == 1) {
  projects.splice(projects.indexOf(parserPath), 1);
  process.env.e2e_all = 0;
}

if (process.env.parser_e2e == 1) {
  projects = ['<rootDir>/src/api/parser/jest.config.e2e.js'];
  process.env.parser_e2e = 0;
}

module.exports = {
  ...baseConfig,
  projects,
  // Some tests depend on authentication state, which can get out of sync if we run tests
  // in parallel. Run only one e2e test at a time.
  maxConcurrency: 1,
  maxWorkers: 1,
};
