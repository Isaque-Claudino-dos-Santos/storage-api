import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'

import prisma from '../../prisma'

jest.mock('../../prisma', () => ({
    __esModule: true,
    default: mockDeep<DeepMockProxy<typeof prisma>>({ funcPropSupport: true }),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<typeof prisma>
