/** @type {import('ts-jest').JestConfigWithTsJest} */
require('dotenv').config({ path: '.env.test' })
module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/protocols/**',
    '!<rootDir>/src/**/infrastructure/factories/**',
    '!<rootDir>/src/**/infrastructure/swagger/**',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFiles: ['dotenv/config']
}
