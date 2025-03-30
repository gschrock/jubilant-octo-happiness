import { compilerOptions } from './tsconfig.json';

export default {
  roots: [
    'src',
  ],
  modulePaths: [compilerOptions.baseUrl],
  resetMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageReporters: ['text', 'lcov'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
};
