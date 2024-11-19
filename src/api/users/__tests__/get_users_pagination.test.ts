import { app } from '../../..'
import URLQuery from '../../../Helpers/URLQuery'
import User from '../../../Models/User'
import { prismaPaginateMock } from '../../../tests/mocks/prismaPaginateMock'

describe('Get Users Pagination Tests', () => {
    it('should use pagination filters corerctly on get users pagination', async () => {
        const { withPages, paginate } = prismaPaginateMock()

        withPages.mockReturnValue([
            [],
            {
                currentPage: 1,
                isFirstPage: true,
                isLastPage: true,
                nextPage: null,
                previousPage: null,
            },
        ])

        const url = new URLQuery('/users')
            .set('order_by', 'asc')
            .set('order_by_column', 'id')
            .set('limit', 10)
            .set('page', 30)
            .set('user_ids', '10,20,30')
            .toString()

        await app.server.mockRequest().get(url)

        expect(paginate).toHaveBeenCalled()
        expect(paginate).toHaveBeenCalledWith({
            select: { email: true, firstName: true, id: true, lastName: true },
            where: { id: { in: [10, 20, 30] } },
            orderBy: { id: 'asc' },
        })
        expect(withPages).toHaveBeenCalled()
        expect(withPages).toHaveBeenCalledWith({
            includePageCount: true,
            limit: 10,
            page: 30,
        })
    })

    it('should return correctly users pagination on get users pagination', async () => {
        const { withPages } = prismaPaginateMock()
        const user1 = User.fake({ id: 1 })
        const user2 = User.fake({ id: 2 })
        const user3 = User.fake({ id: 3 })

        withPages.mockReturnValue([
            [user1, user2, user3],
            {
                currentPage: 1,
                isFirstPage: true,
                isLastPage: true,
                nextPage: null,
                previousPage: null,
            },
        ])

        const { body, statusCode } = await app.server
            .mockRequest()
            .get('/users')

        expect(statusCode).toEqual(200)
        expect(body.success).toBeTruthy()
        expect(body.data).toEqual([
            {
                id: user1.id,
                firstName: user1.firstName,
                lastName: user1.lastName,
                email: user1.email,
            },
            {
                id: user2.id,
                firstName: user2.firstName,
                lastName: user2.lastName,
                email: user2.email,
            },
            {
                id: user3.id,
                firstName: user3.firstName,
                lastName: user3.lastName,
                email: user3.email,
            },
        ])
        expect(body.pagination).toEqual({
            currentPage: 1,
            isFirstPage: true,
            isLastPage: true,
            nextPage: null,
            previousPage: null,
        })
    })
})
