import { app } from '../../..'
import User from '../../../Models/User'
import { prismaMock } from '../../../tests/mocks/prismaMock'

describe('Users Pagination Tests', () => {
    test('test first', async () => {
        const user1 = User.fake({ id: 1 })
        const user2 = User.fake({ id: 2 })

        prismaMock.user.findMany.mockResolvedValue([user1, user2])

        await app.server
            .mockRequest()
            .get('/users?orderBy=id')
            .expect(200, {
                success: true,
                data: [user1, user2],
            })
    })
})
