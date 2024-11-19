import { app } from '../../..'
import User from '../../../Models/User'
import { prismaMock } from '../../../tests/mocks/prismaMock'

describe('Get User by Id Tests', () => {
    it('should return correctly user on get user by id', async () => {
        const id = 1
        const user = User.fake({ id })
        
        prismaMock.user.findUnique.mockResolvedValue(user)

        const { body, statusCode } = await app.server
            .mockRequest()
            .get(`/users/${id}`)

        prismaMock.user.findUnique.calledWith({
            select: { id: true, email: true, firstName: true, lastName: true },
            where: { id },
        })

        expect(statusCode).toEqual(200)
        expect(body.success).toBeTruthy()
        expect(body.data).toEqual({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        })
    })
})
