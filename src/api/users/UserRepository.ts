import { Prisma, PrismaClient } from '@prisma/client'

export default class UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: number) {
        return this.prisma.user.findUnique({
            select: { id: true, firstName: true, lastName: true, email: true },
            where: { id },
        })
    }

    async create(data: Prisma.UserCreateInput) {
        return await this.prisma.user.create({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            },
        })
    }
}
