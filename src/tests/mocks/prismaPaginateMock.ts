import { prismaMock } from './prismaMock'

export function prismaPaginateMock() {
    const withCursor = jest.fn()
    const withPages = jest.fn()

    const paginate = prismaMock.user.paginate

    paginate.mockReturnValue({
        withCursor,
        withPages,
    })

    return {
        withCursor,
        withPages,
        paginate,
    }
}
