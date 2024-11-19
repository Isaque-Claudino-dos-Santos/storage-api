import { app } from '../../..'
import User from '../../../Models/User'
import { prismaMock } from '../../../tests/mocks/prismaMock'

describe('Create User Tests', () => {
    it('should create user correctly on create user', async () => {
        const user = User.fake()

        prismaMock.user.create.calledWith({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            },
        })

        prismaMock.user.create.mockResolvedValue(user)

        const { body, statusCode } = await app.server
            .mockRequest()
            .post('/users')
            .send({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            })

        expect(statusCode).toEqual(201)
        expect(body.success).toBeTruthy()
        expect(body.data).toEqual({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        })
    })
})
