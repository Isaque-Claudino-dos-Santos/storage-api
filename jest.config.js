/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: 'node',
    preset: 'ts-jest',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    setupFilesAfterEnv: [
        '<rootDir>/src/tests/mocks/prismaMock.ts',
        'jest-extended/all',
    ],
    clearMocks: true,
    detectOpenHandles: true,
    cache: true,
    cacheDirectory: 'cache/jest',
}
