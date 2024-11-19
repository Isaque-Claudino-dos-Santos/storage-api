/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/mocks/prismaMock.ts'],
  detectOpenHandles: true
};