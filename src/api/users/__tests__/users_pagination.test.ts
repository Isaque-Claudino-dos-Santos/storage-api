import { app } from '../../..'
import User from '../../../Models/User'
import { prismaMock } from '../../../tests/mocks/prismaMock'

describe('Users Pagination Tests', () => {
    test('test first', async () => {
        const withPages = jest.fn()

        prismaMock.user.paginate.mockReturnValue({
            withCursor: jest.fn(),
            withPages,
        })

        withPages.mockReturnValue([
            [User.fake({ id: 1 }), User.fake({ id: 2 })],
            {
                currentPage: 1,
                isFirstPage: true,
                isLastPage: true,
                nextPage: null,
                previousPage: null,
            },
        ])

        const response = await app.server.mockRequest().get('/users')

        console.log(response.body)
    })
})
